import express from "express";
import routes from "../routes";
import{
  register,
  postLogin,
} from "../controllers/userController"

const userRouter = express.Router();

userRouter.post(routes.register, register);
userRouter.post(routes.login, postLogin);

export default userRouter;
