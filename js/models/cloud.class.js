
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
        setInterval(() => {
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
                
    }

   


}