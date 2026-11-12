import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:provider/provider.dart';

import '../../providers/auth_provider.dart';
import '../../services/seller_service.dart';
import '../../theme/app_theme.dart';
import '../../utils/format.dart';
import '../../utils/validators.dart';
import '../../widgets/app_button.dart';
import '../../widgets/app_text_field.dart';
import '../../widgets/common.dart';
import '../../widgets/dialogs.dart';

/// Data usaha & rekening bank seller (rekening ditampilkan ke buyer saat membayar).
class BusinessProfileScreen extends StatefulWidget {
  const BusinessProfileScreen({super.key});

  @override
  State<BusinessProfileScreen> createState() => _BusinessProfileScreenState();
}

class _BusinessProfileScreenState extends State<BusinessProfileScreen> {
  final _formKey = GlobalKey<FormState>();
  late final _seller = context.read<AuthProvider>().user!.seller!;
  late final _businessName = TextEditingController(text: _seller.businessName);
  late final _city = TextEditingController(text: _seller.city);
  late final _description = TextEditingController(text: _seller.description);
  late final _bankName = TextEditingController(text: _seller.bankName);
  late final _accountNumber = TextEditingController(text: _seller.bankAccountNumber);
  late final _accountName = TextEditingController(text: _seller.bankAccountName);
  bool _saving = false;

  @override
  void dispose() {
    for (final controller in [
      _businessName,
      _city,
      _description,
      _bankName,
      _accountNumber,
      _accountName,
    ]) {
      controller.dispose();
    }
    super.dispose();
  }

  Future<void> _save() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _saving = true);
    final auth = context.read<AuthProvider>();
    await runWithToast(context, () async {
      await SellerService.updateProfile({
        'business_name': _businessName.text.trim(),
        'city': _city.text.trim(),
        'description': _description.text.trim(),
        'bank_name': _bankName.text.trim(),
        'bank_account_number': _accountNumber.text.trim(),
        'bank_account_name': _accountName.text.trim(),
      });
      await auth.refreshUser();
    }, successMessage: 'Profil usaha disimpan');
    if (mounted) setState(() => _saving = false);
  }

  @override
  Widget build(BuildContext context) {
    final status = context.watch<AuthProvider>().user!.seller!.verificationStatus;

    return Form(
      key: _formKey,
      child: ListView(
        padding: const EdgeInsets.all(AppSpace.gutter),
        children: [
          Row(
            children: [
              Text('Status verifikasi', style: AppText.bodySm),
              const Spacer(),
              StatusBadge(verificationStatus(status)),
            ],
          ),
          const SizedBox(height: AppSpace.xl),
          AppTextField(
            label: 'Nama usaha',
            controller: _businessName,
            icon: LucideIcons.store,
            validator: Validators.minLength('Nama usaha', 3),
          ),
          const SizedBox(height: AppSpace.lg),
          AppTextField(
            label: 'Kota',
            controller: _city,
            icon: LucideIcons.mapPin,
            validator: Validators.minLength('Kota', 2),
          ),
          const SizedBox(height: AppSpace.lg),
          AppTextField(label: 'Deskripsi usaha (opsional)', controller: _description, maxLines: 3),
          const SizedBox(height: AppSpace.xxl),
          Text('Rekening pembayaran', style: AppText.h3),
          const SizedBox(height: AppSpace.xs),
          Text('Ditampilkan ke buyer saat akan membayar pesanan.', style: AppText.bodySm),
          const SizedBox(height: AppSpace.lg),
          AppTextField(
            label: 'Nama bank',
            controller: _bankName,
            icon: LucideIcons.landmark,
            hint: 'Misalnya BCA',
            validator: Validators.required('Nama bank'),
          ),
          const SizedBox(height: AppSpace.lg),
          AppTextField(
            label: 'Nomor rekening',
            controller: _accountNumber,
            keyboardType: TextInputType.number,
            inputFormatters: [FilteringTextInputFormatter.digitsOnly],
            validator: (value) {
              final text = value?.trim() ?? '';
              if (text.length < 6 || text.length > 20) return 'Nomor rekening harus 6–20 digit';
              return null;
            },
          ),
          const SizedBox(height: AppSpace.lg),
          AppTextField(
            label: 'Nama pemilik rekening',
            controller: _accountName,
            validator: Validators.minLength('Nama pemilik rekening', 3),
          ),
          const SizedBox(height: AppSpace.xl),
          AppButton(
            label: status == 'rejected' ? 'Simpan & ajukan ulang' : 'Simpan',
            onPressed: _save,
            loading: _saving,
            expand: true,
          ),
        ],
      ),
    );
  }
}
