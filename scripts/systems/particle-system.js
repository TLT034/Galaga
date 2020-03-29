MyGame.systems.ParticleSystem = function(graphics) {
    let that = {};
    let backgroundParticles = [];
    let particles = [];


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

            return spec.alive < spec.lifetime;
        };

        that.draw = function() {
            //graphics.drawRectangle(spec);
            graphics.drawTexture(spec.image, spec.center, spec.rotation, spec.size);
        };

        return that;
    }



    that.backgroundParticles = function(elapsedTime) {
        let sizeAvg = 5.5;
        let sizeStdev = 2;
        let lifeAvg = 500;
        let liveStdev = 300;
        let starImage = new Image();
        starImage.src = 'assets/images/star.png';

        let keepMe = [];
        for (let i = 0; i < backgroundParticles.length; i++) {
            if (backgroundParticles[i].update(elapsedTime)) {
                keepMe.push(backgroundParticles[i]);
            }
        }
        backgroundParticles = keepMe;

        for (let i = 0; i < 2; i++) {
            let size = Math.abs(Random.nextGaussian(sizeAvg, sizeStdev));
            let p = create({
                image: starImage,
                center: { x: Random.nextRange(0, graphics.canvas.width), y: Random.nextRange(0, graphics.canvas.height)},
                size: {width: size, height: size},
                rotation: 0,
                speed: 0.3,
                direction: {x: 0, y: 1},
                lifetime: Random.nextGaussian(lifeAvg, liveStdev)
            });
            backgroundParticles.push(p);
        }
    };



    that.clearParticles = function() {
        particles = [];
    };

    that.render = function() {
        for (let p = particles.length - 1; p >= 0; p--) {
            particles[p].draw();
        }
        for (let bp = backgroundParticles.length - 1; bp >= 0; bp--) {
            backgroundParticles[bp].draw();
        }
    };


    return that;
}(MyGame.graphics);
