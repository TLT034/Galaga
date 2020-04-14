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

    function renderPlayerLifeShips(numLives, image) {
        let size = MyConstants.playerShip.SIZE_OF_EXTRA_LIVES * graphics.canvas.width;
        for (let i = 0; i < numLives; i++) {
            graphics.drawTexture(
                image,
                {x: graphics.canvas.width * .97 - (i * size * 1.1), y: graphics.canvas.height * .97},
                0,
                {width: size, height: size}
            );
        }
    }

    return {
        renderPlayerShip: renderPlayerShip,
        renderEnemyShips: renderEnemyShips,
        renderPlayerLifeShips: renderPlayerLifeShips
    };
}(MyGame.graphics));