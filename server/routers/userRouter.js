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
  logout,
} from "../controllers/userController"

import{
  kakaoLogin,
  postKakaoLogIn,
  naverLogin,
  postNaverLogIn,
} from "../controllers/snsController"

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

userRouter.get(routes.naver, naverLogin);
userRouter.get(
  routes.naverCallback,
  passport.authenticate("naver", { failureRedirect: routes.login }),
  postNaverLogIn
);

export default userRouter;
