import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/user.dart';
import '../providers/wishlist_provider.dart';
import 'admin/admin_shell.dart';
import 'buyer/buyer_shell.dart';
import 'seller/seller_shell.dart';

/// Pembatasan tampilan per role: setiap role punya halaman utama sendiri.
Widget homeFor(User user) {
  return switch (user.role) {
    'admin' => const AdminShell(),
    'seller' => const SellerShell(),
    _ => const BuyerShell(),
  };
}

/// Buka halaman utama sesuai role dan hapus riwayat halaman sebelumnya (login/splash).
void openHome(BuildContext context, User user) {
  if (user.isBuyer) context.read<WishlistProvider>().load();
  Navigator.of(
    context,
  ).pushAndRemoveUntil(MaterialPageRoute(builder: (context) => homeFor(user)), (route) => false);
}
