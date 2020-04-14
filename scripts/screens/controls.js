MyGame.screens['controls'] = (function(game, controls, soundSystem) {
    'use strict';

    let waitingForInput = false;

    function initialize() {
        let savedControls = JSON.parse(localStorage.getItem('controls'));
        if (savedControls) {
            controls['Shoot'] = savedControls['Shoot'];
            controls['Move Left'] = savedControls['Move Left'];
            controls['Move Right'] = savedControls['Move Right'];
        }
         else {
            // Initialize the controls to the arrow keys
            controls['Shoot'] = ' ';
            controls['Move Left'] = 'ArrowLeft';
            controls['Move Right'] = 'ArrowRight';
            localStorage.setItem('controls', JSON.stringify(controls));
        }


        document.getElementById('shoot-map-button').addEventListener(
            'click',
            function() { mapControl('Shoot'); });

        document.getElementById('left-map-button').addEventListener(
            'click',
            function() { mapControl('Move Left'); });

        document.getElementById('right-map-button').addEventListener(
            'click',
            function() { mapControl('Move Right'); });

        document.getElementById('controls-back-button').addEventListener(
            'click',
            function() {
                waitingForInput = false;
                game.showScreen('main-menu');
            });
    }

    function run() {
        if (controls.Shoot === ' ') {
            document.getElementById('shoot-map-button').innerText = `Shoot: Space`;
        }
        else {
            document.getElementById('shoot-map-button').innerText = `Shoot: ${controls.Shoot}`;
        }
        document.getElementById('left-map-button').innerText = `Move Left: ${controls['Move Left']}`;
        document.getElementById('right-map-button').innerText = `Move Right: ${controls['Move Right']}`;
        window.onkeydown = function(event) {
            if (event.code === 'Space') {
                event.preventDefault();
            }
        }
    }


    function mapControl(control) {
        waitingForInput = true;
        switch (control) {
            case 'Shoot':
                document.getElementById('shoot-map-button').innerText = `Shoot: Press a Key`;
                break;
            case 'Move Left':
                document.getElementById('left-map-button').innerText = `Move Left: Press a Key`;
                break;
            case 'Move Right':
                document.getElementById('right-map-button').innerText = `Move Right: Press a Key`;
                break;
        }

        window.addEventListener('keyup', addKey);

        function addKey(event) {
            if (waitingForInput) {
                controls[control] = event.key;
                localStorage.setItem('controls', JSON.stringify(controls));
                soundSystem.buttonClick();
            }

            window.removeEventListener('keyup', addKey);
            if (controls.Shoot === ' ') {
                document.getElementById('shoot-map-button').innerText = `Shoot: Space`;
            }
            else {
                document.getElementById('shoot-map-button').innerText = `Shoot: ${controls.Shoot}`;
            }
            document.getElementById('left-map-button').innerText = `Move Left: ${controls['Move Left']}`;
            document.getElementById('right-map-button').innerText = `Move Right: ${controls['Move Right']}`;
        }


    }






    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game, MyGame.controls, MyGame.systems.SoundSystem));
