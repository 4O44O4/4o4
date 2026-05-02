class Lever extends Sprite {
    constructor(x, y) {
        super();
        this.x = x; // X-coordinate of the lever
        this.y = y; // Y-coordinate of the lever
        this.width = 60; // Lever width
        this.height = 50; // Lever height

        // State management for lever
        this.state = {
            current: 'OFF', // Initial state
            OFF: 'ON', // Toggle state
            ON: 'OFF'  // Toggle state
        };

        this.lastInteraction = 0; // Tracks last interaction time
        this.cooldownPeriod = 500; // Cooldown period between interactions (ms)
        this.interactingPlayer = null; // Player currently interacting with the lever

        this.image = new Image(); // Lever image
        this.image.src = 'images/lever.png';
        this.frameWidth = 80; // Frame width in the sprite sheet
        this.frameHeight = 70; // Frame height in the sprite sheet

        this.leverSound = new Audio('sounds/lever-button.mp3'); // Sound for toggling the lever
    }

    // Updates the lever's state and checks for interactions
    update(sprites, keys) {
        const currentTime = Date.now();
        let playerInRange = false;

        // Check for player collision
        sprites.forEach(sprite => {
            if ((sprite instanceof FireBoy || sprite instanceof WaterGirl) && 
                this.checkCollision(sprite)) {
                playerInRange = true;
                this.interactingPlayer = sprite;
            }
        });

        if (!playerInRange) {
            this.interactingPlayer = null;
            return false; // No interaction
        }

        // Handle lever toggle if player presses the 'O' key
        if (this.interactingPlayer && 
            currentTime - this.lastInteraction > this.cooldownPeriod && 
            keys['o']) {
            this.toggle();
            this.lastInteraction = currentTime;
        }

        return false;
    }

    // Toggles the lever's state and plays a sound
    toggle() {
        this.state.current = this.state[this.state.current];
        this.leverSound.play();
    }

    // Checks collision between the lever and a player
    checkCollision(player) {
        return player.x < this.x + this.width &&
               player.x + player.width > this.x &&
               player.y < this.y + this.height &&
               player.y + player.height > this.y;
    }

    // Draws the lever and interaction hint
    draw(ctx) {
        const frameIndex = this.state.current === 'ON' ? 1 : 0; // Select sprite frame based on state

        ctx.drawImage(
            this.image,
            frameIndex * this.frameWidth, // Frame position in sprite sheet
            0,
            this.frameWidth,
            this.frameHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );

        // Display "Press O" hint if a player is interacting
        if (this.interactingPlayer) {
            ctx.fillStyle = '#DCBB12';
            ctx.font = '14px TrajanPro';
            ctx.fillText('Press O', this.x + 5, this.y - 25);
        }
    }

    // Returns true if the lever is in the 'ON' state
    isActive() {
        return this.state.current === 'ON';
    }
}
