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
        WIDTH: .075,
        HEIGHT: .08,
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
        TYPES: [
            'greenBoss',
            'butterfly',
            'bee'
        ],
        SIZE: .05,
        SWAY_SPEED: .00007,
        SWAY_SWITCH_TIME: 2,
        SPEED: .0005,
        ENTRY_GAP: .1,
    },
    entryPaths: {
        LEFT: [
            {x: .02, y: .9},{x: .05, y: .84},{x: .1, y: .8},{x: .2, y: .7},{x: .4, y: .6},
            {x: .45, y: .55},{x: .55, y: .515},{x: .65, y: .5},{x: .725, y: .525},{x: .775, y: .575},
            {x: .735, y: .65}, {x: .7, y: .7}, {x: .65, y: .725}, {x: .575, y: .7}, {x: .35, y: .5}
            ],
        RIGHT: [
            {x: 1-.02, y: .9},{x: 1-.05, y: .84},{x: 1-.1, y: .8},{x: 1-.2, y: .7},{x: 1-.4, y: .6},
            {x: 1-.45, y: .55},{x: 1-.55, y: .515},{x: 1-.65, y: .5},{x: 1-.725, y: .525},{x: 1-.775, y: .575},
            {x: 1-.735, y: .65}, {x: 1-.7, y: .7}, {x: 1-.65, y: .725}, {x: 1-.575, y: .7}, {x: 1-.35, y: .5}
        ],
    },
    stages: {
        1: {
            TOTAL_ENEMIES: 32,
            WAVE_FREQUENCY: 6000,
            enemyWaves: [
                {
                    TYPE: 'greenBoss',
                    AMOUNT: 8,
                    COORDS: [
                        {x: 0, y: 0}, {x: 9, y: 0}, {x: 1, y: 0}, {x: 8, y: 0},
                        {x: 2, y: 0}, {x: 7, y: 0}, {x: 3, y: 0}, {x: 6, y: 0}
                        ],
                    ENTRY_SIDE: 'LEFT',
                },
                {
                    TYPE: 'butterfly',
                    AMOUNT: 8,
                    COORDS: [
                        {x: 0, y: 1}, {x: 9, y: 1}, {x: 1, y: 1}, {x: 8, y: 1},
                        {x: 2, y: 1}, {x: 7, y: 1}, {x: 3, y: 1}, {x: 6, y: 1}
                        ],
                    ENTRY_SIDE: 'RIGHT'
                },
                {
                    TYPE: 'bee',
                    AMOUNT: 8,
                    COORDS: [
                        {x: 0, y: 2}, {x: 9, y: 2}, {x: 1, y: 2}, {x: 8, y: 2},
                        {x: 2, y: 2}, {x: 7, y: 2}, {x: 3, y: 2}, {x: 6, y: 2}
                        ],
                    ENTRY_SIDE: 'LEFT'
                },
                {
                    TYPE: 'bee',
                    AMOUNT: 8,
                    COORDS: [
                        {x: 0, y: 3}, {x: 9, y: 3}, {x: 1, y: 3}, {x: 8, y: 3},
                        {x: 2, y: 3}, {x: 7, y: 3}, {x: 3, y: 3}, {x: 6, y: 3}
                        ],
                    ENTRY_SIDE: 'RIGHT'
                },
            ]
        },
        2: {
            WAVE_FREQUENCY: 5500,
            enemyWaves: [
                {
                    TYPE: 'bee',
                    AMOUNT: 10,
                    COORDS: [
                        {x: 0, y: 0}, {x: 9, y: 0}, {x: 1, y: 0}, {x: 8, y: 0},
                        {x: 2, y: 0}, {x: 7, y: 0}, {x: 3, y: 0}, {x: 6, y: 0}
                    ],
                    ENTRY_SIDE: 'LEFT',
                },
                {
                    TYPE: 'purpleBoss',
                    AMOUNT: 10,
                    COORDS: [
                        {x: 0, y: 0}, {x: 9, y: 0}, {x: 1, y: 0}, {x: 8, y: 0},
                        {x: 2, y: 0}, {x: 7, y: 0}, {x: 3, y: 0}, {x: 6, y: 0}
                    ],
                    ENTRY_SIDE: 'LEFT',
                },
                {
                    TYPE: 'bee',
                    AMOUNT: 10,
                    COORDS: [
                        {x: 0, y: 0}, {x: 9, y: 0}, {x: 1, y: 0}, {x: 8, y: 0},
                        {x: 2, y: 0}, {x: 7, y: 0}, {x: 3, y: 0}, {x: 6, y: 0}
                    ],
                    ENTRY_SIDE: 'LEFT'
                },
                {
                    TYPE: 'butterfly',
                    AMOUNT: 10,
                    COORDS: [
                        {x: 0, y: 0}, {x: 9, y: 0}, {x: 1, y: 0}, {x: 8, y: 0},
                        {x: 2, y: 0}, {x: 7, y: 0}, {x: 3, y: 0}, {x: 6, y: 0}
                    ],
                    ENTRY_SIDE: 'RIGHT'
                },
                {
                    TYPE: 'bee',
                    AMOUNT: 10,
                    COORDS: [
                        {x: 0, y: 0}, {x: 9, y: 0}, {x: 1, y: 0}, {x: 8, y: 0},
                        {x: 2, y: 0}, {x: 7, y: 0}, {x: 3, y: 0}, {x: 6, y: 0}
                    ],
                    ENTRY_SIDE: 'RIGHT'
                },
                {
                    TYPE: 'greenBoss',
                    AMOUNT: 10,
                    COORDS: [
                        {x: 0, y: 0}, {x: 9, y: 0}, {x: 1, y: 0}, {x: 8, y: 0},
                        {x: 2, y: 0}, {x: 7, y: 0}, {x: 3, y: 0}, {x: 6, y: 0}
                    ],
                    ENTRY_SIDE: 'LEFT',
                },
            ]
        },
        3: {

        }
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