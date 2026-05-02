class InteractivePlatform extends Platform {
    constructor(x, y, width, height, moveDistance, config) {
        super(x, y, width, height); // Calls the parent Platform constructor
        this.initialX = x; // Initial X position
        this.initialY = y; // Initial Y position
        this.moveDistance = moveDistance; // Distance the platform moves
        this.moveSpeed = config.moveSpeed || 3; // Speed of movement
        this.direction = config.direction; // Direction of movement
        this.spriteSheet = new Image(); // Sprite image for the platform
        this.spriteSheet.src = config.spriteSheetPath; // Path to the sprite sheet
        this.activatorType = config.activatorType; // Type of activator (e.g., Button, Lever)
        this.isRotated = config.isRotated || false; // Whether the platform is rotated
        this.state = {
            current: 'INITIAL', // Current state of the platform
            INITIAL: 'MOVED',
            MOVED: 'INITIAL'
        };
        this.targetPos = { x: this.initialX, y: this.initialY }; // Target position for movement
    }

    // Checks if the platform is activated by its activator
    isActivated(sprites) {
        if (!sprites) return false;

        switch (this.activatorType.name) {
            case 'PurpleButton':
            case 'GreenButton':
                return sprites.some(sprite => 
                    sprite instanceof this.activatorType && sprite.isPressed
                );
            case 'Lever':
                return sprites.some(sprite => 
                    sprite instanceof Lever && sprite.state.current === 'ON'
                );
            default:
                return false;
        }
    }

    // Determines the target position based on activation state
    getTargetPosition(isActivated) {
        const positions = {
            up: { x: this.initialX, y: isActivated ? this.initialY - this.moveDistance : this.initialY },
            down: { x: this.initialX, y: isActivated ? this.initialY + this.moveDistance : this.initialY },
            left: { x: isActivated ? this.initialX - this.moveDistance : this.initialX, y: this.initialY },
            right: { x: isActivated ? this.initialX + this.moveDistance : this.initialX, y: this.initialY }
        };
        return positions[this.direction] || { x: this.initialX, y: this.initialY };
    }

    // Updates the platform's position
    updatePosition(targetX, targetY, previousX, previousY) {
        const deltaX = targetX !== this.x ? 
            (this.x < targetX ? this.moveSpeed : -this.moveSpeed) : 0;
        const deltaY = targetY !== this.y ? 
            (this.y < targetY ? this.moveSpeed : -this.moveSpeed) : 0;

        if (deltaX) {
            this.x += deltaX;
            if (Math.abs(this.x - targetX) < this.moveSpeed) {
                this.x = targetX;
            }
        }

        if (deltaY) {
            this.y += deltaY;
            if (Math.abs(this.y - targetY) < this.moveSpeed) {
                this.y = targetY;
            }
        }

        return {
            deltaX: this.x - previousX,
            deltaY: this.y - previousY
        };
    }

    // Moves players standing on the platform
    movePlayersOnPlatform(sprites, deltaX, deltaY) {
        if (!sprites) return;

        sprites.forEach(sprite => {
            if ((sprite instanceof FireBoy || sprite instanceof WaterGirl) && 
                this.detectCollision(sprite) && 
                sprite.y + sprite.height <= this.y + 3) {
                sprite.x += deltaX;
                sprite.y += deltaY;
            }
        });
    }

    // Updates the platform state and position
    update(sprites) {
        const isActivated = this.isActivated(sprites);
        const previousX = this.x;
        const previousY = this.y;

        this.targetPos = this.getTargetPosition(isActivated);

        const { deltaX, deltaY } = this.updatePosition(
            this.targetPos.x, 
            this.targetPos.y, 
            previousX, 
            previousY
        );

        this.movePlayersOnPlatform(sprites, deltaX, deltaY);
        this.state.current = isActivated ? 'MOVED' : 'INITIAL';

        return false;
    }

    // Detects collision with a player
    detectCollision(player) {
        return player.x < this.x + this.width &&
               player.x + player.width > this.x &&
               player.y < this.y + this.height &&
               player.y + player.height > this.y;
    }

    // Draws the platform on the canvas
    draw(ctx) {
        const frameOffset = this.state.current === 'MOVED' ? 250 : 0;

        if (this.isRotated) {
            ctx.save();
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            ctx.rotate(Math.PI / 2);
            ctx.drawImage(
                this.spriteSheet,
                frameOffset,
                0,
                250,
                50,
                -this.height / 2,
                -this.width / 2,
                this.height,
                this.width
            );
            ctx.restore();
        } else {
            ctx.drawImage(
                this.spriteSheet,
                frameOffset,
                0,
                250,
                50,
                this.x,
                this.y,
                this.width,
                this.height
            );
        }
    }
}

class ButtonBar extends InteractivePlatform {
    constructor(x, y, width, height, moveDistance, direction) {
        super(x, y, width, height, moveDistance, {
            direction,
            spriteSheetPath: 'images/barpurple.png',
            activatorType: PurpleButton,
            moveSpeed: 3
        });
    }
}

class VerticalButtonBar extends InteractivePlatform {
    constructor(x, y, width, height, moveDistance, direction) {
        super(x, y, width, height, moveDistance, {
            direction,
            spriteSheetPath: 'images/greenbar.png',
            activatorType: GreenButton,
            isRotated: true,
            moveSpeed: 3
        });
    }
}

class LeverMovingBar extends InteractivePlatform {
    constructor(x, y, width, height, moveDistance, direction) {
        super(x, y, width, height, moveDistance, {
            direction,
            spriteSheetPath: 'images/bar.png',
            activatorType: Lever,
            moveSpeed: 2
        });
    }
}
