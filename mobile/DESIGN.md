# Design System — Vita Travel Mobile

Turunan dari brand website Vita Travel: gelap, editorial, foto besar. Semua token ada di
[`lib/theme/app_theme.dart`](lib/theme/app_theme.dart). Halaman tidak boleh memakai warna, ukuran
huruf, atau jarak di luar token ini.

## Arah visual

| Aspek | Keputusan |
|---|---|
| Tema | Satu tema gelap (teal), seperti website |
| Font | Plus Jakarta Sans 400 / 500 / 600 / 700 (dibundel di `assets/fonts`) |
| Sudut | Tegas: 2px tombol/input/badge, 4px kartu & panel, 0 untuk foto full-bleed |
| Kedalaman | Tanpa bayangan. **Glass** (blur) hanya di atas foto; halaman data memakai garis 1px |
| Ikon | Lucide (`lucide_icons_flutter`) |
| Logo | Monogram **V** oranye di atas teal (`widgets/vita_logo.dart`, `assets/icon/`) |
| Motion | Halus & fungsional, mati otomatis bila "kurangi gerakan" aktif |

## Warna — `AppColors`

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `canvas` | `#0D2E37` | Latar utama (`--brand-green` di web) |
| `sunken` | `#0A252C` | Input, drawer, dialog, bottom sheet |
| `iconMuted` | `#3D585F` | Ikon placeholder |
| `white` | `#FFFFFF` | Teks utama |
| `white60` | `#FFFFFF` 60% | Teks sekunder, label |
| `white40` | `#FFFFFF` 40% | Placeholder & nonaktif saja (kontras < 4.5:1, bukan untuk teks penting) |
| `white20` | `#FFFFFF` 20% | Garis tegas, border input |
| `white10` | `#FFFFFF` 10% | Garis pemisah |
| `accent` | `#FB9826` | Tombol utama, ikon aktif, harga di grafik (`--brand-accent`) |
| `accentPressed` | `#FA8805` | Tombol saat ditekan |
| `onAccent` | `#0D2E37` | Teks di atas oranye. Putih di atas oranye hanya ~2.2:1, gagal WCAG AA |

Warna status (badge: isi 12%, garis 60%, teks 100%; semua ≥ 4.5:1 di atas `canvas`):

| Token | Nilai | Status |
|---|---|---|
| `amber` | `#F5B841` | Menunggu Pembayaran, seller menunggu verifikasi |
| `sky` | `#6CC4F5` | Menunggu Verifikasi |
| `green` | `#4CD39B` | Dikonfirmasi, aktif, terverifikasi |
| `white60` | — | Selesai, nonaktif |
| `red` | `#FF6B6B` | Dibatalkan, ditangguhkan, ditolak, error (merah web `#FD4F4F` hanya 4.2:1) |

## Tipografi — `AppText`

| Token | Ukuran / tinggi baris | Bobot | Dipakai untuk |
|---|---|---|---|
| `display` | 40 / 44 | 700, -0.8 | Cadangan untuk judul hero besar |
| `h1` | 32 / 38 | 700 | Judul halaman tab (Jelajah, Favorit), angka besar laporan |
| `h2` | 24 / 30 | 700 | Judul listing di hero & detail |
| `h3` | 20 / 26 | 600 | Judul section, judul dialog |
| `title` | 17 / 24 | 600 | Judul kartu & baris, AppBar |
| `body` | 15 / 22 | 400 | Teks isi |
| `bodySm` | 13 / 18 | 400, white60 | Keterangan |
| `label` | 13 | 600 | Label input, tombol, tab |
| `eyebrow` | 12, +1 spasi huruf, KAPITAL | 600, white60 | Label kecil di atas judul ("PAKET TRIP · BALI") |
| `price` | 17 | 700, angka tabular | Harga & angka |

## Spasi & ukuran

- `AppSpace`: 4 · 8 · 12 · 16 · **20 (gutter tepi layar)** · 24 · 32 · 40 · 56
- `AppRadius.small` = 2px, `AppRadius.card` = 4px
- Tinggi tombol 52px, target sentuh minimal 48px

## Motion — `AppMotion`

- `fast` 150ms (seleksi chip/role), `base` 250ms (indikator carousel), `slow` 400ms (foto muncul,
  grafik tumbuh, carousel bergeser). Kurva `easeOutCubic`.
- Hero carousel bergeser tiap 5 detik. Skeleton loading berkedip pelan.
- Jika `MediaQuery.disableAnimations` aktif: carousel berhenti, skeleton diam, grafik langsung penuh.

## Komponen — `lib/widgets/`

| Komponen | File | Catatan |
|---|---|---|
| `AppButton` | `app_button.dart` | `primary` (oranye), `secondary` (garis), `ghost` (teks), `danger` (merah); `loading` mencegah klik ganda |
| `AppTextField`, `PasswordField`, `AppDropdown` | `app_text_field.dart` | Label di atas field; error diperbarui saat mengetik |
| `GlassPanel`, `PhotoShade`, `PhotoIconButton`, `NetImage` | `photo.dart` | Glass = blur 16 + teal 45% + garis white20. Selalu di atas foto + `PhotoShade` |
| `ListingCard`, `WishlistButton` | `listing_card.dart` | Kartu foto buyer; area ketuk punya label aksesibilitas |
| `ListingRow`, `BookingRow` | `listing_card.dart` | Baris datar bergaris untuk halaman data |
| `StatusBadge`, `Tag`, `SectionHeader`, `StatTile`, `StatGrid`, `InfoRow`, `RatingStars`, `RatingText`, `NoticeBox` | `common.dart` | |
| `AsyncBody`, `LoadingList`, `EmptyState`, `ErrorState` | `states.dart` | Setiap daftar wajib punya state memuat, kosong, dan gagal |
| `showToast`, `runWithToast`, `confirmDialog`, `textInputDialog` | `dialogs.dart` | Hapus selalu lewat `confirmDialog(danger: true)` |
| `ImagePickerField` | `image_picker_field.dart` | Cek JPG/PNG/WEBP & maks 2 MB sebelum upload |
| `RevenueBarChart` | `bar_chart.dart` | Grafik batang tanpa library |
| `DrawerShell` | `drawer_shell.dart` | Kerangka seller & admin |

## Pola halaman

- **Buyer**: bottom navigation 5 tab (Beranda, Jelajah, Favorit, Pesanan, Profil).
  Beranda = hero carousel foto + kotak cari + baris horizontal Paket Trip, Pemandu Lokal, Destinasi.
- **Detail listing**: foto 60% tinggi layar dengan panel glass berisi judul, lalu konten, dan bar
  harga + tombol yang menempel di bawah. Tombolnya berbeda per role.
- **Seller & admin**: drawer samping, AppBar berisi nama menu, konten berupa baris datar bergaris.
- Teks UI dalam Bahasa Indonesia, harga dalam format `Rp 8.500.000`, tanggal `3 Des 2026`.
