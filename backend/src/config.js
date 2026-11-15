import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

// Folder backend/ (satu tingkat di atas src/), supaya .env dan uploads/ selalu ketemu
// dari folder mana pun server dijalankan.
const BACKEND_DIR = path.resolve(import.meta.dirname, "..");

dotenv.config({ path: path.join(BACKEND_DIR, ".env"), quiet: true });

const isTest = process.env.NODE_ENV === "test";

export const PORT = process.env.PORT || 3001;

/**
 * Menghapus parameter `sslmode` dari URI tanpa menyentuh bagian lain URI.
 *
 * Ini bukan kerapian belaka. pg-connection-string v2 membaca `sslmode` lalu MENIMPA
 * objek `ssl` yang kita berikan ke pg.Pool, dan pada versi itu `sslmode=require`
 * diperlakukan sama dengan `verify-full`. Akibatnya sertifikat Aiven — yang diterbitkan
 * CA milik Aiven sendiri, bukan CA publik — ditolak dengan galat
 * "self-signed certificate in certificate chain", padahal kita sudah memegang CA-nya.
 * Yang mengejutkan: yang dipakai justru sslmode dari URI, bukan objek ssl kita, sehingga
 * CA tersebut hilang tanpa peringatan apa pun.
 *
 * Setelah parameter ini dibuang, pengaturan SSL sepenuhnya berasal dari DATABASE_SSL.
 */
function buangSslmode(url) {
  if (!url) return url;
  const [pokok, query] = url.split("?");
  if (!query) return url;

  const sisa = new URLSearchParams(query);
  sisa.delete("sslmode");
  const queryBaru = sisa.toString();
  return queryBaru ? `${pokok}?${queryBaru}` : pokok;
}

export const DATABASE_URL = buangSslmode(
  isTest ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL,
);
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
export const UPLOAD_DIR = path.join(BACKEND_DIR, isTest ? "uploads-test" : "uploads");

/**
 * Sertifikat CA untuk database terkelola (Aiven).
 *
 * Aiven menandatangani sertifikat servernya dengan CA miliknya sendiri, jadi CA itu harus
 * diberikan ke pg agar verifikasi berhasil. Sumbernya salah satu dari:
 *   - berkas backend/certs/aiven-ca.pem (unduh dari halaman layanan Aiven), atau
 *   - variabel lingkungan DATABASE_CA, untuk hosting yang tidak menyertakan berkas.
 *
 * Bila keduanya tidak ada — misalnya saat mengembangkan di laptop — SSL dimatikan,
 * karena PostgreSQL lokal menerima koneksi tanpa SSL.
 */
const CERT_PATH = path.join(BACKEND_DIR, "certs", "aiven-ca.pem");
const caPem =
  process.env.DATABASE_CA || (fs.existsSync(CERT_PATH) ? fs.readFileSync(CERT_PATH, "utf8") : null);

/**
 * Menentukan pengaturan SSL untuk driver pg berdasarkan alamat database.
 *
 * SSL hanya dipasang bila database berada di mesin lain. PostgreSQL lokal tidak
 * menyediakan SSL, sehingga memaksakan SSL di laptop akan membuat seluruh
 * pengembangan lokal gagal tersambung — dan gejalanya menyesatkan, seolah
 * sandi atau namanya salah.
 */
function tentukanSsl(url) {
  if (!url) return false;

  let hostname;
  try {
    ({ hostname } = new URL(url));
  } catch {
    return false;
  }

  const lokal = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
  if (lokal) return false;

  if (caPem) return { ca: caPem, rejectUnauthorized: true };

  // Sampai di sini berarti database jarak jauh tanpa CA. Koneksi tetap terenkripsi,
  // tetapi identitas server tidak diperiksa — cukup untuk pengembangan, dan
  // peringatan di bawah sengaja dibuat mencolok agar tidak lewat begitu saja.
  console.warn(
    `PERINGATAN: database di ${hostname} memakai SSL tetapi CA-nya belum tersedia.\n` +
      "  Koneksi terenkripsi, namun identitas server TIDAK diverifikasi.\n" +
      "  Unduh CA Certificate dari halaman layanan Aiven, simpan sebagai\n" +
      `  ${CERT_PATH}\n` +
      "  Penjelasan lengkap: backend/certs/README.md",
  );
  return { rejectUnauthorized: false };
}

export const DATABASE_SSL = tentukanSsl(DATABASE_URL);

if (!DATABASE_URL || !JWT_SECRET) {
  throw new Error("DATABASE_URL dan JWT_SECRET wajib diisi di file .env (lihat .env.example)");
}
