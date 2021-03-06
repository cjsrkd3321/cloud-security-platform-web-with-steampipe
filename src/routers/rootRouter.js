import express from 'express';
import {
  getJoin,
  getLogin,
  home,
  logout,
  postJoin,
  postLogin,
} from '../controllers/userController';
import { protectMiddleware, publicOnlyMiddleware } from '../middlewares';

const rootRouter = express.Router();

rootRouter.route('/').all(protectMiddleware).get(home);
rootRouter.route('/join').all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter
  .route('/login')
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.route('/logout').all(protectMiddleware).get(logout);

export default rootRouter;
