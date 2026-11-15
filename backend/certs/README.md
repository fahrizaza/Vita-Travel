# Sertifikat database

Folder ini menampung sertifikat CA milik Aiven, yaitu `aiven-ca.pem`.

## Cara mengunduhnya

1. Buka [Aiven Console](https://console.aiven.io), masuk ke layanan PostgreSQL proyek ini.
2. Pada bagian **Connection information**, cari baris **CA certificate**.
3. Klik **Show** untuk membaca isinya, atau ikon unduh di sebelahnya untuk menyimpan `ca.pem`.
4. Simpan sebagai `backend/certs/aiven-ca.pem` (nama berkasnya harus persis ini).

## Kenapa perlu

PostgreSQL Aiven memakai sertifikat yang ditandatangani CA milik Aiven sendiri, bukan CA
publik yang sudah dipercaya sistem operasi. Tanpa berkas ini, koneksi gagal dengan galat:

```text
Error: self-signed certificate in certificate chain
```

`backend/src/config.js` membaca berkas ini lalu meneruskannya ke driver `pg` sebagai
`ssl.ca`, sehingga sertifikat server dapat diverifikasi dengan benar.

## Apakah aman disimpan di repositori?

Aman. Sertifikat CA bersifat publik: fungsinya hanya untuk memverifikasi identitas server,
bukan untuk membuktikan identitas kita. Aiven sendiri menyediakan berkas ini secara terbuka
di halaman layanan, dan berkas ini juga dibutuhkan saat API disebarkan ke hosting.

Yang **tidak boleh** ikut ke repositori justru isi `.env` — di sanalah sandi database
disimpan. Berkas `.env` sudah dikecualikan oleh `.gitignore`.

## Kalau CA tidak tersedia

Alternatifnya adalah mematikan verifikasi sertifikat, dengan mengubah `DATABASE_SSL` pada
`backend/src/config.js` menjadi:

```js
export const DATABASE_SSL = { rejectUnauthorized: false };
```

Koneksi tetap terenkripsi, hanya identitas server yang tidak diperiksa. Ini cukup untuk
keperluan pengembangan, tetapi hindari bila CA-nya memang bisa didapat.
