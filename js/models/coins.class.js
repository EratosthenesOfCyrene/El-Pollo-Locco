

class Coin extends MovableObject {

    id;

    

    IMAGES_COIN = [
        './img_pollo_locco/img/8_coin/coin_1.png',
        './img_pollo_locco/img/8_coin/coin_2.png',
    ];

    constructor() {
        super().loadImage('./img_pollo_locco/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.height = 70;
        this.width = 65;
        this.x = 300 + Math.random() * 5000;
        this.y = 50 + Math.random() * 300;
        this.animate();
        this.id = Coin.i;      // Statische Variablen gehören zur Klasse selbst und nicht zu einer Instanz der Klasse. Daher verwendet man BottleOnFloor.i um sie anzusprechen und nicht this.i !!!
        Coin.i++;
    }

    correctPositionOfEachCoin() {
        const interval = setInterval(() => {
            level.coins.forEach(coin => {
                //-- Level 1
                if (world?.testIfLevel2 === false) {
                    coin.x = 300 + Math.random() * 4900;  //-- platziert die Coins entlang der X-Achse
                    console.log('coin x', coin.x);
                    clearInterval(interval);

                    //-- Level 2
                } if (world?.testIfLevel2 === true) {
                    coin.x = 300 + Math.random() * 7900;  //-- platziert die Coins entlang der X-Achse
                    console.log('coin x', coin.x);
                    clearInterval(interval);
                }
            });
        }, 200);
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 700);
    }





}
