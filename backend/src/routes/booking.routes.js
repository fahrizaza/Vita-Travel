import { Router } from "express";
import * as booking from "../controllers/booking.controller.js";
import { allowRoles, verifyToken } from "../middleware/auth.js";
import { uploadImage } from "../middleware/upload.js";
import { validate } from "../middleware/validate.js";
import {
  bookingSchema,
  cancelSchema,
  paymentSchema,
  reviewSchema,
  verifyPaymentSchema,
} from "../validators.js";

const router = Router();
const buyerOnly = allowRoles("buyer");
const sellerOnly = allowRoles("seller");

router.use(verifyToken);

router.get("/", booking.getBookings); // isi daftar menyesuaikan role
router.get("/:id", booking.getBookingById);
router.post("/", buyerOnly, validate(bookingSchema), booking.createBooking);
router.patch(
  "/:id/payment",
  buyerOnly,
  uploadImage("payments"),
  validate(paymentSchema),
  booking.uploadPayment,
);
router.patch("/:id/verify", sellerOnly, validate(verifyPaymentSchema), booking.verifyPayment);
router.patch("/:id/complete", sellerOnly, booking.completeBooking);
router.patch(
  "/:id/cancel",
  allowRoles("buyer", "seller"),
  validate(cancelSchema),
  booking.cancelBooking,
);
router.post("/:id/review", buyerOnly, validate(reviewSchema), booking.createReview);

export default router;
