/**
 * @typedef {object} StatusKilledEnemies
 * @class StatusKilledEnemies
 * @extends DrawableObject
 * @classdesc Draws the skull that represents the killed enemies onto the canvas.
 *
 * @property {number} x - X position of the skull-image on the sreen.
 * @property {number} y - Y position of the skull-image on the sreen.
 * @property {number} width - Width of the skull-image to be shown.
 * @property {number} height - Height of the skull-image to be shown.
 */

class StatusKilledEnemies extends DrawableObject {
    IMAGE_KILLED_ENEMY = [
        'img_pollo_locco/skul/Skull_2.png',
    ];


    constructor() {
        super();
        this.loadImage(this.IMAGE_KILLED_ENEMY);
        this.x = 660; // X-Koordinate der Anzeige des StatusIcons
        this.y = 20;
        this.width = 30;
        this.height = 30;

    }


}