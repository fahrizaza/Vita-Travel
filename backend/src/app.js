import cors from "cors";
import express from "express";
import { UPLOAD_DIR } from "./config.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import destinationRoutes from "./routes/destination.routes.js";
import listingRoutes from "./routes/listing.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import { sendSuccess } from "./utils/response.js";

const app = express();

app.use(cors()); // izinkan diakses dari app Flutter (termasuk Flutter web)
app.use(express.json());
app.use("/uploads", express.static(UPLOAD_DIR)); // file gambar yang sudah diupload

app.get("/api", (req, res) => sendSuccess(res, { name: "Vita Travel API" }, "API berjalan"));
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
