MyGame.screens['main-menu'] = (function(game, objects) {
    'use strict';

    let menuMusic;

    function initialize() {
        //
        // Setup each of menu events for the screens
        document.getElementById('new-game-button').addEventListener(
            'click',
            function() {
                menuMusic.stopSound();
                game.showScreen('game-play');});

        document.getElementById('high-scores-button').addEventListener(
            'click',
            function() { game.showScreen('high-scores'); });

        document.getElementById('controls-button').addEventListener(
            'click',
            function() { game.showScreen('controls'); });

        document.getElementById('credits-button').addEventListener(
            'click',
            function() { game.showScreen('credits'); });

        document.getElementById('sound-button').addEventListener(
            'click',
            function() {
                if (MyGame.soundEnabled) {
                    menuMusic.stopSound();
                    MyGame.soundEnabled = false;
                    document.getElementById('sound-button').innerText = 'Enable Sound';
                }
                else {
                    MyGame.soundEnabled = true;
                    menuMusic.playSound();
                    document.getElementById('sound-button').innerText = 'Disable Sound';
                }});

        menuMusic = objects.Sound({src: 'assets/sounds/menu-music.mp3', volume: .08, loop: true});

    }

    function run() {
        menuMusic.playSound();
    }

    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game, MyGame.objects, MyGame.soundEnabled));
