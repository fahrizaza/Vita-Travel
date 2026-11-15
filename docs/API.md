# REST API Vita Travel

Base URL: `http://localhost:3001/api` · Format: JSON · Autentikasi: header
`Authorization: Bearer <token>` (token didapat dari login/register, berlaku 7 hari).

Koleksi Postman siap impor: [`vita-travel.postman_collection.json`](vita-travel.postman_collection.json)
(jalankan request **Login …** dulu, token otomatis tersimpan di variabel koleksi).

## Format response

Sukses:

```json
{ "success": true, "message": "Login berhasil", "data": { "...": "..." } }
```

Gagal (contoh validasi):

```json
{
  "success": false,
  "message": "Format email tidak valid",
  "errors": [{ "field": "email", "message": "Format email tidak valid" }]
}
```

## HTTP status code yang dipakai

| Kode | Arti                   | Contoh                                                                                                                     |
| ---- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 200  | OK                     | GET data, update, hapus berhasil                                                                                           |
| 201  | Created                | Register, tambah listing, buat pesanan, beri ulasan                                                                        |
| 400  | Bad Request            | Input tidak valid, foto wajib belum diupload, ID bukan angka                                                               |
| 401  | Unauthorized           | Tanpa token, token kedaluwarsa, email/password salah                                                                       |
| 403  | Forbidden              | Role tidak berhak, seller belum diverifikasi, akun dinonaktifkan, data milik orang lain                                    |
| 404  | Not Found              | Data / endpoint tidak ada                                                                                                  |
| 409  | Conflict               | Email sudah terdaftar, kuota penuh, tanggal pemandu bentrok, ulasan ganda, status pesanan tidak sesuai, data masih dipakai |
| 413  | Payload Too Large      | Gambar lebih dari 2 MB                                                                                                     |
| 415  | Unsupported Media Type | File bukan JPG/PNG/WEBP                                                                                                    |
| 500  | Server Error           | Kesalahan tak terduga (detail hanya di log server)                                                                         |

## Daftar endpoint

Kolom **Akses**: `publik` = tanpa login · `login` = semua role · selain itu nama role.

### Auth — `src/routes/auth.routes.js`

| Method | Endpoint         | Akses  | Body / keterangan                                                                    |
| ------ | ---------------- | ------ | ------------------------------------------------------------------------------------ |
| POST   | `/auth/register` | publik | `name, email, phone, password, role (buyer\|seller)`; seller + `business_name, city` |
| POST   | `/auth/login`    | publik | `email, password` → `{ token, user }`                                                |
| GET    | `/auth/me`       | login  | Data user + profil usaha (seller)                                                    |
| PUT    | `/auth/me`       | login  | `name, phone`                                                                        |
| PUT    | `/auth/password` | login  | `old_password, new_password`                                                         |

### Kategori & destinasi — `category.routes.js`, `destination.routes.js`

| Method | Endpoint            | Akses  | Body / keterangan                               |
| ------ | ------------------- | ------ | ----------------------------------------------- |
| GET    | `/categories`       | publik | Daftar kategori + jumlah listing                |
| POST   | `/categories`       | admin  | `name`                                          |
| PUT    | `/categories/:id`   | admin  | `name`                                          |
| DELETE | `/categories/:id`   | admin  | 409 jika masih dipakai listing                  |
| GET    | `/destinations`     | publik | Daftar destinasi + `image_url`                  |
| POST   | `/destinations`     | admin  | **form-data**: `name, region, image` (wajib)    |
| PUT    | `/destinations/:id` | admin  | **form-data**: `name, region, image` (opsional) |
| DELETE | `/destinations/:id` | admin  | 409 jika masih dipakai listing                  |

### Listing publik — `listing.routes.js`

| Method | Endpoint        | Akses  | Keterangan                                                                                                                                                                           |
| ------ | --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| GET    | `/listings`     | publik | Query: `search, type (trip\|guide), category_id, destination_id, min_price, max_price, sort (newest\|rating\|price_low\|price_high)`. Hanya listing aktif dari seller terverifikasi. |
| GET    | `/listings/:id` | publik | Detail + 20 ulasan terbaru                                                                                                                                                           |

### Seller — `seller.routes.js` (semua khusus role **seller**)

| Method | Endpoint               | Keterangan                                                                                                                                                                                                     |
| ------ | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PUT    | `/seller/profile`      | `business_name, city, description, bank_name, bank_account_number, bank_account_name`. Seller yang ditolak otomatis diajukan ulang.                                                                            |
| GET    | `/seller/report`       | Ringkasan dashboard, pendapatan 6 bulan, listing terlaris                                                                                                                                                      |
| GET    | `/seller/listings`     | Listing milik sendiri (semua status)                                                                                                                                                                           |
| POST   | `/seller/listings`     | **form-data**: `type, title, description, price, quota, category_id, destination_id, image` + trip: `start_date, duration_days` / guide: `languages`; opsional `includes, status`. Wajib seller terverifikasi. |
| PUT    | `/seller/listings/:id` | Sama seperti POST, `image` opsional. Hanya pemilik (403 jika bukan).                                                                                                                                           |
| DELETE | `/seller/listings/:id` | 409 jika sudah ada pesanan                                                                                                                                                                                     |

### Pesanan — `booking.routes.js` (wajib login)

| Method | Endpoint                 | Akses         | Keterangan                                                                        |
| ------ | ------------------------ | ------------- | --------------------------------------------------------------------------------- |
| GET    | `/bookings?status=`      | login         | Buyer: pesanan sendiri · seller: pesanan masuk · admin: semua                     |
| GET    | `/bookings/:id`          | login         | Hanya buyer pemesan, seller pemilik listing, atau admin                           |
| POST   | `/bookings`              | buyer         | `listing_id, participants, note`; pemandu + `service_date (YYYY-MM-DD), days`     |
| PATCH  | `/bookings/:id/payment`  | buyer         | **form-data**: `image, sender_name, sender_bank` → status `waiting_verification`  |
| PATCH  | `/bookings/:id/verify`   | seller        | `{ approve: true }` → `confirmed`, `{ approve: false, note }` → `pending_payment` |
| PATCH  | `/bookings/:id/complete` | seller        | `confirmed` → `completed`                                                         |
| PATCH  | `/bookings/:id/cancel`   | buyer, seller | `reason` (wajib untuk seller)                                                     |
| POST   | `/bookings/:id/review`   | buyer         | `rating (1–5), comment` — hanya jika `completed`, sekali per pesanan              |

### Favorit — `wishlist.routes.js` (khusus **buyer**)

| Method | Endpoint               | Keterangan              |
| ------ | ---------------------- | ----------------------- |
| GET    | `/wishlist`            | Daftar listing favorit  |
| POST   | `/wishlist/:listingId` | Tambah ke favorit (201) |
| DELETE | `/wishlist/:listingId` | Hapus dari favorit      |

### Admin — `admin.routes.js` (khusus **admin**)

| Method | Endpoint                          | Keterangan                                                          |
| ------ | --------------------------------- | ------------------------------------------------------------------- |
| GET    | `/admin/dashboard`                | Statistik platform + transaksi 6 bulan                              |
| GET    | `/admin/users?role=&search=`      | Daftar user                                                         |
| PATCH  | `/admin/users/:id/status`         | `{ is_active: true/false }` (tidak bisa menonaktifkan diri sendiri) |
| GET    | `/admin/sellers?status=`          | Daftar seller (`pending`, `approved`, `rejected`)                   |
| PATCH  | `/admin/sellers/:id/verify`       | `{ status: "approved" }` atau `{ status: "rejected", reason }`      |
| GET    | `/admin/listings?status=&search=` | Semua listing                                                       |
| PATCH  | `/admin/listings/:id/moderate`    | `{ action: "suspend", note }` atau `{ action: "restore" }`          |

## Upload gambar

- Kirim sebagai `multipart/form-data` dengan nama field **`image`**.
- Tipe yang diterima: JPG, PNG, WEBP (dicek di `src/middleware/upload.js`). Ukuran maksimal 2 MB.
- File disimpan di `backend/uploads/<folder>/`, database menyimpan path relatif, API mengembalikan
  URL lengkap (`image_url`, `proof_url`, `listing_image_url`), misalnya
  `http://localhost:3001/uploads/listings/1731400000-123.jpg`.
- Jika request gagal setelah file terupload (misalnya validasi), file otomatis dihapus.

## Alur middleware sebuah request

```
request → cors → express.json → route
        → verifyToken (autentikasi, 401)
        → allowRoles("seller") (otorisasi, 403)
        → approvedSellerOnly (khusus tambah/edit listing)
        → uploadImage("listings") (tipe & ukuran file, 415/413)
        → validate(listingSchema) (validasi input, 400)
        → controller (query database)
        → errorHandler (semua error → JSON)
```
