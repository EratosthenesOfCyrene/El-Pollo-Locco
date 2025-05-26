/**
 * @typedef {object} StatusBar
 * @class StatusBar
 * @extends DrawableObject
 * @classdesc Draws the status bar showing the amount of the Character's life onto the canvas.
 *
 * @property {number} x - X position of the status-bar image sreen.
 * @property {number} y - Y position of the status-bar image sreen.
 * @property {number} width - Width of the status-bar image to be shown.
 * @property {number} height - Height of the status-bar image to be shown.
 */


class StatusBar extends DrawableObject {
    IMAGES_STATUSBAR_LIFE = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_LIFE);
        this.x = 40; // X-Koordinate der Anzeige der Statusbar
        this.y = 0;
        this.width = 180;
        this.height = 45;
        this.setPercentage(100);
    }

    /**
     * Determines the percentage of life that tha character still has and
     * draws the according image of the statusbar into the canvas.
     * 
     * @param {number} percentage - Percentual number of the character's life.
     * @method setPercentage
     * @memberof StatusBar
     */   
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR_LIFE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Shows the correct picture out of the array 'IMAGES_STATUSBAR_LIFE',
     * depending on how much life the character currently posseses.
     * 
     * @returns {number} 5 - If the character has collected less than 100 percent life.
     * @returns {number} 4 - If the character has collected more than 60 and less than 80 percent life.
     * Ans so on.
     * 
     * @method resolveImageIndex
     * @memberof StatusBar
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;  // zeigt das 5. Bild aus dem Array IMAGES_STATUSBAR_LIFE an. 
        } else if (this.percentage > 80 && this.percentage < 100) {
            return 4;
        } else if (this.percentage > 60 && this.percentage <= 80) {
            return 3
        } else if (this.percentage > 40 && this.percentage <= 60) {
            return 2;
        } else if (this.percentage > 20 && this.percentage <= 40) {
            return 1;
        } else {
            return 0;
        }
    }
}

