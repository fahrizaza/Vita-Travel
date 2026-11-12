import jwt from "jsonwebtoken";
import pool from "../db.js";
import { JWT_SECRET } from "../config.js";
import { ApiError } from "../utils/response.js";

/** Autentikasi: memastikan request membawa token JWT yang valid. */
export async function verifyToken(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) throw new ApiError(401, "Silakan login terlebih dahulu");

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    throw new ApiError(401, "Sesi login sudah berakhir, silakan login ulang");
  }

  const result = await pool.query(
    "SELECT id, name, email, phone, role, is_active FROM users WHERE id = $1",
    [payload.id],
  );
  const user = result.rows[0];
  if (!user) throw new ApiError(401, "Akun tidak ditemukan");
  if (!user.is_active) throw new ApiError(403, "Akun Anda dinonaktifkan oleh admin");

  req.user = user;
  next();
}

/** Otorisasi: hanya role yang disebutkan yang boleh lanjut. Contoh: allowRoles("admin") */
export function allowRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Anda tidak memiliki akses ke fitur ini");
    }
    next();
  };
}

/** Seller baru bisa berjualan setelah akunnya disetujui admin. */
export async function approvedSellerOnly(req, res, next) {
  const result = await pool.query(
    "SELECT verification_status FROM seller_profiles WHERE user_id = $1",
    [req.user.id],
  );
  if (result.rows[0]?.verification_status !== "approved") {
    throw new ApiError(403, "Akun seller Anda belum diverifikasi admin");
  }
  next();
}
