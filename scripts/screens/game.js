// ------------------------------------------------------------------
//
// This is the game object.  Everything about the game is located in
// this object.
//
// ------------------------------------------------------------------

MyGame.game = (function(screens, objects) {
    'use strict';

    //------------------------------------------------------------------
    //
    // This function is used to change to a new active screen.
    //
    //------------------------------------------------------------------
    function showScreen(id) {
        //
        // Remove the active state from all screens.  There should only be one...
        let active = document.getElementsByClassName('active');
        for (let screen = 0; screen < active.length; screen++) {
            active[screen].classList.remove('active');
        }
        //
        // Tell the screen to start actively running
        screens[id].run();
        //
        // Then, set the new screen to be active
        document.getElementById(id).classList.add('active');
    }

    function toggleDialog(id) {
        let active = document.getElementsByClassName('active');
        if (id in active) {
            active[id].classList.remove('active');
        }
        else {
            document.getElementById(id).classList.add('active');
        }
    }

    //------------------------------------------------------------------
    //
    // This function performs the one-time game initialization.
    //
    //------------------------------------------------------------------
    function initialize() {
        //
        // Go through each of the screens and tell them to initialize
        for (let screen in screens) {
            if (screens.hasOwnProperty(screen)) {
                screens[screen].initialize();
            }
        }

        //
        // add sound effects to all buttons
        let hoverSound = objects.Sound({src: 'assets/menu-hover.mp3', volume: .55, loop: false});
        let clickSound = objects.Sound({src: 'assets/menu-click.mp3', volume: .55, loop: false});
        let menuButtons = document.getElementsByTagName('button');
        for (let i = 0; i < menuButtons.length; i++) {
            menuButtons[i].addEventListener('mouseenter', function(){hoverSound.playSound();});
            menuButtons[i].addEventListener('click', function(){clickSound.playSound();});
        }

        //
        // Make the main-menu screen the active one
        showScreen('main-menu');
    }


    return {
        initialize : initialize,
        showScreen : showScreen,
        toggleDialog : toggleDialog
    };
}(MyGame.screens, MyGame.objects));
