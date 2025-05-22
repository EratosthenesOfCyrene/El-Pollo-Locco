/**
 * Initializes level 1 with all required game objects including enemies, clouds,
 * bottles, coins, and background elements.
 * 
 * @type {Level}
 * @property {Enemy[]} enemies - Array of enemies including multiple Chickens and one Endboss.
 * @property {Cloud[]} clouds - Array of cloud objects for background animation.
 * @property {BottleOnFloor[]} bottleOnFloor - Array of bottles placed on the ground for collection.
 * @property {Coin[]} coins - Array of collectible coin objects.
 * @property {BackgroundObject[]} backgroundObjects - Array of background layer objects.
 */


const level1 = new Level(


    [new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Endboss(),
    ],

    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
    ],

    [
        new BottleOnFloor(),
        new BottleOnFloor(),
        new BottleOnFloor(),
        new BottleOnFloor(),
        new BottleOnFloor(),
        new BottleOnFloor(),
        new BottleOnFloor(),
        new BottleOnFloor(),
        new BottleOnFloor(),
        new BottleOnFloor(),
    ],

    [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
    ],   


    [
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/air.png', 0, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 0, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 0, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 0, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/air.png', 719, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719, 0),

        new BackgroundObject('./img_pollo_locco/img/5_background/layers/air.png', 719 * 2, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 719 * 2, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 719 * 2, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 719 * 2, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/air.png', 719 * 3, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719 * 3, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719 * 3, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719 * 3, 0),

        new BackgroundObject('./img_pollo_locco/img/5_background/layers/air.png', 719 * 4, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 719 * 4, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 719 * 4, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 719 * 4, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/air.png', 719 * 5, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719 * 5, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719 * 5, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719 * 5, 0),

        new BackgroundObject('./img_pollo_locco/img/5_background/layers/air.png', 719 * 6, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 719 * 6, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 719 * 6, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 719 * 6, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/air.png', 719 * 7, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719 * 7, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719 * 7, 0),
        new BackgroundObject('./img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719 * 7, 0),
    ],

    

);


