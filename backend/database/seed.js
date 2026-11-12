// Data contoh untuk demo: akun uji setiap role, kategori, destinasi, listing, dan pesanan.
// Tanggal dihitung relatif dari hari ini, jadi demo selalu punya trip yang belum berangkat.
import fs from "node:fs";
import path from "node:path";
import bcrypt from "bcryptjs";
import pool from "../src/db.js";
import { UPLOAD_DIR } from "../src/config.js";

const IMAGES_DIR = path.join(import.meta.dirname, "seed-images");
export const TEST_PASSWORD = "Password123";

/** Salin foto contoh ke folder uploads, kembalikan path yang disimpan di database. */
function copyImage(fileName, folder) {
  fs.mkdirSync(path.join(UPLOAD_DIR, folder), { recursive: true });
  fs.copyFileSync(path.join(IMAGES_DIR, fileName), path.join(UPLOAD_DIR, folder, fileName));
  return `${folder}/${fileName}`;
}

/** "YYYY-MM-DD" untuk n hari dari sekarang (negatif = masa lalu). */
function dateFromToday(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString("sv-SE");
}

function daysAgo(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

async function insert(sql, params) {
  const result = await pool.query(sql, params);
  return result.rows[0]?.id;
}

export async function seed() {
  const passwordHash = await bcrypt.hash(TEST_PASSWORD, 10);

  // ---------- Users ----------
  const addUser = (name, email, phone, role) =>
    insert(
      `INSERT INTO users (name, email, phone, password_hash, role) VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [name, email, phone, passwordHash, role],
    );

  await addUser("Admin Vita", "admin@vitatravel.id", "081100000001", "admin");
  const seller1 = await addUser("Made Arsana", "seller@vitatravel.id", "081200000001", "seller");
  const seller2 = await addUser("Dimas Kelana", "seller2@vitatravel.id", "081200000002", "seller");
  const sellerPending = await addUser(
    "Lalu Hamzah",
    "seller.pending@vitatravel.id",
    "081200000003",
    "seller",
  );
  const buyer1 = await addUser("Rina Wulandari", "buyer@vitatravel.id", "081300000001", "buyer");
  const buyer2 = await addUser("Andi Pratama", "buyer2@vitatravel.id", "081300000002", "buyer");

  const addSeller = (userId, business, city, description, bank, account, status) =>
    pool.query(
      `INSERT INTO seller_profiles (user_id, business_name, city, description, bank_name,
         bank_account_number, bank_account_name, verification_status)
       VALUES ($1, $2, $3, $4, $5, $6, $2, $7)`,
      [userId, business, city, description, bank, account, status],
    );
  await addSeller(
    seller1,
    "Nusa Retreat",
    "Ubud, Bali",
    "Penyelenggara retreat dan pemandu budaya lokal di Bali sejak 2018.",
    "BNI",
    "0123456789",
    "approved",
  );
  await addSeller(
    seller2,
    "Kelana Explorer",
    "Jakarta",
    "Open trip dan retreat mancanegara untuk traveler Indonesia.",
    "BCA",
    "8800112233",
    "approved",
  );
  await addSeller(
    sellerPending,
    "Lombok Trip Sejahtera",
    "Mataram",
    "Paket island hopping Gili dan pendakian Rinjani.",
    "Mandiri",
    "1400099887766",
    "pending",
  );

  // ---------- Kategori & destinasi ----------
  const category = {};
  for (const name of ["Retreat & Wellness", "Petualangan Alam", "Budaya & Sejarah", "Fotografi"]) {
    category[name] = await insert("INSERT INTO categories (name) VALUES ($1) RETURNING id", [name]);
  }

  const destination = {};
  const destinations = [
    ["Bali", "Indonesia", "bali-photo-1.webp"],
    ["Toscana", "Italia", "destination-1.webp"],
    ["Marrakesh", "Maroko", "morocco-photo-photo-1.webp"],
    ["Algarve", "Portugal", "featured-5.webp"],
    ["Bukovina", "Rumania", "featured-1.webp"],
  ];
  for (const [name, region, image] of destinations) {
    destination[name] = await insert(
      "INSERT INTO destinations (name, region, image_path) VALUES ($1, $2, $3) RETURNING id",
      [name, region, copyImage(image, "destinations")],
    );
  }

  // ---------- Listing ----------
  const addTrip = (
    sellerId,
    cat,
    dest,
    title,
    description,
    price,
    quota,
    startIn,
    days,
    includes,
    image,
  ) =>
    insert(
      `INSERT INTO listings (seller_id, category_id, destination_id, type, title, description, price,
         quota, start_date, duration_days, includes, image_path)
       VALUES ($1, $2, $3, 'trip', $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
      [
        sellerId,
        category[cat],
        destination[dest],
        title,
        description,
        price,
        quota,
        dateFromToday(startIn),
        days,
        includes,
        copyImage(image, "listings"),
      ],
    );
  const addGuide = (
    sellerId,
    cat,
    dest,
    title,
    description,
    price,
    groupSize,
    languages,
    includes,
    image,
  ) =>
    insert(
      `INSERT INTO listings (seller_id, category_id, destination_id, type, title, description, price,
         quota, languages, includes, image_path)
       VALUES ($1, $2, $3, 'guide', $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
      [
        sellerId,
        category[cat],
        destination[dest],
        title,
        description,
        price,
        groupSize,
        languages,
        includes,
        copyImage(image, "listings"),
      ],
    );

  const ubudRetreat = await addTrip(
    seller1,
    "Retreat & Wellness",
    "Bali",
    "Solo Traveler Retreat 7 Hari di Ubud",
    "Retreat santai untuk solo traveler: yoga pagi, workshop journaling, susur sawah Tegallalang, dan makan malam bersama peserta lain di villa tengah hutan Ubud.",
    8500000,
    12,
    21,
    7,
    "Villa 6 malam\nMakan 3x sehari\nYoga & meditasi harian\nAntar-jemput bandara",
    "featured-6.webp",
  );
  const pastBaliRetreat = await addTrip(
    seller1,
    "Retreat & Wellness",
    "Bali",
    "Healing Retreat 5 Hari di Sidemen",
    "Retreat penyembuhan di lembah Sidemen dengan sound healing, pijat tradisional Bali, dan kelas memasak organik.",
    6200000,
    10,
    -60,
    5,
    "Penginapan 4 malam\nMakan 3x sehari\nSound healing",
    "bali-photo-4.webp",
  );
  await addTrip(
    seller2,
    "Retreat & Wellness",
    "Toscana",
    "Yoga & Outdoor Retreat di Toscana",
    "Delapan hari yoga di agriturismo Grosseto, bersepeda di antara kebun anggur, dan berendam di pemandian air panas Saturnia.",
    32000000,
    10,
    45,
    8,
    "Agriturismo 7 malam\nSarapan & makan malam\nSewa sepeda\nTiket Saturnia",
    "featured-2.webp",
  );
  await addTrip(
    seller2,
    "Fotografi",
    "Marrakesh",
    "Photography Tour Maroko 9 Hari",
    "Belajar street dan landscape photography bersama fotografer profesional, dari medina Marrakesh hingga pegunungan Atlas.",
    27500000,
    8,
    60,
    9,
    "Riad 8 malam\nMentor fotografi\nTransportasi selama tur",
    "featured-3.webp",
  );
  const desertTrip = await addTrip(
    seller2,
    "Petualangan Alam",
    "Marrakesh",
    "Desert Moon: Bermalam di Gurun Sahara",
    "Perjalanan darat dari Marrakesh ke gurun Merzouga, menunggang unta saat matahari terbenam, dan menginap di tenda Berber di bawah bulan purnama.",
    24000000,
    12,
    35,
    6,
    "Hotel & tenda gurun\nMakan malam Berber\nUnta & jeep 4x4",
    "featured-4.webp",
  );
  await addTrip(
    seller1,
    "Retreat & Wellness",
    "Algarve",
    "Juice Detox 8 Hari di Algarve",
    "Program detoks jus dingin, yoga tepi tebing, dan kayak menyusuri gua laut Benagil di pesisir selatan Portugal.",
    29000000,
    10,
    75,
    8,
    "Villa 7 malam\nProgram jus harian\nKayak Benagil",
    "featured-5.webp",
  );
  await addTrip(
    seller1,
    "Petualangan Alam",
    "Bukovina",
    "Mystic Mountain Retreat di Bukovina",
    "Mendaki pegunungan Carpathia, mengunjungi biara lukis UNESCO, dan bermalam di pondok kayu desa tradisional Rumania.",
    21000000,
    14,
    90,
    7,
    "Pondok kayu 6 malam\nPemandu gunung\nTiket biara",
    "featured-1.webp",
  );

  const ubudGuide = await addGuide(
    seller1,
    "Budaya & Sejarah",
    "Bali",
    "Pemandu Budaya & Pura di Ubud",
    "Ditemani pemandu lokal mengunjungi Pura Tirta Empul, Goa Gajah, dan pasar seni Ubud, lengkap dengan cerita sejarah dan adat Bali.",
    650000,
    6,
    "Indonesia, Inggris",
    "Kain & selendang pura\nAir mineral",
    "bali-photo-2.webp",
  );
  const baturGuide = await addGuide(
    seller1,
    "Petualangan Alam",
    "Bali",
    "Pemandu Sunrise Trekking Gunung Batur",
    "Mendaki Gunung Batur mulai pukul 03.00 untuk menikmati matahari terbit di atas Danau Batur, sarapan dimasak dengan uap vulkanik.",
    550000,
    8,
    "Indonesia, Inggris",
    "Senter kepala\nSarapan di puncak",
    "bali-photo-3.webp",
  );
  const tuscanyGuide = await addGuide(
    seller2,
    "Retreat & Wellness",
    "Toscana",
    "Elena — Pemandu Wellness Toscana",
    "Elena memandu jalan kaki meditatif di Val d'Orcia, kelas yoga privat, dan kunjungan ke pemandian air panas alami.",
    2400000,
    4,
    "Inggris, Italia",
    "Matras yoga\nTiket pemandian",
    "retreat-photo-2.webp",
  );
  const marrakeshGuide = await addGuide(
    seller2,
    "Fotografi",
    "Marrakesh",
    "Pemandu Fotografi Medina Marrakesh",
    "Berburu foto di lorong medina, penyamak kulit Chouara, dan Jemaa el-Fnaa saat senja bersama pemandu yang paham sudut-sudut terbaik.",
    1900000,
    5,
    "Inggris, Prancis, Arab",
    "Izin foto di area tertentu",
    "morocco-photo-photo-2.webp",
  );
  await addGuide(
    seller1,
    "Petualangan Alam",
    "Bukovina",
    "David — Pemandu Hiking Pegunungan Carpathia",
    "David memandu rute hiking harian di Rarău dan Giumalău, lengkap dengan bekal piknik dan cerita legenda setempat.",
    1700000,
    6,
    "Inggris, Jerman",
    "Bekal piknik\nTongkat hiking",
    "coach-6.webp",
  );

  // ---------- Pesanan contoh (untuk dashboard & laporan) ----------
  const addBooking = (
    buyerId,
    listingId,
    serviceIn,
    days,
    participants,
    total,
    status,
    createdDaysAgo,
  ) =>
    insert(
      `INSERT INTO bookings (buyer_id, listing_id, service_date, days, participants, total_price,
         status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      [
        buyerId,
        listingId,
        dateFromToday(serviceIn),
        days,
        participants,
        total,
        status,
        daysAgo(createdDaysAgo),
      ],
    );
  const addReview = (bookingId, rating, comment) =>
    pool.query("INSERT INTO reviews (booking_id, rating, comment) VALUES ($1, $2, $3)", [
      bookingId,
      rating,
      comment,
    ]);

  // Sudah selesai
  const b1 = await addBooking(buyer1, pastBaliRetreat, -60, 5, 2, 12400000, "completed", 140);
  await addReview(
    b1,
    5,
    "Retreat yang benar-benar menenangkan. Makanannya enak dan pemandunya sabar.",
  );
  const b2 = await addBooking(buyer2, pastBaliRetreat, -60, 5, 1, 6200000, "completed", 110);
  await addReview(b2, 4, "Tempatnya indah, hanya jalan menuju villa agak sempit.");
  const b3 = await addBooking(buyer1, ubudGuide, -40, 2, 2, 1300000, "completed", 75);
  await addReview(b3, 5, "Pemandunya ramah dan paham sejarah tiap pura. Sangat direkomendasikan!");
  const b4 = await addBooking(buyer2, baturGuide, -20, 1, 3, 550000, "completed", 30);
  await addReview(b4, 4, "Sunrise-nya luar biasa, start-nya memang harus pagi sekali.");
  // Selesai tapi belum diulas → buyer@vitatravel.id bisa demo memberi ulasan
  await addBooking(buyer1, tuscanyGuide, -10, 2, 2, 4800000, "completed", 50);

  // Masih berjalan
  await addBooking(buyer1, ubudRetreat, 21, 7, 2, 17000000, "confirmed", 12);
  await addBooking(buyer1, marrakeshGuide, 50, 1, 2, 1900000, "confirmed", 8);
  const waiting = await addBooking(
    buyer2,
    ubudRetreat,
    21,
    7,
    1,
    8500000,
    "waiting_verification",
    2,
  );
  await pool.query(
    "UPDATE bookings SET proof_path = $1, sender_name = 'Andi Pratama', sender_bank = 'BCA' WHERE id = $2",
    [copyImage("bukti-transfer-contoh.png", "payments"), waiting],
  );
  await addBooking(buyer1, desertTrip, 35, 6, 2, 48000000, "pending_payment", 1);
  const cancelled = await addBooking(buyer2, desertTrip, 35, 6, 1, 24000000, "cancelled", 20);
  await pool.query("UPDATE bookings SET status_note = 'Jadwal cuti berubah' WHERE id = $1", [
    cancelled,
  ]);

  // Wishlist
  await pool.query("INSERT INTO wishlists (buyer_id, listing_id) VALUES ($1, $2), ($1, $3)", [
    buyer1,
    desertTrip,
    tuscanyGuide,
  ]);
}
