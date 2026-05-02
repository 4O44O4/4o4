class Player extends Sprite {
    constructor(x, y, type) {
        super();
        this.x = x; // X-coordinate of the player
        this.y = y; // Y-coordinate of the player
        this.type = type; // Type of player (e.g., 'fire' or 'water')
        this.width = 35; // Width of the player
        this.height = 35; // Height of the player
        this.velocityX = 0; // Horizontal velocity
        this.velocityY = 0; // Vertical velocity
        this.isJumping = false; // Indicates if the player is jumping
        this.gravity = 0.5; // Gravity affecting the player
        this.jumpForce = -10; // Jump force applied when jumping
        this.moveSpeed = 4; // Speed of horizontal movement
    }

    // Updates the player's position, collisions, and interactions
    update(sprites, keys) {
        this.velocityY += this.gravity; // Apply gravity
        this.handleMovement(keys); // Handle input for movement
        this.updatePosition(); // Update position based on velocity
        this.checkBoundaries(); // Ensure player stays within bounds
        this.handleCollisions(sprites); // Handle collisions with platforms
        return false;
    }

    // Handles player movement based on input keys
    handleMovement(keys) {
        // To be implemented by subclasses like FireBoy or WaterGirl
    }

    // Updates the player's position based on velocity
    updatePosition() {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    // Checks and enforces boundaries for the player's position
    checkBoundaries() {
        if (this.x < 0) {
            this.x = 0;
            this.velocityX = 0;
        } else if (this.x + this.width > 850) {
            this.x = 850 - this.width;
            this.velocityX = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.velocityY = 0;
        } else if (this.y + this.height > 750) {
            this.y = 750 - this.height;
            this.velocityY = 0;
            this.isJumping = false; // Reset jump state when grounded
        }
    }

    // Handles collisions with other sprites
    handleCollisions(sprites) {
        sprites.forEach(sprite => {
            if (sprite instanceof Platform && this.checkCollision(sprite)) {
                this.handlePlatformCollision(sprite);
            }
        });
    }

    // Checks collision with a platform
    checkCollision(platform) {
        return this.x < platform.x + platform.width &&
               this.x + this.width > platform.x &&
               this.y < platform.y + platform.height &&
               this.y + this.height > platform.y;
    }

    // Handles collision resolution with a platform
    handlePlatformCollision(platform) {
        if (this.velocityY > 0 && 
            this.y + this.height - this.velocityY <= platform.y) {
            // Collision from above
            this.y = platform.y - this.height;
            this.velocityY = 0;
            this.isJumping = false;
        } else if (this.velocityY < 0 && 
                   this.y - this.velocityY >= platform.y + platform.height) {
            // Collision from below
            this.y = platform.y + platform.height;
            this.velocityY = 0;
        } else {
            // Horizontal collision
            if (this.velocityX > 0) {
                this.x = platform.x - this.width;
            } else if (this.velocityX < 0) {
                this.x = platform.x + platform.width;
            }
            this.velocityX = 0;
        }
    }
}
