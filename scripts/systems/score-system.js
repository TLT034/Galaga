MyGame.systems.ScoreSystem = function() {
    'use strict';
    let score;

    function initialize() {
        score = 0;
    }


    function enemyKilled(enemy, bonusPointsToRender) {
        switch (enemy.type) {
            case 'bee':
                if (enemy.mode !== 'grid') {
                    score += MyConstants.scoring.BEE_ATTACKING;
                }
                else {
                    score += MyConstants.scoring.BEE_STATIONARY;
                }
                break;
            case 'butterfly':
                if (enemy.mode !== 'grid') {
                    score += MyConstants.scoring.BUTTERFLY_ATTACKING;
                }
                else {
                    score += MyConstants.scoring.BUTTERFLY_STATIONARY;
                }
                break;
            case 'greenBoss':
            case 'purpleBoss':
                if (enemy.mode !== 'grid') {
                    score += MyConstants.scoring.BOSS_ATTACKING;
                    bonusPointsToRender.push({
                        amount: MyConstants.scoring.BOSS_ATTACKING,
                        position: {x: enemy.center.x, y: enemy.center.y},
                        lifetime: 1000,
                        timeAlive: 0,
                        color: '#0091FF'
                    });
                }
                else {
                    score += MyConstants.scoring.BOSS_STATIONARY;
                }
                break;
            case 'transform1':
            case 'transform2':
            case 'transform3':
                score += MyConstants.scoring.TRANSFORM;
                break;
            case 'bonus1':
            case 'bonus2':
            case 'bonus3':
                score += MyConstants.scoring.BONUS_SHIP;
        }
    }

    function challengeBonus(numEnemiesHit) {
        score += numEnemiesHit * MyConstants.scoring.CHALLENGING_STAGE_HIT;
    }

    function waveCleared(enemyPosition, bonusPointsToRender) {
        score += MyConstants.scoring.CHALLENGING_STAGE_GROUP;
        bonusPointsToRender.push({
            amount: MyConstants.scoring.CHALLENGING_STAGE_GROUP,
            position: {x: enemyPosition.x, y: enemyPosition.y},
            lifetime: 1500,
            timeAlive: 0,
            color: 'white'
        });
    }



    return {
        initialize: initialize,
        enemyKilled: enemyKilled,
        challengeBonus: challengeBonus,
        waveCleared: waveCleared,

        get score() {return score},

    }
}();