/**
 * @typedef {object} StatusBarCoins
 * @class StatusBarCoins
 * @extends DrawableObject
 * @classdesc Draws the coins bar showing the amount of coins collected onto the canvas.
 *
 * @property {number} x - X position of the coins-bar image sreen.
 * @property {number} y - Y position of the coins-bar image sreen.
 * @property {number} width - Width of the coins-bar image to be shown.
 * @property {number} height - Height of the coins-bar image to be shown.
 */


class StatusBarCoins extends DrawableObject {
    IMAGES_STATUSBAR_COINS = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    collectedCoins = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_COINS);
        this.x = 40; // X-Koordinate der Anzeige der Statusbar
        this.y = 90;
        this.width = 180;
        this.height = 45;
        this.setCoinNumber(0);
    }

    /**
     * Adjusts/counts the number of the coins collected by the character.
     * 
     * @param {number} collectedCoins - Number of the collected coins.
     * @method setCoinNumber
     * @memberof StatusBarCoins
     */
    setCoinNumber(collectedCoins) {
        this.collectedCoins = collectedCoins;
        let path = this.IMAGES_STATUSBAR_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Shows the correct picture out of the array 'IMAGES_STATUSBAR_COINS',
     * depending on how many coins are currently in the inventar of the character.
     * 
     * @returns {number} 0 - If the character has collected less than 1 coin.
     * @returns {number} 1 - If the character has collected more than 3 coins and less than 6 coins.
     * Ans so on.
     * 
     * @method resolveImageIndex
     * @memberof StatusBarCoins
     */
    resolveImageIndex() {
        if (this.collectedCoins < 1) {
            return 0;  // zeigt das 0. Bild aus dem Array IMAGES_STATUSBAR_COINS an. 
        } else if (this.collectedCoins > 0 && this.collectedCoins <= 3) {
            return 1;
        } else if (this.collectedCoins > 3 && this.collectedCoins <= 6) {
            return 2;
        } else if (this.collectedCoins > 6 && this.collectedCoins <= 9) {
            return 3;
        } else if (this.collectedCoins > 9 && this.collecteCoins <= 12) {
            return 4;
        } else {
            return 5;
        }
    }
}




