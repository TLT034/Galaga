// --------------------------------------------------------------
//
// Creates a PlayerShip object, with functions for managing state.
//
// spec = {
//         imageSrc: image,
//         center: { x: , y: },
//         size: { width: , height:  },
//         speed: float,
//         shots: [bullet objects],
//         shootSound: soundSystem sound effect,
//         shootFrequency: ms
//         prevShotTime: ms
// }
//
// --------------------------------------------------------------
MyGame.objects.PlayerShip = function(spec) {
    'use strict';

    let imageReady = false;
    let image = new Image();
    image.onload = function() {
        imageReady = true;
    };
    image.src = spec.imageSrc;


    function moveLeft(elapsedTime) {
        spec.center.x -= spec.speed * elapsedTime;
    }

    function moveRight(elapsedTime) {
        spec.center.x += spec.speed * elapsedTime;
    }

    function shoot(elapsedTime) {
        let timeStamp = performance.now();
        if (timeStamp - spec.prevShotTime >= spec.shootFrequency) {
            spec.prevShotTime = timeStamp;

            spec.shootSound();
            spec.shots.push(MyGame.objects.Bullet({
                imageSrc: 'assets/images/player-bullet.png',
                center: { x: spec.center.x, y: spec.center.y - spec.size.height/2},
                size: { width: 5, height: 20},
                speed: 1,
                rotation: 0,
            }));
        }
    }

    function updateShots(shots) {
        spec.shots = shots;
    }




    return {
        moveLeft: moveLeft,
        moveRight: moveRight,
        shoot: shoot,
        updateShots: updateShots,

        get shots() { return spec.shots; },
        get imageReady() { return imageReady; },
        get image() { return image; },
        get center() { return spec.center; },
        get size() { return spec.size; },

    };
};