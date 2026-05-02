class Rock extends Sprite {
    constructor(x, y, width, height) {
        super();
        this.x = x; // X-coordinate of the rock
        this.y = y; // Y-coordinate of the rock
        this.width = width; // Width of the rock
        this.height = height; // Height of the rock
        this.velocityX = 0; // Horizontal velocity
        this.velocityY = 0; // Vertical velocity
        this.gravity = 0.5; // Gravity affecting the rock
        this.isMoving = false; // Indicates if the rock is moving
        this.pushSpeed = 3; // Speed at which players can push the rock

        this.sprite = new Image(); // Load rock sprite
        this.sprite.src = 'images/rock.png';
    }

    // Updates rock's position and handles interactions
    update(sprites) {
        this.velocityY += this.gravity; // Apply gravity
        this.x += this.velocityX; // Update horizontal position
        this.y += this.velocityY; // Update vertical position
        this.velocityX = 0; // Reset horizontal velocity

        // Handle collisions
        sprites.forEach(sprite => {
            if (sprite instanceof Player && this.checkCollision(sprite)) {
                this.handlePlayerCollision(sprite);
            } else if (sprite instanceof Platform && this.checkCollision(sprite)) {
                this.handlePlatformCollision(sprite);
            }
        });

        return false;
    }

    // Checks collision with another entity
    checkCollision(entity) {
        return this.x < entity.x + entity.width &&
               this.x + this.width > entity.x &&
               this.y < entity.y + entity.height &&
               this.y + this.height > entity.y;
    }

    // Handles collision with a player
    handlePlayerCollision(player) {
        const fromLeft = (player.x + player.width) - this.x;
        const fromRight = (this.x + this.width) - player.x;
        const fromTop = (player.y + player.height) - this.y;
        const fromBottom = (this.y + this.height) - player.y;

        const collisionDirections = [
            { dir: 'left', depth: fromLeft },
            { dir: 'right', depth: fromRight },
            { dir: 'top', depth: fromTop },
            { dir: 'bottom', depth: fromBottom }
        ];

        const minCollision = collisionDirections.reduce((min, curr) => 
            curr.depth < min.depth ? curr : min
        );

        switch (minCollision.dir) {
            case 'left':
                if (player.velocityX > 0) {
                    this.velocityX = this.pushSpeed;
                    player.x = this.x - player.width;
                }
                break;
            case 'right':
                if (player.velocityX < 0) {
                    this.velocityX = -this.pushSpeed;
                    player.x = this.x + this.width;
                }
                break;
            case 'top':
                if (player.velocityY > 0) {
                    player.y = this.y - player.height;
                    player.velocityY = 0;
                    player.isJumping = false;
                }
                break;
            case 'bottom':
                if (player.velocityY < 0) {
                    player.y = this.y + this.height;
                    player.velocityY = 0;
                }
                break;
        }
    }

    // Handles collision with a platform
    handlePlatformCollision(platform) {
        const fromLeft = (this.x + this.width) - platform.x;
        const fromRight = (platform.x + platform.width) - this.x;
        const fromTop = (this.y + this.height) - platform.y;
        const fromBottom = (platform.y + platform.height) - this.y;

        const collisionDirections = [
            { dir: 'left', depth: fromLeft },
            { dir: 'right', depth: fromRight },
            { dir: 'top', depth: fromTop },
            { dir: 'bottom', depth: fromBottom }
        ];

        const minCollision = collisionDirections.reduce((min, curr) => 
            curr.depth < min.depth ? curr : min
        );

        switch (minCollision.dir) {
            case 'left':
                this.x = platform.x - this.width;
                this.velocityX = 0;
                break;
            case 'right':
                this.x = platform.x + platform.width;
                this.velocityX = 0;
                break;
            case 'top':
                this.y = platform.y - this.height;
                this.velocityY = 0;
                break;
            case 'bottom':
                this.y = platform.y + platform.height;
                this.velocityY = 0;
                break;
        }
    }

    // Draws the rock on the canvas
    draw(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
}
