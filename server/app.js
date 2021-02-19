import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


export default app;