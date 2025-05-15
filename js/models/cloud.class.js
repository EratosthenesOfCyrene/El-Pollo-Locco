


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