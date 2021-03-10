// import db from "../db";
import { Product, User, Comment, Sequelize } from "../models";

export const uploadProduct = async (req, res) => {
  const {
    body: { productName, productDes, price, stock },
    // user: { id: producter },
  } = req;
  const { location: fileURL } = req;
  try {
    const { dataValues: product } = await Product.create({
      productName,
      productDes,
      fileURL,
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
    const {
      body: { sector },
    } = req;
    let productState = [];
    if ( sector === "newProduct" ) {
      productState = await Product.findAll({
        where: { newProduct: true },
      });
    } else if ( sector === "saleProduct" ) {
      productState = await Product.findAll({
        where: { saleProduct: true },
      });
    } else if ( sector === "recoProduct" ) {
      productState = await Product.findAll({
        where: { recoProduct: true },
      });
    } else {
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

export const makeEventProduct = async (req, res) => {
  try {
    const {
      body: { sector, id },
    } = req;
    if ( sector === "newProduct" ) {
      id.map(
        id => 
        Product.update(
          { newProduct: true },
          { where: { id }, }
        )
      );
    } else if ( sector === "saleProduct" ) {
      id.map(
        id =>
        Product.update(
          { saleProduct: true },
          { where: { id }, }
        )
      );
    } else if ( sector === "recoProduct" ) {
      id.map(
        id =>
        Product.update(
          { recoProduct: true },
          { where: { id }, }
        )
      );
    }
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log("makeEventProduct");
    console.log(err);
    return res.json({
      success: false,
      message: "Error occurred at makeEventProduct",
    });
  }
};

export const removeEventProduct = async (req, res) => {
  try {
    const {
      body: { sector, id },
    } = req;
    if ( sector === "newProduct" ) {
      id.map(
        id => 
        Product.update(
          { newProduct: false },
          { where: { id }, }
        )
      );
    } else if ( sector === "saleProduct" ) {
      id.map(
        id =>
        Product.update(
          { saleProduct: false },
          { where: { id }, }
        )
      );
    } else if ( sector === "recoProduct" ) {
      id.map(
        id =>
        Product.update(
          { recoProduct: false },
          { where: { id }, }
        )
      );
    }
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log("makeEventProduct");
    console.log(err);
    return res.json({
      success: false,
      message: "Error occurred at makeEventProduct",
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
      // include: [
      //   {
      //     model: User,
      //     // attributes: ['name', 'u']
      //   },
      // ],
      // attributes: ['id', 'userEmail', 'userPassword'],
      // where: { productName },
      where: { 
        // [Op.or]: {
        //   productName:{
        //     [Op.like]: "%" + searchKey + "%"
        //   },
        //   productDes:{
        //     [Op.like]: "%" + searchKey + "%"
        //   }
        // }
        productName:{
          [Op.like]: "%" + searchKey + "%"
        }
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

export const editProduct = (req, res) => {
  const {
    body: { productID: id, productName, productDes },
  } = req;
  try {
    Product.update(
      {
        productName,
        productDes,
      },
      {
        where: {
          id,
        },
      }
    );
    return res.status(200).json({
      success: true,
      productID: productID,
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
    body: { productID: id },
  } = req;
  try {
    Product.destroy({
      where: {
        id,
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
    console.log(findProduct.id, commentId);

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
