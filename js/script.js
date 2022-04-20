const game = new Game();
//Grabs all the playable squares
const boxes = document.querySelectorAll("div[class^='square']");
const turnNotification = document.querySelector(".player-turn");
const title = document.querySelector(".title");
let players = game.players;
let gameBoard = game.board;

gameBoard.populateBoard();

//Sets the Player's Turn text to the first player's shape.
turnNotification.textContent = game.chooseFirstPlayer();

/**
 * Checks which player's turn it is and sets the player's turn text to the active player's shape.
 *
 * @return {Object} The player object in where isTurn is true.
 */
const checkTurn = () => {
  if (players[0].isTurn) {
    turnNotification.textContent = players[1].shape.symbol;
    players[0].isTurn = false;
    players[1].isTurn = true;
    return players[0];
  } else {
    turnNotification.textContent = players[0].shape.symbol;
    players[0].isTurn = true;
    players[1].isTurn = false;
    return players[1];
  }
};
/**
 * Sets event listeners to all playable squares for when the player plays their turn.
 *
 */
const playTurn = () => {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", (e) => {
      if (e.target.textContent === "" && game.gameState) {
        const spaceClass = e.target.className;
        //Gets the indexes from the class names of the targeted space on the board
        const firstIndex = parseInt(spaceClass.charAt(7));
        const secondIndex = parseInt(spaceClass.charAt(9));
        const activePlayer = checkTurn();
        //Will put the player's shape on the clicked space.
        e.target.textContent = activePlayer.shape.symbol;
        gameBoard.spaces[firstIndex][secondIndex] = activePlayer.shape;
        //Functions to check if players won.
        checkHorizontalWin();
        checkVerticalWin();
        checkDiagonalWin();
      }
    });
  }
};
/**
 * Checks to see if a player has won horizontally
 *
 */
const checkHorizontalWin = () => {
  const space = gameBoard.spaces;
  //Loops through the array horizontally to check to see if there are 3 shapes in a row.
  for (let i = 0; i < space.length; i++) {
    let amountOfShapeX = 0;
    let amountOfShapeO = 0;
    //Checks to see if there are empty spaces before checking if a player has won.
    if (
      space[i][0] !== undefined &&
      space[i][1] !== undefined &&
      space[i][2] !== undefined
    ) {
      for (let j = 0; j < space[i].length; j++) {
        if (space[i][j].owner.shape.symbol === "X") {
          amountOfShapeX++;
        } else if (space[i][j].owner.shape.symbol === "O") {
          amountOfShapeO++;
        }
        //If there are 3 of the same shapes in a row then it will display a winning text.
        if (amountOfShapeX === 3) {
          title.textContent = "Player X won!";
          game.gameState = false;
        } else if (amountOfShapeO === 3) {
          title.textContent = "Player O won!";
          game.gameState = false;
        }
      }
    }
  }
};
/**
 * Checks to see if a player has won vertically.
 *
 */
const checkVerticalWin = () => {
  const space = gameBoard.spaces;
  //Loops through the array vertically to check to see if there are 3 shapes in a row.
  for (let i = 0; i < space.length; i++) {
    let amountOfShapeX = 0;
    let amountOfShapeO = 0;
    //Checks to see if there are empty spaces before checking if a player has won.
    if (
      space[0][i] !== undefined &&
      space[1][i] !== undefined &&
      space[2][i] !== undefined
    ) {
      for (let j = 0; j < space[i].length; j++) {
        if (space[j][i].owner.shape.symbol === "X") {
          amountOfShapeX++;
        } else if (space[j][i].owner.shape.symbol === "O") {
          amountOfShapeO++;
        }
        //If there are 3 of the same shapes in a row then it will display a winning text.
        if (amountOfShapeX === 3) {
          title.textContent = "Player X won!";
          game.gameState = false;
        } else if (amountOfShapeO === 3) {
          title.textContent = "Player O won!";
          game.gameState = false;
        }
      }
    }
  }
};
/**
 * Checks to see if a player has won diagonally.
 *
 */
const checkDiagonalWin = () => {
  const space = gameBoard.spaces;

  let amountOfShapeX = 0;
  let amountOfShapeO = 0;
  //Checks to see if there are empty spaces before checking if a player has won.
  if (
    space[0][0] !== undefined &&
    space[1][1] !== undefined &&
    space[2][2] !== undefined
  ) {
    //Loops through the array diagonally starting from the left to check to see if there are 3 shapes in a row.
    for (let i = 0; i < space.length; i++) {
      if (space[i][i].owner.shape.symbol === "X") {
        amountOfShapeX++;
      } else if (space[i][i].owner.shape.symbol === "O") {
        amountOfShapeO++;
      }
    }
    //If there are 3 of the same shapes in a row then it will display a winning text.
    if (amountOfShapeX === 3) {
      title.textContent = "Player X won!";
      game.gameState = false;
    } else if (amountOfShapeO === 3) {
      title.textContent = "Player O won!";
      game.gameState = false;
    }
  }

  if (
    space[0][2] !== undefined &&
    space[1][1] !== undefined &&
    space[2][0] !== undefined
  ) {
    //Need a decreasing index for when checking diagonally rightwards.
    let decreaseCount = 2;
    amountOfShapeO = 0;
    amountOfShapeX = 0;
    //Loops through the array diagonally starting from the right to check to see if there are 3 shapes in a row.
    for (let y = 0; y < space.length; y++) {
      if (space[y][decreaseCount].owner.shape.symbol === "X") {
        amountOfShapeX++;
      } else if (space[y][decreaseCount].owner.shape.symbol === "O") {
        amountOfShapeO++;
      }
      console.log(decreaseCount);
      decreaseCount--;
    }
    if (amountOfShapeX === 3) {
      console.log(turnNotification);
      title.textContent = "Player X won!";
      game.gameState = false;
    } else if (amountOfShapeO === 3) {
      title.textContent = "Player O won!";
      game.gameState = false;
    }
  }
};
/**
 *  Resets game so users may play again.
 *
 */
const reset = () => {
  const resetButton = document.querySelector(".reset");

  resetButton.addEventListener("click", () => {
    //Creates new players
    players = game.players;
    //Creates a new board
    gameBoard = game.board;
    game.players[0].isTurn = false;
    game.players[1].isTurn = false;
    //Sets the notification to the player who will go first.
    turnNotification.textContent = game.chooseFirstPlayer();
    title.textContent = `Tic Tac Toe!`;
    //Creates a new array for the board.
    gameBoard.populateBoard();
    game.gameState = true;

    for (let i = 0; i < boxes.length; i++) {
      boxes[i].textContent = "";
    }
  });
};

playTurn();
reset();
