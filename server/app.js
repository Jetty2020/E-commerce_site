import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import routes from "./routes";
import userRouter from "./routers/userRouter";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use('/api/users', require('./routes/users'));
// app.use('/api/users', require('./routers/userRouters'));
app.use(routes.users, userRouter);

export default app;