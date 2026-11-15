import fs from "node:fs";
import path from "node:path";
import multer from "multer";
import { UPLOAD_DIR } from "../config.js";
import { ApiError } from "../utils/response.js";

export const MAX_FILE_MB = 2;
const ALLOWED_TYPES = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp" };

/**
 * Middleware upload satu gambar dari field form-data bernama "image".
 * File disimpan di uploads/<folder>/ dan divalidasi tipe (JPG/PNG/WEBP) serta ukurannya (maks 2 MB).
 */
export function uploadImage(folder) {
  const destination = path.join(UPLOAD_DIR, folder);
  fs.mkdirSync(destination, { recursive: true });

  return multer({
    storage: multer.diskStorage({
      destination,
      filename: (req, file, callback) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        callback(null, uniqueName + ALLOWED_TYPES[file.mimetype]);
      },
    }),
    limits: { fileSize: MAX_FILE_MB * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
      if (ALLOWED_TYPES[file.mimetype]) callback(null, true);
      else callback(new ApiError(415, "Format gambar harus JPG, PNG, atau WEBP"));
    },
  }).single("image");
}

/** Path yang disimpan di database, misalnya "listings/1731400000-123.jpg". */
export function savedPath(folder, file) {
  return file ? `${folder}/${file.filename}` : null;
}

/** Menghapus file lama dari folder uploads (dipakai saat gambar diganti atau data dihapus). */
export function deleteFile(filePath) {
  if (filePath) fs.rm(path.join(UPLOAD_DIR, filePath), { force: true }, () => {});
}
