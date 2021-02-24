import express from "express";
import routes from "../routes";
import {
  auth,
  uploadFile
} from "../middleware";
import{
  loadProduct,
  uploadProduct
} from "../controllers/productController"

const productRouter = express.Router();

productRouter.get(routes.loadProduct, auth, loadProduct);
productRouter.post(routes.uploadProduct, auth, uploadFile.uploadImageToS3, uploadProduct);


export default productRouter;