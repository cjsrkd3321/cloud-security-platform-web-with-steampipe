import express from 'express';
import {
  awsHome,
  setAwsException,
  getAwsTable,
  getAwsException,
} from '../controllers/awsController';
import { protectMiddleware } from '../middlewares';

const awsRouter = express.Router();

awsRouter.route('/').all(protectMiddleware).get(awsHome);
awsRouter
  .route('/:table([a-zA-Z0-9_]{5,30})')
  .all(protectMiddleware)
  .get(getAwsTable);
awsRouter
  .route('/:table([a-zA-Z0-9_]{5,30})/excepts')
  .all(protectMiddleware)
  .get(getAwsException);
awsRouter
  .route('/:table([a-zA-Z0-9_]{5,30})/excepts/:id([a-z0-9]{32})')
  .all(protectMiddleware)
  .get(setAwsException);

export default awsRouter;
