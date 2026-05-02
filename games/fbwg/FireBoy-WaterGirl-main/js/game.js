class Sprite {
    constructor() { }

    update() { }

    draw(ctx) { }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.sprites = [];
        this.keys = {};
        this.paused = false;
        this.resetart = false;
        this.bindKeyboardEvents();
    }
    addSprite(sprite) {
        this.sprites.push(sprite);
    }
    update() {
        if (this.restart) {
            this.restart = false;
            this.paused = false;
            this.sprites = [];
        }
        if (this.paused) return;

        let updatedSprites = [];
        for (let i = 0; i < this.sprites.length; i++) {
            let sprite = this.sprites[i];

            if (!sprite.update(this.sprites, this.keys)) {
                updatedSprites.push(sprite);
            }
        }
        this.sprites = updatedSprites;
    }
 

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.sprites.forEach(sprite => sprite.draw(this.ctx));
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    bindKeyboardEvents() {
        // Handle keydown event
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true; // Mark the key as active

            // Handle pause and continue keys
            if (e.key === 'p') {
                this.paused = true; // Pause the game
            }
            if (e.key === 'c') {
                this.paused = false; // Resume the game
            }
        });

        // Handle keyup event
        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false; // Mark the key as inactive
        });
    }
}