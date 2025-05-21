
/**
 * @typedef {Object} Level
 *
 * @classdesc Represents a game level containing enemies, collectibles, and background elements.
 *
 * @property {Array<Enemy>} enemies - Array of enemy objects in the level.
 * @property {Array<Cloud>} clouds - Array of cloud objects for background decoration.
 * @property {Array<BottleOnFloor>} bottleOnFloor - Array of bottle objects placed on the ground.
 * @property {Array<Coins>} coins - Array of collectible coin objects.
 * @property {Array<Backgroundobjects>} backgroundObjects - Array of background elements like scenery.
 * @property {Array<ThrowableObject>} collectedBottle - Array of bottles that have been collected.
 * @property {number} level_end_x - The maximum x-coordinate the character can move to (default: 5100).
 * 
 *  @class Level
 */


class Level {

    enemies;
    clouds;
    bottleOnFloor;
    coins;
    backgroundObjects;
    collectedBottle;

    level_end_x = 5100;  //-- weiter kann sich der Character nicht bewegen

    constructor(enemies, clouds, bottleOnFloor, coins, backgroundObjects, collectedBottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.bottleOnFloor = bottleOnFloor;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
        this.collectedBottle = collectedBottle;
    }


    level1 = [];

    createLevel1() {
        for (let i = 0; i < 5; i++) {
            const level = new Level(
                createEnemies(),
                createClouds(),
                createBottlesOnFloor(),
                createBackgroundObjects(),
            );
            this.level1.push(level);
            console.log(level1);
        };
    };

    createEnemies() {
        let enemies = [];
        for (let i = 0; i < 3; i++) {
            enemies.push(new Chicken());
        }
    };

    createClouds() {
        for (let i = 0; i < 2; i++) {
            new Cloud();
        }
    };

    createBottlesOnFloor() {
        let bottleOnFloor = [];
        for (let i = 0; i < 4; i++) {
            bottleOnFloor.push(BottleOnFloor());
        }
    };

    createBackgroundObjects() {
        let backgroundObjects = [];
        for (let i = 0; i < 5; i++) {
            backgroundObjects.push(new BackgroundObject('./img_pollo_locco/img/5_background/layers/air.png', 719 * i, 0));
            backgroundObjects.push(new BackgroundObject('./img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 719 * i, 0));
            backgroundObjects.push(new BackgroundObject('./img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 719 * i, 0));
            backgroundObjects.push(new BackgroundObject('./img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 719 * i, 0));
            backgroundObjects.push(new BackgroundObject('./img_pollo_locco/img/5_background/layers/air.png', 719 * (i + 1), 0));
            backgroundObjects.push(new BackgroundObject('./img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719 * (i + 1), 0));
            backgroundObjects.push(new BackgroundObject('./img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719 * (i + 1), 0));
            backgroundObjects.push(new BackgroundObject('./img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719 * (i + 1), 0));
        }
        return backgroundObjects;
    };



}



