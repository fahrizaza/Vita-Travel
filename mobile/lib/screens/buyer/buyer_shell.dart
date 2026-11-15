import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../theme/app_theme.dart';
import '../shared/bookings_screen.dart';
import '../shared/profile_screen.dart';
import 'explore_screen.dart';
import 'home_screen.dart';
import 'wishlist_screen.dart';

/// Halaman utama buyer dengan bottom navigation 5 tab.
class BuyerShell extends StatefulWidget {
  const BuyerShell({super.key});

  @override
  State<BuyerShell> createState() => _BuyerShellState();
}

class _BuyerShellState extends State<BuyerShell> {
  int _index = 0;

  void _openTab(int index) => setState(() => _index = index);

  @override
  Widget build(BuildContext context) {
    final pages = [
      HomeScreen(onSearchTap: () => _openTab(1)),
      const ExploreScreen(),
      WishlistScreen(onExplore: () => _openTab(1)),
      const BookingsScreen(title: 'Pesanan Saya'),
      const ProfileScreen(),
    ];

    return Scaffold(
      // KeyedSubtree: halaman dibuat ulang setiap pindah tab sehingga datanya selalu terbaru.
      body: KeyedSubtree(key: ValueKey(_index), child: pages[_index]),
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          border: Border(top: BorderSide(color: AppColors.white10)),
        ),
        child: BottomNavigationBar(
          currentIndex: _index,
          onTap: _openTab,
          type: BottomNavigationBarType.fixed,
          backgroundColor: AppColors.canvas,
          elevation: 0,
          selectedItemColor: AppColors.accent,
          unselectedItemColor: AppColors.white60,
          selectedLabelStyle: AppText.label.copyWith(fontSize: 11),
          unselectedLabelStyle: AppText.label.copyWith(fontSize: 11),
          items: const [
            BottomNavigationBarItem(icon: Icon(LucideIcons.house, size: 22), label: 'Beranda'),
            BottomNavigationBarItem(icon: Icon(LucideIcons.compass, size: 22), label: 'Jelajah'),
            BottomNavigationBarItem(icon: Icon(LucideIcons.heart, size: 22), label: 'Favorit'),
            BottomNavigationBarItem(icon: Icon(LucideIcons.ticket, size: 22), label: 'Pesanan'),
            BottomNavigationBarItem(icon: Icon(LucideIcons.user, size: 22), label: 'Profil'),
          ],
        ),
      ),
    );
  }
}
