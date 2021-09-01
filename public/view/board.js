const pieceImages = {
  wp: '../assets/white_pawn.svg',
  bp: '../assets/black_pawn.svg',
  wb: '../assets/white_bishop.svg',
  bb: '../assets/black_bishop.svg',
  wr: '../assets/white_rook.svg',
  br: '../assets/black_rook.svg',
  wn: '../assets/white_knight.svg',
  bn: '../assets/black_knight.svg',
  wq: '../assets/white_queen.svg',
  bq: '../assets/black_queen.svg',
  wk: '../assets/white_king.svg',
  bk: '../assets/black_king.svg'
};

const boardView = {
  renderCell: (r, c, boardModel) => {
    const cellValue = boardModel.boardMatrix[r][c];
    const cellElem = document.getElementById(`cell-${(r * 8) + c}`);
    cellElem.innerHTML = '';

    if (cellValue && pieceImages[cellValue] !== undefined) {
      const newImgElem = document.createElement('img');
      newImgElem.src = pieceImages[cellValue];
      newImgElem.setAttribute('class', 'playerPiece');
      cellElem.appendChild(newImgElem);
    }
  },
  renderBoard: (boardModel, boardView) => {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        boardView.renderCell(r, c, boardModel);
      }
    }
  },
  renderPlayerIndicator: (boardModel, boardView) => {
    const indicatorElem = document.getElementById('currentPlayerIndicator');
    indicatorElem.innerText = boardModel.lastPlayerPiece === 'black' ? 'white' : 'black';
  },
  rotateBoardFromColor: (boardModel) => {
    console.log(boardModel.gameInstance.color)
    if (boardModel.gameInstance.color === 'black') {
      const boardDiv = document.getElementById('gameboard');
      boardDiv.setAttribute('class', 'gameboardIsBlack');
    }
  }
};