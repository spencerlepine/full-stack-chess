import express from 'express';
import gameHandler from '../gameHandler/index.js';

var router = express.Router();

router.post('/:gameID', function (req, res) {
  const thisGameID = req.params['gameID'];
  const { color } = req.body;

  if (thisGameID && gameHandler.allGameInstances[thisGameID] !== undefined) {
    const thisGame = gameHandler.allGameInstances[thisGameID];
    gameHandler.allGameInstances[thisGameID].claimColor(color, (err) => {
      if (err) {
        res.status(404);
        res.end("Could not place piece :O");
      } else {
        res.status(201);
        res.end("valid");
      }
    })
  } else {
    res.status(404);
    res.end("Could not place piece :O");
  }
});

export default router;