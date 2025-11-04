


class Sounds {

    async playSound(sound) {
        try {
            await sound.play();
        } catch (err) {
            //console.log("Sound konnte nicht abgespielt werden:", err);
        }
    }

    stopSound(sound) {
        sound.pause();
        sound.currentTime = 0;
    }

    hanndleGameLostSounds() {
        window.world.character.characterDead_sound.play();
        setTimeout(() => {
            window.world.character.characterDeadDrums_sound.play();
        }, 3000);
    }

     handleGameWonSounds() {
        window.world.character.characterYeah_sound.play();
        setTimeout(() => {
            window.world.character.gameWon_sound.volume = 0.7;
            window.world.character.gameWon_sound.play();
        }, 1000);
    }

    stopAllSounds() {
        console.log(window.world.allSounds);
        console.log(window.world.allSounds[0] instanceof Audio);
        for (let i = 0; i < window.world.allSounds.length; i++) {
            const sound = window.world.allSounds[i];
            sound.pause();
            sound.currentTime = 0;
        }
    }







}