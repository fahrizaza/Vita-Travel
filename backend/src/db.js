import pg from "pg";
import { DATABASE_URL } from "./config.js";

// Secara default pg mengembalikan NUMERIC/COUNT sebagai string dan DATE sebagai objek Date.
// Ubah agar angka menjadi number dan tanggal tetap teks "YYYY-MM-DD".
pg.types.setTypeParser(pg.types.builtins.NUMERIC, Number);
pg.types.setTypeParser(pg.types.builtins.INT8, Number);
pg.types.setTypeParser(pg.types.builtins.DATE, (value) => value);

const pool = new pg.Pool({ connectionString: DATABASE_URL });

/**
 * Menjalankan beberapa query sebagai satu transaksi:
 * jika salah satu gagal, semua perubahan dibatalkan (ROLLBACK).
 */
export async function transaction(callback) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export default pool;
