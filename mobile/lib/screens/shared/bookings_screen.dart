import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:provider/provider.dart';

import '../../models/booking.dart';
import '../../providers/auth_provider.dart';
import '../../services/booking_service.dart';
import '../../theme/app_theme.dart';
import '../../widgets/listing_card.dart';
import '../../widgets/states.dart';
import 'booking_detail_screen.dart';

/// Daftar pesanan dengan tab Berjalan / Selesai / Dibatalkan.
/// Buyer melihat pesanannya sendiri, seller melihat pesanan masuk (diatur oleh backend).
class BookingsScreen extends StatefulWidget {
  /// Judul besar di atas (buyer). Kosongkan jika halaman sudah punya AppBar (seller).
  final String? title;

  const BookingsScreen({super.key, this.title});

  @override
  State<BookingsScreen> createState() => _BookingsScreenState();
}

class _BookingsScreenState extends State<BookingsScreen> {
  late Future<List<Booking>> _future = BookingService.getBookings();

  void _reload() => setState(() => _future = BookingService.getBookings());

  Future<void> _open(Booking booking) async {
    await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => BookingDetailScreen(bookingId: booking.id)),
    );
    _reload(); // status mungkin berubah
  }

  @override
  Widget build(BuildContext context) {
    final isSeller = context.watch<AuthProvider>().user?.isSeller ?? false;
    final tabs = [
      ('Berjalan', (Booking booking) => booking.isOngoing),
      ('Selesai', (Booking booking) => booking.status == 'completed'),
      ('Dibatalkan', (Booking booking) => booking.status == 'cancelled'),
    ];

    return SafeArea(
      bottom: false,
      top: widget.title != null,
      child: DefaultTabController(
        length: tabs.length,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (widget.title != null)
              Padding(
                padding: const EdgeInsets.fromLTRB(
                  AppSpace.gutter,
                  AppSpace.lg,
                  AppSpace.gutter,
                  AppSpace.sm,
                ),
                child: Text(widget.title!, style: AppText.h1),
              ),
            TabBar(tabs: [for (final tab in tabs) Tab(text: tab.$1)]),
            Expanded(
              child: AsyncBody<List<Booking>>(
                future: _future,
                onRetry: _reload,
                builder: (bookings) => TabBarView(
                  children: [
                    for (final tab in tabs)
                      _BookingList(
                        bookings: bookings.where(tab.$2).toList(),
                        showBuyer: isSeller,
                        onTap: _open,
                        onRefresh: () async => _reload(),
                      ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _BookingList extends StatelessWidget {
  final List<Booking> bookings;
  final bool showBuyer;
  final ValueChanged<Booking> onTap;
  final Future<void> Function() onRefresh;

  const _BookingList({
    required this.bookings,
    required this.showBuyer,
    required this.onTap,
    required this.onRefresh,
  });

  @override
  Widget build(BuildContext context) {
    if (bookings.isEmpty) {
      return const EmptyState(
        icon: LucideIcons.ticket,
        title: 'Belum ada pesanan',
        message: 'Pesanan dengan status ini akan muncul di sini.',
      );
    }
    return RefreshIndicator(
      onRefresh: onRefresh,
      child: ListView.builder(
        itemCount: bookings.length,
        itemBuilder: (context, index) => BookingRow(
          booking: bookings[index],
          showBuyer: showBuyer,
          onTap: () => onTap(bookings[index]),
        ),
      ),
    );
  }
}
