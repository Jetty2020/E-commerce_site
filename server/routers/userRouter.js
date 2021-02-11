import express from "express";
import routes from "../routes";
import{
    auth,
    authSuccess,
    register,
    postLogin,
    logout
} from "../controllers/userController.js"

const userRouter = express.Router();

userRouter.get(routes.auth, auth, authSuccess );
userRouter.post(routes.register, register);
userRouter.post(routes.login, postLogin);
userRouter.get(routes.logout, auth, logout);

export default userRouter;
