// import db from "../db";
// import jwt from "jsonwebtoken";
// import moment from "moment";
import { User, Sequelize as Op } from "../models";
// const {User, Sequelize: { Op }} = require('../models');
import { mailSender } from "../util";

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
  const user = await User.findOne({
    where: {
      userEmail: email,
    },
  });
  if (!user) { //이매일 중복 확인
    try {
      User.create({
        userEmail: email,
        userPassword: password,
      });
      mailSender.sendGmail(req);
      return res.status(200).json({
        success: true
      });
      
    } catch (err) {
      console.log(err);
      return res.json({ 
        success: false, 
        message: "Error occurred at register"
      })
    }
  } else {
    return res.status(200).json({
      success: false,
      message: "The email is already exsisted."
    });
  };
  
  // db.query(`SELECT userEmail FROM USER WHERE userEmail = '${req.body.email}';`, 
  // function (err, results) {
  //   if (results.length == 0) { //이매일 중복 확인
  //     db.query(`INSERT INTO USER (userEmail, userPassword) VALUES('${req.body.email}', '${req.body.password}');`, 
  //     function (err, results) {
  //       if (err) {
  //         console.log(err);
  //         return res.json({ 
  //           success: false, 
  //           message: "Error occurred at register"
  //         });
  //       };
  //       mailSender.sendGmail(req);
  //       return res.status(200).json({
  //           success: true
  //       });
  //     });
  //   } else {
  //     return res.status(200).json({
  //       success: false,
  //       message: "The email is already exsisted."
  //     });
  //   };
  // });
};

// export const postLogin = async (req, res) => {
//   db.query(`SELECT * from USER where userEmail = '${req.body.email}';`, 
//   function (err, user) {
//     if ((user.length == 0)) {
//       return res.json({
//         success: false,
//         message: "Auth failed, email not found"
//       });
//     } else {
//       if (user[0].userPassword !== req.body.password) {
//         return res.json({ success: false, message: "Wrong password" });
//       } else {
//         var token =  jwt.sign(user[0].userID,'secret');
//         var halfHour = moment().add(0.5, 'hour').valueOf();
//         db.query(`UPDATE USER SET token = '${token}', tokenExp = '${halfHour}' WHERE userID = '${user[0].userID}';`,
//         function (err, updateUser) {
//           if (err) {
//             return res.status(400).send(err);
//           } else {
//             res.cookie("w_authExp", halfHour);
//             if (!user[0].emailChecked) {
//               res
//                 .cookie("w_auth", token)
//                 .status(200)
//                 .json({
//                   success: true, 
//                   userId: user[0].userID,
//                   message: "Unchecked email"
//                 });
//             } else {
//               res
//                 .cookie("w_auth", token)
//                 .status(200)
//                 .json({
//                   success: true, userId: user[0].userID
//                 });
//             }
//           }
//         });
//       };
//     };
//   });
// };

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