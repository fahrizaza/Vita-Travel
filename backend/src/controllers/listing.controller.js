import pool from "../db.js";
import { deleteFile, savedPath } from "../middleware/upload.js";
import { LISTING_SELECT, formatListing } from "../utils/listingQuery.js";
import { ApiError, sendSuccess, today } from "../utils/response.js";

const FOLDER = "listings";

const SORT_OPTIONS = {
  newest: "l.created_at DESC",
  price_low: "l.price ASC",
  price_high: "l.price DESC",
  rating: "rating DESC, review_count DESC",
};

async function findListing(req, id) {
  const result = await pool.query(`${LISTING_SELECT} WHERE l.id = $1`, [id]);
  if (result.rowCount === 0) throw new ApiError(404, "Listing tidak ditemukan");
  return formatListing(req, result.rows[0]);
}

// ======================= PUBLIK =======================

// GET /api/listings?search=&type=&category_id=&destination_id=&min_price=&max_price=&sort=
export async function getListings(req, res) {
  const { search, type, category_id, destination_id, min_price, max_price, sort } = req.query;

  // Hanya listing aktif dari seller yang terverifikasi, dan trip yang belum berangkat.
  const conditions = [
    "l.status = 'active'",
    "sp.verification_status = 'approved'",
    "su.is_active = TRUE",
    "(l.type = 'guide' OR l.start_date >= CURRENT_DATE)",
  ];
  const params = [];
  // Setiap "?" diganti nomor parameter ($1, $2, ...) supaya aman dari SQL injection.
  function addFilter(sql, value) {
    params.push(value);
    conditions.push(sql.replaceAll("?", `$${params.length}`));
  }

  if (search) addFilter("(l.title ILIKE ? OR d.name ILIKE ?)", `%${search}%`);
  if (type) addFilter("l.type = ?", type);
  if (category_id) addFilter("l.category_id = ?", category_id);
  if (destination_id) addFilter("l.destination_id = ?", destination_id);
  if (min_price) addFilter("l.price >= ?", min_price);
  if (max_price) addFilter("l.price <= ?", max_price);

  const orderBy = SORT_OPTIONS[sort] || SORT_OPTIONS.newest;
  const result = await pool.query(
    `${LISTING_SELECT} WHERE ${conditions.join(" AND ")} ORDER BY ${orderBy} LIMIT 100`,
    params,
  );
  sendSuccess(
    res,
    result.rows.map((row) => formatListing(req, row)),
  );
}

// GET /api/listings/:id → detail + ulasan terbaru
export async function getListingById(req, res) {
  const listing = await findListing(req, req.params.id);
  const reviews = await pool.query(
    `SELECT rv.id, rv.rating, rv.comment, rv.created_at, u.name AS buyer_name
     FROM reviews rv
     JOIN bookings b ON b.id = rv.booking_id
     JOIN users u ON u.id = b.buyer_id
     WHERE b.listing_id = $1
     ORDER BY rv.created_at DESC
     LIMIT 20`,
    [req.params.id],
  );
  sendSuccess(res, { ...listing, reviews: reviews.rows });
}

// ======================= SELLER =======================

/** Ambil listing milik seller yang sedang login; tolak jika milik orang lain. */
async function findOwnListing(listingId, sellerId) {
  const result = await pool.query("SELECT * FROM listings WHERE id = $1", [listingId]);
  const listing = result.rows[0];
  if (!listing) throw new ApiError(404, "Listing tidak ditemukan");
  if (listing.seller_id !== sellerId) throw new ApiError(403, "Ini bukan listing milik Anda");
  return listing;
}

/** Field khusus trip dikosongkan untuk guide, dan sebaliknya. */
function typeSpecificFields(body) {
  const isTrip = body.type === "trip";
  return {
    start_date: isTrip ? body.start_date : null,
    duration_days: isTrip ? body.duration_days : null,
    languages: isTrip ? null : body.languages,
  };
}

// GET /api/seller/listings
export async function getMyListings(req, res) {
  const result = await pool.query(
    `${LISTING_SELECT} WHERE l.seller_id = $1 ORDER BY l.created_at DESC`,
    [req.user.id],
  );
  sendSuccess(
    res,
    result.rows.map((row) => formatListing(req, row)),
  );
}

// POST /api/seller/listings (form-data + image)
export async function createListing(req, res) {
  if (!req.file) throw new ApiError(400, "Foto listing wajib diupload");
  const body = req.body;
  const extra = typeSpecificFields(body);
  if (body.type === "trip" && extra.start_date < today()) {
    throw new ApiError(400, "Tanggal berangkat tidak boleh di masa lalu");
  }

  const result = await pool.query(
    `INSERT INTO listings (seller_id, category_id, destination_id, type, title, description, price,
       quota, start_date, duration_days, languages, includes, image_path, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
     RETURNING id`,
    [
      req.user.id,
      body.category_id,
      body.destination_id,
      body.type,
      body.title,
      body.description,
      body.price,
      body.quota,
      extra.start_date,
      extra.duration_days,
      extra.languages,
      body.includes,
      savedPath(FOLDER, req.file),
      body.status || "active",
    ],
  );
  const listing = await findListing(req, result.rows[0].id);
  sendSuccess(res, listing, "Listing berhasil ditambahkan", 201);
}

// PUT /api/seller/listings/:id (form-data, gambar opsional)
export async function updateListing(req, res) {
  const old = await findOwnListing(req.params.id, req.user.id);
  const body = req.body;
  const extra = typeSpecificFields(body);

  if (body.type === "trip" && extra.start_date !== old.start_date && extra.start_date < today()) {
    throw new ApiError(400, "Tanggal berangkat tidak boleh di masa lalu");
  }
  if (body.type === "trip") {
    const booked = await pool.query(
      `SELECT COALESCE(SUM(participants), 0) AS total FROM bookings
       WHERE listing_id = $1 AND status <> 'cancelled'`,
      [old.id],
    );
    if (body.quota < booked.rows[0].total) {
      throw new ApiError(
        409,
        `Kuota tidak boleh kurang dari ${booked.rows[0].total} peserta yang sudah memesan`,
      );
    }
  }

  // Listing yang ditangguhkan admin tidak bisa diaktifkan sendiri oleh seller.
  const status = old.status === "suspended" ? "suspended" : body.status || old.status;
  const imagePath = req.file ? savedPath(FOLDER, req.file) : old.image_path;

  await pool.query(
    `UPDATE listings SET category_id = $1, destination_id = $2, type = $3, title = $4,
       description = $5, price = $6, quota = $7, start_date = $8, duration_days = $9,
       languages = $10, includes = $11, image_path = $12, status = $13
     WHERE id = $14`,
    [
      body.category_id,
      body.destination_id,
      body.type,
      body.title,
      body.description,
      body.price,
      body.quota,
      extra.start_date,
      extra.duration_days,
      extra.languages,
      body.includes,
      imagePath,
      status,
      old.id,
    ],
  );
  if (req.file) deleteFile(old.image_path);

  sendSuccess(res, await findListing(req, old.id), "Listing berhasil diperbarui");
}

// DELETE /api/seller/listings/:id
export async function deleteListing(req, res) {
  const listing = await findOwnListing(req.params.id, req.user.id);

  const bookings = await pool.query(
    "SELECT COUNT(*) AS total FROM bookings WHERE listing_id = $1",
    [listing.id],
  );
  if (bookings.rows[0].total > 0) {
    throw new ApiError(
      409,
      "Listing sudah memiliki pesanan, jadi tidak bisa dihapus. Nonaktifkan saja.",
    );
  }

  await pool.query("DELETE FROM listings WHERE id = $1", [listing.id]);
  deleteFile(listing.image_path);
  sendSuccess(res, null, "Listing berhasil dihapus");
}
