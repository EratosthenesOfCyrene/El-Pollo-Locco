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
        toggleBtn('resumeGameBtnMobile', true);  // aktiviert den zuvor deaktivierten "play-Button" der mobilen Ansicht
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
        toggleBtn('resumeGameBtnMobile', true);  // deaktiviert den zuvor deaktivierten "play-Button" der mobilen Ansicht
        setTimeout(() => {
            showLevelSelection();
        }, 3600);
        this.world.background_sound.pause();
        this.world.deleteAllEnemies();
    }

    
   


}