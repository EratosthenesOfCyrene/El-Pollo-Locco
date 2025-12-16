




class EndbossBottle extends MovableObject {

     constructor(x, world) {
        this.x = x;
        this.world = world;

        this.hasHit = false;
        this.visible = false;

        //  Sound gehört zur Flasche
        this.hitSound = new Audio(
            this.world.character.enemyHit_sound.src
        );
        this.hitSound.volume = 0.5;
    }

     hit() {
        if (this.hasHit) return;

        this.hasHit = true;
        this.hitSound.currentTime = 0;
        this.hitSound.play();
    }








}