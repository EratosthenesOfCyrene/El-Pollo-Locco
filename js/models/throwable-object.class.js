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
    bottleThrownStanding = false;  // Diese Variable prüft, ob die Flasche geworfen wurde, während der Character still stand.


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


    constructor(x, world) {
        super().loadImage('img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');

        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);

        this.world = world;
        this.speed = 0.40;
        this.height = 70;
        this.width = 65;
        this.x = -1111;  //-- sorgt dafür, dass die gesammelte Flasche -1111px links des Bildschirm angezeigt wird
        this.speedX = 15;
        this.throwEndbossInterval;
        this.checkCollisionInterval;
        this.collidedWithCharacter = false;
        // this.testinterval();

        setTimeout(() => {
            //  this.x = x;
            //  this.world = world;

            this.hasHit = false;
            //  this.visible = false;

            //  Sound gehört zur Flasche
            this.hitSound = new Audio(
                window.world.character.enemyHit_sound.src
            );
            // this.hitSound.volume = 0.5;
            this.endbossThrownBottleIsOnFloor = false; // Diese Variable prüft, ob eine vom Endboss geworfene Flasche auf dem Boden ist, damit bei einer Kollissionn mit einer solchen Flasche kein Schaden beim Character ausgelöst wird.
        }, 3000);
    }

    testinterval() {
        setInterval(() => {
            // console.log(window.world.bottleHitSound);
        }, 250);
    }

    /**
     * Inits and handles all the things that are responsible for throwing a bottle and hitting enemies whith it.
     * 
     * @method throw
     * @memberof ThrowableObject
     */
    throw() {
        this.world.bottleInAir = true;  // gibt an, dass sich gerade eine Flasche in der Luft befindet        
        this.x = this.world.character.x + 80;
        if (this.world.character.otherdirection == true) {   // Anpassen des x-Wertes der Flasche, wenn nach links geworfen wird
            this.x = this.world.character.x
        };
        this.y = this.world.character.y + 100;
        this.speedY = 33;
        this.applyGravity();
        this.testThrowDirection();
        this.playAnimationImgThrow();
        this.checkForCollissions();
        this.checkForYOrCollossion(this.world.character);
    }

    /**
     * Checks whether the character is looking to the right or the left side.
     * 
     * @method testThrowDirection
     * @memberof ThrowableObject
     */
    testThrowDirection() {
        if (this.world.character.otherdirection == true) {      // Diese Funktion prüft, ob der Character nach linkt oder nach rechts zeigt. Entsprechend wird die Funktion, die die Flasche nach links oder anch rechts wirft, ausgeführt.
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
        window.world.intervals.addIntervalToIntervalArray(this.playAnimationIntervalID);
    }

    /**
     * This function cecks for collissions of thrown bottles whith enemies. It then pushen the hit enemies into an array and 
     * calls afunction that iterates through this array.
     * 
     * @method checkForCollissions
     * @memberof ThrowableObject
     */
    checkForCollissions() {
        const enemiesToDelete = [];
        this.checkForCollissionIntervalID = setInterval(() => {  // Checking for collisions of thrown bottles whith enemies (Chickens)
            this.world.level.enemies.forEach((enemy, indexOfEnemy) => {
                // console.log("Bottle Y:", this.world.collectedThrowableObjects[0].y);
                //console.log("Chicken Y:", enemy.y, " height:", enemy.height);
                if (this.world.collectedThrowableObjects[0].isCollidingBottleEnemy(enemy, indexOfEnemy)) {   // oder:  this.level.collectedBottle.isColliding(enemy)...
                    enemiesToDelete.push(indexOfEnemy);
                    this.bottleCollides = true;
                }
            });
            this.iterateThroughEnemiesToDelete(enemiesToDelete);
            this.world.intervals.addIntervalToIntervalArray(this.checkForCollissionIntervalID);
        }, 20);
    }

    /**
     * This function iterates through the array which contains the enemies that are to be deleted.
     * For each enemy, the further cascade of testing and deleting is initialized.
     * 
     * @param {string} enemiesToDelete - The array of the enemies that are to be deleted
     * @method iterateThroughEnemiesToDelete
     * @memberof ThrowableObject
     */
    iterateThroughEnemiesToDelete(enemiesToDelete) {
        enemiesToDelete.sort((a, b) => b - a); // von hinten nach vorne löschen
        enemiesToDelete.forEach(indexOfEnemy => {
            this.testIfChickenOrEndbossIsHit(indexOfEnemy, this.world.level.enemies[indexOfEnemy]);
        });
    }

    /**
     * Checks, if the thrown bottle collides vertically whith an enemy or whith the floor
     * (this is the case if this.y > 360).
     * 
     * @method checkForYOrCollossion
     * @memberof ThrowableObject
     */
    checkForYOrCollossion(target) {
        this.checkForYOrCollissionIntervalID = setInterval(() => {
            //this.world.character.enemyHit_sound.pause();
            if (target && target.enemyHit_sound) {
                target.enemyHit_sound.pause();
            }
            if (this.y > 360 || this.bottleCollides == true) {
                this.resetBottleIntervals();
                this.bottleCollides = false;
                //  this.world.sounds.stopSound(this.world.character.enemyHit_sound);
                //  window.world.sounds.playSound(this.world.character.enemyHit_sound);
                this.hit();
                this.bottleThrownStanding = false;
            }
        }, 25);
        //  this.world.intervals.addIntervalToIntervalArray(this.checkForYOrCollissionIntervalID);
    }

    /**
    * Checks, if the thrown bottle collides vertically whith an enemy or whith the floor
    * (this is the case if this.y > 360).
    * 
    * @method checkForYOrCollossionEndBossBottle
    * @memberof ThrowableObject
    */
    checkForYOrCollossionEndBossBottle() {
        this.checkForYOrCollissionIntervalID = setInterval(() => {
            window.world.character.enemyHit_sound.pause();

            if (this.y > 360 || this.bottleCollides == true) {
                this.resetBottleIntervalsEndboss();
                this.bottleCollides = false;
                //    const sound = new Audio(window.world.character.enemyHit_sound.src);
                //    sound.play();
                clearInterval(this.throwEndbossInterval);
                clearInterval(this.playAnimationIntervalID);
                this.hit();
                this.endbossThrownBottleIsOnFloor = true;
                //   this.playEndbossSplashAnimation();
                // this.handleBottleHitSound();
                //window.world.sounds.stopSound(window.world.character.enemyHit_sound);
                //window.world.sounds.playSound(window.world.character.enemyHit_sound);
                //const sound = new Audio(window.world.character.enemyHit_sound.src);
                //sound.play();
                this.bottleThrownStanding = false;
            }
        }, 25);
        //  this.world.intervals.addIntervalToIntervalArray(this.checkForYOrCollissionIntervalID);
    }

    /**
     * Checks if the hitSound of the current Bottle has already been played. 
     * If so, the function returns; if not, the sound is played.
     * 
     * @returns  {void}
     * @method hit
     * @memberof ThrowableObject
     */
    hit() {
        if (this.hasHit) return;
        this.hasHit = true;
        //  const sound = new Audio(window.world.character.enemyHit_sound.src);
        // sound.play();
        this.hitSound.currentTime = 0;
        this.hitSound.play();

    }

    /*
    handleBottleHitSound() {
        if (!window.world.bottleHitSound) {
            window.world.sounds.stopSound(window.world.character.enemyHit_sound);
            window.world.sounds.playSound(window.world.character.enemyHit_sound);
        }
    } */

    resetBottleIntervalsEndboss() {
        clearInterval(this.checkForYOrCollissionIntervalID);
        clearInterval(this.throwBottleIntervalID);
        clearInterval(this.playAnimationIntervalID);
        clearInterval(this.checkForCollissionIntervalID);
        clearInterval(this.throwEndbossInterval);
        this.playEndbossSplashAnimation();
        // this.playSplashAnimationEndboss();
        // this.actualizeBottlesBar();  // aktualisiert die Bottles-Bar
    }

    /*
    playSplashAnimationEndboss() {
        this.playAnimation(this.IMAGES_SPLASH);
        this.deleteThrownBottleEndBoss();
        setTimeout(() => {   // das Timeout entspricht den 300ms bis in deleteThrownBottle() das timeout verstrichen ist und die Flasche gelöscht wird. Wenn nämlich bottleInAir zu früh auf false zurückgesetzt wird, kann zu schnell eine neue Flasche geworfen werden, während die alte noch im Spiel ist. Dann käme es zu Fehlern.
         //   window.world.bottleInAir = false;   // zurückgeben, dass KEINE Flasche (mehr) in der Luft ist
        }, 300);

        return true;
    }*/


    /**
    * Deletes the bottle that has been thrown. 
    * 
    * @method deleteThrownBottleEndBoss
    * @memberof ThrowableObject
    */
    deleteThrownBottleEndBoss() {
        setTimeout(() => {
            window.world.definedEndboss.bottles.splice(0, 1);
        }, 300);
    }

    /**
     * Handles the animation and game pysics if the bottle has been thrown to the left.
     * 
     * @method throwBottleLeft
     * @memberof ThrowableObject
     */
    throwBottleLeft() {
         this.throwBottleIntervalID = setInterval(() => {
            if (this.bottleThrownStanding == false && this.world.keyboard.LEFT && this.x < this.world.level.level_end_x && this.world.gamePaused == false) {  // diese Abfrage prüft, ob der Character gerade läuft, wenn eine Flasche geworfen wird. Wenn ja, wird die Geschwindigkeit des Characters zur x-Geschwindigkeit der Flasche hinuaddiert, da der character sons unter der Flasche durch rennt;
                this.x -= 10 + this.world.character.speed + 4; // character.speed = 10. Man könnte auch einfach this.x += 24;.

            } else {
                this.x -= 10;
                this.bottleThrownStanding = true;  // Diese Variable prüft, ob die Flasche geworfen wurde, während der Character still stand. Ohne diese Abfrage kann es passieren, dass wenn eine Flasche geworfen wird und der character erst danach bewegt wird, dass die Flasche sich vom Character und von dem Ort, an dem Sie den Boden berühren soll, entfernt und man sein Ziel verfehlt.
            }
        }, 25);
        this.world.intervals.addIntervalToIntervalArray(this.throwBottleIntervalID);
    }
        /*
        this.throwBottleIntervalID = setInterval(() => {
            this.x -= 10;
        }, 25);
        this.world.intervals.addIntervalToIntervalArray(this.throwBottleIntervalID);
    } */

    /**
     * Handles the animation and game pysics if the bottle has been thrown to the left.
     * The function checks whether:
     * the character is standing while throwing a bottle,
     * the character is moving to the right while throwing a bottle,
     * the x-coordinate of the level end has ben reached,
     * the game is NOT paused
     * and only if all of these conditions are met, the trowing of the bottle is executed.
     * 
     * @method throwBottleRight
     * @memberof ThrowableObject
     * 
     */
    throwBottleRight() {
        this.throwBottleIntervalID = setInterval(() => {
            if (this.bottleThrownStanding == false && this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.world.gamePaused == false) {  // diese Abfrage prüft, ob der Character gerade läuft, wenn eine Flasche geworfen wird. Wenn ja, wird die Geschwindigkeit des Characters zur x-Geschwindigkeit der Flasche hinuaddiert, da der character sons unter der Flasche durch rennt;
                this.x += 10 + this.world.character.speed + 4; // character.speed = 10. Man könnte auch einfach this.x += 24;.

            } else {
                this.x += 10;
                this.bottleThrownStanding = true;  // Diese Variable prüft, ob die Flasche geworfen wurde, während der Character still stand. Ohne diese Abfrage kann es passieren, dass wenn eine Flasche geworfen wird und der character erst danach bewegt wird, dass die Flasche sich vom Character und von dem Ort, an dem Sie den Boden berühren soll, entfernt und man sein Ziel verfehlt.
            }
        }, 25);
        this.world.intervals.addIntervalToIntervalArray(this.throwBottleIntervalID);
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

    /**
     * Handles the animation of the splash animation when a thrown bottle hits an object 
     * (enemy, main character or floor). The thrown bottle is the deleted from the bottles array.
     * 
     * @returns {boolean} Always returns true once the splash animation is triggered.
     * @method playSplashAnimation
     * @memberof ThrowableObject
     */
    playSplashAnimation() {
        this.playAnimation(this.IMAGES_SPLASH);
        this.deleteThrownBottle();
        setTimeout(() => {   // das Timeout entspricht den 300ms bis in deleteThrownBottle() das timeout verstrichen ist und die Flasche gelöscht wird. Wenn nämlich bottleInAir zu früh auf false zurückgesetzt wird, kann zu schnell eine neue Flasche geworfen werden, während die alte noch im Spiel ist. Dann käme es zu Fehlern.
            this.world.bottleInAir = false;   // zurückgeben, dass KEINE Flasche (mehr) in der Luft ist
        }, 300);

        return true;
    }

    /**
     * Deletes the bottle that has been thrown. 
     * 
     * @method deleteThrownBottle
     * @memberof ThrowableObject
     */
    deleteThrownBottle() {
        setTimeout(() => {
            this.world.collectedThrowableObjects.splice(0, 1);
        }, 300);
    }

    /**
     * Checks whether an normal chicken or the endboss was hit.
     * 
     * @param {Array<String>} indexOfEnemy - Index of the testetd enemy.
     * @method testIfChickenOrEndbossIsHit
     * @memberof ThrowableObject
     */
    testIfChickenOrEndbossIsHit(indexOfEnemy, enemy) {
        let indexOfEndboss = this.world.level.enemies.length - 1;
        if (indexOfEnemy != indexOfEndboss) {   // prüft anhand des Index, ob es sich bei dem getroffenen Objekt um den Endboss handelt
            this.playDeadChickenAnimation(enemy);

        } else if (indexOfEnemy == indexOfEndboss) {
            this.world.level.enemies[indexOfEndboss].endbossHit = true;
            this.world.level.enemies[indexOfEndboss].playHurtAnimation = false;
            this.world.level.enemies[indexOfEndboss].endbossLife -= 20;
            this.deleteEndboss(indexOfEndboss);
        }
    }

    /**
     * Deletes the endboss once it has been defeated and the game has been won.
     * 
     * @param {number} indexOfEndboss - The index of the endboss in the enemies array.
     * @method deleteEndboss
     * @memberof ThrowableObject
     */
    deleteEndboss(indexOfEndboss) {
        if (this.world.level.enemies[indexOfEndboss].endbossLife < 20) {
            setTimeout(() => {
                this.world.level.enemies.splice(indexOfEndboss, 1);
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
    playDeadChickenAnimation(enemy) {
        let indexOfEnemy = this.world.level.enemies.indexOf(enemy);
        const deadChickenIntervalID = setInterval(() => {
            if (enemy.chickenBig == true) {   // diese Abfrage prüft, ob es sich um ein großes oder ein kleines Ckicken handelt, damit im Folgenden das richtige Bild des toten Chicken geladen werden kann
                enemy.loadImage(enemy.IMAGE_DEAD);
            } else {
                enemy.loadImage(enemy.IMAGE_DEAD_SMALL);
            }
            enemy.speed = 0;  //-- Stops the movement of the hit enemy
            //  window.world.sounds.playSound(this.world.character.enemyDeleted_sound);
            this.hit();
        }, 200);

        setTimeout(() => {
            clearInterval(deadChickenIntervalID);
            this.deleteHitEnemy(indexOfEnemy);
        }, 500);
        this.world.intervals.addIntervalToIntervalArray(deadChickenIntervalID);
    }

    /**
     * Deletes the killed enemy
     * 
     * @param {number} indexOfEnemy - The index of the chicken that is to be deleted in the enemies array.
     * @method deleteHitEnemy
     * @memberof ThrowableObject
     */
    deleteHitEnemy(indexOfEnemy) {  // deletes the hit enemy
        this.world.level.enemies.splice(indexOfEnemy, 1);
        this.world.character.regainLife();  // erhöht das Leben des Characters, wenn ein enemy getötet wurde
        this.playRegainHealthSound();
        this.world.killedEnemies++;   // erhöht den Counter der getöteten Enemies, damit die Zahl der getöteten Enemies im Camnvas aktualisiert werden kann
    }

    /**
     * Updates the bar which shows how many bottles have been collected by the character.
     * 
     * @method actualizeBottlesBar
     * @memberof ThrowableObject
     */
    actualizeBottlesBar() {
        this.world.statusBarBottles.collectedBottles--;  // verringert den Wert der gesammelten Flaschen für die Bottle-Status-Bar
        this.world.statusBarBottles.setBottleNumber(this.world.statusBarBottles.collectedBottles);  // aktualisiert die Anzeige der Bottle-Status-Bar
    }

    /**
     * Handles the playing of the sound that is played whn the character regains health.
     * 
     * @method playRegainHealthSound
     * @memberof ThrowableObject
     */
    playRegainHealthSound() {
        if (this.world.character.energy <= 99) {
            window.world.sounds.playSound(this.world.character.healthRecharge_sound);
        }
    }

    /**
     * This function initiates the trowing of a bottle by the endboss.
     * 
     * @method throwEndboss
     * @memberof ThrowableObject
     * 
     */
    throwEndboss() {
        this.collidedWithCharacter = false;
        //this.x -= 10;
        this.speedY = 30;
        this.applyGravity();
        this.endbossThrows();
        this.playAnimationImgThrow();
        this.checkForCollissionEndbossThrownBottleWithCharacter();
        // this.checkForYOrCollossion(window.world.definedEndboss);
        this.checkForYOrCollossionEndBossBottle();
    }

    /**
     * Moves the bottle that was thrown by the endboss to the left.
     * 
     * @method endbossThrows
     * @memberof ThrowableObject
     */
    endbossThrows() {
        const index = this.endboss.bottles.indexOf(this);
        console.log('index of thrown bottle:', index);
        this.throwEndbossInterval = setInterval(() => {
            this.x -= 15 /*(this.speedX + 75)*/;
        }, 25);
    }

    /**
     * This function checks for collissions of the bottle thrown by the endboss with the character.
     * If this is true, it:
     * ends the throwEndbossInterval,
     * hadles the splashanimation,
     * and stops the movement of the bottle.
     * 
     * @method checkForCollissionEndbossThrownBottleWithCharacter
     * @memberof ThrowableObject
     * 
     */
    checkForCollissionEndbossThrownBottleWithCharacter() {
        this.checkCollisionInterval = setInterval(() => {
            if (!this.collidedWithCharacter && this.isCollidingBottleCharacter(window.world.character) && this.endbossThrownBottleIsOnFloor === false) {   // oder:  this.level.collectedBottle.isColliding(enemy)...  // enemy, indexOfEnemy
                //window.world.sounds.stopSound(window.world.character.enemyHit_sound);
                //window.world.sounds.playSound(window.world.character.enemyHit_sound);
                //    const sound = new Audio(window.world.character.enemyHit_sound.src);
                //   sound.play();
                clearInterval(this.throwEndbossInterval);
                window.world.character.hitByBottle();
                window.world.statusBar.setPercentage(window.world.character.energy);  // weist dem Prozentwert 'percentage' den aktuellen Wert zu in der Klasse Status-bar
                this.collidedWithCharacter = true;
                clearInterval(this.playAnimationIntervalID);
                this.speedX = 0;
                this.speedY = 0;
                this.playEndbossSplashAnimation();
                this.hit();
                window.world.bottleHitSound = true;
            }
        }, 50);
    }

    /**
     * Plays the splash animation an sound of a botte that has been thrown by the endboss.
     * 
     * @method playEndbossSplashAnimation
     * @memberof ThrowableObject
     */
    playEndbossSplashAnimation() {
        //window.world.sounds.stopSound(window.world.character.enemyHit_sound);
        //window.world.sounds.playSound(window.world.character.enemyHit_sound);
        this.playAnimation(this.IMAGES_SPLASH);
        this.deleteEndbossThrownBottle();
    }

    /**
     * Delets the bottle after 300ms which was thrown by the endboss.
     * 
     * @method deleteEndbossThrownBottle
     * @memberof ThrowableObject
     */
    deleteEndbossThrownBottle() {
        setTimeout(() => {
            const index = this.endboss.bottles.indexOf(this);
            console.log('index of deleted bottle:', index);

            if (index > -1) {
                this.endboss.bottles.splice(index, 1);
            }
        }, 300);
    }








}










