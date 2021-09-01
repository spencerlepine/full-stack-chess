const initializeGame = (boardModel, boardController, boardView) => {
  // Attatch the event listener to the RESET button
  const resetBtn = document.getElementById('resetBtn');
  resetBtn.addEventListener('click', () => boardModel.resetGameInstance(boardModel, boardView, () => {
    console.log('resetting the game')
    initializeGame(boardModel, boardController, boardView)
  }));

  // Re-render the board div
  const boardDiv = document.getElementById('gameboard');
  boardDiv.innerHTML = '';
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      let cellElem = document.createElement('div');
      cellElem.setAttribute('id', `cell-${(r * 8) + c}`);
      cellElem.setAttribute('class', 'boardCell ' + ((c + (r % 2)) % 2 === 0 ? 'lightCell' : 'darkCell'));
      cellElem.setAttribute('row', r);
      cellElem.setAttribute('col', c);
      boardDiv.appendChild(cellElem);
    }
  }

  boardModel.fetchGameStatus(boardModel, boardView);
  boardModel.fetchGameboard(boardModel, boardView);
  setInterval(() => {
    if (!boardModel.isCurrentPlayerTurn(boardModel)) {
      boardModel.fetchGameboard(boardModel, boardView);
      boardModel.fetchGameStatus(boardModel, boardView);
    }
  }, 1000);
};

window.onload = function () {
  initializeGame(boardModel, boardController, boardView);
};