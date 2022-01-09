import express from 'express';
import { awsHome, awsTable } from '../controllers/awsController';
import { protectMiddleware } from '../middlewares';

const awsRouter = express.Router();

awsRouter.route('/').all(protectMiddleware).get(awsHome);
awsRouter
  .route('/:table([a-zA-Z0-9_]{5,30})')
  .all(protectMiddleware)
  .get(awsTable);

export default awsRouter;
