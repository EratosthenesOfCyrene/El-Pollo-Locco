


class Sounds {

    async playSound(sound) {
        try {
            //sound.currentTime = 0;
            await sound.play();
        } catch (err) {
            console.log("Sound konnte nicht abgespielt werden:", err);
        }
    }

    stopSound(sound) {
        sound.pause();
        sound.currentTime = 0;
    }








    test() {
        console.log('testtttt sound file');

    }



}