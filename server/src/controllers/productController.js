// import db from "../db";
import { Product, User, Comment, Sequelize } from "../models";

export const uploadProduct = async (req, res) => {
  const {
    body: { productName, price, stock },
  } = req;
  const { files } = req;
  try {
    const { dataValues: product } = await Product.create({
      productName,
      mainImg: files[0].location,
      descImg: files[1].location,
      price,
      stock,
    });
    return res.status(200).json({
      success: true,
      productID: product.id,
    });
  } catch (err) {
    console.log("uploadProduct");
    console.log(err);
    return res.json({
      success: false,
      message: "Error occurred at uploadProduct",
    });
  }
};

export const loadProduct = async (req, res) => {
  try {
    const Op = Sequelize.Op;
    const {
      params: { sector },
    } = req;
    let productState = [];
    if (sector === "newProduct") {
      productState = await Product.findAll({
        where: { newProduct: true },
      });
    } else if (sector === "bestProduct") {
      productState = await Product.findAll({
        where: { bestProduct: true },
      });
    } else if (sector === "recoProduct") {
      productState = await Product.findAll({
        where: { recoProduct: true },
      });
    } else if (sector === "discountProduct") {
      productState = await Product.findAll({
        where: { rate: {[Op.gt]: 0} },
      });
    } else if (sector === "all") {
      productState = await Product.findAll({});
    }
    if (productState) {
      return res.status(200).json({
        success: true,
        product: productState,
      });
    } else {
      return res.status(200).json({
        success: true,
        product: null,
      });
    }
  } catch (err) {
    console.log("loadProduct");
    console.log(err);
    return res.json({
      success: false,
      message: "Error occurred at loadproduct",
    });
  }
};

export const productDetail = async (req, res) => {
  try {
    const {
      body: { productId },
    } = req;
    const productState = await Product.findOne({
      where: parseInt(productId, 10),
    });

    if (productState.length != 0) {
      return res.status(200).json({
        success: true,
        product: productState,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Cant find Product",
        product: null,
      });
    }
  } catch (err) {
    console.log("productDetail");
    console.log(err);
    return res.json({
      success: false,
      message: "Error occurred at productDetail",
    });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const Op = Sequelize.Op;
    const {
      body: { searchKey },
    } = req;
    const productState = await Product.findAll({
      where: {
        productName: {
          [Op.like]: "%" + searchKey + "%",
        },
      },
    });

    if (productState.length != 0) {
      return res.status(200).json({
        success: true,
        product: productState,
      });
    } else {
      return res.status(200).json({
        success: true,
        product: null,
      });
    }
  } catch (err) {
    console.log("searchProduct");
    console.log(err);
    return res.json({
      success: false,
      message: "Error occurred at searchProduct",
    });
  }
};

export const editProduct = async (req, res) => {
  const {
    body: { id, rate, price, category },
  } = req;
  try {
    const productOne = await Product.findOne(
      {
        where: {
          id,
        },
      }
    );

    if (category === 'BnN') {
      productOne.update(
      {
        bestProduct: true,
        newProduct: true,
      }
    );
    } else if (category === 'Best') {
      productOne.update(
      {
        bestProduct: true,
        newProduct: false,
      }
    );
    } else if (category === 'New') {
      productOne.update(
      {
        bestProduct: false,
        newProduct: true,
      }
    );
    } else {
      productOne.update(
      {
        bestProduct: false,
        newProduct: false,
      }
    );
    }
    productOne.update(
      {
        rate,
        price,
      }
    );
    return res.status(200).json({
      success: true,
      productID: id,
    });
  } catch (err) {
    console.log("editProduct");
    console.log(err);
    return res.json({
      success: false,
      message: "Error occurred at editProduct",
    });
  }
};

export const deleteProduct = (req, res) => {
  const {
    params: { productID },
  } = req;
  try {
    Product.destroy({
      where: {
        id: productID,
      },
    });
    return res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log("deleteProduct");
    console.log(err);
    return res.json({
      success: false,
      message: "Error occurred at deleteProduct",
    });
  }
};
export const addComment = async (req, res) => {
  try {
    const {
      body: { comment },
      params: { id: productId },
      user: { id: producter },
    } = req;

    const findProduct = await Product.findOne({
      where: parseInt(productId, 10),
    });
    const createComment = await Comment.create({
      text: comment,
      userId: producter,
      productId: findProduct.id,
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
export const editComment = async (req, res) => {
  try {
    const {
      body: { comment, commentId },
      params: { id: productId },
      user: { id: producter },
    } = req;

    const findProduct = await Product.findOne({
      where: parseInt(productId, 10),
    });
    await Comment.update(
      {
        text: comment,
      },
      {
        where: {
          id: commentId,
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
export const removeComment = async (req, res) => {
  try {
    const {
      body: { commentId },
      params: { id: productId },
      user: { id: producter },
    } = req;

    const findProduct = await Product.findOne({
      where: parseInt(productId, 10),
    });
    await Comment.destroy({
      where: {
        id: commentId,
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
