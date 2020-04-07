class Model{
  constructor(seed){
    this.currentGeneration = seed;
    this.height = seed.length;
    this.width = seed[0].length;
    this.alive = 2;
    this.dead = 1;
  }

  advanceGeneration(){
    let nextGeneration = new Array(this.currentGeneration.length);

    this.currentGeneration.forEach((row, rowIndex) => {
      nextGeneration[rowIndex] = new Array(this.currentGeneration[rowIndex].length);
      row.forEach((cell, cellIndex) => {
        nextGeneration[rowIndex][cellIndex] = this.getNextCellState(rowIndex, cellIndex);
      });
    });

    this.currentGeneration = nextGeneration;
    return this.currentGeneration;
  }

  getNextCellState(row, col){
    const currentCellState = this.currentGeneration[row][col];
    const livingNeighbors = this.getLivingNeighbors(row, col);

    if (livingNeighbors === 3) return this.alive;
    if (currentCellState === this.alive && livingNeighbors ===2) return this.alive;
    return this.dead;
  }

  getLivingNeighbors(cellRow, cellColumn){
    let livingNeighbors = 0;

    for(var rowOffset=-1; rowOffset<=1; rowOffset++){
      for(var colOffset=-1; colOffset<=1; colOffset++){
        let neighborRow = cellRow+rowOffset;
        let neighborColumn = cellColumn+colOffset;
        if(this.validateCords(neighborRow, neighborColumn)){
          let livingCell = (this.currentGeneration[neighborRow][neighborColumn] === this.alive);
          let CurrentCell = ((rowOffset==0) && (colOffset==0))
          if(livingCell && !CurrentCell) livingNeighbors++;
        }
      }
    }

    return livingNeighbors;
  }

  validateCords(row, col){
    const maxRowValue = this.currentGeneration.length-1;
    const maxColValue = this.currentGeneration[0].length - 1;
    if( (row<0) || (row >maxRowValue) ) return false;
    if( (col<0) || (col >maxColValue) ) return false;
    if( (row===1) && (col===1)) return false;
    return true;
  }
}

class View{
  constructor(size){
    this.gameBoard = document.getElementById("game-board");
    this.size = size;
  }

  initializeGameBoard(s)

  displayBoard(boardState){
    console.log(boardState);
  }
}

class Controller{
  constructor(model, view){
    this.model = model;
    this.view = view;
  }
}

const seed = [
  [1,1,1,1,1],
  [1,1,1,1,1],
  [1,2,2,2,1],
  [1,1,1,1,1],
  [1,1,1,1,1]
];
const life = new Controller(new Model(seed), new View());
let currentBoardState = life.model.advanceGeneration();
life.view.displayBoard(seed);
life.view.displayBoard(currentBoardState);