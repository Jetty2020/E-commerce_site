// import db from "../db";
import { Product, User, QnA } from "../models";
import moment from "moment";

export const loadQnA = async (req, res) => {
  try {
    const {
      params: { productId },
    } = req;
    const QnAs = await QnA.findAll({
      include: [
        {
          model: User,
          attributes: ['userID']
        }
      ],
      where: { productId },
      order: [['id', 'DESC']],
    });
    if (QnAs) {
      return res.status(200).json({
        success: true,
        QnA: QnAs,
      });
    } else {
      return res.status(200).json({
        success: true,
        QnA: null,
      });
    }
  } catch (err) {
    console.log("loadQnA");
    console.log(err);
    return res.json({
      success: false,
      message: "Error occurred at loadQnA",
    });
  }
};

export const addQnA = async (req, res) => {
  try {
    const {
      body: { QnAText, secret },
      params: { id: productId },
      user: { id: producter },
    } = req;
    const findProduct = await Product.findOne({
      where: parseInt(productId, 10),
    });
    const now = moment().format('YYYY-MM-DD');
    const createQnA = await QnA.create({
      text: QnAText,
      secret,
      date: now,
      userId: producter,
      productId: findProduct.id,
    });
    return res.status(200).send({
      success: true,
      QnA: createQnA.dataValues,
    });
  } catch (error) {
    return res
      .status(401)
      .send(error)
      .json({ success: false, message: "존재하지 않은 상품입니다." });
  }
};
export const editQnA = async (req, res) => {
  try {
    const {
      body: { QnA, QnAId },
      params: { id: productId },
      user: { id: producter },
    } = req;
    const findProduct = await Product.findOne({
      where: parseInt(productId, 10),
    });
    await QnA.update(
      {
        text: QnA,
      },
      {
        where: {
          id: QnAId,
          userId: producter,
          productId: findProduct.id,
        },
      }
    );
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
export const removeQnA = async (req, res) => {
  try {
    const {
      body: { QnAId },
      params: { id: productId },
      user: { id: producter },
    } = req;

    const findProduct = await Product.findOne({
      where: parseInt(productId, 10),
    });

    await QnA.destroy({
      where: {
        id: QnAId,
        productId: findProduct.id,
      },
    });

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
