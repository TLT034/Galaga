MyGame.screens['main-menu'] = (function(game, soundSystem, ) {
    'use strict';


    function initialize() {
        //
        // Setup each of menu events for the screens
        document.getElementById('new-game-button').addEventListener(
            'click',
            function() {
                soundSystem.pauseMusic();
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
                    soundSystem.pauseMusic(MyConstants.soundSettings.menuMusic.VOLUME);
                    MyGame.soundEnabled = false;
                    document.getElementById('sound-button').innerText = 'Enable Sound';
                }
                else {
                    MyGame.soundEnabled = true;
                    soundSystem.playMusic(MyConstants.soundSettings.menuMusic.VOLUME);
                    document.getElementById('sound-button').innerText = 'Disable Sound';
                }});
    }

    function run() {
        soundSystem.playMusic(MyConstants.soundSettings.menuMusic.VOLUME);
    }

    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game, MyGame.systems.SoundSystem));
