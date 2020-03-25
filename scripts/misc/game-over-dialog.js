MyGame.screens['game-over-dialog'] = (function(game, screens) {
    'use strict';

    function initialize() {

        document.getElementById('game-over-restart-button').addEventListener(
            'click',
            function() {
                screens['game-play'].reset(); // reset game and generate new terrain
                screens['game-play'].run(); // start the game again
                game.toggleDialog('game-over-menu'); // hide game over menu
            });

        document.getElementById('game-over-main-menu-button').addEventListener(
            'click',
            function() {
                screens['game-play'].reset(); // reset game and generate new terrain
                screens['game-play'].stopGame(); // stop game from running
                game.toggleDialog('game-over-menu'); // hide game over menu
                game.showScreen('main-menu') // go to main menu
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