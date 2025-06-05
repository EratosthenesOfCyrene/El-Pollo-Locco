
/**
 * @typedef {Object} Coin
 * @property {number} x - X position of the coin on the canvas.
 * @property {number} y - Y position of the coin on the canvas.
 * @property {number} width - Width of the coin to be drawn.
 * @property {number} height - Height of the coin to be drawn.
 * @property {string} id - Indicates the id (identification number) of the respective coin.
 * @property {function(CanvasRenderingContext2D):void} draw - Draws the coin to the canvas context.
 * 
 * @class Coin
 * @extends MovableObject
 */


class Coin extends MovableObject {

    id;

    

    IMAGES_COIN = [
        './img_pollo_locco/img/8_coin/coin_1.png',
        './img_pollo_locco/img/8_coin/coin_2.png',
    ];

    constructor() {
        super().loadImage('./img_pollo_locco/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.height = 70;
        this.width = 65;
        this.x = 300 + Math.random() * 5000;
        this.y = 50 + Math.random() * 300;
        this.animate();
        this.id = Coin.i;      // Statische Variablen gehören zur Klasse selbst und nicht zu einer Instanz der Klasse. Daher verwendet man BottleOnFloor.i um sie anzusprechen und nicht this.i !!!
        Coin.i++;
    }

    /**
     * Places the coins along the x-axis. This function creates random x-coordinates for each 
     * coin, depending if the game was startet at level 1 oder level 2.
     * 
     * @method correctPositionOfEachCoin
     * @memberof Coin
     */
    correctPositionOfEachCoin() {
        const interval = setInterval(() => {
            world.level.coins.forEach(coin => {
                //-- Level 1
                if (world?.testIfLevel2 === false) {
                    coin.x = 300 + Math.random() * 4900;  //-- platziert die Coins entlang der X-Achse
                    clearInterval(interval);

                    //-- Level 2
                } if (world?.testIfLevel2 === true) {
                    coin.x = 300 + Math.random() * 7900;  //-- platziert die Coins entlang der X-Achse
                    clearInterval(interval);
                }
            });
        }, 200);
         this.addIntervalToIntervalArray(interval);  
    }

    animate() {
        const interval = setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 700);
         this.addIntervalToIntervalArray(interval);  
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
