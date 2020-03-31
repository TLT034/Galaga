// --------------------------------------------------------------
//
// Renders the particles in a particle system
//
// --------------------------------------------------------------
MyGame.render.ParticleSystem = function(graphics) {
    'use strict';

    function render(particles) {
        for (let p = particles.length - 1; p >= 0; p--) {
            graphics.drawTexture(particles[p].image, particles[p].center, particles[p].rotation, particles[p].size);
        }
    }

    return {
        render: render
    };
}(MyGame.graphics);
