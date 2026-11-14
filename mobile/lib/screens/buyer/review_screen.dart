import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../models/booking.dart';
import '../../services/booking_service.dart';
import '../../theme/app_theme.dart';
import '../../widgets/app_button.dart';
import '../../widgets/app_text_field.dart';
import '../../widgets/dialogs.dart';

/// Buyer memberi rating & ulasan setelah pesanan selesai.
class ReviewScreen extends StatefulWidget {
  final Booking booking;

  const ReviewScreen({super.key, required this.booking});

  @override
  State<ReviewScreen> createState() => _ReviewScreenState();
}

class _ReviewScreenState extends State<ReviewScreen> {
  final _comment = TextEditingController();
  int _rating = 0;
  bool _loading = false;

  static const _ratingLabels = ['', 'Buruk', 'Kurang', 'Cukup', 'Bagus', 'Luar biasa'];

  @override
  void dispose() {
    _comment.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (_rating == 0) {
      showToast(context, 'Pilih jumlah bintang terlebih dahulu', error: true);
      return;
    }
    setState(() => _loading = true);
    final ok = await runWithToast(
      context,
      () => BookingService.createReview(
        widget.booking.id,
        rating: _rating,
        comment: _comment.text.trim().isEmpty ? null : _comment.text.trim(),
      ),
      successMessage: 'Terima kasih atas ulasan Anda',
    );
    if (!mounted) return;
    setState(() => _loading = false);
    if (ok) Navigator.pop(context, true);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Beri Ulasan')),
      body: ListView(
        padding: const EdgeInsets.all(AppSpace.gutter),
        children: [
          Text(widget.booking.listingTitle, style: AppText.h3),
          const SizedBox(height: AppSpace.xs),
          Text('Bagaimana pengalaman Anda?', style: AppText.bodySm),
          const SizedBox(height: AppSpace.xl),
          Row(
            children: [
              for (var star = 1; star <= 5; star++)
                IconButton(
                  tooltip: '$star bintang',
                  iconSize: 36,
                  onPressed: () => setState(() => _rating = star),
                  icon: Icon(
                    LucideIcons.star,
                    color: star <= _rating ? AppColors.accent : AppColors.white20,
                  ),
                ),
            ],
          ),
          Text(_ratingLabels[_rating], style: AppText.label.copyWith(color: AppColors.accent)),
          const SizedBox(height: AppSpace.xl),
          AppTextField(
            label: 'Ceritakan pengalaman Anda (opsional)',
            controller: _comment,
            maxLines: 4,
          ),
          const SizedBox(height: AppSpace.xl),
          AppButton(label: 'Kirim ulasan', onPressed: _submit, loading: _loading, expand: true),
        ],
      ),
    );
  }
}
