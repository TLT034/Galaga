MyGame.systems.ParticleSystem = function(graphics, images) {
    let bgParticles = [];
    let explosionParticles = [];


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

            get alive() {return spec.alive},
            get lifetime() {return spec.lifetime},
            get image() {return spec.image},
            get center() {return spec.center},
            get rotation() {return spec.rotation},
            get size() {return spec.size},
        };
    }
    //
    // Updates background star particles
    function stars(elapsedTime) {
        if (bgParticles.length < 60) {
            let sizeAvg = graphics.canvas.width * MyConstants.star.AVG_SIZE;
            let sizeStdev = graphics.canvas.width * MyConstants.star.STDEV_SIZE;
            let size = Math.abs(Random.nextGaussian(sizeAvg, sizeStdev));
            let lifeAvg = Math.floor(graphics.canvas.width * MyConstants.star.AVG_LIFE);
            let lifeStdev = Math.floor(graphics.canvas.width * MyConstants.star.STDEV_LIFE);
            let speed = graphics.canvas.width * MyConstants.star.SPEED;

            let p = create({
                image: images['star'],
                center: { x: Random.nextRange(0, graphics.canvas.width), y: Random.nextRange(0, graphics.canvas.height)},
                size: {width: size, height: size},
                rotation: 0,
                speed: speed,
                direction: {x: 0, y: 1},
                lifetime: Random.nextGaussian(lifeAvg, lifeStdev),
                alive: 0
            });
            bgParticles.push(p);
        }
    }
    //
    // Creates explosion particles
    function enemyExplosion(position) {
        for (let i = 0; i < 50; i++) {
            let sizeAvg = graphics.canvas.width * MyConstants.enemyFire.AVG_SIZE;
            let sizeStdev = graphics.canvas.width * MyConstants.enemyFire.STDEV_SIZE;
            let size = Math.abs(Random.nextGaussian(sizeAvg, sizeStdev));
            let lifeAvg = Math.floor(graphics.canvas.width * MyConstants.enemyFire.AVG_LIFE);
            let lifeStdev = Math.floor(graphics.canvas.width * MyConstants.enemyFire.STDEV_LIFE);
            let speedAvg = graphics.canvas.width * MyConstants.enemyFire.AVG_SPEED;
            let speedStdev = graphics.canvas.width * MyConstants.enemyFire.STDEV_SPEED;
            let direction = Random.nextCircleVector();

            let p = create({
                image: images['fire'],
                center: { x: position.x, y: position.y },
                size: {width: size, height: size},
                rotation: 0,
                speed: Random.nextGaussian(speedAvg, speedStdev),
                direction: {x: direction.x, y: direction.y},
                lifetime: Random.nextGaussian(lifeAvg, lifeStdev),
                alive: 0
            });
            explosionParticles.push(p);
        }
    }
    //
    // Creates explosion particles
    function playerExplosion(position) {
        for (let i = 0; i < 50; i++) {
            let sizeAvg = graphics.canvas.width * MyConstants.playerFire.AVG_SIZE;
            let sizeStdev = graphics.canvas.width * MyConstants.playerFire.STDEV_SIZE;
            let size = Math.abs(Random.nextGaussian(sizeAvg, sizeStdev));
            let lifeAvg = Math.floor(graphics.canvas.width * MyConstants.playerFire.AVG_LIFE);
            let lifeStdev = Math.floor(graphics.canvas.width * MyConstants.playerFire.STDEV_LIFE);
            let speedAvg = graphics.canvas.width * MyConstants.playerFire.AVG_SPEED;
            let speedStdev = graphics.canvas.width * MyConstants.playerFire.STDEV_SPEED;
            let direction = Random.nextCircleVector();

            let p = create({
                image: images['fire'],
                center: { x: position.x, y: position.y },
                size: {width: size, height: size},
                rotation: 0,
                speed: Random.nextGaussian(speedAvg, speedStdev),
                direction: {x: direction.x, y: direction.y},
                lifetime: Random.nextGaussian(lifeAvg, lifeStdev),
                alive: 0
            });
            explosionParticles.push(p);
        }
    }
    //
    // Removes any particles that have reached their lifetime
    function updateParticleLifetime(elapsedTime) {
        let keepMe = [];
        for (let i = 0; i < bgParticles.length; i++) {
            if (bgParticles[i].update(elapsedTime)) {
                keepMe.push(bgParticles[i]);
            }
        }
        bgParticles = keepMe;

        let keepMe2 = [];
        for (let i = 0; i < explosionParticles.length; i++) {
            if (explosionParticles[i].update(elapsedTime)) {
                keepMe2.push(explosionParticles[i]);
            }
        }
        explosionParticles = keepMe2;
    }


    return {
        stars: stars,
        enemyExplosion: enemyExplosion,
        playerExplosion: playerExplosion,
        updateParticleLifetime: updateParticleLifetime,

        get particles() {
            // when more particles return this instead of just bgParticles
            // return bgParticles.concat(otherParticles, otherParticles1,..., otherParticlesn)
            return bgParticles.concat(explosionParticles);
        }
    };
}(MyGame.graphics, MyGame.assets.images);
