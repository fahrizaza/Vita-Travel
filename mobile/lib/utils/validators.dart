/// Validasi form di sisi app (aturannya sama dengan validasi di backend).
class Validators {
  static String? Function(String?) required(String label) {
    return (value) => (value == null || value.trim().isEmpty) ? '$label wajib diisi' : null;
  }

  static String? Function(String?) minLength(String label, int min) {
    return (value) {
      final text = value?.trim() ?? '';
      if (text.isEmpty) return '$label wajib diisi';
      if (text.length < min) return '$label minimal $min karakter';
      return null;
    };
  }

  static String? email(String? value) {
    final text = value?.trim() ?? '';
    if (text.isEmpty) return 'Email wajib diisi';
    if (!RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$').hasMatch(text)) return 'Format email tidak valid';
    return null;
  }

  static String? phone(String? value) {
    final text = value?.trim() ?? '';
    if (text.isEmpty) return 'Nomor HP wajib diisi';
    if (!RegExp(r'^(\+62|62|0)8\d{7,12}$').hasMatch(text)) {
      return 'Nomor HP tidak valid, contoh: 081234567890';
    }
    return null;
  }

  static String? password(String? value) {
    final text = value ?? '';
    if (text.isEmpty) return 'Password wajib diisi';
    if (text.length < 8) return 'Password minimal 8 karakter';
    if (!RegExp(r'[A-Za-z]').hasMatch(text)) return 'Password harus mengandung huruf';
    if (!RegExp(r'[0-9]').hasMatch(text)) return 'Password harus mengandung angka';
    return null;
  }

  static String? Function(String?) number(String label, {int min = 1, int? max}) {
    return (value) {
      final number = int.tryParse(value?.trim() ?? '');
      if (number == null) return '$label harus berupa angka';
      if (number < min) return '$label minimal $min';
      if (max != null && number > max) return '$label maksimal $max';
      return null;
    };
  }
}
