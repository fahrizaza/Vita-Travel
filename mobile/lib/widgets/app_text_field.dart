import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../theme/app_theme.dart';

/// Input teks dengan label di atasnya.
class AppTextField extends StatelessWidget {
  final String label;
  final TextEditingController? controller;
  final String? hint;
  final String? Function(String?)? validator;
  final TextInputType? keyboardType;
  final TextInputAction? textInputAction;
  final IconData? icon;
  final Widget? suffix;
  final bool obscureText;
  final int maxLines;
  final bool readOnly;
  final VoidCallback? onTap;
  final ValueChanged<String>? onChanged;
  final List<TextInputFormatter>? inputFormatters;
  final Iterable<String>? autofillHints;

  const AppTextField({
    super.key,
    required this.label,
    this.controller,
    this.hint,
    this.validator,
    this.keyboardType,
    this.textInputAction,
    this.icon,
    this.suffix,
    this.obscureText = false,
    this.maxLines = 1,
    this.readOnly = false,
    this.onTap,
    this.onChanged,
    this.inputFormatters,
    this.autofillHints,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: AppText.label.copyWith(color: AppColors.white60)),
        const SizedBox(height: AppSpace.sm),
        TextFormField(
          controller: controller,
          validator: validator,
          // Pesan error diperbarui saat user mengetik (hilang begitu input sudah benar).
          autovalidateMode: AutovalidateMode.onUserInteraction,
          keyboardType: keyboardType,
          textInputAction: textInputAction,
          obscureText: obscureText,
          maxLines: maxLines,
          readOnly: readOnly,
          onTap: onTap,
          onChanged: onChanged,
          inputFormatters: inputFormatters,
          autofillHints: autofillHints,
          style: AppText.body,
          cursorColor: AppColors.accent,
          decoration: InputDecoration(
            hintText: hint,
            prefixIcon: icon == null ? null : Icon(icon, size: 18),
            suffixIcon: suffix,
          ),
        ),
      ],
    );
  }
}

/// Input password dengan tombol tampil/sembunyi.
class PasswordField extends StatefulWidget {
  final String label;
  final TextEditingController controller;
  final String? Function(String?)? validator;
  final TextInputAction? textInputAction;

  const PasswordField({
    super.key,
    required this.controller,
    this.label = 'Password',
    this.validator,
    this.textInputAction,
  });

  @override
  State<PasswordField> createState() => _PasswordFieldState();
}

class _PasswordFieldState extends State<PasswordField> {
  bool _hidden = true;

  @override
  Widget build(BuildContext context) {
    return AppTextField(
      label: widget.label,
      controller: widget.controller,
      validator: widget.validator,
      textInputAction: widget.textInputAction,
      icon: LucideIcons.lock,
      obscureText: _hidden,
      autofillHints: const [AutofillHints.password],
      suffix: IconButton(
        tooltip: _hidden ? 'Tampilkan password' : 'Sembunyikan password',
        icon: Icon(_hidden ? LucideIcons.eye : LucideIcons.eyeOff, size: 18),
        onPressed: () => setState(() => _hidden = !_hidden),
      ),
    );
  }
}

/// Pilihan dropdown dengan gaya yang sama seperti AppTextField.
class AppDropdown<T> extends StatelessWidget {
  final String label;
  final T? value;
  final List<DropdownMenuItem<T>> items;
  final ValueChanged<T?> onChanged;
  final String? Function(T?)? validator;
  final String? hint;

  const AppDropdown({
    super.key,
    required this.label,
    required this.value,
    required this.items,
    required this.onChanged,
    this.validator,
    this.hint,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: AppText.label.copyWith(color: AppColors.white60)),
        const SizedBox(height: AppSpace.sm),
        DropdownButtonFormField<T>(
          initialValue: value,
          items: items,
          onChanged: onChanged,
          validator: validator,
          autovalidateMode: AutovalidateMode.onUserInteraction,
          hint: hint == null
              ? null
              : Text(hint!, style: AppText.body.copyWith(color: AppColors.white40)),
          dropdownColor: AppColors.sunken,
          style: AppText.body,
          icon: const Icon(LucideIcons.chevronDown, size: 18),
          isExpanded: true,
        ),
      ],
    );
  }
}
