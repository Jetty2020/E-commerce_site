import express from "express";
import routes from "../routes";
import {
  auth,
  uploadFile
} from "../middleware";
import{
  loadProduct,
  uploadProduct,
  // editProduct,
  // deleteProduct
} from "../controllers/productController"

const productRouter = express.Router();

productRouter.get(routes.loadProduct, loadProduct);
productRouter.post(routes.uploadProduct, auth, uploadFile.uploadImageToS3, uploadProduct);
// productRouter.post(routes.editProduct, auth, editProduct);
// productRouter.post(routes.deleteProduct, auth, deleteProduct);


export default productRouter;