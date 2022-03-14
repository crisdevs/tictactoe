
const game = new Game();
//Grabs all the playable squares
const boxes = document.querySelectorAll("div[class^='square']");
const turnNotification = document.querySelector(".player-turn");
const players = game.players;

//Sets the Player's Turn text to the first player's shape.
turnNotification.textContent = game.chooseFirstPlayer();

/**
 * Checks which player's turn it is and sets the player's turn text to the active player's shape.
 *
 * @return {Object} The player object in where isTurn is true.
 */
const checkTurn = () =>{
        if(players[0].isTurn){
            turnNotification.textContent = players[1].playerShape;

            players[0].isTurn = false;
            players[1].isTurn = true;
            return players[0];
        }
        else{
            turnNotification.textContent = players[0].playerShape;

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
            if(e.target.textContent === ""){
                const activePlayer = checkTurn();
                e.target.textContent = activePlayer.playerShape;
            }
           
        });
    }
}


playTurn();
console.log(game.board.spaces);

