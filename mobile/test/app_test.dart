import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:vita_travel/models/user.dart';
import 'package:vita_travel/providers/auth_provider.dart';
import 'package:vita_travel/providers/wishlist_provider.dart';
import 'package:vita_travel/screens/admin/admin_shell.dart';
import 'package:vita_travel/screens/auth/login_screen.dart';
import 'package:vita_travel/screens/buyer/buyer_shell.dart';
import 'package:vita_travel/screens/role_home.dart';
import 'package:vita_travel/screens/seller/seller_shell.dart';
import 'package:vita_travel/theme/app_theme.dart';
import 'package:vita_travel/utils/format.dart';
import 'package:vita_travel/utils/validators.dart';
import 'package:vita_travel/widgets/dialogs.dart';

User userWithRole(String role) {
  return User(
    id: 1,
    name: 'Rina Wulandari',
    email: 'rina@mail.com',
    phone: '081234567890',
    role: role,
    isActive: true,
    seller: null,
  );
}

/// Membungkus widget dengan provider & tema yang sama seperti di main.dart.
Widget testApp(Widget child) {
  return MultiProvider(
    providers: [
      ChangeNotifierProvider(create: (context) => AuthProvider()),
      ChangeNotifierProvider(create: (context) => WishlistProvider()),
    ],
    child: MaterialApp(theme: buildAppTheme(), home: child),
  );
}

void main() {
  setUpAll(() async {
    await initializeDateFormatting('id_ID');
    SharedPreferences.setMockInitialValues({});
  });

  group('Validators', () {
    test('email', () {
      expect(Validators.email(''), 'Email wajib diisi');
      expect(Validators.email('rina@'), 'Format email tidak valid');
      expect(Validators.email('rina@mail.com'), isNull);
    });

    test('password harus 8 karakter, berisi huruf dan angka', () {
      expect(Validators.password('abc'), 'Password minimal 8 karakter');
      expect(Validators.password('abcdefgh'), 'Password harus mengandung angka');
      expect(Validators.password('12345678'), 'Password harus mengandung huruf');
      expect(Validators.password('rahasia123'), isNull);
    });

    test('nomor HP Indonesia', () {
      expect(Validators.phone('12345'), isNotNull);
      expect(Validators.phone('081234567890'), isNull);
      expect(Validators.phone('+6281234567890'), isNull);
    });

    test('angka dengan batas', () {
      final quota = Validators.number('Kuota', max: 500);
      expect(quota('abc'), 'Kuota harus berupa angka');
      expect(quota('0'), 'Kuota minimal 1');
      expect(quota('501'), 'Kuota maksimal 500');
      expect(quota('12'), isNull);
    });
  });

  group('Format', () {
    test('Rupiah', () {
      expect(rupiah(8500000), 'Rp 8.500.000');
      expect(shortRupiah(8500000), '8,5 jt');
      expect(shortRupiah(12000000), '12 jt');
      expect(shortRupiah(550000), '550 rb');
    });

    test('tanggal Indonesia', () {
      expect(formatDate('2026-12-03'), '3 Des 2026');
      expect(toApiDate(DateTime(2026, 1, 5)), '2026-01-05');
      expect(monthLabel('2026-08'), 'Agu');
    });

    test('label status pesanan', () {
      expect(bookingStatus('pending_payment').label, 'Menunggu Pembayaran');
      expect(bookingStatus('cancelled').color, AppColors.red);
    });
  });

  test('setiap role diarahkan ke halaman utamanya sendiri', () {
    expect(homeFor(userWithRole('buyer')), isA<BuyerShell>());
    expect(homeFor(userWithRole('seller')), isA<SellerShell>());
    expect(homeFor(userWithRole('admin')), isA<AdminShell>());
  });

  testWidgets('login kosong menampilkan pesan validasi', (tester) async {
    // Ukuran layar ponsel (390 × 844)
    tester.view.physicalSize = const Size(1170, 2532);
    tester.view.devicePixelRatio = 3;
    addTearDown(tester.view.reset);

    await tester.pumpWidget(testApp(const LoginScreen()));
    final submitButton = find.text('Masuk').last; // yang pertama adalah judul form
    await tester.ensureVisible(submitButton);
    await tester.tap(submitButton);
    await tester.pump();

    expect(find.text('Email wajib diisi'), findsOneWidget);
    expect(find.text('Password wajib diisi'), findsOneWidget);
  });

  testWidgets('dialog konfirmasi hapus mengembalikan pilihan user', (tester) async {
    bool? result;
    await tester.pumpWidget(
      testApp(
        Builder(
          builder: (context) => TextButton(
            onPressed: () async {
              result = await confirmDialog(
                context,
                title: 'Hapus listing?',
                message: 'Data akan dihapus permanen.',
                confirmLabel: 'Hapus',
                danger: true,
              );
            },
            child: const Text('buka'),
          ),
        ),
      ),
    );

    await tester.tap(find.text('buka'));
    await tester.pumpAndSettle();
    expect(find.text('Hapus listing?'), findsOneWidget);

    await tester.tap(find.text('Batal'));
    await tester.pumpAndSettle();
    expect(result, isFalse);

    await tester.tap(find.text('buka'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Hapus'));
    await tester.pumpAndSettle();
    expect(result, isTrue);
  });
}
