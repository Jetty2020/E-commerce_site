import jwt from "jsonwebtoken";
import moment from "moment";
import { Product, User, Sequelize as Op } from "../models";
import { mailSender, generateRandom } from "../util";
import dotenv from "dotenv";
dotenv.config();

export const authSuccess = async (req, res) => {
  try {
    const {
      user: { userID, role, userEmail, name, password },
    } = req;
    res.status(200).json({
      userID,
      isAdmin: role === 0 ? false : true,
      isAuth: true,
      userEmail,
      name,
      password,
    });
  } catch (err) {
    console.log("authSuccess");
    console.log(err);
    return res.status(400).send(err).json({
      success: false,
      message: "Error occurred at authSuccess",
    });
  }
};

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
    body: { userID, email, password, name },
  } = req;
  try {
    const user = await User.findOne({
      attributes: ["id"],
      where: {
        userID,
      },
    });
    if (!user) {
      //이매일 중복 확인
      const hash = await generateRandom(111111, 999999);
      const subject = "회원가입을 위한 인증번호를 입력해주세요.";
      const text = "오른쪽 숫자 6자리를 입력해주세요 : " + hash;
      User.create({
        userID,
        name,
        userEmail: email,
        userPassword: password,
        emailHash: hash,
      });
      mailSender.sendGmail(email, subject, text, hash);
      return res.status(200).json({
        success: true,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "The userID is already exsisted.",
      });
    }
  } catch (err) {
    console.log("register");
    console.log(err);
    return res.status(400).send(err).json({
      success: false,
      message: "Error occurred at register",
    });
  }
};

export const login = async (req, res) => {
  const {
    body: { userID, password },
  } = req;
  try {
    const userState = await User.findOne({
      attributes: ["id", "userID", "userEmail", "userPassword"],
      where: {
        userID,
      },
    });
    if (!userState) {
      return res.status(200).json({
        success: false,
        message: "Auth failed, email is not found",
      });
    } else {
      const { dataValues: user } = userState;
      if (user.userPassword !== password) {
        return res
          .status(200)
          .json({ success: false, message: "Wrong password" });
      } else {
        var token = jwt.sign(user.id, process.env.SALT).substr(3, 20);
        var tokenExp = moment().add(0.5, "hour").valueOf();
        User.update(
          {
            token,
            tokenExp,
          },
          {
            where: { id: user.id },
          }
        );
        res.cookie("w_authExp", tokenExp);
        if (!user.emailChecked) {
          return res.status(200).cookie("w_auth", token).json({
            success: true,
            emailChecked: false,
            userId: user.id,
            message: "Email unchecked account",
          });
        } else {
          return res.cookie("w_auth", token).status(200).json({
            success: true,
            emailChecked: true,
            userId: user.id,
          });
        }
      }
    }
  } catch (err) {
    console.log("login");
    console.log(err);
    return res.status(400).send(err).json({
      success: false,
      message: "Error occurred at login",
    });
  }
};

export const editPassword = async (req, res) => {
  const {
    body: { userID, userPassword },
  } = req;
  try {
    console.log(userID, userPassword);
    User.update(
      { userPassword },
      { where: { userID } }
    );
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log("editPassword");
    console.log(err);
    return res.status(400).send(err).json({
      success: false,
      message: "Error occurred at editPassword",
    });
  }
};

export const checkEmail = async (req, res) => {
  const {
    user: { userID: id },
    body: { emailHash },
  } = req;
  try {
    const { dataValues: user } = await User.findOne({
      attributes: ["userID", "userEmail", "userPassword", "emailHash"],
      where: {
        id,
      },
    });
    if (emailHash == user.emailHash) {
      User.update(
        {
          emailChecked: true,
          emailHash: null,
        },
        {
          where: { id },
        }
      );
      return res.status(200).json({
        success: true,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Wrong emailHash!",
      });
    }
  } catch (err) {
    console.log("checkEmail");
    console.log(err);
    return res
      .status(400)
      .send(err)
      .json({ success: false, message: "Error occurred at checkEmail" });
  }
};

export const findID = async (req, res) => {
  const {
    body: { email },
  } = req;
  const subject = "요청하신 ID 입니다";
  try {
    const { dataValues: user } = await User.findOne({
      attributes: ["userEmail", "userID"],
      where: {
        userEmail: email,
      },
    });
    const userID = user.userID.slice(0, user.userID.length - 3) + "***";
    const text = "회원님의 ID 입니다 : " + userID;
    mailSender.sendGmail(email, subject, text);
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log("findID");
    console.log(err);
    return res
      .status(400)
      .send(err)
      .json({ success: false, message: "Error occurred at findID" });
  }
};

export const findPassword = async (req, res) => {
  const {
    body: { email },
  } = req;
  try {
    const subject = "새 비밀번호입니다";
    const newPassword = await generateRandom(111111, 999999);
    const text = "새로운 비밀번호 : " + newPassword;
    User.update(
      {
        userPassword: newPassword,
      },
      {
        where: { userEmail: email },
      }
    );
    mailSender.sendGmail(email, subject, text);
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log("findPassword");
    console.log(err);
    return res
      .status(400)
      .send(err)
      .json({ success: false, message: "Error occurred at findPassword" });
  }
};

export const logout = (req, res) => {
  const {
    user: { id },
  } = req;
  try {
    User.update(
      {
        token: null,
        tokenExp: null,
      },
      {
        where: { id },
      }
    );
    return res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log("logout");
    console.log(err);
    return res
      .status(400)
      .send(err)
      .json({ success: false, message: "Error occurred at logout" });
  }
};

export const addCart = async (req, res) => {
  const {
    body: { productId },
    user: { id: producter },
  } = req;

  try {
    console.log(productId, producter);
    const findProduct = await Product.findOne({
      where: parseInt(productId, 10),
    });

    findProduct.addUserCart(producter);
    return res.status(200).send({
      success: true,
    });
  } catch (error) {
    return res
      .status(401)
      .send(error)
      .json({ success: false, message: "존재하지 않은 상품입니다." });
  }
};
export const removeCart = async (req, res) => {
  const {
    body: { productId },
    user: { id: producter },
  } = req;

  try {
    console.log(productId, producter);
    const findProduct = await Product.findOne({
      where: parseInt(productId, 10),
    });

    findProduct.removeUserCart(producter);
    return res.status(200).send({
      success: true,
    });
  } catch (error) {
    return res
      .status(401)
      .send(error)
      .json({ success: false, message: "존재하지 않은 상품입니다." });
  }
};

export const addWishList = async (req, res) => {
  const {
    body: { productId },
    user: { id: producter },
  } = req;

  try {
    console.log(productId, producter);
    const findProduct = await Product.findOne({
      where: parseInt(productId, 10),
    });

    findProduct.addWishList(producter);
    return res.status(200).send({
      success: true,
    });
  } catch (error) {
    return res
      .status(401)
      .send(error)
      .json({ success: false, message: "존재하지 않은 상품입니다." });
  }
};

export const removeWishList = async (req, res) => {
  const {
    body: { productId },
    user: { id: producter },
  } = req;

  try {
    console.log(productId, producter);
    const findProduct = await Product.findOne({
      where: parseInt(productId, 10),
    });

    findProduct.removeWishList(producter);
    return res.status(200).send({
      success: true,
    });
  } catch (error) {
    return res
      .status(401)
      .send(error)
      .json({ success: false, message: "존재하지 않은 상품입니다." });
  }
};
