// --------------------------------------------------------------
// spec = { src: , volume: , loop: }
// --------------------------------------------------------------
MyGame.systems.SoundSystem = function() {
    'use strict';

    let that = {};

    // All sound constants in the game
    const sounds = {
        menuMusic: {
            audioElement: document.createElement('audio'),
            src: 'assets/sounds/menu-music.mp3',
            volume: .08,
            loop: true
        },
        inGameMusic: {
            audioElement: document.createElement('audio'),
            src: 'assets/sounds/menu-music.mp3',
            volume: .04,
            loop: true
        },
        buttonHover: {
            audioElement: document.createElement('audio'),
            src: 'assets/sounds/menu-hover.mp3',
            volume: .55,
            loop: false
        },
        buttonClick: {
            audioElement: document.createElement('audio'),
            src: 'assets/sounds/menu-click.mp3',
            volume: .55,
            loop: false
        }
    };

    // Initialize the html audio elements
    for (const sound in sounds) {
        sounds[sound].audioElement.src = sounds[sound].src;
        sounds[sound].audioElement.volume = sounds[sound].volume;
        sounds[sound].audioElement.loop = sounds[sound].loop;
        sounds[sound].audioElement.setAttribute('preload', 'auto');
        sounds[sound].audioElement.setAttribute('controls', 'none');
        sounds[sound].audioElement.style.display = 'none';
        document.body.appendChild(sounds[sound].audioElement);
    }


    that.buttonHover = function () {
        if (MyGame.soundEnabled) {
            sounds.buttonHover.audioElement.play();
        }
    };

    that.buttonClick = function () {
        if (MyGame.soundEnabled) {
            sounds.buttonClick.audioElement.play();
        }
    };

    that.playMenuMusic = function () {
        if (MyGame.soundEnabled) {
            sounds.menuMusic.audioElement.play();
        }
    };

    that.pauseMenuMusic = function () {
        if (MyGame.soundEnabled) {
            sounds.menuMusic.audioElement.pause();
        }
    };

    that.playInGameMusic = function () {
        if (MyGame.soundEnabled) {
            sounds.inGameMusic.audioElement.play();
        }
    };

    that.pauseInGameMusic = function () {
        if (MyGame.soundEnabled) {
            sounds.inGameMusic.audioElement.pause();
        }
    };

    return that;
};
