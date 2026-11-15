import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../models/listing.dart';
import '../../services/api_service.dart';
import '../../services/booking_service.dart';
import '../../theme/app_theme.dart';
import '../../utils/format.dart';
import '../../widgets/app_button.dart';
import '../../widgets/app_text_field.dart';
import '../../widgets/common.dart';
import '../../widgets/dialogs.dart';
import '../shared/booking_detail_screen.dart';

/// Form pemesanan. Trip: tanggal sudah ditentukan seller. Pemandu: buyer memilih tanggal & jumlah hari.
class BookingFormScreen extends StatefulWidget {
  final Listing listing;

  const BookingFormScreen({super.key, required this.listing});

  @override
  State<BookingFormScreen> createState() => _BookingFormScreenState();
}

class _BookingFormScreenState extends State<BookingFormScreen> {
  final _note = TextEditingController();
  int _participants = 1;
  int _days = 1;
  DateTime? _date;
  bool _loading = false;

  Listing get listing => widget.listing;

  /// Batas peserta: sisa kursi (trip) atau ukuran grup maksimal (pemandu).
  int get _maxParticipants => listing.isTrip ? listing.remainingQuota : listing.quota;

  double get _total => listing.isTrip ? listing.price * _participants : listing.price * _days;

  @override
  void dispose() {
    _note.dispose();
    super.dispose();
  }

  Future<void> _pickDate() async {
    final today = DateTime.now();
    final picked = await showDatePicker(
      context: context,
      initialDate: _date ?? today.add(const Duration(days: 1)),
      firstDate: today,
      lastDate: today.add(const Duration(days: 365)),
      helpText: 'Pilih tanggal mulai',
    );
    if (picked != null) setState(() => _date = picked);
  }

  Future<void> _submit() async {
    if (!listing.isTrip && _date == null) {
      showToast(context, 'Pilih tanggal layanan terlebih dahulu', error: true);
      return;
    }
    setState(() => _loading = true);
    try {
      final booking = await BookingService.createBooking(
        listingId: listing.id,
        participants: _participants,
        serviceDate: listing.isTrip ? null : toApiDate(_date!),
        days: listing.isTrip ? null : _days,
        note: _note.text.trim().isEmpty ? null : _note.text.trim(),
      );
      if (!mounted) return;
      showToast(context, 'Pesanan dibuat, silakan lakukan pembayaran');
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => BookingDetailScreen(bookingId: booking.id)),
      );
    } on ApiException catch (error) {
      if (mounted) {
        showToast(context, error.message, error: true);
        setState(() => _loading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Pesan')),
      body: ListView(
        padding: const EdgeInsets.all(AppSpace.gutter),
        children: [
          Text(listingTypeLabel(listing.type).toUpperCase(), style: AppText.eyebrow),
          const SizedBox(height: AppSpace.xs),
          Text(listing.title, style: AppText.h2),
          const SizedBox(height: AppSpace.xs),
          Text('${listing.sellerName} · ${listing.destinationName}', style: AppText.bodySm),
          const SizedBox(height: AppSpace.xxl),
          if (listing.isTrip) ...[
            InfoRow('Tanggal berangkat', formatDate(listing.startDate!)),
            InfoRow('Durasi', '${listing.durationDays} hari'),
            InfoRow('Sisa kursi', '${listing.remainingQuota} orang'),
          ] else ...[
            Text('Tanggal mulai', style: AppText.label.copyWith(color: AppColors.white60)),
            const SizedBox(height: AppSpace.sm),
            OutlinedButton.icon(
              onPressed: _pickDate,
              icon: const Icon(LucideIcons.calendar, size: 18),
              label: Text(_date == null ? 'Pilih tanggal' : formatDateLong(_date!)),
              style: OutlinedButton.styleFrom(alignment: Alignment.centerLeft),
            ),
            const SizedBox(height: AppSpace.lg),
            _Stepper(
              label: 'Jumlah hari',
              value: _days,
              min: 1,
              max: 30,
              onChanged: (value) => setState(() => _days = value),
            ),
          ],
          const SizedBox(height: AppSpace.lg),
          _Stepper(
            label: listing.isTrip ? 'Jumlah peserta' : 'Jumlah orang (maks. ${listing.quota})',
            value: _participants,
            min: 1,
            max: _maxParticipants,
            onChanged: (value) => setState(() => _participants = value),
          ),
          const SizedBox(height: AppSpace.lg),
          AppTextField(
            label: 'Catatan untuk penyedia (opsional)',
            controller: _note,
            hint: 'Misalnya: alergi makanan, titik jemput',
            maxLines: 3,
          ),
          const SizedBox(height: AppSpace.xl),
          InfoRow(
            listing.isTrip
                ? '${rupiah(listing.price)} × $_participants orang'
                : '${rupiah(listing.price)} × $_days hari',
            rupiah(_total),
            emphasize: true,
          ),
          const SizedBox(height: AppSpace.md),
          Text(
            'Setelah memesan, transfer ke rekening penyedia lalu upload bukti transfer.',
            style: AppText.bodySm,
          ),
          const SizedBox(height: AppSpace.xl),
          AppButton(
            label: 'Buat pesanan · ${rupiah(_total)}',
            onPressed: _submit,
            loading: _loading,
            expand: true,
          ),
        ],
      ),
    );
  }
}

/// Tombol − angka + untuk memilih jumlah.
class _Stepper extends StatelessWidget {
  final String label;
  final int value;
  final int min;
  final int max;
  final ValueChanged<int> onChanged;

  const _Stepper({
    required this.label,
    required this.value,
    required this.min,
    required this.max,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(child: Text(label, style: AppText.body)),
        IconButton.outlined(
          tooltip: 'Kurangi',
          onPressed: value > min ? () => onChanged(value - 1) : null,
          icon: const Icon(LucideIcons.minus, size: 18),
          style: IconButton.styleFrom(
            shape: const RoundedRectangleBorder(borderRadius: AppRadius.small),
            side: const BorderSide(color: AppColors.white20),
          ),
        ),
        SizedBox(
          width: 48,
          child: Text('$value', textAlign: TextAlign.center, style: AppText.price),
        ),
        IconButton.outlined(
          tooltip: 'Tambah',
          onPressed: value < max ? () => onChanged(value + 1) : null,
          icon: const Icon(LucideIcons.plus, size: 18),
          style: IconButton.styleFrom(
            shape: const RoundedRectangleBorder(borderRadius: AppRadius.small),
            side: const BorderSide(color: AppColors.white20),
          ),
        ),
      ],
    );
  }
}
