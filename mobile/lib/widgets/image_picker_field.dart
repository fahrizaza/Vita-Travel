import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../services/api_service.dart';
import '../theme/app_theme.dart';
import 'dialogs.dart';
import 'photo.dart';

const _maxImageBytes = 2 * 1024 * 1024; // 2 MB, sama dengan batas di backend
const _allowedTypes = {
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'webp': 'image/webp',
};

/// Kotak pilih foto + pratinjau. Foto dicek tipe (JPG/PNG/WEBP) dan ukurannya (maks 2 MB).
class ImagePickerField extends StatelessWidget {
  final String label;
  final PickedImage? picked;
  final String? currentUrl; // foto lama saat mode edit
  final ValueChanged<PickedImage> onPicked;
  final String? errorText;
  final double aspectRatio;

  const ImagePickerField({
    super.key,
    required this.label,
    required this.picked,
    required this.onPicked,
    this.currentUrl,
    this.errorText,
    this.aspectRatio = 16 / 10,
  });

  Future<void> _choose(BuildContext context) async {
    ImageSource source = ImageSource.gallery;
    // Di HP, tawarkan pilihan kamera atau galeri.
    if (!kIsWeb) {
      final chosen = await showModalBottomSheet<ImageSource>(
        context: context,
        builder: (context) => SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                leading: const Icon(LucideIcons.image),
                title: const Text('Pilih dari galeri'),
                onTap: () => Navigator.pop(context, ImageSource.gallery),
              ),
              ListTile(
                leading: const Icon(LucideIcons.camera),
                title: const Text('Ambil foto'),
                onTap: () => Navigator.pop(context, ImageSource.camera),
              ),
            ],
          ),
        ),
      );
      if (chosen == null) return;
      source = chosen;
    }

    final file = await ImagePicker().pickImage(source: source, maxWidth: 1600, imageQuality: 85);
    if (file == null) return;

    final extension = file.name.split('.').last.toLowerCase();
    final mimeType = file.mimeType ?? _allowedTypes[extension];
    if (mimeType == null || !_allowedTypes.containsValue(mimeType)) {
      if (context.mounted) {
        showToast(context, 'Format gambar harus JPG, PNG, atau WEBP', error: true);
      }
      return;
    }
    final bytes = await file.readAsBytes();
    if (bytes.length > _maxImageBytes) {
      if (context.mounted) showToast(context, 'Ukuran gambar maksimal 2 MB', error: true);
      return;
    }
    onPicked(PickedImage(bytes: bytes, name: file.name, mimeType: mimeType));
  }

  @override
  Widget build(BuildContext context) {
    final hasImage = picked != null || currentUrl != null;
    final borderColor = errorText != null ? AppColors.red : AppColors.white20;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: AppText.label.copyWith(color: AppColors.white60)),
        const SizedBox(height: AppSpace.sm),
        Semantics(
          button: true,
          label: hasImage ? 'Ganti foto' : 'Pilih foto',
          child: InkWell(
            onTap: () => _choose(context),
            borderRadius: AppRadius.card,
            child: AspectRatio(
              aspectRatio: aspectRatio,
              child: Container(
                decoration: BoxDecoration(
                  color: AppColors.sunken,
                  border: Border.all(color: borderColor),
                  borderRadius: AppRadius.card,
                ),
                clipBehavior: Clip.antiAlias,
                child: picked != null
                    ? Image.memory(picked!.bytes, fit: BoxFit.cover)
                    : currentUrl != null
                    ? NetImage(currentUrl)
                    : Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(LucideIcons.imagePlus, size: 28, color: AppColors.white60),
                          const SizedBox(height: AppSpace.sm),
                          Text('Pilih foto', style: AppText.label),
                          const SizedBox(height: AppSpace.xs),
                          Text('JPG, PNG, atau WEBP · maks 2 MB', style: AppText.bodySm),
                        ],
                      ),
              ),
            ),
          ),
        ),
        if (hasImage)
          TextButton.icon(
            onPressed: () => _choose(context),
            icon: const Icon(LucideIcons.refreshCw, size: 16),
            label: const Text('Ganti foto'),
          ),
        if (errorText != null)
          Padding(
            padding: const EdgeInsets.only(top: AppSpace.xs),
            child: Text(errorText!, style: AppText.bodySm.copyWith(color: AppColors.red)),
          ),
      ],
    );
  }
}
