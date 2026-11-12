import { fileUrl } from "./response.js";

/**
 * Query dasar listing yang dipakai di banyak endpoint: data listing + nama kategori, destinasi,
 * seller, rata-rata rating, dan sisa kuota (khusus trip).
 * Tambahkan WHERE / ORDER BY di belakangnya.
 */
export const LISTING_SELECT = `
  SELECT l.id, l.seller_id, l.category_id, l.destination_id, l.type, l.title, l.description,
         l.price, l.quota, l.start_date, l.duration_days, l.languages, l.includes, l.image_path,
         l.status, l.moderation_note, l.created_at,
         c.name AS category_name,
         d.name AS destination_name, d.region AS destination_region,
         sp.business_name AS seller_name, sp.city AS seller_city,
         COALESCE(r.rating, 0) AS rating,
         COALESCE(r.review_count, 0) AS review_count,
         CASE WHEN l.type = 'trip' THEN l.quota - COALESCE(b.booked, 0) ELSE l.quota END
           AS remaining_quota
  FROM listings l
  JOIN categories c ON c.id = l.category_id
  JOIN destinations d ON d.id = l.destination_id
  JOIN seller_profiles sp ON sp.user_id = l.seller_id
  JOIN users su ON su.id = l.seller_id
  LEFT JOIN (
    SELECT bk.listing_id, ROUND(AVG(rv.rating), 1) AS rating, COUNT(*) AS review_count
    FROM reviews rv JOIN bookings bk ON bk.id = rv.booking_id
    GROUP BY bk.listing_id
  ) r ON r.listing_id = l.id
  LEFT JOIN (
    SELECT listing_id, SUM(participants) AS booked
    FROM bookings WHERE status <> 'cancelled'
    GROUP BY listing_id
  ) b ON b.listing_id = l.id
`;

/** Mengganti image_path dengan URL gambar lengkap sebelum dikirim ke app. */
export function formatListing(req, row) {
  const { image_path, ...listing } = row;
  return { ...listing, image_url: fileUrl(req, image_path) };
}
