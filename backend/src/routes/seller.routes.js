import { Router } from "express";
import * as listing from "../controllers/listing.controller.js";
import * as seller from "../controllers/seller.controller.js";
import { allowRoles, approvedSellerOnly, verifyToken } from "../middleware/auth.js";
import { uploadImage } from "../middleware/upload.js";
import { validate } from "../middleware/validate.js";
import { listingSchema, sellerProfileSchema } from "../validators.js";

const router = Router();
const upload = uploadImage("listings");

// Semua endpoint di file ini khusus role seller.
router.use(verifyToken, allowRoles("seller"));

router.put("/profile", validate(sellerProfileSchema), seller.updateSellerProfile);
router.get("/report", seller.getSalesReport);

router.get("/listings", listing.getMyListings);
router.post(
  "/listings",
  approvedSellerOnly,
  upload,
  validate(listingSchema),
  listing.createListing,
);
router.put(
  "/listings/:id",
  approvedSellerOnly,
  upload,
  validate(listingSchema),
  listing.updateListing,
);
router.delete("/listings/:id", listing.deleteListing);

export default router;
