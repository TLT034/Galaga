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

    function render(playerShip, enemyShips) {
        graphics.drawTexture(playerShip.image, playerShip.center, playerShip.rotation, playerShip.size);

        for (let i = 0; i < enemyShips.length; i++) {
            graphics.drawTexture(enemyShips[i].image, enemyShips[i].center, enemyShips[i].rotation, enemyShips[i].size);
        }
    }

    return {
        render: render
    };
}(MyGame.graphics));