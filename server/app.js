import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import routes from "./routes";
import "./passport";
import userRouter from "./routers/userRouter";
import productRouter from "./routers/productRouter";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());



app.use(routes.users, userRouter);
app.use(routes.products, productRouter);


export default app;