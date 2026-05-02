const game = new Game(); // Creates the game instance
const menu = new MenuScreen(); // Creates a menu screen instance
const fontFace = new FontFace('TrajanPro', 'url(fonts/TrajanPro-Bold.otf)'); // Loads a custom font
fontFace.load().then(font => {
    document.fonts.add(font); // Adds the loaded font to the document
});
game.addSprite(menu); // Adds the menu to the game's sprites
game.animate(); // Starts the game's animation loop
