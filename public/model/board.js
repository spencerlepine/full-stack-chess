const generatePlaceholderBoard = () => {
  const outputBoard = [];
  for (let i = 0; i < 8; i++) {
    outputBoard.push(['', '', '', '', '', '', '', '']);
  }
  return outputBoard;
}

const chooseColor = (boardModel) => {
  let choice = null;
  while (!(choice === 'black' || choice === 'white')) {
    choice = prompt('Choose your letter to play: "Black" or "White"').toLowerCase();

    attemptToMakeMove(boardModel.gameInstance.username, choice, (validChoice) => {
      if (!validChoice) {
        choice = null;
      }
    });
  }
  return choice;
}

const chooseGameID = () => {
  let choice = null;
  while (typeof choice !== 'string') {
    choice = prompt('Enter the gameID: (type unique ID to START a new game)').toLowerCase();
  }
  return choice;
}

const chooseUsername = () => {
  let choice = null;
  while (typeof choice !== 'string') {
    choice = prompt('Type your username:').toLowerCase();
  }
  return choice;
}

const boardModel = {
  gameInstance: {
    gameID: chooseGameID(),
    username: chooseUsername(),
    color: chooseColor(boardModel),
  },
  gameboard: generatePlaceholderBoard(),
  gameStatus: {
    isGameActive: false,
    lastMovePlayer: 'black',
    winningPlayer: '',
  },

  setGameboard: (boardModel, newBoard) => boardModel.gameboard = newBoard,

  resetGameInstance: (boardModel, callback) => {
    axios.post('/games/syncGameStatus/restartGame/' + boardModel.gameInstance.gameID)
      .then((response) => {
        callback();
        boardModel.gameStatus = {
          isGameActive: false,
          lastMovePlayer: 'black',
          winningPlayer: '',
        }

        boardModel.gameInstance = {
          gameInstance: {
            gameID: chooseGameID(),
            username: chooseUsername(),
            color: chooseColor(),
          }
        }

        boardModel.fetchGameStatus(boardModel);
        boardModel.fetchGameboard(boardModel);
      }, (error) => {
        console.log(error);
      });
  }

  fetchGameStatus: (boardModel, boardView) => {
    axios.get('/games/syncGameStatus/' + boardModel.gameInstance.gameID)
      .then((response) => {
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
  },

  fetchGameboard: (boardModel, boardView) => {
    axios.get('/games/syncBoard/' + boardModel.gameInstance.gameID)
      .then((response) => {
        boardModel.setGameboard(boardModel, response.data);
        boardView.renderBoard(boardModel);
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
        boardModel.fetchGameboard(boardModel);
        boardModel.fetchGameStatus(boardModel, boardView);
      }, (error) => {
        console.log(error);
      });
  },

  attemptToMakeMove: async (username, color, callback) => {
    await axios.post('/games/claimColor/' + boardModel.gameInstance.gameID, {
      username,
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