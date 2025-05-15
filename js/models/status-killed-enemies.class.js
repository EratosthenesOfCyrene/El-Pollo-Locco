

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