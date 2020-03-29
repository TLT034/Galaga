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
        cancelNextRequest;


    function resetValues() {
        graphics.canvas.width = document.getElementById('game').clientWidth;
        graphics.canvas.height = document.getElementById('game').clientHeight;
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
    }



    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function update(elapsedTime) {
        particleSystem.backgroundParticles(elapsedTime);
    }

    function render() {
        graphics.clear();
        particleSystem.render();
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
        soundSystem.playInGameMusic();
        requestAnimationFrame(gameLoop);
    }


    return {
        initialize : initialize,
        run : run,
    };

}(MyGame.game, MyGame.objects, MyGame.render, MyGame.graphics, MyGame.input, MyGame.controls, MyGame.systems));
