
/**
 * @typedef {object} Sounds
 * @class Sounds
 * @classdesc Handles the logic of the playing of all the sounds ind the game.
 */


class Sounds {

/**
 * Plays the given sound asynchronously.
 * 
 * @async
 * @param {HTMLAudioElement} sound - The sound object to be played.
 * @returns {Promise<void>} Resolves when the sound starts playing, or silently fails if playback is not possible.
 * @method playSound
 * @memberof Sounds
 */
    async playSound(sound) {
        try {
            await sound.play();
        } catch (err) {
            //console.warn("Sound konnte nicht abgespielt werden:", err);
        }
    }

    /**
     * Stops the given sound.
     * 
     * @param {HTMLAudioElement} sound - The sound object to be stopped.
     * @method stopSound
     * @memberof Sounds
     */
    stopSound(sound) {
        sound.pause();
        sound.currentTime = 0;
    }

    /**
     * Handles the sounds if the game is lost. 
     * 
     * @method hanndleGameLostSounds
     * @memberof Sounds
     */
    hanndleGameLostSounds() {
        window.world.character.characterDead_sound.play();
        setTimeout(() => {
            window.world.character.characterDeadDrums_sound.play();
        }, 3000);
    }

    /**
     * Handles the sounds if the game is won.
     * 
     * @method handleGameWonSounds
     * @memberof Sounds
     */
     handleGameWonSounds() {
        window.world.character.characterYeah_sound.play();
        setTimeout(() => {
            //window.world.character.gameWon_sound.volume = 0.7;
            window.world.character.gameWon_sound.play();
        }, 1000);
    }

    /**
     * Stops all the sounds in the game, for example if the game is over.
     * 
     * @method stopAllSounds
     * @memberof Sounds
     */
    stopAllSounds() {
        for (let i = 0; i < window.world.allSounds.length; i++) {
            const sound = window.world.allSounds[i];
            sound.pause();
            sound.currentTime = 0;
        }
    }







}