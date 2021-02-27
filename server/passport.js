import passport from "passport";
import KakaoStrategy from "passport-kakao";
import NaverStrategy from "passport-naver";
import GoogleStrategy from "passport-google-oauth20";
import { 
  kakaoLoginCallback,
  // naverLoginCallback,
  // googleLoginCallback
} from "./controllers/snsController";
import routes from "./routes";


passport.use(
  new KakaoStrategy({
    clientID: process.env.KKO_ID,
    clientSecret: process.env.KKO_SECRET,
    callbackURL: `http://localhost:4000/api/users${routes.kakaoCallback}`
  },
  kakaoLoginCallback
  )
);

// passport.use(
//   new NaverStrategy({
//     clientID: process.env.NVR_ID,
//     clientSecret: process.env.NVR_SECRET,
//     callbackURL: `http://localhost:4000/api/users${routes.naverCallback}`
//   },
//   naverLoginCallback
//   )
// );

// passport.use(
//   new GoogleStrategy({
//     clientID: process.env.GGL_ID,
//     clientSecret: process.env.GGL_SECRET,
//     callbackURL: `http://localhost:4000/api/users${routes.googleCallback}`
//   },
//   googleLoginCallback
//   )
// );

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});