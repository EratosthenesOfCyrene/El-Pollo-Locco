
/**
 * @typedef {Object} DrawableObject
 * @property {number} x - X position of the object be drawn on the canvas.
 * @property {number} y - Y position of the object be drawn on the canvas.
 * @property {number} width - Width of the object to be drawn.
 * @property {number} height - Height of the object to be drawn.
 * @property {HTMLImageElement} img - The image to be drawn.
 * @property {number} currentImage - Number of the currently drawn image
 * @property {array} imageCache - Stores the images that are going to be drawn
 * 
 * @class DrawableObject
 */

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

    /**
     * Draws the given moving object onto the html canvas context.
     * The function uses the object's image and its position and size properties to render it.
     * 
     * @param {Object} movingObject - The object to be drawn. Im must have the following properties:
     *   - {HTMLImageElement} img - The image to be drawn.
     *   - {number} x - The x-coordinate where the image should be placed.
     *   - {number} y - The y-coordinate where the image should be placed.
     *   - {number} width - The width of the drawn image.
     *   - {number} height - The height of the drawn image.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D context to draw the image on.
     * 
     * @method draw
     * @memberof DrawableObject 
     */
    draw(movingObject, ctx) {
        try {
            ctx.drawImage(movingObject.img, movingObject.x, movingObject.y, movingObject.width, movingObject.height);
        } catch (e) {
            //console.warn('Error loading Image', e);
            //console.log('Could not load Image', this.img);
        }
    }

    /**
     * Draws a frame around the respective image.
     * 
     * @param {Object} movingObject - The object that the frame is drawn around.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D context to draw the frame (around the image) on.
     * 
     * @method drawFrame
     * @memberof DrawableObject
     */
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
        } else if (this instanceof Endboss) {
             ctx.beginPath();
            ctx.lineWidth = '2';
            //ctx.strokeStyle = 'rgba(0, 0, 255, 0)';
            ctx.strokeStyle = 'rgba(0, 0, 255, 1)';
            ctx.rect(movingObject.x + 30, movingObject.y + 70, movingObject.width - 70, movingObject.height - 90);
            ctx.stroke();
        }
    }

    /**
     * Loads the images which are to be drawn from the respective class.
     * @param {array} array - Stores the now loaded images that are going to be drawn
     * 
     * @method loadImages
     * @memberof DrawableObject
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}