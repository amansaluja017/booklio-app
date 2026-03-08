import express, { Router } from "express";
import { getProviderProfile, loginProvider, logoutProvider, registerProvider, updateProviderPassword, updateProviderProfile, getAllProviders, approveProvider, rejectProvider } from "../controllers/provider.controller";
import { verifyJWTProvider } from "../middleware/auth";
import { verifyJWTAdmin } from "../middleware/auth";

const router: Router = express.Router();

router.route("/register").post(registerProvider);
router.route("/login").post(loginProvider);
router.route("/get-profile").get(verifyJWTProvider, getProviderProfile);
router.route("/logout").post(verifyJWTProvider, logoutProvider);
router.route("/store-setup").put(verifyJWTProvider, updateProviderProfile);
router.route("/update-password").patch(verifyJWTProvider, updateProviderPassword);
router.route("/get-all-providers").get(verifyJWTAdmin, getAllProviders);
router.route("/approve/:providerId").patch(verifyJWTAdmin, approveProvider);
router.route("/reject/:providerId").delete(verifyJWTAdmin, rejectProvider);


export default router;