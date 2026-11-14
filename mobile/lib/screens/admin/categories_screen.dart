import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../models/master_data.dart';
import '../../services/master_service.dart';
import '../../theme/app_theme.dart';
import '../../widgets/dialogs.dart';
import '../../widgets/states.dart';

/// CRUD kategori listing.
class CategoriesScreen extends StatefulWidget {
  const CategoriesScreen({super.key});

  @override
  State<CategoriesScreen> createState() => _CategoriesScreenState();
}

class _CategoriesScreenState extends State<CategoriesScreen> {
  late Future<List<Category>> _future = MasterService.getCategories();

  void _reload() => setState(() => _future = MasterService.getCategories());

  Future<void> _openForm([Category? category]) async {
    final name = await textInputDialog(
      context,
      title: category == null ? 'Tambah kategori' : 'Ubah kategori',
      label: 'Nama kategori',
      initialValue: category?.name ?? '',
      confirmLabel: 'Simpan',
    );
    if (name == null || !mounted) return;
    if (name.length < 3) {
      showToast(context, 'Nama kategori minimal 3 karakter', error: true);
      return;
    }
    final ok = await runWithToast(
      context,
      () => MasterService.saveCategory(id: category?.id, name: name),
      successMessage: category == null ? 'Kategori ditambahkan' : 'Kategori diperbarui',
    );
    if (ok) _reload();
  }

  Future<void> _delete(Category category) async {
    final yes = await confirmDialog(
      context,
      title: 'Hapus kategori?',
      message:
          'Kategori "${category.name}" akan dihapus. Kategori yang masih dipakai listing tidak bisa dihapus.',
      confirmLabel: 'Hapus',
      danger: true,
    );
    if (!yes || !mounted) return;
    final ok = await runWithToast(
      context,
      () => MasterService.deleteCategory(category.id),
      successMessage: 'Kategori dihapus',
    );
    if (ok) _reload();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _openForm(),
        icon: const Icon(LucideIcons.plus),
        label: const Text('Tambah'),
      ),
      body: AsyncBody<List<Category>>(
        future: _future,
        onRetry: _reload,
        builder: (categories) {
          if (categories.isEmpty) {
            return const EmptyState(
              icon: LucideIcons.tags,
              title: 'Belum ada kategori',
              message: 'Tambahkan kategori pertama.',
            );
          }
          return ListView.separated(
            padding: const EdgeInsets.only(bottom: 96),
            itemCount: categories.length,
            separatorBuilder: (context, index) => const Divider(),
            itemBuilder: (context, index) {
              final category = categories[index];
              return ListTile(
                contentPadding: const EdgeInsets.only(left: AppSpace.gutter, right: AppSpace.sm),
                title: Text(category.name, style: AppText.title),
                subtitle: Text('${category.listingCount} listing'),
                trailing: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    IconButton(
                      tooltip: 'Ubah',
                      icon: const Icon(LucideIcons.pencil, size: 18),
                      onPressed: () => _openForm(category),
                    ),
                    IconButton(
                      tooltip: 'Hapus',
                      icon: const Icon(LucideIcons.trash2, size: 18, color: AppColors.red),
                      onPressed: () => _delete(category),
                    ),
                  ],
                ),
              );
            },
          );
        },
      ),
    );
  }
}
