import pool from "../db.js";
import { sendSuccess } from "../utils/response.js";
import { getUserData } from "./auth.controller.js";

// Status pesanan yang dihitung sebagai pendapatan (pembayaran sudah disetujui).
const PAID = "('confirmed', 'completed')";

// PUT /api/seller/profile
export async function updateSellerProfile(req, res) {
  const { business_name, city, description, bank_name, bank_account_number, bank_account_name } =
    req.body;

  // Seller yang ditolak bisa memperbaiki data, lalu otomatis diajukan ulang ke admin.
  await pool.query(
    `UPDATE seller_profiles
     SET business_name = $1, city = $2, description = $3, bank_name = $4,
         bank_account_number = $5, bank_account_name = $6,
         verification_status = CASE WHEN verification_status = 'rejected' THEN 'pending'
                                    ELSE verification_status END,
         rejection_reason = CASE WHEN verification_status = 'rejected' THEN NULL
                                 ELSE rejection_reason END
     WHERE user_id = $7`,
    [
      business_name,
      city,
      description,
      bank_name,
      bank_account_number,
      bank_account_name,
      req.user.id,
    ],
  );
  sendSuccess(res, await getUserData(req.user.id), "Profil usaha berhasil diperbarui");
}

// GET /api/seller/report → ringkasan dashboard + pendapatan 6 bulan terakhir + listing terlaris
export async function getSalesReport(req, res) {
  const sellerId = req.user.id;

  const summary = await pool.query(
    `SELECT
       COALESCE(SUM(b.total_price) FILTER (WHERE b.status IN ${PAID}), 0) AS total_revenue,
       COUNT(b.id) FILTER (WHERE b.status IN ${PAID}) AS paid_bookings,
       COUNT(b.id) FILTER (WHERE b.status = 'waiting_verification') AS waiting_verification,
       COUNT(b.id) FILTER (WHERE b.status = 'pending_payment') AS pending_payment
     FROM bookings b
     JOIN listings l ON l.id = b.listing_id
     WHERE l.seller_id = $1`,
    [sellerId],
  );

  const listings = await pool.query(
    `SELECT COUNT(*) FILTER (WHERE status = 'active') AS active_listings,
            COUNT(*) AS total_listings
     FROM listings WHERE seller_id = $1`,
    [sellerId],
  );

  const rating = await pool.query(
    `SELECT COALESCE(ROUND(AVG(rv.rating), 1), 0) AS average_rating, COUNT(rv.id) AS review_count
     FROM reviews rv
     JOIN bookings b ON b.id = rv.booking_id
     JOIN listings l ON l.id = b.listing_id
     WHERE l.seller_id = $1`,
    [sellerId],
  );

  // generate_series membuat daftar 6 bulan agar bulan tanpa transaksi tetap muncul (nilai 0).
  const monthly = await pool.query(
    `SELECT TO_CHAR(m.month, 'YYYY-MM') AS month,
            COALESCE(SUM(b.total_price), 0) AS revenue,
            COUNT(b.id) AS bookings
     FROM generate_series(DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '5 months',
                          DATE_TRUNC('month', CURRENT_DATE), INTERVAL '1 month') AS m(month)
     LEFT JOIN bookings b
       ON DATE_TRUNC('month', b.created_at) = m.month
      AND b.status IN ${PAID}
      AND b.listing_id IN (SELECT id FROM listings WHERE seller_id = $1)
     GROUP BY m.month
     ORDER BY m.month`,
    [sellerId],
  );

  const topListings = await pool.query(
    `SELECT l.id, l.title, l.type, COUNT(b.id) AS bookings, COALESCE(SUM(b.total_price), 0) AS revenue
     FROM listings l
     LEFT JOIN bookings b ON b.listing_id = l.id AND b.status IN ${PAID}
     WHERE l.seller_id = $1
     GROUP BY l.id
     ORDER BY revenue DESC, bookings DESC
     LIMIT 5`,
    [sellerId],
  );

  sendSuccess(res, {
    ...summary.rows[0],
    ...listings.rows[0],
    ...rating.rows[0],
    monthly: monthly.rows,
    top_listings: topListings.rows,
  });
}
