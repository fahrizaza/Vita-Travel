import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../models/booking.dart';
import '../../services/api_service.dart';
import '../../services/booking_service.dart';
import '../../theme/app_theme.dart';
import '../../utils/format.dart';
import '../../utils/validators.dart';
import '../../widgets/app_button.dart';
import '../../widgets/app_text_field.dart';
import '../../widgets/common.dart';
import '../../widgets/dialogs.dart';
import '../../widgets/image_picker_field.dart';

/// Buyer mengupload foto bukti transfer.
class PaymentScreen extends StatefulWidget {
  final Booking booking;

  const PaymentScreen({super.key, required this.booking});

  @override
  State<PaymentScreen> createState() => _PaymentScreenState();
}

class _PaymentScreenState extends State<PaymentScreen> {
  final _formKey = GlobalKey<FormState>();
  final _senderName = TextEditingController();
  final _senderBank = TextEditingController();
  PickedImage? _proof;
  String? _proofError;
  bool _loading = false;

  @override
  void dispose() {
    _senderName.dispose();
    _senderBank.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    final formValid = _formKey.currentState!.validate();
    setState(() => _proofError = _proof == null ? 'Foto bukti transfer wajib diupload' : null);
    if (!formValid || _proof == null) return;

    setState(() => _loading = true);
    final ok = await runWithToast(
      context,
      () => BookingService.uploadPayment(
        widget.booking.id,
        senderName: _senderName.text.trim(),
        senderBank: _senderBank.text.trim(),
        image: _proof!,
      ),
      successMessage: 'Bukti terkirim, menunggu verifikasi seller',
    );
    if (!mounted) return;
    setState(() => _loading = false);
    if (ok) Navigator.pop(context, true);
  }

  @override
  Widget build(BuildContext context) {
    final booking = widget.booking;

    return Scaffold(
      appBar: AppBar(title: const Text('Upload Bukti Transfer')),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(AppSpace.gutter),
          children: [
            NoticeBox(
              title: 'Transfer ke',
              icon: LucideIcons.landmark,
              message:
                  '${booking.bankName ?? '-'} ${booking.bankAccountNumber ?? ''}\n'
                  'a.n. ${booking.bankAccountName ?? booking.sellerName}',
            ),
            const SizedBox(height: AppSpace.lg),
            InfoRow('Total yang harus dibayar', rupiah(booking.totalPrice), emphasize: true),
            const SizedBox(height: AppSpace.xl),
            ImagePickerField(
              label: 'Foto bukti transfer',
              picked: _proof,
              errorText: _proofError,
              aspectRatio: 3 / 4,
              onPicked: (image) => setState(() {
                _proof = image;
                _proofError = null;
              }),
            ),
            const SizedBox(height: AppSpace.lg),
            AppTextField(
              label: 'Nama pengirim',
              controller: _senderName,
              icon: LucideIcons.user,
              hint: 'Sesuai nama di rekening',
              validator: Validators.minLength('Nama pengirim', 3),
            ),
            const SizedBox(height: AppSpace.lg),
            AppTextField(
              label: 'Bank pengirim',
              controller: _senderBank,
              icon: LucideIcons.landmark,
              hint: 'Misalnya BCA, BRI, Mandiri',
              validator: Validators.minLength('Bank pengirim', 2),
            ),
            const SizedBox(height: AppSpace.xl),
            AppButton(
              label: 'Kirim bukti transfer',
              onPressed: _submit,
              loading: _loading,
              expand: true,
            ),
          ],
        ),
      ),
    );
  }
}
