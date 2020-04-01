// --------------------------------------------------------------
//
// Renders a Bullet objects.
//
// bullet = {
//    image: ,
//    center: { x: , y: },
//    size: { width: , height: }
//    rotation: angle
// }
//
// --------------------------------------------------------------
MyGame.render.Bullets = (function(graphics) {
    'use strict';

    function render(bullets) {
        for (let i = 0; i < bullets.length; i++) {
            graphics.drawTexture(bullets[i].image, bullets[i].center, bullets[i].rotation, bullets[i].size);
        }
    }

    return {
        render: render
    };
}(MyGame.graphics));