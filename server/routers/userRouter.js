import express from "express";
import routes from "../routes";
import{
  register,
} from "../controllers/userController"

const userRouter = express.Router();

userRouter.post(routes.register, register);

export default userRouter;
