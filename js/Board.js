class Board{

    constructor(){
        this.spaces = new Array(3);
    }

    populateBoard() {
        for(let i =0; i < 3; i++){
            this.spaces[i] = new Array(3);
        }
    }

}