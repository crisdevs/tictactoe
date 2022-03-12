class Game{

    constructor(){
        this.players = this.createPlayers();
    }


    createPlayers() {
        const newPlayers = [new Player("X", false), new Player("O", false)];

        return newPlayers;
    }

    chooseFirstPlayer() {
        const randNumber = Math.round(Math.random());
        const firstPlayer = this.players[randNumber];

        firstPlayer.isTurn = true;
    }

}