
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


}