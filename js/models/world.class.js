
/**
 * Represents the game world, controls game logic, collision detection,
 * sound effects and rendering onto the canvas.
 * 
 * @typedef {Object} World
 * @property {Character} character - The main player character.
 * @property {boolean} gameStarted - Indicates whether the game has started.
 * @property {boolean} testIfLevel2 - Flag imported from game.js to check if level 2 is active.
 * @property {HTMLCanvasElement} canvas - The canvas element used for rendering the game.
 * @property {CanvasRenderingContext2D} ctx - The 2D drawing context of the canvas.
 * @property {Keyboard} keyboard - The keyboard input handler.
 * @property {boolean} gamePaused - Indicates whether the game is currently paused. Defaults to false.
 * @property {number} camera_x - Horizontal movement of the camera.
 * @property {StatusBar} statusBar - Displays the player's health/energy.
 * @property {Array<Object>} bottleOnFloor - Bottles available for collection on the ground.
 * @property {Array<Object>} collectedThrowableObjects - Bottles already collected by the player.
 * @property {Array<Object>} booooottles - Alternative array storing bottles (usage-specific).
 * @property {StatusBarBottles} statusBarBottles - Displays the number of bottles collected in a statusbar.
 * @property {StatusBarCoins} statusBarCoins - Displays the number of coins collected in a statusbar.
 * @property {StatusKilledEnemies} statusKilledEnemies - Displays how many enemies have been defeated.
 * @property {boolean} bottleInAir - Indicates whether a bottle is currently in the air. Defaults to false.
 * @property {Screens} screens - Manages the display of the game over screens.
 * @property {number} indexOfCurrentEnemy - Tracks the index of the enemy currently involved in a collision.
 * @property {boolean} canCheckJumpingOnEnemy - Enables or disables the possibility for jumping on an enemy.
 * @property {boolean} canExecuteCollisionCheck - Enables or disables general collision checks.
 * @property {Array<Object>} coin - Array of coin objects in the level.
 * @property {number} killedEnemies - Counter of how many enemies have been killed.
 * @property {boolean} gameOver - Indicates whether the game is over. Defaults to false.
 * @property {boolean} isMuted - Indicates whether the sound is muted. Defaults to false.
 * @property {HTMLAudioElement} background_sound - Background music audio element.
 * @property {Array<Object>} gameIntervals - The array into which all intervalls are pushed for easier handling during game restart.
 * @property {boolean} enemyHitSoundPlaying - Indicates whether the sound of a hit enemy is already playing.
 * 
 * @class World
 */

class World {

    constructor(canvas, keyboard, selectedLevel = 1, intervals) {
        this.selectedLevel = selectedLevel;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.intervals = intervals;
        this.backgroundObjects = this.createInitialBackground();  // der Background wird bereits hier initialisiert und nicht in level1 bzw. level 2, da das Laden sonst zu lange dauert
        this.initWorld();
        this.setWorld();  // Diese Funkrion verknüft alle Variablen, die in der Klasse World drin sind mit der Klasse Character; bzw. man könnte sagen, diese Funktion übergibt sämliche Variablen, die in der Klasse "World" vorhanden sind, an die Klasse "Chararcter"
        this.runIntervals();
        this.draw();
        this.level.coins[0].correctPositionOfEachCoin(this);    //-- ruft diese Funktion hier beim Erzeugen des ersten Coins auf, da man sie nicht in der Klasse "Coin" aufrufen sollte, da sie hier über den Konstruktor aufgerufen werden würde, sodass sie bei jedem neu erzeugten Coin aufgerufen werden würde und dies zu viel rechenarbeit führen würde
        this.level.bottleOnFloor[0].correctPositionOfEachBottle(this);
        this.adjustLevelEnd();
    }

    /**
     * Creates the initial background so that there is no lagging when the game starts.
     * 
     * @returns bg - the background
     * @method createInitialBackground
     * @memberof world
     */
    createInitialBackground() {
        const bg = [];
        for (let i = 0; i < 14; i++) {
            const offset = i * 719;
            bg.push(new BackgroundObject('./img_pollo_locco/img/5_background/layers/air.png', offset, 0));
            bg.push(new BackgroundObject('./img_pollo_locco/img/5_background/layers/3_third_layer/' + ((i % 2) + 1) + '.png', offset, 0));
            bg.push(new BackgroundObject('./img_pollo_locco/img/5_background/layers/2_second_layer/' + ((i % 2) + 1) + '.png', offset, 0));
            bg.push(new BackgroundObject('./img_pollo_locco/img/5_background/layers/1_first_layer/' + ((i % 2) + 1) + '.png', offset, 0));
        }
        return bg;
    }

    /**
     * This function initiates the game world.
     * 
     * 
     */
    initWorld() {
        this.setLevel();
        this.character = new Character(this);
        this.sounds = new Sounds(this);
        this.gameStarted = false;
        this.testIfLevel2 = testIfLevel2;   //-- importiert die Variable testIfLevel2 aus der datei game.js und macht deren Wert somit für die anderen Objekte im Spiel verfügbar
        this.canvas;
        this.ctx;
        this.keyboard;
        this.gamePaused = false;
        this.camera_x = 0;  // diese Variable wird verwendet, um die Kamera auf der x-achse zu verschieben
        this.statusBar = new StatusBar();
        this.bottleOnFloor = [];
        this.collectedThrowableObjects = [];
        this.booooottles = [];
        this.statusBarBottles = new StatusBarBottles();
        this.statusBarCoins = new StatusBarCoins();
        this.statusKilledEnemies = new StatusKilledEnemies();
        this.bottleInAir = false;   // diese Variable gibt an, ob sich gerade eine Flasche in der Luft befindet. Diese Variable wird gebraucht, um in der Funktion "checkThrowObjects()" zu überprüfen, ob sich bereits eine Flasche in der Luft befindet, damit nicht mehrere Flaschen auf einmal geworfen werden können
        this.screens = new Screens(this);
        this.indexOfCurrentEnemy;   // der Wert von 'movingObject' muss der Variablen 'indexOfCurrentEnemy' zugeordnet werden, damit wenn in der Klasse Character() abgefragt wird, ob es sich um eine Kollision handelt oder ob der Character von oben auf den Enemay springt, Werte für einen Enemy vorhanden sind, da es sonst zu einem Fehler kommt, wenn die Funktion ' isJumpingOnEnemy()' ausgeführt wird. 
        this.canCheckJumpingOnEnemy = true;
        this.canExecuteCollisionCheck = false;
        this.coin = [];
        this.killedEnemies = 0;
        this.gameOver = false;
        this.allSounds = [];
        this.isMuted = false;
        this.background_sound = new Audio('audio/background-music.mp3');
        this.allSounds.push(this.background_sound);
        this.adjustToggleBtnsForStart();
        window.addEventListener("resize", testWindowWidth);
        this.initializeCloudMovement();
        this.correctChickenSpeed();
        this.definedEndboss;  // variable that carries the information of where in the enemies array the endboss is
        this.defineEndboss();
        this.enemyHitSoundPlaying = false;
    }

    /**
     * First checks if the world and the clouds have already been loaded (to avoid louding errors)
     * and then starts the movement of the clouds.
     * 
     * @method initializeCloudMovement
     * @memberof world
     */
    initializeCloudMovement() {
        const checkCloudsInterval = setInterval(() => {
            if (window.world && Array.isArray(window.world.level.clouds)) {
                window.world.level.clouds.forEach(cloud => cloud.animateCloudMovement(window.world));
                clearInterval(checkCloudsInterval); // Intervall beenden, sobald es einmal erfolgreich war
            }
        }, 100);
    }

    /**
     * Checks whether the chickens have been loaded and then corrects the speed of ach chicken. 
     * 
     * @method correctChickenSpeed
     * @memberof world
     */
    correctChickenSpeed() {
        const interval = setInterval(() => {
            if (typeof Chicken !== 'undefined' && Chicken.correctSpeedOfEachChicken) {
                Chicken.correctSpeedOfEachChicken(this);
                clearInterval(interval); // prüfung stoppen, wenn erfolgreich
            }
        }, 100);
    }

    /**
     * This function checks which level has been chosen and defines the endboss accordingly.
     * 
     * @method defineEndboss
     * @memberof world
     */
    defineEndboss() {
        if (this.selectedLevel === 1) {
            this.definedEndboss = this.level.enemies[11];
        } else if (this.selectedLevel === 2) {
            this.definedEndboss = this.level.enemies[21];
        }
    }

    /**
     * hecks if level 1 or level 2 has been selected and initiates the level accordingly.
     * If no level has been chosen, it starts level 1 as default.
     * 
     * @method setLevel
     * @memberof world
     */
    setLevel() {
        if (this.selectedLevel === 1) {  //startLevel1
            this.level = new Level1(this);
            testIfLevel2 = false;
            testWindowWidth();
        } else if (this.selectedLevel === 2) {   //startLevel2
            this.level = new Level2(this);
            testIfLevel2 = true;
            testWindowWidth();
        }
        else {  // standart if no level was chosen
            this.level = new Level1(this);
            testIfLevel2 = false;
            testWindowWidth();
        }
    }

    /**
     * Stops the character from moving too far to the right if the level end is reached. 
     * The function tests if level 1 or level 2 is played and sets the end of the furthest rightwards movement
     * of the character accordingly.
     * 
     * @method adjustLevelEnd
     * @memberof world
     */
    adjustLevelEnd() {
        if (this.testIfLevel2 === false) {
            this.level.level_end_x = 5100
        } if (this.testIfLevel2 === true) {
            this.level.level_end_x = 8100
        }
    }

    /**
     * Adjusts the toggle buttons for the start of the game.
     * It deactivates the play button in both deskttop or mobile view and reactivates the pause
     * button in both desktop or mobile view.
     * 
     * @method adjustToggleBtnsForStart
     * @memberof world
     */
    adjustToggleBtnsForStart() {
        toggleBtn('resumeGameBtn', true);  // deaktiviert den zuvor deaktivierten "play-Button" der Desktop Ansicht
        toggleBtn('resumeGameBtnMobile', true);  // deaktiviert den zuvor deaktivierten "play-Button" der mobilen Ansicht
        toggleBtn('pauseGameBtn', false);    // reaktiviert den zuvor deaktivierten "Pause-Button" der Desktop Ansicht
        toggleBtn('pauseGameBtnMobile', false);    // reaktiviert den zuvor deaktivierten "Pause-Button" der mobilen Ansicht
    }

    /**
     * This function draws on the canvas all the elemnts needed for the game.
     * 
      Steps:
     * 1. Clears the canvas before redrawing.
     * 2. Translates camera view to follow the character.
     * 3. Renders background, clouds, status bars, game entities, and UI elements.
     * 
     * Uses:
     *
     * - {@link this.ctx.clearRect} - Clears the entire canvas before redrawing.
     * - {@link this.ctx.translate} - Shifts the canvas view horizontally to simulate camera movement.
     * - {@link level.backgroundObjects} - Array of background elements to render behind everything else.
     * - {@link level.clouds} - Array of cloud objects floating in the background layer.
     * - {@link this.statusBar} - Status bar displaying the player's health or energy.
     * - {@link this.statusBarBottles} - Status bar showing the number of collected bottles.
     * - {@link this.statusBarCoins} - Status bar showing the number of collected coins.
     * - {@link this.statusKilledEnemies} - Status bar showing how many enemies were killed.
     * - {@link this.setTextStyle} - Applies font and color styling for canvas text.
     * - {@link this.ctx.fillText} - Draws the killed enemies number as text on the canvas.
     * - {@link this.resetTextStyle} - Resets the canvas text style to default settings.
     * - {@link this.screens} - Overlay screens such as start, pause, or game over.
     * - {@link this.character} - The player character object rendered in the foreground.
     * - {@link level.enemies} - Array of enemy objects the player can interact with.
     * - {@link level.bottleOnFloor} - Bottles that the player can pick up from the ground.
     * - {@link level.coins} - Collectible coin objects scattered across the level.
     * - {@link this.collectedThrowableObjects} - Array of bottles collected and ready to throw.
     * 
     * @method draw
     * @memberof World
     */
    draw() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.backgroundObjects);  // Background
        this.ctx.translate(-this.camera_x, 0); // verschiebt die Kamera vor den Zeichnen der StatusBar zurück
        this.addObjectsToMap(this.level.clouds);  // Clouds
        this.addToMap(this.statusBar); // Status-Bar
        this.addToMap(this.statusBarBottles); // Status-Bar-Bottles
        this.addToMap(this.statusBarCoins); // Status-Bar-Coins
        this.addToMap(this.statusKilledEnemies); // Status Killed Enemies
        this.setTextStyle();  // diese Funktion stylt die Anzeige der Ziffer der gekillten Enemies
        this.ctx.fillText(`${this.killedEnemies}`, this.statusKilledEnemies.x + 15, this.statusKilledEnemies.y + 52);   // diese Zeile zeichnet die Zahl der getöteten Enemies in das Canvas
        this.resetTextStyle();  // diese Funktion setzt das Styling der Anzeige der gekillten Enemies zurück
        this.addToMap(this.screens);
        this.ctx.translate(this.camera_x, 0); // schiebt die Kamera nach den Zeichnen der StatusBar wieder nach vorne -> durch diese beiden Schritte läuft die StatusBar nicht aus den Bild, wenn der Character bewegt wird
        this.addToMap(this.character);  // Character
        this.addObjectsToMap(this.level.bottleOnFloor);  // Bottle on Floor ready to collect
        this.addObjectsToMap(this.level.enemies);  // Enemies
        this.addObjectsToMap(this.level.coins);  // Coins
        this.addObjectsToMap(this.collectedThrowableObjects);
        const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss && endboss.bottles) {
            this.addObjectsToMap(endboss.bottles);
        }
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {   // damit wird die draw()-Methode so oft aufgerufen, wie die Grafikkarte es hergibt
            self.draw();
        });
    }

    /**
     * Sets the  text style onto the canvas for the killed enemies.
     * 
     * @method setTextStyle
     * @memberof World
     */
    setTextStyle() {
        this.ctx.font = "bold 25px Arial";  // Schriftart und Größe
        this.ctx.fillStyle = "red";  // Farbe des Textes
        this.ctx.textAlign = "center";  // Zentrierte Ausrichtung
        this.ctx.shadowColor = "black";  // Schattenfarbe
        this.ctx.shadowBlur = 3;  // Schatteneffekt
    }

    /**
     * Resets the  text style onto the canvas for the killed enemies.
     * 
     * @method resetTextStyle
     * @memberof World
     */
    resetTextStyle() {
        this.ctx.font = "";  // Schriftart und Größe
        this.ctx.fillStyle = "none";  // Farbe des Textes
        //this.ctx.textAlign = "";  // Zentrierte Ausrichtung
        this.ctx.shadowColor = "none";  // Schattenfarbe
        this.ctx.shadowBlur = 0;  // Schatteneffekt
    }

    /**
     * This function links the character it is in.
     * 
     * @method setWorld
     * @memberof World
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Calls the functions that check if the character collides whith anyting.
     * 
     * Dependencies:
     *  Functions called: 
     *  	`checkCollisions()`, `checkThrowObjects()`
     * 
     * @method runIntervals
     * @memberof World
     */
    // überprüft, ob der Character mit den Enemies kollidiert
    runIntervals() {
        this.checkCollisions();
        this.checkThrowObjects();
    }

    /**
     * This function runs intervals to continuously check wether the character is:
     * 
     * colliding whith enemies
     * jumping onto enemies
     * colliding whith bottles
     * colliding whith coins
     * 
     * @method checkCollisions
     * @memberof World
     */
    checkCollisions() {
        this.checkForCollisionsWhithEnemies();
        this.checkIfCharacterJumpsOnEnemy();
        this.checkForCollisionsWhithThrowableObjects();
        this.checkForCollisionsWhithCoins();
    }

    /**
     * Checks for Collisions whith Enemies.
     * 
     * @method checkForCollisionsWhithEnemies
     * @memberof World
     */
    checkForCollisionsWhithEnemies() {
        const interval = setInterval(() => {   // Checking for Collisions whith Enemies
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.isDeadChicken) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);  // weist dem Prozentwert 'percentage' den aktuellen Wert zu in der Klasse Status-bar
                }
            });
        }, 20);
        this.intervals.addIntervalToIntervalArray(interval);
    }

    /**
     * Checks if Character jumps on Enemy.
     * 
     * @method checkIfCharacterJumpsOnEnemy
     * @memberof World
     */
    checkIfCharacterJumpsOnEnemy() {
        const interval = setInterval(() => {   // Checking if Character jumps on Enemy
            this.level.enemies.forEach((enemy, indexOfEnemy) => {
                if (this.character.isJumpingOnEnemy(enemy) && enemy != this.definedEndboss) {   // der erste Teil der Condition prüft, ob überhaupt eine Kollision mit einem Enemy vorliegt, und der zweite Teil der Condition prüft, ob der Character dabei von oben kommend mit dem Enemy kolliediert. 
                    this.playDeadChickenAnimation(enemy);  // hier wird das ganze getroffene Objekt (enemy) übergeben und nicht nur dessen index, da sich dieser rasch ändern kann, z.B. wennn ein enemy gelöscht wurde, sodass es zu fehlern kommen kann
                    enemy.isDeadChicken = true;
                    this.handleEnemyHitSounds();
                }
            });
        }, 20);
        this.intervals.addIntervalToIntervalArray(interval);
    }

    /**
     * Checks for Collisions whith Bottles/ThrowableObjects.
     * 
     * @method checkForCollisionsWhithThrowableObjects
     * @memberof World
     */
    checkForCollisionsWhithThrowableObjects() {
        const interval = setInterval(() => {   // Checking for Collisions whith Bottles/ThrowableObjects
            this.level.bottleOnFloor.forEach((bottleOnFloor, indexOfBottle) => {
                if (this.character.isColliding(bottleOnFloor)) {
                    this.level.collectedBottle = new ThrowableObject(-5000, this);
                    this.collectedThrowableObjects.push(this.level.collectedBottle);
                    this.level.bottleOnFloor.splice(indexOfBottle, 1);  // löscht die Flasche, mit der der Character kollidiert ist anhand ihres index
                    this.statusBarBottles.collectedBottles++;  // erhöht den Wert der gesammelten Flaschen für die Bottle-Status-Bar
                    this.statusBarBottles.setBottleNumber(this.statusBarBottles.collectedBottles);  // aktualisiert die Anzeige der Bottle-Status-Bar
                    this.sounds.stopSound(this.character.bottleCollected_sound);
                    this.sounds.playSound(this.character.bottleCollected_sound);
                }
            });
        }, 200);
        this.intervals.addIntervalToIntervalArray(interval);
    }

    /**
     * Checks for Collisions whith coins.
     * 
     * @method checkForCollisionsWhithCoins
     * @memberof World
     */
    checkForCollisionsWhithCoins() {
        const interval = setInterval(() => {   // Checking for Collisions whith Coins
            this.level.coins.forEach((coin, indexOfCoin) => {
                if (this.character.isColliding(coin)) {
                    this.level.coins.splice(indexOfCoin, 1);  // löscht die Flasche, mit der der Character kollidiert ist anhand ihres index
                    this.statusBarCoins.collectedCoins++;  // erhöht den Wert der gesammelten Coins für die Coin-Status-Bar
                    this.statusBarCoins.setCoinNumber(this.statusBarCoins.collectedCoins);  // aktualisiert die Anzeige der Bottle-Status-Bar
                    this.sounds.stopSound(this.character.coinCollected_sound);
                    this.sounds.playSound(this.character.coinCollected_sound);
                }
            });
        }, 200);
        this.intervals.addIntervalToIntervalArray(interval);
    }

    /**
     * This function checks if bottles are currently in the air and initializes the throw of the next bottle
     * 
     * @method checkThrowObjects
     * @memberof World
     */
    checkThrowObjects() {
        const interval = setInterval(() => {
            if (this.keyboard.letterD && this.collectedThrowableObjects.length > 0 && this.bottleInAir == false && this.gamePaused == false) {
                this.collectedThrowableObjects[0].throw();
            }
            else if (this.collectedThrowableObjects.length < 1) {
                //console.warn('NO BOTTLES COLLECTED!!!!');
            }
        }, 100);
        this.intervals.addIntervalToIntervalArray(interval);
    }

    handleEnemyHitSounds() {
        if (!this.enemyHitSoundPlaying) {
            this.sounds.stopSound(this.character.enemyDeleted_sound);
            this.sounds.playSound(this.character.enemyDeleted_sound);  // spielt den Sound ab, dass ein enemy getötet wurde
            this.enemyHitSoundPlaying = true;
        }
    }

    /**
     * Checks whether a big or small chicken is dead and plays the animation of the dead chicken accordingly.
     * 
     * @param {Chicken|Endboss} enemy - The enemy object (chicken or endboss) whose death animation will be played.
     * @method playDeadChickenAnimation 
     * @memberof world
     */
    playDeadChickenAnimation(enemy) {
        const deadChickenIntervalID = setInterval(() => {
            if (enemy.chickenBig == true) {   // diese Abfrage prüft, ob es sich um ein großes oder ein kleines Ckicken handelt, damit im Folgenden das richtige Bild des toten Chicken geladen werden kann
                enemy.loadImage(enemy.IMAGE_DEAD);
            } else {
                enemy.loadImage(enemy.IMAGE_DEAD_SMALL);
            }
            enemy.speed = 0;
        }, 200);

        setTimeout(() => {
            clearInterval(deadChickenIntervalID);
            this.deleteHitEnemy(enemy);
        }, 500);
        this.intervals.addIntervalToIntervalArray(deadChickenIntervalID);
    }

    /**
     * Deletes the hit enemy.
     * 
     * @param {Chicken|Endboss} enemy - The enemy that will be deleted.
     * @method deleteHitEnemy
     * @memberof world
     */
    deleteHitEnemy(enemy) {  // deletes the hit enemy
        const indexOfEnemy = this.level.enemies.indexOf(enemy);
        if (indexOfEnemy !== -1) {
            this.level.enemies.splice(indexOfEnemy, 1);
            this.killedEnemies++;
            this.enemyHitSoundPlaying = false;  // resets the enemy hit sounds flag
        }
    }

    /**
     * Deletes a thrown bottle from the bottles array.
     * 
     * @method deleteThrownBottleFromArray
     * @memberof world
     */
    deleteThrownBottleFromArray() {
        this.collectedThrowableObjects.splice(1, 1);
    }

    /**
     * This function deletes all enemies.
     * 
     * @method deleteAllEnemies
     * @memberof world
     */
    deleteAllEnemies() {
        this.level.enemies.length = 0  //-- .length = 0 leert das Array
    }

    /**
     * Renders all the objects of the game onto the map.
     * 
     * @param {objects} objects - all the abjects that are to be rendered to the map.
     * @method addObjectsToMap
     * @memberof world
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * Adds a moving object to the canvas map. This includes drawing the object 
     * and its current animation frame. If the object needs to be mirrored 
     * (indicated by `otherdirection`), the image is flipped horizontally before 
     * and after drawing to achieve the correct visual orientation.
     *
     * @param {Object} movingObject - The object to be drawn on the canvas. 
     * @returns {void} This function does not return a value. It only return anything if there 
     * occurs an error whith a moving object that was handed over into this function.
     * 
     * @method addToMap
     * @memberof World
     */
    addToMap(movingObject) {
        if (!movingObject) {
            console.error('movingObject is undefined');
            return;  // beendet die Funktion, falls das zuvor Geprüfte zutrifft.
        }
        if (movingObject.otherdirection) {  // diese Methode spiegelt das Bild auf dem Canvas -> Junus hat die Methode ergoogelt; kommt im Video Bild spiegeln
            this.flipImage(movingObject);
            this.otherdirection = true;
        }
        movingObject.draw(movingObject, this.ctx);
        movingObject.drawFrame(movingObject, this.ctx);

        if (movingObject.otherdirection) {  // diese Methode sorgt dafür, dass künftige Bilder nicht mehr gespiegelt werden.
            this.flipImageBack(movingObject);
        }
    }

    /**
     * Flips the image of the object to be drawn, for example the main 
     * character if it moves leftwards.
     * 
     *@method flipImage
     *@memberof World
     */
    flipImage(movingObject) {
        this.ctx.save();
        this.ctx.translate(movingObject.width, 0); //dieser Befehl ist falsch
        this.ctx.scale(-1, 1);
        movingObject.x = movingObject.x * -1;
    }

    /**
     * Flips back the image of the object that is to be drawn.
     * 
     * @method flipImageBack
     * @memberof world
     */
    flipImageBack(movingObject) {
        movingObject.x = movingObject.x * -1;
        this.ctx.restore();
    }



}