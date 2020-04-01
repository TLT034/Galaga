//----------------------------------------
//
// Constants for Galaga Game
//
//----------------------------------------
let MyConstants = Object.freeze({
    //----------------------------------------------------------------
    // Values are a percentage of canvas size. This allows the game
    // to feel the same no matter the size of the canvas.
    //----------------------------------------------------------------
    star: {
        AVG_SIZE: .004717,
        STDEV_SIZE: .00171,
        AVG_LIFE: 1,
        STDEV_LIFE: .5,
        SPEED: .00002
    },
    playerShip: {
        WIDTH: .1,
        HEIGHT: .1,
        SPEED: .000588,
    },
    playerBullet: {
        WIDTH: .00428,
        HEIGHT: .01712,
        SPEED: .000856,
    },
    enemyGrid: {
        CELL_SIZE: .067,
        COLUMNS: 10,
        ROWS: 6,
        START_X: .2,
        START_Y: .075,
    },
    enemy: {
        SIZE: .05,
        SWAY_SPEED: .00007,
        SWAY_SWITCH_TIME: 2
    },



    //----------------------------------------------------------------
    // Volume and loop settings for all sound effects.
    //----------------------------------------------------------------
    soundSettings: {
        menuMusic: {
            VOLUME: .08,
            LOOP: true
        },
        inGameMusic: {
            VOLUME: .04,
            LOOP: true
        },
        buttonHover: {
            VOLUME: .55,
            LOOP: false
        },
        buttonClick: {
            VOLUME: .55,
            LOOP: false
        },
        playerShoot: {
            VOLUME: 1,
            LOOP: false
        },
    }
});