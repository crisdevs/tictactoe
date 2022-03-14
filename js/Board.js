class Board{

    constructor(){
        this.spaces = [[],[],[]];
    }

    populateBoard() {
        for(let i =0; i < this.spaces.length; i++){
            for(let j =0; j < this.spaces[i].length; j++){
                this.spaces[i][j].push("0");
            }
        }
    }

}