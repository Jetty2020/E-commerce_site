import express from "express";
import routes from "../routes";
import { auth } from "../middleware";
import {
  loadReview,
  addReview,
  editReview,
  removeReview,
} from "../controllers/reviewController";

const reviewRouter = express.Router();

reviewRouter.get(routes.loadReview, auth, loadReview);
reviewRouter.post(routes.addReview, auth, addReview);
reviewRouter.post(routes.editReview, auth, editReview);
reviewRouter.delete(routes.removeReview, auth, removeReview);
export default reviewRouter;
