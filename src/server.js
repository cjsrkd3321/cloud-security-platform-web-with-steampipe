import MongoStore from 'connect-mongo';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';

import rootRouter from './routers/rootRouter';

import { localsMiddleware, notFoundMiddleware } from './middlewares';
import awsRouter from './routers/awsRouter';

const app = express();

app.set('view engine', 'pug');
app.set('views', `${process.cwd()}/src/views`);
app.set('x-powered-by', false);

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 8, // 8 hours
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(localsMiddleware);
app.use('/', rootRouter);
app.use('/aws', awsRouter);

app.use(notFoundMiddleware);

export default app;
