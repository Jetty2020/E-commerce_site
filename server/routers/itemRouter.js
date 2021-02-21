import express from "express";
import routes from "../routes";
import {
  auth
} from "../middleware";
import{
  uploadItem
} from "../controllers/itemController"

const itemRouter = express.Router();

itemRouter.post(routes.uploadItem, auth, uploadItem);


export default itemRouter;