# ERD — Database `vita_travel`

Database: **PostgreSQL**. Struktur dibuat oleh [`backend/database/schema.sql`](../backend/database/schema.sql)
(DDL), data contoh oleh [`backend/database/seed.js`](../backend/database/seed.js) (DML).
Gambar ERD: [`erd.svg`](erd.svg).

```mermaid
erDiagram
    users ||--o| seller_profiles : "punya profil usaha (seller)"
    users ||--o{ listings : "menjual (seller)"
    categories ||--o{ listings : "mengelompokkan"
    destinations ||--o{ listings : "lokasi"
    users ||--o{ bookings : "memesan (buyer)"
    listings ||--o{ bookings : "dipesan"
    bookings ||--o| reviews : "diulas"
    users ||--o{ wishlists : "menyimpan (buyer)"
    listings ||--o{ wishlists : "disimpan"

    users {
        SERIAL id PK
        VARCHAR(100) name
        VARCHAR(150) email UK
        VARCHAR(255) password_hash "hash bcrypt"
        VARCHAR(20) phone
        user_role role "admin | seller | buyer"
        BOOLEAN is_active
        TIMESTAMP created_at
    }
    seller_profiles {
        INTEGER user_id PK,FK "→ users.id"
        VARCHAR(120) business_name
        VARCHAR(80) city
        TEXT description
        VARCHAR(60) bank_name
        VARCHAR(40) bank_account_number
        VARCHAR(100) bank_account_name
        verification_status verification_status "pending | approved | rejected"
        TEXT rejection_reason
    }
    categories {
        SERIAL id PK
        VARCHAR(60) name UK
    }
    destinations {
        SERIAL id PK
        VARCHAR(80) name UK
        VARCHAR(80) region
        VARCHAR(255) image_path
    }
    listings {
        SERIAL id PK
        INTEGER seller_id FK "→ users.id"
        INTEGER category_id FK "→ categories.id"
        INTEGER destination_id FK "→ destinations.id"
        listing_type type "trip | guide"
        VARCHAR(120) title
        TEXT description
        NUMERIC price "trip: per orang, guide: per hari"
        INTEGER quota "trip: kursi, guide: maks. grup"
        DATE start_date "khusus trip"
        INTEGER duration_days "khusus trip"
        VARCHAR(120) languages "khusus guide"
        TEXT includes
        VARCHAR(255) image_path
        listing_status status "active | inactive | suspended"
        TEXT moderation_note
        TIMESTAMP created_at
    }
    bookings {
        SERIAL id PK
        INTEGER buyer_id FK "→ users.id"
        INTEGER listing_id FK "→ listings.id"
        DATE service_date
        INTEGER days
        INTEGER participants
        NUMERIC total_price
        TEXT note
        booking_status status
        VARCHAR(255) proof_path "foto bukti transfer"
        VARCHAR(100) sender_name
        VARCHAR(60) sender_bank
        TEXT status_note
        TIMESTAMP created_at
    }
    reviews {
        SERIAL id PK
        INTEGER booking_id FK,UK "→ bookings.id"
        INTEGER rating "1–5"
        TEXT comment
        TIMESTAMP created_at
    }
    wishlists {
        INTEGER buyer_id PK,FK "→ users.id"
        INTEGER listing_id PK,FK "→ listings.id"
        TIMESTAMP created_at
    }
```

## Penjelasan tabel

| Tabel             | Fungsi                                                       | Kunci & relasi                                                         |
| ----------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `users`           | Akun login semua role. Role disimpan di kolom `role` (ENUM). | PK `id`, email UNIQUE                                                  |
| `seller_profiles` | Data usaha & rekening seller, status verifikasi admin.       | PK sekaligus FK `user_id` → relasi **1:1** dengan `users`              |
| `categories`      | Tema listing (Retreat, Petualangan, …). Dikelola admin.      | PK `id`, nama UNIQUE                                                   |
| `destinations`    | Lokasi tujuan + foto. Dikelola admin.                        | PK `id`, nama UNIQUE                                                   |
| `listings`        | **Data utama 1**: paket trip / jasa pemandu milik seller.    | FK ke `users`, `categories`, `destinations` (**N:1**)                  |
| `bookings`        | **Data utama 2**: pesanan buyer + bukti transfer.            | FK ke `users` (buyer) & `listings` (**N:1**)                           |
| `reviews`         | Rating & ulasan, maksimal satu per pesanan.                  | FK `booking_id` UNIQUE → **1:1** dengan `bookings`                     |
| `wishlists`       | Listing favorit buyer.                                       | PK gabungan (`buyer_id`, `listing_id`) → relasi **N:M** users–listings |

## Aturan integritas data

- **ON DELETE RESTRICT** pada `listings.category_id`, `listings.destination_id`, dan
  `bookings.listing_id`: kategori/destinasi yang masih dipakai listing, atau listing yang sudah punya
  pesanan, tidak bisa dihapus (API membalas `409 Conflict`).
- **ON DELETE CASCADE** pada `seller_profiles`, `wishlists`, `reviews`: data turunan ikut terhapus
  bersama induknya.
- **CHECK**: `price > 0`, `quota > 0`, `rating BETWEEN 1 AND 5`, dan paket trip wajib punya
  `start_date` + `duration_days`.
- **ENUM** membatasi nilai `role`, `status` listing, `status` pesanan, dan status verifikasi.
- Password disimpan sebagai **hash bcrypt** (`password_hash`), bukan teks asli.
- Gambar disimpan sebagai file di folder `backend/uploads/`; database hanya menyimpan path-nya
  (`image_path`, `proof_path`).
