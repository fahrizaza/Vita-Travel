import pool from "../db.js";
import { LISTING_SELECT, formatListing } from "../utils/listingQuery.js";
import { ApiError, sendSuccess } from "../utils/response.js";

// GET /api/wishlist (buyer)
export async function getWishlist(req, res) {
  const result = await pool.query(
    `${LISTING_SELECT}
     WHERE l.id IN (SELECT listing_id FROM wishlists WHERE buyer_id = $1)
     ORDER BY l.created_at DESC`,
    [req.user.id],
  );
  sendSuccess(
    res,
    result.rows.map((row) => formatListing(req, row)),
  );
}

// POST /api/wishlist/:listingId (buyer)
export async function addToWishlist(req, res) {
  const listing = await pool.query("SELECT id FROM listings WHERE id = $1", [req.params.listingId]);
  if (listing.rowCount === 0) throw new ApiError(404, "Listing tidak ditemukan");

  // ON CONFLICT DO NOTHING: jika sudah ada di wishlist, tidak dianggap error.
  await pool.query(
    "INSERT INTO wishlists (buyer_id, listing_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
    [req.user.id, req.params.listingId],
  );
  sendSuccess(res, null, "Ditambahkan ke favorit", 201);
}

// DELETE /api/wishlist/:listingId (buyer)
export async function removeFromWishlist(req, res) {
  const result = await pool.query("DELETE FROM wishlists WHERE buyer_id = $1 AND listing_id = $2", [
    req.user.id,
    req.params.listingId,
  ]);
  if (result.rowCount === 0) throw new ApiError(404, "Listing tidak ada di favorit");
  sendSuccess(res, null, "Dihapus dari favorit");
}
