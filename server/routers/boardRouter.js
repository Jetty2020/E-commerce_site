import express from "express";
import routes from "../routes";
import {
  auth
} from "../middleware";
import{
  loadBoard,
  uploadBoard,
  editBoard,
  searchBoard,
  detailBoard,
  deleteBoard
} from "../controllers/boardController"

const boardRouter = express.Router();

boardRouter.get(routes.loadBoard, loadBoard);
boardRouter.post(routes.uploadBoard, auth, uploadBoard);
boardRouter.post(routes.editBoard, auth, editBoard);
boardRouter.post(routes.searchBoard, auth, searchBoard);
boardRouter.post(routes.detailBoard, detailBoard);
boardRouter.post(routes.deleteBoard, auth, deleteBoard);

export default boardRouter;
