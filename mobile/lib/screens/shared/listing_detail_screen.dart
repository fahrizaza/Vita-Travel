import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:provider/provider.dart';

import '../../models/listing.dart';
import '../../models/user.dart';
import '../../providers/auth_provider.dart';
import '../../services/admin_service.dart';
import '../../services/listing_service.dart';
import '../../theme/app_theme.dart';
import '../../utils/format.dart';
import '../../widgets/app_button.dart';
import '../../widgets/common.dart';
import '../../widgets/dialogs.dart';
import '../../widgets/listing_card.dart';
import '../../widgets/photo.dart';
import '../../widgets/states.dart';
import '../buyer/booking_form_screen.dart';
import '../seller/listing_form_screen.dart';

/// Detail paket trip / pemandu. Tombol di bawah berbeda untuk tiap role:
/// buyer → Pesan, seller pemilik → Edit, admin → Tangguhkan / Pulihkan.
class ListingDetailScreen extends StatefulWidget {
  final int listingId;

  const ListingDetailScreen({super.key, required this.listingId});

  @override
  State<ListingDetailScreen> createState() => _ListingDetailScreenState();
}

class _ListingDetailScreenState extends State<ListingDetailScreen> {
  late Future<Listing> _future = ListingService.getListing(widget.listingId);
  bool _busy = false;

  void _reload() => setState(() => _future = ListingService.getListing(widget.listingId));

  Future<void> _moderate(Listing listing) async {
    final suspend = listing.status != 'suspended';
    String? note;
    if (suspend) {
      note = await textInputDialog(
        context,
        title: 'Tangguhkan listing?',
        label: 'Alasan penangguhan',
        confirmLabel: 'Tangguhkan',
        danger: true,
      );
      if (note == null) return;
    } else {
      final yes = await confirmDialog(
        context,
        title: 'Pulihkan listing?',
        message: 'Listing akan tampil lagi di pencarian buyer.',
        confirmLabel: 'Pulihkan',
      );
      if (!yes) return;
    }
    if (!mounted) return;
    setState(() => _busy = true);
    final ok = await runWithToast(
      context,
      () => AdminService.moderateListing(listing.id, suspend: suspend, note: note),
      successMessage: suspend ? 'Listing ditangguhkan' : 'Listing dipulihkan',
    );
    if (mounted) setState(() => _busy = false);
    if (ok) _reload();
  }

  Future<void> _edit(Listing listing) async {
    final changed = await Navigator.push<bool>(
      context,
      MaterialPageRoute(builder: (context) => ListingFormScreen(listing: listing)),
    );
    if (changed == true) _reload();
  }

  @override
  Widget build(BuildContext context) {
    final user = context.watch<AuthProvider>().user!;

    return Scaffold(
      body: AsyncBody<Listing>(
        future: _future,
        onRetry: _reload,
        builder: (listing) => _DetailBody(listing: listing, user: user),
      ),
      bottomNavigationBar: FutureBuilder<Listing>(
        future: _future,
        builder: (context, snapshot) {
          if (!snapshot.hasData) return const SizedBox.shrink();
          final action = _actionBar(snapshot.data!, user);
          return action ?? const SizedBox.shrink();
        },
      ),
    );
  }

  /// Bar harga + tombol yang menempel di bawah layar.
  Widget? _actionBar(Listing listing, User user) {
    Widget? button;
    if (user.isBuyer) {
      final soldOut = listing.isTrip && listing.remainingQuota <= 0;
      button = AppButton(
        label: !listing.isActive
            ? 'Tidak tersedia'
            : soldOut
            ? 'Kuota penuh'
            : 'Pesan sekarang',
        onPressed: !listing.isActive || soldOut
            ? null
            : () => Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => BookingFormScreen(listing: listing)),
              ),
      );
    } else if (user.isSeller && listing.sellerId == user.id) {
      button = AppButton(
        label: 'Edit listing',
        icon: LucideIcons.pencil,
        onPressed: () => _edit(listing),
      );
    } else if (user.isAdmin) {
      final suspended = listing.status == 'suspended';
      button = AppButton(
        label: suspended ? 'Pulihkan' : 'Tangguhkan',
        icon: suspended ? LucideIcons.refreshCw : LucideIcons.ban,
        variant: suspended ? ButtonVariant.primary : ButtonVariant.danger,
        loading: _busy,
        onPressed: () => _moderate(listing),
      );
    }
    if (button == null) return null;

    return Container(
      decoration: const BoxDecoration(
        color: AppColors.canvas,
        border: Border(top: BorderSide(color: AppColors.white10)),
      ),
      child: SafeArea(
        top: false,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: AppSpace.gutter, vertical: AppSpace.md),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(rupiah(listing.price), style: AppText.price.copyWith(fontSize: 20)),
                    Text(listing.isTrip ? 'per orang' : 'per hari', style: AppText.bodySm),
                  ],
                ),
              ),
              button,
            ],
          ),
        ),
      ),
    );
  }
}

class _DetailBody extends StatelessWidget {
  final Listing listing;
  final User user;

  const _DetailBody({required this.listing, required this.user});

  @override
  Widget build(BuildContext context) {
    final photoHeight = (MediaQuery.sizeOf(context).height * 0.6).clamp(380.0, 560.0);
    final tags = [
      Tag(listing.categoryName, icon: LucideIcons.tag),
      if (listing.isTrip) ...[
        Tag(formatDate(listing.startDate!), icon: LucideIcons.calendar),
        Tag('${listing.durationDays} hari', icon: LucideIcons.clock),
        Tag('Sisa ${listing.remainingQuota} dari ${listing.quota} kursi', icon: LucideIcons.users),
      ] else ...[
        Tag('Maks. ${listing.quota} orang', icon: LucideIcons.users),
        Tag(listing.languages ?? '-', icon: LucideIcons.languages),
      ],
    ];

    return Stack(
      children: [
        ListView(
          padding: EdgeInsets.zero,
          children: [
            // Foto besar dengan panel kaca berisi judul
            SizedBox(
              height: photoHeight,
              child: Stack(
                fit: StackFit.expand,
                children: [
                  NetImage(listing.imageUrl),
                  const PhotoShade(),
                  Positioned(
                    left: AppSpace.gutter,
                    right: AppSpace.gutter,
                    bottom: AppSpace.gutter,
                    child: GlassPanel(
                      padding: const EdgeInsets.all(AppSpace.lg),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '${listingTypeLabel(listing.type)} · ${listing.destinationName}, ${listing.destinationRegion}'
                                .toUpperCase(),
                            style: AppText.eyebrow,
                          ),
                          const SizedBox(height: AppSpace.sm),
                          Text(listing.title, style: AppText.h2),
                          const SizedBox(height: AppSpace.md),
                          RatingText(rating: listing.rating, count: listing.reviewCount),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(AppSpace.gutter),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (!listing.isActive) ...[
                    NoticeBox(
                      title: listingStatus(listing.status).label,
                      message:
                          listing.moderationNote ?? 'Listing ini sedang tidak menerima pesanan.',
                      color: listingStatus(listing.status).color,
                    ),
                    const SizedBox(height: AppSpace.xl),
                  ],
                  Wrap(spacing: AppSpace.sm, runSpacing: AppSpace.sm, children: tags),
                  const SizedBox(height: AppSpace.xxl),
                  Text('Tentang', style: AppText.h3),
                  const SizedBox(height: AppSpace.md),
                  Text(listing.description, style: AppText.body.copyWith(color: AppColors.white60)),
                  if (listing.includeList.isNotEmpty) ...[
                    const SizedBox(height: AppSpace.xxl),
                    Text('Termasuk', style: AppText.h3),
                    const SizedBox(height: AppSpace.md),
                    for (final item in listing.includeList)
                      Padding(
                        padding: const EdgeInsets.only(bottom: AppSpace.sm),
                        child: Row(
                          children: [
                            const Icon(LucideIcons.check, size: 16, color: AppColors.accent),
                            const SizedBox(width: AppSpace.md),
                            Expanded(child: Text(item, style: AppText.body)),
                          ],
                        ),
                      ),
                  ],
                  const SizedBox(height: AppSpace.xxl),
                  Text('Penyedia', style: AppText.h3),
                  const SizedBox(height: AppSpace.md),
                  Row(
                    children: [
                      const Icon(LucideIcons.store, size: 20, color: AppColors.white60),
                      const SizedBox(width: AppSpace.md),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(listing.sellerName, style: AppText.title),
                            Text(listing.sellerCity, style: AppText.bodySm),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: AppSpace.xxl),
                  _Reviews(listing: listing),
                  const SizedBox(height: AppSpace.xl),
                ],
              ),
            ),
          ],
        ),
        // Tombol kembali & favorit di atas foto
        SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(AppSpace.md),
            child: Row(
              children: [
                PhotoIconButton(
                  icon: LucideIcons.chevronLeft,
                  tooltip: 'Kembali',
                  onPressed: () => Navigator.pop(context),
                ),
                const Spacer(),
                if (user.isBuyer) WishlistButton(listing: listing),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class _Reviews extends StatelessWidget {
  final Listing listing;

  const _Reviews({required this.listing});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text('Ulasan', style: AppText.h3),
            const Spacer(),
            if (listing.reviewCount > 0) ...[
              Text(listing.rating.toStringAsFixed(1), style: AppText.h2),
              Text(' / 5 · ${listing.reviewCount} ulasan', style: AppText.bodySm),
            ],
          ],
        ),
        const SizedBox(height: AppSpace.md),
        if (listing.reviews.isEmpty)
          Text('Belum ada ulasan.', style: AppText.bodySm)
        else
          for (final review in listing.reviews)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: AppSpace.lg),
              decoration: const BoxDecoration(
                border: Border(top: BorderSide(color: AppColors.white10)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(child: Text(review.buyerName, style: AppText.label)),
                      RatingStars(review.rating.toDouble()),
                    ],
                  ),
                  if (review.comment != null) ...[
                    const SizedBox(height: AppSpace.sm),
                    Text(review.comment!, style: AppText.body.copyWith(color: AppColors.white60)),
                  ],
                  const SizedBox(height: AppSpace.xs),
                  Text(
                    formatDate(review.createdAt.toIso8601String()),
                    style: AppText.bodySm.copyWith(fontSize: 12),
                  ),
                ],
              ),
            ),
      ],
    );
  }
}
