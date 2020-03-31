MyGame.systems.ParticleSystem = function(graphics, images) {
    let bgParticles = [];


    // Creates an individual particle
    function create(spec) {
        let that = {};

        function update(elapsedTime) {
            spec.center.x += (spec.speed * spec.direction.x * elapsedTime);
            spec.center.y += (spec.speed * spec.direction.y * elapsedTime);
            spec.alive += elapsedTime;

            spec.rotation += spec.speed * elapsedTime * .01;

            let keepParticle = true;

            // remove particle if it has been alive longer than its lifetime or if it is outside the canvas
            if (spec.alive > spec.lifetime || spec.center.x < 0 || spec.center.y < 0 ||
                spec.center.x > graphics.canvas.width || spec.center.y > graphics.canvas.height) {
                keepParticle = false;
            }

            return keepParticle;
        }

        return {
            update: update,

            get image() {return spec.image},
            get center() {return spec.center},
            get rotation() {return spec.rotation},
            get size() {return spec.size},
        };
    }


    // Updates background star particles
    function stars(elapsedTime) {
        let keepMe = [];
        for (let i = 0; i < bgParticles.length; i++) {
            if (bgParticles[i].update(elapsedTime)) {
                keepMe.push(bgParticles[i]);
            }
        }
        bgParticles = keepMe;

        if (bgParticles.length < 50) {
            let sizeAvg = graphics.canvas.width * MyConstants.star.AVG_SIZE;
            let sizeStdev = graphics.canvas.width * MyConstants.star.STDEV_SIZE;
            let size = Math.abs(Random.nextGaussian(sizeAvg, sizeStdev));
            let lifeAvg = Math.floor(graphics.canvas.width * MyConstants.star.AVG_LIFE);
            let lifeStdev = Math.floor(graphics.canvas.width * MyConstants.star.STDEV_LIFE);
            let speed = graphics.canvas.width * MyConstants.star.SPEED * elapsedTime;

            let p = create({
                image: images['star'],
                center: { x: Random.nextRange(0, graphics.canvas.width), y: Random.nextRange(0, graphics.canvas.height/4)},
                size: {width: size, height: size},
                rotation: 0,
                speed: speed,
                direction: {x: 0, y: 1},
                lifetime: Random.nextGaussian(lifeAvg, lifeStdev)
            });
            bgParticles.push(p);
        }
    }


    return {
        stars: stars,

        get particles() {
            // when more particles return this instead of just bgParticles
            // return bgParticles.concat(otherParticles, otherParticles1,..., otherParticlesn)
            return bgParticles;
        }
    };
}(MyGame.graphics, MyGame.assets.images);
