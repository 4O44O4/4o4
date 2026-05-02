class FireBoy extends Player {
    constructor(x, y) {
        super(x, y, 'fire'); // Initialize FireBoy with position and type 'fire'

        // Sprites for different animations
        this.sprites = {
            body: new Image(),
            walkFace: new Image(),
            idleFace: new Image()
        };
        this.sprites.body.src = 'images/fire/body.png';
        this.sprites.walkFace.src = 'images/fire/face-walking.png';
        this.sprites.idleFace.src = 'images/fire/face-idle.png';

        // Frame dimensions for animations
        this.frameWidth = 105;
        this.frameHeight = 95;
        this.walkFaceWidth = 340;
        this.walkFaceHeight = 245;
        this.idleFaceWidth = 230;
        this.idleFaceHeight = 355;

        // Frame management
        this.bodyFrame = 0;
        this.walkFaceFrame = 0;
        this.idleFaceFrame = 0;
        this.maxBodyFrames = 8;
        this.maxWalkFaceFrames = 5;
        this.maxIdleFaceFrames = 5;

        // Animation timing
        this.frameInterval = 120;
        this.lastFrameUpdate = 0;

        // Additional properties
        this.faceOffsetY = -25; // Offset for the face sprite
        this.isMoving = false; // Tracks movement state
        this.direction = 1; // Movement direction: 1 = right, -1 = left

        // Sound for jumping
        this.jumpSound = new Audio('sounds/jump.mp3');
    }

    // Handles movement and jumping based on input keys
    handleMovement(keys) {
        this.isMoving = false;
        if (keys['ArrowLeft']) {
            this.velocityX = -this.moveSpeed;
            this.direction = -1;
            this.isMoving = true;
        } else if (keys['ArrowRight']) {
            this.velocityX = this.moveSpeed;
            this.direction = 1;
            this.isMoving = true;
        } else {
            this.velocityX = 0;
            this.bodyFrame = 0;
        }

        if (keys['ArrowUp'] && !this.isJumping) {
            this.jumpSound.play();
            this.velocityY = this.jumpForce;
            this.isJumping = true;
        }
    }

    // Draws the character and handles animations
    draw(ctx) {
        const currentTime = Date.now();
        if (currentTime - this.lastFrameUpdate > this.frameInterval) {
            if (this.isMoving) {
                this.bodyFrame = (this.bodyFrame + 1) % this.maxBodyFrames + 1;
                this.walkFaceFrame = (this.walkFaceFrame + 1) % this.maxWalkFaceFrames;
            }
            this.idleFaceFrame = (this.idleFaceFrame + 1) % this.maxIdleFaceFrames;
            this.lastFrameUpdate = currentTime;
        }

        ctx.save();

        // Flip horizontally if moving left
        if (this.direction === -1) {
            ctx.scale(-1, 1);
            ctx.translate(-this.x * 2 - this.width, 0);
        }

        // Draw the body sprite
        ctx.drawImage(
            this.sprites.body,
            this.bodyFrame * this.frameWidth,
            0,
            this.frameWidth,
            this.frameHeight,
            this.x,
            this.y + 10,
            30,
            25
        );

        // Draw the face sprite based on movement
        if (this.isMoving) {
            ctx.drawImage(
                this.sprites.walkFace,
                this.walkFaceFrame * this.walkFaceWidth,
                0,
                this.walkFaceWidth,
                this.walkFaceHeight,
                this.x - 15,
                this.y - 15,
                50,
                this.width
            );
        } else {
            ctx.drawImage(
                this.sprites.idleFace,
                this.idleFaceFrame * this.idleFaceWidth,
                0,
                this.idleFaceWidth,
                this.idleFaceHeight,
                this.x - 5,
                this.y + this.faceOffsetY,
                40,
                45
            );
        }

        ctx.restore();
    }
}
