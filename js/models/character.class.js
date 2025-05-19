
/**
 * @typedef {Object} Character
 * @property {number} x - X position of the character on the canvas.
 * @property {number} y - Y position of the character on the canvas.
 * @property {number} width - Width of the character to be drawn.
 * @property {number} height - Height of the character to be drawn.
 * @property {number} speed - Speed by which the character moves (to the left).
 * @property {function(CanvasRenderingContext2D):void} draw - Draws the cloud to the canvas context.
 * @property {boolean} idle -  Indicates whether the character has been idle for a short period. Defaults to false.
 * @property {boolean} longIdle - Indicates whether the character has been idle for a long period. Defaults to false.
 * @property {number} idleTimeOutID - ID of the timeout that tracks regular idle state.
 * @property {number} longIdleTimeOutID - ID of the timeout that triggers after a long idle period.
 * @property {number} idleIntervalID - ID of the interval that checks idle activity.
 * @property {number} counterInveralID - ID of the interval that counts for how many seconds the character has been idle.
 * @property {number} counter - Counts the seconds for how long the character is idle.
 * @property {boolean} idleAnimation - Indicates whether idle-animation is playing at the moment. Defaults to false.
 * @property {boolean} imagesDeadPlayed - Indicates whether images-dead-animation is playing at the moment. Defaults to false.
 * @property {HTMLAudioElement} walking_sound - Sound played while the character is walking.
 * @property {HTMLAudioElement} spinJump_sound - Sound played during a jump.
 * @property {HTMLAudioElement} hurt_sound - Sound played when the character gets hurt.
 * @property {HTMLAudioElement} healthRecharge_sound - Sound played when health of the character is recharged.
 * @property {HTMLAudioElement} bottleCollected_sound - Sound played when a bottle is collected.
 * @property {HTMLAudioElement} coinCollected_sound - Sound played when a coin is collected.
 * @property {HTMLAudioElement} enemyHit_sound - Sound played when an enemy is hit.
 * @property {HTMLAudioElement} enemyDeleted_sound - Sound played when an enemy is defeated or deleted.
 * 
 * @class Character
 */


class Character extends MovableObject {
    height = 280;
    width = 160;
    y = 60;
    speed = 10;
    longIdle = false;
    idle = false;
    idleTimeOutID;
    longIdleTimeOutID;
    idleIntervalID;
    counterInveralID;
    counter = 0;
    idleAnimation = false;
    imagesDeadPlayed = false;

    IMAGES_WALKING = [
        './img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        './img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        './img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        './img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        './img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        './img_pollo_locco/img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        './img_pollo_locco/img/2_character_pepe/3_jump/J-31.png',
        './img_pollo_locco/img/2_character_pepe/3_jump/J-32.png',
        './img_pollo_locco/img/2_character_pepe/3_jump/J-33.png',
        './img_pollo_locco/img/2_character_pepe/3_jump/J-34.png',
        './img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
        './img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
        './img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
        './img_pollo_locco/img/2_character_pepe/3_jump/J-38.png',
        './img_pollo_locco/img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        'img_pollo_locco/img/2_character_pepe/5_dead/D-51.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_IDLE = [
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-2.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-3.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-4.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-5.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-6.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-7.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-8.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-9.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONGIDLE = [
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_SKELETON = [
        'img_pollo_locco/img/2_character_pepe/6_skeleton/pepe_skeleton.png',
    ];

    world;
    walking_sound = new Audio('audio/walking_desert.mp3');
    spinJump_sound = new Audio('audio/spinJump_sound_cut2.mp3');
    hurt_sound = new Audio('audio/hurt_sound.mp3');
    healthRecharge_sound = new Audio('audio/healthRecharge_sound.wav');
    bottleCollected_sound = new Audio('audio/bottleCollected_sound.mp3');
    coinCollected_sound = new Audio('audio/mixkit-winning-a-coin-video-game-2069.wav');
    enemyHit_sound = new Audio('audio/chickenKilled_sound.mp3');
    enemyDeleted_sound = new Audio('audio/mixkit-game-notification-wave-alarm-987.wav');


    constructor() {
        super().loadImage('../img_pollo_locco/img/2_character_pepe/2_walk/W-21.png');

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.loadImages(this.IMAGES_SKELETON);
        this.animate();
        this.applyGravity();
        this.speedYtoZero();
    }

    /**
     * This function calls various intervalls which control the character:
     * 
     * moving the character along the x-axis
     *  -> right & left
     * jump
     * idle state
     * 
     * as well as the intervall that controls the corresponding animation.
     * 
     * @method animate@memberof Character
     * 
     */
    animate() {
        setInterval(() => {   // Dieses Interval ruft die Bewegung ENTLANG der X-Achse 60 mal pro Sekunde auf
            //--Rechts
            if (this.world.keyboard.RIGHT && this.x < level.level_end_x && this.world.gamePaused == false) {
                this.moveRight();
                this.otherdirection = false;  // wenn die rechte-Pfeil-Taste gedrückt wird, wird die variable auf false gesetzt und das Spiegeln des Characters beendet
                if (!this.isAboveGround()) {   // prüft, ob der Character sich gerade am Boden befindet; denn nur dann soll das walk-Geräusch abgespielt werden
                    this.walking_sound.play();
                    this.spinJump_sound.pause();
                } else if (this.isAboveGround()) {
                    this.spinJump_sound.play();
                    this.walking_sound.pause();
                }
            }
            //-- Links
            if (this.world.keyboard.LEFT && this.x > 100 && this.world.gamePaused == false) {
                this.moveLeft();
                this.otherdirection = true;  // wenn die linke-Pfeil-Taste gedrückt wird, wird die variable auf true gesetzt und der Character gespiegelt
                if (!this.isAboveGround()) {   // prüft, ob der Character sich gerade am Boden befindet; denn nur dann soll das walk-Geräusch abgespielt werden
                    this.walking_sound.play();
                    this.spinJump_sound.pause();
                } else if (this.isAboveGround()) {
                    this.spinJump_sound.play();
                    this.walking_sound.pause();
                }
            }
            //-- Springen
            if (this.world.keyboard.SPACE && !this.isAboveGround() /*&& this.world.gamePaused == false*/) {  // das "!" drückt aus, diese Bedingung NICHT stimmt. Also dass die Pfeil-nach-oben-Taste gedrücckt wurde und (&&) dass "this.isAboveGround()" nicht ("!") stimmt. 
                this.speedY = 30;
                this.spinJump_sound.play();
            }
            //-- Idle/Schlafen beenden
            if (this.world.keyboard.SPACE || this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.letterD) {   // wenn irgendweine Taste gedrückt wird, wird der Idle-TimeOut zurückgesetzt und die üverprüfung, ob nichts gedrückt wird, beginnt von neuem
                this.resetIdleTimeout();
            }
            this.world.camera_x = -this.x + 100;  // immer wenn durch einen Tastendruck der Character entlang der X-Achse bewegt wurde, wird dies Funktion aufgerufen. Sie gleicht den Kameraausschnitt auf der X-Achse in entgegengesetzter Richtung an. Und zwar um den Wert, um den die X-Achse in den Zeilen zuvot verändert wurde! Damit der Character nicht aus dem Canvas herausläuft
        }, 1000 / 60);



        setInterval(() => {  // Dieses Intervall ruft die Animation/Abfolge der Bilder, die den Eindruck einer Bewegung des Character entstehen lässt, 20 mal pro sekunde auf
            //this.hurt_sound.pause();
            if (this.world.gamePaused == false) {
                if (this.isDead()) {
                    if (this.imagesDeadPlayed === false) {
                        this.playAnimation(this.IMAGES_DEAD);
                    }
                    setTimeout(() => {
                            this.playAnimation(this.IMAGES_SKELETON);
                            this.imagesDeadPlayed = true;
                    }, 7100);
                } else if (this.isHurt() /*&& this.jumpingOnEnemy == false *//*&& !this.isJumpingOnEnemy(world.indexOfCurrentEnemy)*/) {
                    this.playAnimation(this.IMAGES_HURT);
                    this.hurt_sound.play();
                }
                // Jump-Animation
                else if (this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_JUMPING);
                }

                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {  // "||" ist ein logisches "oder" und hei?t, dass der Code in den geschweiften Klammern entweder ausgeführt wird, wenn die rechts- oder die links-Taste gedrückt wurde

                    // Walk-Animation
                    this.playAnimation(this.IMAGES_WALKING);
                }

            }
        }, 50);

        this.idleIntervalID = setInterval(() => {
            if (this.idleAnimation == false && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE && !this.world.keyboard.letterD) {    // prüft, ob keine des Characters geschieht (bwz. ob KEINE Taste gedrückt wurde). Die Bedingung "this.idleAnimation == false" sorgt dafür, dass die Funktion "this.playIdleAnimation();" nur einmal und nicht mehrfach aufgerufen wird, da sonst die erhöhung des "counter" exponentiell ansteigt/zunimmt!
                this.idle = true;
                this.playIdleAnimation();  // spielt die Animation ab, wenn der Character nicht bewegt wird
                this.walking_sound.pause();
                this.hurt_sound.pause();
            }
        }, 1500);
    }

    /**
     * Handles the idle-animation if the character is idle
     * 
     * @method playIdleAnimation
     * @memberof Character
     */
    playIdleAnimation() {   // spielt die Animation ab, wenn der Character nnicht bewegt wird
        this.idleAnimation = true;  // gibt an, ob playIdleAnimation() ausgeführt wird
        this.loadImage('img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png');  // dieses Bild wird geladen, sobald keine Taste gedrückt wird, damit der Character wieder zurück in eine neutrale Ausgangsposition kommt
        this.counterInveralID = setInterval(() => {
            this.counter++;
            if (world.gameOver === false) {
                if (this.counter > 5 && this.counter <= 16) {
                    this.playAnimation(this.IMAGES_IDLE);
                } else if (this.counter > 15) {
                    this.playAnimation(this.IMAGES_LONGIDLE);
                    this.world.background_sound.playbackRate = 0.8;
                }
            }
        }, 800);
    }

    resetIdleTimeout() {
        this.idleAnimation = false;
        clearInterval(this.counterInveralID);
        this.counter = 0;
        this.world.background_sound.playbackRate = 1;
    }






}