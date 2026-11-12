import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:provider/provider.dart';

import '../../providers/auth_provider.dart';
import '../../services/api_service.dart';
import '../../theme/app_theme.dart';
import '../../utils/validators.dart';
import '../../widgets/app_button.dart';
import '../../widgets/app_text_field.dart';
import '../../widgets/dialogs.dart';
import '../../widgets/photo.dart';
import '../../widgets/vita_logo.dart';
import '../role_home.dart';
import 'register_screen.dart';

class LoginScreen extends StatefulWidget {
  /// Pesan tambahan, misalnya "Sesi login berakhir".
  final String? message;

  const LoginScreen({super.key, this.message});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _email = TextEditingController();
  final _password = TextEditingController();
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    if (widget.message != null) {
      WidgetsBinding.instance.addPostFrameCallback(
        (_) => showToast(context, widget.message!, error: true),
      );
    }
  }

  @override
  void dispose() {
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _loading = true);
    final auth = context.read<AuthProvider>();
    try {
      await auth.login(_email.text.trim(), _password.text);
      if (!mounted) return;
      showToast(context, 'Selamat datang, ${auth.user!.name}');
      openHome(context, auth.user!);
    } on ApiException catch (error) {
      if (mounted) showToast(context, error.message, error: true);
    }
    if (mounted) setState(() => _loading = false);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: [
          Image.asset('assets/images/login-bg.webp', fit: BoxFit.cover),
          // Lapisan teal agar teks putih tetap terbaca di bagian foto yang terang.
          ColoredBox(color: AppColors.canvas.withValues(alpha: 0.45)),
          const PhotoShade(),
          SafeArea(
            child: Center(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(AppSpace.gutter),
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 440),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const VitaWordmark(),
                      const SizedBox(height: AppSpace.x3),
                      Text('Jelajahi dunia\nbersama ahlinya.', style: AppText.h1),
                      const SizedBox(height: AppSpace.sm),
                      Text('Pesan paket trip dan pemandu lokal terpercaya.', style: AppText.body),
                      const SizedBox(height: AppSpace.xl),
                      GlassPanel(
                        padding: const EdgeInsets.all(AppSpace.xl),
                        child: Form(
                          key: _formKey,
                          child: AutofillGroup(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                Text('Masuk', style: AppText.h3),
                                const SizedBox(height: AppSpace.xl),
                                AppTextField(
                                  label: 'Email',
                                  controller: _email,
                                  hint: 'nama@email.com',
                                  icon: LucideIcons.mail,
                                  keyboardType: TextInputType.emailAddress,
                                  textInputAction: TextInputAction.next,
                                  autofillHints: const [AutofillHints.email],
                                  validator: Validators.email,
                                ),
                                const SizedBox(height: AppSpace.lg),
                                PasswordField(
                                  controller: _password,
                                  textInputAction: TextInputAction.done,
                                  validator: Validators.required('Password'),
                                ),
                                const SizedBox(height: AppSpace.xl),
                                AppButton(
                                  label: 'Masuk',
                                  onPressed: _submit,
                                  loading: _loading,
                                  expand: true,
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: AppSpace.lg),
                      Center(
                        child: TextButton(
                          onPressed: () => Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => const RegisterScreen()),
                          ),
                          child: Text.rich(
                            TextSpan(
                              text: 'Belum punya akun? ',
                              style: AppText.body.copyWith(color: AppColors.white60),
                              children: const [
                                TextSpan(
                                  text: 'Daftar',
                                  style: TextStyle(
                                    color: AppColors.accent,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
