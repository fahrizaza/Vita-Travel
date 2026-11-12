import { Router } from "express";
import * as category from "../controllers/category.controller.js";
import { allowRoles, verifyToken } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { categorySchema } from "../validators.js";

const router = Router();
const adminOnly = [verifyToken, allowRoles("admin")];

router.get("/", category.getCategories);
router.post("/", adminOnly, validate(categorySchema), category.createCategory);
router.put("/:id", adminOnly, validate(categorySchema), category.updateCategory);
router.delete("/:id", adminOnly, category.deleteCategory);

export default router;
