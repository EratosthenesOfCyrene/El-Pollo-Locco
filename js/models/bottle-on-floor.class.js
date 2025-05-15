class BottleOnFloor extends MovableObject {
    static i = 0;   // erschafft eine statische Variable, dien Wert des letzten Aufrufs speichert
    id;
    IMAGES_BOTTLE_GROUND = [
        'img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor() {
        let randomnumber = Math.round(Math.random());
        if (randomnumber == 0) {
            super().loadImage('img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        } else {
            super().loadImage('img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        }
       
        this.height = 70;
        this.width = 65;
        this.x = 300 + Math.random() * 5000;
        this.y = 360;
        this.id = BottleOnFloor.i;      // Statische Variablen gehören zur Klasse selbst und nicht zu einer Instanz der Klasse. Daher verwendet man BottleOnFloor.i um sie anzusprechen und nicht this.i !!!
        BottleOnFloor.i++;
    }


    correctPositionOfEachBottle() {
        const interval = setInterval(() => {
            level.bottleOnFloor.forEach(bottle => {
                //-- Level 1
                if (world?.testIfLevel2 === false) {
                    bottle.x = 300 + Math.random() * 4900;  //-- platziert die Coins entlang der X-Achse
                    console.log('coin x', bottle.x);
                    clearInterval(interval);

                    //-- Level 2
                } if (world?.testIfLevel2 === true) {
                    bottle.x = 300 + Math.random() * 7900;  //-- platziert die Coins entlang der X-Achse
                    console.log('coin x', bottle.x);
                    clearInterval(interval);
                }
            });
        }, 200);
    }
    
createIndex() {
    console.log(BottleOnFloor.i);
    world.booooottles.push(BottleOnFloor, {'index': BottleOnFloor.i});
    BottleOnFloor.i++;
    console.log(this.world.booooottles);
}




}