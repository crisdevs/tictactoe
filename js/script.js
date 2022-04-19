
const game = new Game();
//Grabs all the playable squares
const boxes = document.querySelectorAll("div[class^='square']");
const turnNotification = document.querySelector(".player-turn");
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
const checkTurn = () =>{
        if(players[0].isTurn){
            turnNotification.textContent = players[1].shape.symbol;

            players[0].isTurn = false;
            players[1].isTurn = true;
            return players[0];
        }
        else{
            turnNotification.textContent = players[0].shape.symbol;

            players[0].isTurn = true;
            players[1].isTurn = false;
            return players[1]
        }
}
/**
 * Sets event listeners to all playable squares for when the player plays their turn.
 *
 */
const playTurn = () =>{
    for(let i =0; i < boxes.length; i++){
        boxes[i].addEventListener("click", (e)=>{
            if(e.target.textContent === "" && game.gameState){
                const spaceClass = e.target.className;
                const firstIndex = parseInt(spaceClass.charAt(7));
                const secondIndex = parseInt(spaceClass.charAt(9));
                const activePlayer = checkTurn();
        
                e.target.textContent = activePlayer.shape.symbol;
                gameBoard.spaces[firstIndex][secondIndex] = activePlayer.shape;
                console.log(gameBoard.spaces);
                checkHorizontalWin();
                checkVerticalWin();
                checkDiagonalWin();
            }        
        });
    }
}

const checkHorizontalWin = () =>{
    const space = gameBoard.spaces;
   
        for(let i =0; i< space.length; i++){
            let amountOfShapeX = 0;
            let amountOfShapeO = 0;
            if(space[i][0] !== undefined && space[i][1] !== undefined && space[i][2] !== undefined){
                for(let j = 0; j < space[i].length; j++){
                    if(space[i][j].owner.shape.symbol === "X"){
                        amountOfShapeX++;
                    }
                    else if(space[i][j].owner.shape.symbol === "O"){
                        amountOfShapeO++;
                }
                if(amountOfShapeX === 3){
                    console.log("Player X won!");
                    game.gameState = false;
                }
                else if(amountOfShapeO === 3){
                    console.log("Player O won!");
                    game.gameState = false;
                }
            }
        }
    }
}

const checkVerticalWin = () =>{
    const space = gameBoard.spaces;
    
    for(let i =0; i< space.length; i++){
        let amountOfShapeX = 0;
        let amountOfShapeO = 0;
        if(space[0][i] !== undefined && space[1][i] !== undefined && space[2][i] !== undefined){
            for(let j = 0; j < space[i].length; j++){
                if(space[j][i].owner.shape.symbol === "X"){
                    amountOfShapeX++;
                }
                else if(space[j][i].owner.shape.symbol === "O"){
                    amountOfShapeO++;
            }
            if(amountOfShapeX === 3){
                console.log("Player X won!");
                game.gameState = false;
            }
            else if(amountOfShapeO === 3){
                console.log("Player O won!");
                game.gameState = false;
            }
        }
    }
}
}

    const checkDiagonalWin = () =>{
        const space = gameBoard.spaces;

            let amountOfShapeX = 0;
            let amountOfShapeO = 0;
            if(space[0][0] !== undefined && space[1][1] !== undefined && space[2][2] !== undefined){
                for(let i =0; i < space.length; i++){
                    if(space[i][i].owner.shape.symbol === "X"){
                        amountOfShapeX++;
                    }
                    else if(space[i][i].owner.shape.symbol === "O"){
                        amountOfShapeO++;
                }
            }
            console.log(`Amount of diagonal O:${amountOfShapeO}`);
            console.log(`Amount of diagonal X:${amountOfShapeX}`);

            if(amountOfShapeX === 3){
                console.log("Player X won!");
                game.gameState = false;
            }
            else if(amountOfShapeO === 3){
                console.log("Player O won!");
                game.gameState = false;
            }
        }
    }



 const reset = () =>{
   const resetButton = document.querySelector(".reset");

   resetButton.addEventListener("click", () =>{
        players = game.players;
        gameBoard = game.board;
        game.players[0].isTurn = false;
        game.players[1].isTurn = false;
        turnNotification.textContent = game.chooseFirstPlayer();
        gameBoard.populateBoard();
        game.gameState = true;

        for(let i = 0; i < boxes.length; i++){
            boxes[i].textContent = "";
        }

        console.log(gameBoard.spaces);
   });
   
 }


playTurn();
reset();
console.log(`${players[0].playerName} is ${players[0].shape.symbol} and ${players[1].playerName} is ${players[1].shape.symbol}`);

