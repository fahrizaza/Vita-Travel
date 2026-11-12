import 'package:flutter/material.dart';

import '../theme/app_theme.dart';
import '../utils/format.dart';

/// Grafik batang sederhana tanpa library: tinggi batang = nilai / nilai terbesar.
/// `data` berisi {month: "2026-06", revenue: 12400000} dari API laporan.
class RevenueBarChart extends StatelessWidget {
  final List<dynamic> data;
  final double height;

  const RevenueBarChart({super.key, required this.data, this.height = 160});

  @override
  Widget build(BuildContext context) {
    final values = data.map((item) => (item['revenue'] as num).toDouble()).toList();
    final maxValue = values.fold<double>(0, (max, value) => value > max ? value : max);
    final animate = !MediaQuery.disableAnimationsOf(context);

    return SizedBox(
      height: height + 44,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          for (var i = 0; i < data.length; i++)
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: AppSpace.xs),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Text(
                      values[i] == 0 ? '–' : shortRupiah(values[i]),
                      style: AppText.bodySm.copyWith(fontSize: 11),
                      maxLines: 1,
                    ),
                    const SizedBox(height: AppSpace.xs),
                    TweenAnimationBuilder<double>(
                      tween: Tween(begin: animate ? 0 : 1, end: 1),
                      duration: AppMotion.slow,
                      curve: AppMotion.curve,
                      builder: (context, progress, child) => Container(
                        height: maxValue == 0
                            ? 2
                            : (values[i] / maxValue * height * progress).clamp(2, height),
                        // Bulan terakhir (bulan ini) diberi warna aksen.
                        color: i == data.length - 1 ? AppColors.accent : AppColors.white20,
                      ),
                    ),
                    const SizedBox(height: AppSpace.sm),
                    Text(
                      monthLabel(data[i]['month']),
                      style: AppText.bodySm.copyWith(fontSize: 12),
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}
