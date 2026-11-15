# Vita Travel — aplikasi Flutter

Aplikasi mobile untuk buyer, seller, dan admin Vita Travel. Data diambil dari REST API di
[`../backend`](../backend).

```bash
flutter pub get
flutter run -d chrome                                          # browser
flutter run                                                    # emulator Android
flutter run --dart-define=API_URL=http://IP-LAPTOP:3001/api    # HP fisik
flutter test
```

- Cara setup lengkap & akun uji: [`../README.md`](../README.md)
- Struktur kode & alur: [`../docs/ALUR.md`](../docs/ALUR.md)
- Design system (warna, font, komponen): [`DESIGN.md`](DESIGN.md)
- Ikon app dibuat dari `assets/icon/` dengan `dart run flutter_launcher_icons`
