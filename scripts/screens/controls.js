MyGame.screens['controls'] = (function(game, controls, objects) {
    'use strict';

    let waitingForInput = false;
    let buttonMappedSound;

    function initialize() {
        buttonMappedSound = objects.Sound({src: 'assets/sounds/menu-click.mp3', volume: .55, loop: false});
        // Initialize the controls to the arrow keys
        MyGame.controls['Thrust'] = 'ArrowUp';
        MyGame.controls['Rotate Left'] = 'ArrowLeft';
        MyGame.controls['Rotate Right'] = 'ArrowRight';

        document.getElementById('thrust-map-button').addEventListener(
            'click',
            function() { mapControl('Thrust'); });

        document.getElementById('left-map-button').addEventListener(
            'click',
            function() { mapControl('Rotate Left'); });

        document.getElementById('right-map-button').addEventListener(
            'click',
            function() { mapControl('Rotate Right'); });

        document.getElementById('controls-back-button').addEventListener(
            'click',
            function() {
                waitingForInput = false;
                game.showScreen('main-menu');
            });
    }

    function run() {
        document.getElementById('thrust-map-button').innerText = `Thrust: ${controls.Thrust}`;
        document.getElementById('left-map-button').innerText = `Rotate Left: ${controls['Rotate Left']}`;
        document.getElementById('right-map-button').innerText = `Rotate Right: ${controls['Rotate Right']}`;
    }


    function mapControl(control) {
        waitingForInput = true;
        switch (control) {
            case 'Thrust':
                document.getElementById('thrust-map-button').innerText = `Thrust: Press a Key`;
                break;
            case 'Rotate Left':
                document.getElementById('left-map-button').innerText = `Rotate Left: Press a Key`;
                break;
            case 'Rotate Right':
                document.getElementById('right-map-button').innerText = `Rotate Right: Press a Key`;
                break;
        }

        function addKey(event) {
            controls[control] = event.key;
            waitingForInput = false;
            buttonMappedSound.playSound();
        }

        window.addEventListener('keydown', addKey);

        function checkForInput(time) {
            if (waitingForInput) {
                requestAnimationFrame(checkForInput);
            }
            else {
                window.removeEventListener('keydown', addKey);
                document.getElementById('thrust-map-button').innerText = `Thrust: ${controls.Thrust}`;
                document.getElementById('left-map-button').innerText = `Rotate Left: ${controls['Rotate Left']}`;
                document.getElementById('right-map-button').innerText = `Rotate Right: ${controls['Rotate Right']}`;
            }
        }
        checkForInput();
    }






    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game, MyGame.controls, MyGame.objects));
