
/**
 * @typedef {object} Intervals
 * @class Intervals
 * @classdesc Manages all game-related intervals and provides functionality
 * to store and clear them when the game is restarted.
 * 
 * @property {number} gameIntervals - An array containing all interval IDs currently registered in the game.
 */



class Intervals {

    gameIntervals = [];
    

    /**
     * This function pushes the interval into the array gameIntervals in world.class.
     * It tries it as often as needed until it can push the respective interval into the
     * gameInterval array
     * 
     * @param {number} param - The ID of the interval 
     * @method addIntervalToIntervalArray
     * @memberof Intervals
     */
    addIntervalToIntervalArray(param) {
        if (typeof window.world !== 'undefined' && this?.gameIntervals) {
            this.gameIntervals.push(param);
        } else {
            // Wiederholt die Prüfung 100ms später
            setTimeout(() => this.addIntervalToIntervalArray(param), 5000);
        }
    }

    /**
     * Clears all the intervalls in the game if the game has been restarted.
     * 
     * @method clearGameIntervals
     * @memberof Intervals
     */
    clearGameIntervals() {
        this.gameIntervals.forEach(id => clearInterval(id));
        this.gameIntervals = [];
        this.gameIntervals.length = 0;
    }








}