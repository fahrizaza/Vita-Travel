import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../models/listing.dart';
import '../../models/master_data.dart';
import '../../services/api_service.dart';
import '../../services/listing_service.dart';
import '../../services/master_service.dart';
import '../../theme/app_theme.dart';
import '../../utils/format.dart';
import '../../utils/validators.dart';
import '../../widgets/app_button.dart';
import '../../widgets/app_text_field.dart';
import '../../widgets/common.dart';
import '../../widgets/dialogs.dart';
import '../../widgets/image_picker_field.dart';
import '../../widgets/states.dart';

/// Form tambah / edit listing. Field menyesuaikan jenis: paket trip atau jasa pemandu.
class ListingFormScreen extends StatefulWidget {
  final Listing? listing; // null = tambah baru

  const ListingFormScreen({super.key, this.listing});

  @override
  State<ListingFormScreen> createState() => _ListingFormScreenState();
}

class _ListingFormScreenState extends State<ListingFormScreen> {
  final _formKey = GlobalKey<FormState>();
  late final Future<(List<Category>, List<Destination>)> _options = _loadOptions();

  late String _type = widget.listing?.type ?? 'trip';
  late final _title = TextEditingController(text: widget.listing?.title);
  late final _description = TextEditingController(text: widget.listing?.description);
  late final _price = TextEditingController(text: widget.listing?.price.toStringAsFixed(0));
  late final _quota = TextEditingController(text: widget.listing?.quota.toString());
  late final _duration = TextEditingController(text: widget.listing?.durationDays?.toString());
  late final _languages = TextEditingController(text: widget.listing?.languages);
  late final _includes = TextEditingController(text: widget.listing?.includes);
  late int? _categoryId = widget.listing?.categoryId;
  late int? _destinationId = widget.listing?.destinationId;
  late DateTime? _startDate = widget.listing?.startDate == null
      ? null
      : DateTime.parse(widget.listing!.startDate!);
  late bool _active = widget.listing?.status != 'inactive';
  PickedImage? _image;
  String? _imageError;
  String? _dateError;
  bool _saving = false;

  bool get _isEdit => widget.listing != null;
  bool get _isTrip => _type == 'trip';

  Future<(List<Category>, List<Destination>)> _loadOptions() async {
    return (await MasterService.getCategories(), await MasterService.getDestinations());
  }

  @override
  void dispose() {
    for (final controller in [
      _title,
      _description,
      _price,
      _quota,
      _duration,
      _languages,
      _includes,
    ]) {
      controller.dispose();
    }
    super.dispose();
  }

  Future<void> _pickDate() async {
    final today = DateTime.now();
    final picked = await showDatePicker(
      context: context,
      initialDate: _startDate != null && _startDate!.isAfter(today)
          ? _startDate!
          : today.add(const Duration(days: 7)),
      firstDate: today,
      lastDate: today.add(const Duration(days: 730)),
      helpText: 'Tanggal berangkat',
    );
    if (picked != null) setState(() => _startDate = picked);
  }

  Future<void> _save() async {
    final formValid = _formKey.currentState!.validate();
    setState(() {
      _imageError = !_isEdit && _image == null ? 'Foto listing wajib diupload' : null;
      _dateError = _isTrip && _startDate == null ? 'Tanggal berangkat wajib diisi' : null;
    });
    if (!formValid || _imageError != null || _dateError != null) return;

    final fields = {
      'type': _type,
      'title': _title.text.trim(),
      'description': _description.text.trim(),
      'price': _price.text.trim(),
      'quota': _quota.text.trim(),
      'category_id': '$_categoryId',
      'destination_id': '$_destinationId',
      'start_date': _isTrip ? toApiDate(_startDate!) : '',
      'duration_days': _isTrip ? _duration.text.trim() : '',
      'languages': _isTrip ? '' : _languages.text.trim(),
      'includes': _includes.text.trim(),
      'status': _active ? 'active' : 'inactive',
    };

    setState(() => _saving = true);
    try {
      await ListingService.saveListing(id: widget.listing?.id, fields: fields, image: _image);
      if (!mounted) return;
      showToast(context, _isEdit ? 'Listing berhasil diperbarui' : 'Listing berhasil ditambahkan');
      Navigator.pop(context, true);
    } on ApiException catch (error) {
      if (!mounted) return;
      showToast(context, error.message, error: true);
      setState(() => _saving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(_isEdit ? 'Edit Listing' : 'Tambah Listing')),
      body: FutureBuilder(
        future: _options,
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            return ErrorState(message: snapshot.error.toString(), onRetry: () => setState(() {}));
          }
          if (!snapshot.hasData) return const LoadingList();
          final (categories, destinations) = snapshot.data!;

          return Form(
            key: _formKey,
            child: ListView(
              padding: const EdgeInsets.all(AppSpace.gutter),
              children: [
                if (widget.listing?.status == 'suspended') ...[
                  NoticeBox(
                    title: 'Ditangguhkan admin',
                    message: widget.listing!.moderationNote ?? '-',
                    color: AppColors.red,
                  ),
                  const SizedBox(height: AppSpace.xl),
                ],
                Text('Jenis listing', style: AppText.label.copyWith(color: AppColors.white60)),
                const SizedBox(height: AppSpace.sm),
                SegmentedButton<String>(
                  segments: const [
                    ButtonSegment(
                      value: 'trip',
                      label: Text('Paket Trip'),
                      icon: Icon(LucideIcons.route, size: 18),
                    ),
                    ButtonSegment(
                      value: 'guide',
                      label: Text('Pemandu'),
                      icon: Icon(LucideIcons.user, size: 18),
                    ),
                  ],
                  selected: {_type},
                  onSelectionChanged: (value) => setState(() => _type = value.first),
                  style: SegmentedButton.styleFrom(
                    shape: const RoundedRectangleBorder(borderRadius: AppRadius.small),
                    side: const BorderSide(color: AppColors.white20),
                    selectedBackgroundColor: AppColors.accent,
                    selectedForegroundColor: AppColors.onAccent,
                  ),
                ),
                const SizedBox(height: AppSpace.xl),
                ImagePickerField(
                  label: 'Foto utama',
                  picked: _image,
                  currentUrl: widget.listing?.imageUrl,
                  errorText: _imageError,
                  onPicked: (image) => setState(() {
                    _image = image;
                    _imageError = null;
                  }),
                ),
                const SizedBox(height: AppSpace.lg),
                AppTextField(
                  label: 'Judul',
                  controller: _title,
                  hint: _isTrip
                      ? 'Misalnya: Open Trip 3 Hari Labuan Bajo'
                      : 'Misalnya: Pemandu Budaya Yogyakarta',
                  validator: Validators.minLength('Judul', 5),
                ),
                const SizedBox(height: AppSpace.lg),
                AppTextField(
                  label: 'Deskripsi',
                  controller: _description,
                  maxLines: 5,
                  hint: 'Ceritakan kegiatan, rute, dan hal menarik lainnya',
                  validator: Validators.minLength('Deskripsi', 20),
                ),
                const SizedBox(height: AppSpace.lg),
                AppDropdown<int>(
                  label: 'Kategori',
                  value: _categoryId,
                  hint: 'Pilih kategori',
                  items: [
                    for (final category in categories)
                      DropdownMenuItem(value: category.id, child: Text(category.name)),
                  ],
                  onChanged: (value) => setState(() => _categoryId = value),
                  validator: (value) => value == null ? 'Kategori wajib dipilih' : null,
                ),
                const SizedBox(height: AppSpace.lg),
                AppDropdown<int>(
                  label: 'Destinasi',
                  value: _destinationId,
                  hint: 'Pilih destinasi',
                  items: [
                    for (final destination in destinations)
                      DropdownMenuItem(
                        value: destination.id,
                        child: Text('${destination.name}, ${destination.region}'),
                      ),
                  ],
                  onChanged: (value) => setState(() => _destinationId = value),
                  validator: (value) => value == null ? 'Destinasi wajib dipilih' : null,
                ),
                const SizedBox(height: AppSpace.lg),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: AppTextField(
                        label: _isTrip ? 'Harga per orang (Rp)' : 'Harga per hari (Rp)',
                        controller: _price,
                        keyboardType: TextInputType.number,
                        inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                        validator: Validators.number('Harga', max: 1000000000),
                      ),
                    ),
                    const SizedBox(width: AppSpace.md),
                    Expanded(
                      child: AppTextField(
                        label: _isTrip ? 'Jumlah kursi' : 'Maks. orang/grup',
                        controller: _quota,
                        keyboardType: TextInputType.number,
                        inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                        validator: Validators.number('Kuota', max: 500),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: AppSpace.lg),
                if (_isTrip) ...[
                  Text(
                    'Tanggal berangkat',
                    style: AppText.label.copyWith(color: AppColors.white60),
                  ),
                  const SizedBox(height: AppSpace.sm),
                  OutlinedButton.icon(
                    onPressed: _pickDate,
                    icon: const Icon(LucideIcons.calendar, size: 18),
                    label: Text(_startDate == null ? 'Pilih tanggal' : formatDateLong(_startDate!)),
                    style: OutlinedButton.styleFrom(
                      alignment: Alignment.centerLeft,
                      side: BorderSide(
                        color: _dateError != null ? AppColors.red : AppColors.white20,
                      ),
                    ),
                  ),
                  if (_dateError != null)
                    Padding(
                      padding: const EdgeInsets.only(top: AppSpace.xs),
                      child: Text(
                        _dateError!,
                        style: AppText.bodySm.copyWith(color: AppColors.red),
                      ),
                    ),
                  const SizedBox(height: AppSpace.lg),
                  AppTextField(
                    label: 'Durasi (hari)',
                    controller: _duration,
                    keyboardType: TextInputType.number,
                    inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                    validator: Validators.number('Durasi', max: 60),
                  ),
                ] else
                  AppTextField(
                    label: 'Bahasa yang dikuasai',
                    controller: _languages,
                    hint: 'Misalnya: Indonesia, Inggris',
                    validator: Validators.required('Bahasa'),
                  ),
                const SizedBox(height: AppSpace.lg),
                AppTextField(
                  label: 'Fasilitas (satu per baris, opsional)',
                  controller: _includes,
                  maxLines: 4,
                  hint: 'Penginapan\nMakan 3x sehari\nTiket masuk',
                ),
                const SizedBox(height: AppSpace.lg),
                if (widget.listing?.status != 'suspended')
                  SwitchListTile(
                    contentPadding: EdgeInsets.zero,
                    title: const Text('Aktif'),
                    subtitle: const Text('Listing nonaktif tidak tampil di pencarian buyer'),
                    value: _active,
                    onChanged: (value) => setState(() => _active = value),
                  ),
                const SizedBox(height: AppSpace.xl),
                AppButton(label: 'Simpan', onPressed: _save, loading: _saving, expand: true),
              ],
            ),
          );
        },
      ),
    );
  }
}
