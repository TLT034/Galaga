// --------------------------------------------------------------
// spec = { src: , volume: , loop: }
// --------------------------------------------------------------
MyGame.systems.SoundSystem = function(sounds) {
    'use strict';

    let that = {};

    // Initialize constant volume and loop setting for constant sound effects
    sounds['buttonHover'].volume = MyConstants.soundSettings.buttonHover.VOLUME;
    sounds['buttonHover'].loop = MyConstants.soundSettings.buttonHover.LOOP;
    sounds['buttonClick'].volume = MyConstants.soundSettings.buttonClick.VOLUME;
    sounds['buttonClick'].loop = MyConstants.soundSettings.buttonClick.LOOP;
    sounds['playerShoot'].volume = MyConstants.soundSettings.playerShoot.VOLUME;
    sounds['playerShoot'].loop = MyConstants.soundSettings.playerShoot.LOOP;
    sounds['music'].loop = MyConstants.soundSettings.menuMusic.LOOP;


    that.playMusic = function (volume) {
        if (MyGame.soundEnabled) {
            sounds['music'].volume = volume;
            sounds['music'].play();
        }
    };

    that.pauseMusic = function () {
        if (MyGame.soundEnabled) {
            sounds['music'].pause();
        }
    };


    that.buttonHover = function () {
        if (MyGame.soundEnabled) {
            sounds['buttonHover'].play();
        }
    };

    that.buttonClick = function () {
        if (MyGame.soundEnabled) {
            sounds['buttonClick'].play();
        }
    };

    that.playerShoot = function () {
        if (MyGame.soundEnabled) {
            sounds['playerShoot'].play();
        }
    };

    return that;
}(MyGame.assets.sounds);
