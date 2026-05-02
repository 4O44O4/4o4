class RestartManager extends Sprite {
    constructor(levelSprites) {
        super();
        this.levelSprites = this.cloneLevelData(levelSprites);
        this.bindRestartEvent();
    }

    cloneLevelData(sprites) {
        return sprites.map(sprite => {
            const { constructor: SpriteType, x, y, width, height, type, moveDistance, direction } = sprite;
            switch(true) {
                case sprite instanceof Background: return new SpriteType();
                case sprite instanceof ScoreManager: return new SpriteType();
                case sprite instanceof ScoreManager: return new SpriteType();
                case sprite instanceof Platform: return new SpriteType(x, y, width, height);
                case sprite instanceof Lever: return new SpriteType(x, y);
                case sprite instanceof PurpleButton: return new SpriteType(x, y);
                case sprite instanceof GreenButton: return new SpriteType(x, y);
                case sprite instanceof LeverMovingBar: return new SpriteType(x, y, width, height, moveDistance, direction);
                case sprite instanceof VerticalButtonBar: return new SpriteType(x, y, width, height, moveDistance, direction);
                case sprite instanceof ButtonBar: return new SpriteType(x, y, width, height, moveDistance, direction);
                case sprite instanceof River: return new SpriteType(x, y, width, height, type);
                case sprite instanceof Gem: return new SpriteType(x, y, type);
                case sprite instanceof Door: return new SpriteType(x, y, type);
                case sprite instanceof Rock: return new SpriteType(x, y, width, height);
                case sprite instanceof FireBoy: return new SpriteType(x, y);
                case sprite instanceof WaterGirl: return new SpriteType(x, y);
                default: return null;
            }
        }).filter(Boolean);
    }

    //sorry for using this but it didnt work otherwise
    bindRestartEvent() {
        document.addEventListener('keydown', e => {
            if (e.key === 'r') this.restartLevel();
        });
    }

    restartLevel() {
        game.sprites = this.cloneLevelData(this.levelSprites);
        game.addSprite(this);
        game.addSprite(new GameStateManager());
    }

    update(keys) {
        //this didnt work
        // if(keys['r']) {
        //     this.restartLevel();
        //     return true;
        // }
        return false;
    }
}