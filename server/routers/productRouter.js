import express from "express";
import routes from "../routes";
import { auth, uploadFile } from "../middleware";
import {
  loadProduct,
  makeEventProduct,
  searchProduct,
  uploadProduct,
  editProduct,
  deleteProduct,
  addComment,
  editComment,
  removeComment,
} from "../controllers/productController";

const productRouter = express.Router();

productRouter.get(routes.loadProduct, loadProduct);
productRouter.get(routes.makeEventProduct, makeEventProduct);
productRouter.post(routes.searchProduct, searchProduct);
productRouter.post(
  routes.uploadProduct,
  auth,
  uploadFile.uploadImageToS3,
  uploadProduct
);
productRouter.post(routes.editProduct, auth, editProduct);
productRouter.post(routes.deleteProduct, auth, deleteProduct);
productRouter.post(routes.addComment, auth, addComment);
productRouter.post(routes.editComment, auth, editComment);
productRouter.delete(routes.removeComment, auth, removeComment);
export default productRouter;
