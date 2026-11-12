import { Router } from "express";
import * as admin from "../controllers/admin.controller.js";
import { allowRoles, verifyToken } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { moderationSchema, sellerVerificationSchema, userStatusSchema } from "../validators.js";

const router = Router();

// Semua endpoint di file ini khusus role admin.
router.use(verifyToken, allowRoles("admin"));

router.get("/dashboard", admin.getDashboard);
router.get("/users", admin.getUsers);
router.patch("/users/:id/status", validate(userStatusSchema), admin.updateUserStatus);
router.get("/sellers", admin.getSellers);
router.patch("/sellers/:id/verify", validate(sellerVerificationSchema), admin.verifySeller);
router.get("/listings", admin.getAllListings);
router.patch("/listings/:id/moderate", validate(moderationSchema), admin.moderateListing);

export default router;
