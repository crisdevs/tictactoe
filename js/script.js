const game = new Game();
//Grabs all the playable squares
const boxes = document.querySelectorAll("div[class^='square']");
const turnNotification = document.querySelector(".player-turn");

game.board.populateBoard();

//Sets the Player's Turn text to the first player's shape.
turnNotification.textContent = game.chooseFirstPlayer();


game.playTurn(boxes);
game.reset(boxes);
