import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../theme/app_theme.dart';
import '../utils/format.dart';

/// Badge status berwarna (pesanan, listing, verifikasi).
class StatusBadge extends StatelessWidget {
  final StatusInfo info;

  const StatusBadge(this.info, {super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: AppSpace.sm, vertical: AppSpace.xs),
      decoration: BoxDecoration(
        color: info.color.withValues(alpha: 0.12),
        border: Border.all(color: info.color.withValues(alpha: 0.6)),
        borderRadius: AppRadius.small,
      ),
      child: Text(info.label, style: AppText.label.copyWith(fontSize: 12, color: info.color)),
    );
  }
}

/// Label kecil (misalnya "Paket Trip", "7 hari").
class Tag extends StatelessWidget {
  final String text;
  final IconData? icon;

  const Tag(this.text, {super.key, this.icon});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: AppSpace.sm, vertical: 6),
      decoration: BoxDecoration(
        border: Border.all(color: AppColors.white20),
        borderRadius: AppRadius.small,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(icon, size: 14, color: AppColors.white60),
            const SizedBox(width: 6),
          ],
          Text(text, style: AppText.label.copyWith(fontSize: 12)),
        ],
      ),
    );
  }
}

/// Judul section + tombol "Lihat semua".
class SectionHeader extends StatelessWidget {
  final String title;
  final String? actionLabel;
  final VoidCallback? onAction;

  const SectionHeader(this.title, {super.key, this.actionLabel, this.onAction});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(AppSpace.gutter, AppSpace.xxl, AppSpace.sm, AppSpace.md),
      child: Row(
        children: [
          Expanded(child: Text(title, style: AppText.h3)),
          if (actionLabel != null)
            TextButton(
              onPressed: onAction,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(actionLabel!),
                  const SizedBox(width: AppSpace.xs),
                  const Icon(LucideIcons.arrowRight, size: 16),
                ],
              ),
            ),
        ],
      ),
    );
  }
}

/// Kotak angka ringkasan di dashboard.
class StatTile extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  final Color color;

  const StatTile({
    super.key,
    required this.icon,
    required this.label,
    required this.value,
    this.color = AppColors.white,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpace.lg),
      decoration: BoxDecoration(
        border: Border.all(color: AppColors.white10),
        borderRadius: AppRadius.card,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, size: 20, color: color == AppColors.white ? AppColors.white60 : color),
          const SizedBox(height: AppSpace.md),
          FittedBox(
            fit: BoxFit.scaleDown,
            alignment: Alignment.centerLeft,
            child: Text(value, style: AppText.price.copyWith(fontSize: 22, color: color)),
          ),
          const SizedBox(height: AppSpace.xs),
          Text(label, style: AppText.bodySm, maxLines: 2),
        ],
      ),
    );
  }
}

/// Grid 2 kolom untuk StatTile.
class StatGrid extends StatelessWidget {
  final List<Widget> tiles;

  const StatGrid({super.key, required this.tiles});

  @override
  Widget build(BuildContext context) {
    return GridView.count(
      crossAxisCount: 2,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      mainAxisSpacing: AppSpace.md,
      crossAxisSpacing: AppSpace.md,
      childAspectRatio: 1.35,
      children: tiles,
    );
  }
}

/// Baris "label .... nilai" untuk halaman detail.
class InfoRow extends StatelessWidget {
  final String label;
  final String value;
  final bool emphasize;

  const InfoRow(this.label, this.value, {super.key, this.emphasize = false});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: AppSpace.md),
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: AppColors.white10)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(child: Text(label, style: AppText.bodySm)),
          const SizedBox(width: AppSpace.lg),
          Flexible(
            child: Text(
              value,
              textAlign: TextAlign.right,
              style: emphasize ? AppText.price : AppText.body,
            ),
          ),
        ],
      ),
    );
  }
}

/// Bintang rating (hanya tampilan).
class RatingStars extends StatelessWidget {
  final double rating;
  final double size;

  const RatingStars(this.rating, {super.key, this.size = 14});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        for (var i = 1; i <= 5; i++)
          Icon(
            LucideIcons.star,
            size: size,
            color: i <= rating.round() ? AppColors.accent : AppColors.white20,
          ),
      ],
    );
  }
}

/// "★ 4.8 (12)" ringkas, atau "Baru" jika belum ada ulasan.
class RatingText extends StatelessWidget {
  final double rating;
  final int count;

  const RatingText({super.key, required this.rating, required this.count});

  @override
  Widget build(BuildContext context) {
    if (count == 0) return Text('Baru', style: AppText.label.copyWith(color: AppColors.white60));
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        const Icon(LucideIcons.star, size: 14, color: AppColors.accent),
        const SizedBox(width: AppSpace.xs),
        Text(rating.toStringAsFixed(1), style: AppText.label),
        Text(' ($count)', style: AppText.label.copyWith(color: AppColors.white60)),
      ],
    );
  }
}

/// Kotak berisi pesan penting (alasan penolakan, info pembayaran, dll).
class NoticeBox extends StatelessWidget {
  final String title;
  final String message;
  final Color color;
  final IconData icon;

  const NoticeBox({
    super.key,
    required this.title,
    required this.message,
    this.color = AppColors.amber,
    this.icon = LucideIcons.info,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpace.lg),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.08),
        border: Border(left: BorderSide(color: color, width: 2)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, size: 18, color: color),
          const SizedBox(width: AppSpace.md),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: AppText.label.copyWith(color: color)),
                const SizedBox(height: AppSpace.xs),
                Text(message, style: AppText.body),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
