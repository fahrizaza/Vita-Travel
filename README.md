# Vita Travel

Marketplace UMKM jasa travel: **seller** menjual paket trip dan jasa pemandu lokal, **buyer** memesan
dan membayar lewat transfer bank, **admin** memverifikasi seller dan menjaga kualitas listing.

Proyek Uji Level / AAS Ganjil RPL 2026/2027 (soal: `SOAL_AAS_KOKE_XI_RPL_2026_2027.docx`).

| Folder                | Isi                                               | Teknologi                                                   |
| --------------------- | ------------------------------------------------- | ----------------------------------------------------------- |
| [`web/`](web)         | Website company profile                           | Vite 8, React 19, React Router, GSAP                        |
| [`backend/`](backend) | REST API                                          | Node.js 22, Express 5, PostgreSQL, JWT, bcrypt, multer, zod |
| [`mobile/`](mobile)   | Aplikasi mobile                                   | Flutter 3.44, Provider, http                                |
| [`docs/`](docs)       | ERD, daftar endpoint, alur kerja, koleksi Postman |                                                             |
| `legacy/`             | Ekspor Webflow asli, rujukan desain saja          |                                                             |

## Akun uji

Semua akun memakai password **`Password123`**.

| Role   | Email                          | Keterangan                                                             |
| ------ | ------------------------------ | ---------------------------------------------------------------------- |
| Admin  | `admin@vitatravel.id`          |                                                                        |
| Seller | `seller@vitatravel.id`         | Nusa Retreat, sudah diverifikasi                                       |
| Seller | `seller2@vitatravel.id`        | Kelana Explorer, sudah diverifikasi                                    |
| Seller | `seller.pending@vitatravel.id` | Menunggu verifikasi (untuk demo admin)                                 |
| Buyer  | `buyer@vitatravel.id`          | Punya pesanan di berbagai status + 1 pesanan selesai yang belum diulas |
| Buyer  | `buyer2@vitatravel.id`         |                                                                        |

## Menjalankan

### 1. Database & backend

Butuh PostgreSQL yang sedang berjalan (di Mac ini: `brew services start postgresql@18`).

```bash
cd backend
cp .env.example .env        # isi DATABASE_URL & JWT_SECRET (sudah terisi di Mac ini)
npm install
npm run db:setup            # buat database vita_travel + tabel + data contoh
npm run dev                 # API berjalan di http://localhost:3001/api
```

`npm run db:setup` bisa dijalankan ulang kapan saja untuk mengembalikan data ke kondisi awal
(semua data & foto upload akan dihapus).

Jika PostgreSQL memakai user/password, tulis di `.env`, contoh:
`DATABASE_URL=postgres://postgres:rahasia@localhost:5432/vita_travel`.

### Memakai basis data Aiven (basis data daring)

Berkas `.env` pada proyek ini sudah diarahkan ke **Aiven for PostgreSQL**, sehingga tabel dan data
contoh berada di server daring, bukan di laptop. Tiga hal yang perlu diketahui sebelum mengubahnya:

- `DATABASE_URL` berisi Service URI dari halaman layanan Aiven. Bila menyalin ulang dari halaman itu,
  **hapus** parameter `?sslmode=require` yang ikut tersalin. Pada `pg-connection-string` versi 2,
  parameter tersebut menimpa pengaturan SSL aplikasi sehingga sertifikat Aiven justru ditolak dengan
  pesan `self-signed certificate in certificate chain`.
- Sertifikat CA Aiven disimpan di [`backend/certs/aiven-ca.pem`](backend/certs) dan diteruskan ke driver
  `pg` sebagai `ssl.ca`. Cara mengunduh ulang sertifikat itu ada di `backend/certs/README.md`.
- `TEST_DATABASE_URL` sengaja tetap menunjuk PostgreSQL lokal, supaya `npm test` tidak pernah menghapus
  isi basis data daring.

Untuk kembali bekerja sepenuhnya di laptop, arahkan `DATABASE_URL` ke
`postgres://localhost:5432/vita_travel`, lalu jalankan `npm run db:setup`.

### 2. Website company profile

Website berada di folder `web/` dan berdiri sendiri, terpisah dari backend maupun mobile.
Seluruh perintahnya dijalankan dari dalam folder itu.

```bash
cd web
npm install
npm run dev                 # situs berjalan di http://localhost:5173
npm run build               # hasil build ke web/dist/
npm run lint                # oxlint
npm run format:check        # memeriksa format tanpa mengubah berkas
```

Situs sudah disebarkan dan dapat dibuka di **https://vita-travel.netlify.app**.

Berkas `netlify.toml` sengaja **tetap berada di akar proyek**, bukan ikut ke dalam `web/`: Netlify
mencari konfigurasi di akar repositori, dan di dalamnya path-nya ditulis relatif terhadap akar
(`cd web && npm run build`, `publish = "web/dist"`).

### 3. Aplikasi Flutter

```bash
cd mobile
flutter pub get

flutter run -d chrome                     # di browser Chrome (API: localhost)
flutter run                               # di emulator Android (API otomatis 10.0.2.2)
flutter run --dart-define=API_URL=http://192.168.1.10:3001/api   # di HP fisik, pakai IP laptop
```

HP fisik dan laptop harus berada di jaringan Wi-Fi yang sama. IP laptop bisa dilihat dengan
`ipconfig getifaddr en0` (Mac) atau `ipconfig` (Windows).

APK untuk dipasang di HP: `flutter build apk --dart-define=API_URL=http://IP-LAPTOP:3001/api`
→ hasil di `mobile/build/app/outputs/flutter-apk/`.

### 4. Test otomatis

```bash
cd backend && npm test      # 22 test API: auth, role, validasi, upload, alur pesanan
cd mobile && flutter test   # validator, format, pengalihan role, form login, dialog hapus
cd web && npm run lint      # oxlint pada kode website
```

## Pemenuhan soal

| Syarat soal                                                                                                                                                  | Di mana                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| REST API Express, method & status code sesuai, JSON konsisten                                                                                                | [`docs/API.md`](docs/API.md), `backend/src/routes`, `backend/src/utils/response.js`                       |
| CRUD 2 data utama yang saling berhubungan                                                                                                                    | `listings` (seller) ↔ `bookings` (buyer), plus kategori & destinasi (admin)                               |
| Register & login, password di-hash                                                                                                                           | `backend/src/controllers/auth.controller.js` (bcrypt)                                                     |
| Otorisasi 3 role, endpoint privat dilindungi middleware                                                                                                      | `backend/src/middleware/auth.js` (`verifyToken`, `allowRoles`, `approvedSellerOnly`)                      |
| Upload gambar dengan validasi tipe & ukuran                                                                                                                  | `backend/src/middleware/upload.js` (JPG/PNG/WEBP, 2 MB): foto listing, bukti transfer, foto destinasi     |
| Validasi input & penanganan error                                                                                                                            | `backend/src/validators.js`, `backend/src/middleware/errorHandler.js`, `mobile/lib/utils/validators.dart` |
| Database: users + role + ≥2 tabel utama, PK/FK, ERD, file SQL                                                                                                | [`docs/ERD.md`](docs/ERD.md), `backend/database/schema.sql`                                               |
| Mobile: login/register, halaman utama, daftar & detail, tambah/edit/hapus dengan konfirmasi, upload & tampil gambar, pembatasan per role, pesan sukses/gagal | `mobile/lib/screens/` — lihat [`docs/ALUR.md`](docs/ALUR.md)                                              |
| Akun uji setiap role                                                                                                                                         | Tabel di atas (`backend/database/seed.js`)                                                                |
| Nilai tambah                                                                                                                                                 | Pencarian & filter, ulasan & rating, favorit, laporan penjualan, dashboard admin                          |

Dokumen lain: alur kerja & struktur kode di [`docs/ALUR.md`](docs/ALUR.md), design system aplikasi
di [`mobile/DESIGN.md`](mobile/DESIGN.md).
