import db from "../db";
import {
  generateToken
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
  db.query(`INSERT INTO USER (userEmail, userPassword) VALUES('${req.body.email}', '${req.body.password}');`, 
  function (err, results) {
    if (err) {
      console.log(err);
      return res.json({ 
        success: false, 
        message: "Error occurred at register"
      });
    };
    return res.status(200).json({
        success: true
    });
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

export const logout = (req, res) => {
  db.query(`UPDATE USER SET token = null, tokenExp = null WHERE userID = '${req.user[0].userID}';`,
  function (err, user) {
    if (err) return res.json({ success: false, message: "Error occurred at logout" });
    return res.status(200).send({
      success: true
    });
  });
};