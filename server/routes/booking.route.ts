import express, { Router } from "express";
import { verifyJWT, verifyJWTProvider } from "../middleware/auth";
import { cancelBooking, completeBookingStatus, confirmedBookingStatus, createBooking, getCustomerBookings, getProviderBookings, InProgressBookingStatus, updateBookingStatus } from "../controllers/booking.controller";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router: Router = express.Router();

router.route("/create").post(verifyJWT, upload.single("image"), createBooking);
router.route("/provider").get(verifyJWTProvider, getProviderBookings);
router.route("/customer").get(verifyJWT, getCustomerBookings);
router.route("/update").patch(verifyJWTProvider, updateBookingStatus);
router.route("/confirm-booking").patch(verifyJWTProvider, confirmedBookingStatus);
router.route("/cancel-booking").patch(verifyJWTProvider, cancelBooking);
router.route("/in-progress").patch(verifyJWTProvider, upload.single("beforeImage"), InProgressBookingStatus);
router.route("/complete-booking").patch(verifyJWTProvider, upload.single("afterImage"), completeBookingStatus);

export default router;