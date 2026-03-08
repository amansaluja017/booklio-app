import express, { Router } from "express";
import { verifyJWT } from "../middleware/auth";
import { getCustomerProfile, loginCustomer, logoutCustomer, registerCustomer, updateCustomerAddress, updateCustomerPassword } from "../controllers/customer.controller";

const router: Router = express.Router();

router.route("/register").post(registerCustomer);
router.route("/get-profile").get(verifyJWT, getCustomerProfile);
router.route("/logout").post(verifyJWT, logoutCustomer);
router.route("/login").post(loginCustomer);
router.route("/update-password").patch(verifyJWT, updateCustomerPassword);
router.route("/update-address").patch(verifyJWT, updateCustomerAddress);


export default router;