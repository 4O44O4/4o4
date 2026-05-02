class Gem extends Sprite {
    constructor(x, y, type) {
        super();
        this.x = x; // X-coordinate of the gem
        this.y = y; // Y-coordinate of the gem
        this.originalY = y; // Original Y-coordinate for floating effect
        this.width = 35; // Width of the gem
        this.height = 35; // Height of the gem
        this.type = type; // Type of gem ('fire' or 'water')
        this.collected = false; // Indicates if the gem has been collected
        this.moveSpeed = 0.07; // Speed of floating animation
        this.maxOffset = 5; // Maximum floating offset
        this.offset = 0; // Current floating offset
        this.movingUp = true; // Direction of floating movement
        this.glowIntensity = 1; // Intensity of gem glow

        this.spriteSheet = new Image(); // Sprite sheet for gem visuals
        this.spriteSheet.src = 'images/gems.png';

        this.collectSound = new Audio('sounds/gem.mp3'); // Sound played on collection
    }

    // Updates gem floating and handles collection by players
    update(sprites) {
        if (this.collected) return true;

        // Update floating effect
        if (this.movingUp) {
            this.offset += this.moveSpeed;
            if (this.offset >= this.maxOffset) {
                this.movingUp = false;
            }
        } else {
            this.offset -= this.moveSpeed;
            if (this.offset <= -this.maxOffset) {
                this.movingUp = true;
            }
        }

        this.y = this.originalY + this.offset;

        // Check for collision with players
        sprites.forEach(sprite => {
            if (sprite instanceof WaterGirl || sprite instanceof FireBoy) {
                if (sprite.type === this.type && this.checkCollision(sprite)) {
                    this.collected = true;
                    this.collectSound.play();
                    const scoreManager = sprites.find(s => s instanceof ScoreManager);
                    if (scoreManager) scoreManager.addScore(100);
                }
            }
        });
        return false;
    }

    // Checks collision with a player
    checkCollision(player) {
        return this.x < player.x + player.width &&
               this.x + this.width > player.x &&
               this.y < player.y + player.height &&
               this.y + this.height > player.y;
    }

    // Draws the gem with a glowing effect
    draw(ctx) {
        if (!this.collected) {
            const baseColor = this.type === 'fire' ? 
                { r: 255, g: 0, b: 0 } : 
                { r: 0, g: 255, b: 255 };

            const glowSize = 30;
            const gradient = ctx.createRadialGradient(
                this.x + this.width / 2, this.y + this.height / 2, 0,
                this.x + this.width / 2, this.y + this.height / 2, glowSize
            );

            gradient.addColorStop(0, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${0.5 * this.glowIntensity})`);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(
                this.x - glowSize,
                this.y - glowSize,
                this.width + glowSize * 2,
                this.height + glowSize * 2
            );

            const sourceX = this.type === 'water' ? 0 : 24;
            ctx.drawImage(
                this.spriteSheet,
                sourceX, 0,    
                24, 24,      
                this.x, this.y,
                this.width, this.height
            );
        }
    }
}
