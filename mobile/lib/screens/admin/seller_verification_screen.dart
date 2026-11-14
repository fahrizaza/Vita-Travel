import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../services/admin_service.dart';
import '../../theme/app_theme.dart';
import '../../utils/format.dart';
import '../../widgets/app_button.dart';
import '../../widgets/common.dart';
import '../../widgets/dialogs.dart';
import '../../widgets/states.dart';

/// Admin menyetujui / menolak pendaftaran seller.
class SellerVerificationScreen extends StatelessWidget {
  const SellerVerificationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    const tabs = [('pending', 'Menunggu'), ('approved', 'Disetujui'), ('rejected', 'Ditolak')];
    return DefaultTabController(
      length: tabs.length,
      child: Column(
        children: [
          TabBar(tabs: [for (final tab in tabs) Tab(text: tab.$2)]),
          Expanded(
            child: TabBarView(children: [for (final tab in tabs) _SellerList(status: tab.$1)]),
          ),
        ],
      ),
    );
  }
}

class _SellerList extends StatefulWidget {
  final String status;

  const _SellerList({required this.status});

  @override
  State<_SellerList> createState() => _SellerListState();
}

class _SellerListState extends State<_SellerList> {
  late Future<List<Map<String, dynamic>>> _future = AdminService.getSellers(status: widget.status);

  void _reload() => setState(() => _future = AdminService.getSellers(status: widget.status));

  Future<void> _openDetail(Map<String, dynamic> seller) async {
    final changed = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      builder: (context) => _SellerDetailSheet(seller: seller),
    );
    if (changed == true) _reload();
  }

  @override
  Widget build(BuildContext context) {
    return AsyncBody<List<Map<String, dynamic>>>(
      future: _future,
      onRetry: _reload,
      builder: (sellers) {
        if (sellers.isEmpty) {
          return const EmptyState(
            icon: LucideIcons.shieldCheck,
            title: 'Tidak ada seller',
            message: 'Belum ada seller dengan status ini.',
          );
        }
        return RefreshIndicator(
          onRefresh: () async => _reload(),
          child: ListView.separated(
            itemCount: sellers.length,
            separatorBuilder: (context, index) => const Divider(),
            itemBuilder: (context, index) {
              final seller = sellers[index];
              return ListTile(
                contentPadding: const EdgeInsets.symmetric(
                  horizontal: AppSpace.gutter,
                  vertical: AppSpace.xs,
                ),
                leading: const Icon(LucideIcons.store),
                title: Text(seller['business_name'], style: AppText.title),
                subtitle: Text('${seller['name']} · ${seller['city']}'),
                trailing: const Icon(LucideIcons.chevronRight, size: 18),
                onTap: () => _openDetail(seller),
              );
            },
          ),
        );
      },
    );
  }
}

class _SellerDetailSheet extends StatefulWidget {
  final Map<String, dynamic> seller;

  const _SellerDetailSheet({required this.seller});

  @override
  State<_SellerDetailSheet> createState() => _SellerDetailSheetState();
}

class _SellerDetailSheetState extends State<_SellerDetailSheet> {
  bool _busy = false;

  Future<void> _verify(bool approve) async {
    String? reason;
    if (approve) {
      final yes = await confirmDialog(
        context,
        title: 'Setujui seller?',
        message: 'Seller bisa langsung membuat listing setelah disetujui.',
        confirmLabel: 'Setujui',
      );
      if (!yes) return;
    } else {
      reason = await textInputDialog(
        context,
        title: 'Tolak seller?',
        label: 'Alasan penolakan',
        confirmLabel: 'Tolak',
        danger: true,
      );
      if (reason == null) return;
    }
    if (!mounted) return;
    setState(() => _busy = true);
    final ok = await runWithToast(
      context,
      () => AdminService.verifySeller(widget.seller['id'], approve: approve, reason: reason),
      successMessage: approve ? 'Seller disetujui' : 'Seller ditolak',
    );
    if (!mounted) return;
    setState(() => _busy = false);
    if (ok) Navigator.pop(context, true);
  }

  @override
  Widget build(BuildContext context) {
    final seller = widget.seller;
    final status = seller['verification_status'] as String;

    return SafeArea(
      child: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(AppSpace.gutter, 0, AppSpace.gutter, AppSpace.gutter),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                Expanded(child: Text(seller['business_name'], style: AppText.h2)),
                StatusBadge(verificationStatus(status)),
              ],
            ),
            const SizedBox(height: AppSpace.lg),
            InfoRow('Pemilik', seller['name']),
            InfoRow('Email', seller['email']),
            InfoRow('No. HP', seller['phone'] ?? '-'),
            InfoRow('Kota', seller['city']),
            InfoRow('Deskripsi', seller['description'] ?? '-'),
            InfoRow(
              'Rekening',
              seller['bank_account_number'] == null
                  ? 'Belum diisi'
                  : '${seller['bank_name']} ${seller['bank_account_number']}\na.n. ${seller['bank_account_name']}',
            ),
            InfoRow('Jumlah listing', '${seller['listing_count']}'),
            if (seller['rejection_reason'] != null)
              InfoRow('Alasan ditolak', seller['rejection_reason']),
            const SizedBox(height: AppSpace.xl),
            if (status != 'approved')
              AppButton(
                label: 'Setujui',
                icon: LucideIcons.check,
                loading: _busy,
                onPressed: () => _verify(true),
              ),
            if (status != 'rejected') ...[
              const SizedBox(height: AppSpace.md),
              AppButton(
                label: 'Tolak',
                icon: LucideIcons.x,
                variant: ButtonVariant.danger,
                onPressed: _busy ? null : () => _verify(false),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
