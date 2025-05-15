

class MovableObject extends DrawableObject {
    speed = 0.15;
    otherdirection = false;
    speedY = 0;
    acceleration = 3;
    keyboardUp = false;
    energy = 100;
    lastHit = 0;
    characterIsAlive = true;
    jumpingOnEnemy = false;

    applyGravityIntervalID;

    // die Illusion von Schwerkraft erzeugen
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {  // diese if-Abfrage prüft, ob der y-Wert unter 160 ODER der speed über null ist. Wenn dies nicht der Fall ist, wird der darunter stehende Block Code nicht ausgeführt, und der Fall der Figur hört be 160 pixeln von oben gerrechnet auf. Bei 160 pixeln von oben befindet sich der Boden.
                this.y -= this.speedY;    // vom y-Wert des MovableObjects wird der Wert von SpeedY abgezogen
                this.speedY -= this.acceleration;  // hier wird die acceleration von speedY abgezogen
            } else if (this.speedY <= -32) {  // setzt den speedY wieder auf null zurück, wenn er kleiner als -33 ist, also wenn die Figur auf dem Boden angekommmen ist. Dies braucht man, um in der Funktion 'isJumpingOnEnemy()' zu prüfen, ob der character von oben auf ein Huhn hüpft.
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

        //-- Diese Funktion sorgt dafür, dass speedY des Characters nach dem Start auf null gesetzt  wird, da sonst nicht erkannt würde, ob er mit einem Huhn kollidiert oder auf dasselbe springt
    speedYtoZero() {
        setInterval(() => {
            if (this.y >= 168) {
                this.speedY = 0;
            }
        }, 200);
        
    }

    isAboveGround() {
        if (this instanceof ThrowableObject && this.y < 360) {  // heißt: wenn es eine Instance aus ThrowableObleObject ist. Der Ausdruck "this.y <360" bedeutet, dass der y-Wert des Throwable-Objects unter 360 sein muss (Dies macht man, damit Flaschen aud dem Boden aufkommen und nicht unbegrnzt weiterfallen). Nur dann wird "true" returned und die Funktion ausgeführt; ansonsten wird der darunter liegende Code (" return this.y < 160;") ausgeführt. Dies wird gemacht, damit "ThrowableObjects" immer zu Boden fallen und nicht bei y =159 stehen bleiben
            return true;
        } else {
            return this.y < 160;  // prüft, ob das betreffende Objekt (z. B. der Character) sich gerade in der Luft befindet oder nicht
        }
    }


    isColliding(movingObject) {
        return (this.x + 30) + (this.width - 60) > movingObject.x + 10 &&
            this.y + this.height > movingObject.y &&
            this.x + 30 < movingObject.x + 10 + movingObject.width - 10 &&
            this.y +50 < movingObject.y -50 + movingObject.height;
    }

    isCollidingBottleEnemy(movingObject) {         // prüft, ob eine Flasche ein Huhn trifft. Die "-8" bei movingObject.x sorgt dafür, dass das Huhn auch als getroffen erkannt wird, auch wenn die Flasche leicht links davon aufkommt. Dies macht das Gameplay natürlicher.
        return this.x + this.width > (movingObject.x - 8) &&
            this.y + this.height > movingObject.y &&
            this.x  < movingObject.x + movingObject.width &&
            this.y < movingObject.y + movingObject.height;
    }

    

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

    hit() {
            this.energy -= 0.25;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
        }
    }

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
