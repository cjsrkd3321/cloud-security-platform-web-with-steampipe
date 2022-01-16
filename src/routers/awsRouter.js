import express from 'express';
import {
  awsHome,
  getAwsException,
  getAwsTable,
  postAwsException,
} from '../controllers/awsController';
import { protectMiddleware } from '../middlewares';

const awsRouter = express.Router();

awsRouter.route('/').all(protectMiddleware).get(awsHome);
awsRouter
  .route('/:table([a-zA-Z0-9_]{5,30})')
  .all(protectMiddleware)
  .get(getAwsTable);
awsRouter
  .route('/:table([a-zA-Z0-9_]{5,30})/exceptions/:id([a-z0-9]{32})')
  .get(getAwsException)
  .post(postAwsException);

export default awsRouter;
