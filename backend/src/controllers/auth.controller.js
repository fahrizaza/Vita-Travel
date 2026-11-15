import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool, { transaction } from "../db.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config.js";
import { ApiError, sendSuccess } from "../utils/response.js";

/** Data user yang aman dikirim ke app (tanpa password), plus profil usaha jika seller. */
export async function getUserData(userId) {
  const result = await pool.query(
    `SELECT u.id, u.name, u.email, u.phone, u.role, u.is_active, u.created_at,
            sp.business_name, sp.city, sp.description, sp.bank_name, sp.bank_account_number,
            sp.bank_account_name, sp.verification_status, sp.rejection_reason
     FROM users u
     LEFT JOIN seller_profiles sp ON sp.user_id = u.id
     WHERE u.id = $1`,
    [userId],
  );
  const row = result.rows[0];
  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    role: row.role,
    is_active: row.is_active,
    created_at: row.created_at,
    seller:
      row.role === "seller"
        ? {
            business_name: row.business_name,
            city: row.city,
            description: row.description,
            bank_name: row.bank_name,
            bank_account_number: row.bank_account_number,
            bank_account_name: row.bank_account_name,
            verification_status: row.verification_status,
            rejection_reason: row.rejection_reason,
          }
        : null,
  };
}

function createToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// POST /api/auth/register
export async function register(req, res) {
  const { name, email, phone, password, role, business_name, city } = req.body;

  const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
  if (existing.rowCount > 0) throw new ApiError(409, "Email sudah terdaftar");

  // Password disimpan dalam bentuk hash bcrypt, bukan teks asli.
  const passwordHash = await bcrypt.hash(password, 10);

  const userId = await transaction(async (client) => {
    const inserted = await client.query(
      `INSERT INTO users (name, email, phone, password_hash, role)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [name, email, phone, passwordHash, role],
    );
    const id = inserted.rows[0].id;
    if (role === "seller") {
      await client.query(
        "INSERT INTO seller_profiles (user_id, business_name, city) VALUES ($1, $2, $3)",
        [id, business_name, city],
      );
    }
    return id;
  });

  const user = await getUserData(userId);
  const message =
    role === "seller"
      ? "Registrasi berhasil. Akun seller Anda menunggu verifikasi admin."
      : "Registrasi berhasil";
  sendSuccess(res, { token: createToken(user), user }, message, 201);
}

// POST /api/auth/login
export async function login(req, res) {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT id, password_hash, is_active FROM users WHERE email = $1",
    [email],
  );
  const found = result.rows[0];
  const passwordMatches = found && (await bcrypt.compare(password, found.password_hash));
  if (!passwordMatches) throw new ApiError(401, "Email atau password salah");
  if (!found.is_active) throw new ApiError(403, "Akun Anda dinonaktifkan oleh admin");

  const user = await getUserData(found.id);
  sendSuccess(res, { token: createToken(user), user }, "Login berhasil");
}

// GET /api/auth/me
export async function getMe(req, res) {
  sendSuccess(res, await getUserData(req.user.id));
}

// PUT /api/auth/me
export async function updateMe(req, res) {
  const { name, phone } = req.body;
  await pool.query("UPDATE users SET name = $1, phone = $2 WHERE id = $3", [
    name,
    phone,
    req.user.id,
  ]);
  sendSuccess(res, await getUserData(req.user.id), "Profil berhasil diperbarui");
}

// PUT /api/auth/password
export async function changePassword(req, res) {
  const { old_password, new_password } = req.body;

  const result = await pool.query("SELECT password_hash FROM users WHERE id = $1", [req.user.id]);
  const matches = await bcrypt.compare(old_password, result.rows[0].password_hash);
  if (!matches) throw new ApiError(400, "Password lama salah");

  const newHash = await bcrypt.hash(new_password, 10);
  await pool.query("UPDATE users SET password_hash = $1 WHERE id = $2", [newHash, req.user.id]);
  sendSuccess(res, null, "Password berhasil diganti");
}
