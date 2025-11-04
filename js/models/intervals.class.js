




class Intervals {

    gameIntervals = [];





    /**
     * This function pushes the interval into the array gameIntervals in world.class.
     * It tries it as often as needed until it can push the respective interval into the
     * gameInterval array
     * 
     * @param {number} param - The ID of the interval 
     */
    addIntervalToIntervalArray(param) {
        if (typeof window.world !== 'undefined' && this?.gameIntervals) {
            this.gameIntervals.push(param);
        } else {
            // Wiederholt die Prüfung 100ms später
            setTimeout(() => this.addIntervalToIntervalArray(param), 5000);
        }
    }

    clearGameIntervals() {
        this.gameIntervals.forEach(id => clearInterval(id));
        this.gameIntervals = [];
        this.gameIntervals.length = 0;
    }








}