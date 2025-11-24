/**
 * @typedef {object} Screens
 * @class Screens
 * @extends DrawableObject
 * @classdesc Handles the display of the game-won oder game-lost image on the screen.
 *
 * @property {number} x - X position of the image sreen.
 * @property {number} y - Y position of the image sreen.
 * @property {number} width - Width of the image to be shown.
 * @property {number} height - Height of the image to be shown.
 */


class Screens extends DrawableObject {

    IMAGE_START = [
        'img_pollo_locco/img/9_intro_outro_screens/start/startscreen_1.png',
    ];


    IMAGE_WON = [
        'img_pollo_locco/img/9_intro_outro_screens/game_over/game over!.png',
    ];


    IMAGE_LOSS = [
        'img_pollo_locco/img/9_intro_outro_screens/game_over/oh no you lost!.png',
    ];

    constructor(world) {
        super();
        this.world = world;
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;
        this.showScreen();
    }

    /**
     * Calls the game-won or game-lost screen function depending if the game was lost or won
     * 
     * @method showScreen
     * @memberof Screens
     */
    showScreen() {
        const interval = setInterval(() => {
            if (this.world.character.energy == 0 && !this.world.gameOver) {
                this.gameLost();
                this.world.gameOver = true;
            }
            else if (this.world.level.enemies[this.world.level.enemies.length - 1].endbossLife <= 0) {
                setTimeout(() => {
                    this.gameWon();
                    this.world.gameOver = true;
                }, 6000);
                clearInterval(interval);
            }
        }, 200);
        this.world.intervals.addIntervalToIntervalArray(interval);
    }

    /**
     * Handles all the events related to a loss.
     * Loads the game lost image, handles the game lost sounds, pause the game, reactivates the 
     * play button in moble view, shows the level selection div and stops all sounds.
     * 
     * @method gameLost
     * @memberof Screens
     */
    gameLost() {
        this.loadImage(this.IMAGE_LOSS);
        window.world.sounds.hanndleGameLostSounds();
        pauseGame();
        toggleBtn('resumeGameBtnMobile', true);  // deaktiviert den zuvor deaktivierten "resumeGame-Button" der mobilen Ansicht
        toggleBtn('resumeGameBtn', true); // deaktiviert den zuvor deaktivierten "resumeGame-Button" der desktop-Ansicht
        setTimeout(() => {
            showLevelSelection();
        }, 4600);
        window.world.sounds.stopAllSounds();
    }

    /**
     * Handles all the events related to a win.
     * Loads the game won image, handles the game lost sounds, pause the game, reactivates the 
     * play button in moble view, shows the level selection div and deletes all remaining enemies.
     * 
     * @method gameWon
     * @memberof Screens
     */
    gameWon() {
        this.loadImage(this.IMAGE_WON);
        window.world.sounds.handleGameWonSounds();
        pauseGame();
        toggleBtn('resumeGameBtnMobile', true);  // deaktiviert den zuvor deaktivierten "resumeGame-Button" der mobilen Ansicht
        toggleBtn('resumeGameBtn', true);  // deaktiviert den zuvor deaktivierten "resumeGame-Button" der Desktop-Ansicht
        setTimeout(() => {
            showLevelSelection();
        }, 3600);
        this.world.background_sound.pause();
        this.world.deleteAllEnemies();
    }

    /**
     * Draws the screens onto the canvas. This has to be done in this seperate 
     * function because - unlike the other objects in the game world - the screens
     * have to be drawn over the full height and width of the canvas. 
     * This is necessary because screens behave differently from other drawable objects in the game world. 
     * All other objcts are drawn into the given x and y coordinates and use their 
     * own width and height. The screens however have to be drawn over the entire canvas.
     * 
     * @param {object} movingObject - Not used by screens, but required to maintain 
     *                                compatibility with the world's generic 
     *                                draw pipeline.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context used to 
     *                                         draw the image onto the canvas.
     * @returns {void} Exits early if no image is available or draws the screen image fullscreen.
     */
    draw(movingObject, ctx) {
        if (!this.img) return; // checks if the image is loaded and stops the process of drawing if not to avoid errors

        ctx.drawImage(
            this.img,
            0,
            0,
            canvas.width, // setzt die Breite des zu zeichnenden Bildes/Screens auf die Breite de Canvas, damit das Bild über den gesamten Canvas gezeichnet wird. 
            canvas.height
        );
    }








}