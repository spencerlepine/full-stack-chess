const generateStarterBoard = () => {
  return [
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
  ]
}

class Board {
  constructor() {
    this.boardMatrix = generateStarterBoard();
  }

  movePiece = (fromRow, fromCol, toRow, toCol, pieceStr, callback) => {
    const validMove = true; // TODO

    if (validMove) {
      callback();
    } else {
      callback("Could not place piece");
    }
  }

  isValidCell = (r, c) => (
    r >= 0 && c >= 0 && r < 8 && c < 8
  )
};

export default Board;