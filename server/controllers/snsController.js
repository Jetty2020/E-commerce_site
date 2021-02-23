import passport from "passport";
import db from "../db";
import jwt from "jsonwebtoken";
import moment from "moment";

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
    db.query(`SELECT * from USER where kkoID = '${id}';`,
    function (err, user) {
      var token =  jwt.sign(user[0].userID,'secret');
      var halfHour = moment().add(0.5, 'hour').valueOf();
      if (!(user.length == 0)) {
        db.query(`UPDATE USER SET token = '${token}', tokenExp = '${halfHour}' where kkoEmail = '${email}';`,
          function (err, user) {
            if(err){
              console.log(err);
              return cb(err);
            } else {
              return cb(null, { token, halfHour});
            }
          }
        );
      } else {
        if (email){
          db.query(`INSERT INTO USER (kkoID, kkoEmail, name, emailChecked, token, tokenExp) VALUES('${id}', '${email}', '${name}', TRUE, ${token}, ${halfHour});`, 
          function (err, user) {
            if(err){
              console.log(err);
              return cb(err);
            } else {
              return cb(null, { token, halfHour});
            }
          });
        } else {
          db.query(`INSERT INTO USER (kkoID, name, emailChecked, token, tokenExp) VALUES('${id}', '${name}', TRUE, ${token}, ${halfHour});`, 
          function (err, user) {
            if(err){
              console.log(err);
              return cb(err);
            } else {
              return cb(null, { token, halfHour});
            }
          });
        };
      };
    });
  } catch (error) {
    console.log("kakaoLoginCallback");
    console.log(error);
    return cb(error);
  }
};

export const postKakaoLogin = (req, res) => {
  var {
    user: { token, halfHour }
  } = req;
  return res
  .cookie("w_auth", token)
  .cookie("w_authExp", halfHour)
  .redirect("http://localhost:3000");
};


export const naverLogin = passport.authenticate("naver");

export const naverLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, email, nickname : name }
  } = profile;
  try {
    db.query(`SELECT * from USER where nvrEmail = '${email}';`,
    function (err, user) {
      var token =  jwt.sign(user[0].userID,'secret');
      var halfHour = moment().add(0.5, 'hour').valueOf();
      if (!(user.length == 0)) {
        db.query(`UPDATE USER SET token = '${token}', tokenExp = '${halfHour}' where nvrEmail = '${email}';`,
          function (err, user) {
            if(err){
              console.log(err);
              return cb(err);
            } else {
              return cb(null, { token, halfHour});
            }
          }
        );
      } else {
        if (email){
          db.query(`INSERT INTO USER (nvrID, nvrEmail, name, emailChecked, token, tokenExp) VALUES('${id}', '${email}', '${name}', TRUE, ${token}, ${halfHour});`, 
          function (err, user) {
            if(err){
              console.log(err);
              return cb(err);
            } else {
              return cb(null, { token, halfHour});
            }
          });
        } else {
          db.query(`INSERT INTO USER (nvrID, name, emailChecked, token, tokenExp) VALUES('${id}', '${name}', TRUE, ${token}, ${halfHour});`, 
          function (err, user) {
            if(err){
              console.log(err);
              return cb(err);
            } else {
              return cb(null, { token, halfHour});
            }
          });
        };
      };
    });
  } catch (error) {
    console.log("naverLoginCallback");
    console.log(error);
    return cb(error);
  }
};

export const postNaverLogin = (req, res) => {
  var {
    user: { token, halfHour }
  } = req;
  return res
  .cookie("w_auth", token)
  .cookie("w_authExp", halfHour)
  .redirect("http://localhost:3000");
};


export const googleLogin = passport.authenticate("google", { scope: ['profile'] });

export const googleLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { sub : id, name }
  } = profile;
  try {
    db.query(`SELECT * from USER where gglID = '${id}';`,
    function (err, user) {
      var token =  jwt.sign(user[0].userID,'secret');
      var halfHour = moment().add(0.5, 'hour').valueOf();
      if (!(user.length == 0)) {
        db.query(`UPDATE USER SET token = '${token}', tokenExp = '${halfHour}' where gglID = '${id}';`,
          function (err, user) {
            if(err){
              console.log(err);
              return cb(err);
            } else {
              return cb(null, { token, halfHour});
            }
          }
        );
      } else {
        db.query(`INSERT INTO USER (gglID, name, emailChecked, token, tokenExp) VALUES('${id}', '${name}', TRUE, ${token}, ${halfHour});`, 
          function (err, user) {
            if(err){
              console.log(err);
              return cb(err);
            } else {
              return cb(null, { token, halfHour});
            }
          });
      };
    });
  } catch (error) {
    console.log("googleLoginCallback");
    console.log(error);
    return cb(error);
  }
};

export const postGoogleLogin = (req, res) => {
  var {
    user: { token, halfHour }
  } = req;
  return res
  .cookie("w_auth", token)
  .cookie("w_authExp", halfHour)
  .redirect("http://localhost:3000");
};