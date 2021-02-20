import passport from "passport";
import KakaoStrategy from "passport-kakao";
import NaverStrategy from "passport-naver";
import { 
  kakaoLoginCallback,
  naverLoginCallback
} from "./controllers/snsController";
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

passport.use(
  new NaverStrategy({
    clientID: process.env.NVR_ID,
    clientSecret: process.env.NVR_SECRET,
    callbackURL: `http://localhost:4000/api/users${routes.naverCallback}`
  },
  naverLoginCallback
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});