MyGame.screens['game-play'] = (function(game, objects, renderer, graphics, input, controls, particleSystem) {
    'use strict';

    let myKeyboard = input.Keyboard();


    let lastTimeStamp,
        cancelNextRequest,
        backgroundMusic;


    function resetValues() {
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
    }



    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function update(elapsedTime) {
        particleSystem.updateBackgroundParticles(elapsedTime);
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
        backgroundMusic = objects.Sound({src: 'assets/sounds/menu-music.mp3', volume: .04, loop: true});
    }

    function run() {
        resetValues();
        backgroundMusic.playSound();
        requestAnimationFrame(gameLoop);
    }


    return {
        initialize : initialize,
        run : run,
    };

}(MyGame.game, MyGame.objects, MyGame.render, MyGame.graphics, MyGame.input, MyGame.controls, MyGame.particleSystem));
