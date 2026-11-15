import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../theme/app_theme.dart';

final _rupiah = NumberFormat.currency(locale: 'id_ID', symbol: 'Rp ', decimalDigits: 0);

/// 8500000 → "Rp 8.500.000"
String rupiah(num value) => _rupiah.format(value);

/// 8500000 → "8,5 jt" (untuk label grafik yang sempit)
String shortRupiah(num value) {
  String trim(double number) => number.toStringAsFixed(1).replaceAll('.0', '').replaceAll('.', ',');
  if (value >= 1e9) return '${trim(value / 1e9)} M';
  if (value >= 1e6) return '${trim(value / 1e6)} jt';
  if (value >= 1e3) return '${trim(value / 1e3)} rb';
  return value.toStringAsFixed(0);
}

/// "2026-12-03" → "3 Des 2026"
String formatDate(String date) => DateFormat('d MMM yyyy', 'id_ID').format(DateTime.parse(date));

/// DateTime → "Rabu, 3 Des 2026"
String formatDateLong(DateTime date) => DateFormat('EEEE, d MMM yyyy', 'id_ID').format(date);

/// DateTime → "2026-12-03" (format yang diterima API)
String toApiDate(DateTime date) => DateFormat('yyyy-MM-dd').format(date);

/// "2026-06" → "Jun"
String monthLabel(String yearMonth) =>
    DateFormat('MMM', 'id_ID').format(DateTime.parse('$yearMonth-01'));

String listingTypeLabel(String type) => type == 'trip' ? 'Paket Trip' : 'Pemandu';

/// Label + warna untuk badge status.
class StatusInfo {
  final String label;
  final Color color;
  const StatusInfo(this.label, this.color);
}

StatusInfo bookingStatus(String status) {
  return switch (status) {
    'pending_payment' => const StatusInfo('Menunggu Pembayaran', AppColors.amber),
    'waiting_verification' => const StatusInfo('Menunggu Verifikasi', AppColors.sky),
    'confirmed' => const StatusInfo('Dikonfirmasi', AppColors.green),
    'completed' => const StatusInfo('Selesai', AppColors.white60),
    _ => const StatusInfo('Dibatalkan', AppColors.red),
  };
}

StatusInfo listingStatus(String status) {
  return switch (status) {
    'active' => const StatusInfo('Aktif', AppColors.green),
    'inactive' => const StatusInfo('Nonaktif', AppColors.white60),
    _ => const StatusInfo('Ditangguhkan', AppColors.red),
  };
}

StatusInfo verificationStatus(String status) {
  return switch (status) {
    'approved' => const StatusInfo('Terverifikasi', AppColors.green),
    'pending' => const StatusInfo('Menunggu Verifikasi', AppColors.amber),
    _ => const StatusInfo('Ditolak', AppColors.red),
  };
}

String roleLabel(String role) {
  return switch (role) {
    'admin' => 'Admin',
    'seller' => 'Seller',
    _ => 'Buyer',
  };
}
