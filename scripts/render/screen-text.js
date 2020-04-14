// --------------------------------------------------------------
//
// Renders the on screen information (Game over, countdown, etc).
//
// --------------------------------------------------------------
MyGame.render.ScreenText = (function(graphics) {
    'use strict';

    function renderScore(score) {
        let scoreText = `Score: ${score}`;
        graphics.drawText(
            scoreText,
            {x: graphics.canvas.width * .01, y: graphics.canvas.height * .99},
            `${Math.floor(graphics.canvas.width * MyConstants.textSizes.SMALL)}px Orbitron`,
            '#f5eaea'
        );
    }

    function renderCountdown(time) {
        let spec = {
            font: `${Math.floor(graphics.canvas.width * MyConstants.textSizes.LARGE)}px Orbitron`,
            fill: '#f5eaea',
            text: Math.ceil(time / 1000).toString()
        };
        let textWidth = graphics.measureTextWidth(spec);
        let textHeight = graphics.measureTextHeight(spec);
        let position = {x: graphics.canvas.width/2 - textWidth/2, y: graphics.canvas.height/2 - textHeight};
        graphics.drawText(spec.text, position, spec.font);
    }

    function renderChallengeStats(numEnemiesHit, sectionsToRender) {
        let topText = 'Number of Hits';
        if (sectionsToRender > 1) {
            topText = `Number of Hits  ${numEnemiesHit}`;
        }
        let spec = {
            font: `${Math.floor(graphics.canvas.width * MyConstants.textSizes.MEDIUM)}px Orbitron`,
            fill: '#f5eaea',
            text: topText
        };
        let textWidth = graphics.measureTextWidth(spec);
        let textHeight = graphics.measureTextHeight(spec);
        let position = {x: graphics.canvas.width/2 - textWidth/2, y: graphics.canvas.height/2 - textHeight};
        graphics.drawText(spec.text, position, spec.font);

        if (sectionsToRender > 2) {
            let bottomText = 'Bonus';
            if (sectionsToRender === 4) {
                bottomText = `Bonus  ${numEnemiesHit * MyConstants.scoring.CHALLENGING_STAGE_HIT}`;
            }
            spec = {
                font: `${Math.floor(graphics.canvas.width * MyConstants.textSizes.MEDIUM)}px Orbitron`,
                fill: '#f5eaea',
                text: bottomText
            };
            textWidth = graphics.measureTextWidth(spec);
            textHeight = graphics.measureTextHeight(spec);
            position = {x: graphics.canvas.width/2 - textWidth/2, y: graphics.canvas.height/2  + textHeight * 2};
            graphics.drawText(spec.text, position, spec.font);
        }
    }

    function renderNextLevel(level) {
        let text = `Stage ${level+1}`;
        if (level === 2) {
            text = 'Challenge Stage';
        }
        let spec = {
            font: `${Math.floor(graphics.canvas.width * MyConstants.textSizes.LARGE)}px Orbitron`,
            fill: '#f5eaea',
            text: text
        };
        let textWidth = graphics.measureTextWidth(spec);
        let textHeight = graphics.measureTextHeight(spec);
        let position = {x: graphics.canvas.width/2 - textWidth/2, y: graphics.canvas.height/2 - textHeight};
        graphics.drawText(spec.text, position, spec.font);
    }

    function renderBonusPoints(bonusPoints) {
        let font = `${Math.floor(graphics.canvas.width * MyConstants.textSizes.TINY)}px Orbitron`;
        for (let i = 0; i < bonusPoints.length; i++) {
            graphics.drawText(bonusPoints[i].amount, bonusPoints[i].position, font, bonusPoints[i].color);
        }
    }

    function renderGameOver() {
        let spec = {
            font: `${Math.floor(graphics.canvas.width * MyConstants.textSizes.LARGE)}px Orbitron`,
            fill: '#f5eaea',
            text: "Game Over!"
        };
        let textWidth = graphics.measureTextWidth(spec);
        let textHeight = graphics.measureTextHeight(spec);
        let position = {x: graphics.canvas.width/2 - textWidth/2, y: graphics.canvas.height/2 - textHeight};
        graphics.drawText(spec.text, position, spec.font);
    }

    function renderGameSummary(stats) {
        let textSections = [
            `Score`, `${stats.initialScore}`,
            `Shots Fired`, `${stats.shotsFired}`,
            `Number of Hits`, `${stats.numHits}`,
            `Hit/Miss Ratio`, `${stats.hitMissRatio} %`,
            `Accuracy Bonus`, `${stats.accuracyBonus}`,
            `Final Score`, `${stats.finalScore}`
        ];
        let currLine = -1;
        for (let i = 0; i < stats.sectionsToRender; i++) {
            let alignmentOffset = .95;
            let alignment = 'right';
            //
            //increment line for every other text section
            if (i % 2 === 0) {
                currLine++;
                alignmentOffset = .05;
                alignment = 'left';
            }

            let spec = {
                font: `${Math.floor(graphics.canvas.width * MyConstants.textSizes.MEDIUM)}px Orbitron`,
                fill: '#f5eaea',
                text: textSections[i]
            };
            let textHeight = graphics.measureTextHeight(spec);
            let position = {
                x: graphics.canvas.width * alignmentOffset,
                y: graphics.canvas.height * .2  + (textHeight * 2) * (currLine)
            };
            graphics.drawText(spec.text, position, spec.font, spec.fill, alignment);
        }
    }



    return {
        renderScore: renderScore,
        renderCountdown: renderCountdown,
        renderGameOver: renderGameOver,
        renderChallengeStats: renderChallengeStats,
        renderNextLevel: renderNextLevel,
        renderBonusPoints: renderBonusPoints,
        renderGameSummary: renderGameSummary
    };
}(MyGame.graphics));