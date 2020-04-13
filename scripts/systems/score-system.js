MyGame.systems.ScoreSystem = function() {
    'use strict';
    let score;

    function initialize() {
        score = 0;
    }


    function enemyKilled(enemy) {
        switch (enemy.type) {
            case 'bee':
                if (enemy.mode === 'attack' || enemy.mode === 'entry') {
                    score += MyConstants.killValues.BEE_ATTACKING;
                }
                else {
                    score += MyConstants.killValues.BEE_STATIONARY;
                }
                break;
            case 'butterfly':
                if (enemy.mode === 'attack' || enemy.mode === 'entry') {
                    score += MyConstants.killValues.BUTTERFLY_ATTACKING;
                }
                else {
                    score += MyConstants.killValues.BUTTERFLY_STATIONARY;
                }
                break;
            case 'greenBoss':
            case 'purpleBoss':
                if (enemy.mode === 'attack' || enemy.mode === 'entry') {
                    score += MyConstants.killValues.BOSS_ATTACKING;
                }
                else {
                    score += MyConstants.killValues.BOSS_STATIONARY;
                }
                break;
            case 'transform1':
            case 'transform2':
            case 'transform3':
                score += MyConstants.killValues.TRANSFORM;
                break;
        }
    }



    return {
        initialize: initialize,
        enemyKilled: enemyKilled,

        get score() {return score},

    }
}();