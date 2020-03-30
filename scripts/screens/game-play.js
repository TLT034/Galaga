MyGame.screens['game-play'] = (function(game, objects, renderer, graphics, input, controls, systems) {
    'use strict';

    window.addEventListener("resize", function () {
        graphics.canvas.width = document.getElementById('game').clientWidth;
        graphics.canvas.height = document.getElementById('game').clientHeight;

    });

    let myKeyboard = input.Keyboard();
    let soundSystem = systems.SoundSystem();
    let particleSystem = systems.ParticleSystem;

    let lastTimeStamp,
        cancelNextRequest,
        playerShip;


    function resetValues() {
        graphics.canvas.width = document.getElementById('game').clientWidth;
        graphics.canvas.height = document.getElementById('game').clientHeight;
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        playerShip = objects.PlayerShip({
            imageSrc: 'assets/images/player-ship.png',
            center: { x: graphics.canvas.width/2, y: graphics.canvas.height - graphics.canvas.height/7 },
            rotation: 0,
            size: {width: graphics.canvas.width/10, height: graphics.canvas.height/10},
            speed: graphics.canvas.width/1700,
            shots: [],
            shootSound: soundSystem.playerShoot,
            shootFrequency: 300,
            prevShotTime: 0
        })
    }

    function shipControlsOff(){
        myKeyboard.deregister(controls['Move Left']);
        myKeyboard.deregister(controls['Move Right']);
        myKeyboard.deregister(controls['Shoot']);
    }

    function shipControlsOn(){
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
        myKeyboard.register(controls['Shoot'], playerShip.shoot);
    }

    function updateBullets(elapsedTime) {
        let keepMe = [];
        for (let i = 0; i < playerShip.shots.length; i++) {
            if (playerShip.shots[i].center.x > 0 && playerShip.shots[i].center.x < graphics.canvas.width
                && playerShip.shots[i].center.y > 0 && playerShip.shots[i].center.y < graphics.canvas.height) {
                keepMe.push(playerShip.shots[i]);
            }
        }
        playerShip.updateShots(keepMe);

        for (let i = 0; i < playerShip.shots.length; i++) {
            if (playerShip.shots[i].center)
                playerShip.shots[i].update(elapsedTime);
        }
    }



    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function update(elapsedTime) {
        particleSystem.backgroundParticles(elapsedTime);
        updateBullets(elapsedTime);
    }

    function render() {
        graphics.clear();
        particleSystem.render();
        renderer.PlayerShip.render(playerShip);
        for (let i = 0; i < playerShip.shots.length; i++) {
            renderer.Bullet.render(playerShip.shots[i]);
        }
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
        shipControlsOn();
        soundSystem.playInGameMusic();
        requestAnimationFrame(gameLoop);
    }


    return {
        initialize : initialize,
        run : run,
    };

}(MyGame.game, MyGame.objects, MyGame.render, MyGame.graphics, MyGame.input, MyGame.controls, MyGame.systems));
