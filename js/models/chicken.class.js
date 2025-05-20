
/**
 * @typedef {Object} Chicken
 * @property {number} x - X position of the chicken on the canvas.
 * @property {number} y - Y position of the chicken on the canvas.
 * @property {number} width - Width of the chicken to be drawn.
 * @property {number} height - Height of the chicken to be drawn.
 * @property {number} speed - Speed by which the character moves (to the left).
 * @property {function(CanvasRenderingContext2D):void} draw - Draws the chicken to the canvas context.
 * 
 * @class Chicken
 */


class Chicken extends MovableObject {

    chickenBig;
    chickenSmall;
    isDead = false;

    //  Images BIG Chicken
    IMAGES_WALKING = [
        './img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGE_DEAD = [
        './img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];


    // Images small Chicken
    IMAGES_WALKING_SMALL = [
        './img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGE_DEAD_SMALL = [
        './img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];


    constructor() {
        super();
        let randomNumber = Math.random();   //  erzeugt ene zufüllige Zahl zwischen 0 und 1, von deren Größe abhängt, ob ein großes oder kleines Chicken erzeugt wird
        if (randomNumber > 0.65) {
            this.loadPropertiesChickenBig();
        } else {
            this.loadPropertiesChickenSmall();
        }
    }

    /**
     * Places the chicken along the x-axis and attributes a value of speed to each one.
     * This function creates random x-coordinates and values for their speed for each 
     * chicken, depending if the game was startet at level 1 oder level 2 and attributes those 
     * values to each chicken. 
     * 
     * @method correctSpeedOfEachChicken
     * @memberof Chicken
     */
    correctSpeedOfEachChicken() {    //-- diese Funktion wird oben in World (Z. 58) aufgerufen
        const interval = setInterval(() => {
            level.enemies.forEach(enemy => {
                if (world?.testIfLevel2 === false) {
                    if (enemy.chickenBig) {
                        enemy.speed = 0.15 + Math.random() * 0.63;  // randomisiert die Geschwindigkeit der einzelnen Hühner für Level 1                 
                        enemy.currentspeed = enemy.speed;
                        enemy.x = 1000 + Math.random() * 4900;  //-- platziert die Enemies entlang der X-Achse
                        console.log("Level 1 ist aktiv!", enemy.chickenBig, enemy.speed, enemy.currentspeed, enemy.x, level.enemies[11].speed, level.enemies[11].x);
                    }
                    if (!enemy.chickenBig) {
                        enemy.speed = 0.15 + Math.random() * 0.25;  // randomisiert die Geschwindigkeit der einzelnen Hühner für Level 1                 
                        enemy.currentspeed = enemy.speed;
                        enemy.x = 800 + Math.random() * 2900;  //-- platziert die Enemies entlang der X-Achse
                        //console.log("Level 1 ist aktiv!", enemy.chickenBig, enemy.speed, enemy.currentspeed, enemy.x, level.enemies[11].speed, level.enemies[11].x);
                    } 
                    level.enemies[11].x = 5300;   //-- weist dem Endboss seine Position zu, da diese sonst überschrieben worden ist
                    level.enemies[11].speed = 0;  
                    clearInterval(interval);

                    //-- Level 2
                } if (world?.testIfLevel2 === true) {
                    if (enemy.chickenBig) {
                        enemy.speed = 0.3 + Math.random() * 0.8;  // randomisiert die Geschwindigkeit der einzelnen Hühner für Level 1                 
                        enemy.currentspeed = enemy.speed;
                        enemy.x = 1000 + Math.random() * 8900;  //-- platziert die Enemies entlang der X-Achse
                        console.log("Level 2 ist aktiv!", enemy.chickenBig, 'speed:', enemy.speed, 'x:', enemy.x, 'x [21]:', level.enemies[21].speed, 'x [21]:', level.enemies[21].x);
                    }
                    if (!enemy.chickenBig) {
                        enemy.speed = 0.3 + Math.random() * 0.35;  // randomisiert die Geschwindigkeit der einzelnen Hühner für Level 1                 
                        enemy.currentspeed = enemy.speed;
                        enemy.x = 800 + Math.random() * 4900;  //-- platziert die Enemies entlang der X-Achse
                        console.log("Level 2 ist aktiv!", enemy.chickenBig, 'speed:', enemy.speed,'x:', enemy.x, 'x [21]:', level.enemies[21].speed, 'x [21]:', level.enemies[21].x);
                    }
                    level.enemies[21].x = 8300;   //-- weist dem Endboss seine Position zu, da diese sonst überschrieben worden ist
                    level.enemies[21].speed = 0;  
                    clearInterval(interval);
                }
            });
        }, 200);
    }

    loadPropertiesChickenBig() {
        this.chickenBig = true;
        this.width = 70;
        this.height = 70;
        this.y = 360;
        this.loadImage('./img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);
    }

    loadPropertiesChickenSmall() {
        this.chickenBig = false;
        this.width = 40;
        this.height = 50;
        this.y = 380;
        this.loadImage('./img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.currentspeed = this.speed;
        this.loadImages(this.IMAGES_WALKING_SMALL);
        this.animate(this.IMAGES_WALKING_SMALL);
        this.loadImage(this.IMAGE_DEAD_SMALL);
    }

    /**
     * Initiates Movement of the chicken and draws them onto the canvas
     * 
     * @param {Array} images - The images of the chickens that are to be drawn onto the canvas
     * 
     * @method animate
     * @memberof Chicken
     */
    animate(images) {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(images);
        }, 200);
    }

    



}