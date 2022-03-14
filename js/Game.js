class Game{

    constructor(){
        this.players = this.createPlayers();
        this.board = this.createBoard();
    }

/**
 * Creates two new player objects and stores them in an array.
 *
 * @return {Array} An array storing the player objects.
 */
    createPlayers() {
        const newPlayers = [new Player("X", false), new Player("O", false)];

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

        return firstPlayer.playerShape;
    }

    createBoard(){
        const board = new Board();

        board.populateBoard();

        return board;
    }
}