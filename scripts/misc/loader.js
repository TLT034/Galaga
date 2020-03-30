MyGame = {
    assets : {
        images: {},
        sounds: {}
    },
    screens : {},
    input: {},
    objects: {},
    render: [],
    controls: {},
    systems: {},
    soundEnabled: false
};
//------------------------------------------------------------------
//
// Purpose of this code is to bootstrap (maybe I should use that as the name)
// the rest of the application.  Only this file is specified in the index.html
// file, then the code in this file gets all the other code and assets
// loaded.
//
//------------------------------------------------------------------
MyGame.loader = (function() {
    'use strict';
    let scriptOrder = [
        {
            scripts: ['constants'],
            message: 'Game constants loaded',
            onComplete: null
        },
        {
            scripts: ['random'],
            message: 'Random number generator loaded',
            onComplete: null
        },
        {
            scripts: ['input-keyboard'],
            message: 'Keyboard input system loaded',
            onComplete: null
        },
        {
            scripts: ['../render/core'],
            message: 'Rendering core loaded',
            onComplete: null
        },
        {
            scripts: ['../render/player-ship', '../render/bullet', '../render/screen-text'],
            message: 'All rendering systems loaded',
            onComplete: null
        },
        {
            scripts: ['../systems/particle-system', '../systems/sound-system'],
            message: 'Particle and Sound systems loaded',
            onComplete: null
        },
        {
            scripts: ['../objects/player-ship'],
            message: 'Ship objects loaded',
            onComplete: null
        },
        {
            scripts: ['../objects/bullet'],
            message: 'Bullet object loaded',
            onComplete: null
        },
        {
            scripts: ['game-over-dialog', 'pause-dialog'],
            message: 'In-game dialogs loaded',
            onComplete: null
        },
        {
            scripts: ['game'],
            message: 'Game model loaded',
            onComplete: null
        },
        {
            scripts: ['../screens/main-menu'],
            message: 'Main Menu loaded',
            onComplete: null
        },
        {
            scripts: ['../screens/main-menu', '../screens/game-play', '../screens/controls',
                '../screens/highscores', '../screens/credits',],
            message: 'All screens loaded',
            onComplete: null
        }
    ];

    let assetOrder = [
        /******************* IMAGES **********************/
        //
        // Ships
        {
            type: 'image',
            key: 'playerShip',
            source: '/assets/images/player-ship.png'
        },
        {
            type: 'image',
            key: 'bee',
            source: '/assets/images/bee.png'
        },
        {
            type: 'image',
            key: 'butterfly',
            source: '/assets/images/butterfly.png'
        },
        {
            type: 'image',
            key: 'greenBoss',
            source: '/assets/images/green-boss.png'
        },
        {
            type: 'image',
            key: 'purpleBoss',
            source: '/assets/images/purple-boss.png'
        },
        {
            type: 'image',
            key: 'transform1',
            source: '/assets/images/transform1.png'
        },
        {
            type: 'image',
            key: 'transform2',
            source: '/assets/images/transform2.png'
        },
        {
            type: 'image',
            key: 'transform3',
            source: '/assets/images/transform3.png'
        },
        {
            type: 'image',
            key: 'bonus1',
            source: '/assets/images/bonus1.png'
        },
        {
            type: 'image',
            key: 'bonus2',
            source: '/assets/images/bonus2.png'
        },
        {
            type: 'image',
            key: 'bonus3',
            source: '/assets/images/bonus3.png'
        },
        //
        // Bullets
        {
            type: 'image',
            key: 'enemyBullet',
            source: '/assets/images/enemy-bullet.png'
        },
        {
            type: 'image',
            key: 'playerBullet',
            source: '/assets/images/player-bullet.png'
        },
        //
        // Particles
        {
            type: 'image',
            key: 'star',
            source: '/assets/images/star.png'
        },
        {
            type: 'image',
            key: 'fire',
            source: '/assets/images/fire.png'
        },

        /******************* SOUNDS **********************/
        {
            type: 'sound',
            key: 'buttonClick',
            source: '/assets/sounds/button-click.mp3'
        },
        {
            type: 'sound',
            key: 'buttonHover',
            source: '/assets/sounds/button-hover.mp3'
        },
        {
            type: 'sound',
            key: 'music',
            source: '/assets/sounds/music.mp3'
        },
        {
            type: 'sound',
            key: 'playerShoot',
            source: '/assets/sounds/player-shoot.mp3'
        },
        {
            type: 'sound',
            key: 'success',
            source: '/assets/sounds/success.mp3'
        },
        {
            type: 'sound',
            key: 'explosion',
            source: '/assets/sounds/explosion.mp3'
        },
    ];

    //------------------------------------------------------------------
    //
    // Helper function used to load scripts in the order specified by the
    // 'scripts' parameter.  'scripts' expects an array of objects with
    // the following format...
    //    {
    //        scripts: [script1, script2, ...],
    //        message: 'Console message displayed after loading is complete',
    //        onComplete: function to call when loading is complete, may be null
    //    }
    //
    //------------------------------------------------------------------
    function loadScripts(scripts, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (scripts.length > 0) {
            let entry = scripts[0];
            require(entry.scripts, function() {
                console.log(entry.message);
                if (entry.onComplete) {
                    entry.onComplete();
                }
                scripts.shift();    // Alternatively: scripts.splice(0, 1);
                loadScripts(scripts, onComplete);
            });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // Helper function used to load assets in the order specified by the
    // 'assets' parameter.  'assets' expects an array of objects with
    // the following format...
    //    {
    //        key: 'asset-1',
    //        source: 'asset/.../asset.png'
    //    }
    //
    // onSuccess is invoked per asset as: onSuccess(key, asset)
    // onError is invoked per asset as: onError(error)
    // onComplete is invoked once per 'assets' array as: onComplete()
    //
    //------------------------------------------------------------------
    function loadAssets(assets, onSuccess, onError, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (assets.length > 0) {
            let entry = assets[0];
            loadAsset(entry.source,
                function(asset) {
                    onSuccess(entry, asset);
                    assets.shift();    // Alternatively: assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                },
                function(error) {
                    onError(error);
                    assets.shift();    // Alternatively: assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // This function is used to asynchronously load image and audio assets.
    // On success the asset is provided through the onSuccess callback.
    // Reference: http://www.html5rocks.com/en/tutorials/file/xhr2/
    //
    //------------------------------------------------------------------
    function loadAsset(source, onSuccess, onError) {
        let xhr = new XMLHttpRequest();
        let fileExtension = source.substr(source.lastIndexOf('.') + 1);    // Source: http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript

        if (fileExtension) {
            xhr.open('GET', source, true);
            xhr.responseType = 'blob';

            xhr.onload = function() {
                let asset = null;
                if (xhr.status === 200) {
                    if (fileExtension === 'png' || fileExtension === 'jpg') {
                        asset = new Image();
                    } else if (fileExtension === 'mp3') {
                        asset = new Audio();
                    } else {
                        if (onError) { onError('Unknown file extension: ' + fileExtension); }
                    }
                    asset.onload = function() {
                        window.URL.revokeObjectURL(asset.src);
                    };
                    asset.src = window.URL.createObjectURL(xhr.response);
                    if (onSuccess) { onSuccess(asset); }
                } else {
                    if (onError) { onError('Failed to retrieve: ' + source); }
                }
            };
        } else {
            if (onError) { onError('Unknown file extension: ' + fileExtension); }
        }

        xhr.send();
    }

    //------------------------------------------------------------------
    //
    // Called when all the scripts are loaded, it kicks off the demo app.
    //
    //------------------------------------------------------------------
    function mainComplete() {
        console.log('It is all loaded up');
        MyGame.game.initialize();
    }

    //
    // Start with loading the assets, then the scripts.
    console.log('Starting to dynamically load project assets');
    loadAssets(assetOrder,
        function(source, asset) {    // Store it on success
            switch (source.type) {
                case 'image':
                    MyGame.assets.images[source.key] = asset;
                    break;
                case 'sound':
                    MyGame.assets.sounds[source.key] = asset;
                    break;
            }
        },
        function(error) {
            console.log(error);
        },
        function() {
            console.log('All game assets loaded');
            console.log('Starting to dynamically load project scripts');
            loadScripts(scriptOrder, mainComplete);
            console.log(MyGame.assets);
        }
    );

}());
