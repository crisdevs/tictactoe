class Player {

    constructor(playerName, isTurn){
        this.isTurn = isTurn;
    }

    set shape(newShape){
        this._shape = newShape;
    }

    get shape(){
        return this._shape;
    }
    
}