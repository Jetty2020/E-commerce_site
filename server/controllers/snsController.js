import passport from "passport";
import { User } from "../models";
import jwt from "jsonwebtoken";
import moment from "moment";
import dotenv from "dotenv";
dotenv.config();

export const kakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id: kkoID }
  } = profile;
  const {
    properties: { nickname: name }
  } = profile._json;
  const {
    kakao_account: { email: kkoEmail }
  } = profile._json;
  try {
    const userState = await User.findOne({
      attributes: ['id'],
      where: {
        kkoID,
      },
    });
    var token =  jwt.sign(kkoID, process.env.SALT).substr(3, 20);
    var tokenExp = moment().add(0.5, 'hour').valueOf();
    if (!userState) {
      if (kkoEmail){
        User.create({
          kkoID,
          kkoEmail,
          name,
          emailChecked: true,
          token,
          tokenExp,
        })
        return cb(null, { token, tokenExp});
      } else {
        User.create({
          kkoID,
          name,
          emailChecked: true,
          token,
          tokenExp,
        })
        return cb(null, { token, tokenExp});
      };
    } else {
      User.update({
        token,
        tokenExp
      }, {
        where: { kkoID }
      })
      return cb(null, { token, tokenExp});
    }
  } catch (error) {
    console.log("kakaoLoginCallback");
    console.log(error);
    return cb(error);
  }
};

export const postKakaoLogin = (req, res) => {
  var {
    user: { token, tokenExp }
  } = req;
  return res
  .cookie("w_auth", token)
  .cookie("w_authExp", tokenExp)
  .redirect("http://localhost:3000");
};

export const naverLogin = passport.authenticate("naver");

export const naverLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id: nvrID, email: nvrEmail, nickname : name }
  } = profile;
  try {
    const userState = await User.findOne({
      attributes: ['id'],
      where: {
        nvrID,
      },
    });
    var token =  jwt.sign(nvrID, process.env.SALT).substr(3, 20);
    var tokenExp = moment().add(0.5, 'hour').valueOf();
    if (!userState) {
      if (nvrEmail){
        User.create({
          nvrID,
          nvrEmail,
          name,
          emailChecked: true,
          token,
          tokenExp,
        })
        return cb(null, { token, tokenExp});
      } else {
        User.create({
          nvrID,
          name,
          emailChecked: true,
          token,
          tokenExp,
        })
        return cb(null, { token, tokenExp});
      };
    } else {
      User.update({
        token,
        tokenExp
      }, {
        where: { nvrID }
      })
      return cb(null, { token, tokenExp});
    }
  } catch (error) {
    console.log("naverLoginCallback");
    console.log(error);
    return cb(error);
  }
};

export const postNaverLogin = (req, res) => {
  var {
    user: { token, tokenExp }
  } = req;
  return res
  .cookie("w_auth", token)
  .cookie("w_authExp", tokenExp)
  .redirect("http://localhost:3000");
};

export const googleLogin = passport.authenticate("google", { scope: ['profile'] });

export const googleLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { sub : gglID, name }
  } = profile;
  console.log(profile);
  try {
    const userState = await User.findOne({
      attributes: ['id'],
      where: {
        gglID,
      },
    });
    var token =  jwt.sign(gglID, process.env.SALT).substr(3, 20);
    var tokenExp = moment().add(0.5, 'hour').valueOf();
    if (!userState) {
      User.create({
        gglID,
        name,
        emailChecked: true,
        token,
        tokenExp,
      })
      return cb(null, { token, tokenExp});
    } else {
      User.update({
        token,
        tokenExp
      }, {
        where: { gglID }
      })
      return cb(null, { token, tokenExp});
    }
  } catch (error) {
    console.log("googleLoginCallback");
    console.log(error);
    return cb(error);
  }
};

export const postGoogleLogin = (req, res) => {
  var {
    user: { token, tokenExp }
  } = req;
  return res
  .cookie("w_auth", token)
  .cookie("w_authExp", tokenExp)
  .redirect("http://localhost:3000");
};