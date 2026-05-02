class Door extends Sprite {
    constructor(x, y, type) {
        super();
        this.x = x; // X-coordinate of the door's position
        this.y = y; // Y-coordinate of the door's position
        this.width = 70; // Door width
        this.height = 81; // Door height
        this.type = type; // Door type ('fire' or 'water')
        this.doorSound = new Audio('sounds/door.mp3'); // Sound played when the door state changes

        // Animation properties
        this.spriteSheet = new Image(); // Door sprite sheet
        this.spriteSheet.src = 'images/doors.png'; // Path to sprite sheet
        this.frameWidth = 111; // Width of each frame in the sprite sheet
        this.frameHeight = 120; // Height of each frame
        this.totalFrames = 18; // Total frames in the animation
        this.currentFrame = 0; // Current animation frame
        this.frameInterval = 30; // Time (ms) between frame updates
        this.lastFrameUpdate = 0; // Timestamp of last frame update

        // Door state (e.g., 'CLOSED', 'OPENING')
        this.state = {
            current: 'CLOSED',
            CLOSED: { startFrame: 17, endFrame: 0, direction: -1 },
            OPENING: { startFrame: 0, endFrame: 17, direction: 1 },
        };
    }

    // Updates the door's state based on player proximity and animates frames
    update(sprites) {
        let playerNearby = false;

        // Check proximity of the appropriate player type
        sprites.forEach(sprite => {
            if ((sprite instanceof FireBoy && this.type === 'fire') ||
                (sprite instanceof WaterGirl && this.type === 'water')) {
                const distance = Math.sqrt(
                    Math.pow(this.x - sprite.x, 2) +
                    Math.pow(this.y - sprite.y, 2)
                );
                if (distance < 100) { // Adjust detection range
                    playerNearby = true;
                }
            }
        });

        const currentState = this.state.current;
        const currentTime = Date.now();

        // Change state and play sound when conditions are met
        if (playerNearby && currentState === 'CLOSED') {
            this.doorSound.play();
            this.state.current = 'OPENING';
        } else if (!playerNearby && currentState === 'OPENING' &&
                   this.currentFrame === this.state[currentState].endFrame) {
            this.doorSound.play();
            this.state.current = 'CLOSED';
        }

        // Update animation frames
        if (currentTime - this.lastFrameUpdate > this.frameInterval) {
            const stateConfig = this.state[this.state.current];
            if (this.currentFrame !== stateConfig.endFrame) {
                this.currentFrame += stateConfig.direction;
            }
            this.lastFrameUpdate = currentTime;
        }

        return false; // No specific action returned
    }

    // Draws the door with the current animation frame
    draw(ctx) {
        ctx.drawImage(
            this.spriteSheet,
            this.currentFrame * this.frameWidth, // Frame position in sprite sheet
            this.type === 'fire' ? 0 : this.frameHeight, // Row selection based on type
            this.frameWidth,  // Frame width
            this.frameHeight, // Frame height
            this.x,           // Door position X
            this.y,           // Door position Y
            this.width,       // Door display width
            this.height       // Door display height
        );
    }
}
