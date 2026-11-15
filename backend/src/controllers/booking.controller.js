import pool, { transaction } from "../db.js";
import { deleteFile, savedPath } from "../middleware/upload.js";
import { ApiError, fileUrl, sendSuccess, today } from "../utils/response.js";

// Alur status pesanan:
// pending_payment → (buyer upload bukti) → waiting_verification
//   → seller setuju → confirmed → seller tandai selesai → completed
//   → seller tolak  → kembali ke pending_payment (buyer upload ulang)
// Sebelum completed, pesanan bisa dibatalkan → cancelled

const BOOKING_SELECT = `
  SELECT b.*, l.title AS listing_title, l.type AS listing_type, l.image_path, l.seller_id,
         sp.business_name AS seller_name, sp.bank_name, sp.bank_account_number, sp.bank_account_name,
         u.name AS buyer_name, u.email AS buyer_email, u.phone AS buyer_phone,
         rv.rating AS review_rating, rv.comment AS review_comment
  FROM bookings b
  JOIN listings l ON l.id = b.listing_id
  JOIN seller_profiles sp ON sp.user_id = l.seller_id
  JOIN users u ON u.id = b.buyer_id
  LEFT JOIN reviews rv ON rv.booking_id = b.id
`;

function formatBooking(req, row) {
  const { image_path, proof_path, ...booking } = row;
  return {
    ...booking,
    listing_image_url: fileUrl(req, image_path),
    proof_url: fileUrl(req, proof_path),
  };
}

/** Ambil pesanan dan pastikan user boleh melihatnya (buyer pemesan, seller pemilik listing, admin). */
async function findBooking(req, id) {
  const result = await pool.query(`${BOOKING_SELECT} WHERE b.id = $1`, [id]);
  const booking = result.rows[0];
  if (!booking) throw new ApiError(404, "Pesanan tidak ditemukan");

  const { id: userId, role } = req.user;
  const allowed =
    role === "admin" ||
    (role === "buyer" && booking.buyer_id === userId) ||
    (role === "seller" && booking.seller_id === userId);
  if (!allowed) throw new ApiError(403, "Anda tidak memiliki akses ke pesanan ini");
  return booking;
}

// POST /api/bookings (buyer)
export async function createBooking(req, res) {
  const { listing_id, participants, service_date, days, note } = req.body;

  // Transaksi + FOR UPDATE: dua buyer yang memesan bersamaan tidak bisa melebihi kuota.
  const bookingId = await transaction(async (client) => {
    const found = await client.query(
      "SELECT * FROM listings WHERE id = $1 AND status = 'active' FOR UPDATE",
      [listing_id],
    );
    const listing = found.rows[0];
    if (!listing) throw new ApiError(404, "Listing tidak ditemukan atau sedang tidak aktif");

    let date, totalDays, totalPrice;

    if (listing.type === "trip") {
      if (listing.start_date < today()) throw new ApiError(409, "Paket trip ini sudah berangkat");
      const booked = await client.query(
        `SELECT COALESCE(SUM(participants), 0) AS total FROM bookings
         WHERE listing_id = $1 AND status <> 'cancelled'`,
        [listing.id],
      );
      const remaining = listing.quota - booked.rows[0].total;
      if (participants > remaining) {
        throw new ApiError(
          409,
          remaining > 0 ? `Sisa kuota hanya ${remaining} orang` : "Kuota sudah penuh",
        );
      }
      date = listing.start_date;
      totalDays = listing.duration_days;
      totalPrice = listing.price * participants; // harga trip per orang
    } else {
      if (!service_date) throw new ApiError(400, "Tanggal layanan wajib diisi");
      if (service_date < today())
        throw new ApiError(400, "Tanggal layanan tidak boleh di masa lalu");
      if (participants > listing.quota) {
        throw new ApiError(400, `Maksimal ${listing.quota} orang per grup`);
      }
      totalDays = days || 1;
      // Pemandu tidak bisa dipesan dua kali pada tanggal yang bertabrakan.
      const clash = await client.query(
        `SELECT id FROM bookings
         WHERE listing_id = $1 AND status <> 'cancelled'
           AND service_date < $2::date + $3::int
           AND service_date + days > $2::date`,
        [listing.id, service_date, totalDays],
      );
      if (clash.rowCount > 0) {
        throw new ApiError(409, "Pemandu sudah dipesan pada tanggal tersebut, pilih tanggal lain");
      }
      date = service_date;
      totalPrice = listing.price * totalDays; // harga pemandu per hari
    }

    const inserted = await client.query(
      `INSERT INTO bookings (buyer_id, listing_id, service_date, days, participants, total_price, note)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [req.user.id, listing.id, date, totalDays, participants, totalPrice, note],
    );
    return inserted.rows[0].id;
  });

  const booking = await findBooking(req, bookingId);
  sendSuccess(
    res,
    formatBooking(req, booking),
    "Pesanan berhasil dibuat, silakan lakukan pembayaran",
    201,
  );
}

// GET /api/bookings?status= → buyer: pesanan saya, seller: pesanan masuk, admin: semua
export async function getBookings(req, res) {
  const conditions = [];
  const params = [];

  if (req.user.role === "buyer") {
    params.push(req.user.id);
    conditions.push(`b.buyer_id = $${params.length}`);
  } else if (req.user.role === "seller") {
    params.push(req.user.id);
    conditions.push(`l.seller_id = $${params.length}`);
  }
  if (req.query.status) {
    params.push(req.query.status);
    conditions.push(`b.status = $${params.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const result = await pool.query(`${BOOKING_SELECT} ${where} ORDER BY b.created_at DESC`, params);
  sendSuccess(
    res,
    result.rows.map((row) => formatBooking(req, row)),
  );
}

// GET /api/bookings/:id
export async function getBookingById(req, res) {
  sendSuccess(res, formatBooking(req, await findBooking(req, req.params.id)));
}

// PATCH /api/bookings/:id/payment (buyer, form-data: image, sender_name, sender_bank)
export async function uploadPayment(req, res) {
  if (!req.file) throw new ApiError(400, "Foto bukti transfer wajib diupload");
  const booking = await findBooking(req, req.params.id);
  if (booking.status !== "pending_payment") {
    throw new ApiError(409, "Bukti transfer hanya bisa diupload saat status Menunggu Pembayaran");
  }

  await pool.query(
    `UPDATE bookings SET proof_path = $1, sender_name = $2, sender_bank = $3,
       status = 'waiting_verification', status_note = NULL
     WHERE id = $4`,
    [savedPath("payments", req.file), req.body.sender_name, req.body.sender_bank, booking.id],
  );
  deleteFile(booking.proof_path); // bukti lama (jika sebelumnya ditolak)

  const updated = await findBooking(req, booking.id);
  sendSuccess(
    res,
    formatBooking(req, updated),
    "Bukti transfer terkirim, menunggu verifikasi seller",
  );
}

// PATCH /api/bookings/:id/verify (seller) body: { approve: true/false, note }
export async function verifyPayment(req, res) {
  const booking = await findBooking(req, req.params.id);
  if (booking.status !== "waiting_verification") {
    throw new ApiError(409, "Pesanan ini tidak sedang menunggu verifikasi");
  }

  const { approve, note } = req.body;
  await pool.query("UPDATE bookings SET status = $1, status_note = $2 WHERE id = $3", [
    approve ? "confirmed" : "pending_payment",
    approve ? null : note,
    booking.id,
  ]);

  const updated = await findBooking(req, booking.id);
  const message = approve
    ? "Pembayaran disetujui"
    : "Bukti transfer ditolak, buyer diminta upload ulang";
  sendSuccess(res, formatBooking(req, updated), message);
}

// PATCH /api/bookings/:id/complete (seller)
export async function completeBooking(req, res) {
  const booking = await findBooking(req, req.params.id);
  if (booking.status !== "confirmed") {
    throw new ApiError(409, "Hanya pesanan yang sudah dikonfirmasi yang bisa diselesaikan");
  }

  await pool.query("UPDATE bookings SET status = 'completed' WHERE id = $1", [booking.id]);
  sendSuccess(
    res,
    formatBooking(req, await findBooking(req, booking.id)),
    "Pesanan ditandai selesai",
  );
}

// PATCH /api/bookings/:id/cancel (buyer / seller) body: { reason }
export async function cancelBooking(req, res) {
  const booking = await findBooking(req, req.params.id);

  // Buyer hanya boleh membatalkan sebelum pembayaran disetujui.
  const allowedStatus =
    req.user.role === "buyer"
      ? ["pending_payment", "waiting_verification"]
      : ["pending_payment", "waiting_verification", "confirmed"];
  if (!allowedStatus.includes(booking.status)) {
    throw new ApiError(409, "Pesanan dengan status ini tidak bisa dibatalkan");
  }
  if (req.user.role === "seller" && !req.body.reason) {
    throw new ApiError(400, "Alasan pembatalan wajib diisi", [
      { field: "reason", message: "Alasan pembatalan wajib diisi" },
    ]);
  }

  await pool.query("UPDATE bookings SET status = 'cancelled', status_note = $1 WHERE id = $2", [
    req.body.reason,
    booking.id,
  ]);
  sendSuccess(res, formatBooking(req, await findBooking(req, booking.id)), "Pesanan dibatalkan");
}

// POST /api/bookings/:id/review (buyer) body: { rating, comment }
export async function createReview(req, res) {
  const booking = await findBooking(req, req.params.id);
  if (booking.status !== "completed") {
    throw new ApiError(409, "Ulasan hanya bisa diberikan setelah pesanan selesai");
  }
  if (booking.review_rating) throw new ApiError(409, "Anda sudah memberi ulasan untuk pesanan ini");

  const result = await pool.query(
    "INSERT INTO reviews (booking_id, rating, comment) VALUES ($1, $2, $3) RETURNING *",
    [booking.id, req.body.rating, req.body.comment],
  );
  sendSuccess(res, result.rows[0], "Terima kasih atas ulasan Anda", 201);
}
