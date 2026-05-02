class River extends Sprite {
    constructor(x, y, width, height, type) {
        super();
        this.x = x; // X-coordinate of the river
        this.y = y; // Y-coordinate of the river
        this.width = width; // Width of the river
        this.height = height; // Height of the river
        this.type = type; // Type of river ('fire', 'water', or 'hazard')
        this.waveOffset = 3; // Wave animation offset
        this.waveSpeed = 0.1; // Speed of wave animation

        this.deathSound = new Audio('sounds/death.mp3'); // Sound for player death
        this.riverSound = new Audio('sounds/river.mp3'); // Background river sound
        this.riverSound.volume = 0.3; // Adjust river sound volume
    }

    // Updates wave animation and checks for collisions with players
    update(sprites) {
        this.waveOffset += this.waveSpeed;

        const gameStateManager = sprites.find(sprite => 
            sprite instanceof GameStateManager
        );

        if (gameStateManager && gameStateManager.state.current === 'PLAYING') {
            sprites.forEach(sprite => {
                if (sprite instanceof Player) {
                    if (this.type === 'hazard' || sprite.type !== this.type) {
                        // Hazard or incorrect player type
                        if (this.checkCollision(sprite)) {
                            this.deathSound.play();
                            gameStateManager.gameOver(sprites);
                        }
                    } else {
                        // Correct player type
                        if (this.checkCollision(sprite)) {
                            if (!this.riverSound.paused) {
                                this.riverSound.pause();
                            } else {
                                this.riverSound.play();
                            }
                        }
                    }
                }
            });
        }
        return false;
    }

    // Checks collision with a player
    checkCollision(player) {
        return this.x < player.x + player.width &&
               this.x + this.width > player.x &&
               this.y < player.y + player.height &&
               this.y + this.height > player.y;
    }

    // Draws the river with wave animation
    draw(ctx) {
        ctx.globalAlpha = 0.6; // Make river semi-transparent

        const colors = {
            fire: '#ff0000',
            water: '#0088ff',
            hazard: '#00ff00'
        };

        ctx.fillStyle = colors[this.type] || '#ffffff';

        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.height);

        for (let x = 0; x <= this.width; x += 10) {
            ctx.lineTo(
                this.x + x, 
                this.y + Math.sin(x * 0.2 + this.waveOffset) * 3
            );
        }
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.fill();

        ctx.globalAlpha = 1; // Reset transparency
    }
}
