const boardView = {
  renderCell: (r, c, boardModel) => {
    const cellValue = boardModel.boardMatrix[r][c]
    const newTextNode = document.createElement('p');
    newTextNode.innerText = cellValue;
    newTextNode.setAttribute('class', 'playerPiece ' + cellValue);

    const cellElem = document.getElementById(`cell-${(r * 8) + c}`);
    cellElem.innerHTML = '';
    cellElem.appendChild(newTextNode);
  },
  renderBoard: (boardModel) => {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        boardView.renderCell(r, c, boardModel);
      }
    }
  },
  renderPlayerIndicator: (boardModel, boardView) => {
    const indicatorElem = document.getElementById('currentPlayerIndicator');
    indicatorElem.innerText = boardModel.lastPlayerPiece === 'black' ? 'white' : 'black';
  }
};