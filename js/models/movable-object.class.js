
/**
 * @typedef {object} MovableObject
 * @class MovableObject
 * @extends DrawableObject
 * @classdesc Represents any object in the game that can move.
 *
 * @property {number} speed - The horizontal movement speed of the object.
 * @property {boolean} otherdirection - Whether the object is facing the opposite direction.
 * @property {number} speedY - The vertical speed (used for jumping/falling).
 * @property {number} acceleration - The rate of gravity affecting vertical movement.
 * @property {number} energy - The energy or health level of the object.
 * @property {number} lastHit - Timestamp of the last time the object was hit.
 * @property {boolean} characterIsAlive - Indicates if the character is still alive.
 * @property {boolean} jumpingOnEnemy - Indicates whether the character is currently jumping on an enemy.
 * @property {number|undefined} applyGravityIntervalID - ID of the interval that applies gravity (later used to clear it).
 */

class MovableObject extends DrawableObject {
    speed = 0.15;
    otherdirection = false;
    speedY = 0;
    acceleration = 3;
    //keyboardUp = false;
    energy = 100;
    lastHit = 0;
    characterIsAlive = true;
    jumpingOnEnemy = false;

    applyGravityIntervalID;

    /**
     * Creates the illusion of creativity
     * 
     * @method applyGravity
     * @memberof MovableObject
     */
    applyGravity() {  // die Illusion von Schwerkraft erzeugen
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {  // diese if-Abfrage prüft, ob der y-Wert unter 160 ODER der speed über null ist. Wenn dies nicht der Fall ist, wird der darunter stehende Block Code nicht ausgeführt, und der Fall der Figur hört be 160 pixeln von oben gerrechnet auf. Bei 160 pixeln von oben befindet sich der Boden.
                this.y -= this.speedY;    // vom y-Wert des MovableObjects wird der Wert von SpeedY abgezogen
                this.speedY -= this.acceleration;  // hier wird die acceleration von speedY abgezogen
            } else if (this.speedY <= -32) {  // setzt den speedY wieder auf null zurück, wenn er kleiner als -33 ist, also wenn die Figur auf dem Boden angekommmen ist. Dies braucht man, um in der Funktion 'isJumpingOnEnemy()' zu prüfen, ob der character von oben auf ein Huhn hüpft.
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    /**
     * This function ensures that the character's speedY is set to zero after the start, 
     * as otherwise it would not be recognised whether the character collides with a chicken or jumps onto one.
     * 
     * @method speedYtoZero
     * @memberof MovableObject
     */
    speedYtoZero() {    //-- Diese Funktion sorgt dafür, dass speedY des Characters nach dem Start auf null gesetzt  wird, da sonst nicht erkannt würde, ob er mit einem Huhn kollidiert oder auf dasselbe springt
        setInterval(() => {
            if (this.y >= 168) {
                this.speedY = 0;
            }
        }, 200);
    }

    /**
     * Checks if the Character is above the ground ("in the air").
     * @returns {boolean} - True if the object is above ground, false if it is on or below the ground.
     * @method isAboveGround
     * @memberof MovableObject
     */
    isAboveGround() {
        if (this instanceof ThrowableObject && this.y < 360) {  // heißt: wenn es eine Instance aus ThrowableObleObject ist. Der Ausdruck "this.y <360" bedeutet, dass der y-Wert des Throwable-Objects unter 360 sein muss (Dies macht man, damit Flaschen aud dem Boden aufkommen und nicht unbegrnzt weiterfallen). Nur dann wird "true" returned und die Funktion ausgeführt; ansonsten wird der darunter liegende Code (" return this.y < 160;") ausgeführt. Dies wird gemacht, damit "ThrowableObjects" immer zu Boden fallen und nicht bei y =159 stehen bleiben
            return true;
        } else {
            return this.y < 160;  // prüft, ob das betreffende Objekt (z. B. der Character) sich gerade in der Luft befindet oder nicht
        }
    }

    /**
     * Checks if a movable object is colliding whith another movable object.
     * 
     * The method uses bounding box collision detection with adjusted hitboxes
     * (e.g., insets/margins) to allow for more accurate collision handling.
     * It compares positions and dimensions of the current object (`this`) with
     * the passed `movingObject`.
     *
     * @param {Object} movingObject - The other object to check collision with.
     * @param {number} movingObject.x - The x-position of the other object.
     * @param {number} movingObject.y - The y-position of the other object.
     * @param {number} movingObject.width - The width of the other object.
     * @param {number} movingObject.height - The height of the other object.
     * @returns {boolean} True if the two objects are colliding; otherwise, false.
     * @method isColliding
     * @memberof MovableObject
     */
    isColliding(movingObject) {
        return (this.x + 30) + (this.width - 60) > movingObject.x + 10 &&
            this.y + this.height > movingObject.y &&
            this.x + 30 < movingObject.x + 10 + movingObject.width - 10 &&
            this.y +50 < movingObject.y -50 + movingObject.height;
    }

    /**
     * Chscks whether a thrown bottle hits an enemy.
     * 
     * @param {object} movingObject 
     * @returns {boolean}  True if a thrown bottle hits an enemy; otherwise, false.
     * @method isCollidingBottleEnemy
     * @memberof MovableObject
     */
    isCollidingBottleEnemy(movingObject) {         // prüft, ob eine Flasche ein Huhn trifft. Die "-8" bei movingObject.x sorgt dafür, dass das Huhn auch als getroffen erkannt wird, auch wenn die Flasche leicht links davon aufkommt. Dies macht das Gameplay natürlicher.
        return this.x + this.width > (movingObject.x - 8) &&
            this.y + this.height > movingObject.y &&
            this.x  < movingObject.x + movingObject.width &&
            this.y < movingObject.y + movingObject.height;
    }

    /**
     * Chicks if the Character is jumping onto an enemy.
     * 
     * @param {object} movingObject 
     * @returns {boolean}  True if the Character is jumping onto anenemy; otherwise, false.
     * @method isJumpingOnEnemy
     * @memberof MovableObject
     */
    isJumpingOnEnemy(movingObject) {
        world.indexOfCurrentEnemy = movingObject;   // der Wert von 'movingObject' muss der Variablen 'indexOfCurrentEnemy' zugeordnet werden, damit wenn in der Klasse Character() abgefragt wird, ob es sich um eine Kollision handelt oder ob der Character von oben auf den Enemay springt, Werte für einen Enemy vorhanden sind, da es sonst zu einem Fehler kommt, wenn die Funktion ' isJumpingOnEnemy()' ausgeführt wird. 
        if (this.isColliding(movingObject) &&
            this.speedY < 0) {
            this.jumpingOnEnemy = true;
            return true;
        }
        else {
            setTimeout(() => {
                this.jumpingOnEnemy = false;
            }, 750);
        }
    }

    /**
     * Subtracts energy from the character's enery if the character collides whith an enemy.
     * 
     * @method hit
     * @memberof MovableObject
     */
    hit() {
            this.energy -= 0.25;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is currently in a "hurt" state. 
     * It checks how much time has passed since the object was last hit.
     * If it is less than 2 seconds, the object is considered to be hurt
     * and the function returns true.
     * 
     * @returns {boolean} True if the object was hit within the last 2 seconds; otherwise, false.
     * @method isHurt
     * @memberof MovableObject
     */
    isHurt() {
            let timepassed = new Date().getTime() - this.lastHit;
            timepassed = timepassed / 1000;
            return timepassed < 2;
    }

    isDead() {
        this.characterIsAlive = false;
        return this.energy == 0;
    }

    regainLife() {
        if (world.character.energy > 0) {
            world.character.energy += 25;
            if (world.character.energy > 100) {
                world.character.energy = 100
            }
            world.statusBar.setPercentage(world.character.energy)
        }
    }

    /**
     * This function plays an animation by walking through an array of image paths
     * 
     * @param {array<string>} images - The array containing the images which are going to be displayed
     * @method playAnimation
     * @memberof MovableObject
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;  // = let i = 0 % 6;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}
