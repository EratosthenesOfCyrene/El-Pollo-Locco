
/**
 * @typedef {Object} Cloud
 * @property {number} x - X position of the cloud on the canvas.
 * @property {number} y - Y position of the cloud on the canvas.
 * @property {number} width - Width of the cloud to be drawn.
 * @property {number} height - Height of the cloud to be drawn.
 * @property {number} speedCloud - Speed by which the cloud moves (to the left).
 * @property {function(CanvasRenderingContext2D):void} draw - Draws the cloud to the canvas context.
 * 
 * @class Cloud
 * @extends MovableObject
 */

class Cloud extends MovableObject {
    width = 500;
    height = 250;
    speedCloud = 0.14

    constructor() {
        super().loadImage('./img_pollo_locco/img/5_background/layers/4_clouds/1.png');

        this.animateMovement();
        this.x = Math.random() * 6000;
        this.y = 20;
    }

    /**
     * Animates the movement of the clouds
     * 
     * @method animateMovement
     * @memberof Cloud
     */
    animateMovement() {
        const interval = setInterval(() => {
           if (typeof gameStarted !== 'undefined' && gameStarted == true && world.keyboard.RIGHT && !world.gamePaused) {  //-- "typeof gameStarted !== 'undefined'" prüft, ob gameStarted geladen wurd, da es sonst eiinen Fehler gäbe
                this.speedCloud = 0.5;
            } if (typeof gameStarted !== 'undefined' && gameStarted == true && !world.keyboard.RIGHT && !world.keyboard.LEFT) {
                this.speedCloud = 0.14;
            } if (typeof gameStarted !== 'undefined' && gameStarted == true && world.keyboard.LEFT && !world.gamePaused) {
                this.speedCloud = -0.36;
            } if (typeof gameStarted !== 'undefined' && gameStarted == true && !world.keyboard.LEFT && !world.keyboard.RIGHT) {
                this.speedCloud = 0.14;
            }
            this.x = this.x - this.speedCloud;
        }, 20);
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