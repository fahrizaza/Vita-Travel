import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../models/listing.dart';
import '../../services/listing_service.dart';
import '../../theme/app_theme.dart';
import '../../widgets/dialogs.dart';
import '../../widgets/listing_card.dart';
import '../../widgets/states.dart';
import 'listing_form_screen.dart';

/// CRUD listing milik seller: tambah, edit, aktif/nonaktif, hapus.
class MyListingsScreen extends StatefulWidget {
  const MyListingsScreen({super.key});

  @override
  State<MyListingsScreen> createState() => _MyListingsScreenState();
}

class _MyListingsScreenState extends State<MyListingsScreen> {
  late Future<List<Listing>> _future = ListingService.getMyListings();

  void _reload() => setState(() => _future = ListingService.getMyListings());

  Future<void> _openForm([Listing? listing]) async {
    final saved = await Navigator.push<bool>(
      context,
      MaterialPageRoute(builder: (context) => ListingFormScreen(listing: listing)),
    );
    if (saved == true) _reload();
  }

  Future<void> _toggleActive(Listing listing) async {
    final activate = listing.status == 'inactive';
    final ok = await runWithToast(
      context,
      () => ListingService.saveListing(
        id: listing.id,
        fields: ListingService.fieldsFrom(listing, status: activate ? 'active' : 'inactive'),
      ),
      successMessage: activate ? 'Listing diaktifkan' : 'Listing dinonaktifkan',
    );
    if (ok) _reload();
  }

  Future<void> _delete(Listing listing) async {
    final yes = await confirmDialog(
      context,
      title: 'Hapus listing?',
      message: '"${listing.title}" akan dihapus permanen beserta fotonya.',
      confirmLabel: 'Hapus',
      danger: true,
    );
    if (!yes || !mounted) return;
    final ok = await runWithToast(
      context,
      () => ListingService.deleteListing(listing.id),
      successMessage: 'Listing dihapus',
    );
    if (ok) _reload();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _openForm(),
        icon: const Icon(LucideIcons.plus),
        label: const Text('Tambah listing'),
      ),
      body: AsyncBody<List<Listing>>(
        future: _future,
        onRetry: _reload,
        builder: (listings) {
          if (listings.isEmpty) {
            return EmptyState(
              icon: LucideIcons.package,
              title: 'Belum ada listing',
              message: 'Tambahkan paket trip atau jasa pemandu pertama Anda.',
              actionLabel: 'Tambah listing',
              onAction: () => _openForm(),
            );
          }
          return RefreshIndicator(
            onRefresh: () async => _reload(),
            child: ListView.builder(
              padding: const EdgeInsets.only(bottom: 96),
              itemCount: listings.length,
              itemBuilder: (context, index) {
                final listing = listings[index];
                return ListingRow(
                  listing: listing,
                  onTap: () => openListing(context, listing),
                  trailing: PopupMenuButton<String>(
                    tooltip: 'Aksi',
                    icon: const Icon(LucideIcons.ellipsisVertical, size: 20),
                    onSelected: (action) {
                      if (action == 'edit') _openForm(listing);
                      if (action == 'toggle') _toggleActive(listing);
                      if (action == 'delete') _delete(listing);
                    },
                    itemBuilder: (context) => [
                      const PopupMenuItem(value: 'edit', child: Text('Edit')),
                      if (listing.status != 'suspended')
                        PopupMenuItem(
                          value: 'toggle',
                          child: Text(listing.status == 'active' ? 'Nonaktifkan' : 'Aktifkan'),
                        ),
                      PopupMenuItem(
                        value: 'delete',
                        child: Text('Hapus', style: AppText.body.copyWith(color: AppColors.red)),
                      ),
                    ],
                  ),
                );
              },
            ),
          );
        },
      ),
    );
  }
}
