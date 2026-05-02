class ScoreManager extends Sprite {
    constructor() {
        super();
        this.state = {
            current: 'WAITING', // Default state
            WAITING: 'RUNNING',
            RUNNING: 'PAUSED',
            PAUSED: 'RUNNING'
        };
        this.score = 0; // Current score
        this.startTime = null; // Start time of the game
        this.pauseTime = null; // Time when the game was paused
        this.elapsedTime = 0; // Total elapsed time
        this.finalTime = null; // Final time when the game ends
    }

    // Updates the score and game time
    update(sprites, keys) {
        const gameStateManager = sprites.find(sprite => 
            sprite instanceof GameStateManager
        );

        if (gameStateManager && 
            (gameStateManager.state.current === 'GAME_OVER' || 
             gameStateManager.state.current === 'WIN')) {
            if (this.finalTime === null) {
                this.finalTime = this.elapsedTime; // Record final time
            }
            return false;
        }

        if (this.state.current === 'WAITING' && 
            (keys['ArrowRight'] || keys['ArrowLeft'] || keys['a'] || keys['d'])) {
            // Start the game when movement keys are pressed
            this.state.current = this.state[this.state.current];
            this.startTime = Date.now();
        }

        if (keys['p'] && this.state.current !== 'WAITING') {
            // Pause or resume the game
            this.state.current = this.state[this.state.current];
            if (this.state.current === 'PAUSED') {
                this.pauseTime = Date.now();
            } else if (this.pauseTime) {
                this.startTime += Date.now() - this.pauseTime; // Adjust start time
            }
        }

        if (this.state.current === 'RUNNING' && this.startTime) {
            this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000); // Update elapsed time
        }

        return false;
    }

    // Formats the elapsed time into minutes:seconds
    formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Draws the score and elapsed time
    draw(ctx) {
        ctx.save();
        ctx.font = 'bold 20px TrajanPro';
        ctx.fillStyle = '#DCBB12';
        ctx.textAlign = 'left';
        ctx.fillText(`Score: ${this.score}`, 30, 50);

        const displayTime = this.finalTime !== null ? this.finalTime : this.elapsedTime;
        ctx.fillText(`Time: ${this.formatTime(displayTime)}`, 700, 50);

        ctx.restore();
    }

    // Adds points to the score
    addScore(points) {
        this.score += points;
    }
}
