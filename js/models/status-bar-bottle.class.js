/**
 * @typedef {object} StatusBarBottles
 * @class StatusBarBottles
 * @extends DrawableObject
 * @classdesc Draws the status bar showing the amount of bottles collected onto the canvas.
 *
 * @property {number} x - X position of the status-bottles-bar image sreen.
 * @property {number} y - Y position of the status-bottles-bar image sreen.
 * @property {number} width - Width of the status-bottles-bar image to be shown.
 * @property {number} height - Height of the status-bottles-bar image to be shown.
 */


class StatusBarBottles extends DrawableObject {
    IMAGES_STATUSBAR_BOTTLES = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    collectedBottles = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_BOTTLES);
        this.x = 40; // X-Koordinate der Anzeige der Statusbar
        this.y = 45;
        this.width = 180;
        this.height = 45;
        this.setBottleNumber(0);
    }

    /**
     * Adjusts/counts the number of the bottles collected by the character.
     * 
     * @param {number} collectedBottles - Number of the collected bottles.
     * @method setBottleNumber
     * @memberof StatusBarBottles
     */
    setBottleNumber(collectedBottles) {
        this.collectedBottles = collectedBottles;
        let path = this.IMAGES_STATUSBAR_BOTTLES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Shows the correct picture out of the array 'IMAGES_STATUSBAR_BOTTLES',
     * depending on how many bottles are currently in the inventar of the character.
     * 
     * @returns {number} 0 - If the character has collected less than 1 bottle.
     * @returns {number} 1 - If the character has collected more than 3 bottles and less than 6 bottles.
     * Ans so on.
     * 
     * @method resolveImageIndex
     * @memberof StatusBarBottles
     */
    resolveImageIndex() {
        if (this.collectedBottles < 1) {
            return 0;  // zeigt das 0. Bild aus dem Array IMAGES_STATUSBAR_BOTTLES an. 
        } else if (this.collectedBottles > 0 && this.collectedBottles <= 3) {
            return 1;
        } else if (this.collectedBottles > 3 && this.collectedBottles <= 6) {
            return 2;
        } else if (this.collectedBottles > 6 && this.collectedBottles <= 9) {
            return 3;
        } else if (this.collectedBottles > 9 && this.collectedBottles <= 12) {
            return 4;
        } else {
            return 5;
        }
    }
}

