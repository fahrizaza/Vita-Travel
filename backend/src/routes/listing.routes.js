import { Router } from "express";
import * as listing from "../controllers/listing.controller.js";

// Endpoint publik: bisa diakses tanpa login.
const router = Router();

router.get("/", listing.getListings);
router.get("/:id", listing.getListingById);

export default router;
