import Board from './Board.js';

class GameInstance {
  constructor() {
    this.gameStatus = {
      gameIsActive: true,
      lastMovePlayer: 'black',
      winningPiece: '',
    }
    this.gameboard = new Board();
    this.claimedColors = {
      'black': null,
      'white': null
    }
  }

  claimColor = (username, color, callback) => {
    if (this.claimColor[color] === null || this.claimColor[color] === username) {
      this.claimColor[color] = username;
      callback();
    } else {
      callback("Could not claim color");
    }
  }

  movePiece = (fromRow, fromCol, toRow, toCol, pieceStr, callback) => {
    this.gameboard.movePiece(fromRow, fromCol, toRow, toCol, pieceStr, callback);
  }
}

export default GameInstance;