import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:provider/provider.dart';

import '../../providers/auth_provider.dart';
import '../../theme/app_theme.dart';
import '../../utils/format.dart';
import '../../widgets/app_button.dart';
import '../../widgets/common.dart';
import '../../widgets/dialogs.dart';
import '../../widgets/drawer_shell.dart';
import '../../widgets/vita_logo.dart';
import '../auth/login_screen.dart';
import '../shared/bookings_screen.dart';
import '../shared/profile_screen.dart';
import 'business_profile_screen.dart';
import 'my_listings_screen.dart';
import 'sales_report_screen.dart';
import 'seller_dashboard_screen.dart';

/// Halaman utama seller. Seller yang belum disetujui admin hanya melihat halaman status verifikasi.
class SellerShell extends StatelessWidget {
  const SellerShell({super.key});

  @override
  Widget build(BuildContext context) {
    final seller = context.watch<AuthProvider>().user!.seller!;
    if (!seller.isApproved) return const _VerificationGate();

    return const DrawerShell(
      items: [
        DrawerItem(LucideIcons.layoutDashboard, 'Dashboard', SellerDashboardScreen()),
        DrawerItem(LucideIcons.package, 'Listing Saya', MyListingsScreen()),
        DrawerItem(LucideIcons.ticket, 'Pesanan Masuk', BookingsScreen()),
        DrawerItem(LucideIcons.chartColumn, 'Laporan Penjualan', SalesReportScreen()),
        DrawerItem(LucideIcons.store, 'Profil Usaha', BusinessProfileScreen()),
        DrawerItem(LucideIcons.user, 'Akun', ProfileScreen()),
      ],
    );
  }
}

/// Ditampilkan selama akun seller berstatus pending / rejected.
class _VerificationGate extends StatefulWidget {
  const _VerificationGate();

  @override
  State<_VerificationGate> createState() => _VerificationGateState();
}

class _VerificationGateState extends State<_VerificationGate> {
  bool _checking = false;

  Future<void> _checkAgain() async {
    setState(() => _checking = true);
    final auth = context.read<AuthProvider>();
    await runWithToast(context, auth.refreshUser);
    if (!mounted) return;
    setState(() => _checking = false);
    if (auth.user?.seller?.isApproved == false) {
      showToast(
        context,
        'Akun masih ${verificationStatus(auth.user!.seller!.verificationStatus).label.toLowerCase()}',
      );
    }
  }

  Future<void> _logout() async {
    await context.read<AuthProvider>().logout();
    if (!mounted) return;
    Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(builder: (context) => const LoginScreen()),
      (route) => false,
    );
  }

  @override
  Widget build(BuildContext context) {
    final seller = context.watch<AuthProvider>().user!.seller!;
    final rejected = seller.verificationStatus == 'rejected';

    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(AppSpace.gutter),
          children: [
            const VitaWordmark(),
            const SizedBox(height: AppSpace.x4),
            Icon(
              rejected ? LucideIcons.circleX : LucideIcons.clock,
              size: 40,
              color: rejected ? AppColors.red : AppColors.amber,
            ),
            const SizedBox(height: AppSpace.lg),
            Text(rejected ? 'Verifikasi ditolak' : 'Menunggu verifikasi', style: AppText.h1),
            const SizedBox(height: AppSpace.sm),
            Text(
              rejected
                  ? 'Perbaiki data usaha Anda, lalu simpan untuk mengajukan verifikasi ulang.'
                  : 'Admin sedang memeriksa data usaha "${seller.businessName}". Sambil menunggu, '
                        'lengkapi rekening bank agar buyer bisa membayar.',
              style: AppText.body.copyWith(color: AppColors.white60),
            ),
            if (rejected && seller.rejectionReason != null) ...[
              const SizedBox(height: AppSpace.xl),
              NoticeBox(
                title: 'Alasan penolakan',
                message: seller.rejectionReason!,
                color: AppColors.red,
                icon: LucideIcons.circleAlert,
              ),
            ],
            const SizedBox(height: AppSpace.xxl),
            AppButton(
              label: 'Lengkapi profil usaha',
              icon: LucideIcons.store,
              expand: true,
              onPressed: () => Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => Scaffold(
                    appBar: AppBar(title: const Text('Profil Usaha')),
                    body: const BusinessProfileScreen(),
                  ),
                ),
              ),
            ),
            const SizedBox(height: AppSpace.md),
            AppButton(
              label: 'Cek status lagi',
              icon: LucideIcons.refreshCw,
              variant: ButtonVariant.secondary,
              expand: true,
              loading: _checking,
              onPressed: _checkAgain,
            ),
            const SizedBox(height: AppSpace.md),
            AppButton(
              label: 'Keluar',
              variant: ButtonVariant.ghost,
              expand: true,
              onPressed: _logout,
            ),
          ],
        ),
      ),
    );
  }
}
