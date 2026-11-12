import pool from "../db.js";
import { ApiError, sendSuccess } from "../utils/response.js";

// GET /api/categories (publik)
export async function getCategories(req, res) {
  const result = await pool.query(
    `SELECT c.id, c.name, COUNT(l.id) AS listing_count
     FROM categories c
     LEFT JOIN listings l ON l.category_id = c.id
     GROUP BY c.id
     ORDER BY c.name`,
  );
  sendSuccess(res, result.rows);
}

// POST /api/categories (admin)
export async function createCategory(req, res) {
  const result = await pool.query("INSERT INTO categories (name) VALUES ($1) RETURNING *", [
    req.body.name,
  ]);
  sendSuccess(res, result.rows[0], "Kategori berhasil ditambahkan", 201);
}

// PUT /api/categories/:id (admin)
export async function updateCategory(req, res) {
  const result = await pool.query("UPDATE categories SET name = $1 WHERE id = $2 RETURNING *", [
    req.body.name,
    req.params.id,
  ]);
  if (result.rowCount === 0) throw new ApiError(404, "Kategori tidak ditemukan");
  sendSuccess(res, result.rows[0], "Kategori berhasil diperbarui");
}

// DELETE /api/categories/:id (admin)
// Jika kategori masih dipakai listing, database menolak (FOREIGN KEY RESTRICT) → 409.
export async function deleteCategory(req, res) {
  const result = await pool.query("DELETE FROM categories WHERE id = $1", [req.params.id]);
  if (result.rowCount === 0) throw new ApiError(404, "Kategori tidak ditemukan");
  sendSuccess(res, null, "Kategori berhasil dihapus");
}
