// import db from "../db";
import jwt from "jsonwebtoken";
import moment from "moment";
import { User, Sequelize as Op } from "../models";
import { mailSender } from "../util";
import dotenv from "dotenv";
dotenv.config();

// export const authSuccess = async (req, res) => {
//   res.status(200).json({
//     userID: req.user[0].userID,
//     isAdmin: req.user.role === 0 ? false : true,
//     isAuth: true,
//     email: req.user[0].userEmail,
//     name: req.user[0].name,
//   });
// };

// export const userDetail = async (req, res) => {
//   res.status(200).json({
//     userID: req.user[0].userID, //수정
//     isAdmin: req.user.role === 0 ? false : true,
//     isAuth: true,
//     email: req.user[0].userEmail,
//     name: req.user[0].name,
//   });
// };

export const register = async (req, res) => {
  const { 
    body : {email, password},
  } = req;
  const user= await User.findOne({
    attributes: ['id'],
    where: {
      userEmail: email,
    },
  });
  try {
    if (!user) { //이매일 중복 확인
      User.create({
        userEmail: email,
        userPassword: password,
      });
      mailSender.sendGmail(req);
      return res.status(200).json({
        success: true
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "The email is already exsisted."
      });
    };
  } catch (err) {
    console.log(err);
    return res.status(400).send(err).json({ 
      success: false, 
      message: "Error occurred at register"
    })
  }
};

export const login = async (req, res) => {
  const { 
    body : {email, password},
  } = req;
  const userState = await User.findOne({
    attributes: ['id', 'userEmail', 'userPassword'],
    where: {
      userEmail: email,
    },
  });
  try {
    if (!userState) {
      return res.status(200).json({
        success: false,
        message: "Auth failed, email is not found"
      });
    } else {
      const {
        dataValues: user
      } = userState;
      if (user.userPassword !== password) {
        return res.status(200).json({ success: false, message: "Wrong password" });
      } else {
        var token =  jwt.sign(user.id, process.env.SALT);
        var tokenExp = moment().add(0.5, 'hour').valueOf();
        User.update({
          token,
          tokenExp,
        }, {
            where: { id: user.id },
        });
        res.cookie("w_authExp", tokenExp);
        if (!user.emailChecked) {
          return res
            .status(200)
            .json({
              success: true,
              emailChecked: false, 
              userId: user.id,
              message: "Email unchecked account."
            });
        } else {
          return res
            .cookie("w_auth", token).status(200)
            .json({
              success: true,
              emailChecked: true,
              userId: user.id
            });
        }
      };
    };
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      // .send(err)
      .json({ 
        success: false, 
        message: "Error occurred at login"
      })
  }
};

// export const checkEmail = async (req, res) => {
//   db.query(`SELECT * from USER WHERE userID = '${req.user[0].userID}';`, 
//   function (err, user) {
//     if (req.body.emailHash == user[0].emailHash) {
//       db.query(`UPDATE USER SET emailChecked = TRUE, emailHash = NULL WHERE userID = '${req.user[0].userID}';`,
//       function (err, user) {
//         if (err){
//           console.log(err);
//           return res.json({ success: false, message: "Error occurred at checkEmail" });
//         } 
//         return res.status(200).send({
//           success: true
//         });
//       });
//     }
//   });
// };

// export const logout = (req, res) => {
//   db.query(`UPDATE USER SET token = null, tokenExp = null WHERE userID = '${req.user[0].userID}';`,
//   function (err, user) {
//     if (err){
//       console.log(err);
//       return res.json({ success: false, message: "Error occurred at logout" });
//     } 
//     return res.status(200).send({
//       success: true
//     });
//   });
// };