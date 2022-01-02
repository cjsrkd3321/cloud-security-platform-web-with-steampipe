import express from 'express';
import { awsHome } from '../controllers/awsController';
import { protectMiddleware } from '../middlewares';

const awsRouter = express.Router();

awsRouter.route('/').all(protectMiddleware).get(awsHome);

export default awsRouter;
