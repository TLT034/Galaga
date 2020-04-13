// --------------------------------------------------------------
//
// Renders a Ship objects.
//
// ship = {
//    image: ,
//    center: { x: , y: },
//    size: { width: , height: }
//    rotation: angle
// }
//
// --------------------------------------------------------------
MyGame.render.Ships = (function(graphics) {
    'use strict';

    function renderPlayerShip(ship) {
        graphics.drawTexture(ship.image, ship.center, ship.rotation, ship.size);
    }

    function renderEnemyShips(ships) {
        for (let i = 0; i < ships.length; i++) {
            graphics.drawTexture(ships[i].image, ships[i].center, ships[i].rotation, ships[i].size);
        }
    }

    return {
        renderPlayerShip: renderPlayerShip,
        renderEnemyShips: renderEnemyShips
    };
}(MyGame.graphics));