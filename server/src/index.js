import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import morgan from 'morgan';
import routes from './routes';
import { sequelize } from './models';
import './passport';
import userRouter from './routers/userRouter';
import productRouter from './routers/productRouter';
import reviewRouter from './routers/reviewRouter';
import QnARouter from './routers/QnARouter';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
app.set('port', process.env.PORT || 4000);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log(`✅  Listening on: http://localhost:${process.env.PORT}`);
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes.users, userRouter);
app.use(routes.products, productRouter);
app.use(routes.products, reviewRouter);
app.use(routes.products, QnARouter);

// app.use(express.static(path.join('/app/client/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join('/app/client/build/index.html'));
// });

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
