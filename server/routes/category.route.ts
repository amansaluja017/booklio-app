import express, { Router } from "express";
import { verifyJWTAdmin } from "../middleware/auth";
import { createCategory, getCategories, deleteCategory } from "../controllers/category.controller";

const router: Router = express.Router();

router.route("/create-category").post(verifyJWTAdmin ,createCategory);
router.route("/get-categories").get(getCategories);
router.route("/delete-category/:categoryId").delete(verifyJWTAdmin, deleteCategory);


export default router;