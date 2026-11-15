import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../theme/app_theme.dart';
import 'app_button.dart';

/// Menampilkan loading / error / data dari sebuah Future (data dari API).
class AsyncBody<T> extends StatelessWidget {
  final Future<T> future;
  final Widget Function(T data) builder;
  final VoidCallback onRetry;

  const AsyncBody({super.key, required this.future, required this.builder, required this.onRetry});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<T>(
      future: future,
      builder: (context, snapshot) {
        if (snapshot.connectionState != ConnectionState.done) return const LoadingList();
        if (snapshot.hasError) {
          return ErrorState(message: snapshot.error.toString(), onRetry: onRetry);
        }
        return builder(snapshot.data as T);
      },
    );
  }
}

/// Kerangka abu-abu berkedip saat data sedang dimuat.
class LoadingList extends StatefulWidget {
  final int count;

  const LoadingList({super.key, this.count = 4});

  @override
  State<LoadingList> createState() => _LoadingListState();
}

class _LoadingListState extends State<LoadingList> with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 1100),
  );

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Hormati setelan "kurangi gerakan" di HP.
    if (MediaQuery.disableAnimationsOf(context)) {
      _controller.value = 0.5;
    } else if (!_controller.isAnimating) {
      _controller.repeat(reverse: true);
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: Tween(begin: 0.35, end: 0.8).animate(_controller),
      child: ListView.separated(
        physics: const NeverScrollableScrollPhysics(),
        padding: const EdgeInsets.all(AppSpace.gutter),
        itemCount: widget.count,
        separatorBuilder: (context, index) => const SizedBox(height: AppSpace.lg),
        itemBuilder: (context, index) => Row(
          children: [
            Container(width: 72, height: 72, color: AppColors.white10),
            const SizedBox(width: AppSpace.lg),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(height: 14, color: AppColors.white10),
                  const SizedBox(height: AppSpace.sm),
                  FractionallySizedBox(
                    widthFactor: 0.6,
                    child: Container(height: 12, color: AppColors.white10),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class EmptyState extends StatelessWidget {
  final IconData icon;
  final String title;
  final String message;
  final String? actionLabel;
  final VoidCallback? onAction;

  const EmptyState({
    super.key,
    required this.icon,
    required this.title,
    required this.message,
    this.actionLabel,
    this.onAction,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpace.x3),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 40, color: AppColors.white40),
            const SizedBox(height: AppSpace.lg),
            Text(title, style: AppText.h3, textAlign: TextAlign.center),
            const SizedBox(height: AppSpace.sm),
            Text(message, style: AppText.bodySm, textAlign: TextAlign.center),
            if (actionLabel != null) ...[
              const SizedBox(height: AppSpace.xl),
              AppButton(label: actionLabel!, onPressed: onAction, variant: ButtonVariant.secondary),
            ],
          ],
        ),
      ),
    );
  }
}

class ErrorState extends StatelessWidget {
  final String message;
  final VoidCallback onRetry;

  const ErrorState({super.key, required this.message, required this.onRetry});

  @override
  Widget build(BuildContext context) {
    return EmptyState(
      icon: LucideIcons.cloudOff,
      title: 'Gagal memuat data',
      message: message,
      actionLabel: 'Coba lagi',
      onAction: onRetry,
    );
  }
}
