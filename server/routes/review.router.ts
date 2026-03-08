import express, { Router } from "express";
import { verifyJWT, verifyJWTAdmin } from "../middleware/auth";
import { getReviews, postReview, getAllReviews, deleteReview } from "../controllers/review.controller";

const router: Router = express.Router();

router.route("/post-review").post(verifyJWT, postReview);
router.route("/get-reviews").get(verifyJWT, getReviews);
router.route("/get-all-reviews").get(verifyJWTAdmin, getAllReviews);
router.route("/delete-review/:reviewId").delete(verifyJWTAdmin, deleteReview);


export default router;