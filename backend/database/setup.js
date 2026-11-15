// Menyiapkan database dari nol:
//   1. membuat database (jika belum ada)
//   2. menjalankan schema.sql (hapus & buat ulang semua tabel)
//   3. mengisi data contoh (seed.js)
// Jalankan dengan: npm run db:setup
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import { DATABASE_URL, DATABASE_SSL, UPLOAD_DIR } from "../src/config.js";
import pool from "../src/db.js";
import { seed } from "./seed.js";

async function createDatabaseIfMissing() {
  const url = new URL(DATABASE_URL);
  const databaseName = url.pathname.slice(1);

  // Untuk membuat database, kita harus tersambung lebih dulu ke database yang sudah ada.
  // Namanya berbeda-beda: PostgreSQL lokal punya "postgres", Aiven menyediakan "defaultdb".
  const kandidat = ["postgres", "defaultdb"];

  for (const namaPemeliharaan of kandidat) {
    url.pathname = `/${namaPemeliharaan}`;
    const client = new pg.Client({ connectionString: url.toString(), ssl: DATABASE_SSL });

    try {
      await client.connect();
    } catch (error) {
      await client.end().catch(() => {});
      // 3D000 = database tujuan tidak ada. Wajar saat mencoba kandidat berikutnya;
      // galat lain (sandi salah, sertifikat ditolak) justru harus langsung dilaporkan.
      if (error.code === "3D000") continue;
      throw error;
    }

    try {
      const exists = await client.query("SELECT 1 FROM pg_database WHERE datname = $1", [
        databaseName,
      ]);
      if (exists.rowCount === 0) {
        await client.query(`CREATE DATABASE "${databaseName}"`);
        console.log(`Database ${databaseName} dibuat`);
      }
    } finally {
      await client.end();
    }
    return;
  }

  throw new Error(
    `Tidak bisa menyambung ke database pemeliharaan (dicoba: ${kandidat.join(", ")}) ` +
      `sehingga "${databaseName}" belum tentu ada.`,
  );
}

export async function setupDatabase() {
  await createDatabaseIfMissing();

  const schema = fs.readFileSync(path.join(import.meta.dirname, "schema.sql"), "utf8");
  await pool.query(schema);

  // Data lama dihapus, jadi file upload lama juga dibersihkan.
  fs.rmSync(UPLOAD_DIR, { recursive: true, force: true });
  await seed();
}

// Hanya jalan otomatis saat file ini dieksekusi langsung (bukan saat di-import oleh test).
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    await setupDatabase();
    console.log("Database siap. Semua akun uji memakai password: Password123");
  } catch (error) {
    console.error("Gagal menyiapkan database:", error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}
