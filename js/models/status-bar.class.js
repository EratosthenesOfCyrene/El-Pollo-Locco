class StatusBar extends DrawableObject {
    IMAGES_STATUSBAR_LIFE = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_LIFE);
        this.x = 40; // X-Koordinate der Anzeige der Statusbar
        this.y = 0;
        this.width = 180;
        this.height = 45;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR_LIFE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        console.log();
        if (this.percentage == 100) {
            return 5;  // zeigt das 5. Bild aus dem Array IMAGES_STATUSBAR_LIFE an. 
        } else if (this.percentage > 80 && this.percentage < 100) {
            return 4;
        } else if (this.percentage > 60 && this.percentage <= 80) {
            return 3
        } else if (this.percentage > 40 && this.percentage <= 60) {
            return 2;
        } else if (this.percentage > 20 && this.percentage <= 40) {
            return 1;
        } else {
            return 0;
        }
    }
}

