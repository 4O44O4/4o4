class WaterGirl extends Player {
    constructor(x, y) {
        super(x, y, 'water'); // Initialize with position and type 'water'

        // Load sprites for animations
        this.sprites = {
            body: new Image(), // Body sprite
            walkFace: new Image(), // Walking face sprite
            idleFace: new Image() // Idle face sprite
        };
        this.sprites.body.src = 'images/water/body.png';
        this.sprites.walkFace.src = 'images/water/face-walking.png';
        this.sprites.idleFace.src = 'images/water/face-idle.png';

        // Frame dimensions for different animations
        this.frameWidth = 105; // Body frame width
        this.frameHeight = 95; // Body frame height
        this.walkFaceWidth = 380; // Walking face frame width
        this.walkFaceHeight = 215; // Walking face frame height
        this.idleFaceWidth = 210; // Idle face frame width
        this.idleFaceHeight = 255; // Idle face frame height

        // Frame management
        this.bodyFrame = 0; // Current body frame index
        this.walkFaceFrame = 0; // Current walking face frame index
        this.idleFaceFrame = 0; // Current idle face frame index
        this.maxBodyFrames = 8; // Total body frames
        this.maxWalkFaceFrames = 7; // Total walking face frames
        this.maxIdleFaceFrames = 5; // Total idle face frames

        this.frameInterval = 120; // Time between frame updates (ms)
        this.lastFrameUpdate = 0; // Timestamp of last frame update

        // Additional properties
        this.faceOffsetY = -20; // Vertical offset for face sprite
        this.isMoving = false; // Movement state
        this.direction = 1; // Direction: 1 = right, -1 = left

        this.jumpSound = new Audio('sounds/jump.mp3'); // Sound for jumping
    }

    // Handles movement input for WaterGirl
    handleMovement(keys) {
        this.isMoving = false; // Reset movement state
        if (keys['a']) {
            // Move left
            this.velocityX = -this.moveSpeed;
            this.direction = -1; // Set direction to left
            this.isMoving = true;
        } else if (keys['d']) {
            // Move right
            this.velocityX = this.moveSpeed;
            this.direction = 1; // Set direction to right
            this.isMoving = true;
        } else {
            // Stop horizontal movement
            this.velocityX = 0;
            this.bodyFrame = 0; // Reset body frame
        }

        if (keys['w'] && !this.isJumping) {
            // Jump
            this.velocityY = this.jumpForce;
            this.isJumping = true;
            this.jumpSound.play(); // Play jump sound
        }
    }

    // Draws WaterGirl on the canvas with animations
    draw(ctx) {
        const currentTime = Date.now();
        if (currentTime - this.lastFrameUpdate > this.frameInterval) {
            // Update frames based on movement state
            if (this.isMoving) {
                this.bodyFrame = (this.bodyFrame + 1) % this.maxBodyFrames + 1;
                this.walkFaceFrame = (this.walkFaceFrame + 1) % this.maxWalkFaceFrames;
            }
            this.idleFaceFrame = (this.idleFaceFrame + 1) % this.maxIdleFaceFrames;
            this.lastFrameUpdate = currentTime; // Update last frame time
        }

        ctx.save();

        // Flip horizontally if moving left
        if (this.direction === -1) {
            ctx.scale(-1, 1);
            ctx.translate(-this.x * 2 - this.width, 0);
        }

        // Draw body sprite
        ctx.drawImage(
            this.sprites.body,
            this.bodyFrame * this.frameWidth, // Frame position in sprite sheet
            0,
            this.frameWidth,
            this.frameHeight,
            this.x,
            this.y + 10, // Slight vertical offset
            30,
            25 // Scaled dimensions for rendering
        );

        if (this.isMoving) {
            // Draw walking face sprite if moving
            ctx.drawImage(
                this.sprites.walkFace,
                this.walkFaceFrame * this.walkFaceWidth, // Frame position in sprite sheet
                0,
                this.walkFaceWidth,
                this.walkFaceHeight,
                this.x - 15, // Horizontal offset
                this.y + this.faceOffsetY, // Vertical offset
                50,
                this.width // Scaled dimensions for rendering
            );
        } else {
            // Draw idle face sprite if not moving
            ctx.drawImage(
                this.sprites.idleFace,
                this.idleFaceFrame * this.idleFaceWidth, // Frame position in sprite sheet
                0,
                this.idleFaceWidth,
                this.idleFaceHeight,
                this.x - 5, // Horizontal offset
                this.y + this.faceOffsetY, // Vertical offset
                40,
                40 // Scaled dimensions for rendering
            );
        }

        ctx.restore(); // Restore canvas state
    }
}
