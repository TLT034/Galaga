MyGame.systems.ParticleSystem = function(graphics, images) {
    let that = {};
    let bgParticles = [];


    // Create individual particle
    function create(spec) {
        let that = {};

        spec.fill = 'rgb(255, 255, 255)';
        spec.stroke = 'rgb(0, 0, 0)';
        spec.alive = 0;

        that.update = function(elapsedTime) {
            spec.center.x += (spec.speed * spec.direction.x * elapsedTime);
            spec.center.y += (spec.speed * spec.direction.y * elapsedTime);
            spec.alive += elapsedTime;

            spec.rotation += spec.speed * 0.5;

            let keepParticle = true;

            // remove particle if it has been alive longer than its lifetime or if it is outside the canvas
            if (spec.alive > spec.lifetime || spec.center.x < 0 || spec.center.y < 0 ||
                spec.center.x > graphics.canvas.width || spec.center.y > graphics.canvas.height) {
                keepParticle = false;
            }

            return keepParticle;
        };

        that.draw = function() {
            graphics.drawTexture(spec.image, spec.center, spec.rotation, spec.size);
        };

        return that;
    }



    that.backgroundParticles = function(elapsedTime) {
        // Size, lifetime, Speed of particles are all relative to canvas
        // size to make the game feel the same no matter the size of canvas.
        let sizeAvg = graphics.canvas.width * MyConstants.star.AVG_SIZE;
        let sizeStdev = graphics.canvas.width * MyConstants.star.STDEV_SIZE;
        let lifeAvg = Math.floor(graphics.canvas.width * MyConstants.star.AVG_LIFE);
        let lifeStdev = Math.floor(graphics.canvas.width * MyConstants.star.STDEV_LIFE);
        let speed = graphics.canvas.width * MyConstants.star.SPEED;

        let keepMe = [];
        for (let i = 0; i < bgParticles.length; i++) {
            if (bgParticles[i].update(elapsedTime)) {
                keepMe.push(bgParticles[i]);
            }
        }
        bgParticles = keepMe;

        for (let i = 0; i < 2; i++) {
            let size = Math.abs(Random.nextGaussian(sizeAvg, sizeStdev));
            let p = create({
                image: images['star'],
                center: { x: Random.nextRange(0, graphics.canvas.width), y: Random.nextRange(0, graphics.canvas.height)},
                size: {width: size, height: size},
                rotation: 0,
                speed: speed,
                direction: {x: 0, y: 1},
                lifetime: Random.nextGaussian(lifeAvg, lifeStdev)
            });
            bgParticles.push(p);
        }
    };



    that.render = function() {
        for (let bp = bgParticles.length - 1; bp >= 0; bp--) {
            bgParticles[bp].draw();
        }
    };


    return that;
}(MyGame.graphics, MyGame.assets.images);
