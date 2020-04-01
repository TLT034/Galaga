// --------------------------------------------------------------
//
// Creates a PlayerShip object, with functions for managing state.
//
// spec = {
//         type: bee, butterfly, boss, bonus1, etc.
//         image: image asset,
//         center: { x: , y: },
//         size: { width: , height:  },
//         speed: float,
//         shots: [bullet objects],
//         shootSound: soundSystem sound effect,
//         initialPath: int
//         attackPath: int
//         gridPosition: { x: , y: }
// }
//
// --------------------------------------------------------------
MyGame.objects.EnemyShip = function(spec) {
    'use strict';

    let swayDirection = 'left';

    function update(elapsedTime) {
        // update phases
        // phase 1: fly initial path to the grid position
        // phase 2: fly attack path with shooting
        // phase 3: return to grid position from top of screen


        // default phase: move left and right
        switch (swayDirection) {
            case 'left':
                spec.center.x -= (spec.speed * elapsedTime);
                break;
            case 'right':
                spec.center.x += (spec.speed * elapsedTime);
                break;
        }
    }

    function changeSwayDirection(direction) {
        swayDirection = direction;
    }


    return {
        update: update,
        changeSwayDirection: changeSwayDirection,

        // get shots() { return spec.shots; },
        get swayDirection() { return swayDirection; },
        get image() { return spec.image; },
        get rotation() { return spec.rotation; },
        get center() { return spec.center; },
        get size() { return spec.size; },
    };
};