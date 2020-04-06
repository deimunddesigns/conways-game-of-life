class Model{
  constructor(seed){
    this.currentGeneration = seed;
    this.nextGeneration = null;
    this.height = seed.length;
    this.width = seed[0].length;
  }

  getNextState(){
    return this.seed;
  }
}

class View{
  constructor(){
  }

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
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,1,1,1,0],
  [0,0,0,0,0],
  [0,0,0,0,0]
];
const life = new Controller(new Model(seed), new View());
let currentBoardState = life.model.getNextState();
life.view.displayBoard(currentBoardState);