// --------------------------------------------------------------
//
// Renders the on screen information (Game over, countdown, etc).
//
// --------------------------------------------------------------
MyGame.render.ScreenText = (function(graphics) {
    'use strict';
    // --------------------------------------------------------------
    // spec = { fuel: , verticalSpeed: , angle: }
    // --------------------------------------------------------------
    function renderShipInfo(spec) {
        let fuelText = `Fuel: ${spec.fuel.toFixed(1)}`;
        let color = '#f5eaea';
        if (spec.fuel <= 0) {
            color = 'red';
        }
        graphics.drawText(fuelText, {x: 10, y: 40}, '30px Orbitron', color);

        let speedText = `Vertical Speed: ${spec.verticalSpeed.toFixed(1)}`;
        color = '#f5eaea';
        if (spec.verticalSpeed >= 2) {
            color = 'red';
        }
        graphics.drawText(speedText, {x: 10, y: 90}, '30px Orbitron', color);

        let angleText = `Angle: ${spec.angle.toFixed(1)}`;
        color = '#f5eaea';
        if (spec.angle > 5 && spec.angle < 355) {
            color = 'red';
        }
        graphics.drawText(angleText, {x: 10, y: 140}, '30px Orbitron', color);
    }

    function renderCountdown(time) {
        let spec = {
            font: '128px Orbitron',
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
            font: '128px Orbitron',
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
            font: '128px Orbitron',
            fill: '#f5eaea',
            text: "Stage 2"
        };
        let textWidth = graphics.measureTextWidth(spec);
        let textHeight = graphics.measureTextHeight(spec);
        let position = {x: graphics.canvas.width/2 - textWidth/2, y: graphics.canvas.height/2 - textHeight};
        graphics.drawText(spec.text, position, spec.font);
    }

    return {
        renderShipInfo: renderShipInfo,
        renderCountdown: renderCountdown,
        renderGameOver: renderGameOver,
        renderSafeLanding: renderSafeLanding,
        renderNextLevel: renderNextLevel,
        renderWin: renderWin
    };
}(MyGame.graphics));