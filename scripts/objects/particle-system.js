MyGame.objects.ParticleSystem = function(graphics, spec) {
    let that = {};
    let particles = [];

    function create(spec) {
        let that = {};

        spec.fill = 'rgb(255, 255, 255)';
        spec.stroke = 'rgb(0, 0, 0)';
        spec.alive = 0;

        that.update = function(elapsedTime) {
            spec.center.x += (spec.speed/2 * spec.direction.x * elapsedTime);
            spec.center.y += (spec.speed * spec.direction.y * elapsedTime);
            spec.alive += elapsedTime;

            spec.rotation += spec.speed * 0.5;

            return spec.alive < spec.lifetime;
        };

        that.draw = function() {
            //graphics.drawRectangle(spec);
            graphics.drawTexture(spec.image, spec.center, spec.rotation, spec.size);
        };

        return that;
    }

    that.update = function(elapsedTime) {
        let keepMe = [];
        for (let particle = 0; particle < particles.length; particle++) {
            if (particles[particle].update(elapsedTime)) {
                keepMe.push(particles[particle]);
            }
        }
        particles = keepMe;

        for (let particle = 0; particle < 5; particle++) {
            let size = Math.abs(Random.nextGaussian(spec.size.mean, spec.size.stdev));
            let p = create({
                image: spec.image,
                center: { x: spec.center.x, y: spec.center.y },
                size: {width: size, height: size},
                rotation: 0,
                speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev),
                direction: Random.nextCircleVector(),
                lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev)
            });
            particles.push(p);
        }
    };

    that.render = function() {
        for (let p = particles.length - 1; p >= 0; p--) {
            particles[p].draw();
        }
    };


    that.startShipThrust = function(elapsedTime, rotation, position,) {
        let keepMe = [];
        for (let particle = 0; particle < particles.length; particle++) {
            if (particles[particle].update(elapsedTime)) {
                keepMe.push(particles[particle]);
            }
        }
        particles = keepMe;

        let dirX = Math.cos(Random.nextGaussian(rotation, .05));
        let dirY = Math.sin(Random.nextGaussian(rotation, .05));

        for (let particle = 0; particle < 5; particle++) {
            let size = Math.abs(Random.nextGaussian(spec.size.mean, spec.size.stdev));
            let p = create({
                image: spec.image,
                center: { x: position.x, y: position.y },
                size: {width: size, height: size},
                rotation: 0,
                speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev),
                direction: {x: dirX, y: dirY},
                lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev)
            });
            particles.push(p);
        }
    };

    that.clearParticles = function() {
        particles = [];
    };


    that.shipExplosion = function(elapsedTime, position) {
        let keepMe = [];
        for (let particle = 0; particle < particles.length; particle++) {
            if (particles[particle].update(elapsedTime)) {
                keepMe.push(particles[particle]);
            }
        }
        particles = keepMe;

        for (let particle = 0; particle < 5; particle++) {
            let size = Math.abs(Random.nextGaussian(spec.size.mean, spec.size.stdev));
            let p = create({
                image: spec.image,
                center: { x: position.x, y: position.y },
                size: {width: size, height: size},
                rotation: 0,
                speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev),
                direction: Random.nextCircleVector(),
                lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev)
            });
            particles.push(p);
        }
    };




    return that;
};
