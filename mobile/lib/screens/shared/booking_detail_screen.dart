import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:provider/provider.dart';

import '../../models/booking.dart';
import '../../models/user.dart';
import '../../providers/auth_provider.dart';
import '../../services/booking_service.dart';
import '../../theme/app_theme.dart';
import '../../utils/format.dart';
import '../../widgets/app_button.dart';
import '../../widgets/common.dart';
import '../../widgets/dialogs.dart';
import '../../widgets/photo.dart';
import '../../widgets/states.dart';
import '../buyer/payment_screen.dart';
import '../buyer/review_screen.dart';

/// Detail pesanan untuk buyer, seller, dan admin. Tombol aksi menyesuaikan role & status.
class BookingDetailScreen extends StatefulWidget {
  final int bookingId;

  const BookingDetailScreen({super.key, required this.bookingId});

  @override
  State<BookingDetailScreen> createState() => _BookingDetailScreenState();
}

class _BookingDetailScreenState extends State<BookingDetailScreen> {
  late Future<Booking> _future = BookingService.getBooking(widget.bookingId);
  bool _busy = false;

  void _reload() => setState(() => _future = BookingService.getBooking(widget.bookingId));

  /// Jalankan aksi (setujui, tolak, batal, dll) lalu muat ulang detail.
  Future<void> _act(Future<void> Function() action, String successMessage) async {
    setState(() => _busy = true);
    final ok = await runWithToast(context, action, successMessage: successMessage);
    if (!mounted) return;
    setState(() => _busy = false);
    if (ok) _reload();
  }

  Future<void> _approve(Booking booking) async {
    final yes = await confirmDialog(
      context,
      title: 'Setujui pembayaran?',
      message: 'Pastikan dana ${rupiah(booking.totalPrice)} sudah masuk ke rekening Anda.',
      confirmLabel: 'Setujui',
    );
    if (yes) {
      _act(() => BookingService.verifyPayment(booking.id, approve: true), 'Pembayaran disetujui');
    }
  }

  Future<void> _reject(Booking booking) async {
    final reason = await textInputDialog(
      context,
      title: 'Tolak bukti transfer?',
      label: 'Alasan penolakan',
      confirmLabel: 'Tolak',
      danger: true,
    );
    if (reason != null) {
      _act(
        () => BookingService.verifyPayment(booking.id, approve: false, note: reason),
        'Bukti ditolak, buyer diminta upload ulang',
      );
    }
  }

  Future<void> _complete(Booking booking) async {
    final yes = await confirmDialog(
      context,
      title: 'Tandai selesai?',
      message: 'Lakukan ini setelah layanan selesai dijalankan. Buyer lalu bisa memberi ulasan.',
      confirmLabel: 'Tandai selesai',
    );
    if (yes) _act(() => BookingService.completeBooking(booking.id), 'Pesanan ditandai selesai');
  }

  Future<void> _cancel(Booking booking, User user) async {
    final reason = await textInputDialog(
      context,
      title: 'Batalkan pesanan?',
      label: user.isSeller ? 'Alasan pembatalan' : 'Alasan (opsional)',
      confirmLabel: 'Batalkan pesanan',
      required: user.isSeller,
      danger: true,
    );
    if (reason != null) {
      _act(
        () => BookingService.cancelBooking(booking.id, reason: reason.isEmpty ? null : reason),
        'Pesanan dibatalkan',
      );
    }
  }

  Future<void> _openPage(Widget page) async {
    final changed = await Navigator.push<bool>(
      context,
      MaterialPageRoute(builder: (context) => page),
    );
    if (changed == true) _reload();
  }

  @override
  Widget build(BuildContext context) {
    final user = context.watch<AuthProvider>().user!;

    return Scaffold(
      appBar: AppBar(title: Text('Pesanan #${widget.bookingId}')),
      body: AsyncBody<Booking>(
        future: _future,
        onRetry: _reload,
        builder: (booking) => RefreshIndicator(
          onRefresh: () async => _reload(),
          child: ListView(
            padding: const EdgeInsets.all(AppSpace.gutter),
            children: [
              _Header(booking: booking),
              const SizedBox(height: AppSpace.xl),
              _StatusSteps(status: booking.status),
              if (booking.statusNote != null) ...[
                const SizedBox(height: AppSpace.xl),
                NoticeBox(
                  title: booking.status == 'cancelled'
                      ? 'Alasan pembatalan'
                      : 'Bukti transfer ditolak',
                  message: booking.statusNote!,
                  color: AppColors.red,
                  icon: LucideIcons.circleAlert,
                ),
              ],
              const SizedBox(height: AppSpace.xl),
              Text('Rincian', style: AppText.h3),
              const SizedBox(height: AppSpace.sm),
              InfoRow(
                booking.listingType == 'trip' ? 'Tanggal berangkat' : 'Tanggal mulai',
                formatDate(booking.serviceDate),
              ),
              InfoRow('Durasi', '${booking.days} hari'),
              InfoRow('Peserta', '${booking.participants} orang'),
              InfoRow('Penyedia', booking.sellerName),
              if (!user.isBuyer) ...[
                InfoRow('Pemesan', booking.buyerName),
                if (booking.buyerPhone != null) InfoRow('No. HP pemesan', booking.buyerPhone!),
              ],
              if (booking.note != null) InfoRow('Catatan', booking.note!),
              InfoRow('Dipesan pada', formatDateLong(booking.createdAt)),
              InfoRow('Total bayar', rupiah(booking.totalPrice), emphasize: true),
              if (user.isBuyer && booking.status == 'pending_payment') ...[
                const SizedBox(height: AppSpace.xl),
                _BankInfo(booking: booking),
              ],
              if (booking.proofUrl != null) ...[
                const SizedBox(height: AppSpace.xl),
                _ProofSection(booking: booking),
              ],
              if (booking.reviewRating != null) ...[
                const SizedBox(height: AppSpace.xl),
                Text('Ulasan', style: AppText.h3),
                const SizedBox(height: AppSpace.md),
                RatingStars(booking.reviewRating!.toDouble(), size: 18),
                if (booking.reviewComment != null) ...[
                  const SizedBox(height: AppSpace.sm),
                  Text(
                    booking.reviewComment!,
                    style: AppText.body.copyWith(color: AppColors.white60),
                  ),
                ],
              ],
              const SizedBox(height: AppSpace.xxl),
              ..._actions(booking, user),
            ],
          ),
        ),
      ),
    );
  }

  /// Tombol yang muncul tergantung role dan status pesanan.
  List<Widget> _actions(Booking booking, User user) {
    final buttons = <Widget>[];
    final status = booking.status;

    if (user.isBuyer) {
      if (status == 'pending_payment') {
        buttons.add(
          AppButton(
            label: 'Upload bukti transfer',
            icon: LucideIcons.upload,
            expand: true,
            onPressed: () => _openPage(PaymentScreen(booking: booking)),
          ),
        );
      }
      if (status == 'completed' && booking.reviewRating == null) {
        buttons.add(
          AppButton(
            label: 'Beri ulasan',
            icon: LucideIcons.star,
            expand: true,
            onPressed: () => _openPage(ReviewScreen(booking: booking)),
          ),
        );
      }
      if (status == 'pending_payment' || status == 'waiting_verification') {
        buttons.add(
          AppButton(
            label: 'Batalkan pesanan',
            variant: ButtonVariant.danger,
            expand: true,
            loading: _busy,
            onPressed: () => _cancel(booking, user),
          ),
        );
      }
    }

    if (user.isSeller) {
      if (status == 'waiting_verification') {
        buttons.add(
          AppButton(
            label: 'Setujui pembayaran',
            icon: LucideIcons.check,
            expand: true,
            loading: _busy,
            onPressed: () => _approve(booking),
          ),
        );
        buttons.add(
          AppButton(
            label: 'Tolak bukti transfer',
            icon: LucideIcons.x,
            variant: ButtonVariant.secondary,
            expand: true,
            onPressed: _busy ? null : () => _reject(booking),
          ),
        );
      }
      if (status == 'confirmed') {
        buttons.add(
          AppButton(
            label: 'Tandai selesai',
            icon: LucideIcons.circleCheck,
            expand: true,
            loading: _busy,
            onPressed: () => _complete(booking),
          ),
        );
      }
      if (booking.isOngoing) {
        buttons.add(
          AppButton(
            label: 'Batalkan pesanan',
            variant: ButtonVariant.danger,
            expand: true,
            onPressed: _busy ? null : () => _cancel(booking, user),
          ),
        );
      }
    }

    return [
      for (final button in buttons) ...[button, const SizedBox(height: AppSpace.md)],
    ];
  }
}

class _Header extends StatelessWidget {
  final Booking booking;

  const _Header({required this.booking});

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ClipRRect(
          borderRadius: AppRadius.small,
          child: NetImage(booking.listingImageUrl, width: 88, height: 88),
        ),
        const SizedBox(width: AppSpace.lg),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(listingTypeLabel(booking.listingType).toUpperCase(), style: AppText.eyebrow),
              const SizedBox(height: AppSpace.xs),
              Text(booking.listingTitle, style: AppText.title),
              const SizedBox(height: AppSpace.sm),
              StatusBadge(bookingStatus(booking.status)),
            ],
          ),
        ),
      ],
    );
  }
}

/// Langkah status: Dipesan → Dibayar → Dikonfirmasi → Selesai.
class _StatusSteps extends StatelessWidget {
  final String status;

  const _StatusSteps({required this.status});

  @override
  Widget build(BuildContext context) {
    if (status == 'cancelled') return const SizedBox.shrink();
    const steps = ['Dipesan', 'Dibayar', 'Dikonfirmasi', 'Selesai'];
    final reached = switch (status) {
      'pending_payment' => 0,
      'waiting_verification' => 1,
      'confirmed' => 2,
      _ => 3,
    };

    return Row(
      children: [
        for (var i = 0; i < steps.length; i++)
          Expanded(
            child: Padding(
              padding: const EdgeInsets.only(right: AppSpace.xs),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(height: 2, color: i <= reached ? AppColors.accent : AppColors.white10),
                  const SizedBox(height: AppSpace.sm),
                  Text(
                    steps[i],
                    style: AppText.bodySm.copyWith(
                      fontSize: 12,
                      color: i <= reached ? AppColors.white : AppColors.white40,
                    ),
                  ),
                ],
              ),
            ),
          ),
      ],
    );
  }
}

class _BankInfo extends StatelessWidget {
  final Booking booking;

  const _BankInfo({required this.booking});

  @override
  Widget build(BuildContext context) {
    final hasBank = booking.bankAccountNumber != null;
    return NoticeBox(
      title: 'Cara bayar',
      icon: LucideIcons.landmark,
      message: hasBank
          ? 'Transfer ${rupiah(booking.totalPrice)} ke ${booking.bankName} ${booking.bankAccountNumber} '
                'a.n. ${booking.bankAccountName}, lalu upload bukti transfer.'
          : 'Seller belum mengisi rekening. Hubungi seller sebelum membayar.',
    );
  }
}

class _ProofSection extends StatelessWidget {
  final Booking booking;

  const _ProofSection({required this.booking});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Bukti transfer', style: AppText.h3),
        const SizedBox(height: AppSpace.xs),
        Text('Dari ${booking.senderName} · ${booking.senderBank}', style: AppText.bodySm),
        const SizedBox(height: AppSpace.md),
        GestureDetector(
          onTap: () => showDialog(
            context: context,
            builder: (context) => Dialog(
              insetPadding: const EdgeInsets.all(AppSpace.lg),
              child: InteractiveViewer(child: NetImage(booking.proofUrl, fit: BoxFit.contain)),
            ),
          ),
          child: ClipRRect(
            borderRadius: AppRadius.card,
            child: SizedBox(height: 220, width: double.infinity, child: NetImage(booking.proofUrl)),
          ),
        ),
        const SizedBox(height: AppSpace.xs),
        Text('Ketuk gambar untuk memperbesar', style: AppText.bodySm.copyWith(fontSize: 12)),
      ],
    );
  }
}
