// --------------------------------------------------------------
//
// Creates a Bullet object, with functions for managing state.
//
// spec = {
//         imageSrc: image,
//         center: { x: , y: },
//         size: { width: , height: },
//         speed: float
//         rotation: angle
// }
//
// --------------------------------------------------------------
MyGame.objects.Bullet = function(spec) {
    'use strict';

    function update(elapsedTime) {
        spec.center.x += Math.sin(spec.rotation) * elapsedTime * spec.speed;
        spec.center.y -= Math.cos(spec.rotation) * elapsedTime * spec.speed;
    }

    return {
        update: update,

        get image() { return spec.image; },
        get center() { return spec.center; },
        get size() { return spec.size; },
        get rotation() { return spec.rotation; },

    };
};