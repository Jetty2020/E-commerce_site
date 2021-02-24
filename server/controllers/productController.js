import db from "../db";

export const uploadProduct = function (req, res) {
  const {
    body: { name, description }
  } = req;
  const { location } = req;
  db.query(`INSERT INTO PRODUCT (userID, productName, productDes, fileURL) VALUES('${req.user[0].userID}', '${name}', '${description}', '${location}');`, 
  function (err, product) {
    if (err) {
      console.log(err);
      return res.json({ 
        success: false, 
        message: "Error occurred at uploadProduct"
      });
    };
    return res.status(200).json({
        success: true,
        productID: product.productId,
    });
  });
};

export const loadProduct = (req, res) => {
  db.query(`SELECT * FROM PRODUCT WHERE userID = '${req.user[0].userID}';`, 
  function (err, product) {
    if (err){
      console.log(err);
      return res.json({ success: false, message: "Error occurred at loadproduct" });
    } 
    return res.status(200).send({
      success: true,
      product: product
    });
  });
};

export const editProduct = (req, res) => {
  const {
    body: { 
      productID, 
      productName,
      productDes,
    }
  } = req;
  db.query(`UPDATE PRODUCT SET productName = '${productName}', productDes = '${productDes}' WHERE productID = '${productID}';`,
  function (err, product) {
    if (err){
      console.log(err);
      return res.json({ success: false, message: "Error occurred at loadproduct" });
    } 
    return res.status(200).send({
      success: true,
      productID: productID
    });
  });
};