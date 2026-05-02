class Button extends Sprite {
    constructor(x, y, config) {
        super();
        this.x = x; // X-coordinate of the button's position
        this.y = y; // Y-coordinate of the button's position
        this.width = 55; // Button width
        this.height = 30; // Button height
        this.isPressed = false; // Whether the button is currently pressed
        this.wasPressed = false; // Whether the button was pressed in the last update cycle
        this.spriteSheet = new Image(); // Button sprite image
        this.spriteSheet.src = config.spriteSheetPath; // Path to the sprite image
        this.buttonSound = new Audio('sounds/lever-button.mp3'); // Sound played when the button is pressed
    }

    // Updates the button's state and plays sound if pressed
    update(sprites) {
        this.wasPressed = this.isPressed;
        this.isPressed = false;

        // Check collisions with sprites (e.g., FireBoy or WaterGirl)
        sprites.forEach(sprite => {
            if ((sprite instanceof FireBoy || sprite instanceof WaterGirl) &&
                this.detectCollision(sprite)) {
                this.isPressed = true;
            }
        });

        // Play sound if button is newly pressed
        if (this.isPressed && !this.wasPressed) {
            this.buttonSound.play();
        }

        return false; // No specific action returned
    }

    // Detects collision between the button and a player sprite
    detectCollision(player) {
        return player.x < this.x + this.width &&
               player.x + player.width > this.x &&
               player.y < this.y + this.height &&
               player.y + player.height > this.y;
    }

    // Draws the button (pressed or unpressed state)
    draw(ctx) {
        ctx.drawImage(
            this.spriteSheet,
            this.isPressed ? 200 : 0, // Select frame based on state
            0, 45, 20,                // Frame dimensions
            this.x, this.y,           // Button position
            this.width, this.height   // Button size
        );
    }
}

class PurpleButton extends Button {
    // Specialized button with purple sprite sheet
    constructor(x, y) {
        super(x, y, {
            spriteSheetPath: 'images/buttons/purplebtn.png'
        });
    }
}

class GreenButton extends Button {
    // Specialized button with green sprite sheet
    constructor(x, y) {
        super(x, y, {
            spriteSheetPath: 'images/buttons/greenbtn.png'
        });
    }
}
