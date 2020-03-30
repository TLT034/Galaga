// --------------------------------------------------------------
//
// Renders a Bullet object.
//
// spec = {
//    image: ,
//    center: { x: , y: },
//    size: { width: , height: }
//    rotation: angle
// }
//
// --------------------------------------------------------------
MyGame.render.Bullet = (function(graphics) {
    'use strict';

    function render(spec) {
        graphics.drawTexture(spec.image, spec.center, spec.rotation, spec.size);
    }

    return {
        render: render
    };
}(MyGame.graphics));