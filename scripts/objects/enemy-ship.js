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
//         EntryPath: []
//         attackPath: []
//         gridPosition: { x: , y: }
// }
//
// --------------------------------------------------------------
MyGame.objects.EnemyShip = function(spec) {
    'use strict';

    let swayDirection = 'left';
    let pathIdx = 0;

    function update(elapsedTime) {
        // constantly sway grid position
        switch (swayDirection) {
            case 'left':
                spec.gridPosition.x -= (spec.swaySpeed * elapsedTime);
                break;
            case 'right':
                spec.gridPosition.x += (spec.swaySpeed * elapsedTime);
                break;
        }

        // update phases
        switch (spec.mode) {
            // phase 1: fly initial path to the grid position
            case 'entry':
                if (pathIdx < spec.entryPath.length) {
                    moveToPosition(elapsedTime, spec.entryPath[pathIdx]);
                }
                else {
                    moveToPosition(elapsedTime, spec.gridPosition);
                }
                break;
            // phase 2: move left and right
            case 'grid':
                spec.center.x = spec.gridPosition.x;
                break;
            // phase 3: fly attack path with shooting
            case 'attack':
                break;
            // phase 4: return to grid position from top of screen
            case 'return':
                break;
        }
    }

    function moveToPosition(elapsedTime, destination) {
        let adj = spec.center.y - destination.y;
        let opp = destination.x - spec.center.x;

        spec.rotation = Math.atan2(opp, adj);
        let nextY = spec.speed * elapsedTime * Math.cos(spec.rotation);
        let nextX = spec.speed * elapsedTime * Math.sin(spec.rotation);

        // if the enemy center position is close to the destination, set the enemy position = to its destination
        if (spec.center.x <= destination.x + spec.size.width/5 && spec.center.x >= destination.x - spec.size.width/5 &&
            spec.center.y <= destination.y + spec.size.width/5 && spec.center.y >= destination.y - spec.size.width/5)
        {
            spec.center = destination;
            pathIdx++;

            if (spec.center.x === spec.gridPosition.x && spec.center.y === spec.gridPosition.y) {
                spec.mode = 'grid';
                spec.rotation = 0;
            }
        }
        else {
            spec.center.x += nextX;
            spec.center.y -= nextY;
        }
    }



    return {
        update: update,
        moveToPosition: moveToPosition,

        get mode() { return spec.mode; },
        set mode(m) { spec.mode = m; },
        get speed () { return spec.speed; },
        get swayDirection() { return swayDirection; },
        set swayDirection(d) { swayDirection = d; },
        get gridPosition() { return spec.gridPosition; },
        get entryPath() { return spec.entryPath; },
        get image() { return spec.image; },
        get rotation() { return spec.rotation; },
        get center() { return spec.center; },
        get size() { return spec.size; },
    };
};