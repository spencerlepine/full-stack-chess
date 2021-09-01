import GameInstance from './GameInstance.js';

class GameHandler {
  constructor() {
    this.allGameInstances = {};
  }

  startGameInstance = (gameID) => {
    this.allGameInstances[gameID] = new GameInstance();
  }

  restartGameInstance = (gameID) => {
    this.allGameInstances[gameID] = new GameInstance();
  }

  deleteGameInstance = (gameID) => {
    delete this.allGameInstances[gameID];
  }
}


const gameHandler = new GameHandler();

export default gameHandler;