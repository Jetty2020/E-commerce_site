import passport from "passport";
import db from "../db";
import {
  generateToken,
  mailSender
} from "../util";

export const authSuccess = async (req, res) => {
  res.status(200).json({
    userID: req.user[0].userID,
    isAuth: true,
    email: req.user[0].userEmail,
    name: req.user[0].name,
  });
};

export const register = function (req, res) {
  db.query(`SELECT userEmail FROM USER WHERE userEmail = '${req.body.email}';`, 
  function (err, results) {
    if (results.length == 0) { //이매일 중복 확인
      db.query(`INSERT INTO USER (userEmail, userPassword) VALUES('${req.body.email}', '${req.body.password}');`, 
      function (err, results) {
        if (err) {
          console.log(err);
          return res.json({ 
            success: false, 
            message: "Error occurred at register"
          });
        };
        mailSender.sendGmail(req);
        return res.status(200).json({
            success: true
        });
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "The email is already exsisted."
      });
    };
  });
};

export const postLogin = async (req, res) => {
  db.query(`SELECT * from USER where userEmail = '${req.body.email}';`, 
  function (err, user) {
    if ((user.length == 0)) {
      return res.json({
        success: false,
        message: "Auth failed, email not found"
      });
    };
    if (user[0].userPassword !== req.body.password) {
      return res.json({ success: false, message: "Wrong password" });
    }
    generateToken(user, (err, user) => {
      if (err) return res.status(400).send(err);
      res.cookie("w_authExp", user.tokenExp);
      res
        .cookie("w_auth", user[0].token)
        .status(200)
        .json({
          success: true, userId: user[0].userID
        });
    });
  });
};

export const kakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id }
  } = profile;
  const {
    properties: { nickname: name }
  } = profile._json;
  const {
    kakao_account: { email }
  } = profile._json;
  try {
    db.query(`SELECT * from USER where snsEmail = '${email}';`,
    function (err, user) {
      if (!(user.length == 0)) {
        db.query(`UPDATE USER SET snsID = ${id} where snsEmail = '${email}';`,
          function (err, user) {
            return cb(null, user);
          }
        );
      } else {
        if (email){
          db.query(`INSERT INTO USER (snsID, snsEmail, name) VALUES('${id}', '${email}', '${name}');`, 
          function (err, newUser) {
            return cb(null, newUser);
          });
        } else {
          db.query(`INSERT INTO USER (snsID, name) VALUES('${id}', '${name}');`, 
          function (err, newUser) {
            return cb(null, newUser);
          });
        };
      };
    }
    );
  } catch (error) {
    console.log("kakaoLoginCallback");
    console.log(error);
    return cb(error);
  }
};

export const postKakaoLogIn = (req, res) => {
  return res.json({
    success: true,
  });
};


export const logout = (req, res) => {
  db.query(`UPDATE USER SET token = null, tokenExp = null WHERE userID = '${req.user[0].userID}';`,
  function (err, user) {
    if (err) return res.json({ success: false, message: "Error occurred at logout" });
    return res.status(200).send({
      success: true
    });
  });
};