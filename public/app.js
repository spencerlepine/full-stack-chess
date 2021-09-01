const initializeGame = (boardModel, boardController, boardView) => {
  // Attatch the event listener to the RESET button
  const resetBtn = document.getElementById('resetBtn');
  resetBtn.addEventListener('click', () => boardModel.resetGameInstance(boardModel, () => {
    initializeGame(boardModel, boardController, boardView)
  }));

  // Re-render the board div
  const boardDiv = document.getElementById('gameboard');
  boardDiv.innerHTML = '';
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      let cellElem = document.createElement('div');
      cellElem.setAttribute('id', `cell-${(r * 8) + c}`);
      cellElem.setAttribute('class', 'boardCell');
      cellElem.setAttribute('row', r);
      cellElem.setAttribute('col', c);
      boardDiv.appendChild(cellElem);
    }
  }

  boardModel.fetchGameStatus(boardModel, boardView);
  boardModel.fetchGameboard(boardModel);
  setInterval(() => {
    if (boardModel.gameIsActive) {
      boardModel.fetchGameStatus(boardModel, boardView);
    }
    boardModel.fetchGameboard(boardModel);
  }, 2000);

  const cells = document.querySelectorAll('.boardCell');
  for (const cell of cells) {
    cell.addEventListener('click', (e) => boardController.handleCellClick(e, boardModel, boardView));
  }
};

window.document.onload = function (e) {
  initializeGame(boardModel, boardController, boardView);
}