import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../theme/app_theme.dart';

/// Gambar dari URL backend, dengan tampilan saat memuat dan saat gagal.
class NetImage extends StatelessWidget {
  final String? url;
  final BoxFit fit;
  final double? width;
  final double? height;

  const NetImage(this.url, {super.key, this.fit = BoxFit.cover, this.width, this.height});

  @override
  Widget build(BuildContext context) {
    final placeholder = Container(
      width: width,
      height: height,
      color: AppColors.sunken,
      alignment: Alignment.center,
      child: const Icon(LucideIcons.image, color: AppColors.iconMuted),
    );
    if (url == null) return placeholder;

    return Image.network(
      url!,
      width: width,
      height: height,
      fit: fit,
      errorBuilder: (context, error, stackTrace) => placeholder,
      frameBuilder: (context, child, frame, loadedSync) {
        if (loadedSync) return child;
        // Foto muncul perlahan setelah selesai dimuat.
        return AnimatedOpacity(
          opacity: frame == null ? 0 : 1,
          duration: AppMotion.slow,
          curve: AppMotion.curve,
          child: child,
        );
      },
    );
  }
}

/// Panel kaca (blur) yang diletakkan di atas foto.
/// Isi panel diberi latar teal transparan supaya teks putih tetap terbaca di foto yang terang.
class GlassPanel extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry padding;

  const GlassPanel({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(AppSpace.lg),
  });

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: AppRadius.card,
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 16, sigmaY: 16),
        child: Container(
          padding: padding,
          decoration: BoxDecoration(
            color: AppColors.canvas.withValues(alpha: 0.45),
            borderRadius: AppRadius.card,
            border: Border.all(color: AppColors.white20),
          ),
          child: child,
        ),
      ),
    );
  }
}

/// Gradasi gelap di bagian bawah foto agar panel & teks di atasnya kontras.
class PhotoShade extends StatelessWidget {
  const PhotoShade({super.key});

  @override
  Widget build(BuildContext context) {
    return const DecoratedBox(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Color(0x730D2E37), Color(0x000D2E37), Color(0xCC0D2E37)],
          stops: [0, 0.35, 1],
        ),
      ),
    );
  }
}

/// Tombol ikon bulat kecil di atas foto (kembali, favorit).
class PhotoIconButton extends StatelessWidget {
  final IconData icon;
  final VoidCallback onPressed;
  final String tooltip;
  final Color color;

  const PhotoIconButton({
    super.key,
    required this.icon,
    required this.onPressed,
    required this.tooltip,
    this.color = AppColors.white,
  });

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: AppRadius.small,
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
        child: Material(
          color: AppColors.canvas.withValues(alpha: 0.4),
          child: IconButton(
            tooltip: tooltip,
            onPressed: onPressed,
            icon: Icon(icon, size: 20, color: color),
          ),
        ),
      ),
    );
  }
}
