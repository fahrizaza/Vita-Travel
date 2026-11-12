// Menyiapkan database dari nol:
//   1. membuat database (jika belum ada)
//   2. menjalankan schema.sql (hapus & buat ulang semua tabel)
//   3. mengisi data contoh (seed.js)
// Jalankan dengan: npm run db:setup
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import { DATABASE_URL, UPLOAD_DIR } from "../src/config.js";
import pool from "../src/db.js";
import { seed } from "./seed.js";

async function createDatabaseIfMissing() {
  const url = new URL(DATABASE_URL);
  const databaseName = url.pathname.slice(1);
  url.pathname = "/postgres"; // database bawaan PostgreSQL untuk membuat database baru

  const client = new pg.Client({ connectionString: url.toString() });
  await client.connect();
  const exists = await client.query("SELECT 1 FROM pg_database WHERE datname = $1", [databaseName]);
  if (exists.rowCount === 0) {
    await client.query(`CREATE DATABASE "${databaseName}"`);
    console.log(`Database ${databaseName} dibuat`);
  }
  await client.end();
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
