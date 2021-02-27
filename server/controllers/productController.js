// import db from "../db";
import { Product, User, Sequelize as Op } from "../models";

export const uploadProduct = async (req, res) => {
  const {
    body: { name: productName, description: productDes },
    user: { id: producter }
  } = req;
  const { location: fileURL } = req;
  try {
    const { 
      dataValues: product 
    } = await Product.create({
      productName,
      productDes,
      fileURL,
      producter
    })
    return res.status(200).json({
      success: true,
      productID: product.id,
    });
  } catch (err) {
    console.log("uploadProduct");
    console.log(err);
    return res.json({ 
      success: false, 
      message: "Error occurred at uploadProduct"
    });
  }
};

export const loadProduct = async (req, res) => {
  try{
    const productState = await Product.findAll({
      include: [
        {
          model: User,
          // attributes: ['name', 'u']
        }
     ],
      // attributes: ['id', 'userEmail', 'userPassword'],
      where: { producter: req.body.id },
    });
    // console.log(productState[1].dataValues);
    if (productState) {
      return res.status(200).json({
        success: true,
        product: productState
      });
    } else {
      return res.status(200).json({
        success: true,
        product: null
      });
    }
  } catch (err) {
    console.log("loadProduct");
    console.log(err);
    return res.json({ success: false, message: "Error occurred at loadproduct" });
  }
};

// export const editProduct = (req, res) => {
//   const {
//     body: { 
//       productID, 
//       productName,
//       productDes,
//     }
//   } = req;
//   db.query(`UPDATE PRODUCT SET productName = '${productName}', productDes = '${productDes}' WHERE productID = '${productID}';`,
//   function (err, product) {
//     if (err){
//       console.log(err);
//       return res.json({ success: false, message: "Error occurred at editProduct" });
//     } 
//     return res.status(200).send({
//       success: true,
//       productID: productID
//     });
//   });
// };

// export const deleteProduct = (req, res) => {
//   const {
//     body: { productID }
//   } = req;
//   db.query(`DELETE FROM PRODUCT WHERE productID = '${productID}';`,
//   function (err, product) {
//     if (err){
//       console.log(err);
//       return res.json({ success: false, message: "Error occurred at deleteProduct" });
//     } 
//     return res.status(200).send({
//       success: true,
//     });
//   });
// };