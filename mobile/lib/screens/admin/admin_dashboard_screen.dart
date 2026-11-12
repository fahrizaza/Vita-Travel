import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../services/admin_service.dart';
import '../../theme/app_theme.dart';
import '../../utils/format.dart';
import '../../widgets/bar_chart.dart';
import '../../widgets/common.dart';
import '../../widgets/states.dart';

/// Ringkasan seluruh platform.
class AdminDashboardScreen extends StatefulWidget {
  const AdminDashboardScreen({super.key});

  @override
  State<AdminDashboardScreen> createState() => _AdminDashboardScreenState();
}

class _AdminDashboardScreenState extends State<AdminDashboardScreen> {
  late Future<Map<String, dynamic>> _future = AdminService.getDashboard();

  void _reload() => setState(() => _future = AdminService.getDashboard());

  @override
  Widget build(BuildContext context) {
    return AsyncBody<Map<String, dynamic>>(
      future: _future,
      onRetry: _reload,
      builder: (data) => RefreshIndicator(
        onRefresh: () async => _reload(),
        child: ListView(
          padding: const EdgeInsets.all(AppSpace.gutter),
          children: [
            Text('NILAI TRANSAKSI', style: AppText.eyebrow),
            const SizedBox(height: AppSpace.xs),
            Text(rupiah(data['total_transactions']), style: AppText.h1),
            const SizedBox(height: AppSpace.xs),
            Text('Pesanan yang sudah dibayar di seluruh platform', style: AppText.bodySm),
            const SizedBox(height: AppSpace.xl),
            StatGrid(
              tiles: [
                StatTile(
                  icon: LucideIcons.shieldCheck,
                  label: 'Seller menunggu verifikasi',
                  value: '${data['pending_sellers']}',
                  color: data['pending_sellers'] > 0 ? AppColors.amber : AppColors.white,
                ),
                StatTile(
                  icon: LucideIcons.users,
                  label: 'Buyer terdaftar',
                  value: '${data['buyers']}',
                ),
                StatTile(
                  icon: LucideIcons.store,
                  label: 'Seller terdaftar',
                  value: '${data['sellers']}',
                ),
                StatTile(
                  icon: LucideIcons.package,
                  label: 'Listing aktif',
                  value: '${data['active_listings']}',
                ),
                StatTile(
                  icon: LucideIcons.ban,
                  label: 'Listing ditangguhkan',
                  value: '${data['suspended_listings']}',
                  color: data['suspended_listings'] > 0 ? AppColors.red : AppColors.white,
                ),
                StatTile(
                  icon: LucideIcons.ticket,
                  label: '${data['completed_bookings']} pesanan selesai',
                  value: '${data['total_bookings']}',
                ),
              ],
            ),
            const SizedBox(height: AppSpace.xxl),
            Text('Transaksi 6 bulan terakhir', style: AppText.h3),
            const SizedBox(height: AppSpace.lg),
            RevenueBarChart(data: data['monthly']),
          ],
        ),
      ),
    );
  }
}
