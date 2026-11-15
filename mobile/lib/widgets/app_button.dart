import 'package:flutter/material.dart';

import '../theme/app_theme.dart';

enum ButtonVariant { primary, secondary, ghost, danger }

/// Tombol standar app. `loading: true` menampilkan spinner dan mencegah klik ganda.
class AppButton extends StatelessWidget {
  final String label;
  final VoidCallback? onPressed;
  final ButtonVariant variant;
  final IconData? icon;
  final bool loading;
  final bool expand;

  const AppButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.variant = ButtonVariant.primary,
    this.icon,
    this.loading = false,
    this.expand = false,
  });

  @override
  Widget build(BuildContext context) {
    final foreground = switch (variant) {
      ButtonVariant.primary => AppColors.onAccent,
      ButtonVariant.danger => AppColors.red,
      ButtonVariant.ghost => AppColors.accent,
      ButtonVariant.secondary => AppColors.white,
    };

    final Widget content = loading
        ? SizedBox(
            width: 20,
            height: 20,
            child: CircularProgressIndicator(strokeWidth: 2, color: foreground),
          )
        : Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (icon != null) ...[Icon(icon, size: 18), const SizedBox(width: AppSpace.sm)],
              Flexible(child: Text(label, overflow: TextOverflow.ellipsis)),
            ],
          );
    final onTap = loading ? null : onPressed;

    final Widget button = switch (variant) {
      ButtonVariant.primary => FilledButton(onPressed: onTap, child: content),
      ButtonVariant.secondary => OutlinedButton(onPressed: onTap, child: content),
      ButtonVariant.ghost => TextButton(onPressed: onTap, child: content),
      ButtonVariant.danger => OutlinedButton(
        onPressed: onTap,
        style: OutlinedButton.styleFrom(
          foregroundColor: AppColors.red,
          side: BorderSide(color: AppColors.red.withValues(alpha: 0.5)),
        ),
        child: content,
      ),
    };

    return expand ? SizedBox(width: double.infinity, child: button) : button;
  }
}
