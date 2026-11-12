// Test otomatis REST API. Jalankan: npm test
// Memakai database TEST_DATABASE_URL (isinya dibuat ulang setiap test dijalankan).
import assert from "node:assert/strict";
import path from "node:path";
import { after, before, describe, test } from "node:test";
import request from "supertest";

process.env.NODE_ENV = "test";
const { default: app } = await import("../src/app.js");
const { default: pool } = await import("../src/db.js");
const { setupDatabase } = await import("../database/setup.js");

const PASSWORD = "Password123";
const SAMPLE_IMAGE = path.join(
  import.meta.dirname,
  "../database/seed-images/bukti-transfer-contoh.png",
);

async function login(email) {
  const res = await request(app).post("/api/auth/login").send({ email, password: PASSWORD });
  assert.equal(res.status, 200, res.body.message);
  return res.body.data.token;
}

function dateFromToday(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString("sv-SE");
}

const token = {};

before(async () => {
  await setupDatabase();
  token.admin = await login("admin@vitatravel.id");
  token.seller = await login("seller@vitatravel.id");
  token.seller2 = await login("seller2@vitatravel.id");
  token.pending = await login("seller.pending@vitatravel.id");
  token.buyer = await login("buyer@vitatravel.id");
});

after(async () => {
  await pool.end();
});

describe("Autentikasi", () => {
  test("register menyimpan password dalam bentuk hash", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Budi Santoso",
      email: "Budi@Mail.com",
      phone: "081234567890",
      password: "rahasia123",
      role: "buyer",
    });
    assert.equal(res.status, 201);
    assert.ok(res.body.data.token);
    assert.equal(res.body.data.user.email, "budi@mail.com");
    assert.equal(res.body.data.user.password_hash, undefined);

    const saved = await pool.query("SELECT password_hash FROM users WHERE email = 'budi@mail.com'");
    assert.notEqual(saved.rows[0].password_hash, "rahasia123");
    assert.match(saved.rows[0].password_hash, /^\$2[aby]\$/);
  });

  test("email yang sudah terdaftar ditolak 409", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Budi Lagi",
      email: "budi@mail.com",
      phone: "081234567890",
      password: "rahasia123",
      role: "buyer",
    });
    assert.equal(res.status, 409);
  });

  test("input register tidak valid → 400 dengan error per field", async () => {
    const res = await request(app).post("/api/auth/register").send({ email: "bukan-email" });
    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    const fields = res.body.errors.map((error) => error.field);
    assert.ok(fields.includes("email") && fields.includes("password") && fields.includes("name"));
  });

  test("login dengan password salah → 401", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "buyer@vitatravel.id", password: "salah12345" });
    assert.equal(res.status, 401);
  });
});

describe("Otorisasi role", () => {
  test("tanpa token → 401", async () => {
    const res = await request(app).get("/api/bookings");
    assert.equal(res.status, 401);
  });

  test("buyer mengakses endpoint admin → 403", async () => {
    const res = await request(app)
      .get("/api/admin/dashboard")
      .auth(token.buyer, { type: "bearer" });
    assert.equal(res.status, 403);
  });

  test("seller yang belum diverifikasi tidak bisa membuat listing → 403", async () => {
    const res = await request(app)
      .post("/api/seller/listings")
      .auth(token.pending, { type: "bearer" });
    assert.equal(res.status, 403);
  });

  test("seller tidak bisa melihat pesanan milik seller lain → 403", async () => {
    const own = await request(app).get("/api/bookings").auth(token.seller, { type: "bearer" });
    const res = await request(app)
      .get(`/api/bookings/${own.body.data[0].id}`)
      .auth(token.seller2, { type: "bearer" });
    assert.equal(res.status, 403);
  });
});

describe("Upload gambar & CRUD listing", () => {
  const listingFields = {
    type: "trip",
    title: "Trip Uji Coba Nusa Penida",
    description: "Snorkeling di Crystal Bay dan melihat pari manta di Manta Point.",
    price: "1500000",
    quota: "3",
    category_id: "2",
    destination_id: "1",
    start_date: dateFromToday(30),
    duration_days: "2",
  };
  let listingId;

  test("file selain gambar ditolak → 415", async () => {
    const res = await request(app)
      .post("/api/seller/listings")
      .auth(token.seller, { type: "bearer" })
      .field(listingFields)
      .attach("image", Buffer.from("halo"), { filename: "catatan.txt", contentType: "text/plain" });
    assert.equal(res.status, 415);
  });

  test("gambar lebih dari 2 MB ditolak → 413", async () => {
    const res = await request(app)
      .post("/api/seller/listings")
      .auth(token.seller, { type: "bearer" })
      .field(listingFields)
      .attach("image", Buffer.alloc(2.5 * 1024 * 1024), {
        filename: "besar.png",
        contentType: "image/png",
      });
    assert.equal(res.status, 413);
  });

  test("listing tanpa foto ditolak → 400", async () => {
    const res = await request(app)
      .post("/api/seller/listings")
      .auth(token.seller, { type: "bearer" })
      .field(listingFields);
    assert.equal(res.status, 400);
  });

  test("seller membuat listing + foto → 201, foto bisa diakses kembali", async () => {
    const res = await request(app)
      .post("/api/seller/listings")
      .auth(token.seller, { type: "bearer" })
      .field(listingFields)
      .attach("image", SAMPLE_IMAGE);
    assert.equal(res.status, 201, res.body.message);
    listingId = res.body.data.id;

    const imagePath = new URL(res.body.data.image_url).pathname;
    const image = await request(app).get(imagePath);
    assert.equal(image.status, 200);
    assert.equal(image.headers["content-type"], "image/png");
  });

  test("seller lain tidak bisa mengedit listing ini → 403", async () => {
    const res = await request(app)
      .put(`/api/seller/listings/${listingId}`)
      .auth(token.seller2, { type: "bearer" })
      .field(listingFields);
    assert.equal(res.status, 403);
  });

  test("seller mengedit listing tanpa ganti foto → 200", async () => {
    const res = await request(app)
      .put(`/api/seller/listings/${listingId}`)
      .auth(token.seller, { type: "bearer" })
      .field({ ...listingFields, title: "Trip Uji Coba Nusa Penida (Revisi)" });
    assert.equal(res.status, 200, res.body.message);
    assert.equal(res.body.data.title, "Trip Uji Coba Nusa Penida (Revisi)");
    assert.ok(res.body.data.image_url);
  });

  test("alur pesanan lengkap: pesan → bayar → verifikasi → selesai → ulasan", async () => {
    const tooMany = await request(app)
      .post("/api/bookings")
      .auth(token.buyer, { type: "bearer" })
      .send({ listing_id: listingId, participants: 4 });
    assert.equal(tooMany.status, 409, "melebihi kuota 3");

    const created = await request(app)
      .post("/api/bookings")
      .auth(token.buyer, { type: "bearer" })
      .send({ listing_id: listingId, participants: 2 });
    assert.equal(created.status, 201, created.body.message);
    assert.equal(created.body.data.status, "pending_payment");
    assert.equal(created.body.data.total_price, 3000000);
    const bookingId = created.body.data.id;

    const paid = await request(app)
      .patch(`/api/bookings/${bookingId}/payment`)
      .auth(token.buyer, { type: "bearer" })
      .field({ sender_name: "Rina Wulandari", sender_bank: "BCA" })
      .attach("image", SAMPLE_IMAGE);
    assert.equal(paid.status, 200, paid.body.message);
    assert.equal(paid.body.data.status, "waiting_verification");
    assert.ok(paid.body.data.proof_url);

    const rejectWithoutNote = await request(app)
      .patch(`/api/bookings/${bookingId}/verify`)
      .auth(token.seller, { type: "bearer" })
      .send({ approve: false });
    assert.equal(rejectWithoutNote.status, 400);

    const approved = await request(app)
      .patch(`/api/bookings/${bookingId}/verify`)
      .auth(token.seller, { type: "bearer" })
      .send({ approve: true });
    assert.equal(approved.body.data.status, "confirmed");

    const earlyReview = await request(app)
      .post(`/api/bookings/${bookingId}/review`)
      .auth(token.buyer, { type: "bearer" })
      .send({ rating: 5 });
    assert.equal(earlyReview.status, 409, "belum selesai");

    const completed = await request(app)
      .patch(`/api/bookings/${bookingId}/complete`)
      .auth(token.seller, { type: "bearer" });
    assert.equal(completed.body.data.status, "completed");

    const review = await request(app)
      .post(`/api/bookings/${bookingId}/review`)
      .auth(token.buyer, { type: "bearer" })
      .send({ rating: 5, comment: "Seru!" });
    assert.equal(review.status, 201);

    const again = await request(app)
      .post(`/api/bookings/${bookingId}/review`)
      .auth(token.buyer, { type: "bearer" })
      .send({ rating: 4 });
    assert.equal(again.status, 409);
  });

  test("listing yang sudah punya pesanan tidak bisa dihapus → 409", async () => {
    const res = await request(app)
      .delete(`/api/seller/listings/${listingId}`)
      .auth(token.seller, { type: "bearer" });
    assert.equal(res.status, 409);
  });
});

describe("Aturan bisnis lain", () => {
  test("pemandu tidak bisa dipesan di tanggal yang bertabrakan → 409", async () => {
    const booking = { listing_id: 9, participants: 2, service_date: dateFromToday(14), days: 2 };
    const first = await request(app)
      .post("/api/bookings")
      .auth(token.buyer, { type: "bearer" })
      .send(booking);
    assert.equal(first.status, 201, first.body.message);
    assert.equal(first.body.data.total_price, 1100000, "550.000 × 2 hari");

    const clash = await request(app)
      .post("/api/bookings")
      .auth(token.buyer, { type: "bearer" })
      .send({ ...booking, service_date: dateFromToday(15), days: 1 });
    assert.equal(clash.status, 409);
  });

  test("kategori yang masih dipakai listing tidak bisa dihapus → 409", async () => {
    const res = await request(app)
      .delete("/api/categories/1")
      .auth(token.admin, { type: "bearer" });
    assert.equal(res.status, 409);
  });

  test("CRUD kategori oleh admin", async () => {
    const created = await request(app)
      .post("/api/categories")
      .auth(token.admin, { type: "bearer" })
      .send({ name: "Kuliner" });
    assert.equal(created.status, 201);

    const duplicate = await request(app)
      .post("/api/categories")
      .auth(token.admin, { type: "bearer" })
      .send({ name: "Kuliner" });
    assert.equal(duplicate.status, 409);

    const id = created.body.data.id;
    const updated = await request(app)
      .put(`/api/categories/${id}`)
      .auth(token.admin, { type: "bearer" })
      .send({ name: "Wisata Kuliner" });
    assert.equal(updated.body.data.name, "Wisata Kuliner");

    const deleted = await request(app)
      .delete(`/api/categories/${id}`)
      .auth(token.admin, { type: "bearer" });
    assert.equal(deleted.status, 200);
  });

  test("admin menyetujui seller → seller bisa membuat listing", async () => {
    const pending = await request(app)
      .get("/api/admin/sellers?status=pending")
      .auth(token.admin, { type: "bearer" });
    const sellerId = pending.body.data[0].id;

    const approve = await request(app)
      .patch(`/api/admin/sellers/${sellerId}/verify`)
      .auth(token.admin, { type: "bearer" })
      .send({ status: "approved" });
    assert.equal(approve.status, 200);

    const res = await request(app)
      .post("/api/seller/listings")
      .auth(token.pending, { type: "bearer" })
      .field({
        type: "guide",
        title: "Pemandu Island Hopping Gili",
        description: "Snorkeling tiga Gili dan melihat penyu bersama pemandu lokal.",
        price: "450000",
        quota: "8",
        category_id: "2",
        destination_id: "1",
        languages: "Indonesia, Sasak",
      })
      .attach("image", SAMPLE_IMAGE);
    assert.equal(res.status, 201, res.body.message);
  });

  test("admin menangguhkan listing → hilang dari pencarian publik", async () => {
    const suspend = await request(app)
      .patch("/api/admin/listings/3/moderate")
      .auth(token.admin, { type: "bearer" })
      .send({ action: "suspend", note: "Foto tidak sesuai" });
    assert.equal(suspend.status, 200);

    const listings = await request(app).get("/api/listings");
    assert.ok(!listings.body.data.some((listing) => listing.id === 3));
  });

  test("user yang dinonaktifkan admin tidak bisa login → 403", async () => {
    const res = await request(app)
      .patch("/api/admin/users/6/status")
      .auth(token.admin, { type: "bearer" })
      .send({ is_active: false });
    assert.equal(res.status, 200);

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: "buyer2@vitatravel.id", password: PASSWORD });
    assert.equal(loginRes.status, 403);
  });
});
