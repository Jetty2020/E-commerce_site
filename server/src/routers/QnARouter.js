import express from "express";
import routes from "../routes";
import { auth } from "../middleware";
import {
  loadQnA,
  addQnA,
  editQnA,
  removeQnA,
} from "../controllers/QnAController";

const QnARouter = express.Router();

QnARouter.get(routes.loadQnA, auth, loadQnA);
QnARouter.post(routes.addQnA, auth, addQnA);
QnARouter.post(routes.editQnA, auth, editQnA);
QnARouter.delete(routes.removeQnA, auth, removeQnA);
export default QnARouter;
