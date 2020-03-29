MyGame.screens['main-menu'] = (function(game, systems) {
    'use strict';

    let soundSystem = systems.SoundSystem();

    function initialize() {
        //
        // Setup each of menu events for the screens
        document.getElementById('new-game-button').addEventListener(
            'click',
            function() {
                soundSystem.pauseMenuMusic();
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
                    soundSystem.pauseMenuMusic();
                    MyGame.soundEnabled = false;
                    document.getElementById('sound-button').innerText = 'Enable Sound';
                }
                else {
                    MyGame.soundEnabled = true;
                    soundSystem.playMenuMusic();
                    document.getElementById('sound-button').innerText = 'Disable Sound';
                }});

    }

    function run() {
        soundSystem.playMenuMusic();
    }

    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game, MyGame.systems));
