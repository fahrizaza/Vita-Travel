import 'dart:async';

import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:provider/provider.dart';

import '../../models/listing.dart';
import '../../models/master_data.dart';
import '../../providers/auth_provider.dart';
import '../../services/listing_service.dart';
import '../../services/master_service.dart';
import '../../theme/app_theme.dart';
import '../../utils/format.dart';
import '../../widgets/common.dart';
import '../../widgets/listing_card.dart';
import '../../widgets/photo.dart';
import '../../widgets/states.dart';
import '../../widgets/vita_logo.dart';
import 'explore_screen.dart';

/// Data beranda: listing (urut rating) + destinasi.
class _HomeData {
  final List<Listing> listings;
  final List<Destination> destinations;

  _HomeData(this.listings, this.destinations);
}

class HomeScreen extends StatefulWidget {
  final VoidCallback onSearchTap;

  const HomeScreen({super.key, required this.onSearchTap});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late Future<_HomeData> _future = _load();

  Future<_HomeData> _load() async {
    final listings = await ListingService.getListings(sort: 'rating');
    final destinations = await MasterService.getDestinations();
    return _HomeData(listings, destinations);
  }

  Future<void> _refresh() async {
    setState(() => _future = _load());
    await _future;
  }

  @override
  Widget build(BuildContext context) {
    return AsyncBody<_HomeData>(
      future: _future,
      onRetry: _refresh,
      builder: (data) {
        final trips = data.listings.where((listing) => listing.isTrip).toList();
        final guides = data.listings.where((listing) => !listing.isTrip).toList();

        return RefreshIndicator(
          onRefresh: _refresh,
          child: ListView(
            padding: EdgeInsets.zero,
            children: [
              _HeroCarousel(listings: data.listings.take(4).toList()),
              Padding(
                padding: const EdgeInsets.fromLTRB(
                  AppSpace.gutter,
                  AppSpace.xl,
                  AppSpace.gutter,
                  0,
                ),
                child: _SearchBox(onTap: widget.onSearchTap),
              ),
              if (trips.isNotEmpty) ...[
                SectionHeader('Paket Trip', actionLabel: 'Semua', onAction: widget.onSearchTap),
                _HorizontalList(listings: trips, cardWidth: 280),
              ],
              if (guides.isNotEmpty) ...[
                SectionHeader('Pemandu Lokal', actionLabel: 'Semua', onAction: widget.onSearchTap),
                _HorizontalList(listings: guides, cardWidth: 230),
              ],
              if (data.destinations.isNotEmpty) ...[
                const SectionHeader('Destinasi'),
                _DestinationList(destinations: data.destinations),
              ],
              const SizedBox(height: AppSpace.x3),
            ],
          ),
        );
      },
    );
  }
}

/// Foto besar yang bergeser otomatis setiap 5 detik.
class _HeroCarousel extends StatefulWidget {
  final List<Listing> listings;

  const _HeroCarousel({required this.listings});

  @override
  State<_HeroCarousel> createState() => _HeroCarouselState();
}

class _HeroCarouselState extends State<_HeroCarousel> {
  final _controller = PageController();
  Timer? _timer;
  int _page = 0;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _timer?.cancel();
    // Tidak bergeser otomatis jika user mengaktifkan "kurangi gerakan".
    if (!MediaQuery.disableAnimationsOf(context) && widget.listings.length > 1) {
      _timer = Timer.periodic(const Duration(seconds: 5), (_) {
        if (!_controller.hasClients) return;
        final next = (_page + 1) % widget.listings.length;
        _controller.animateToPage(next, duration: AppMotion.slow, curve: Curves.easeInOutCubic);
      });
    }
  }

  @override
  void dispose() {
    _timer?.cancel();
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final user = context.watch<AuthProvider>().user;
    final height = MediaQuery.sizeOf(context).height * 0.62;

    if (widget.listings.isEmpty) return SizedBox(height: MediaQuery.paddingOf(context).top + 80);

    return SizedBox(
      height: height.clamp(420, 560),
      child: Stack(
        children: [
          PageView.builder(
            controller: _controller,
            itemCount: widget.listings.length,
            onPageChanged: (page) => setState(() => _page = page),
            itemBuilder: (context, index) {
              final listing = widget.listings[index];
              return GestureDetector(
                onTap: () => openListing(context, listing),
                child: Stack(
                  fit: StackFit.expand,
                  children: [
                    NetImage(listing.imageUrl),
                    const PhotoShade(),
                    Positioned(
                      left: AppSpace.gutter,
                      right: AppSpace.gutter,
                      bottom: AppSpace.xl + 12,
                      child: GlassPanel(
                        padding: const EdgeInsets.all(AppSpace.lg),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              '${listingTypeLabel(listing.type)} · ${listing.destinationName}'
                                  .toUpperCase(),
                              style: AppText.eyebrow,
                            ),
                            const SizedBox(height: AppSpace.xs),
                            Text(
                              listing.title,
                              style: AppText.h2,
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                            ),
                            const SizedBox(height: AppSpace.md),
                            Row(
                              children: [
                                Text(rupiah(listing.price), style: AppText.price),
                                Text(' ${priceUnit(listing)}', style: AppText.bodySm),
                                const Spacer(),
                                RatingText(rating: listing.rating, count: listing.reviewCount),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
          // Sapaan + logo di atas foto
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(AppSpace.gutter, AppSpace.md, AppSpace.gutter, 0),
              child: Row(
                children: [
                  const VitaLogo(size: 32, withBackground: false),
                  const SizedBox(width: AppSpace.sm),
                  Expanded(
                    child: Text(
                      'Halo, ${user?.name.split(' ').first ?? ''}',
                      style: AppText.title,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
            ),
          ),
          // Indikator halaman
          Positioned(
            left: 0,
            right: 0,
            bottom: AppSpace.md,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                for (var i = 0; i < widget.listings.length; i++)
                  AnimatedContainer(
                    duration: AppMotion.base,
                    curve: AppMotion.curve,
                    margin: const EdgeInsets.symmetric(horizontal: 3),
                    width: i == _page ? 20 : 6,
                    height: 2,
                    color: i == _page ? AppColors.accent : AppColors.white40,
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// Kotak pencarian yang membuka tab Jelajah.
class _SearchBox extends StatelessWidget {
  final VoidCallback onTap;

  const _SearchBox({required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      label: 'Cari trip atau pemandu',
      child: InkWell(
        onTap: onTap,
        borderRadius: AppRadius.small,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: AppSpace.lg, vertical: 15),
          decoration: BoxDecoration(
            color: AppColors.sunken,
            border: Border.all(color: AppColors.white20),
            borderRadius: AppRadius.small,
          ),
          child: Row(
            children: [
              const Icon(LucideIcons.search, size: 18, color: AppColors.white60),
              const SizedBox(width: AppSpace.md),
              Text(
                'Mau ke mana? Cari trip atau pemandu',
                style: AppText.body.copyWith(color: AppColors.white40),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _HorizontalList extends StatelessWidget {
  final List<Listing> listings;
  final double cardWidth;

  const _HorizontalList({required this.listings, required this.cardWidth});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 320,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: AppSpace.gutter),
        itemCount: listings.length,
        separatorBuilder: (context, index) => const SizedBox(width: AppSpace.md),
        itemBuilder: (context, index) => ListingCard(listing: listings[index], width: cardWidth),
      ),
    );
  }
}

class _DestinationList extends StatelessWidget {
  final List<Destination> destinations;

  const _DestinationList({required this.destinations});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 180,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: AppSpace.gutter),
        itemCount: destinations.length,
        separatorBuilder: (context, index) => const SizedBox(width: AppSpace.md),
        itemBuilder: (context, index) {
          final destination = destinations[index];
          return SizedBox(
            width: 150,
            child: ClipRRect(
              borderRadius: AppRadius.card,
              child: Stack(
                fit: StackFit.expand,
                children: [
                  NetImage(destination.imageUrl),
                  const PhotoShade(),
                  Positioned(
                    left: AppSpace.md,
                    right: AppSpace.md,
                    bottom: AppSpace.md,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(destination.name, style: AppText.title),
                        Text(
                          '${destination.listingCount} listing',
                          style: AppText.bodySm.copyWith(color: AppColors.white),
                        ),
                      ],
                    ),
                  ),
                  Positioned.fill(
                    child: Material(
                      color: Colors.transparent,
                      child: InkWell(
                        onTap: () => Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => ExploreScreen(initialDestination: destination),
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
