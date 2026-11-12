/** Error yang sengaja dilempar controller, berisi HTTP status code untuk response. */
export class ApiError extends Error {
  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

/** Format response sukses yang sama untuk semua endpoint. */
export function sendSuccess(res, data, message = "Berhasil", status = 200) {
  return res.status(status).json({ success: true, message, data });
}

/** Mengubah path file di database (mis. "listings/abc.jpg") menjadi URL lengkap. */
export function fileUrl(req, filePath) {
  if (!filePath) return null;
  return `${req.protocol}://${req.get("host")}/uploads/${filePath}`;
}

/** Tanggal hari ini dalam format "YYYY-MM-DD" (zona waktu lokal server). */
export function today() {
  return new Date().toLocaleDateString("sv-SE");
}
