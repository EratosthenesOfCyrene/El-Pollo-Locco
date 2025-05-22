
/**
 * @typedef {Object} Endboss
 * @property {number} x - X position of the endboss on the canvas.
 * @property {number} y - Y position of the endboss on the canvas.
 * @property {number} width - Width of the endboss to be drawn.
 * @property {number} height - Height of the endboss to be drawn.
 * @property {number} sendbossSpeed - Speed by which the enboss moves (to the left).
 * @property {number} endbossLife - How much life the endboss has
 * @property {boolean} endbossHit - Indicates whether the endoss was hit by abottle. Defaults to false.
 * @property {boolean} playImagesAttack - Indicates whether the attack images are currently played. Defaults to false.
 * @property {number} playAnimationIntervallID - ID of the interval that initiates the animation of the endboss.
 * @property {boolean} playHurtAnimation - Indicates wheter the hurt-animation (if the endboss is hurt) is currently played.#
 * 
 * 
 * @property {function(CanvasRenderingContext2D):void} draw - Draws the chicken to the canvas context.
 * 
 * @class Endboss
 * @extends MovableObject
 */

class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 60;
    x = 5300;
    endBossSpeed = 20;
    endbossLife = 100;
    endbossHit = false;
    playImagesAttack = false;
    playAnimationIntervallID;
    //playAttackIntervalID;
    //playHurtIntervalID;
    playHurtAnimation = false;
    playHurtAnimationTest = false;
    playHurtAnimationTest2 = false;
    playHurtAnimationTest3 = false;
    playHurtAnimationTest4 = false;
    timeoutHit2IntervalID;
    timeoutHit3IntervalID;
    timeoutHit4IntervalID;

    IMAGES_WALKING = [
        './img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        './img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        './img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png',
        './img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.playImagesWalking = false;
        this.animate();
        this.checkForAttack();
    }

    animate() {
        this.playAnimationIntervallID = setInterval(() => {
            if (this.playImagesWalking == false) {
                this.playAnimation(this.IMAGES_WALKING);
                this.playImagesWalking = true;
            } else if (this.playImagesWalking == true) {
                this.playAnimation(this.IMAGES_ALERT);
                this.playImagesWalking = false;
            }
        }, 200);
    }

    /**
     * Chicks if the endboss was attacked (hit by a bottle) by the character.
     * This function calls up the respective functions, depending on how often the character was hit.
     * 
     * @method checkForAttack
     * @memberof Endboss
     */
    checkForAttack() {
        setInterval(() => {
            // Hit 1
            if (this.endbossHit == true && this.endbossLife >= 80 && this.playImagesAttack == false) {
               this.hit1();

                //  Hit 2
            } else if (this.endbossHit == true && this.endbossLife < 80 && this.endbossLife >= 60) {
               this.hit2();

                //  Hit 3
            } else if (this.endbossHit == true && this.endbossLife < 60 && this.endbossLife >= 40) {
              this.hit3();

                //  Hit 4
            } else if (this.endbossHit == true && this.endbossLife < 40 && this.endbossLife >= 20) {
                this.hit4();

                //  Hit 5
            } else if (this.endbossHit == true && this.endbossLife < 20) {
                this.hit5();
            }
        }, 200);
    }

    /**
     * Stops the playing of the normal movement of the endboss and inits the attack-animation.
     * 
     * @method hit1
     * @memberof Endboss
     */
    hit1() {
        clearInterval(this.playAnimationIntervallID);
        this.playAnimation(this.IMAGES_ATTACK);
    }

    /**
     * This function is executed when the endbos was hit for
     * the second time. 
     * It check whether the hurtAnimation ia´s currently playing. 
     * If that isn't the case, then the hurtAnimation will be played and
     * the playbackrate of the background_sound is set to 1.2. 
     * 
     * If the hurtAnimation ins not playing by the moment `hit2()` is called, 
     * a timeout is started which will - after 1 second - move the endboss leftward.
     * 
     * @method hit2
     * @memberof Endboss
     */
    hit2() {
        if (this.playHurtAnimation == false) {
            this.playAnimation(this.IMAGES_HURT);
            world.background_sound.playbackRate = 1.2;
        }
        this.timeoutHit2IntervalID = setTimeout(() => {
            if (this.playHurtAnimationTest == false) {
                this.playHurtAnimation = true;
                this.playHurtAnimationTest = true;
            }
            this.playAnimation(this.IMAGES_ATTACK);
            this.endbossMoveLeft();
        }, 1000);
    }

    hit3() {
        if (this.playHurtAnimation == false) {
            this.playAnimation(this.IMAGES_HURT);
            world.background_sound.playbackRate = 1.4;
        }
        this.timeoutHit3IntervalID = setTimeout(() => {
            if (this.playHurtAnimationTest2 == false) {
                this.playHurtAnimation = true;
                this.playHurtAnimationTest2 = true;
            }
            this.playAnimation(this.IMAGES_ATTACK);
            this.endbossMoveLeft();
        }, 2000);
    }

    hit4() {
        if (this.playHurtAnimation == false) {
            this.playAnimation(this.IMAGES_HURT);
            world.background_sound.playbackRate = 1.7;
        }
        this.timeoutHit4IntervalID = setTimeout(() => {
            if (this.playHurtAnimationTest3 == false) {
                this.playHurtAnimation = true;
                this.playHurtAnimationTest3 = true;
            }
            this.playAnimation(this.IMAGES_ATTACK);
            this.endbossMoveLeft();
        }, 4000);
    }

    hit5() {
        if (this.playHurtAnimation == false) {
            this.playAnimation(this.IMAGES_HURT);
            world.background_sound.playbackRate = 2;
        }
        if (this.endbossLife <= 0) {
            this.endBossSpeed = 0;
        }
        //console.log(this.playHurtAnimation);
        setTimeout(() => {
            if (this.playHurtAnimationTest4 == false) {
                this.playHurtAnimation = true;
                this.playHurtAnimationTest4 = true;
            }
            this.playAnimation(this.IMAGES_DEAD);
        }, 1000);
    }

    endbossMoveLeft() {
        clearInterval(this.playAnimationIntervallID);
        this.x -= this.endBossSpeed;
    }


}



