import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:provider/provider.dart';

import '../../providers/auth_provider.dart';
import '../../providers/wishlist_provider.dart';
import '../../theme/app_theme.dart';
import '../../utils/format.dart';
import '../../utils/validators.dart';
import '../../widgets/app_button.dart';
import '../../widgets/app_text_field.dart';
import '../../widgets/dialogs.dart';
import '../auth/login_screen.dart';

/// Profil akun (semua role): edit data, ganti password, keluar.
class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  Future<void> _logout(BuildContext context) async {
    final yes = await confirmDialog(
      context,
      title: 'Keluar dari akun?',
      message: 'Anda perlu login lagi untuk membuka aplikasi.',
      confirmLabel: 'Keluar',
    );
    if (!yes || !context.mounted) return;
    context.read<WishlistProvider>().clear();
    await context.read<AuthProvider>().logout();
    if (!context.mounted) return;
    Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(builder: (context) => const LoginScreen()),
      (route) => false,
    );
  }

  @override
  Widget build(BuildContext context) {
    final user = context.watch<AuthProvider>().user!;
    final initials = user.name
        .trim()
        .split(' ')
        .take(2)
        .map((word) => word[0].toUpperCase())
        .join();

    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.all(AppSpace.gutter),
        children: [
          Row(
            children: [
              CircleAvatar(
                radius: 32,
                backgroundColor: AppColors.accent,
                child: Text(initials, style: AppText.h3.copyWith(color: AppColors.onAccent)),
              ),
              const SizedBox(width: AppSpace.lg),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(user.name, style: AppText.h3),
                    Text(user.email, style: AppText.bodySm),
                    const SizedBox(height: AppSpace.xs),
                    Text(
                      roleLabel(user.role).toUpperCase(),
                      style: AppText.eyebrow.copyWith(color: AppColors.accent),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpace.xxl),
          const Divider(),
          _MenuTile(
            icon: LucideIcons.userPen,
            label: 'Edit profil',
            onTap: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const EditProfileScreen()),
            ),
          ),
          _MenuTile(
            icon: LucideIcons.lock,
            label: 'Ganti password',
            onTap: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const ChangePasswordScreen()),
            ),
          ),
          _MenuTile(icon: LucideIcons.logOut, label: 'Keluar', onTap: () => _logout(context)),
        ],
      ),
    );
  }
}

class _MenuTile extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;

  const _MenuTile({required this.icon, required this.label, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ListTile(
          contentPadding: EdgeInsets.zero,
          leading: Icon(icon, size: 20),
          title: Text(label),
          trailing: const Icon(LucideIcons.chevronRight, size: 18),
          onTap: onTap,
        ),
        const Divider(),
      ],
    );
  }
}

class EditProfileScreen extends StatefulWidget {
  const EditProfileScreen({super.key});

  @override
  State<EditProfileScreen> createState() => _EditProfileScreenState();
}

class _EditProfileScreenState extends State<EditProfileScreen> {
  final _formKey = GlobalKey<FormState>();
  late final _name = TextEditingController(text: context.read<AuthProvider>().user!.name);
  late final _phone = TextEditingController(text: context.read<AuthProvider>().user!.phone ?? '');
  bool _loading = false;

  @override
  void dispose() {
    _name.dispose();
    _phone.dispose();
    super.dispose();
  }

  Future<void> _save() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _loading = true);
    final ok = await runWithToast(
      context,
      () => context.read<AuthProvider>().updateProfile(
        name: _name.text.trim(),
        phone: _phone.text.trim(),
      ),
      successMessage: 'Profil berhasil diperbarui',
    );
    if (!mounted) return;
    setState(() => _loading = false);
    if (ok) Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Edit Profil')),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(AppSpace.gutter),
          children: [
            AppTextField(
              label: 'Nama lengkap',
              controller: _name,
              icon: LucideIcons.user,
              validator: Validators.minLength('Nama', 3),
            ),
            const SizedBox(height: AppSpace.lg),
            AppTextField(
              label: 'Nomor HP',
              controller: _phone,
              icon: LucideIcons.phone,
              keyboardType: TextInputType.phone,
              validator: Validators.phone,
            ),
            const SizedBox(height: AppSpace.xl),
            AppButton(label: 'Simpan', onPressed: _save, loading: _loading, expand: true),
          ],
        ),
      ),
    );
  }
}

class ChangePasswordScreen extends StatefulWidget {
  const ChangePasswordScreen({super.key});

  @override
  State<ChangePasswordScreen> createState() => _ChangePasswordScreenState();
}

class _ChangePasswordScreenState extends State<ChangePasswordScreen> {
  final _formKey = GlobalKey<FormState>();
  final _oldPassword = TextEditingController();
  final _newPassword = TextEditingController();
  bool _loading = false;

  @override
  void dispose() {
    _oldPassword.dispose();
    _newPassword.dispose();
    super.dispose();
  }

  Future<void> _save() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _loading = true);
    final ok = await runWithToast(
      context,
      () => context.read<AuthProvider>().changePassword(_oldPassword.text, _newPassword.text),
      successMessage: 'Password berhasil diganti',
    );
    if (!mounted) return;
    setState(() => _loading = false);
    if (ok) Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Ganti Password')),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(AppSpace.gutter),
          children: [
            PasswordField(
              label: 'Password lama',
              controller: _oldPassword,
              validator: Validators.required('Password lama'),
            ),
            const SizedBox(height: AppSpace.lg),
            PasswordField(
              label: 'Password baru',
              controller: _newPassword,
              validator: Validators.password,
            ),
            const SizedBox(height: AppSpace.xs),
            Text('Minimal 8 karakter, berisi huruf dan angka.', style: AppText.bodySm),
            const SizedBox(height: AppSpace.xl),
            AppButton(label: 'Simpan password', onPressed: _save, loading: _loading, expand: true),
          ],
        ),
      ),
    );
  }
}
