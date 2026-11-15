import pool from "../db.js";
import { LISTING_SELECT, formatListing } from "../utils/listingQuery.js";
import { ApiError, sendSuccess } from "../utils/response.js";

// GET /api/admin/dashboard → ringkasan seluruh platform
export async function getDashboard(req, res) {
  const users = await pool.query(
    `SELECT COUNT(*) FILTER (WHERE role = 'buyer') AS buyers,
            COUNT(*) FILTER (WHERE role = 'seller') AS sellers,
            COUNT(*) FILTER (WHERE is_active = FALSE) AS inactive_users
     FROM users`,
  );
  const sellers = await pool.query(
    "SELECT COUNT(*) AS pending_sellers FROM seller_profiles WHERE verification_status = 'pending'",
  );
  const listings = await pool.query(
    `SELECT COUNT(*) FILTER (WHERE status = 'active') AS active_listings,
            COUNT(*) FILTER (WHERE status = 'suspended') AS suspended_listings
     FROM listings`,
  );
  const bookings = await pool.query(
    `SELECT COUNT(*) AS total_bookings,
            COUNT(*) FILTER (WHERE status = 'completed') AS completed_bookings,
            COALESCE(SUM(total_price) FILTER (WHERE status IN ('confirmed', 'completed')), 0)
              AS total_transactions
     FROM bookings`,
  );
  const monthly = await pool.query(
    `SELECT TO_CHAR(m.month, 'YYYY-MM') AS month,
            COALESCE(SUM(b.total_price), 0) AS revenue,
            COUNT(b.id) AS bookings
     FROM generate_series(DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '5 months',
                          DATE_TRUNC('month', CURRENT_DATE), INTERVAL '1 month') AS m(month)
     LEFT JOIN bookings b
       ON DATE_TRUNC('month', b.created_at) = m.month
      AND b.status IN ('confirmed', 'completed')
     GROUP BY m.month
     ORDER BY m.month`,
  );

  sendSuccess(res, {
    ...users.rows[0],
    ...sellers.rows[0],
    ...listings.rows[0],
    ...bookings.rows[0],
    monthly: monthly.rows,
  });
}

// GET /api/admin/users?role=&search=
export async function getUsers(req, res) {
  const conditions = [];
  const params = [];
  if (req.query.role) {
    params.push(req.query.role);
    conditions.push(`role = $${params.length}`);
  }
  if (req.query.search) {
    params.push(`%${req.query.search}%`);
    conditions.push(`(name ILIKE $${params.length} OR email ILIKE $${params.length})`);
  }
  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  const result = await pool.query(
    `SELECT id, name, email, phone, role, is_active, created_at FROM users ${where}
     ORDER BY created_at DESC`,
    params,
  );
  sendSuccess(res, result.rows);
}

// PATCH /api/admin/users/:id/status body: { is_active }
export async function updateUserStatus(req, res) {
  if (Number(req.params.id) === req.user.id) {
    throw new ApiError(400, "Anda tidak bisa menonaktifkan akun sendiri");
  }
  const result = await pool.query(
    "UPDATE users SET is_active = $1 WHERE id = $2 RETURNING id, name, email, role, is_active",
    [req.body.is_active, req.params.id],
  );
  if (result.rowCount === 0) throw new ApiError(404, "User tidak ditemukan");
  sendSuccess(res, result.rows[0], req.body.is_active ? "User diaktifkan" : "User dinonaktifkan");
}

// GET /api/admin/sellers?status=pending|approved|rejected
export async function getSellers(req, res) {
  const params = [];
  let where = "";
  if (req.query.status) {
    params.push(req.query.status);
    where = "WHERE sp.verification_status = $1";
  }
  const result = await pool.query(
    `SELECT u.id, u.name, u.email, u.phone, u.is_active, u.created_at,
            sp.business_name, sp.city, sp.description, sp.bank_name, sp.bank_account_number,
            sp.bank_account_name, sp.verification_status, sp.rejection_reason,
            (SELECT COUNT(*) FROM listings l WHERE l.seller_id = u.id) AS listing_count
     FROM seller_profiles sp
     JOIN users u ON u.id = sp.user_id
     ${where}
     ORDER BY u.created_at DESC`,
    params,
  );
  sendSuccess(res, result.rows);
}

// PATCH /api/admin/sellers/:id/verify body: { status: approved|rejected, reason }
export async function verifySeller(req, res) {
  const { status, reason } = req.body;
  const result = await pool.query(
    `UPDATE seller_profiles SET verification_status = $1, rejection_reason = $2
     WHERE user_id = $3 RETURNING user_id`,
    [status, status === "rejected" ? reason : null, req.params.id],
  );
  if (result.rowCount === 0) throw new ApiError(404, "Seller tidak ditemukan");
  sendSuccess(res, null, status === "approved" ? "Seller disetujui" : "Seller ditolak");
}

// GET /api/admin/listings?status=&search=
export async function getAllListings(req, res) {
  const conditions = [];
  const params = [];
  if (req.query.status) {
    params.push(req.query.status);
    conditions.push(`l.status = $${params.length}`);
  }
  if (req.query.search) {
    params.push(`%${req.query.search}%`);
    conditions.push(
      `(l.title ILIKE $${params.length} OR sp.business_name ILIKE $${params.length})`,
    );
  }
  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  const result = await pool.query(`${LISTING_SELECT} ${where} ORDER BY l.created_at DESC`, params);
  sendSuccess(
    res,
    result.rows.map((row) => formatListing(req, row)),
  );
}

// PATCH /api/admin/listings/:id/moderate body: { action: suspend|restore, note }
export async function moderateListing(req, res) {
  const { action, note } = req.body;
  const result = await pool.query(
    "UPDATE listings SET status = $1, moderation_note = $2 WHERE id = $3 RETURNING id",
    [
      action === "suspend" ? "suspended" : "active",
      action === "suspend" ? note : null,
      req.params.id,
    ],
  );
  if (result.rowCount === 0) throw new ApiError(404, "Listing tidak ditemukan");
  sendSuccess(res, null, action === "suspend" ? "Listing ditangguhkan" : "Listing dipulihkan");
}
