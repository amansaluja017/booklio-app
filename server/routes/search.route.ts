import express, { Router } from "express";
import { verifyJWT } from "../middleware/auth";
import { searchCategory, searchServices } from "../controllers/search.controller";

const router: Router = express.Router();

router.route("/search/services").get(verifyJWT, searchServices);
router.route(`/search/category/:query`).get(verifyJWT, searchCategory);


export default router;