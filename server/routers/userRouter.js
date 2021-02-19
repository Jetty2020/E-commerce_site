import express from "express";
import routes from "../routes";
import {
  auth
} from "../middleware";
import{
  authSuccess,
  register,
  postLogin,
} from "../controllers/userController"

const userRouter = express.Router();

userRouter.get(routes.auth, auth, authSuccess );
userRouter.post(routes.register, register);
userRouter.post(routes.login, postLogin);

export default userRouter;
