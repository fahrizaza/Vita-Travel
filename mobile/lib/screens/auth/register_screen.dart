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
import '../role_home.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _name = TextEditingController();
  final _email = TextEditingController();
  final _phone = TextEditingController();
  final _password = TextEditingController();
  final _confirmPassword = TextEditingController();
  final _businessName = TextEditingController();
  final _city = TextEditingController();
  String _role = 'buyer';
  bool _loading = false;

  @override
  void dispose() {
    for (final controller in [
      _name,
      _email,
      _phone,
      _password,
      _confirmPassword,
      _businessName,
      _city,
    ]) {
      controller.dispose();
    }
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _loading = true);
    final auth = context.read<AuthProvider>();
    try {
      await auth.register({
        'name': _name.text.trim(),
        'email': _email.text.trim(),
        'phone': _phone.text.trim(),
        'password': _password.text,
        'role': _role,
        if (_role == 'seller') 'business_name': _businessName.text.trim(),
        if (_role == 'seller') 'city': _city.text.trim(),
      });
      if (!mounted) return;
      showToast(
        context,
        _role == 'seller' ? 'Akun dibuat, menunggu verifikasi admin' : 'Akun berhasil dibuat',
      );
      openHome(context, auth.user!);
    } on ApiException catch (error) {
      if (mounted) showToast(context, error.message, error: true);
    }
    if (mounted) setState(() => _loading = false);
  }

  @override
  Widget build(BuildContext context) {
    final isSeller = _role == 'seller';

    return Scaffold(
      appBar: AppBar(title: const Text('Daftar Akun')),
      body: SafeArea(
        child: Form(
          key: _formKey,
          child: ListView(
            padding: const EdgeInsets.all(AppSpace.gutter),
            children: [
              Text('Saya ingin…', style: AppText.label.copyWith(color: AppColors.white60)),
              const SizedBox(height: AppSpace.sm),
              Row(
                children: [
                  Expanded(
                    child: _RoleOption(
                      icon: LucideIcons.compass,
                      title: 'Berwisata',
                      subtitle: 'Pesan trip & pemandu',
                      selected: !isSeller,
                      onTap: () => setState(() => _role = 'buyer'),
                    ),
                  ),
                  const SizedBox(width: AppSpace.md),
                  Expanded(
                    child: _RoleOption(
                      icon: LucideIcons.store,
                      title: 'Menjual jasa',
                      subtitle: 'Saya penyedia travel',
                      selected: isSeller,
                      onTap: () => setState(() => _role = 'seller'),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: AppSpace.xl),
              AppTextField(
                label: 'Nama lengkap',
                controller: _name,
                icon: LucideIcons.user,
                textInputAction: TextInputAction.next,
                validator: Validators.minLength('Nama', 3),
              ),
              const SizedBox(height: AppSpace.lg),
              AppTextField(
                label: 'Email',
                controller: _email,
                icon: LucideIcons.mail,
                hint: 'nama@email.com',
                keyboardType: TextInputType.emailAddress,
                textInputAction: TextInputAction.next,
                validator: Validators.email,
              ),
              const SizedBox(height: AppSpace.lg),
              AppTextField(
                label: 'Nomor HP',
                controller: _phone,
                icon: LucideIcons.phone,
                hint: '081234567890',
                keyboardType: TextInputType.phone,
                textInputAction: TextInputAction.next,
                validator: Validators.phone,
              ),
              if (isSeller) ...[
                const SizedBox(height: AppSpace.lg),
                AppTextField(
                  label: 'Nama usaha',
                  controller: _businessName,
                  icon: LucideIcons.store,
                  textInputAction: TextInputAction.next,
                  validator: Validators.minLength('Nama usaha', 3),
                ),
                const SizedBox(height: AppSpace.lg),
                AppTextField(
                  label: 'Kota',
                  controller: _city,
                  icon: LucideIcons.mapPin,
                  textInputAction: TextInputAction.next,
                  validator: Validators.minLength('Kota', 2),
                ),
              ],
              const SizedBox(height: AppSpace.lg),
              PasswordField(
                controller: _password,
                textInputAction: TextInputAction.next,
                validator: Validators.password,
              ),
              const SizedBox(height: AppSpace.xs),
              Text('Minimal 8 karakter, berisi huruf dan angka.', style: AppText.bodySm),
              const SizedBox(height: AppSpace.lg),
              PasswordField(
                label: 'Ulangi password',
                controller: _confirmPassword,
                textInputAction: TextInputAction.done,
                validator: (value) => value != _password.text ? 'Password tidak sama' : null,
              ),
              if (isSeller) ...[const SizedBox(height: AppSpace.xl), const _SellerNote()],
              const SizedBox(height: AppSpace.xl),
              AppButton(label: 'Daftar', onPressed: _submit, loading: _loading, expand: true),
            ],
          ),
        ),
      ),
    );
  }
}

class _RoleOption extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final bool selected;
  final VoidCallback onTap;

  const _RoleOption({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Semantics(
      selected: selected,
      button: true,
      child: InkWell(
        onTap: onTap,
        borderRadius: AppRadius.card,
        child: AnimatedContainer(
          duration: AppMotion.fast,
          padding: const EdgeInsets.all(AppSpace.lg),
          decoration: BoxDecoration(
            color: selected ? AppColors.accent.withValues(alpha: 0.1) : null,
            border: Border.all(color: selected ? AppColors.accent : AppColors.white20),
            borderRadius: AppRadius.card,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Icon(icon, color: selected ? AppColors.accent : AppColors.white60),
              const SizedBox(height: AppSpace.md),
              Text(title, style: AppText.title),
              Text(subtitle, style: AppText.bodySm),
            ],
          ),
        ),
      ),
    );
  }
}

class _SellerNote extends StatelessWidget {
  const _SellerNote();

  @override
  Widget build(BuildContext context) {
    return Text(
      'Akun seller akan diperiksa admin terlebih dahulu. Setelah disetujui, Anda bisa mulai '
      'menambahkan paket trip atau jasa pemandu.',
      style: AppText.bodySm,
    );
  }
}
