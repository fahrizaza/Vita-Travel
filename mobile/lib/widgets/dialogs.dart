import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../services/api_service.dart';
import '../theme/app_theme.dart';

/// Pesan singkat di bawah layar (hijau = berhasil, merah = gagal).
void showToast(BuildContext context, String message, {bool error = false}) {
  ScaffoldMessenger.of(context)
    ..hideCurrentSnackBar()
    ..showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(
              error ? LucideIcons.circleAlert : LucideIcons.circleCheck,
              size: 20,
              color: error ? AppColors.red : AppColors.green,
            ),
            const SizedBox(width: AppSpace.md),
            Expanded(child: Text(message, style: AppText.body)),
          ],
        ),
      ),
    );
}

/// Menjalankan aksi ke API lalu menampilkan toast berhasil / pesan error dari server.
/// Mengembalikan true jika berhasil.
Future<bool> runWithToast(
  BuildContext context,
  Future<void> Function() action, {
  String? successMessage,
}) async {
  try {
    await action();
    if (context.mounted && successMessage != null) showToast(context, successMessage);
    return true;
  } on ApiException catch (error) {
    if (context.mounted) showToast(context, error.message, error: true);
    return false;
  }
}

/// Dialog konfirmasi "Ya / Batal". Mengembalikan true jika user memilih ya.
Future<bool> confirmDialog(
  BuildContext context, {
  required String title,
  required String message,
  String confirmLabel = 'Ya',
  bool danger = false,
}) async {
  final result = await showDialog<bool>(
    context: context,
    builder: (context) => AlertDialog(
      title: Text(title),
      content: Text(message),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context, false),
          style: TextButton.styleFrom(foregroundColor: AppColors.white60),
          child: const Text('Batal'),
        ),
        FilledButton(
          onPressed: () => Navigator.pop(context, true),
          style: danger
              ? FilledButton.styleFrom(
                  backgroundColor: AppColors.red,
                  foregroundColor: AppColors.canvas,
                )
              : null,
          child: Text(confirmLabel),
        ),
      ],
    ),
  );
  return result ?? false;
}

/// Dialog berisi kolom teks (misalnya alasan penolakan). Mengembalikan null jika dibatalkan.
Future<String?> textInputDialog(
  BuildContext context, {
  required String title,
  required String label,
  String confirmLabel = 'Kirim',
  String initialValue = '',
  bool required = true,
  bool danger = false,
}) {
  final controller = TextEditingController(text: initialValue);
  final formKey = GlobalKey<FormState>();

  return showDialog<String>(
    context: context,
    builder: (context) => AlertDialog(
      title: Text(title),
      content: Form(
        key: formKey,
        child: TextFormField(
          controller: controller,
          autofocus: true,
          maxLines: 3,
          minLines: 1,
          style: AppText.body,
          decoration: InputDecoration(hintText: label),
          validator: (value) =>
              required && (value == null || value.trim().isEmpty) ? '$label wajib diisi' : null,
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          style: TextButton.styleFrom(foregroundColor: AppColors.white60),
          child: const Text('Batal'),
        ),
        FilledButton(
          onPressed: () {
            if (formKey.currentState!.validate()) Navigator.pop(context, controller.text.trim());
          },
          style: danger
              ? FilledButton.styleFrom(
                  backgroundColor: AppColors.red,
                  foregroundColor: AppColors.canvas,
                )
              : null,
          child: Text(confirmLabel),
        ),
      ],
    ),
  );
}
