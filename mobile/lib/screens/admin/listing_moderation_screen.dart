import 'dart:async';

import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../models/listing.dart';
import '../../services/admin_service.dart';
import '../../theme/app_theme.dart';
import '../../widgets/listing_card.dart';
import '../../widgets/states.dart';

/// Semua listing di platform. Buka detail untuk menangguhkan / memulihkan.
class ListingModerationScreen extends StatefulWidget {
  const ListingModerationScreen({super.key});

  @override
  State<ListingModerationScreen> createState() => _ListingModerationScreenState();
}

class _ListingModerationScreenState extends State<ListingModerationScreen> {
  final _search = TextEditingController();
  Timer? _debounce;
  String? _status;
  late Future<List<Listing>> _future = _load();

  Future<List<Listing>> _load() =>
      AdminService.getListings(status: _status, search: _search.text.trim());

  void _reload() => setState(() => _future = _load());

  @override
  void dispose() {
    _debounce?.cancel();
    _search.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    const filters = [
      (null, 'Semua'),
      ('active', 'Aktif'),
      ('inactive', 'Nonaktif'),
      ('suspended', 'Ditangguhkan'),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(
            AppSpace.gutter,
            AppSpace.lg,
            AppSpace.gutter,
            AppSpace.sm,
          ),
          child: TextField(
            controller: _search,
            style: AppText.body,
            onChanged: (_) {
              _debounce?.cancel();
              _debounce = Timer(const Duration(milliseconds: 400), _reload);
            },
            decoration: const InputDecoration(
              hintText: 'Cari judul atau nama seller',
              prefixIcon: Icon(LucideIcons.search, size: 18),
            ),
          ),
        ),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.symmetric(horizontal: AppSpace.gutter),
          child: Row(
            children: [
              for (final filter in filters)
                Padding(
                  padding: const EdgeInsets.only(right: AppSpace.sm),
                  child: ChoiceChip(
                    label: Text(filter.$2),
                    selected: _status == filter.$1,
                    onSelected: (_) {
                      _status = filter.$1;
                      _reload();
                    },
                  ),
                ),
            ],
          ),
        ),
        const SizedBox(height: AppSpace.sm),
        Expanded(
          child: AsyncBody<List<Listing>>(
            future: _future,
            onRetry: _reload,
            builder: (listings) {
              if (listings.isEmpty) {
                return const EmptyState(
                  icon: LucideIcons.package,
                  title: 'Tidak ada listing',
                  message: 'Ubah filter atau kata kunci.',
                );
              }
              return RefreshIndicator(
                onRefresh: () async => _reload(),
                child: ListView.builder(
                  itemCount: listings.length,
                  itemBuilder: (context, index) => ListingRow(
                    listing: listings[index],
                    showSeller: true,
                    onTap: () async {
                      openListing(context, listings[index]);
                    },
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
