// --------------------------------------------------------------
// spec = { src: , volume: , loop: }
// --------------------------------------------------------------
MyGame.objects.Sound = function(spec) {
    'use strict';

    let sound = document.createElement('audio');
    sound.src = spec.src;
    sound.setAttribute('preload', 'auto');
    sound.setAttribute('controls', 'none');
    sound.loop = spec.loop;
    sound.volume = spec.volume;
    sound.style.display = 'none';
    document.body.appendChild(sound);

    function playSound() {
        if (MyGame.soundEnabled) {
            sound.play();
        }
    }

    function stopSound() {
        if (MyGame.soundEnabled) {
            sound.pause();
        }
    }

    return {
        playSound : playSound,
        stopSound : stopSound
    };
};
