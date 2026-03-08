import express, { Router } from "express";
import { verifyJWTAdmin } from "../middleware/auth";
import { getAdminProfile, loginAdmin, logoutAdmin, registerAdmin } from "../controllers/admin.controller";

const router: Router = express.Router();

router.route("/register").post(registerAdmin);
router.route("/get-profile").get(verifyJWTAdmin, getAdminProfile);
router.route("/logout").post(verifyJWTAdmin, logoutAdmin);
router.route("/login").post(loginAdmin);


export default router;