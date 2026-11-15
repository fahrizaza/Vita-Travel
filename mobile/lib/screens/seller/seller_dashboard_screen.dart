import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../models/booking.dart';
import '../../services/booking_service.dart';
import '../../services/seller_service.dart';
import '../../theme/app_theme.dart';
import '../../utils/format.dart';
import '../../widgets/common.dart';
import '../../widgets/listing_card.dart';
import '../../widgets/states.dart';
import '../shared/booking_detail_screen.dart';

class _DashboardData {
  final Map<String, dynamic> report;
  final List<Booking> needAction; // bukti transfer yang menunggu dicek

  _DashboardData(this.report, this.needAction);
}

class SellerDashboardScreen extends StatefulWidget {
  const SellerDashboardScreen({super.key});

  @override
  State<SellerDashboardScreen> createState() => _SellerDashboardScreenState();
}

class _SellerDashboardScreenState extends State<SellerDashboardScreen> {
  late Future<_DashboardData> _future = _load();

  Future<_DashboardData> _load() async {
    final report = await SellerService.getReport();
    final waiting = await BookingService.getBookings(status: 'waiting_verification');
    return _DashboardData(report, waiting);
  }

  void _reload() => setState(() => _future = _load());

  @override
  Widget build(BuildContext context) {
    return AsyncBody<_DashboardData>(
      future: _future,
      onRetry: _reload,
      builder: (data) {
        final report = data.report;
        return RefreshIndicator(
          onRefresh: () async => _reload(),
          child: ListView(
            padding: const EdgeInsets.symmetric(vertical: AppSpace.gutter),
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: AppSpace.gutter),
                child: StatGrid(
                  tiles: [
                    StatTile(
                      icon: LucideIcons.wallet,
                      label: 'Total pendapatan',
                      value: shortRupiah(report['total_revenue']),
                      color: AppColors.accent,
                    ),
                    StatTile(
                      icon: LucideIcons.hourglass,
                      label: 'Bukti transfer perlu dicek',
                      value: '${report['waiting_verification']}',
                      color: report['waiting_verification'] > 0 ? AppColors.sky : AppColors.white,
                    ),
                    StatTile(
                      icon: LucideIcons.package,
                      label: 'Listing aktif dari ${report['total_listings']}',
                      value: '${report['active_listings']}',
                    ),
                    StatTile(
                      icon: LucideIcons.star,
                      label: '${report['review_count']} ulasan',
                      value: (report['average_rating'] as num).toStringAsFixed(1),
                    ),
                  ],
                ),
              ),
              const SectionHeader('Perlu tindakan'),
              if (data.needAction.isEmpty)
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: AppSpace.gutter),
                  child: Text('Tidak ada bukti transfer yang menunggu. 👍', style: AppText.bodySm),
                )
              else
                for (final booking in data.needAction)
                  BookingRow(
                    booking: booking,
                    showBuyer: true,
                    onTap: () async {
                      await Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => BookingDetailScreen(bookingId: booking.id),
                        ),
                      );
                      _reload();
                    },
                  ),
            ],
          ),
        );
      },
    );
  }
}
