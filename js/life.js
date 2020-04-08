class Model{
  constructor(){
    this.currentGeneration;
    this.alive = true;
    this.dead = false;
  }

  updateModel(board){
    this.currentGeneration = board;
  }

  advanceGeneration(board){
    this.currentGeneration = board;
    let nextGeneration = [];

    this.currentGeneration.forEach((row, rowIndex) => {
      nextGeneration[rowIndex] = [];
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
  constructor(){
    this.gameBoard = document.getElementById("game-board");
    this.resetGameBoard();
    this.checkboxes;
    this.size;
  }

  resetGameBoard(){
    this.size = parseInt(document.getElementById("size").value, 10);
    let fragment = document.createDocumentFragment();
    this.checkboxes = [];

    for(var row=0; row<this.size; row++){
      var tableRow = document.createElement("tr");
      tableRow.id = `game-board-row-${row+1}`;
      this.checkboxes[row]=[];
      for(var col=0; col<this.size; col++){
        var tableData = document.createElement("td");
        tableData.id = `cell-${row}-${col+1}`;
        var checkbox = document.createElement("input");
        checkbox.id = `checkbox-${row}-${col+1}`;
        checkbox.type = 'checkbox';
        tableData.appendChild(checkbox);
        tableRow.appendChild(tableData);
        this.checkboxes[row][col]=checkbox;
      }
      fragment.appendChild(tableRow);
    }
    this.gameBoard.innerHTML = "";
    this.gameBoard.appendChild(fragment);
  }

  displayBoard(boardState){
    for(var row=0; row<this.size; row++){
      for(var col=0; col<this.size; col++){
        this.checkboxes[row][col].checked = boardState[row][col];
      }
    }
  }

  getBoard(){
    let board = [];
    for(var row=0; row<this.size; row++){
      board[row] = [];
      for(var col=0; col<this.size; col++){
        board[row][col]= this.checkboxes[row][col].checked;
      }
    }
    console.log(board);
    return board;
  }
}

class Controller{
  constructor(){
    this.view = new View();
    this.model = new Model(this.view.getBoard());
    this.addResetEventListener();
    this.addNextEventListener();
  }

  addResetEventListener(){
    let resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", ()=>{
      this.view.resetGameBoard();
      this.model = new Model(this.view.getBoard());
    });
  }

  addNextEventListener(){
    let nextButton = document.getElementById("next");
    nextButton.addEventListener("click", ()=>{
      let board= this.model.advanceGeneration(this.view.getBoard());
      this.view.displayBoard(board);
    });
  }
}

let controller = new Controller();
// const seed = [
//   [false,false,false,false,false],
//   [false,false,false,false,false],
//   [false,true,true,true,false],
//   [false,false,false,false,false],
//   [false,false,false,false,false],
// ];
//const life = new Controller(new Model(seed), new View());
//let currentBoardState = life.model.advanceGeneration();
//life.view.getBoard();
//life.view.displayBoard(currentBoardState);