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

  claimColor = (color, callback) => {
    if (this.claimedColors[color] === null) {
      this.claimedColors[color] = 'taken';
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