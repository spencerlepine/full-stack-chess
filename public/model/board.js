const generatePlaceholderBoard = () => {
  const outputBoard = [];
  for (let i = 0; i < 8; i++) {
    outputBoard.push(['', '', '', '', '', '', '', '']);
  }
  return outputBoard;
}

const chooseColor = (boardModel, callback = () => { }) => {
  let choice = null;
  while (!(choice === 'black' || choice === 'white')) {
    choice = prompt('Choose your letter to play: "Black" or "White"').toLowerCase();
  }

  boardModel.attemptToClaimColor(choice, boardModel, (validChoice) => {
    if (!validChoice) {
      chooseColor(boardModel);
    }
  });

  boardModel.gameInstance.color = choice;
  callback();
}

const chooseGameID = (boardModel) => {
  let choice = null;
  while (typeof choice !== 'string') {
    choice = prompt('Enter the gameID: (type unique ID to START a new game)').toLowerCase();
  }
  boardModel.gameInstance.gameID = choice;
}

const chooseUsername = (boardModel) => {
  let choice = null;
  while (typeof choice !== 'string') {
    choice = prompt('Type your username:').toLowerCase();
  }
  boardModel.gameInstance.username = choice;
}

const boardModel = {
  gameInstance: {
    gameID: 'test',
    username: 'spencer',
    color: 'black',
  },
  boardMatrix: generatePlaceholderBoard(),
  gameStatus: {
    isGameActive: false,
    lastMovePlayer: 'white',
    winningPlayer: '',
  },

  isCurrentPlayerTurn: (boardModel) => {
    return boardModel.gameStatus.lastMovePlayer !== boardModel.gameInstance.color;
  },

  setGameboard: (boardModel, newBoard) => boardModel.boardMatrix = newBoard,

  resetGameInstance: (boardModel, boardView, callback) => {
    axios.post('/games/syncGameStatus/restartGame/' + boardModel.gameInstance.gameID)
      .then((response) => {
        callback();
        boardModel.gameStatus = {
          isGameActive: false,
          lastMovePlayer: 'black',
          winningPlayer: '',
        }

        boardModel.initializeInstance(boardModel, boardView);
        boardModel.fetchGameStatus(boardModel);
        boardModel.fetchGameboard(boardModel);
      }, (error) => {
        console.log(error);
      });
  },

  initializeInstance: (boardModel, boardView) => {
    if (boardModel.gameInstance.username === null) {
      chooseGameID(boardModel);
      boardModel.fetchGameboard(boardModel, boardView, () => {
        chooseUsername(boardModel);
        chooseColor(boardModel, () => boardView.rotateBoardFromColor(boardModel));
      });
    }
  },

  fetchGameStatus: (boardModel, boardView, optionalCallback = () => { }) => {
    if (boardModel.gameInstance.gameID !== null) {
      axios.get('/games/syncGameStatus/' + boardModel.gameInstance.gameID)
        .then((response) => {
          optionalCallback();
          boardModel.gameStatus = response.data;
          boardView.renderPlayerIndicator(boardModel, boardView);

          if (response.data.isGameActive === false) {
            if (winningPlayer) {
              alert(winningPlayer.toUpperCase() + ' wins the game! Click (reset) to play again');
            } else {
              alert('Game is a draw. Click (reset) to play again')
            }
          }
        }, (error) => {
          console.log(error);
        });
    }
  },

  fetchGameboard: (boardModel, boardView, optionalCallback = () => { }) => {
    if (boardModel.gameInstance.gameID === null) {
      boardModel.initializeInstance(boardModel, boardView);
    }

    axios.get('/games/syncBoard/' + boardModel.gameInstance.gameID)
      .then((response) => {
        optionalCallback();
        boardModel.setGameboard(boardModel, response.data.boardMatrix);
        boardView.renderBoard(boardModel, boardView);
      }, (error) => {
        console.log(error);
      });
  },

  attemptToMakeMove: (fromRow, fromCol, toRow, toCol, pieceStr, boardModel, boardView) => {
    axios.post('/games/movePiece/' + boardModel.gameInstance.gameID, {
      fromRow,
      fromCol,
      toRow,
      toCol,
      pieceStr,
    })
      .then((response) => {
        boardModel.fetchGameboard(boardModel, boardView);
        boardModel.fetchGameStatus(boardModel, boardView);
      }, (error) => {
        console.log(error);
      });
  },

  attemptToClaimColor: async (color, boardModel, callback) => {
    await axios.post('/games/claimColor/' + boardModel.gameInstance.gameID, {
      color,
    })
      .then((response) => {
        if (response.status !== 201) {
          console.log('model/board:130 response.status is not okay, we dont accept this color choice')
        }
        callback(response.status === 201);
      }, (error) => {
        console.log(error);
      });
  },
};