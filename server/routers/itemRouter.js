import express from "express";
import routes from "../routes";
import {
  auth
} from "../middleware";
import{
  loadItem,
  uploadItem
} from "../controllers/itemController"

const itemRouter = express.Router();

itemRouter.get(routes.loadItem, auth, loadItem);
itemRouter.post(routes.uploadItem, auth, uploadItem);


export default itemRouter;