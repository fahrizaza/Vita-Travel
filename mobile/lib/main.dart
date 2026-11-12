import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:provider/provider.dart';

import 'providers/auth_provider.dart';
import 'providers/wishlist_provider.dart';
import 'screens/auth/login_screen.dart';
import 'screens/splash_screen.dart';
import 'services/api_service.dart';
import 'theme/app_theme.dart';

/// Dipakai untuk pindah ke halaman login dari luar widget (saat sesi habis).
final navigatorKey = GlobalKey<NavigatorState>();

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initializeDateFormatting('id_ID'); // nama hari & bulan dalam Bahasa Indonesia

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => AuthProvider()),
        ChangeNotifierProvider(create: (context) => WishlistProvider()),
      ],
      child: const VitaTravelApp(),
    ),
  );
}

class VitaTravelApp extends StatefulWidget {
  const VitaTravelApp({super.key});

  @override
  State<VitaTravelApp> createState() => _VitaTravelAppState();
}

class _VitaTravelAppState extends State<VitaTravelApp> {
  @override
  void initState() {
    super.initState();
    ApiService.onUnauthorized = _onSessionExpired;
  }

  /// Token ditolak server (401): hapus sesi lalu kembali ke halaman login.
  Future<void> _onSessionExpired() async {
    final auth = context.read<AuthProvider>();
    if (auth.user == null) return;
    context.read<WishlistProvider>().clear();
    await auth.logout();
    navigatorKey.currentState?.pushAndRemoveUntil(
      MaterialPageRoute(
        builder: (context) => const LoginScreen(message: 'Sesi login berakhir, silakan login lagi'),
      ),
      (route) => false,
    );
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Vita Travel',
      debugShowCheckedModeBanner: false,
      navigatorKey: navigatorKey,
      theme: buildAppTheme(),
      locale: const Locale('id', 'ID'),
      supportedLocales: const [Locale('id', 'ID'), Locale('en')],
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      home: const SplashScreen(),
    );
  }
}
