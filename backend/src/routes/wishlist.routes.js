import { Router } from "express";
import * as wishlist from "../controllers/wishlist.controller.js";
import { allowRoles, verifyToken } from "../middleware/auth.js";

const router = Router();

router.use(verifyToken, allowRoles("buyer"));

router.get("/", wishlist.getWishlist);
router.post("/:listingId", wishlist.addToWishlist);
router.delete("/:listingId", wishlist.removeFromWishlist);

export default router;
