import express from "express";
import routes from "../routes";
import {
  auth,
  uploadItemMiddle
} from "../middleware";
import{
  loadItem,
  uploadItem
} from "../controllers/itemController"

const itemRouter = express.Router();

itemRouter.get(routes.loadItem, auth, loadItem);
itemRouter.post(routes.uploadItem, uploadItemMiddle, auth, uploadItem);


export default itemRouter;