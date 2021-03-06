class Game {
  constructor() {
    this.players = this.createPlayers();
    this.board = new Board();
    this.gameState = true;
  }

  /**
   * Creates two new player objects and stores them in an array.
   *
   * @return {Array} An array storing the player objects.
   */
  createPlayers() {
    const newPlayers = [new Player(false), new Player(false)];
    newPlayers[0].shape = new Shape("X", newPlayers[0]);
    newPlayers[1].shape = new Shape("O", newPlayers[1]);
    return newPlayers;
  }
  /**
   * Randomizes which player will start first.
   *
   * @return {Object} The random player who will be first to play.
   */
  chooseFirstPlayer() {
    const randNumber = Math.round(Math.random());
    const firstPlayer = this.players[randNumber];
    firstPlayer.isTurn = true;

    return firstPlayer.shape.symbol;
  }

  /**
   * Checks which player's turn it is and sets the player's turn text to the active player's shape.
   *
   * @return {Object} The player object in where isTurn is true.
   */
  checkTurn = () => {
    const turnNotification = document.querySelector(".player-turn");

    if (this.players[0].isTurn) {
      turnNotification.textContent = this.players[1].shape.symbol;
      this.players[0].isTurn = false;
      this.players[1].isTurn = true;
      return this.players[0];
    } else {
      turnNotification.textContent = this.players[0].shape.symbol;
      this.players[0].isTurn = true;
      this.players[1].isTurn = false;
      return this.players[1];
    }
  };
  /**
   * Sets event listeners to all playable squares for when the player plays their turn.
   *
   * @param {HTML} boxes The collection of all the spaces in the HTML.
   */
  playTurn = (boxes) => {
    const title = document.querySelector(".title");
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].addEventListener("click", (e) => {
        if (e.target.textContent === "" && this.gameState) {
          const spaceClass = e.target.className;
          //Gets the indexes from the class names of the targeted space on the board
          const firstIndex = parseInt(spaceClass.charAt(7));
          const secondIndex = parseInt(spaceClass.charAt(9));
          const activePlayer = this.checkTurn();
          //Will put the player's shape on the clicked space.
          e.target.textContent = activePlayer.shape.symbol;
          this.board.spaces[firstIndex][secondIndex] = activePlayer.shape;
          //Functions to check if players won.
          this.checkHorizontalWin(title);
          this.checkVerticalWin(title);
          this.checkDiagonalWin(title);
          this.checkTie(title);
        }
      });
    }
  };
  /**
   * Checks to see if there was a tie between two players
   *  @param {HTML} title The h1 in the html.
   *
   */
  checkTie = (title) => {
    let counter = 0;
    for (let i = 0; i < this.board.spaces.length; i++) {
      counter += this.board.spaces[i].filter((value) => value.symbol).length;
    }

    if (counter === 9) {
      if (this.gameState) {
        title.textContent = "Its a Tie!";
        //Loops through all the spaces and applies styling to all.
        for (let i = 0; i < this.board.spaces.length; i++) {
          for (let y = 0; y < this.board.spaces.length; y++) {
            document.querySelector(`.square-${i}-${y}`).style.backgroundColor =
              "#2b2d42";
            document
              .querySelector(`.square-${i}-${y}`)
              .classList.remove("hovering");
          }
        }
        this.gameState = false;
      }
    }
  };
  /**
   **
   * Checks to see if a player has won horizontally
   *  @param {HTML} title The h1 in the html.
   */
  checkHorizontalWin = (title) => {
    const space = this.board.spaces;
    const winningSpaces = [];
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
            //Loops through the winning spaces and applies styling to those spaces.
            for (let k = 0; k < space[i].length; k++) {
              document.querySelector(
                `.square-${i}-${k}`
              ).style.backgroundColor = "#2b2d42";
              document
                .querySelector(`.square-${i}-${k}`)
                .classList.remove("hovering");
            }
            this.gameState = false;
          } else if (amountOfShapeO === 3) {
            title.textContent = "Player O won!";
            //Loops through the winning spaces and applies styling to those spaces.
            for (let k = 0; k < space[i].length; k++) {
              document.querySelector(
                `.square-${i}-${k}`
              ).style.backgroundColor = "#2b2d42";
              document
                .querySelector(`.square-${i}-${k}`)
                .classList.remove("hovering");
            }

            this.gameState = false;
          }
        }
      }
    }
  };
  /**
   * Checks to see if a player has won vertically.
   * @param {HTML} title The h1 in the html.
   *
   */
  checkVerticalWin = (title) => {
    const space = this.board.spaces;
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
            //Loops through the winning spaces and applies styling to those spaces.
            for (let k = 0; k < space[i].length; k++) {
              document.querySelector(
                `.square-${k}-${i}`
              ).style.backgroundColor = "#2b2d42";
              document
                .querySelector(`.square-${k}-${i}`)
                .classList.remove("hovering");
            }
            this.gameState = false;
          } else if (amountOfShapeO === 3) {
            title.textContent = "Player O won!";
            //Loops through the winning spaces and applies styling to those spaces.
            for (let k = 0; k < space[i].length; k++) {
              document.querySelector(
                `.square-${k}-${i}`
              ).style.backgroundColor = "#2b2d42";
              document
                .querySelector(`.square-${k}-${i}`)
                .classList.remove("hovering");
            }
            this.gameState = false;
          }
        }
      }
    }
  };
  /**
   * Checks to see if a player has won diagonally.
   * @param {HTML} title The h1 in the html.
   *
   */
  checkDiagonalWin = (title) => {
    const space = this.board.spaces;

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
        //Loops through the winning spaces and applies styling to those spaces.
        for (let k = 0; k < space[k].length; k++) {
          document.querySelector(`.square-${k}-${k}`).style.backgroundColor =
            "#2b2d42";
          document
            .querySelector(`.square-${k}-${k}`)
            .classList.remove("hovering");
        }
        this.gameState = false;
      } else if (amountOfShapeO === 3) {
        title.textContent = "Player O won!";
        //Loops through the winning spaces and applies styling to those spaces.
        for (let k = 0; k < space.length; k++) {
          document.querySelector(`.square-${k}-${k}`).style.backgroundColor =
            "#2b2d42";
          document
            .querySelector(`.square-${k}-${k}`)
            .classList.remove("hovering");
        }
        this.gameState = false;
      }
    }

    if (
      space[0][2] !== undefined &&
      space[1][1] !== undefined &&
      space[2][0] !== undefined
    ) {
      //Need a decreasing index for when checking diagonally rightwards.
      let negIndex = 2;
      amountOfShapeO = 0;
      amountOfShapeX = 0;
      //Loops through the array diagonally starting from the right to check to see if there are 3 shapes in a row.
      for (let y = 0; y < space.length; y++) {
        if (space[y][negIndex].owner.shape.symbol === "X") {
          amountOfShapeX++;
        } else if (space[y][negIndex].owner.shape.symbol === "O") {
          amountOfShapeO++;
        }
        negIndex--;
      }
      if (amountOfShapeX === 3) {
        title.textContent = "Player X won!";
        negIndex = 2;
        //Loops through the winning spaces and applies styling to those spaces.
        for (let k = 0; k < space.length; k++) {
          document.querySelector(
            `.square-${k}-${negIndex}`
          ).style.backgroundColor = "#2b2d42";
          document
            .querySelector(`.square-${k}-${negIndex}`)
            .classList.remove("hovering");
          negIndex--;
        }
        this.gameState = false;
      } else if (amountOfShapeO === 3) {
        title.textContent = "Player O won!";
        negIndex = 2;
        //Loops through the winning spaces and applies styling to those spaces.
        for (let k = 0; k < space.length; k++) {
          document.querySelector(
            `.square-${k}-${negIndex}`
          ).style.backgroundColor = "#2b2d42";
          document
            .querySelector(`.square-${k}-${negIndex}`)
            .classList.remove("hovering");
          negIndex--;
        }
        this.gameState = false;
      }
    }
  };
  /**
   *  Resets game so users may play again.
   *
   * @param {HTML} boxes The collection of all the spaces in the HTML.
   */
  reset = (boxes) => {
    const resetButton = document.querySelector(".reset");
    const turnNotification = document.querySelector(".player-turn");
    const title = document.querySelector(".title");

    resetButton.addEventListener("click", () => {
      //Creates new players
      this.players = this.players;
      //Creates a new board
      this.board = new Board();
      this.players[0].isTurn = false;
      this.players[1].isTurn = false;
      //Sets the notification to the player who will go first.
      turnNotification.textContent = this.chooseFirstPlayer();
      title.textContent = `Tic Tac Toe!`;
      //Creates a new array for the board.
      this.board.populateBoard();
      this.gameState = true;
      //Resets the styling to original state
      for (let i = 0; i < boxes.length; i++) {
        boxes[i].textContent = "";
        boxes[i].style.backgroundColor = "";
        if (!boxes[i].classList.contains("hovering")) {
          boxes[i].classList.add("hovering");
        }
      }
    });
  };
}
