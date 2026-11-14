-- =====================================================================
-- Database: vita_travel (PostgreSQL)
-- Marketplace jasa travel: seller menjual paket trip & jasa pemandu,
-- buyer memesan lalu mengunggah bukti transfer, admin mengelola platform.
--
-- File ini aman dijalankan ulang: semua tabel dihapus lalu dibuat lagi.
-- =====================================================================

DROP TABLE IF EXISTS wishlists, reviews, bookings, listings, destinations,
  categories, seller_profiles, users CASCADE;
DROP TYPE IF EXISTS user_role, verification_status, listing_type,
  listing_status, booking_status CASCADE;

-- ---------- Tipe ENUM ----------
CREATE TYPE user_role AS ENUM ('admin', 'seller', 'buyer');
CREATE TYPE verification_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE listing_type AS ENUM ('trip', 'guide');
CREATE TYPE listing_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE booking_status AS ENUM (
  'pending_payment',      -- menunggu buyer upload bukti transfer
  'waiting_verification', -- bukti sudah diupload, menunggu dicek seller
  'confirmed',            -- pembayaran disetujui seller
  'completed',            -- layanan sudah selesai
  'cancelled'             -- dibatalkan buyer/seller
);

-- ---------- 1. users: akun semua role ----------
CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,          -- hash bcrypt, bukan password asli
  phone         VARCHAR(20),
  role          user_role    NOT NULL DEFAULT 'buyer',
  is_active     BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- ---------- 2. seller_profiles: data usaha seller (1 user : 1 profil) ----------
CREATE TABLE seller_profiles (
  user_id             INTEGER PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
  business_name       VARCHAR(120) NOT NULL,
  city                VARCHAR(80)  NOT NULL,
  description         TEXT,
  bank_name           VARCHAR(60),
  bank_account_number VARCHAR(40),
  bank_account_name   VARCHAR(100),
  verification_status verification_status NOT NULL DEFAULT 'pending',
  rejection_reason    TEXT
);

-- ---------- 3. categories: tema listing, dikelola admin ----------
CREATE TABLE categories (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL UNIQUE
);

-- ---------- 4. destinations: lokasi tujuan, dikelola admin ----------
CREATE TABLE destinations (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(80) NOT NULL UNIQUE,
  region     VARCHAR(80) NOT NULL,              -- provinsi / negara
  image_path VARCHAR(255)
);

-- ---------- 5. listings: paket trip / jasa pemandu milik seller ----------
CREATE TABLE listings (
  id             SERIAL PRIMARY KEY,
  seller_id      INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  category_id    INTEGER NOT NULL REFERENCES categories (id) ON DELETE RESTRICT,
  destination_id INTEGER NOT NULL REFERENCES destinations (id) ON DELETE RESTRICT,
  type           listing_type   NOT NULL,
  title          VARCHAR(120)   NOT NULL,
  description    TEXT           NOT NULL,
  price          NUMERIC(12, 2) NOT NULL CHECK (price > 0), -- trip: per orang, guide: per hari
  quota          INTEGER        NOT NULL CHECK (quota > 0), -- trip: jumlah kursi, guide: maks. orang per grup
  start_date     DATE,                                      -- khusus trip: tanggal berangkat
  duration_days  INTEGER CHECK (duration_days > 0),         -- khusus trip: lama perjalanan
  languages      VARCHAR(120),                              -- khusus guide: bahasa yang dikuasai
  includes       TEXT,                                      -- fasilitas, satu per baris
  image_path     VARCHAR(255),
  status         listing_status NOT NULL DEFAULT 'active',
  moderation_note TEXT,                                     -- alasan jika ditangguhkan admin
  created_at     TIMESTAMP NOT NULL DEFAULT NOW(),
  -- trip wajib punya tanggal berangkat & durasi
  CHECK (type = 'guide' OR (start_date IS NOT NULL AND duration_days IS NOT NULL))
);

-- ---------- 6. bookings: pesanan buyer + bukti transfer ----------
CREATE TABLE bookings (
  id           SERIAL PRIMARY KEY,
  buyer_id     INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  listing_id   INTEGER NOT NULL REFERENCES listings (id) ON DELETE RESTRICT,
  service_date DATE    NOT NULL,                    -- trip: tgl berangkat, guide: hari pertama
  days         INTEGER NOT NULL DEFAULT 1 CHECK (days > 0),
  participants INTEGER NOT NULL CHECK (participants > 0),
  total_price  NUMERIC(14, 2) NOT NULL CHECK (total_price > 0),
  note         TEXT,                                -- catatan dari buyer
  status       booking_status NOT NULL DEFAULT 'pending_payment',
  proof_path   VARCHAR(255),                        -- foto bukti transfer
  sender_name  VARCHAR(100),
  sender_bank  VARCHAR(60),
  status_note  TEXT,                                -- alasan bukti ditolak / pesanan dibatalkan
  created_at   TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ---------- 7. reviews: ulasan buyer, satu per booking ----------
CREATE TABLE reviews (
  id         SERIAL PRIMARY KEY,
  booking_id INTEGER NOT NULL UNIQUE REFERENCES bookings (id) ON DELETE CASCADE,
  rating     INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment    TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ---------- 8. wishlists: listing favorit buyer (banyak-ke-banyak) ----------
CREATE TABLE wishlists (
  buyer_id   INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  listing_id INTEGER NOT NULL REFERENCES listings (id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (buyer_id, listing_id)
);
