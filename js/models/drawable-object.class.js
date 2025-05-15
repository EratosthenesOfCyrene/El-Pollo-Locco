

class DrawableObject {

    x = 120;
    y = 315;
    height = 150;
    width = 100;
    img;
    currentImage = 0;
    imageCache = [];

    loadImage(path) {  // path ist der Pfad zum Bild z.B. 'img/test-img.png'
        this.img = new Image();   // this.img == document.getElementById('image') <img id="image">
        this.img.src = path;
    }

    draw(movingObject, ctx) {
        try {
            ctx.drawImage(movingObject.img, movingObject.x, movingObject.y, movingObject.width, movingObject.height);
        } catch (e) {
            //console.warn('Error loading Image', e);
            //console.log('Could not load Image', this.img);
        }
    }


    drawFrame(movingObject, ctx) {
        if (this instanceof Chicken || this instanceof BottleOnFloor || this instanceof ThrowableObject || this instanceof ThrowableObject || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'rgba(0, 0, 255, 0)';
            ctx.rect(movingObject.x, movingObject.y + 9, movingObject.width, movingObject.height - 9);
            ctx.stroke();
        } else if (this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'rgba(0, 0, 255, 0)';
            ctx.rect(movingObject.x + 30, movingObject.y + 95, movingObject.width - 70, movingObject.height - 105);
            ctx.stroke();
        }
    }

    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}