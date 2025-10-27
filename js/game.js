let level;
let canvas;
let world;
let keyboard = new Keyboard();
let pauseGameBtn = document.getElementById('pauseGameBtn');
let gameStarted = false;  // diese Variable wird benötigt, um, wenn die "pause-game-btns" wieder angezeigt werden sollen, um zu überprüfen, ob das Spiel bereits gestartet wurde, da sie sonst direkt zum Start des Spiels angezeigt werden würden. 
let gamePaused = false;
let mobileWindow;
let fullscreenDesktop = false;
let deviceVertical;
let showMobileAboutMenuVar = false;  // diese Variable wird benötigt, um den Toggle-Button des Hamburger-Menus bzw. das "X" zum Schließen in der Funktion "showMobileAboutMenu()" zu regeln
let testIfLevel2 = false;
let deviceWasTurned = false;
let buttonBoardShown = true;
let level1Test;

/**
 * 
 * This function initiates the page
 *  Shrinks the start image, checks button events, and enables fullscreen for mobile view.
 *
 * @function
 * @returns {void}
 */
function init() {
    shrinkStartImage();
    bindBtnsPressEvents();
    fullScreenMobile();
    if (!window.world) {  // prüft, ob bereits eine level ausgewählt wurde; wenn nicht, dann wirdd level 1 initialisiert
        chooseLevel1();
    }
    //initCanvasAndWorld();

    const urlParams = new URLSearchParams(window.location.search);
    const level = urlParams.get('level') || '1'; // Standardmäßig Level 1

    if (level === '2') {
        //startLevel2();
    } else {
        //startLevel1();
    }
}

function chooseLevel1() {
    canvas = document.getElementById('canvas');
    window.world = new World(canvas, keyboard, 1);
    //world.level = 1;
    amplifySound();
    //console.log('level 1 chosen!!', window.world.level);
}

function chooseLevel2() {
    canvas = document.getElementById('canvas');
    window.world = new World(canvas, keyboard, 2);
    //world.level = 2;
    amplifySound();
    console.log('level 2 chosen!!', window.world.level);

}

function noLevelChosen() {
    canvas = document.getElementById('canvas');
    window.world = new World(canvas, keyboard, 3);
    //world.level = 2;
    console.log('no level chosen!!', window.world.level);
}

function initCanvasAndWorld() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        // Fullscreen verlassen
        resizeCanvasBackToNormal();
    } else {
        // Fullscreen betreten
        resizeCanvasToFullscreen();
    }
});

function resizeCanvasToFullscreen() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
}

function resizeCanvasBackToNormal() {
    canvas.width = 720;
    canvas.height = 480;

    canvas.style.width = "720px";
    canvas.style.height = "480px";
}

function startLevel1() {
    //level = new Level1();
    //world = new World(canvas, keyboard, level1);
    //world.level = level1;
}

function startLevel2() {
    //level = new Level2();
    //world = new World(canvas, keyboard, level1);
    //world.level = level1;
}

function playLevel1() {
    testIfLevel2 = false;
    startLevel1();
    //startCanvas();
    resetGameBtns();  // aktiviert alle zuvor deaktivierten Buttons
    world.initWorld();
}

function playLevel2() {
    testIfLevel2 = true;
    startLevel2();
    //startCanvas();
    resetGameBtns();  // aktiviert alle zuvor deaktivierten Buttons
    world.initWorld();
}

/**
 * This function reactivates all the prevoiusly deactivated buttons 
 */
function resetGameBtns() {
    if (mobileWindow == false) {
        toggleBtn('pauseGameBtn', false);   // die parameter true und false dürfen nicht in Anführungszeichen stehen, da die aufgerufene Funktion diese nicht als String, sondern als Booleiische Variable braucht!
        toggleBtn('resumeGameBtn', false);  // aktiviert den zuvor deaktivierten "play-Button" der Desktop Ansicht
    } else if (mobileWindow == true) {
        toggleBtn('pauseGameBtnMobile', false);   // die parameter true und false dürfen nicht in Anführungszeichen stehen, da die aufgerufene Funktion diese nicht als String, sondern als Booleiische Variable braucht!
        toggleBtn('resumeGameBtnMobile', false);  // aktiviert den zuvor deaktivierten "play-Button" der mobilen Ansicht
    }
}

/*
function startLevel2() {
    level = level2;
    testIfLevel2 = true;
} */

function showLevelSelection() {
    //setTimeout(() => {
    document.getElementById('outerMobileLevelSelectionDiv').classList.remove('d-none');
    document.getElementById('mobileLevelSelectionDiv').classList.remove('d-none');
    //}, 100);
}

function showLevelSelectionFast() {
    document.getElementById('outerMobileLevelSelectionDiv').classList.remove('d-none');
    document.getElementById('mobileLevelSelectionDiv').classList.remove('d-none');
}

function hideMobileLevelSelectionDiv() {
    document.getElementById('outerMobileLevelSelectionDiv').classList.add('d-none');
    document.getElementById('mobileLevelSelectionDiv').classList.add('d-none');
}

function shrinkStartImage() {
    setTimeout(() => {
        document.getElementById('startGameBtn').classList.remove('d-none');
    }, 2400);
}

function resetIntervals() {
    window.world.gameIntervals = [];
    console.log(window.world.gameIntervals);



}

/**
 * This function starts the game by preparing the screen for gameplay:
 * 
 * These preparations include hiding the start image, hiding the start-game buttton,
 * showing the pause and restart game buttons and showing the sound button.
 * 
 * After that, the canvas is initialized by calling `startCanvas()`.
 * Thereafter, the sound settings that are stored in the browser are loaded 
 * by calling `loadSoundSettings()` and the background music starts to play
 * by calling `playBackgroundMusic()`.
 * 
 * Dependencies:
 *  Global variable:
 *      `gameStarted`
 *  Functions called:
 *  	    `startCanvas()`, `loadSoundSettings()`, `playBackgroundMusic()`
 * 
 * @function startGame
 */
function startGame() {
    //console.log(window.world.gameStarted);
    
    if (!window.world.gameStarted) {
    document.getElementById('startImg').classList.add('d-none');
    document.getElementById('startGameBtn').classList.add('d-none');
    document.getElementById('pauseEndGameBtns').classList.remove('d-none');
    document.getElementById('pauseEndGameBtns').classList.add('pause-end-game-btns');
    document.getElementById('soundBtn').classList.remove('d-none');
    document.getElementById('soundBtn').classList.add('soundBtn');
    //startCanvas();
    //testLevel();
    loadSoundSettings();
    playBackgroundMusic();
    gameStarted = true;
    testWindowWidth();
    }
}

function testLevel() {
    if (level === '2') {
        startLevel2();
    } else {
        startLevel1();
    }
}

/**
 * Starts to play background music playback in a loop at regular intervals.
 * 
 * This function sets a repeating interval (every 200ms) to check if sound is enabled
 * by reading the 'isMuted' flag from localStorage. If sound is not muted,
 * it plays the background music, sets it to loop, adjusts volume and playback rate.
 * 
 * @function
 * @returns {void}
 */
function playBackgroundMusic() {
    //amplifySound();
    const backgroundMusicInterval = setInterval(() => {
        const mutedSetting = localStorage.getItem('isMuted');  //-- testen, ob der Sound an oder aus sein sollte
        if (mutedSetting === 'false' /*&& !window.world.gameOver*/) {
            window.world.background_sound.play();
            window.world.background_sound.loop = true;
            window.world.background_sound.volume = 0.18;
            window.world.background_sound.playbackRate = 1;
            console.log('play background music');
            clearInterval(backgroundMusicInterval);
        }
    }, 200);
    //this.addIntervalToIntervalArray(interval);
}

function stopBackgroundMusic() {
    window.world.background_sound.pause();
}
/**
 * This function changes the volume of the sound and stores it in 
 * the browser.
 * 
 * @function changeSondSettings
 */
function changeSondSettings() {
    if (this.world.isMuted == false) {
        this.world.isMuted = true;
        showMutedImg();
        muteSound();
        localStorage.setItem('isMuted', 'true'); // speichern
    } else if (this.world.isMuted == true) {
        this.world.isMuted = false;
        showSoundImg();
        amplifySound();
        localStorage.setItem('isMuted', 'false'); // speichern
    }
}

/**
 * This function loads the sound settings from the local storage.
 * 
 * @function loadSoundSettings
 */
function loadSoundSettings() {
    const checkWorldInterval = setInterval(() => {
        if (typeof window.world !== 'undefined') {
            // Sobald world existiert – führe den Code einmal aus:
            const mutedSetting = localStorage.getItem('isMuted');

            if (mutedSetting === 'true') {
                window.world.isMuted = true;
                showMutedImg();
                muteSound();
            } else {
                window.world.isMuted = false;
                showSoundImg();
                amplifySound();
            }

            clearInterval(checkWorldInterval); // stopt das Intervall – nur einmal ausführen!
        }
    }, 100); // alle 100ms prüfen, ob world existiert
}
/*function loadSoundSettings() {
    if (world === !undefined) {
        
    }
    const mutedSetting = localStorage.getItem('isMuted');
    if (mutedSetting === 'true') {
        world.isMuted = true;
        showMutedImg();
        muteSound();
    } else {
        world.isMuted = false;
        showSoundImg();
        amplifySound();
    }
}*/

/* Testblock*/
/*
function TestSound() {
    setInterval(() => {

    }, 200);

}*/

function muteSound() {
    window.world.character.walking_sound.volume = 0;
    window.world.character.spinJump_sound.volume = 0;
    window.world.character.hurt_sound.volume = 0;
    window.world.character.healthRecharge_sound.volume = 0;
    window.world.background_sound.volume = 0;
    window.world.character.bottleCollected_sound.volume = 0;
    window.world.character.enemyHit_sound.volume = 0;
    window.world.character.coinCollected_sound.volume = 0;
    window.world.character.enemyDeleted_sound.volume = 0;
}

function amplifySound() {
    window.world.character.walking_sound.volume = 1;
    window.world.character.spinJump_sound.volume = 0.3;
    window.world.character.hurt_sound.volume = 0.1;
    window.world.character.healthRecharge_sound.volume = 0.6;
    //window.world.character.bottleCollected_sound.volume = 1;
    window.world.background_sound.volume = 0.18;
    window.world.character.bottleCollected_sound.volume = 0.1;
    window.world.character.enemyHit_sound.volume = 1;
    window.world.character.coinCollected_sound.volume = 0.1;
    window.world.character.enemyDeleted_sound.volume = 0.21;
    window.world.character.gameWon_sound.volume = 0.7;
}

function showSoundImg() {
    document.getElementById('soundOffImg').classList.add('d-none');
    document.getElementById('soundOnImg').classList.remove('d-none');
}

function showMutedImg() {
    document.getElementById('soundOffImg').classList.remove('d-none');
    document.getElementById('soundOnImg').classList.add('d-none');
}

function startCanvas() {
    //canvas = document.getElementById('canvas');
    //world = new World(canvas, keyboard, level1Test);
}

/**
 * Pauses the game and updates the visibility or enabled state of control buttons
 * depending on the current display mode (desktop or mobile).
 *
 * If the game is in desktop mode (mobileWindow == false), the desktop "Pause" button
 * will be disabled and the "Resume" button will be enabled. The same logic applies to mobile mode (mobileWindow == true) and the corresponding buttons. 
 * 
 * If the game is not over yet, the gamePaused variable will be set to true and the movement of the chickens will be paused.
 * 
 * @function
 */
function pauseGame() {
    if (mobileWindow == false) {
        toggleBtn('pauseGameBtn', true);   // die parameter true und false dürfen nicht in Anführungszeichen stehen, da die aufgerufene Funktion diese nicht als String, sondern als Booleiische Variable braucht!
        toggleBtn('resumeGameBtn', false);  // aktiviert den zuvor deaktivierten "play-Button" der Desktop Ansicht
    } else if (mobileWindow == true) {
        toggleBtn('pauseGameBtnMobile', true);   // die parameter true und false dürfen nicht in Anführungszeichen stehen, da die aufgerufene Funktion diese nicht als String, sondern als Booleiische Variable braucht!
        toggleBtn('resumeGameBtnMobile', false);  // aktiviert den zuvor deaktivierten "play-Button" der mobilen Ansicht
        toggleBtn('mobileBtnLeft', true);
        toggleBtn('mobileBtnRight', true);
    }

    if (!window.world.gameOver) {
        window.world.gamePaused = true;
        pauseChicken();
    }
}

function pauseChicken() {
    window.world.level.enemies.forEach((enemy, indexOfEnemy) => {
        //console.log('Aktuelles Level:', world.level instanceof Level1 ? 'Level1' : 'Level2');
        window.world.level.enemies[indexOfEnemy].speed = 0;
        //console.log("Zugriff auf enemies:", world.level?.enemies);
    });
}

function toggleBtn(param1, param2) {
    document.getElementById(param1).disabled = param2;     // disable Pause-Game-Button
}

/**
 * Restarts the game and updates the visibility or enabled state of control buttons
 * depending on the current display mode (desktop or mobile).
 *
 * If the game is in desktop mode (mobileWindow == false), the desktop "Resume" button
 * will be disabled and the "Pause" button will be enabled. The same logic applies to mobile mode (mobileWindow == true) and the corresponding buttons. 
 * 
 * @function
 */
function resumeGame() {
    restartChicken();
    window.world.gamePaused = false;
    if (mobileWindow == false) {
        toggleBtn('resumeGameBtn', true);    // deaktiviert den "Play-Button" der Desktop Ansicht
        toggleBtn('pauseGameBtn', false);    // reaktiviert den zuvor deaktivierten "Pause-Button" der Desktop Ansicht
    } else if (mobileWindow == true) {
        toggleBtn('resumeGameBtnMobile', true);    // deaktiviert den "Play-Button" der Desktop Ansicht
        toggleBtn('pauseGameBtnMobile', false);    // reaktiviert den zuvor deaktivierten "Pause-Button" der mobilen Ansicht
    }
}

function restartChicken() {
    window.world.level.enemies.forEach((enemy, indexOfEnemy) => {
        window.world.level.enemies[indexOfEnemy].speed = window.world.level.enemies[indexOfEnemy].currentspeed;
    });
}

pauseGameBtn.addEventListener('click', function () {
    world.gamePaused = true;
});

function fullScreen() {
    let fullScreen = document.getElementById('fullscreen');
    enterFullscreen(fullScreen);
}

/**
 * This function requests the fullscreen-mode in desktop mode.
 * 
 * This function handles different browser implementations of the fullscreen API,
 * including legacy prefixes for IE11 and Safari. After entering fullscreen, it
 * calls `resizeCanvasToFullscreen()` to fit the canvas size accordingly.
 * 
 * @function enterFullscreen
 * @param {HTMLElement} element - The element to display the fullscreen mode
 */
function enterFullscreen(element) {
    fullscreenDesktop = true;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
    resizeCanvasToFullscreen();
}

function resizeCanvasToFullscreen() {
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight / 1.53;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
}

/**
 * Handles `keydown` events and updates the `keyboard` state object based on 
 * the key pressed. 
 *
 * The following key codes are supported:
 * - 37: Arrow Left → `keyboard.LEFT = true`
 * - 38: Arrow Up → `keyboard.UP = true`
 * - 39: Arrow Right → `keyboard.RIGHT = true`
 * - 40: Arrow Down → `keyboard.DOWN = true`
 * - 67: 'C' key → `keyboard.SPACE = true` 
 * - 68: 'D' key → `keyboard.letterD = true`
 *
 * @event keydown
 * @param {KeyboardEvent} event - The keydown event object.
 */
window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 67) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 68) {
        keyboard.letterD = true;
    }
});


/**
 * Handles `keyup` events and updates the `keyboard` state object based on 
 * the key press is released. 
 *
 * The following key codes are supported:
 * - 37: Arrow Left → `keyboard.LEFT = true`
 * - 38: Arrow Up → `keyboard.UP = true`
 * - 39: Arrow Right → `keyboard.RIGHT = true`
 * - 40: Arrow Down → `keyboard.DOWN = true`
 * - 67: 'C' key → `keyboard.SPACE = true` 
 * - 68: 'D' key → `keyboard.letterD = true`
 *
 * @event keyup
 * @param {KeyboardEvent} event - The keyup event object.
 */
window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 67) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 68) {
        keyboard.letterD = false;
    }
});


/**
 * This function binds touch event listeners to the mobile control buttons for gameplay interaction.
 * It updates a global `keyboard` object to simula tekey presses based on touch input.
 * 
 * The following buttons are supported:
 * - `mobileBtnRight`: Simulates the "RIGHT" arrow key.
 * - `mobileBtnLeft`: Simulates the "LEFT" arrow key.
 * - `mobileBtnJump`: Simulates the "SPACE" key (usually for jump).
 * - `mobileBtnThrow`: Simulates the "D" key (possibly for throw or attack).
 * 
 * @function bindBtnsPressEvents
 * @event keydown
 * @param {KeyboardEvent} event - The keydown event object.
 * @event keyup
 * @param {KeyboardEvent} event - The keyup event object.
 */
function bindBtnsPressEvents() {
    document.getElementById('mobileBtnRight').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('mobileBtnRight').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('mobileBtnLeft').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('mobileBtnLeft').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('mobileBtnJump').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('mobileBtnJump').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('mobileBtnThrow').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.letterD = true;
    });

    document.getElementById('mobileBtnThrow').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.letterD = false;
    });
}

/**
 * this function checks continuously (every 200ms) the window width to determine
 * whether the application is being viewed on a mobile or desktop device, and
 * dynamically adjusts the UI accordingly.
 *
 * Different UI initialization and content visibility rules are applied, based on:
 * - The screen width (mobile if ≤ 1200px)
 * - The screen orientation (landscape vs. portrait)
 * - The game state (`gameStarted`)
 *
 * Behavior:
 * - In **mobile view** (≤ 1200px), it calls:
 *   - `testIfDeviceIsVertivalOrHorizontal()` to assess orientation.
 *   - `initMobileView()` to initialize basic mobile layout.
 *   - If in landscape: `initMobileLandscapeView()` and, if the game has started, `initMobileGameView()`.
 *   - On small-width devices (< 700px), it hides some content sections.
 * - In **desktop view** (> 1200px), it:
 *   - Sets `mobileWindow` to `false`
 *   - Hides mobile-specific UI elements like `mobileMenu` and `mobileAboutMenu`
 *   - Shows or hides content depending on game state and width
 *   - Calls `initDesktopView()` to activate desktop layout.
 *
 * Dependencies:
 * - Global variables: `mobileWindow`, `gameStarted`
 * - Functions called:
 *   - `testIfDeviceIsVertivalOrHorizontal()`
 *   - `initMobileView()`
 *   - `initMobileLandscapeView()`
 *   - `initMobileGameView()`
 *   - `initDesktopView()`
 *   - `hideShowContent(id: string, action: 'add' | 'remove')`
 *
 * @function testWindowWidth
 * @returns {void}
 */
function testWindowWidth() {  // prüft, ob mobil-Ansicht vorliegt
    //const interval = setInterval(() => {
    const mediaQuery = window.matchMedia('(max-width: 1200px)');
    //console.log(mobileWindow);

    //-- Mobile View
    if (mediaQuery.matches) {
        testIfDeviceIsVertivalOrHorizontal();
        initMobileView();
    }

    if (mediaQuery.matches && window.innerWidth > window.innerHeight) {
        mobileWindow = true;
        initMobileLandscapeView();  //-- blendet alles Notwendige für mobile Breitbildansicht ein bzw. aus

        if (gameStarted == true) {
            initMobileGameView();  //-- blendet UI-content ein
        } if (window.innerWidth < 700) {
            hideShowContent('pauseEndGameBtns', 'add');
            //hideShowContent('about-btns', 'add');
            document.addEventListener("DOMContentLoaded", () => {   //sorgt dafür, dass hideShowContent erst ausgeführt wird, wenn es om Dom vorhanden ist
                hideShowContent('pauseEndGameBtns', 'add');
            });
        }
    } else {
        if (!mediaQuery.matches) {
            mobileWindow = false;
        } else if (mediaQuery.matches) {
            mobileWindow = true;
        }
        hideShowContent('mobileMenu', 'add');     //blendet die Einstellungsbuttons mit den Symbolen aus
        if (gameStarted == true) {
            hideShowContent('mobileAboutMenu', 'add');  //blendet das Hamburger-Menu aus wenn das Handy hochkant gehalten wird und das spiel bereits gestartet wurde
        } if (gameStarted == true && window.innerWidth > 700) {
            hideShowContent('pauseEndGameBtns', 'remove');
        }
    }

    //-- Desktop-View
    if (!mediaQuery.matches) {
        initDesktopView();
    }

    //}, 200);
    //this.addIntervalToIntervalArray(interval);
}

function initMobileView() {
    hideShowContent('mobileAboutMenu', 'remove'); //zeigt das Hamburger-Menu an
    hideShowContent('menuBoard', 'add'); //blendet das Menu der Desktop-Ansicht aus
    hideShowContent('buttonBoard', 'add'); //blendet das buttonBoard der Desktop-Ansicht aus
    fullscreenDesktop = false;
}

/**
 * This function Shows or hides everything necessary for mobile widescreen view,
 * i.e. hiding the control buttons of the desktop view.
 * 
 * It also hides the desktop start-image and shows the mobile start-image
 * and sets the canvas-height to 100vh.
 * 
 * Dependencies:
 *  Functions called: 
 *      `hideShowContent()`
 *      `soundBtnMobile()`
 * 
 * @function initMobileLandscapeView
 */
function initMobileLandscapeView() {
    hideShowContent('pauseEndGameBtns', 'add');
    hideShowContent('nav', 'add');
    soundBtnMobile(); // bringt den SoundBtn an die linke Seite
    document.getElementById('startImg').classList.add('startImgMobileHorizontal');
    document.getElementById('startImg').classList.remove('startImgMobileVertical');
    document.getElementById('canvas').style.height = '100vh';
}

function initMobileGameView() {
    hideShowContent('mobileMenu', 'remove');     //zeigt die Einstellungsbuttons mit den Symbolen an
    hideShowContent('mobileCtrlBtnDiv1', 'remove');
    hideShowContent('mobileCtrlBtnDiv2', 'remove');
    hideShowContent('mobileAboutMenu', 'add'); //blendet das Hamburger-Menu aus
    hideShowContent('mobileAboutDiv', 'add'); //blenet die mobileAboutDiv aus
}

function initDesktopView() {
    hideShowContent('mobileAboutMenu', 'add'); //blendet das Hamburger-Menu aus
    hideShowContent('menuBoard', 'remove'); //zeigt das Menu der Desktop-Ansicht an
    hideMobileGameUI();
    testIfButtonBoardMustBeShown();
    soundBtnDesktop(); //bringt den SoundBtn wieder an die rechte Seite
}

function hideMobileGameUI() {
    hideShowContent('mobileCtrlBtnDiv1', 'add');
    hideShowContent('mobileCtrlBtnDiv2', 'add');
}

function testIfButtonBoardMustBeShown() {
    if (buttonBoardShown === true) {
        hideShowContent('buttonBoard', 'remove'); //zeigt das buttonBoard der Desktop-Ansicht an
    }
}

function adjustButtonBoardFlag(param) {
    buttonBoardShown = param;
}

function adjustStartImageOrientation(isHorizontal) {
    const img = document.getElementById('startImg');
    img.classList.toggle('startImgMobileHorizontal', isHorizontal);
    img.classList.toggle('startImgMobileVertical', !isHorizontal);
}

function hideShowContent(param1, param2) {
    document.getElementById(param1).classList[param2]('d-none');
}

function hideShowContent2(param1, param2) {
    document.getElementById(param1).classList[param2]('display-none');
}

/**
 * This function tests whether the device is aligned/held vertically or horizontally.
 * 
 * If the device is horizontal, it calls:
 *  `initHorizontalView()`
 *  `initGameStartedHorizontalView()`
 * 
 * If the device is vertical, it calls:
 *  ` initVerticalView()`
 *  `initGameStartedVerticalView()`
 * 
 * If the window is smaller than 600px, it calls:
 *  `initSmallVertikal()`
 * 
 * Dependencies:
 *  Global Variables: 
 *      `deviceVertical`, `deviceWasTurned`, `gameStarted`
 *  Functions called: 
 *      ` initVerticalView()`
 *      `initGameStartedVerticalView()`
 *      `initSmallVertikal()`
 * 
 * @function testIfDeviceIsVertivalOrHorizontal
 */
function testIfDeviceIsVertivalOrHorizontal() {
    if (window.innerWidth > window.innerHeight && gameStarted == true) {  //-- if device is horizontal
        initHorizontalView();
        deviceVertical = true;
        if (deviceWasTurned) {
            initGameStartedHorizontalView();
            deviceWasTurned = false;
        }
    } else {  //-- device is vertical
        initVerticalView();
        if (gameStarted == true) {
            initGameStartedVerticalView();
            deviceVertical = false;
            deviceWasTurned = true;
        }
    } if (window.innerWidth < 600) {
        initSmallVertikal();
    }
}

function initHorizontalView() {
    hideShowContent('turnDeviceTxtDiv', 'add');  // div "Turn Your devide" ausblenden
    hideShowContent('fullscreen', 'remove');
}

function initGameStartedHorizontalView() {
    resumeGame();              // reaktiviert das Spiel, nachdem das Smartphone in die horizontale Position gedreht wurde    
    toggleBtn('pauseGameBtnMobile', false);       // reaktiviert den durch das Pausieren des SPiels in der vertikalen Ansicht deaktivierten Pause-Button
}

function initVerticalView() {
    document.getElementById('startImg').classList.add('startImgMobileVertical');
    document.getElementById('startImg').classList.remove('startImgMobileHorizontal');
    document.getElementById('canvas').style.height = 'auto';
    hideShowContent('nav', 'remove');
}

function initGameStartedVerticalView() {
    hideShowContent('turnDeviceTxtDiv', 'remove');   // div "Turn Your device" einblenden
    pauseGame();         // pausiert das Spiel, wenn das Smartphone vertikal gehalten wird
    hideShowContent('pauseEndGameBtns', 'add');
    hideShowContent('fullscreen', 'add');
    document.body.classList.add('no-scroll');
}

function initSmallVertikal() {
    if (document.getElementById('about-btns')) {
        hideShowContent('about-btns', 'add');
    }
}

/**
 * This function starts the full screen mode in mobile view.
 *  
 * It checks every 200ms if the mobile view is´active and whether the device is aligned
 * vertically. If this condition is matched, the canvas is set to full height 
 * and mobile full screen view is enabled.
 * 
 * If however desktop view is activated, the canvas size is set back to standart desktop view,
 * the mobile view is disabled and the desktop view enabled.
 * 
 * Dependencies:
 *  Global variables:
 *      `mobileWindow`, `deviceVertical`
 *  Functions called: 
 *      `hideShowContent()`
 * 
 * @function fullScreenMobile
 * 
 */
function fullScreenMobile() {
    const interval = setInterval(() => {
        if (mobileWindow && deviceVertical) {
            document.getElementById('canvas').classList.add('canvasMaxHeight');
            document.getElementById('fullscreen').classList.add('fullscreenMobile');
            document.getElementById('startImg').classList.add('startImgMobile');
        }

        if (mobileWindow === false && !fullscreenDesktop) {
            document.getElementById('startImg').classList.remove('startImgMobileHorizontal');
            document.getElementById('startImg').classList.remove('startImgMobileVertical');
            document.getElementById('canvas').classList.remove('canvasMaxHeight');  //-- beendet Fullscreen wenn keine mobile Ansicht mehr vorliegt
            /* !!!! diese Zeile überschreibt den Wert der Höhe des canvas in der desktop-fullscreen-Ansicht */ document.getElementById('canvas').style.height = '480px';    //-- beendet Fullscreen wenn keine mobile Ansicht mehr vorliegt
            hideShowContent('nav', 'remove');
        }
    }, 200);
    this.addIntervalToIntervalArray(interval);
}

function soundBtnMobile() {
    document.getElementById('soundBtn').classList.add('soundBtnMobile');
}

function soundBtnDesktop() {
    document.getElementById('soundBtn').classList.remove('soundBtnMobile');
}

function showAboutPanel() {
    hideShowContent('regelnDiv', 'remove');
}

/**
 * Tis function shows or hides the mobile burger-menu.
 * 
 * Dependencies:
 *  Global variables:
 *      `showMobileAboutMenuVar`
 * 
 * @function showMobileAboutMenu
 */
function showMobileAboutMenu() {
    if (showMobileAboutMenuVar == false) {
        hideShowContent('mobileAboutDiv', 'remove'); //zeigt die mobileAboutDiv an
        hideShowContent('mobileAboutMenuBurgerImg', 'add');  // blendet im Toggle-Button das Hamburger-Menu aus
        hideShowContent('mobileAboutMenuXImg', 'remove'); //blendet im Toggle-Button das "X" zum Schließen der mobileAboutDiv ein 
        hideShowContent('greyBgrDiv', 'remove')
        showMobileAboutMenuVar = true;
    } else if (showMobileAboutMenuVar == true) {
        hideShowContent('mobileAboutDiv', 'add');
        hideShowContent('mobileAboutMenuBurgerImg', 'remove');
        hideShowContent('mobileAboutMenuXImg', 'add');
        hideShowContent('greyBgrDiv', 'add');
        showMobileAboutMenuVar = false;
    }
}

function hideShowContentAndMenu() {
    showMobileAboutMenu();
    hideShowContent('mobileAboutDiv', 'add');
    hideShowContent('greyBgrDiv', 'add');
}

/**
     * This function pushes the interval into the array gameIntervals in world.class.
     * It tries it as often as needed until it can push the respective interval into the
     * gameInterval array
     * 
     * @param {number} param - The ID of the interval 
     */
function addIntervalToIntervalArray(param) {
    if (typeof world !== 'undefined' && world?.gameIntervals) {
        world.gameIntervals.push(param);
        console.log(world.gameIntervals);
    } else {
        // Wiederholt die Prüfung 100ms später
        setTimeout(() => this.addIntervalToIntervalArray(param), 100);
    }
}











