import 'dart:async';

import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:provider/provider.dart';

import '../../providers/auth_provider.dart';
import '../../services/admin_service.dart';
import '../../theme/app_theme.dart';
import '../../utils/format.dart';
import '../../widgets/dialogs.dart';
import '../../widgets/states.dart';

/// Daftar user dengan filter role, admin bisa menonaktifkan / mengaktifkan akun.
class UsersScreen extends StatefulWidget {
  const UsersScreen({super.key});

  @override
  State<UsersScreen> createState() => _UsersScreenState();
}

class _UsersScreenState extends State<UsersScreen> {
  final _search = TextEditingController();
  Timer? _debounce;
  String? _role;
  late Future<List<Map<String, dynamic>>> _future = _load();

  Future<List<Map<String, dynamic>>> _load() =>
      AdminService.getUsers(role: _role, search: _search.text.trim());

  void _reload() => setState(() => _future = _load());

  @override
  void dispose() {
    _debounce?.cancel();
    _search.dispose();
    super.dispose();
  }

  Future<void> _setActive(Map<String, dynamic> user, bool active) async {
    if (!active) {
      final yes = await confirmDialog(
        context,
        title: 'Nonaktifkan akun?',
        message: '${user['name']} tidak akan bisa login sampai diaktifkan lagi.',
        confirmLabel: 'Nonaktifkan',
        danger: true,
      );
      if (!yes || !mounted) return;
    }
    final ok = await runWithToast(
      context,
      () => AdminService.setUserActive(user['id'], active),
      successMessage: active ? 'Akun diaktifkan' : 'Akun dinonaktifkan',
    );
    if (ok) _reload();
  }

  @override
  Widget build(BuildContext context) {
    final myId = context.watch<AuthProvider>().user!.id;
    const filters = [(null, 'Semua'), ('buyer', 'Buyer'), ('seller', 'Seller'), ('admin', 'Admin')];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(
            AppSpace.gutter,
            AppSpace.lg,
            AppSpace.gutter,
            AppSpace.sm,
          ),
          child: TextField(
            controller: _search,
            style: AppText.body,
            onChanged: (_) {
              _debounce?.cancel();
              _debounce = Timer(const Duration(milliseconds: 400), _reload);
            },
            decoration: const InputDecoration(
              hintText: 'Cari nama atau email',
              prefixIcon: Icon(LucideIcons.search, size: 18),
            ),
          ),
        ),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.symmetric(horizontal: AppSpace.gutter),
          child: Row(
            children: [
              for (final filter in filters)
                Padding(
                  padding: const EdgeInsets.only(right: AppSpace.sm),
                  child: ChoiceChip(
                    label: Text(filter.$2),
                    selected: _role == filter.$1,
                    onSelected: (_) {
                      _role = filter.$1;
                      _reload();
                    },
                  ),
                ),
            ],
          ),
        ),
        const SizedBox(height: AppSpace.sm),
        Expanded(
          child: AsyncBody<List<Map<String, dynamic>>>(
            future: _future,
            onRetry: _reload,
            builder: (users) {
              if (users.isEmpty) {
                return const EmptyState(
                  icon: LucideIcons.users,
                  title: 'Tidak ada user',
                  message: 'Ubah filter atau kata kunci.',
                );
              }
              return ListView.separated(
                itemCount: users.length,
                separatorBuilder: (context, index) => const Divider(),
                itemBuilder: (context, index) {
                  final user = users[index];
                  final isMe = user['id'] == myId;
                  return SwitchListTile(
                    contentPadding: const EdgeInsets.symmetric(horizontal: AppSpace.gutter),
                    title: Text(user['name'], style: AppText.title),
                    subtitle: Text('${roleLabel(user['role'])} · ${user['email']}'),
                    value: user['is_active'],
                    // Admin tidak bisa menonaktifkan akunnya sendiri.
                    onChanged: isMe ? null : (value) => _setActive(user, value),
                  );
                },
              );
            },
          ),
        ),
      ],
    );
  }
}
