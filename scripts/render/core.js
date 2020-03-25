MyGame.graphics = (function() {
    'use strict';

    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    // --------------------------------------------------------------
    //
    // Draws a texture to the canvas with the following specification:
    //    image: Image
    //    center: {x: , y: }
    //    size: { width: , height: }
    //
    // --------------------------------------------------------------
    function drawTexture(image, center, rotation, size) {
        context.save();

        context.translate(center.x, center.y);
        context.rotate(rotation);
        context.translate(-center.x, -center.y);

        context.drawImage(
            image,
            center.x - size.width / 2,
            center.y - size.height / 2,
            size.width, size.height);

        // uncomment to draw bounding box
        // context.strokeRect(center.x - size.width / 2,
        //     center.y - size.height / 2,
        //     size.width, size.height);

        context.restore();
    }

    // --------------------------------------------------------------
    //
    // Draws a line on the canvas with the following specification:
    //    color: rgb color string
    //    lineWidth: int
    //    linePath: [{ x:, y: }]
    //
    // --------------------------------------------------------------
    function drawShape(lineColor, fillColor, lineWidth, linePath) {
        context.save();

        context.strokeStyle = lineColor;
        context.lineWidth = lineWidth;

        context.beginPath();
        context.moveTo(linePath[0].x, linePath[0].y);
        for (let i = 1; i < linePath.length; i++) {
            context.lineTo(linePath[i].x, linePath[i].y);
        }
        context.closePath();
        context.stroke();
        context.fillStyle = fillColor;
        context.fill();
        context.restore();

    }

    // --------------------------------------------------------------
    //
    // Draws a line on the canvas with the following specification:
    //    color: rgb color string
    //    lineWidth: int
    //    linePath: [{ x:, y: }]
    //
    // --------------------------------------------------------------
    function drawText(text, position, font, color = '#f5eaea') {
        context.save();
        context.font = font;
        context.fillStyle = color;

        context.fillText(text, position.x, position.y);
        context.restore();

    }

    //------------------------------------------------------------------
    //
    // Returns the width of the specified text, in pixels.
    //
    //------------------------------------------------------------------
    function measureTextWidth(spec) {
        context.save();

        context.font = spec.font;
        context.fillStyle = spec.fill;
        if (spec.hasOwnProperty('stroke')) {
            context.strokeStyle = spec.stroke;
        }
        let width = context.measureText(spec.text).width;

        context.restore();

        return width;
    }

    //------------------------------------------------------------------
    //
    // Returns the height of the specified text, in pixels.
    //
    //------------------------------------------------------------------
    function measureTextHeight(spec) {
        let saveText = spec.text;

        spec.text = 'm';	// Clever trick to get font height
        context.save();

        context.font = spec.font;
        context.fillStyle = spec.fill;
        if (spec.hasOwnProperty('stroke')) {
            context.strokeStyle = spec.stroke;
        }
        let height = context.measureText(spec.text).width;
        spec.text = saveText;

        context.restore();

        return height;
    }


    let api = {
        get canvas() { return canvas; },
        clear: clear,
        drawTexture: drawTexture,
        drawShape: drawShape,
        drawText: drawText,
        measureTextWidth: measureTextWidth,
        measureTextHeight: measureTextHeight
    };

    return api;
}());
