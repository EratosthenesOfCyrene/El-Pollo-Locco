




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
        console.log('INTERVAL CALLED');
        
        if (typeof window.world !== 'undefined' && this?.gameIntervals) {
            this.gameIntervals.push(param);
            console.log(this.gameIntervals);
            //clearInterval(checkInterval);
        } else {
            // Wiederholt die Prüfung 100ms später
            setTimeout(() => this.addIntervalToIntervalArray(param), 5000);
           /* const checkInterval = setInterval(() => {
                this.addIntervalToIntervalArray(param);
            }, 1000);*/
        }        
    }

    clearGameIntervals() {
        //this.gameIntervals.forEach(id => clearInterval(id));

        this.gameIntervals.length = 0;
        //this.gameIntervals = [];
        console.log(this.gameIntervals);
        console.log([...this.gameIntervals]);
        
    }











    test() {
        console.log('TEST GAME INTERVALS');
        
    }














    test() {
        console.log(
            'TEST INTERVALS CLASS'
        );
        
    }










}