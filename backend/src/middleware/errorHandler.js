import fs from "node:fs";
import multer from "multer";
import { MAX_FILE_MB } from "./upload.js";

export function notFound(req, res) {
  res.status(404).json({ success: false, message: "Endpoint tidak ditemukan" });
}

/** Semua error dari route/middleware berakhir di sini dan diubah menjadi response JSON. */
// Express mengenali error handler dari 4 parameternya, jadi _next tetap ditulis walau tidak dipakai.
export function errorHandler(err, req, res, _next) {
  // Request gagal: hapus gambar yang sempat terupload agar tidak menumpuk.
  if (req.file) fs.rm(req.file.path, { force: true }, () => {});

  let status = err.status || 500;
  let message = err.message;

  if (err instanceof multer.MulterError) {
    status = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;
    message =
      err.code === "LIMIT_FILE_SIZE"
        ? `Ukuran gambar maksimal ${MAX_FILE_MB} MB`
        : "Upload gagal: kirim satu file dengan nama field 'image'";
  } else if (err.type === "entity.parse.failed") {
    status = 400;
    message = "Format JSON tidak valid";
  } else if (err.code === "22P02") {
    status = 400;
    message = "ID atau nilai yang dikirim tidak valid";
  } else if (err.code === "23505") {
    status = 409;
    message = "Data dengan nama tersebut sudah ada";
  } else if (err.code === "23001") {
    // Foreign key ON DELETE RESTRICT: data masih dipakai tabel lain
    status = 409;
    message = "Data tidak bisa dihapus karena masih dipakai data lain";
  } else if (err.code === "23503") {
    // Foreign key menunjuk ke data yang tidak ada
    status = 400;
    message = "Data terkait (kategori/destinasi) tidak ditemukan";
  } else if (status === 500) {
    console.error(err);
    message = "Terjadi kesalahan pada server";
  }

  res.status(status).json({ success: false, message, ...(err.errors && { errors: err.errors }) });
}
