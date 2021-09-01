import express from 'express';
import gameHandler from '../gameHandler/index.js';

var router = express.Router();

router.get('/:gameID', function (req, res) {
  const thisGameID = req.params['gameID'];

  if (thisGameID && gameHandler.allGameInstances[thisGameID] !== undefined) {
    const gameStatusData = JSON.stringify(gameHandler.allGameInstances[thisGameID].gameStatus);
    res.status(200);
    res.end(gameStatusData);
  } else {
    res.status(404);
    res.end("Could not refresh game :O");
  }
});


router.post('/restartGame/:gameID', function (req, res) {
  const thisGameID = req.params['gameID'];

  if (thisGameID && gameHandler.allGameInstances[thisGameID] !== undefined) {
    gameHandler.restartGameInstance(thisGameID);
    res.status(201);
  } else {
    res.status(404);
    res.end("Could not restart the game :O");
  }
});

router.post('/deleteGame/:gameID', function (req, res) {
  const thisGameID = req.params['gameID'];

  if (thisGameID && gameHandler.allGameInstances[thisGameID] !== undefined) {
    gameHandler.deleteGameInstance(thisGameID);
    res.status(201);
  } else {
    res.status(404);
    res.end("Could not restart the game :O");
  }
});

export default router;