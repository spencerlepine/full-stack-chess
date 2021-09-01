import express from 'express';
import gameHandler from '../gameHandler/index.js';

var router = express.Router();

router.get('/:gameID', function (req, res) {
  const thisGameID = req.params['gameID'];
  if (thisGameID) {
    if (gameHandler.allGameInstances[thisGameID] === undefined) {
      console.log('creating game instance', thisGameID);
      gameHandler.startGameInstance(thisGameID);
    }
    const gameboardData = JSON.stringify(gameHandler.allGameInstances[thisGameID].gameboard);
    res.status(200);
    res.end(gameboardData);
  } else {
    res.status(404);
    res.end("Could not connect to game :O");
  }
});

export default router;