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

    function renderGameOver(score) {
        let spec = {
            font: `${Math.floor(graphics.canvas.width * MyConstants.textSizes.LARGE)}px Orbitron`,
            fill: '#f5eaea',
            text: "Game Over!"
        };
        let textWidth = graphics.measureTextWidth(spec);
        let textHeight = graphics.measureTextHeight(spec);
        let position = {x: graphics.canvas.width/2 - textWidth/2, y: graphics.canvas.height/2 - textHeight};
        graphics.drawText(spec.text, position, spec.font);

        spec.font = '70px Orbitron';
        spec.text = `Score: ${score}`;
        textWidth = graphics.measureTextWidth(spec);
        position = {x: graphics.canvas.width/2 - textWidth/2, y: graphics.canvas.height/2 - 25};
        graphics.drawText(spec.text, position, spec.font);
    }

    function renderSafeLanding() {
        let spec = {
            font: '65px Orbitron',
            fill: '#f5eaea',
            text: "That's one small step for a man..."
        };
        let textWidth = graphics.measureTextWidth(spec);
        let textHeight = graphics.measureTextHeight(spec);
        let position = {x: graphics.canvas.width/2 - textWidth/2, y: graphics.canvas.height/2 - textHeight};
        graphics.drawText(spec.text, position, spec.font);
    }

    function renderWin(score) {
        let spec = {
            font: '65px Orbitron',
            fill: '#f5eaea',
            text: "...one giant leap for mankind."
        };
        let textWidth = graphics.measureTextWidth(spec);
        let textHeight = graphics.measureTextHeight(spec);
        let position = {x: graphics.canvas.width/2 - textWidth/2, y: graphics.canvas.height/2 - textHeight};
        graphics.drawText(spec.text, position, spec.font);

        spec = {
            font: '100px Orbitron',
            fill: '#f5eaea',
            text: `Score: ${score}`
        };
        textWidth = graphics.measureTextWidth(spec);
        textHeight = graphics.measureTextHeight(spec);
        position = {x: graphics.canvas.width/2 - textWidth/2, y: graphics.canvas.height/2 - textHeight - 125};
        graphics.drawText(spec.text, position, spec.font);
    }

    function renderNextLevel(level) {
        let spec = {
            font: `${Math.floor(graphics.canvas.width * MyConstants.textSizes.LARGE)}px Orbitron`,
            fill: '#f5eaea',
            text: `Stage ${level}`
        };
        let textWidth = graphics.measureTextWidth(spec);
        let textHeight = graphics.measureTextHeight(spec);
        let position = {x: graphics.canvas.width/2 - textWidth/2, y: graphics.canvas.height/2 - textHeight};
        graphics.drawText(spec.text, position, spec.font);
    }

    return {
        renderScore: renderScore,
        renderCountdown: renderCountdown,
        renderGameOver: renderGameOver,
        renderSafeLanding: renderSafeLanding,
        renderNextLevel: renderNextLevel,
        renderWin: renderWin
    };
}(MyGame.graphics));