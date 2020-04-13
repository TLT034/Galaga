// --------------------------------------------------------------
//
// Creates a PlayerShip object, with functions for managing state.
//
// spec = {
//         image: image asset,
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
                image: MyGame.assets.images['playerBullet'],
                center: { x: spec.center.x, y: spec.center.y - spec.size.height/2},
                size: {
                    width: MyGame.graphics.canvas.width * MyConstants.playerBullet.WIDTH,
                    height: MyGame.graphics.canvas.height * MyConstants.playerBullet.HEIGHT
                },
                speed: MyGame.graphics.canvas.width * MyConstants.playerBullet.SPEED,
                rotation: 0,
                hitEnemy: false,
            }));
        }
    }



    return {
        moveLeft: moveLeft,
        moveRight: moveRight,
        shoot: shoot,

        get shots() { return spec.shots; },
        set shots(s) { spec.shots = s; },
        get image() { return spec.image; },
        get center() { return spec.center; },
        get size() { return spec.size; },

    };
};