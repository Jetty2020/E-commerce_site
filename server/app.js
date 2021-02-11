import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use('/api/users', require('./routes/users'));
app.get('/', (req, res) => res.send('Hello World!~~안녕하세요 ~ '))

export default app;