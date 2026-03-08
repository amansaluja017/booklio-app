import express, { Router } from "express";
import { verifyJWT, verifyJWTProvider } from "../middleware/auth";
import { createService, getAllServices, getProviderServices, updateServiceStatus } from "../controllers/services.controller";

const router: Router = express.Router();

router.route("/create").post(verifyJWTProvider ,createService);
router.route("/get-services").get(verifyJWT, getAllServices);
router.route("/get-provider-services").get(verifyJWTProvider, getProviderServices);
router.route("/update-service-status/:serviceId").patch(verifyJWTProvider, updateServiceStatus);



export default router;