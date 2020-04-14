MyGame.screens['high-scores'] = (function(game) {
    'use strict';

    function initialize() {
        document.getElementById('high-scores-back-button').addEventListener(
            'click',
            function() { game.showScreen('main-menu'); });
    }

    function run() {

    }

    return {
        initialize : initialize,
        run : run,
    };
}(MyGame.game));