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

    //
    // particles
    star: {
        AVG_SIZE: .004717,
        STDEV_SIZE: .00171,
        AVG_LIFE: .5,
        STDEV_LIFE: .25,
        SPEED: .0003
    },
    enemyFire: {
        AVG_SIZE: .01,
        STDEV_SIZE: .005,
        AVG_LIFE: .5,
        STDEV_LIFE: .2,
        AVG_SPEED:   .00003,
        STDEV_SPEED: .00001
    },
    playerFire: {
        AVG_SIZE: .015,
        STDEV_SIZE: .005,
        AVG_LIFE: .75,
        STDEV_LIFE: .25,
        AVG_SPEED:   .00003,
        STDEV_SPEED: .00001
    },

    //
    // objects
    playerShip: {
        WIDTH: .075,
        HEIGHT: .08,
        SPEED: .000588,
    },
    playerBullet: {
        WIDTH: .00428,
        HEIGHT: .01712,
        SPEED: .0015,
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
        ENTRY_SPEED: .0008,
        ENTRY_GAP: .1,
        RE_ENTRY_POINT: {x: .5, y: -.1}
    },

    //
    // positions
    enemyGrid: {
        CELL_SIZE: .067,
        COLUMNS: 10,
        ROWS: 6,
        START_X: .2,
        START_Y: .075,
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
    attackPaths: [
        [
            {x: .5, y: .1},{x: .43, y: .2},{x: .423, y: .25},{x: .415, y: .3},{x: .423, y: .375},
            {x: .45, y: .425},{x: .475, y: .475},{x: .52, y: .51},{x: .55, y: .55},{x: .59, y: .61},
            {x: .61, y: .7}, {x: .615, y: .75}, {x: .61, y: .82}, {x: .58, y: .885}, {x: .45, y: 1.1},
        ],
        [
            {x: 1-.5, y: .1},{x: 1-.43, y: .2},{x: 1-.423, y: .25},{x: 1-.415, y: .3},{x: 1-.423, y: .375},
            {x: 1-.45, y: .425},{x: 1-.475, y: .475},{x: 1-.52, y: .51},{x: 1-.55, y: .55},{x: 1-.59, y: .61},
            {x: 1-.61, y: .7}, {x: 1-.615, y: .75}, {x: 1-.61, y: .82}, {x: 1-.58, y: .885}, {x: 1-.45, y: 1.1},
        ],
        [
            {x: .5, y: .1},{x: .4, y: .12},{x: .35, y: .14},{x: .3, y: .175},{x: .24, y: .21},
            {x: .21, y: .3},{x: .22, y: .36},{x: .25, y: .425},{x: .27, y: .45},{x: .32, y: .48},
            {x: .4, y: .5}, {x: .5, y: .5}, {x: .6, y: .51}, {x: .7, y: .53}, {x: .76, y: .56},
            {x: .8, y: .6}, {x: .83, y: .66}, {x: .85, y: .7}, {x: .855, y: .755}, {x: .825, y: .8},
            {x: .8, y: .85}, {x: .75, y: .9}, {x: .7, y: .925}, {x: .5, y: .99}, {x: .35, y: 1.1},
        ],
        [
            {x: 1-.5, y: .1},{x: 1-.4, y: .12},{x: 1-.35, y: .14},{x: 1-.3, y: .175},{x: 1-.24, y: .21},
            {x: 1-.21, y: .3},{x: 1-.22, y: .36},{x: 1-.25, y: .425},{x: 1-.27, y: .45},{x: 1-.32, y: .48},
            {x: 1-.4, y: .5}, {x: 1-.5, y: .5}, {x: 1-.6, y: .51}, {x: 1-.7, y: .53}, {x: 1-.76, y: .56},
            {x: 1-.8, y: .6}, {x: 1-.83, y: .66}, {x: 1-.85, y: .7}, {x: 1-.855, y: .755}, {x: 1-.825, y: .8},
            {x: 1-.8, y: .85}, {x: 1-.75, y: .9}, {x: 1-.7, y: .925}, {x: 1-.5, y: .99}, {x: 1-.35, y: 1.1},
        ],
        [
            {x: .5, y: .1},{x: .4, y: .7},{x: .37, y: .8},{x: .3, y: .86},{x: .25, y: .87},
            {x: .2, y: .88},{x: .15, y: .86},{x: .1, y: .82},{x: .06, y: .77},{x: .04, y: .7},
            {x: .06, y: .61}, {x: .1, y: .53}, {x: .15, y: .49}, {x: .22, y: .475}, {x: .3, y: .49},
            {x: .395, y: .495}, {x: .45, y: .52}, {x: .5, y: .55}, {x: .55, y: .6}, {x: .58, y: .64},
            {x: .61, y: .7}, {x: .65, y: .8}, {x: .66, y: .9}, {x: .665, y: 1.1}
        ],
        [
            {x: 1-.5, y: .1},{x: 1-.4, y: .7},{x: 1-.37, y: .8},{x: 1-.3, y: .86},{x: 1-.25, y: .87},
            {x: 1-.2, y: .88},{x: 1-.15, y: .86},{x: 1-.1, y: .82},{x: 1-.06, y: .77},{x: 1-.04, y: .7},
            {x: 1-.06, y: .61}, {x: 1-.1, y: .53}, {x: 1-.15, y: .49}, {x: 1-.22, y: .475}, {x: 1-.3, y: .49},
            {x: 1-.395, y: .495}, {x: 1-.45, y: .52}, {x: 1-.5, y: .55}, {x: 1-.55, y: .6}, {x: 1-.58, y: .64},
            {x: 1-.61, y: .7}, {x: 1-.65, y: .8}, {x: 1-.66, y: .9}, {x: 1-.665, y: 1.1}
        ],

    ],

    //
    // stage specific constants
    stages: {
        1: {
            ATTACK_SPEED: .0004,
            TOTAL_ENEMIES: 32,
            WAVE_FREQUENCY: 5000,
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
            ATTACK_SPEED: .0007,
            WAVE_FREQUENCY: 4500,
            enemyWaves: [
                {
                    TYPE: 'bee',
                    AMOUNT: 10,
                    COORDS: [
                        {x: 0, y: 4}, {x: 9, y: 4}, {x: 1, y: 4}, {x: 8, y: 4}, {x: 2, y: 4},
                        {x: 7, y: 4}, {x: 3, y: 4}, {x: 6, y: 4}, {x: 4, y: 4}, {x: 5, y: 4}
                    ],
                    ENTRY_SIDE: 'LEFT',
                },
                {
                    TYPE: 'purpleBoss',
                    AMOUNT: 10,
                    COORDS: [
                        {x: 4, y: 0}, {x: 5, y: 0}, {x: 3, y: 0}, {x: 6, y: 0}, {x: 2, y: 0},
                        {x: 7, y: 0}, {x: 1, y: 0}, {x: 8, y: 0}, {x: 0, y: 0}, {x: 9, y: 0}
                    ],
                    ENTRY_SIDE: 'LEFT',
                },
                {
                    TYPE: 'bee',
                    AMOUNT: 10,
                    COORDS: [
                        {x: 0, y: 5}, {x: 9, y: 5}, {x: 1, y: 5}, {x: 8, y: 5}, {x: 2, y: 5},
                        {x: 7, y: 5}, {x: 3, y: 5}, {x: 6, y: 5}, {x: 4, y: 5}, {x: 5, y: 5}
                    ],
                    ENTRY_SIDE: 'LEFT'
                },
                {
                    TYPE: 'butterfly',
                    AMOUNT: 10,
                    COORDS: [
                        {x: 4, y: 2}, {x: 5, y: 2}, {x: 3, y: 2}, {x: 6, y: 2}, {x: 2, y: 2},
                        {x: 7, y: 2}, {x: 1, y: 2}, {x: 8, y: 2}, {x: 0, y: 2}, {x: 9, y: 2}
                    ],
                    ENTRY_SIDE: 'RIGHT'
                },
                {
                    TYPE: 'bee',
                    AMOUNT: 10,
                    COORDS: [
                        {x: 0, y: 3}, {x: 9, y: 3}, {x: 1, y: 3}, {x: 8, y: 3}, {x: 2, y: 3},
                        {x: 7, y: 3}, {x: 3, y: 3}, {x: 6, y: 3}, {x: 4, y: 3}, {x: 5, y: 3}
                    ],
                    ENTRY_SIDE: 'RIGHT'
                },
                {
                    TYPE: 'greenBoss',
                    AMOUNT: 10,
                    COORDS: [
                        {x: 4, y: 1}, {x: 5, y: 1}, {x: 3, y: 1}, {x: 6, y: 1}, {x: 2, y: 1},
                        {x: 7, y: 1}, {x: 1, y: 1}, {x: 8, y: 1}, {x: 0, y: 1}, {x: 9, y: 1}
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
            VOLUME: .3,
            LOOP: true
        },
        inGameMusic: {
            VOLUME: .04,
            LOOP: true
        },
        buttonHover: {
            VOLUME: 1,
            LOOP: false
        },
        buttonClick: {
            VOLUME: 1,
            LOOP: false
        },
        playerShoot: {
            VOLUME: 1,
            LOOP: false
        },
        enemyKill: {
            VOLUME: 1,
            LOOP: false
        },
        themeSong: {
            VOLUME: .6,
            LOOP: false
        },
    }
});