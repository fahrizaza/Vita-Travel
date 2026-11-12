import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../widgets/drawer_shell.dart';
import '../shared/profile_screen.dart';
import 'admin_dashboard_screen.dart';
import 'categories_screen.dart';
import 'destinations_screen.dart';
import 'listing_moderation_screen.dart';
import 'seller_verification_screen.dart';
import 'users_screen.dart';

/// Halaman utama admin dengan menu drawer.
class AdminShell extends StatelessWidget {
  const AdminShell({super.key});

  @override
  Widget build(BuildContext context) {
    return const DrawerShell(
      items: [
        DrawerItem(LucideIcons.layoutDashboard, 'Dashboard', AdminDashboardScreen()),
        DrawerItem(LucideIcons.shieldCheck, 'Verifikasi Seller', SellerVerificationScreen()),
        DrawerItem(LucideIcons.tags, 'Kategori', CategoriesScreen()),
        DrawerItem(LucideIcons.map, 'Destinasi', DestinationsScreen()),
        DrawerItem(LucideIcons.package, 'Moderasi Listing', ListingModerationScreen()),
        DrawerItem(LucideIcons.users, 'Kelola User', UsersScreen()),
        DrawerItem(LucideIcons.user, 'Akun', ProfileScreen()),
      ],
    );
  }
}
