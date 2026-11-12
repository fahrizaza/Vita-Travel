import { Router } from "express";
import * as destination from "../controllers/destination.controller.js";
import { allowRoles, verifyToken } from "../middleware/auth.js";
import { uploadImage } from "../middleware/upload.js";
import { validate } from "../middleware/validate.js";
import { destinationSchema } from "../validators.js";

const router = Router();
const adminOnly = [verifyToken, allowRoles("admin")];
const upload = uploadImage("destinations");

router.get("/", destination.getDestinations);
router.post("/", adminOnly, upload, validate(destinationSchema), destination.createDestination);
router.put("/:id", adminOnly, upload, validate(destinationSchema), destination.updateDestination);
router.delete("/:id", adminOnly, destination.deleteDestination);

export default router;
