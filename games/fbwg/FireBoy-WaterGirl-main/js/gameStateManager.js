class GameStateManager extends Sprite {
    constructor() {
        super();
        // Define game states
        this.state = {
            current: 'PLAYING', // Default state
            PLAYING: 'PLAYING',
            GAME_OVER: 'GAME_OVER',
            WIN: 'WIN'
        };

        this.finalScore = 0; // Store the final score
        this.finalTime = 0; // Store the elapsed time
        this.gotonextLevel = false; // Tracks if the next level should be triggered
    }

    // Updates the game state based on conditions
    update(sprites, keys) {
        if (this.gotonextLevel) {
            return true;
        }

        switch (this.state.current) {
            case 'PLAYING':
                const doors = sprites.filter(sprite => sprite instanceof Door);
                const allPlayersAtDoors = doors.every(door => {
                    const matchingPlayer = sprites.find(sprite => 
                        (sprite instanceof FireBoy && door.type === 'fire') ||
                        (sprite instanceof WaterGirl && door.type === 'water')
                    );
                    if (!matchingPlayer) return false;

                    const distance = Math.sqrt(
                        Math.pow(door.x - matchingPlayer.x, 2) + 
                        Math.pow(door.y - matchingPlayer.y, 2)
                    );
                    return distance < 100;
                });

                if (allPlayersAtDoors) {
                    this.win(sprites);
                }
                break;

            case 'GAME_OVER':
            case 'WIN':
                sprites.forEach(sprite => {
                    if (sprite instanceof Player) {
                        sprite.velocityX = 0;
                        sprite.velocityY = 0;
                    }
                });
                break;
        }
        return false;
    }

    // Handles game-over logic
    gameOver(sprites) {
        if (this.state.current !== 'GAME_OVER') {
            const scoreManager = sprites.find(sprite => sprite instanceof ScoreManager);
            if (scoreManager) {
                this.finalScore = scoreManager.score;
                this.finalTime = scoreManager.elapsedTime;
                scoreManager.state.current = 'PAUSED';
            }
            this.state.current = 'GAME_OVER';
        }
    }

    // Handles winning logic
    win(sprites) {
        if (this.state.current !== 'WIN') {
            const scoreManager = sprites.find(sprite => sprite instanceof ScoreManager);
            if (scoreManager) {
                this.finalScore = scoreManager.score;
                this.finalTime = scoreManager.elapsedTime;
                scoreManager.state.current = 'PAUSED';
            }
            this.state.current = 'WIN';
        }
    }

    // Draws overlays for different game states
    draw(ctx) {
        switch (this.state.current) {
            case 'GAME_OVER':
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(0, 0, 850, 750);

                ctx.font = '48px TrajanPro';
                ctx.fillStyle = '#DCBB12';
                ctx.textAlign = 'center';
                ctx.fillText('Game Over!', 425, 300);

                ctx.font = '24px TrajanPro';
                ctx.fillText('Press R to restart', 425, 400);
                break;

            case 'WIN':
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(0, 0, 850, 750);

                ctx.font = '48px TrajanPro';
                ctx.fillStyle = '#DCBB12';
                ctx.textAlign = 'center';
                ctx.fillText('Level Complete!', 425, 300);

                ctx.font = '32px TrajanPro';
                ctx.fillText(`Final Score: ${this.finalScore}`, 425, 370);
                const minutes = Math.floor(this.finalTime / 60);
                const seconds = this.finalTime % 60;
                const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                ctx.fillText(`Time: ${timeString}`, 425, 420);

                ctx.font = '24px TrajanPro';
                ctx.fillText('Press N for next level', 425, 490);
                break;
        }
    }
}
