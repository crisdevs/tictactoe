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
    firstPlayer.playerName = "Player 1";

    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].playerName !== "Player 1") {
        this.players[i].playerName = "Player 2";
      }
    }

    return firstPlayer.shape.symbol;
  }
}
