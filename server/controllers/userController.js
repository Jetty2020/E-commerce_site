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
    } else {
      if (user[0].userPassword !== req.body.password) {
        return res.json({ success: false, message: "Wrong password" });
      } else {
        if (!user[0].emailChecked) {
          generateToken(user, (err, user) => {
            if (err) return res.status(400).send(err);
            res.cookie("w_authExp", user.tokenExp);
            res
              .cookie("w_auth", user[0].token)
              .status(200)
              .json({
                success: true, 
                userId: user[0].userID,
                message: "Unchecked email"
              });
          });
        } else {
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
        }
      };
    };
  });
};

export const checkEmail = async (req, res) => {
  db.query(`SELECT * from USER WHERE userID = '${req.user[0].userID}';`, 
  function (err, user) {
    if (req.body.emailHash == user[0].emailHash) {
      db.query(`UPDATE USER SET emailChecked = TRUE, emailHash = NULL WHERE userID = '${req.user[0].userID}';`,
      function (err, user) {
        if (err){
          console.log(err);
          return res.json({ success: false, message: "Error occurred at checkEmail" });
        } 
        return res.status(200).send({
          success: true
        });
      });
    }
  });
};

export const logout = (req, res) => {
  console.log(req);
  db.query(`UPDATE USER SET token = null, tokenExp = null WHERE userID = '${req.user[0].userID}';`,
  function (err, user) {
    if (err){
      console.log(err);
      return res.json({ success: false, message: "Error occurred at logout" });
    } 
    return res.status(200).send({
      success: true
    });
  });
};