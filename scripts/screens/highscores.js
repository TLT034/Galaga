MyGame.screens['high-scores'] = (function(game) {
    'use strict';

    let lastScore = null;

    function updateMostRecentScore(score){
        lastScore = score;
        checkForHighScore();
    }

    function checkForHighScore(){
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
        if (lastScore > lowestScore || highScores.length < 5) {
            highScores.push(lastScore);
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
                listItem.appendChild(document.createTextNode(`${i+1}: ${highScoreList[i]}`));
                htmlNode.appendChild(listItem);
            }
        }
    }


    function initialize() {
        document.getElementById('high-scores-back-button').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); });

        refreshHighScoreList(JSON.parse(localStorage.getItem('highScores')));
    }

    function run() {

    }

    return {
        initialize : initialize,
        run : run,
        updateMostRecentScore : updateMostRecentScore

    };
}(MyGame.game));