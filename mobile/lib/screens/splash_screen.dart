import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../widgets/app_button.dart';
import '../widgets/vita_logo.dart';
import 'auth/login_screen.dart';
import 'role_home.dart';

/// Halaman pertama: cek token tersimpan, lalu arahkan ke login atau halaman utama.
class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  String? _error;

  @override
  void initState() {
    super.initState();
    _start();
  }

  Future<void> _start() async {
    setState(() => _error = null);
    final auth = context.read<AuthProvider>();
    try {
      await auth.restoreSession();
    } on ApiException catch (error) {
      setState(() => _error = error.message);
      return;
    }
    if (!mounted) return;

    final user = auth.user;
    if (user == null) {
      Navigator.of(
        context,
      ).pushReplacement(MaterialPageRoute(builder: (context) => const LoginScreen()));
    } else {
      openHome(context, user);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(AppSpace.x3),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const VitaLogo(size: 88),
              const SizedBox(height: AppSpace.lg),
              Text('Vita Travel', style: AppText.h2),
              const SizedBox(height: AppSpace.xs),
              Text('Paket trip & pemandu lokal', style: AppText.bodySm),
              const SizedBox(height: AppSpace.x3),
              if (_error == null)
                const SizedBox(
                  width: 24,
                  height: 24,
                  child: CircularProgressIndicator(strokeWidth: 2),
                )
              else ...[
                Text(_error!, style: AppText.bodySm, textAlign: TextAlign.center),
                const SizedBox(height: AppSpace.lg),
                AppButton(label: 'Coba lagi', onPressed: _start, variant: ButtonVariant.secondary),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
