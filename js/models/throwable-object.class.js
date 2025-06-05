/**
 * @typedef {Object} ThrowableObject
 * @property {number} x - X position of the bottle on the canvas.
 * @property {number} y - Y vertical position of the bottle on the canvas.
 * @property {number} width - Width of the thrown bottle to be drawn.
 * @property {number} height - Height of the thrown bottle to be drawn.
 * @property {number} speed - Speed by which the thrown bottle moves on the x-axis.
 * @property {boolean} bottleCollides -  Indicates whether the bottle collides whith an enemy. Defaults to false.
 * @property {number} throwBottleIntervalID - ID of the interval that moves the x-coordinates of the thrown bottle so that it looks like it has been thrown..
 * @property {number} playAnimationIntervalID - ID of the interval that plays the images/animation of the thrown bottle.
 * @property {number} checkForCollissionIntervalID - ID of the interval that checks for collisions of a bottle and an enemy.
 * @property {number} checkForYOrCollissionIntervalID - ID of the interval that checks whether the thrown bottle 
 *      collides vertically (y-axis) whith either an enemy or the floor.
 * 
 * @class ThrowableObject
 * @extends MovableObject
 */


class ThrowableObject extends MovableObject {


    throwBottleIntervalID;
    playAnimationIntervalID;
    checkForCollissionIntervalID;
    checkForYOrCollissionIntervalID;
    bottleCollides = false;

    //enemyHurt_sound = new Audio('audio/chickenKilled_sound.mp3');
    //enemyDeleted_sound = new Audio('audio/mixkit-game-notification-wave-alarm-987.wav');


    IMAGES_THROW = [
        './img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        './img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y) {
        super().loadImage('img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');

        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);

        this.speed = 0.40;
        this.height = 70;
        this.width = 65;
        this.x = -1111;  //-- sorgt dafür, dass die gesammelte Flasche -1111px links des Bildschirm angezeigt wird
    }

    /**
     * Inits and handles all the things that are responsible for throwing a bottle and hitting enemies whith it.
     * 
     * @method throw
     * @memberof ThrowableObject
     */
    throw() {
        world.bottleInAir = true;  // gibt an, dass sich gerade eine Flasche in der Luft befindet
        this.x = world.character.x + 100;
        if (world.character.otherdirection == true) {   // Anpassen des x-Wertes der Flasche, wenn nach links geworfen wird
            this.x = world.character.x
        };
        this.y = world.character.y;
        this.speedY = 30;
        this.applyGravity();
        this.testThrowDirection();
        this.playAnimationImgThrow();
        this.checkForCollissions();
        this.checkForYOrCollossion();
    }

    /**
     * Checks whether the character is looking to the right or the left side.
     * 
     * @method testThrowDirection
     * @memberof ThrowableObject
     */
    testThrowDirection() {
        if (world.character.otherdirection == true) {      // Diese Funktion prüft, ob der Character nach linkt oder nach rechts zeigt. Entsprechend wird die Funktion, die die Flasche nach links oder anch rechts wirft, ausgeführt.
            this.throwBottleLeft();
        } else {
            this.throwBottleRight();
        }
    }

    /**
     * Plays the animation of the thrown bottle
     * 
     * @method playAnimationImgThrow
     * @memberof ThrowableObject
     */
    playAnimationImgThrow() {
        this.playAnimationIntervalID = setInterval(() => {
            this.playAnimation(this.IMAGES_THROW);
        }, 50);
        this.addIntervalToIntervalArray(this.playAnimationIntervalID);  
    }

    /**
     * Checks for collissions of thrown bottles whith enemies
     * 
     * @method checkForCollissions
     * @memberof ThrowableObject
     */
    checkForCollissions() {
        this.checkForCollissionIntervalID = setInterval(() => {  // Checking for collisions of thrown bottles whith enemies (Chickens)
            world.level.enemies.forEach((enemy, indexOfEnemy) => {
                if (world.collectedThrowableObjects[0].isCollidingBottleEnemy(enemy, indexOfEnemy)) {   // oder:  this.level.collectedBottle.isColliding(enemy)...
                    this.testIfChickenOrEndbossIsHit(indexOfEnemy);
                    this.bottleCollides = true;
                }
            });
            this.addIntervalToIntervalArray(this.checkForCollissionIntervalID);  
        }, 200);
    }

    /**
     * Checks, if the thrown bottle collides vertically whith an enemy or whith the floor
     * (this is the case if this.y > 360).
     * 
     * @method checkForYOrCollossion
     * @memberof ThrowableObject
     */
    checkForYOrCollossion() {
        this.checkForYOrCollissionIntervalID = setInterval(() => {
            world.character.enemyHit_sound.pause();
            if (this.y > 360 || this.bottleCollides == true) {
                this.resetBottleIntervals();
                this.bottleCollides = false;
                world.character.enemyHit_sound.play();
            }
        }, 25);
        this.addIntervalToIntervalArray(this.checkForYOrCollissionIntervalID);  
    }

    throwBottleLeft() {
        this.throwBottleIntervalID = setInterval(() => {
            this.x -= 10;
        }, 25);
        this.addIntervalToIntervalArray(this.throwBottleIntervalID);  
    }

    throwBottleRight() {
        this.throwBottleIntervalID = setInterval(() => {
            this.x += 10;
        }, 25);
        this.addIntervalToIntervalArray(this.throwBottleIntervalID);  
    }

    /**
     * Resets the intervalls that handle the throwing, animation and collission detection of the thrown bottles.
     * 
     * @method resetBottleIntervals
     * @memberof ThrowableObject
     */
    resetBottleIntervals() {
        clearInterval(this.checkForYOrCollissionIntervalID);
        clearInterval(this.throwBottleIntervalID);
        clearInterval(this.playAnimationIntervalID);
        clearInterval(this.checkForCollissionIntervalID);
        this.playSplashAnimation();
        this.actualizeBottlesBar();  // aktualisiert die Bottles-Bar
    }

    playSplashAnimation() {
        this.playAnimation(this.IMAGES_SPLASH);
        this.deleteThrownBottle();
        world.bottleInAir = false;   // zurückgeben, dass KEINE Flasche (mehr) in der Luft ist
        return true;
    }

    deleteThrownBottle() {
        setTimeout(() => {
            world.collectedThrowableObjects.splice(0, 1);
        }, 300);
    }

    /**
     * Checks whether an normal chicken or the endboss was hit.
     * 
     * @param {Array<String>} indexOfEnemy - Index of the testetd enemy.
     * @method testIfChickenOrEndbossIsHit
     * @memberof ThrowableObject
     */
    testIfChickenOrEndbossIsHit(indexOfEnemy) {
        let indexOfEndboss = world.level.enemies.length - 1;
        if (indexOfEnemy != indexOfEndboss) {   // prüft anhand des Index, ob es sich bei dem getroffenen Objekt um den Endboss handelt
            this.playDeadChickenAnimation(indexOfEnemy);
        } else if (indexOfEnemy == indexOfEndboss) {
            world.level.enemies[indexOfEndboss].endbossHit = true;
            world.level.enemies[indexOfEndboss].playHurtAnimation = false;
            world.level.enemies[indexOfEndboss].endbossLife -= 20;
            this.deleteEndboss(indexOfEndboss);
        }
    }

    deleteEndboss(indexOfEndboss) {
        if (world.level.enemies[indexOfEndboss].endbossLife < 20) {
            setTimeout(() => {
                world.level.enemies.splice(indexOfEndboss, 1);
            }, 9000);
        }
    }

    /**
     * Handles the playback of the death-animation if a chicken was hit.
     * 
     * @param {Array<String>} indexOfEnemy - Index of the testetd enemy
     * @method playDeadChickenAnimation
     * @memberof ThrowableObject
     */
    playDeadChickenAnimation(indexOfEnemy) {
        let enemy = world.level.enemies[indexOfEnemy];
        const deadChickenIntervalID = setInterval(() => {
            if (enemy.chickenBig == true) {   // diese Abfrage prüft, ob es sich um ein großes oder ein kleines Ckicken handelt, damit im Folgenden das richtige Bild des toten Chicken geladen werden kann
                enemy.loadImage(enemy.IMAGE_DEAD);
            } else {
                enemy.loadImage(enemy.IMAGE_DEAD_SMALL);
            }
            enemy.speed = 0;  //-- Stops the movement of the hit enemy
            world.character.enemyDeleted_sound.play();
        }, 200);

        setTimeout(() => {
            clearInterval(deadChickenIntervalID);
            this.deleteHitEnemy(indexOfEnemy);
        }, 1500);
        this.addIntervalToIntervalArray(deadChickenIntervalID);  
    }

    deleteHitEnemy(indexOfEnemy) {  // deletes the hit enemy
        world.level.enemies.splice(indexOfEnemy, 1);
        world.character.regainLife();  // erhöht das Leben des Characters, wenn ein enemy getötet wurde
        this.playRegainHealthSound();
        world.killedEnemies++;   // erhöht den Counter der getöteten Enemies, damit die Zahl der getöteten Enemies im Camnvas aktualisiert werden kann
    }

    actualizeBottlesBar() {
        world.statusBarBottles.collectedBottles--;  // verringert den Wert der gesammelten Flaschen für die Bottle-Status-Bar
        world.statusBarBottles.setBottleNumber(world.statusBarBottles.collectedBottles);  // aktualisiert die Anzeige der Bottle-Status-Bar
    }

    playRegainHealthSound() {
        if (world.character.energy < 99) {
            world.character.healthRecharge_sound.play();
        }
    }

    /**
     * This function pushes the interval into the array gameIntervals in world.class.
     * It tries it as often as needed until it can push the respective interval into the
     * gameInterval array
     * 
     * @param {number} param - The ID of the interval 
     */
     addIntervalToIntervalArray(param) {
          if (typeof world !== 'undefined' && world?.gameIntervals) {
            world.gameIntervals.push(param);
            console.log(world.gameIntervals);
        } else {
            // Wiederholt die Prüfung 100ms später
            setTimeout(() => this.addIntervalToIntervalArray(param), 100);
        }          
    }





}