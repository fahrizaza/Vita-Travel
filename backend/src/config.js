import path from "node:path";
import dotenv from "dotenv";

// Folder backend/ (satu tingkat di atas src/), supaya .env dan uploads/ selalu ketemu
// dari folder mana pun server dijalankan.
const BACKEND_DIR = path.resolve(import.meta.dirname, "..");

dotenv.config({ path: path.join(BACKEND_DIR, ".env"), quiet: true });

const isTest = process.env.NODE_ENV === "test";

export const PORT = process.env.PORT || 3001;
export const DATABASE_URL = isTest ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
export const UPLOAD_DIR = path.join(BACKEND_DIR, isTest ? "uploads-test" : "uploads");

if (!DATABASE_URL || !JWT_SECRET) {
  throw new Error("DATABASE_URL dan JWT_SECRET wajib diisi di file .env (lihat .env.example)");
}
