class LevelManager extends Sprite {
    constructor() {
        super();
        this.currentLevel = 1; // The current level the player is on
        this.bgMusic = new Audio('sounds/background.mp3');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.4;

        //Level configuration
        this.levels = {
            1: [
                new Background(),
                new ScoreManager(),
                new Door(625, 95, "fire"),
                new Door(725, 95, "water"),
                new FireBoy(100, 575),
                new WaterGirl(100, 675),
                new Platform(0, 0, 25, 750),
                new Platform(825, 0, 25, 750),
                new Platform(0, 0, 850, 25),
                new Platform(0, 725, 300, 25),
                new Platform(300, 740, 150, 10),
                new Platform(450, 725, 100, 25),
                new Platform(550, 740, 150, 10),
                new Platform(700, 725, 150, 25),
                new Platform(0, 625, 250, 25),
                new Platform(750, 650, 100, 75),
                new Platform(0, 525, 350, 25),
                new Platform(300, 550, 200, 25),
                new Platform(500, 565, 120, 10),
                new Platform(620, 550, 100, 25),
                new Platform(125, 400, 700, 25),
                new Platform(0, 200, 150, 100),
                new Platform(425, 250, 150, 50),
                new Platform(0, 300, 725, 25),
                new Platform(225, 100, 100, 25),
                new Platform(325, 100, 100, 75),
                new Platform(325, 175, 800, 25),
                new Lever(200, 490),
                new LeverMovingBar(25, 400, 100, 25, 75, 'down'),
                new PurpleButton(275, 375),
                new PurpleButton(625, 275),
                new ButtonBar(725, 300, 100, 25, 75, "down"),
                new Rock(500, 200, 50, 50),
                new Gem(610, 675, "water"),
                new Gem(500, 350, "water"),
                new Gem(50, 150, "water"),
                new Gem(550, 125, "water"),
                new Gem(360, 675, "fire"),
                new Gem(200, 350, "fire"),
                new Gem(275, 50, "fire"),
                new River(300, 727, 150, 12, "fire"),
                new River(550, 727, 150, 12, "water"),
                new River(500, 552, 120, 12, "hazard")
            ],
            2: [
                new Background(),
                new ScoreManager(),
                new Door(50, 75, "fire"),
                new Door(150, 75, "water"),
                new FireBoy(50, 675),
                new ButtonBar(475, 150, 125, 25, 125, "left"),
                new WaterGirl(100, 675),
                new Platform(0, 0, 25, 750),
                new Platform(825, 0, 25, 750),
                new Platform(0, 0, 850, 25),
                new Platform(0, 725, 150, 25),
                new Platform(150, 740, 200, 10),
                new Platform(150, 640, 200, 10),
                new Platform(350, 725, 100, 25),
                new Platform(450, 740, 200, 10),
                new Platform(650, 725, 200, 25),
                new Platform(700, 625, 150, 100),
                new Platform(450, 640, 200, 10),
                new Platform(0, 525, 750, 25),
                new Platform(0, 450, 100, 75),
                new Platform(150, 400, 675, 25),
                new Platform(150, 375, 25, 25),
                new Platform(225, 340, 100, 10),
                new Platform(525, 340, 50, 10),
                new Platform(375, 375, 100, 25),
                new Platform(625, 375, 200, 25),
                new Platform(675, 300, 150, 75),
                new Platform(725, 250, 100, 75),
                new Platform(0, 150, 350, 25),
                new Platform(475, 150, 150, 25),
                new Platform(575, 175, 150, 25),
                new Gem(280, 675, "fire"),
                new Gem(175, 675, "fire"),
                new Gem(280, 575, "water"),
                new Gem(175, 575, "water"),
                new Gem(475, 675, "water"),
                new Gem(580, 675, "water"),
                new Gem(475, 575, "fire"),
                new Gem(580, 575, "fire"),
                new Gem(580, 460, "fire"),
                new Gem(475, 460, "water"),
                new Gem(335, 460, "fire"),
                new Gem(230, 460, "water"),
                new Gem(430, 320, "water"),
                new Gem(382, 320, "fire"),
                new Gem(425, 100, "water"),
                new Gem(370, 100, "fire"),
                new River(150, 727, 200, 12, "fire"),
                new River(450, 627, 200, 12, "fire"),
                new River(450, 727, 200, 12, "water"),
                new River(150, 627, 200, 12, "water"),
                new River(175, 387, 200, 12, "hazard"),
                new River(475, 387, 150, 12, "hazard"),
                new GreenButton(650, 500),
                new VerticalButtonBar(412, 425, 25, 100, 100, 'up'),
                new GreenButton(150, 500),
                new PurpleButton(550, 125),
                new PurpleButton(250, 125),
            ]
        };
    }

    // Load a level by its number
    loadLevel(level) {
        if (this.levels[level]) {
            this.currentLevel = level;
            game.sprites = [];
            game.sprites.push(...this.levels[level]);
            game.addSprite(this);
            game.addSprite(new RestartManager(game.sprites));
            game.addSprite(new GameStateManager());
            this.bgMusic.play();
        }
    }

    // Restart the current level
    restartLevel() {
        this.loadLevel(this.currentLevel);
    }

    // Load the next level
    nextLevel() {
        const nextLevel = this.currentLevel + 1;
        if (this.levels[nextLevel]) {
            this.loadLevel(nextLevel);
        }
    }

    // Update the level manager
    update(sprites, keys) {
        const gameStateManager = sprites.find(sprite => sprite instanceof GameStateManager);
        
        if (gameStateManager) {
            switch(gameStateManager.state.current) {
                case 'GAME_OVER':
                    if (keys['r']) {
                        this.restartLevel();
                        return true;
                    }
                    break;
                    
                case 'WIN':
                    if (keys['n']) {
                        this.nextLevel();
                        return true;
                    }
                    break;
            }
        }
        return false;
    }
}