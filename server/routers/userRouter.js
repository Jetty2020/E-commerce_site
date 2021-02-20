import express from "express";
import passport from "passport";
import routes from "../routes";
import {
  auth
} from "../middleware";
import{
  authSuccess,
  register,
  postLogin,
  kakaoLogin,
  postKakaoLogIn,
  logout,
} from "../controllers/userController"

const userRouter = express.Router();

userRouter.get(routes.auth, auth, authSuccess );
userRouter.post(routes.register, register);
userRouter.post(routes.login, postLogin);
userRouter.get(routes.logout, auth, logout);
userRouter.get(routes.kakao, kakaoLogin);
userRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", { failureRedirect: routes.login }),
  postKakaoLogIn
);

export default userRouter;
