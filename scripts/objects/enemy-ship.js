// --------------------------------------------------------------
//
// Creates a PlayerShip object, with functions for managing state.
//
// spec = {
//         id: int
//         type: bee, butterfly, boss, bonus1, etc.
//         image: image asset,
//         center: { x: , y: },
//         size: { width: , height:  },
//         speed: float,
//         shots: [bullet objects],
//         shootSound: soundSystem sound effect,
//         entryPath: []
//         attackPath: []
//         gridPosition: { x: , y: }
//         mode: AI mode,
//         reentryPoint: point above canvas to return from after attacking
//         shots: [],
//         shootPositions: []
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
                if (pathIdx < spec.attackPath.length) {
                    moveToPosition(elapsedTime, spec.attackPath[pathIdx]);
                }
                else {
                    moveToPosition(elapsedTime, spec.gridPosition);
                }
                break;
            // player death: return to grid positions and stay in grid
            case 'playerDeath':
                moveToPosition(elapsedTime, spec.gridPosition);
                break;
            // challenge stage: fly path with no return
            case 'bonus':
                if (pathIdx < spec.entryPath.length) {
                    moveToPosition(elapsedTime, spec.entryPath[pathIdx]);
                }
                break;

        }
    }

    function moveToPosition(elapsedTime, destination) {
        let adj = spec.center.y - destination.y;
        let opp = destination.x - spec.center.x;
        spec.rotation = Math.atan2(opp, adj);

        let enemySpeed = spec.entrySpeed;
        if (spec.mode === 'attack') {enemySpeed = spec.attackSpeed}

        let nextY = enemySpeed * elapsedTime * Math.cos(spec.rotation);
        let nextX = enemySpeed * elapsedTime * Math.sin(spec.rotation);
        //
        // if the enemy center position is close to the destination, set the enemy position equal to its destination
        if (spec.center.x <= destination.x + spec.size.width/5 && spec.center.x >= destination.x - spec.size.width/5 &&
            spec.center.y <= destination.y + spec.size.width/5 && spec.center.y >= destination.y - spec.size.width/5)
        {
            spec.center.x = destination.x;
            spec.center.y = destination.y;
            pathIdx++;
            //
            // if the current enemy position is a shooting position, then shoot
            for (let i = 0; i < spec.shootPositions.length; i++) {
                if (spec.center.x === spec.shootPositions[i].x && spec.center.y === spec.shootPositions[i].y) {
                    shoot();
                }
            }
            //
            // if the enemy is attacking and it made it to its last point in path, return to grid from top of screen
            if (spec.mode === 'attack' && pathIdx === spec.attackPath.length) {
                spec.center.x = spec.reentryPoint.x;
                spec.center.y = spec.reentryPoint.y;
            }
            //
            // if the enemy made it to grid position switch to grid mode
            else if (spec.center.x === spec.gridPosition.x && spec.center.y === spec.gridPosition.y) {
                spec.mode = 'grid';
                spec.rotation = 0;
                pathIdx = 0;
            }
        }
        else {
            spec.center.x += nextX;
            spec.center.y -= nextY;
        }
    }

    function shoot() {
        spec.addBullet(MyGame.objects.Bullet({
            image: MyGame.assets.images['enemyBullet'],
            center: { x: spec.center.x, y: spec.center.y - spec.size.height/2},
            size: {
                width: MyGame.graphics.canvas.width * MyConstants.enemyBullet.WIDTH,
                height: MyGame.graphics.canvas.height * MyConstants.enemyBullet.HEIGHT
            },
            speed: MyGame.graphics.canvas.width * MyConstants.enemyBullet.SPEED,
            rotation: spec.rotation,
            hitShip: false
        }));
    }



    return {
        update: update,

        get id() { return spec.id; },
        get type() { return spec.type; },
        set type(t) { spec.type = t; },
        get mode() { return spec.mode; },
        set mode(m) { spec.mode = m; },
        get speed () { return spec.speed; },
        get shots() { return spec.shots; },
        get swayDirection() { return swayDirection; },
        set swayDirection(d) { swayDirection = d; },
        get gridPosition() { return spec.gridPosition; },
        get entryPath() { return spec.entryPath; },
        get image() { return spec.image; },
        set image(i) { spec.image = i; },
        get rotation() { return spec.rotation; },
        get center() { return spec.center; },
        get size() { return spec.size; },
    };
};