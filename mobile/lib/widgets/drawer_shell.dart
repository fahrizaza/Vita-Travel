import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../screens/auth/login_screen.dart';
import '../theme/app_theme.dart';
import '../utils/format.dart';
import 'dialogs.dart';
import 'vita_logo.dart';

class DrawerItem {
  final IconData icon;
  final String label;
  final Widget page;

  const DrawerItem(this.icon, this.label, this.page);
}

/// Kerangka halaman seller & admin: AppBar + menu drawer di samping.
class DrawerShell extends StatefulWidget {
  final List<DrawerItem> items;

  const DrawerShell({super.key, required this.items});

  @override
  State<DrawerShell> createState() => _DrawerShellState();
}

class _DrawerShellState extends State<DrawerShell> {
  int _index = 0;

  Future<void> _logout() async {
    final yes = await confirmDialog(
      context,
      title: 'Keluar dari akun?',
      message: 'Anda perlu login lagi untuk membuka aplikasi.',
      confirmLabel: 'Keluar',
    );
    if (!yes || !mounted) return;
    await context.read<AuthProvider>().logout();
    if (!mounted) return;
    Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(builder: (context) => const LoginScreen()),
      (route) => false,
    );
  }

  @override
  Widget build(BuildContext context) {
    final user = context.watch<AuthProvider>().user!;
    final current = widget.items[_index];

    return Scaffold(
      appBar: AppBar(title: Text(current.label)),
      drawer: Drawer(
        child: SafeArea(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.all(AppSpace.gutter),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const VitaWordmark(),
                    const SizedBox(height: AppSpace.xl),
                    Text(user.seller?.businessName ?? user.name, style: AppText.title),
                    const SizedBox(height: AppSpace.xs),
                    Text('${roleLabel(user.role)} · ${user.email}', style: AppText.bodySm),
                  ],
                ),
              ),
              const Divider(),
              const SizedBox(height: AppSpace.sm),
              Expanded(
                child: ListView(
                  children: [
                    for (var i = 0; i < widget.items.length; i++)
                      ListTile(
                        leading: Icon(widget.items[i].icon, size: 20),
                        title: Text(widget.items[i].label),
                        selected: i == _index,
                        selectedTileColor: AppColors.white10,
                        shape: const Border(),
                        onTap: () {
                          setState(() => _index = i);
                          Navigator.pop(context); // tutup drawer
                        },
                      ),
                  ],
                ),
              ),
              const Divider(),
              ListTile(
                leading: const Icon(LucideIcons.logOut, size: 20),
                title: const Text('Keluar'),
                onTap: _logout,
              ),
              const SizedBox(height: AppSpace.sm),
            ],
          ),
        ),
      ),
      // KeyedSubtree: halaman dibuat ulang (data dimuat ulang) setiap pindah menu.
      body: KeyedSubtree(key: ValueKey(_index), child: current.page),
    );
  }
}
