// Aturan validasi input untuk setiap endpoint, memakai library zod.
// Dipakai lewat middleware validate(schema) di file routes.
import { z } from "zod";

z.config(z.locales.id()); // pesan default zod dalam Bahasa Indonesia

// ---------- Aturan dasar yang dipakai berulang ----------

// Form-data (upload) mengirim field kosong sebagai "", anggap saja tidak diisi.
const emptyToUndefined = (value) => (value === "" || value === null ? undefined : value);

const requiredText = (label, min, max) =>
  z
    .string(`${label} wajib diisi`)
    .trim()
    .min(min, `${label} minimal ${min} karakter`)
    .max(max, `${label} maksimal ${max} karakter`);

const optionalText = (label, max) =>
  z
    .string()
    .trim()
    .max(max, `${label} maksimal ${max} karakter`)
    .nullish()
    .transform((value) => value || null);

const requiredId = (label) =>
  z.coerce.number(`${label} wajib dipilih`).int().positive(`${label} wajib dipilih`);

const dateText = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal harus YYYY-MM-DD");
const optionalDate = z.preprocess(emptyToUndefined, dateText.optional());

const email = z
  .string("Email wajib diisi")
  .trim()
  .toLowerCase()
  .pipe(z.email("Format email tidak valid"));

const password = z
  .string("Password wajib diisi")
  .min(8, "Password minimal 8 karakter")
  .regex(/[A-Za-z]/, "Password harus mengandung huruf")
  .regex(/[0-9]/, "Password harus mengandung angka");

const phone = z
  .string("Nomor HP wajib diisi")
  .trim()
  .regex(/^(\+62|62|0)8\d{7,12}$/, "Nomor HP tidak valid, contoh: 081234567890");

// ---------- Auth & profil ----------

export const registerSchema = z
  .object({
    name: requiredText("Nama", 3, 100),
    email,
    phone,
    password,
    role: z.enum(["buyer", "seller"], "Pilih daftar sebagai buyer atau seller"),
    business_name: optionalText("Nama usaha", 120),
    city: optionalText("Kota", 80),
  })
  .refine((data) => data.role !== "seller" || data.business_name, {
    path: ["business_name"],
    message: "Nama usaha wajib diisi untuk seller",
  })
  .refine((data) => data.role !== "seller" || data.city, {
    path: ["city"],
    message: "Kota wajib diisi untuk seller",
  });

export const loginSchema = z.object({
  email,
  password: z.string("Password wajib diisi").min(1, "Password wajib diisi"),
});

export const profileSchema = z.object({
  name: requiredText("Nama", 3, 100),
  phone,
});

export const passwordSchema = z.object({
  old_password: z.string("Password lama wajib diisi").min(1, "Password lama wajib diisi"),
  new_password: password,
});

export const sellerProfileSchema = z.object({
  business_name: requiredText("Nama usaha", 3, 120),
  city: requiredText("Kota", 2, 80),
  description: optionalText("Deskripsi", 1000),
  bank_name: optionalText("Nama bank", 60),
  bank_account_number: z
    .preprocess(
      emptyToUndefined,
      z
        .string()
        .trim()
        .regex(/^\d{6,20}$/, "Nomor rekening harus 6–20 digit angka")
        .optional(),
    )
    .transform((value) => value ?? null),
  bank_account_name: optionalText("Nama pemilik rekening", 100),
});

// ---------- Data master (admin) ----------

export const categorySchema = z.object({
  name: requiredText("Nama kategori", 3, 60),
});

export const destinationSchema = z.object({
  name: requiredText("Nama destinasi", 2, 80),
  region: requiredText("Wilayah", 2, 80),
});

// ---------- Listing (seller) ----------

export const listingSchema = z
  .object({
    type: z.enum(["trip", "guide"], "Jenis listing harus trip atau guide"),
    title: requiredText("Judul", 5, 120),
    description: requiredText("Deskripsi", 20, 3000),
    price: z.coerce
      .number("Harga wajib diisi")
      .positive("Harga harus lebih dari 0")
      .max(1_000_000_000, "Harga terlalu besar"),
    quota: z.coerce
      .number("Kuota wajib diisi")
      .int("Kuota harus bilangan bulat")
      .min(1, "Kuota minimal 1")
      .max(500, "Kuota maksimal 500"),
    category_id: requiredId("Kategori"),
    destination_id: requiredId("Destinasi"),
    start_date: optionalDate,
    duration_days: z.preprocess(
      emptyToUndefined,
      z.coerce.number().int().min(1, "Durasi minimal 1 hari").max(60).optional(),
    ),
    languages: optionalText("Bahasa", 120),
    includes: optionalText("Fasilitas", 2000),
    status: z.preprocess(emptyToUndefined, z.enum(["active", "inactive"]).optional()),
  })
  .refine((data) => data.type === "guide" || data.start_date, {
    path: ["start_date"],
    message: "Tanggal berangkat wajib diisi untuk paket trip",
  })
  .refine((data) => data.type === "guide" || data.duration_days, {
    path: ["duration_days"],
    message: "Durasi wajib diisi untuk paket trip",
  })
  .refine((data) => data.type === "trip" || data.languages, {
    path: ["languages"],
    message: "Bahasa yang dikuasai wajib diisi untuk jasa pemandu",
  });

// ---------- Pesanan (buyer & seller) ----------

export const bookingSchema = z.object({
  listing_id: requiredId("Listing"),
  participants: z.coerce
    .number("Jumlah peserta wajib diisi")
    .int()
    .min(1, "Minimal 1 peserta")
    .max(100, "Maksimal 100 peserta"),
  service_date: optionalDate, // wajib untuk jasa pemandu, dicek di controller
  days: z.preprocess(
    emptyToUndefined,
    z.coerce.number().int().min(1, "Minimal 1 hari").max(30, "Maksimal 30 hari").optional(),
  ),
  note: optionalText("Catatan", 500),
});

export const paymentSchema = z.object({
  sender_name: requiredText("Nama pengirim", 3, 100),
  sender_bank: requiredText("Bank pengirim", 2, 60),
});

export const verifyPaymentSchema = z
  .object({
    approve: z.boolean("Pilih setujui atau tolak"),
    note: optionalText("Catatan", 500),
  })
  .refine((data) => data.approve || data.note, {
    path: ["note"],
    message: "Alasan penolakan wajib diisi",
  });

export const cancelSchema = z.object({
  reason: optionalText("Alasan", 500),
});

export const reviewSchema = z.object({
  rating: z.coerce
    .number("Rating wajib diisi")
    .int()
    .min(1, "Rating antara 1 sampai 5")
    .max(5, "Rating antara 1 sampai 5"),
  comment: optionalText("Ulasan", 1000),
});

// ---------- Admin ----------

export const userStatusSchema = z.object({
  is_active: z.boolean("Status aktif wajib diisi (true/false)"),
});

export const sellerVerificationSchema = z
  .object({
    status: z.enum(["approved", "rejected"], "Status harus approved atau rejected"),
    reason: optionalText("Alasan", 500),
  })
  .refine((data) => data.status === "approved" || data.reason, {
    path: ["reason"],
    message: "Alasan penolakan wajib diisi",
  });

export const moderationSchema = z
  .object({
    action: z.enum(["suspend", "restore"], "Aksi harus suspend atau restore"),
    note: optionalText("Catatan", 500),
  })
  .refine((data) => data.action === "restore" || data.note, {
    path: ["note"],
    message: "Alasan penangguhan wajib diisi",
  });
