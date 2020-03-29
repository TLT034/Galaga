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
            graphics.drawTexture(spec.image, spec.center, spec.rotation, spec.size);
        };

        return that;
    }



    that.backgroundParticles = function(elapsedTime) {
        // Size, lifetime, Speed of particles are all relative to canvas
        // size to make the game feel the same no matter the size of canvas.
        let sizeAvg = graphics.canvas.width/212;
        console.log(sizeAvg);
        let sizeStdev = graphics.canvas.width/585;
        console.log(sizeStdev);
        let lifeAvg = Math.floor(graphics.canvas.width/2.5);
        let lifeStdev = Math.floor(graphics.canvas.width/4);
        let speed = graphics.canvas.width/3900;

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
                speed: speed,
                direction: {x: 0, y: 1},
                lifetime: Random.nextGaussian(lifeAvg, lifeStdev)
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
