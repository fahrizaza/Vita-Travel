import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../models/listing.dart';
import '../../models/master_data.dart';
import '../../services/listing_service.dart';
import '../../services/master_service.dart';
import '../../theme/app_theme.dart';
import '../../widgets/app_button.dart';
import '../../widgets/app_text_field.dart';
import '../../widgets/listing_card.dart';
import '../../widgets/states.dart';

/// Pilihan filter yang sedang aktif.
class ExploreFilter {
  int? categoryId;
  int? destinationId;
  int? minPrice;
  int? maxPrice;
  String sort = 'newest';

  int get activeCount =>
      [categoryId, destinationId, minPrice, maxPrice].where((value) => value != null).length +
      (sort == 'newest' ? 0 : 1);
}

/// Pencarian listing dengan filter jenis, kategori, destinasi, harga, dan urutan.
class ExploreScreen extends StatefulWidget {
  /// Diisi saat dibuka dari kartu destinasi di beranda.
  final Destination? initialDestination;

  const ExploreScreen({super.key, this.initialDestination});

  @override
  State<ExploreScreen> createState() => _ExploreScreenState();
}

class _ExploreScreenState extends State<ExploreScreen> {
  final _search = TextEditingController();
  final _filter = ExploreFilter();
  String? _type; // null = semua
  Timer? _debounce;
  late Future<List<Listing>> _future;

  @override
  void initState() {
    super.initState();
    _filter.destinationId = widget.initialDestination?.id;
    _future = _load();
  }

  @override
  void dispose() {
    _debounce?.cancel();
    _search.dispose();
    super.dispose();
  }

  Future<List<Listing>> _load() {
    return ListingService.getListings(
      search: _search.text.trim(),
      type: _type,
      categoryId: _filter.categoryId,
      destinationId: _filter.destinationId,
      minPrice: _filter.minPrice,
      maxPrice: _filter.maxPrice,
      sort: _filter.sort,
    );
  }

  void _reload() => setState(() => _future = _load());

  /// Tunggu user berhenti mengetik 400 ms sebelum mencari.
  void _onSearchChanged(String _) {
    _debounce?.cancel();
    _debounce = Timer(const Duration(milliseconds: 400), _reload);
  }

  Future<void> _openFilter() async {
    final applied = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      builder: (context) => _FilterSheet(filter: _filter),
    );
    if (applied == true) _reload();
  }

  @override
  Widget build(BuildContext context) {
    final standalone = widget.initialDestination != null;

    final content = SafeArea(
      bottom: false,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(AppSpace.gutter, AppSpace.lg, AppSpace.gutter, 0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (!standalone) ...[
                  Text('Jelajah', style: AppText.h1),
                  const SizedBox(height: AppSpace.lg),
                ],
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _search,
                        onChanged: _onSearchChanged,
                        style: AppText.body,
                        textInputAction: TextInputAction.search,
                        decoration: const InputDecoration(
                          hintText: 'Cari judul atau destinasi',
                          prefixIcon: Icon(LucideIcons.search, size: 18),
                        ),
                      ),
                    ),
                    const SizedBox(width: AppSpace.sm),
                    Badge(
                      isLabelVisible: _filter.activeCount > 0,
                      label: Text('${_filter.activeCount}'),
                      backgroundColor: AppColors.accent,
                      textColor: AppColors.onAccent,
                      child: SizedBox(
                        width: 52,
                        height: 52,
                        child: OutlinedButton(
                          onPressed: _openFilter,
                          style: OutlinedButton.styleFrom(
                            padding: EdgeInsets.zero,
                            minimumSize: const Size(52, 52),
                          ),
                          child: const Icon(LucideIcons.slidersHorizontal, size: 20),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: AppSpace.md),
                Wrap(
                  spacing: AppSpace.sm,
                  children: [
                    for (final option in const [
                      (null, 'Semua'),
                      ('trip', 'Paket Trip'),
                      ('guide', 'Pemandu'),
                    ])
                      ChoiceChip(
                        label: Text(option.$2),
                        selected: _type == option.$1,
                        onSelected: (_) {
                          setState(() => _type = option.$1);
                          _reload();
                        },
                      ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: AppSpace.md),
          Expanded(
            child: AsyncBody<List<Listing>>(
              future: _future,
              onRetry: _reload,
              builder: (listings) {
                if (listings.isEmpty) {
                  return const EmptyState(
                    icon: LucideIcons.searchX,
                    title: 'Tidak ada hasil',
                    message: 'Coba kata kunci lain atau ubah filter.',
                  );
                }
                return ListView.separated(
                  padding: const EdgeInsets.fromLTRB(
                    AppSpace.gutter,
                    AppSpace.sm,
                    AppSpace.gutter,
                    AppSpace.x3,
                  ),
                  itemCount: listings.length + 1,
                  separatorBuilder: (context, index) => const SizedBox(height: AppSpace.lg),
                  itemBuilder: (context, index) {
                    if (index == 0) {
                      return Text('${listings.length} hasil', style: AppText.bodySm);
                    }
                    return ListingCard(listing: listings[index - 1], height: 300);
                  },
                );
              },
            ),
          ),
        ],
      ),
    );

    if (!standalone) return content;
    return Scaffold(
      appBar: AppBar(title: Text('Destinasi ${widget.initialDestination!.name}')),
      body: content,
    );
  }
}

/// Lembar filter dari bawah layar.
class _FilterSheet extends StatefulWidget {
  final ExploreFilter filter;

  const _FilterSheet({required this.filter});

  @override
  State<_FilterSheet> createState() => _FilterSheetState();
}

class _FilterSheetState extends State<_FilterSheet> {
  late final Future<(List<Category>, List<Destination>)> _options = _loadOptions();
  late int? _categoryId = widget.filter.categoryId;
  late int? _destinationId = widget.filter.destinationId;
  late String _sort = widget.filter.sort;
  late final _minPrice = TextEditingController(text: widget.filter.minPrice?.toString() ?? '');
  late final _maxPrice = TextEditingController(text: widget.filter.maxPrice?.toString() ?? '');

  Future<(List<Category>, List<Destination>)> _loadOptions() async {
    return (await MasterService.getCategories(), await MasterService.getDestinations());
  }

  @override
  void dispose() {
    _minPrice.dispose();
    _maxPrice.dispose();
    super.dispose();
  }

  void _apply() {
    widget.filter
      ..categoryId = _categoryId
      ..destinationId = _destinationId
      ..minPrice = int.tryParse(_minPrice.text)
      ..maxPrice = int.tryParse(_maxPrice.text)
      ..sort = _sort;
    Navigator.pop(context, true);
  }

  void _reset() {
    setState(() {
      _categoryId = null;
      _destinationId = null;
      _sort = 'newest';
      _minPrice.clear();
      _maxPrice.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(bottom: MediaQuery.viewInsetsOf(context).bottom),
      child: FutureBuilder(
        future: _options,
        builder: (context, snapshot) {
          if (!snapshot.hasData) {
            return const SizedBox(height: 240, child: Center(child: CircularProgressIndicator()));
          }
          final (categories, destinations) = snapshot.data!;
          return SingleChildScrollView(
            padding: const EdgeInsets.fromLTRB(
              AppSpace.gutter,
              0,
              AppSpace.gutter,
              AppSpace.gutter,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  children: [
                    Expanded(child: Text('Filter', style: AppText.h3)),
                    TextButton(onPressed: _reset, child: const Text('Reset')),
                  ],
                ),
                const SizedBox(height: AppSpace.lg),
                AppDropdown<int?>(
                  label: 'Kategori',
                  value: _categoryId,
                  items: [
                    const DropdownMenuItem(value: null, child: Text('Semua kategori')),
                    for (final category in categories)
                      DropdownMenuItem(value: category.id, child: Text(category.name)),
                  ],
                  onChanged: (value) => setState(() => _categoryId = value),
                ),
                const SizedBox(height: AppSpace.lg),
                AppDropdown<int?>(
                  label: 'Destinasi',
                  value: _destinationId,
                  items: [
                    const DropdownMenuItem(value: null, child: Text('Semua destinasi')),
                    for (final destination in destinations)
                      DropdownMenuItem(value: destination.id, child: Text(destination.name)),
                  ],
                  onChanged: (value) => setState(() => _destinationId = value),
                ),
                const SizedBox(height: AppSpace.lg),
                Row(
                  children: [
                    Expanded(
                      child: AppTextField(
                        label: 'Harga min (Rp)',
                        controller: _minPrice,
                        keyboardType: TextInputType.number,
                        inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                      ),
                    ),
                    const SizedBox(width: AppSpace.md),
                    Expanded(
                      child: AppTextField(
                        label: 'Harga maks (Rp)',
                        controller: _maxPrice,
                        keyboardType: TextInputType.number,
                        inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: AppSpace.lg),
                AppDropdown<String>(
                  label: 'Urutkan',
                  value: _sort,
                  items: const [
                    DropdownMenuItem(value: 'newest', child: Text('Terbaru')),
                    DropdownMenuItem(value: 'rating', child: Text('Rating tertinggi')),
                    DropdownMenuItem(value: 'price_low', child: Text('Harga terendah')),
                    DropdownMenuItem(value: 'price_high', child: Text('Harga tertinggi')),
                  ],
                  onChanged: (value) => setState(() => _sort = value ?? 'newest'),
                ),
                const SizedBox(height: AppSpace.xl),
                AppButton(label: 'Terapkan filter', onPressed: _apply, expand: true),
              ],
            ),
          );
        },
      ),
    );
  }
}
