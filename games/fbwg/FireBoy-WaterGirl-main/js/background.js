class Background extends Sprite {
    constructor() {
        super();
        this.x = 0; // X-coordinate for the background's starting position
        this.y = 0; // Y-coordinate for the background's starting position
        this.width = 850; // Width of the background
        this.height = 750; // Height of the background
        this.brickWidth = 50; // Width of each brick in the grid
        this.brickHeight = 25; // Height of each brick in the grid
    }

    // Draws the background with a grid pattern resembling bricks
    draw(ctx) {
        ctx.fillStyle = '#2D2D0C'; // Background fill color
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.strokeStyle = '#202200'; // Brick outline color
        ctx.lineWidth = 3; // Width of brick grid lines

        // Horizontal grid lines
        for (let y = this.y; y < this.y + this.height; y += this.brickHeight) {
            ctx.beginPath();
            ctx.moveTo(this.x, y);
            ctx.lineTo(this.x + this.width, y);
            ctx.stroke();
        }

        // Vertical grid lines (staggered for brick effect)
        for (let y = this.y; y < this.y + this.height; y += this.brickHeight) {
            const offset = ((y - this.y) / this.brickHeight % 2) * (this.brickWidth / 2);
            for (let x = this.x + offset; x < this.x + this.width; x += this.brickWidth) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + this.brickHeight);
                ctx.stroke();
            }
        }
    }
}
