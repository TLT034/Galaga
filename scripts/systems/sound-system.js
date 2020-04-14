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
    sounds['enemyKill'].volume = MyConstants.soundSettings.enemyKill.VOLUME;
    sounds['enemyKill'].loop = MyConstants.soundSettings.enemyKill.LOOP;
    sounds['bossKill'].volume = MyConstants.soundSettings.bossKill.VOLUME;
    sounds['bossKill'].loop = MyConstants.soundSettings.bossKill.LOOP;
    sounds['enemyFlying'].volume = MyConstants.soundSettings.enemyFlying.VOLUME;
    sounds['enemyFlying'].loop = MyConstants.soundSettings.enemyFlying.LOOP;
    sounds['themeSong'].volume = MyConstants.soundSettings.themeSong.VOLUME;
    sounds['themeSong'].loop = MyConstants.soundSettings.themeSong.LOOP;
    sounds['newLevel'].volume = MyConstants.soundSettings.newLevel.VOLUME;
    sounds['newLevel'].loop = MyConstants.soundSettings.newLevel.LOOP;
    sounds['bonusSuccess'].volume = MyConstants.soundSettings.bonusSuccess.VOLUME;
    sounds['bonusSuccess'].loop = MyConstants.soundSettings.bonusSuccess.LOOP;



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
            sounds['buttonHover'].pause();
            sounds['buttonHover'].currentTime = 0;
            sounds['buttonHover'].play().catch(e => {
                // do nothing
            });
        }
    };

    that.buttonClick = function () {
        if (MyGame.soundEnabled) {
            sounds['buttonClick'].play();
        }
    };

    that.playerShoot = function () {
        if (MyGame.soundEnabled) {
            sounds['playerShoot'].pause();
            sounds['playerShoot'].currentTime = 0;
            sounds['playerShoot'].play().catch(e => {
                // do nothing
            });
        }
    };

    that.enemyKill = function () {
        if (MyGame.soundEnabled) {
            sounds['enemyKill'].pause();
            sounds['enemyKill'].currentTime = 0;
            sounds['enemyKill'].play().catch(e => {
                // do nothing
            });
        }
    };

    that.bossKill = function () {
        if (MyGame.soundEnabled) {
            sounds['bossKill'].pause();
            sounds['bossKill'].currentTime = 0;
            sounds['bossKill'].play().catch(e => {
                // do nothing
            });
        }
    };

    that.enemyFlying = function () {
        if (MyGame.soundEnabled) {
            sounds['enemyFlying'].pause();
            sounds['enemyFlying'].currentTime = 0;
            sounds['enemyFlying'].play().catch(e => {
                // do nothing
            });
        }
    };

    that.themeSong = function () {
        if (MyGame.soundEnabled) {
            sounds['themeSong'].play();
        }
    };

    that.newLevel = function () {
        if (MyGame.soundEnabled) {
            sounds['newLevel'].play();
        }
    };

    that.playerDie = function () {
        if (MyGame.soundEnabled) {
            sounds['explosion'].play();
        }
    };

    that.bonusSuccess = function () {
        if (MyGame.soundEnabled) {
            sounds['bonusSuccess'].pause();
            sounds['bonusSuccess'].currentTime = 0;
            sounds['bonusSuccess'].play().catch(e => {
                // do nothing
            });
        }
    };

    return that;
}(MyGame.assets.sounds);
