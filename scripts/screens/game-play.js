MyGame.screens['game-play'] = (function(game, objects, renderer, graphics, input, controls, systems, images) {
    'use strict';

    window.addEventListener("resize", function () {
        graphics.canvas.width = document.getElementById('game').clientWidth;
        graphics.canvas.height = document.getElementById('game').clientHeight;

    });

    let myKeyboard = input.Keyboard();
    let soundSystem = systems.SoundSystem;
    let particleSystem = systems.ParticleSystem;
    let countdown = 7000;

    let lastTimeStamp,
        cancelNextRequest,
        internalUpdate,
        internalRender,
        playerShip,
        enemies = [],
        enemySwaySwitchTimer,
        enemyWaveTimer,
        entryWaveNum,
        currStage,
        currWave,
        enemyIdCount,
        nextEnemyToEnter,
        numEnemiesSoFar,
        enemiesReadyToAttack,
        totalShots,
        totalEnemiesHit;


    function resetValues() {
        graphics.canvas.width = document.getElementById('game').clientWidth;
        graphics.canvas.height = document.getElementById('game').clientHeight;
        lastTimeStamp = performance.now();
        internalUpdate = updateCountdown;
        internalRender = renderCountdown;
        cancelNextRequest = false;
        playerShip = objects.PlayerShip({
            image: images['playerShip'],
            center: { x: graphics.canvas.width/2, y: graphics.canvas.height * .9 },
            rotation: 0,
            size: {
                width: graphics.canvas.width * MyConstants.playerShip.WIDTH,
                height: graphics.canvas.height * MyConstants.playerShip.HEIGHT
            },
            speed: graphics.canvas.width * MyConstants.playerShip.SPEED,
            shots: [],
            shootSound: soundSystem.playerShoot,
            shootFrequency: 300,
            prevShotTime: 0
        });

        enemySwaySwitchTimer = graphics.canvas.width * MyConstants.enemy.SWAY_SWITCH_TIME/2;
        enemyWaveTimer = 0;
        entryWaveNum = 0;
        currStage = 1;
        currWave = 0;
        enemyIdCount = 0;
        nextEnemyToEnter = 0;
        numEnemiesSoFar = 0;
        enemiesReadyToAttack = true;
        totalShots = 0;
        totalEnemiesHit = 0;
    }

    function coordinate(x, y) {
        let w = graphics.canvas.width;
        let h = graphics.canvas.height;

        return {
            x: Math.round((w * MyConstants.enemyGrid.START_X) + (w * MyConstants.enemyGrid.CELL_SIZE * x)),
            y: Math.round((h * MyConstants.enemyGrid.START_Y) + (h * MyConstants.enemyGrid.CELL_SIZE * y))
        };
    }

    function shipControlsOff() {
        myKeyboard.deregister(controls['Move Left']);
        myKeyboard.deregister(controls['Move Right']);
        myKeyboard.deregister(controls['Shoot']);
    }

    function shipControlsOn() {
        myKeyboard.register(controls['Move Left'], function(elapsedTime) {
            if (playerShip.center.x - playerShip.size.width/2 > graphics.canvas.width - graphics.canvas.width * .95) {
                playerShip.moveLeft(elapsedTime);
            }
        });
        myKeyboard.register(controls['Move Right'], function(elapsedTime) {
            if (playerShip.center.x + playerShip.size.width/2 < graphics.canvas.width * .95) {
                playerShip.moveRight(elapsedTime);
            }
        });
        myKeyboard.register(controls['Shoot'], function(elapsedTime) {
            playerShip.shoot(elapsedTime);
            totalShots++;
        });
    }

    function initializeEnemies() {
        for (let i = 0; i < MyConstants.stages[currStage].enemyWaves.length; i++) {
            let waveSpec = MyConstants.stages[currStage].enemyWaves[i];
            let startPositions = [];
            let distBetweenEnemies = graphics.canvas.width * MyConstants.enemy.ENTRY_GAP;
            //
            // initialize enemy start positions based on which side the enemies are entering from
            switch (waveSpec.ENTRY_SIDE) {
                case 'LEFT':
                    for (let i = 0; i < waveSpec.AMOUNT; i++) {
                        startPositions.push({
                            x: i * -distBetweenEnemies - 50,
                            y: graphics.canvas.height + i * distBetweenEnemies + 50
                        });
                    }
                    break;
                case 'RIGHT':
                    for (let i = 0; i < waveSpec.AMOUNT; i++) {
                        startPositions.push({
                            x: graphics.canvas.width + i * distBetweenEnemies + 50,
                            y: graphics.canvas.height + i * distBetweenEnemies + 50
                        });
                    }
                    break;
            }
            //
            // create entry path and attack path with constant points relative to canvas size
            let entryPathConstants = MyConstants.entryPaths[waveSpec.ENTRY_SIDE];
            let entryPath = [];

            for (let i = 0; i < entryPathConstants.length; i++) {
                entryPath.push({
                    x: (graphics.canvas.width * entryPathConstants[i].x),
                    y: (graphics.canvas.width * entryPathConstants[i].y)
                });
            }
            //
            // create enemy objects
            for (let i = 0; i < waveSpec.AMOUNT; i++) {
                let attackPathConstants = MyConstants.attackPaths[Random.nextRange(0,6)];
                let attackPath = [];
                for (let i = 0; i < attackPathConstants.length; i++) {
                    attackPath.push({
                        x: (graphics.canvas.width * attackPathConstants[i].x),
                        y: (graphics.canvas.width * attackPathConstants[i].y)
                    })
                }

                enemies.push(objects.EnemyShip({
                    id: enemyIdCount,
                    type: waveSpec.TYPE,
                    image: images[waveSpec.TYPE],
                    center: startPositions[i],
                    rotation: 0,
                    size: {
                        width: graphics.canvas.width * MyConstants.enemy.SIZE,
                        height: graphics.canvas.height * MyConstants.enemy.SIZE
                    },
                    swaySpeed: graphics.canvas.width * MyConstants.enemy.SWAY_SPEED,
                    entrySpeed: graphics.canvas.width * MyConstants.enemy.ENTRY_SPEED,
                    attackSpeed: graphics.canvas.width * MyConstants.stages[currStage].ATTACK_SPEED,
                    gridPosition: coordinate(waveSpec.COORDS[i].x, waveSpec.COORDS[i].y),
                    mode: 'standby',
                    entryPath: JSON.parse(JSON.stringify(entryPath)),   // This creates a deep copy
                    attackPath: JSON.parse(JSON.stringify(attackPath)), // This creates a deep copy
                    reentryPoint: {
                        x: graphics.canvas.width * MyConstants.enemy.RE_ENTRY_POINT.x,
                        y: graphics.canvas.width * MyConstants.enemy.RE_ENTRY_POINT.y
                    },
                }));
                enemyIdCount++;
            }
        }
    }

    function checkCollision(rect1, rect2) {
        let rectOneEdges = {
            right: rect1.center.x + rect1.size.width/2,
            left: rect1.center.x - rect1.size.width/2,
            top: rect1.center.y - rect1.size.height/2,
            bottom: rect1.center.y + rect1.size.height/2
        };
        let rectTwoEdges = {
            right: rect2.center.x + rect2.size.width/2,
            left: rect2.center.x - rect2.size.width/2,
            top: rect2.center.y - rect2.size.height/2,
            bottom: rect2.center.y + rect2.size.height/2
        };
        return rectOneEdges.right >= rectTwoEdges.left &&
            rectOneEdges.left <= rectTwoEdges.right &&
            rectOneEdges.bottom >= rectTwoEdges.top &&
            rectOneEdges.top <= rectTwoEdges.bottom
    }

    function checkIfShot(ship, bullets) {
        for (let i = 0; i < bullets.length; i++) {
            if (checkCollision(ship, bullets[i])) {
                return i+1;
            }
        }
        return false;
    }

    function checkForCrash(playerShip, enemyShips) {
        for (let i = 0; i < enemyShips.length; i++) {
            if (checkCollision(playerShip, enemyShips[i])) {
                return i+1;
            }
        }
        return false;
    }




    /********************************************* Update Functions **************************************************
                                        Functions to update state of all things
    ******************************************************************************************************************/
    function updateCountdown(elapsedTime) {
        countdown -= elapsedTime;
        particleSystem.stars(elapsedTime);
        particleSystem.updateParticleLifetime(elapsedTime);
        //
        // Once the countdown timer is down, switch to the playing state
        if (countdown <= 0) {
            shipControlsOn();
            internalUpdate = updateEnemyEntry;
            internalRender = renderPlaying;
        }
    }

    function updateBullets(elapsedTime) {
        let keepMe = [];
        for (let i = 0; i < playerShip.shots.length; i++) {
            if (playerShip.shots[i].center.x > 0 && playerShip.shots[i].center.x < graphics.canvas.width &&
                playerShip.shots[i].center.y > 0 && playerShip.shots[i].center.y < graphics.canvas.height &&
                !playerShip.shots[i].hitEnemy)
            {
                keepMe.push(playerShip.shots[i]);
            }
        }
        playerShip.shots = keepMe;

        for (let i = 0; i < playerShip.shots.length; i++) {
            playerShip.shots[i].update(elapsedTime);
        }
    }

    function updateEnemyEntry(elapsedTime) {
        enemyWaveTimer -= elapsedTime;
        updatePlaying(elapsedTime);
        if (enemyWaveTimer <= 0) {
            let numEnemiesThisWave = MyConstants.stages[currStage].enemyWaves[currWave].AMOUNT;
            for (;nextEnemyToEnter < numEnemiesSoFar + numEnemiesThisWave; nextEnemyToEnter++) {
                enemies[nextEnemyToEnter].mode = 'entry';
            }
            numEnemiesSoFar += numEnemiesThisWave;
            //
            // if there are more waves to add, reset countdown otherwise change internal update
            if (currWave < MyConstants.stages[currStage].enemyWaves.length-1) {
                currWave++;
                enemyWaveTimer += MyConstants.stages[currStage].WAVE_FREQUENCY;
            }
            else {
                internalUpdate = updatePlaying;
            }
        }
    }

    function updateEnemies(elapsedTime) {
        enemySwaySwitchTimer -= elapsedTime;
        if (enemySwaySwitchTimer <= 0) {
            enemySwaySwitchTimer = graphics.canvas.width * MyConstants.enemy.SWAY_SWITCH_TIME;
            let direction = 'left';

            if (enemies.length > 0) {
                if (enemies[0].swayDirection === 'left') {
                    direction = 'right';
                }
                for (let i = 0; i < enemies.length; i++) {
                    enemies[i].swayDirection = direction;
                }
            }
        }
        enemiesReadyToAttack = true;
        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i].mode !== 'grid') {
                enemiesReadyToAttack = false;
            }
            enemies[i].update(elapsedTime);
        }
        if (enemies.length > 0) {
            if (enemiesReadyToAttack) {
                enemies[Random.nextRange(0, enemies.length-1)].mode = 'attack';
                enemies[Random.nextRange(0, enemies.length-1)].mode = 'attack';
            }
        }
    }

    function updateCollisions() {
        //
        // check if enemy ship has been shot by player ship
        for (let i = 0; i < enemies.length; i++) {
            let bulletIdx = checkIfShot(enemies[i], playerShip.shots);
            if (bulletIdx) {
                soundSystem.enemyKill();
                // console.log(`You Shot Enemy ${enemies[i].id}!`);
                if (enemies[i].type === 'greenBoss') {
                    enemies[i].type = 'purpleBoss';
                    enemies[i].image = images['purpleBoss'];
                }
                else {
                    numEnemiesSoFar--;
                    nextEnemyToEnter--;
                    particleSystem.enemyExplosion(enemies[i].center);
                    enemies.splice(i, 1);
                }
                playerShip.shots[bulletIdx-1].hitEnemy = true;
                totalEnemiesHit++;
            }
        }
        //
        // check if player ship has been shot by enemy ship
        // for (let i = 0; i < enemies.length; i++) {
        //     if (checkIfShot(playerShip, enemies[i].shots)) {
        //         // explode playerShip, then end game
        //         return
        //     }
        // }
        //
        // check if player ship has crashed into enemy ship
        let enemyIdx = checkForCrash(playerShip, enemies);
        if (enemyIdx) {
            // explode enemyThatCrashed and playerShip, then end game
            console.log(`Enemy ${enemies[enemyIdx-1].id} Crashed Into You!`);
            soundSystem.playerDie();
            particleSystem.playerExplosion(playerShip.center);
            particleSystem.enemyExplosion(enemies[enemyIdx-1].center);
            enemies.splice(enemyIdx-1, 1);
        }
    }

    function updatePlaying(elapsedTime) {
        particleSystem.stars(elapsedTime);
        particleSystem.updateParticleLifetime(elapsedTime);
        updateCollisions();
        updateBullets(elapsedTime);
        updateEnemies(elapsedTime);
    }




    /********************************************* Render Functions **************************************************
                                            Functions to render all things
     ******************************************************************************************************************/
    function renderCountdown() {
        renderPlaying();

        if (countdown > 3000) {
            renderer.ScreenText.renderNextLevel(currStage);
        }
        else {
            renderer.ScreenText.renderCountdown(countdown);
        }
    }

    function renderPlaying() {
        graphics.clear();
        renderer.ParticleSystem.render(particleSystem.particles);
        renderer.Ships.renderPlayerShip(playerShip);
        renderer.Ships.renderEnemyShips(enemies);
        renderer.Bullets.render(playerShip.shots);
    }




    /********************************************* GameDev Functions **************************************************
                                  Default game model functions for game development
     ******************************************************************************************************************/
    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function update(elapsedTime) {
        internalUpdate(elapsedTime);
    }

    function render() {
        internalRender();
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    function initialize() {

    }

    function run() {
        resetValues();
        initializeEnemies();
        soundSystem.playMusic(MyConstants.soundSettings.inGameMusic.VOLUME);
        soundSystem.themeSong();
        requestAnimationFrame(gameLoop);
    }


    return {
        initialize : initialize,
        run : run,
    };

}(MyGame.game, MyGame.objects, MyGame.render, MyGame.graphics, MyGame.input, MyGame.controls, MyGame.systems, MyGame.assets.images));
