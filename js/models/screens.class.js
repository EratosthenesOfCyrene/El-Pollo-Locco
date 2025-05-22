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

    constructor() {
        super();
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
            if (world.character.energy == 0 && !world.gameOver) {
                this.gameLost();
                world.gameOver = true;
            }
            else if (level.enemies[level.enemies.length - 1].endbossLife <= 0) {
                setTimeout(() => {
                    this.gameWon();
                    world.gameOver = true;
                }, 6000);
                clearInterval(interval);
            }
        }, 200);
    }

    gameLost() {
        this.loadImage(this.IMAGE_LOSS);
        pauseGame();
        showLevelSelection();
        world.background_sound.pause();
    }

    gameWon() {
        this.loadImage(this.IMAGE_WON);
        pauseGame();
        showLevelSelection();
        world.background_sound.pause();
        world.deleteAllEnemies();
    }


}