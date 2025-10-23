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

    constructor(x, world) {
        super().loadImage('img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');

        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);

        this.world = world;
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
        this.world.bottleInAir = true;  // gibt an, dass sich gerade eine Flasche in der Luft befindet
        //console.log('bottle in air  - throw():', this.world.bottleInAir);
        
        this.x = this.world.character.x + 100;
        if (this.world.character.otherdirection == true) {   // Anpassen des x-Wertes der Flasche, wenn nach links geworfen wird
            this.x = this.world.character.x
        };
        this.y = this.world.character.y;
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
            this.world.level.enemies.forEach((enemy, indexOfEnemy) => {
                if (this.world.collectedThrowableObjects[0].isCollidingBottleEnemy(enemy, indexOfEnemy)) {   // oder:  this.level.collectedBottle.isColliding(enemy)...
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
            this.world.character.enemyHit_sound.pause();
            if (this.y > 360 || this.bottleCollides == true) {
                this.resetBottleIntervals();
                this.bottleCollides = false;
                this.world.stopSound(this.world.character.enemyHit_sound);
                //this.world.character.enemyHit_sound.pause(); // diese und d. nächste Zeile stoppen den sound, der gerade abgespielt wird und setzen ihn auf null zurück, da sonst wenn man rasch nacheinander auf zwei Hühner hüpft, das Ende des sounds abgespielt wird und er nicht wie beabsichtigt von vorne beginnt.
                //this.world.character.enemyHit_sound.currentTime = 0;
                this.world.character.enemyHit_sound.play();
                this.bottleThrownStanding = false;
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
            if (this.bottleThrownStanding == false && this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.world.gamePaused == false) {  // diese Abfrage prüft, ob der Character gerade läuft, wenn eine Flasche geworfen wird. Wenn ja, wird die Geschwindigkeit des Characters zur x-Geschwindigkeit der Flasche hinuaddiert, da der character sons unter der Flasche durch rennt;
                this.x += 10 + this.world.character.speed + 4; // character.speed = 10. Man könnte auch einfach this.x += 24;.
            } else {
            this.x += 10;
            this.bottleThrownStanding = true;  // Diese Variable prüft, ob die Flasche geworfen wurde, während der Character still stand. Ohne diese Abfrage kann es passieren, dass wenn eine Flasche geworfen wird und der character erst danach bewegt wird, dass die Flasche sich vom Character und von dem Ort, an dem Sie den Boden berühren soll, entfernt und man sein Ziel verfehlt.
            }
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
        setTimeout(() => {   // das Timeout entspricht den 300ms bis in deleteThrownBottle() das timeout verstrichen ist und die Flasche gelöscht wird. Wenn nämlich bottleInAir zu früh auf false zurückgesetzt wird, kann zu schnell eine neue Flasche geworfen werden, während die alte noch im Spiel ist. Dann käme es zu Fehlern.
             this.world.bottleInAir = false;   // zurückgeben, dass KEINE Flasche (mehr) in der Luft ist
        }, 300);
       
        return true;
    }

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
    testIfChickenOrEndbossIsHit(indexOfEnemy) {
        let indexOfEndboss = this.world.level.enemies.length - 1;
        if (indexOfEnemy != indexOfEndboss) {   // prüft anhand des Index, ob es sich bei dem getroffenen Objekt um den Endboss handelt
            this.playDeadChickenAnimation(indexOfEnemy);
        } else if (indexOfEnemy == indexOfEndboss) {
            this.world.level.enemies[indexOfEndboss].endbossHit = true;
            this.world.level.enemies[indexOfEndboss].playHurtAnimation = false;
            this.world.level.enemies[indexOfEndboss].endbossLife -= 20;
            this.deleteEndboss(indexOfEndboss);
        }
    }

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
    playDeadChickenAnimation(indexOfEnemy) {
        let enemy = this.world.level.enemies[indexOfEnemy];
        const deadChickenIntervalID = setInterval(() => {
            if (enemy.chickenBig == true) {   // diese Abfrage prüft, ob es sich um ein großes oder ein kleines Ckicken handelt, damit im Folgenden das richtige Bild des toten Chicken geladen werden kann
                enemy.loadImage(enemy.IMAGE_DEAD);
            } else {
                enemy.loadImage(enemy.IMAGE_DEAD_SMALL);
            }
            enemy.speed = 0;  //-- Stops the movement of the hit enemy
            this.world.character.enemyDeleted_sound.play();
        }, 200);

        setTimeout(() => {
            clearInterval(deadChickenIntervalID);
            this.deleteHitEnemy(indexOfEnemy);
        }, 1500);
        this.addIntervalToIntervalArray(deadChickenIntervalID);
    }

    deleteHitEnemy(indexOfEnemy) {  // deletes the hit enemy
        this.world.level.enemies.splice(indexOfEnemy, 1);
        this.world.character.regainLife();  // erhöht das Leben des Characters, wenn ein enemy getötet wurde
        this.playRegainHealthSound();
        this.world.killedEnemies++;   // erhöht den Counter der getöteten Enemies, damit die Zahl der getöteten Enemies im Camnvas aktualisiert werden kann
    }

    actualizeBottlesBar() {
        this.world.statusBarBottles.collectedBottles--;  // verringert den Wert der gesammelten Flaschen für die Bottle-Status-Bar
        this.world.statusBarBottles.setBottleNumber(this.world.statusBarBottles.collectedBottles);  // aktualisiert die Anzeige der Bottle-Status-Bar
    }

    playRegainHealthSound() {
        if (this.world.character.energy < 99) {
            this.world.character.healthRecharge_sound.play();
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
            this.world.gameIntervals.push(param);
            console.log(world.gameIntervals);
        } else {
            // Wiederholt die Prüfung 100ms später
            setTimeout(() => this.addIntervalToIntervalArray(param), 100);
        }
    }

    throwEndboss() {
        //this.world.bottleInAir = true;  // gibt an, dass sich gerade eine Flasche in der Luft befindet
        //this.x = this.world.endboss.x + 100;
        /*if (this.world.character.otherdirection == true) {   // Anpassen des x-Wertes der Flasche, wenn nach links geworfen wird
            this.x = this.world.character.x
        };*/
        //this.y = this.world.endboss.y;
        //this.speedY = -30;
        //this.applyGravity();
        //this.testThrowDirection();
        this.collidedWithCharacter = false;
        console.log(this, this.bottles, this.bottle);
        this.x -= 10;
        console.log('bottle-X:', this.x, 'Endboss-X:', this.endboss.x);
        this.playAnimationImgThrow();
        this.endbossThrows();
        this.checkForCollissionEndbossThrownBottleWithCharacter();
        //this.checkForCollissions();
        //this.checkForYOrCollossion();
    }
    speedX = 15;
throwEndbossInterval;
    endbossThrows() {
        this.throwEndbossInterval = setInterval(() => {
            this.x -= this.speedX;
        }, 25);
    }
checkCollisionInterval;
    collidedWithCharacter = false;
    checkForCollissionEndbossThrownBottleWithCharacter() {
        this.checkCollisionInterval = setInterval(() => {


            if (!this.collidedWithCharacter && this.isCollidingBottleCharacter(window.world.character)) {   // oder:  this.level.collectedBottle.isColliding(enemy)...  // enemy, indexOfEnemy
                clearInterval(this.throwEndbossInterval);
                console.log('Collossion!!!!!! Autsch, Leben:', window.world.character.energy);
                window.world.character.hitByBottle();
                window.world.statusBar.setPercentage(window.world.character.energy);  // weist dem Prozentwert 'percentage' den aktuellen Wert zu in der Klasse Status-bar
                console.log('Leben:', window.world.character.energy);
                this.collidedWithCharacter = true;
                clearInterval(this.playAnimationIntervalID);

                //clearInterval(this.throwEndbossInterval);             // Stoppe Bewegung
                //clearInterval(this.checkCollisionInterval);    // Stoppe Kollisionscheck
                this.speedX = 0;
                this.speedY = 0;
                this.playEdbossSplashAnimation();
            }
        }, 50);

    }

    playEdbossSplashAnimation() {
        this.playAnimation(this.IMAGES_SPLASH);
        this.deleteEndbossThrownBottle();
    }

    deleteEndbossThrownBottle() {
         setTimeout(() => {
           const index = this.endboss.bottles.indexOf(this);
        if (index > -1) {
            this.endboss.bottles.splice(index, 1);
        }
        }, 300);
    }








}










