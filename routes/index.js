import express from 'express';
import movePieceRoute from './movePiece.js';
import claimColorRoute from './claimColor.js';
import syncBoardRoute from './syncBoard.js';
import syncGameStatusRoute from './syncGameStatus.js';

var rootRouter = express.Router();

rootRouter.use('/movePiece', movePieceRoute);
rootRouter.use('/claimColor', claimColorRoute);
rootRouter.use('/syncBoard', syncBoardRoute);
rootRouter.use('/syncGameStatus', syncGameStatusRoute);

export default rootRouter;