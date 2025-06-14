
/**
 * @typedef {Object} BottleOnFloor
 * @property {number} x - X position of the bottleOnFloor on the canvas.
 * @property {number} y - Y position of the bottleOnFloor on the canvas.
 * @property {number} width - Width of the bottleOnFloor to be drawn.
 * @property {number} height - Height of the bottleOnFloor to be drawn.
 * @property {number} speedCloud - Speed by which the cloud moves (to the left).
 * @property {string} id - Indicates the id (identification number) of the respective bottleOnFloor.
 * 
 * @class BottleOnFloor
 * @extends MovableObject
 */


class BottleOnFloor extends MovableObject {
    static i = 0;   // erschafft eine statische Variable, dien Wert des letzten Aufrufs speichert
    id;
    IMAGES_BOTTLE_GROUND = [
        'img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor() {
        let randomnumber = Math.round(Math.random());
        if (randomnumber == 0) {
            super().loadImage('img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        } else {
            super().loadImage('img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        }

        this.height = 70;
        this.width = 65;
        this.x = 300 + Math.random() * 5000;
        this.y = 360;
        this.id = BottleOnFloor.i;      // Statische Variablen gehören zur Klasse selbst und nicht zu einer Instanz der Klasse. Daher verwendet man BottleOnFloor.i um sie anzusprechen und nicht this.i !!!
        BottleOnFloor.i++;
    }

    /**
     * Places the bottleOnFloor along the x-axe. This function creates random x-coordinates for each 
     * bottleOnFloor, depending if the game was startet at level 1 oder level 2.
     * 
     * @method correctPositionOfEachBottle
     * @memberof BottleOnFloor
     */
    correctPositionOfEachBottle() {
        const interval = setInterval(() => {
            world.level.bottleOnFloor.forEach(bottle => {
                //-- Level 1
                if (world?.testIfLevel2 === false) {
                    bottle.x = 300 + Math.random() * 4900;  //-- platziert die Coins entlang der X-Achse
                    clearInterval(interval);

                    //-- Level 2
                } if (world?.testIfLevel2 === true) {
                    bottle.x = 300 + Math.random() * 7900;  //-- platziert die Coins entlang der X-Achse
                    clearInterval(interval);
                }
            });
        }, 200);
        this.addIntervalToIntervalArray(interval);
    }

    /**
     * Creates an index for each bottleOnFloor
     * 
     * @method createIndex
     * @memberof BottleOnFloor
     */
    createIndex() {
        world.booooottles.push(BottleOnFloor, { 'index': BottleOnFloor.i });
        BottleOnFloor.i++;
    }

    /**
     * This function pushes the interval into the array gameIntervals in world.class.
     * It tries it as often as needed until it can push the respective interval into the
     * gameInterval array
     * 
     * @param {number} param - The ID of the interval 
     */
    addIntervalToIntervalArray(interval) {
        if (world?.gameIntervals) {
            world.gameIntervals.push(interval);
            console.log(world.gameIntervals);
        } else {
            // Wiederholt die Prüfung 100ms später
            setTimeout(() => this.addIntervalToIntervalArray(interval), 100);
        }
    }



}