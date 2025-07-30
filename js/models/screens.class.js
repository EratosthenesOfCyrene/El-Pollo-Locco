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
     * Shows the game-won or game-lost screen depending if the game was lost or won
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
        this.addIntervalToIntervalArray(interval);  
    }

    gameLost() {
        //setInterval(() => {
            this.loadImage(this.IMAGE_LOSS); 
        //}, 200);
        //this.loadImage(this.IMAGE_LOSS);
        pauseGame();
        toggleBtn('resumeGameBtnMobile', true);  // aktiviert den zuvor deaktivierten "play-Button" der mobilen Ansicht
        showLevelSelection();
        this.world.background_sound.pause();
    }

    gameWon() {
        this.loadImage(this.IMAGE_WON);
        pauseGame();
        toggleBtn('resumeGameBtnMobile', true);  // deaktiviert den zuvor deaktivierten "play-Button" der mobilen Ansicht
        showLevelSelection();
        this.world.background_sound.pause();
        this.world.deleteAllEnemies();
    }

   /**
     * This function pushes the interval into the array gameIntervals in world.class.
     * It tries it as often as needed until it can push the respective interval into the
     * gameInterval array
     * 
     * @param {number} param - The ID of the interval 
     */
     addIntervalToIntervalArray(param) {
          if (typeof world !== 'undefined' && world?.gameIntervals) {
            world.gameIntervals.push(param);
            console.log(world.gameIntervals);
        } else {
            // Wiederholt die Prüfung 100ms später
            setTimeout(() => this.addIntervalToIntervalArray(param), 100);
        }          
    } 


}