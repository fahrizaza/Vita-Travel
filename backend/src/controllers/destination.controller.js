import pool from "../db.js";
import { deleteFile, savedPath } from "../middleware/upload.js";
import { ApiError, fileUrl, sendSuccess } from "../utils/response.js";

const FOLDER = "destinations";

function formatDestination(req, row) {
  const { image_path, ...destination } = row;
  return { ...destination, image_url: fileUrl(req, image_path) };
}

// GET /api/destinations (publik)
export async function getDestinations(req, res) {
  const result = await pool.query(
    `SELECT d.id, d.name, d.region, d.image_path, COUNT(l.id) AS listing_count
     FROM destinations d
     LEFT JOIN listings l ON l.destination_id = d.id AND l.status = 'active'
     GROUP BY d.id
     ORDER BY d.name`,
  );
  sendSuccess(
    res,
    result.rows.map((row) => formatDestination(req, row)),
  );
}

// POST /api/destinations (admin, form-data: name, region, image)
export async function createDestination(req, res) {
  if (!req.file) throw new ApiError(400, "Foto destinasi wajib diupload");
  const result = await pool.query(
    "INSERT INTO destinations (name, region, image_path) VALUES ($1, $2, $3) RETURNING *",
    [req.body.name, req.body.region, savedPath(FOLDER, req.file)],
  );
  sendSuccess(res, formatDestination(req, result.rows[0]), "Destinasi berhasil ditambahkan", 201);
}

// PUT /api/destinations/:id (admin, gambar opsional)
export async function updateDestination(req, res) {
  const old = await pool.query("SELECT image_path FROM destinations WHERE id = $1", [
    req.params.id,
  ]);
  if (old.rowCount === 0) throw new ApiError(404, "Destinasi tidak ditemukan");

  const oldImage = old.rows[0].image_path;
  const newImage = req.file ? savedPath(FOLDER, req.file) : oldImage;
  const result = await pool.query(
    "UPDATE destinations SET name = $1, region = $2, image_path = $3 WHERE id = $4 RETURNING *",
    [req.body.name, req.body.region, newImage, req.params.id],
  );
  if (req.file) deleteFile(oldImage);
  sendSuccess(res, formatDestination(req, result.rows[0]), "Destinasi berhasil diperbarui");
}

// DELETE /api/destinations/:id (admin)
export async function deleteDestination(req, res) {
  const result = await pool.query("DELETE FROM destinations WHERE id = $1 RETURNING image_path", [
    req.params.id,
  ]);
  if (result.rowCount === 0) throw new ApiError(404, "Destinasi tidak ditemukan");
  deleteFile(result.rows[0].image_path);
  sendSuccess(res, null, "Destinasi berhasil dihapus");
}
