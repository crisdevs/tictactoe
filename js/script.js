
const game = new Game();
const boxes = document.querySelectorAll("div[class^='square']");
let gameState = true;


game.chooseFirstPlayer();
const players = game.players;



const checkTurn = () =>{
    const turnNotification = document.querySelector(".player-turn");

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


