MyGame.screens['game-play'] = (function(game, objects, renderer, graphics, input, controls, systems, images) {
    'use strict';

    window.addEventListener("resize", function () {
        graphics.canvas.width = document.getElementById('game').clientWidth;
        graphics.canvas.height = document.getElementById('game').clientHeight;

    });

    let myKeyboard = input.Keyboard();
    let soundSystem = systems.SoundSystem;
    let particleSystem = systems.ParticleSystem;
    let scoreSystem = systems.ScoreSystem;

    // values that are only reset when a new game is played
    let countdown,
        gameOverTimer,
        gameSummaryTimer,
        internalUpdate,
        internalRender,
        totalShots,
        totalEnemiesHit,
        currStage,
        lastKilledEnemyPosition,
        enemies,
        extraLives,
        extraLifeMilestoneIdx,
        deathTransitionTimer,
        internalUpdateWhenPlayerDied,
        internalRenderWhenPlayerDied,
        numSummarySoundEffectsPlayed;


    // values that are reset when resetValues is called (i.e. every stage)
    let lastTimeStamp,
        cancelNextRequest,
        playerShip,
        enemySwaySwitchTimer,
        enemyWaveTimer,
        entryWaveNum,
        currWave,
        enemyIdCount,
        nextEnemyToEnter,
        numEnemiesSoFar,
        enemiesReadyToAttack,
        levelTransitionTimer,
        enemiesHitThisStage,
        enemiesKilledThisWave,
        challengeStatsDisplayTimer,
        bonusPointsToRender,
        enemyBullets;


    function newGame() {
        scoreSystem.initialize();
        soundSystem.playMusic(MyConstants.soundSettings.inGameMusic.VOLUME);
        soundSystem.themeSong();
        myKeyboard.deregister('Escape');

        countdown = 7000;
        gameOverTimer = 3000;
        gameSummaryTimer = 14000;
        internalUpdate = updateCountdown;
        internalRender = renderCountdown;
        totalShots = 0;
        totalEnemiesHit = 0;
        currStage = 0;
        lastKilledEnemyPosition = null;
        enemies = [];
        extraLives = 2;
        extraLifeMilestoneIdx = 0;
        numSummarySoundEffectsPlayed = 0;

        resetValues();
    }

    function resetValues() {
        graphics.canvas.width = document.getElementById('game').clientWidth;
        graphics.canvas.height = document.getElementById('game').clientHeight;
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        countdown = 7000;
        gameOverTimer = 3000;
        gameSummaryTimer = 14000;
        enemySwaySwitchTimer = graphics.canvas.width * MyConstants.enemy.SWAY_SWITCH_TIME/2;
        enemyWaveTimer = 0;
        entryWaveNum = 0;
        currWave = 0;
        enemyIdCount = 0;
        nextEnemyToEnter = 0;
        numEnemiesSoFar = 0;
        enemiesReadyToAttack = true;
        levelTransitionTimer = 3000;
        enemiesHitThisStage = 0;
        enemiesKilledThisWave = 0;
        challengeStatsDisplayTimer = 7000;
        bonusPointsToRender = [];
        enemyBullets = [];

        resetPlayerShip();
        initializeEnemies();
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
            if (playerShip.center.x - playerShip.size.width/2 > graphics.canvas.width - graphics.canvas.width * .97) {
                playerShip.moveLeft(elapsedTime);
            }
        });
        myKeyboard.register(controls['Move Right'], function(elapsedTime) {
            if (playerShip.center.x + playerShip.size.width/2 < graphics.canvas.width * .97) {
                playerShip.moveRight(elapsedTime);
            }
        });
        myKeyboard.register(controls['Shoot'], playerShip.shoot);
    }

    function resetPlayerShip() {
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
            shootFrequency: MyConstants.playerShip.NORMAL_FIRE_RATE,
            prevShotTime: 0,
            incrementShotCount: incrementTotalShots
        });
    }

    function incrementTotalShots() {
        totalShots++;
    }

    function addEnemyBullet(bullet) {
        enemyBullets.push(bullet);
    }

    function initializeEnemies() {
        for (let i = 0; i < MyConstants.stages[currStage].enemyWaves.length; i++) {
            let waveSpec = MyConstants.stages[currStage].enemyWaves[i];
            let startPositions = [];
            let distBetweenEnemies = graphics.canvas.width * MyConstants.enemy.ENTRY_GAP;
            //
            // initialize enemy start positions based on where the enemies are entering from
            switch (waveSpec.ENTRY_PATH) {
                // bottom left
                case 0:
                case 4:
                    for (let i = 0; i < waveSpec.AMOUNT; i++) {
                        startPositions.push({
                            x: i * -distBetweenEnemies - 50,
                            y: graphics.canvas.height + i * distBetweenEnemies + 50
                        });
                    }
                    break;
                // bottom right
                case 1:
                case 5:
                    for (let i = 0; i < waveSpec.AMOUNT; i++) {
                        startPositions.push({
                            x: graphics.canvas.width + i * distBetweenEnemies + 50,
                            y: graphics.canvas.height + i * distBetweenEnemies + 50
                        });
                    }
                    break;
                // top center
                case 2:
                case 3:
                    for (let i = 0; i< waveSpec.AMOUNT; i++) {
                        startPositions.push({
                            x: graphics.canvas.width/2, startPositions,
                            y: 0 - i * distBetweenEnemies - 100
                        })
                    }
                    break;
            }
            //
            // create entry path and attack path with constant points relative to canvas size
            let entryPathConstants = MyConstants.ENTRY_PATHS[waveSpec.ENTRY_PATH];
            let entryPath = [];

            for (let i = 0; i < entryPathConstants.length; i++) {
                entryPath.push({
                    x: (graphics.canvas.width * entryPathConstants[i].x),
                    y: (graphics.canvas.width * entryPathConstants[i].y)
                });
            }

            for (let i = 0; i < waveSpec.AMOUNT; i++) {
                let attackPathIdx = Random.nextRange(0,6);
                let attackPathConstants = MyConstants.ATTACK_PATHS[attackPathIdx];
                let attackPath = [];
                let gridPos = {x: -1, y: -1};
                let entryShootPos = {x: -1, y: -1};
                let attackShootPos = {x: -1, y: -1};
                //
                // attack path, grid positions, and shooting are only for non-challenge stages
                if (currStage !== 2) {
                    for (let i = 0; i < attackPathConstants.length; i++) {
                        attackPath.push({
                            x: (graphics.canvas.width * attackPathConstants[i].x),
                            y: (graphics.canvas.width * attackPathConstants[i].y)
                        })
                    }
                    gridPos = coordinate(waveSpec.COORDS[i].x, waveSpec.COORDS[i].y);
                    //
                    // probability each enemy is a shooter during this stage
                    let isAttackShooter = Math.random() <= MyConstants.stages[currStage].ATTACK_SHOOT_PROBABILITY;
                    let isEntryShooter = Math.random() <= MyConstants.stages[currStage].ENTRY_SHOOT_PROBABILITY;

                    if (isAttackShooter) {
                        attackShootPos = {
                            x: graphics.canvas.width * MyConstants.ATTACK_SHOOT_POSITIONS[attackPathIdx].x,
                            y: graphics.canvas.width * MyConstants.ATTACK_SHOOT_POSITIONS[attackPathIdx].y
                        }
                    }
                    if (isEntryShooter) {
                        entryShootPos = {
                            x: graphics.canvas.width * MyConstants.ENTRY_SHOOT_POSITIONS[waveSpec.ENTRY_PATH].x,
                            y: graphics.canvas.width * MyConstants.ENTRY_SHOOT_POSITIONS[waveSpec.ENTRY_PATH].y
                        }
                    }
                }
                //
                // create enemy objects
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
                    entrySpeed: graphics.canvas.width * waveSpec.SPEED,
                    attackSpeed: graphics.canvas.width * MyConstants.stages[currStage].ATTACK_SPEED,
                    gridPosition: gridPos,
                    mode: 'standby',
                    entryPath: JSON.parse(JSON.stringify(entryPath)),   // This creates a deep copy
                    attackPath: JSON.parse(JSON.stringify(attackPath)), // This creates a deep copy
                    reentryPoint: {
                        x: graphics.canvas.width * MyConstants.enemy.RE_ENTRY_POINT.x,
                        y: graphics.canvas.width * MyConstants.enemy.RE_ENTRY_POINT.y
                    },
                    addBullet: addEnemyBullet,
                    shootPositions: [entryShootPos, attackShootPos]
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

    function playerDeath() {
        shipControlsOff();
        soundSystem.playerDie();
        particleSystem.playerExplosion(playerShip.center);
        resetPlayerShip();
        enemyBullets = [];
        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i].mode !== 'standby') {
                enemies[i].mode = 'playerDeath';
            }
        }
        deathTransitionTimer = 5000;
        extraLives--;
        internalUpdateWhenPlayerDied = internalUpdate;
        internalRenderWhenPlayerDied = internalRender;
        internalUpdate = updatePlayerDeathTransition;
        internalRender = renderPlayerDeathTransition;
    }




    /********************************************* Update Functions **************************************************
                                        Functions to update state of all things
    ******************************************************************************************************************/
    function updateCountdown(elapsedTime) {
        countdown -= elapsedTime;
        particleSystem.stars(elapsedTime);
        particleSystem.updateParticleLifetime(elapsedTime);
        //
        // Once the countdown timer is done, switch to the playing state
        if (countdown <= 0) {
            shipControlsOn();
            internalUpdate = updateEnemyEntry;
            internalRender = renderPlaying;
        }
    }

    function updateLevelTransition(elapsedTime) {
        levelTransitionTimer -= elapsedTime;
        particleSystem.stars(elapsedTime);
        particleSystem.updateParticleLifetime(elapsedTime);
        //
        // Once the level transition timer is done, switch to the playing state
        if (levelTransitionTimer <= 0) {
            shipControlsOn();
            internalUpdate = updateEnemyEntry;
            internalRender = renderPlaying;
        }
    }

    function updateChallengeStats(elapsedTime) {
        challengeStatsDisplayTimer -= elapsedTime;
        particleSystem.stars(elapsedTime);
        particleSystem.updateParticleLifetime(elapsedTime);
        //
        // Once the challenge stats timer is done, switch to the level transition
        if (challengeStatsDisplayTimer <= 0) {
            resetValues();
            soundSystem.newLevel();
            internalUpdate = updateLevelTransition;
            internalRender = renderLevelTransition;
        }

    }

    function updatePlayerDeathTransition(elapsedTime) {
        deathTransitionTimer -= elapsedTime;
        particleSystem.stars(elapsedTime);
        particleSystem.updateParticleLifetime(elapsedTime);
        updateEnemies(elapsedTime);
        //
        // Once the death transition timer is done, switch to game over summary or continue playing
        if (deathTransitionTimer <= 0) {
            if (extraLives < 0) {
                internalUpdate = updateGameOverSummary;
                internalRender = renderGameOverSummary;
                myKeyboard.register('Escape', function () {
                    cancelNextRequest = true;
                    game.showScreen('main-menu');
                });
                scoreSystem.checkForHighScore(
                    Math.round((totalEnemiesHit/totalShots) * scoreSystem.score/2) + scoreSystem.score);
            }
            else {
                for (let i = 0; i < enemies.length; i++) {
                    if (enemies[i].mode === 'playerDeath') {
                        enemies[i].mode = 'grid';
                    }
                }
                shipControlsOn();
                internalUpdate = internalUpdateWhenPlayerDied;
                internalRender = internalRenderWhenPlayerDied;
            }
        }
    }

    function updateGameOverSummary(elapsedTime) {
        gameSummaryTimer -= elapsedTime;
        particleSystem.stars(elapsedTime);
        particleSystem.updateParticleLifetime(elapsedTime);
        //
        // Do nothing but decrement, stay on this screen until user hits esc
    }



    function updateBullets(elapsedTime) {
        let keepMe = [];
        for (let i = 0; i < playerShip.shots.length; i++) {
            if (playerShip.shots[i].center.x > 0 && playerShip.shots[i].center.x < graphics.canvas.width &&
                playerShip.shots[i].center.y > 0 && playerShip.shots[i].center.y < graphics.canvas.height &&
                !playerShip.shots[i].hitShip)
            {
                keepMe.push(playerShip.shots[i]);
            }
        }
        playerShip.shots = keepMe;

        for (let i = 0; i < playerShip.shots.length; i++) {
            playerShip.shots[i].update(elapsedTime);
        }

        let keepMe2 = [];
        for (let i = 0; i < enemyBullets.length; i++) {
            if (enemyBullets[i].center.x > 0 && enemyBullets[i].center.x < graphics.canvas.width &&
                enemyBullets[i].center.y > 0 && enemyBullets[i].center.y < graphics.canvas.height &&
                !enemyBullets[i].hitShip)
            {
                keepMe2.push(enemyBullets[i]);
            }
        }
        enemyBullets = keepMe2;

        for (let i = 0; i < enemyBullets.length; i++) {
            enemyBullets[i].update(elapsedTime);
        }
    }

    function updateEnemyEntry(elapsedTime) {
        enemyWaveTimer -= elapsedTime;
        updatePlaying(elapsedTime);
        //
        // if all enemies of previous wave were killed by the player, give a bonus
        if (currStage === 2 && currWave < MyConstants.stages[currStage].enemyWaves.length) {
            if (enemiesKilledThisWave === MyConstants.stages[currStage].enemyWaves[currWave].AMOUNT * 2) {
                scoreSystem.waveCleared(lastKilledEnemyPosition, bonusPointsToRender);
                soundSystem.bonusSuccess();
                enemyWaveTimer = 0;
            }
        }

        if (enemyWaveTimer <= 0) {
            //
            // if challenge stage, delete previous wave of enemies before sending next wave
            if (currStage === 2) {
                numEnemiesSoFar = 0;
                nextEnemyToEnter = 0;
                let keepMe = [];
                for (let i = 0; i < enemies.length; i++) {
                    if (enemies[i].mode === 'standby') {
                        keepMe.push(enemies[i]);
                    }
                }
                enemies = keepMe;
            }
            if (enemies.length > 0) {
                let numEnemiesThisWave = MyConstants.stages[currStage].enemyWaves[currWave].AMOUNT;
                for (;nextEnemyToEnter < numEnemiesSoFar + numEnemiesThisWave; nextEnemyToEnter++) {
                    //
                    // if challenge stage, send waves two at a time in bonus mode
                    if (currStage === 2) {
                        enemies[nextEnemyToEnter].mode = 'bonus';
                        enemies[nextEnemyToEnter + numEnemiesThisWave].mode = 'bonus';
                    }
                    else {
                        enemies[nextEnemyToEnter].mode = 'entry';
                    }
                }
                numEnemiesSoFar += numEnemiesThisWave;
                currWave++;
                enemiesKilledThisWave = 0;
                // if challenge stage, increment wave twice because we send out two enemy waves at once
                if (currStage === 2) {
                    currWave++;
                }
                //
                // if there are more waves to add, reset countdown otherwise change internal update
                if (currWave < MyConstants.stages[currStage].enemyWaves.length) {
                    enemyWaveTimer += MyConstants.stages[currStage].WAVE_FREQUENCY;
                }
                else {
                    // if challenge stage, we want to give time for the last wave to get off screen
                    if (currStage === 2) {
                        enemyWaveTimer += MyConstants.stages[currStage].WAVE_FREQUENCY + 4000;
                    }
                    else {
                        internalUpdate = updatePlaying;
                    }
                }
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
            if (enemiesReadyToAttack && internalUpdate !== updatePlayerDeathTransition) {
                let enemyOne = Random.nextRange(0, enemies.length-1);
                let enemyTwo = Random.nextRange(0, enemies.length-1);
                if (enemyOne !== enemyTwo) {
                    soundSystem.enemyFlying();
                    enemies[enemyOne].mode = 'attack';
                    enemies[enemyTwo].mode = 'attack';
                }
                else {
                    soundSystem.enemyFlying();
                    enemies[enemyOne].mode = 'attack';
                }
            }
        }
        // if no enemies remain, go to next stage
        else if (internalUpdate !== updatePlayerDeathTransition) {
            shipControlsOff();
            //
            // if transitioning from challenge stage, add and render bonus for total enemies hit during challenge stage
            if (currStage === 2) {
                currStage = (currStage+1) % 3;
                soundSystem.themeSong();
                scoreSystem.challengeBonus(enemiesHitThisStage);
                internalUpdate = updateChallengeStats;
                internalRender = renderChallengeStats;
            }
            else {
                currStage = (currStage+1) % 3;
                resetValues();
                soundSystem.newLevel();
                internalUpdate = updateLevelTransition;
                internalRender = renderLevelTransition;
            }
            // if next stage is challenge stage, increase player fire rate
            if (currStage === 2) {
                playerShip.shootFrequency = MyConstants.playerShip.RAPID_FIRE;
            }
        }
    }

    function updateCollisions() {
        //
        // check if enemy ship has been shot by player ship
        for (let i = 0; i < enemies.length; i++) {
            let playerBulletIdx = checkIfShot(enemies[i], playerShip.shots);
            if (playerBulletIdx) {
                if (enemies[i].type === 'purpleBoss' && enemies[i].mode !== 'grid') {
                    soundSystem.bossKill();
                }
                if (enemies[i].type === 'greenBoss') {
                    enemies[i].type = 'purpleBoss';
                    enemies[i].image = images['purpleBoss'];
                }
                else {
                    soundSystem.enemyKill();
                    particleSystem.enemyExplosion(enemies[i].center);
                    enemiesKilledThisWave++;
                    lastKilledEnemyPosition = {x: enemies[i].center.x, y: enemies[i].center.y};
                    // enemy will be deleted, so decrement these values so the enemy entry isn't affected
                    numEnemiesSoFar--;
                    nextEnemyToEnter--;
                    // update score, and check for extra life milestone
                    scoreSystem.enemyKilled(enemies[i], bonusPointsToRender);
                    if (scoreSystem.score >= MyConstants.scoring.EXTRA_LIVE_MILESTONES[extraLifeMilestoneIdx]) {
                        extraLives++;
                        extraLifeMilestoneIdx++;
                        soundSystem.bonusSuccess();
                        particleSystem.shipAwarded({
                            x: graphics.canvas.width * .97 -
                                (extraLives * MyConstants.playerShip.SIZE_OF_EXTRA_LIVES * graphics.canvas.width * 1.1),
                            y: graphics.canvas.height * .97})
                    }
                    // delete enemy
                    enemies.splice(i, 1);
                }
                playerShip.shots[playerBulletIdx-1].hitShip = true;
                totalEnemiesHit++;
                enemiesHitThisStage++;
            }
        }
        //
        // check if player ship has been shot by enemy ship
        let enemyBulletIdx = checkIfShot(playerShip, enemyBullets);
        if (enemyBulletIdx) {
            playerDeath()
        }
        //
        // check if player ship has crashed into enemy ship
        let enemyIdx = checkForCrash(playerShip, enemies);
        if (enemyIdx) {
            // enemy will be deleted, so decrement these values so the enemy entry isn't affected
            numEnemiesSoFar--;
            nextEnemyToEnter--;
            particleSystem.enemyExplosion(enemies[enemyIdx-1].center);
            enemies.splice(enemyIdx-1, 1);
            playerDeath();
        }
    }

    function updateBonusPointsToRender(elapsedTime) {
        let keepMe = [];
        for (let i = 0; i < bonusPointsToRender.length; i++) {
            bonusPointsToRender[i].timeAlive += elapsedTime;
            if (bonusPointsToRender[i].timeAlive < bonusPointsToRender[i].lifetime) {
                keepMe.push(bonusPointsToRender[i]);
            }
        }
        bonusPointsToRender = keepMe;
    }

    function updatePlaying(elapsedTime) {
        particleSystem.stars(elapsedTime);
        particleSystem.updateParticleLifetime(elapsedTime);
        updateCollisions();
        updateBullets(elapsedTime);
        updateEnemies(elapsedTime);
        updateBonusPointsToRender(elapsedTime);
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

    function renderLevelTransition() {
        renderPlaying();
        if (levelTransitionTimer < 2000) {
            renderer.ScreenText.renderNextLevel(currStage);
        }
    }

    function renderChallengeStats() {
        graphics.clear();
        renderer.ParticleSystem.render(particleSystem.particles);
        renderer.ScreenText.renderScore(scoreSystem.score);
        let sectionsToRender = 1;
        if (challengeStatsDisplayTimer <= 1750) {
            sectionsToRender = 4;
        }
        else if (challengeStatsDisplayTimer <= 3500) {
            sectionsToRender = 3;
        }
        else if (challengeStatsDisplayTimer <= 5250) {
            sectionsToRender = 2;
        }
        renderer.ScreenText.renderChallengeStats(enemiesHitThisStage, sectionsToRender);
    }

    function renderPlayerDeathTransition() {
        graphics.clear();
        renderer.ParticleSystem.render(particleSystem.particles);
        renderer.Ships.renderPlayerLifeShips(extraLives, playerShip.image);
        renderer.Ships.renderEnemyShips(enemies);
        renderer.ScreenText.renderScore(scoreSystem.score);
        // if not dead, render 'Get Ready' text
        if (deathTransitionTimer <= 1500 && extraLives >= 0) {
            renderer.Ships.renderPlayerShip(playerShip);
            renderer.ScreenText.renderGetReady();
        }
    }

    function renderGameOverSummary() {
        graphics.clear();
        renderer.ParticleSystem.render(particleSystem.particles);

        let renderAmount = 1;
        if (gameSummaryTimer <= 0) {renderAmount = 12;}
        else if (gameSummaryTimer <= 1000) {renderAmount = 11;}
        else if (gameSummaryTimer <= 2000) {renderAmount = 10;}
        else if (gameSummaryTimer <= 3000) {renderAmount = 9;}
        else if (gameSummaryTimer <= 4000) {renderAmount = 8;}
        else if (gameSummaryTimer <= 5000) {renderAmount = 7;}
        else if (gameSummaryTimer <= 6000) {renderAmount = 6;}
        else if (gameSummaryTimer <= 7000) {renderAmount = 5;}
        else if (gameSummaryTimer <= 8000) {renderAmount = 4;}
        else if (gameSummaryTimer <= 9000) {renderAmount = 3;}
        else if (gameSummaryTimer <= 10000) {renderAmount = 2;}

        if (numSummarySoundEffectsPlayed < (renderAmount-1)/2) {
            numSummarySoundEffectsPlayed++;
            soundSystem.newText();
        }

        if (gameSummaryTimer >= 11000) {
            renderer.ScreenText.renderGameOver();
        }
        else {
            renderer.ScreenText.renderGameSummary({
                sectionsToRender: renderAmount,
                initialScore: scoreSystem.score,
                shotsFired: totalShots,
                numHits: totalEnemiesHit,
                hitMissRatio: ((totalEnemiesHit/totalShots) * 100).toFixed(1),
                accuracyBonus: Math.round((totalEnemiesHit/totalShots) * scoreSystem.score/2),
                finalScore: Math.round((totalEnemiesHit/totalShots) * scoreSystem.score/2) + scoreSystem.score
            })
        }
    }


    function renderPlaying() {
        graphics.clear();
        renderer.ParticleSystem.render(particleSystem.particles);
        renderer.Ships.renderPlayerShip(playerShip);
        renderer.Ships.renderPlayerLifeShips(extraLives, playerShip.image);
        renderer.Ships.renderEnemyShips(enemies);
        renderer.Bullets.render(playerShip.shots);
        renderer.Bullets.render(enemyBullets);
        renderer.ScreenText.renderScore(scoreSystem.score);
        renderer.ScreenText.renderBonusPoints(bonusPointsToRender);
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
        newGame();
        requestAnimationFrame(gameLoop);
    }


    return {
        initialize : initialize,
        run : run,
    };

}(MyGame.game, MyGame.objects, MyGame.render, MyGame.graphics, MyGame.input, MyGame.controls, MyGame.systems, MyGame.assets.images));
