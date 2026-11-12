import { Router } from "express";
import * as auth from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, passwordSchema, profileSchema, registerSchema } from "../validators.js";

const router = Router();

router.post("/register", validate(registerSchema), auth.register);
router.post("/login", validate(loginSchema), auth.login);
router.get("/me", verifyToken, auth.getMe);
router.put("/me", verifyToken, validate(profileSchema), auth.updateMe);
router.put("/password", verifyToken, validate(passwordSchema), auth.changePassword);

export default router;
