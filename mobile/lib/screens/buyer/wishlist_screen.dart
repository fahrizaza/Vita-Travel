import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:provider/provider.dart';

import '../../providers/wishlist_provider.dart';
import '../../theme/app_theme.dart';
import '../../widgets/listing_card.dart';
import '../../widgets/states.dart';

/// Daftar listing favorit (data dari WishlistProvider).
class WishlistScreen extends StatefulWidget {
  final VoidCallback onExplore;

  const WishlistScreen({super.key, required this.onExplore});

  @override
  State<WishlistScreen> createState() => _WishlistScreenState();
}

class _WishlistScreenState extends State<WishlistScreen> {
  @override
  void initState() {
    super.initState();
    // Muat ulang setiap kali tab dibuka.
    WidgetsBinding.instance.addPostFrameCallback((_) => context.read<WishlistProvider>().load());
  }

  @override
  Widget build(BuildContext context) {
    final wishlist = context.watch<WishlistProvider>();

    Widget body;
    if (wishlist.loading && wishlist.items.isEmpty) {
      body = const LoadingList();
    } else if (wishlist.error != null) {
      body = ErrorState(message: wishlist.error!, onRetry: wishlist.load);
    } else if (wishlist.items.isEmpty) {
      body = EmptyState(
        icon: LucideIcons.heart,
        title: 'Belum ada favorit',
        message: 'Ketuk ikon hati pada trip atau pemandu untuk menyimpannya di sini.',
        actionLabel: 'Mulai menjelajah',
        onAction: widget.onExplore,
      );
    } else {
      body = RefreshIndicator(
        onRefresh: wishlist.load,
        child: ListView.separated(
          padding: const EdgeInsets.fromLTRB(
            AppSpace.gutter,
            AppSpace.sm,
            AppSpace.gutter,
            AppSpace.x3,
          ),
          itemCount: wishlist.items.length,
          separatorBuilder: (context, index) => const SizedBox(height: AppSpace.lg),
          itemBuilder: (context, index) => ListingCard(listing: wishlist.items[index], height: 300),
        ),
      );
    }

    return SafeArea(
      bottom: false,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(
              AppSpace.gutter,
              AppSpace.lg,
              AppSpace.gutter,
              AppSpace.md,
            ),
            child: Text('Favorit', style: AppText.h1),
          ),
          Expanded(child: body),
        ],
      ),
    );
  }
}
