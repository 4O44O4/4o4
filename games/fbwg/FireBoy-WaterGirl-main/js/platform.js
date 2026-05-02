class Platform extends Sprite {
    constructor(x, y, width, height) {
        super();
        this.x = x; // X-coordinate of the platform
        this.y = y; // Y-coordinate of the platform
        this.width = width; // Width of the platform
        this.height = height; // Height of the platform
        this.brickWidth = 50; // Width of the brick pattern
        this.brickHeight = height < 25 ? height : 25; // Height of the brick pattern
    }

    // Updates the platform (no specific functionality for now)
    update() {}

    // Draws the platform with a brick-like pattern
    draw(ctx) {
        ctx.fillStyle = `#726834`; // Platform fill color
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.strokeStyle = `#5A522A`; // Platform border color
        ctx.lineWidth = 3;

        // Draw horizontal brick lines
        for (let y = this.y; y < this.y + this.height; y += this.brickHeight) {
            ctx.beginPath();
            ctx.moveTo(this.x, y);
            ctx.lineTo(this.x + this.width, y);
            ctx.stroke();
        }

        // Draw vertical brick lines
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
