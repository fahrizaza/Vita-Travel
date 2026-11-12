import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../models/master_data.dart';
import '../../services/api_service.dart';
import '../../services/master_service.dart';
import '../../theme/app_theme.dart';
import '../../utils/validators.dart';
import '../../widgets/app_button.dart';
import '../../widgets/app_text_field.dart';
import '../../widgets/dialogs.dart';
import '../../widgets/image_picker_field.dart';
import '../../widgets/photo.dart';
import '../../widgets/states.dart';

/// CRUD destinasi (dengan upload foto).
class DestinationsScreen extends StatefulWidget {
  const DestinationsScreen({super.key});

  @override
  State<DestinationsScreen> createState() => _DestinationsScreenState();
}

class _DestinationsScreenState extends State<DestinationsScreen> {
  late Future<List<Destination>> _future = MasterService.getDestinations();

  void _reload() => setState(() => _future = MasterService.getDestinations());

  Future<void> _openForm([Destination? destination]) async {
    final saved = await Navigator.push<bool>(
      context,
      MaterialPageRoute(builder: (context) => DestinationFormScreen(destination: destination)),
    );
    if (saved == true) _reload();
  }

  Future<void> _delete(Destination destination) async {
    final yes = await confirmDialog(
      context,
      title: 'Hapus destinasi?',
      message:
          'Destinasi "${destination.name}" akan dihapus. Destinasi yang masih dipakai listing tidak bisa dihapus.',
      confirmLabel: 'Hapus',
      danger: true,
    );
    if (!yes || !mounted) return;
    final ok = await runWithToast(
      context,
      () => MasterService.deleteDestination(destination.id),
      successMessage: 'Destinasi dihapus',
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
      body: AsyncBody<List<Destination>>(
        future: _future,
        onRetry: _reload,
        builder: (destinations) {
          if (destinations.isEmpty) {
            return const EmptyState(
              icon: LucideIcons.map,
              title: 'Belum ada destinasi',
              message: 'Tambahkan destinasi pertama.',
            );
          }
          return ListView.separated(
            padding: const EdgeInsets.only(bottom: 96),
            itemCount: destinations.length,
            separatorBuilder: (context, index) => const Divider(),
            itemBuilder: (context, index) {
              final destination = destinations[index];
              return ListTile(
                contentPadding: const EdgeInsets.fromLTRB(
                  AppSpace.gutter,
                  AppSpace.sm,
                  AppSpace.sm,
                  AppSpace.sm,
                ),
                leading: ClipRRect(
                  borderRadius: AppRadius.small,
                  child: NetImage(destination.imageUrl, width: 56, height: 56),
                ),
                title: Text(destination.name, style: AppText.title),
                subtitle: Text('${destination.region} · ${destination.listingCount} listing aktif'),
                trailing: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    IconButton(
                      tooltip: 'Ubah',
                      icon: const Icon(LucideIcons.pencil, size: 18),
                      onPressed: () => _openForm(destination),
                    ),
                    IconButton(
                      tooltip: 'Hapus',
                      icon: const Icon(LucideIcons.trash2, size: 18, color: AppColors.red),
                      onPressed: () => _delete(destination),
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

class DestinationFormScreen extends StatefulWidget {
  final Destination? destination;

  const DestinationFormScreen({super.key, this.destination});

  @override
  State<DestinationFormScreen> createState() => _DestinationFormScreenState();
}

class _DestinationFormScreenState extends State<DestinationFormScreen> {
  final _formKey = GlobalKey<FormState>();
  late final _name = TextEditingController(text: widget.destination?.name);
  late final _region = TextEditingController(text: widget.destination?.region);
  PickedImage? _image;
  String? _imageError;
  bool _saving = false;

  @override
  void dispose() {
    _name.dispose();
    _region.dispose();
    super.dispose();
  }

  Future<void> _save() async {
    final valid = _formKey.currentState!.validate();
    setState(
      () => _imageError = widget.destination == null && _image == null
          ? 'Foto destinasi wajib diupload'
          : null,
    );
    if (!valid || _imageError != null) return;

    setState(() => _saving = true);
    final ok = await runWithToast(
      context,
      () => MasterService.saveDestination(
        id: widget.destination?.id,
        name: _name.text.trim(),
        region: _region.text.trim(),
        image: _image,
      ),
      successMessage: 'Destinasi disimpan',
    );
    if (!mounted) return;
    setState(() => _saving = false);
    if (ok) Navigator.pop(context, true);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.destination == null ? 'Tambah Destinasi' : 'Ubah Destinasi'),
      ),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(AppSpace.gutter),
          children: [
            ImagePickerField(
              label: 'Foto destinasi',
              picked: _image,
              currentUrl: widget.destination?.imageUrl,
              errorText: _imageError,
              onPicked: (image) => setState(() {
                _image = image;
                _imageError = null;
              }),
            ),
            const SizedBox(height: AppSpace.lg),
            AppTextField(
              label: 'Nama destinasi',
              controller: _name,
              hint: 'Misalnya: Labuan Bajo',
              validator: Validators.minLength('Nama destinasi', 2),
            ),
            const SizedBox(height: AppSpace.lg),
            AppTextField(
              label: 'Wilayah (provinsi / negara)',
              controller: _region,
              hint: 'Misalnya: Nusa Tenggara Timur',
              validator: Validators.minLength('Wilayah', 2),
            ),
            const SizedBox(height: AppSpace.xl),
            AppButton(label: 'Simpan', onPressed: _save, loading: _saving, expand: true),
          ],
        ),
      ),
    );
  }
}
