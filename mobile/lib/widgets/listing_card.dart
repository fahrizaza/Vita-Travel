import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:provider/provider.dart';

import '../models/booking.dart';
import '../models/listing.dart';
import '../providers/auth_provider.dart';
import '../providers/wishlist_provider.dart';
import '../screens/shared/listing_detail_screen.dart';
import '../services/api_service.dart';
import '../theme/app_theme.dart';
import '../utils/format.dart';
import 'common.dart';
import 'dialogs.dart';
import 'photo.dart';

String priceUnit(Listing listing) => listing.isTrip ? '/orang' : '/hari';

void openListing(BuildContext context, Listing listing) {
  Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => ListingDetailScreen(listingId: listing.id)),
  );
}

/// Kartu foto besar dengan panel kaca (dipakai buyer di beranda, jelajah, favorit).
class ListingCard extends StatelessWidget {
  final Listing listing;
  final double? width;
  final double height;

  const ListingCard({super.key, required this.listing, this.width, this.height = 320});

  @override
  Widget build(BuildContext context) {
    final isBuyer = context.watch<AuthProvider>().user?.isBuyer ?? false;

    return SizedBox(
      width: width,
      height: height,
      child: ClipRRect(
        borderRadius: AppRadius.card,
        child: Stack(
          fit: StackFit.expand,
          children: [
            NetImage(listing.imageUrl),
            const PhotoShade(),
            Positioned.fill(
              // Label untuk pembaca layar, karena area ketuk ini tidak berisi teks.
              child: Semantics(
                button: true,
                label:
                    '${listing.title}, ${listing.destinationName}, '
                    '${rupiah(listing.price)} ${priceUnit(listing)}',
                child: Material(
                  color: Colors.transparent,
                  child: InkWell(onTap: () => openListing(context, listing)),
                ),
              ),
            ),
            Positioned(
              top: AppSpace.md,
              left: AppSpace.md,
              child: GlassPanel(
                padding: const EdgeInsets.symmetric(horizontal: AppSpace.sm, vertical: AppSpace.xs),
                child: Text(
                  listingTypeLabel(listing.type).toUpperCase(),
                  style: AppText.eyebrow.copyWith(color: AppColors.white, fontSize: 11),
                ),
              ),
            ),
            if (isBuyer)
              Positioned(
                top: AppSpace.sm,
                right: AppSpace.sm,
                child: WishlistButton(listing: listing),
              ),
            Positioned(
              left: AppSpace.md,
              right: AppSpace.md,
              bottom: AppSpace.md,
              child: ExcludeSemantics(
                child: IgnorePointer(
                  child: GlassPanel(
                    padding: const EdgeInsets.all(AppSpace.md),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '${listing.destinationName}, ${listing.destinationRegion}'.toUpperCase(),
                          style: AppText.eyebrow.copyWith(fontSize: 11),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(height: AppSpace.xs),
                        Text(
                          listing.title,
                          style: AppText.title,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(height: AppSpace.sm),
                        Row(
                          children: [
                            Expanded(
                              child: Text.rich(
                                TextSpan(
                                  children: [
                                    TextSpan(
                                      text: rupiah(listing.price),
                                      style: AppText.price.copyWith(fontSize: 15),
                                    ),
                                    TextSpan(text: ' ${priceUnit(listing)}', style: AppText.bodySm),
                                  ],
                                ),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                            RatingText(rating: listing.rating, count: listing.reviewCount),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Tombol hati untuk menambah / menghapus favorit.
class WishlistButton extends StatelessWidget {
  final Listing listing;

  const WishlistButton({super.key, required this.listing});

  @override
  Widget build(BuildContext context) {
    final wishlist = context.watch<WishlistProvider>();
    final saved = wishlist.contains(listing.id);

    return PhotoIconButton(
      icon: LucideIcons.heart,
      color: saved ? AppColors.accent : AppColors.white,
      tooltip: saved ? 'Hapus dari favorit' : 'Simpan ke favorit',
      onPressed: () async {
        try {
          final message = await wishlist.toggle(listing);
          if (context.mounted) showToast(context, message);
        } on ApiException catch (error) {
          if (context.mounted) showToast(context, error.message, error: true);
        }
      },
    );
  }
}

/// Baris listing yang datar (dipakai seller & admin di halaman data).
class ListingRow extends StatelessWidget {
  final Listing listing;
  final VoidCallback onTap;
  final Widget? trailing;
  final bool showSeller;

  const ListingRow({
    super.key,
    required this.listing,
    required this.onTap,
    this.trailing,
    this.showSeller = false,
  });

  @override
  Widget build(BuildContext context) {
    final subtitle = [
      listingTypeLabel(listing.type),
      listing.destinationName,
      if (showSeller) listing.sellerName,
    ].join(' · ');

    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.fromLTRB(AppSpace.gutter, AppSpace.lg, AppSpace.sm, AppSpace.lg),
        decoration: const BoxDecoration(
          border: Border(bottom: BorderSide(color: AppColors.white10)),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: AppRadius.small,
              child: NetImage(listing.imageUrl, width: 72, height: 72),
            ),
            const SizedBox(width: AppSpace.lg),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    listing.title,
                    style: AppText.title,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: AppSpace.xs),
                  Text(
                    subtitle,
                    style: AppText.bodySm,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: AppSpace.sm),
                  Wrap(
                    spacing: AppSpace.sm,
                    runSpacing: AppSpace.sm,
                    crossAxisAlignment: WrapCrossAlignment.center,
                    children: [
                      Text('${rupiah(listing.price)} ${priceUnit(listing)}', style: AppText.label),
                      StatusBadge(listingStatus(listing.status)),
                    ],
                  ),
                ],
              ),
            ),
            ?trailing, // tanda ? = hanya ditampilkan jika trailing tidak null
          ],
        ),
      ),
    );
  }
}

/// Baris pesanan (daftar pesanan buyer & seller).
class BookingRow extends StatelessWidget {
  final Booking booking;
  final VoidCallback onTap;
  final bool showBuyer;

  const BookingRow({super.key, required this.booking, required this.onTap, this.showBuyer = false});

  @override
  Widget build(BuildContext context) {
    final details = [
      formatDate(booking.serviceDate),
      '${booking.participants} orang',
      if (showBuyer) booking.buyerName,
    ].join(' · ');

    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: AppSpace.gutter, vertical: AppSpace.lg),
        decoration: const BoxDecoration(
          border: Border(bottom: BorderSide(color: AppColors.white10)),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: AppRadius.small,
              child: NetImage(booking.listingImageUrl, width: 72, height: 72),
            ),
            const SizedBox(width: AppSpace.lg),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Pesanan #${booking.id}', style: AppText.eyebrow.copyWith(fontSize: 11)),
                  const SizedBox(height: AppSpace.xs),
                  Text(
                    booking.listingTitle,
                    style: AppText.title,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: AppSpace.xs),
                  Text(details, style: AppText.bodySm),
                  const SizedBox(height: AppSpace.sm),
                  Wrap(
                    spacing: AppSpace.sm,
                    runSpacing: AppSpace.sm,
                    crossAxisAlignment: WrapCrossAlignment.center,
                    children: [
                      Text(rupiah(booking.totalPrice), style: AppText.price.copyWith(fontSize: 15)),
                      StatusBadge(bookingStatus(booking.status)),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
