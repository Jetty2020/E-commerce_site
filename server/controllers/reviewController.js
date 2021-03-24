// import db from "../db";
import { Product, User, Review, Sequelize } from "../models";
import moment from "moment";

export const loadReview = async (req, res) => {
  try {
    const {
      params: { productId },
    } = req;
    const reviews = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ['userID']
        }
      ],
      where: { productId },
      order: [['id', 'DESC']],
    });
    if (reviews) {
      return res.status(200).json({
        success: true,
        review: reviews,
      });
    } else {
      return res.status(200).json({
        success: true,
        review: null,
      });
    }
  } catch (err) {
    console.log("loadReview");
    console.log(err);
    return res.json({
      success: false,
      message: "Error occurred at loadReview",
    });
  }
};

export const addReview = async (req, res) => {
  try {
    const {
      body: { review, rate },
      params: { id: productId },
      user: { id: producter },
    } = req;
    const findProduct = await Product.findOne({
      where: parseInt(productId, 10),
    });
    const now = moment().format('YYYY-MM-DD');
    const createReview = await Review.create({
      text: review,
      rate,
      date: now,
      userId: producter,
      productId: findProduct.id,
    });
    return res.status(200).send({
      success: true,
      review: createReview.dataValues,
    });
  } catch (error) {
    return res
      .status(401)
      .send(error)
      .json({ success: false, message: "존재하지 않은 상품입니다." });
  }
};
export const editReview = async (req, res) => {
  try {
    const {
      body: { review, reviewId },
      params: { id: productId },
      user: { id: producter },
    } = req;
    const findProduct = await Product.findOne({
      where: parseInt(productId, 10),
    });
    await Review.update(
      {
        text: review,
      },
      {
        where: {
          id: reviewId,
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
export const removeReview = async (req, res) => {
  try {
    const {
      body: { reviewId },
      params: { id: productId },
      user: { id: producter },
    } = req;

    const findProduct = await Product.findOne({
      where: parseInt(productId, 10),
    });
    console.log(findProduct.id, reviewId);

    await Review.destroy({
      where: {
        id: reviewId,
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
