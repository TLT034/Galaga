MyGame.systems.ScoreSystem = function() {
    'use strict';
    let score;
    refreshHighScoreList(JSON.parse(localStorage.getItem('highScores')));

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

    function checkForHighScore(latestScore) {
        let highScores = [];
        let previousScores = JSON.parse(localStorage.getItem('highScores'));

        if (previousScores !== null) {
            if (Array.isArray(previousScores)){
                highScores = previousScores;
            }
            else {
                highScores = [parseInt(previousScores)];
            }
        }

        // if there are high scores, get the lowest score
        let lowestScore = 0;
        if (highScores.length > 0) {
            lowestScore = Math.min(...highScores);
        }

        // if the last score is better than the lowest score or there are less than 5 high scores,
        // add last score to high scores
        if (latestScore > lowestScore || highScores.length < 5) {
            highScores.push(latestScore);
            highScores.sort(function (a, b) {
                return b - a
            }); //sort in descending order

            // if there are more than 5 high scores, remove the lowest
            if (highScores.length > 5) {
                highScores.pop()
            }
            localStorage.setItem('highScores', JSON.stringify(highScores));
        }

        refreshHighScoreList(highScores);
    }

    function refreshHighScoreList(highScoreList) {
        let htmlNode = document.getElementById('high-score-list');
        htmlNode.innerHTML = '';
        // if there exists any high scores
        if (highScoreList) {
            for (let i = 0; i < highScoreList.length; i++) {
                let listItem = document.createElement('li');
                listItem.appendChild(document.createTextNode(`${i+1}:\t${highScoreList[i]}`));
                htmlNode.appendChild(listItem);
            }
            let emptyRanks = 5 - highScoreList.length;
            for (let i = 0; i < emptyRanks; i++) {
                let listItem = document.createElement('li');
                listItem.appendChild(document.createTextNode(`${i+1+5-emptyRanks}:\t${0}`));
                htmlNode.appendChild(listItem);
            }
        }
        else {
            for (let i = 1; i < 6; i++) {
                let listItem = document.createElement('li');
                listItem.appendChild(document.createTextNode(`${i}:\t${0}`));
                htmlNode.appendChild(listItem);
            }
        }
    }



    return {
        initialize: initialize,
        enemyKilled: enemyKilled,
        challengeBonus: challengeBonus,
        waveCleared: waveCleared,
        checkForHighScore: checkForHighScore,

        get score() {return score},
    }
}();