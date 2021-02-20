import passport from "passport";
import KakaoStrategy from "passport-kakao";
// import User from "./models/User";
import { kakaoLoginCallback } from "./controllers/userController";
import routes from "./routes";


// passport.use(User.createStrategy());

passport.use(
  new KakaoStrategy({
    clientID: process.env.KKO_ID,
    clientSecret: process.env.KKO_SECRET,
    callbackURL: `http://localhost:4000/api/users${routes.kakaoCallback}`
  },
  kakaoLoginCallback
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});