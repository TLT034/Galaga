MyGame.screens['pause-dialog'] = (function(game, screens) {
    'use strict';

    function initialize() {
        document.getElementById('pause-continue-button').addEventListener(
            'click',
            function() { screens['game-play'].togglePauseGame(); });

        document.getElementById('pause-restart-button').addEventListener(
            'click',
            function() {
                screens['game-play'].reset(); // reset game and generate new terrain
                game.toggleDialog('pause-menu'); // hide pause menu
            });

        document.getElementById('pause-main-menu-button').addEventListener(
            'click',
            function() {
                screens['game-play'].reset(); // reset game and generate new terrain
                screens['game-play'].stopGame(); // stop game from running
                game.toggleDialog('pause-menu'); // hide pause menu
                game.showScreen('main-menu'); // go to main menu
            });
    }

    function run() {
        //
        // I know this is empty, there isn't anything to do.
    }

    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game, MyGame.screens));