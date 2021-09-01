import express from 'express';
import gameHandler from '../gameHandler/index.js';

var router = express.Router();

router.post('/:gameID', function (req, res) {
  const thisGameID = req.params['gameID'];
  const { fromRow, fromCol, toRow, toCol, pieceStr } = req.body;

  if (thisGameID && gameHandler.allGameInstances[thisGameID] !== undefined) {
    const thisGame = gameHandler.allGameInstances[thisGameID];
    thisGame.movePiece(fromRow, fromCol, toRow, toCol, pieceStr, (err) => {
      if (err) {
        res.status(404);
        res.end("Could not place piece :O");
      } else {
        console.log('moved piece to', toRow, toCol, pieceStr);
        console.log(thisGame.gameStatus);
        thisGame.gameStatus.lastMovePlayer = thisGame.gameStatus.lastMovePlayer === 'black' ? 'white' : 'black';
        res.status(201);
        res.end();
      }
    })
  } else {
    res.status(404);
    res.end("Could not place piece :O");
  }
});

export default router;