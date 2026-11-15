import 'package:flutter/material.dart';

import '../../services/seller_service.dart';
import '../../theme/app_theme.dart';
import '../../utils/format.dart';
import '../../widgets/bar_chart.dart';
import '../../widgets/common.dart';
import '../../widgets/states.dart';

/// Laporan penjualan: pendapatan 6 bulan terakhir + listing terlaris.
class SalesReportScreen extends StatefulWidget {
  const SalesReportScreen({super.key});

  @override
  State<SalesReportScreen> createState() => _SalesReportScreenState();
}

class _SalesReportScreenState extends State<SalesReportScreen> {
  late Future<Map<String, dynamic>> _future = SellerService.getReport();

  void _reload() => setState(() => _future = SellerService.getReport());

  @override
  Widget build(BuildContext context) {
    return AsyncBody<Map<String, dynamic>>(
      future: _future,
      onRetry: _reload,
      builder: (report) {
        final topListings = report['top_listings'] as List;
        return RefreshIndicator(
          onRefresh: () async => _reload(),
          child: ListView(
            padding: const EdgeInsets.all(AppSpace.gutter),
            children: [
              Text('TOTAL PENDAPATAN', style: AppText.eyebrow),
              const SizedBox(height: AppSpace.xs),
              Text(
                rupiah(report['total_revenue']),
                style: AppText.h1.copyWith(fontFeatures: const [FontFeature.tabularFigures()]),
              ),
              const SizedBox(height: AppSpace.xs),
              Text(
                'Dari ${report['paid_bookings']} pesanan yang sudah dibayar',
                style: AppText.bodySm,
              ),
              const SizedBox(height: AppSpace.xxl),
              Text('Pendapatan 6 bulan terakhir', style: AppText.h3),
              const SizedBox(height: AppSpace.lg),
              RevenueBarChart(data: report['monthly']),
              const SizedBox(height: AppSpace.xxl),
              Text('Listing terlaris', style: AppText.h3),
              const SizedBox(height: AppSpace.sm),
              for (final (index, item) in topListings.indexed)
                InfoRow(
                  '${index + 1}. ${item['title']} (${item['bookings']} pesanan)',
                  rupiah(item['revenue']),
                ),
            ],
          ),
        );
      },
    );
  }
}
