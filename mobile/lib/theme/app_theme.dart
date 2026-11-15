import 'package:flutter/material.dart';

/// Warna Vita Travel (diambil dari token website: --brand-green, --brand-accent, --white-xx).
class AppColors {
  static const canvas = Color(0xFF0D2E37); // latar utama (teal gelap)
  static const sunken = Color(0xFF0A252C); // input, drawer, dialog
  static const iconMuted = Color(0xFF3D585F);

  static const white = Color(0xFFFFFFFF);
  static const white60 = Color(0x99FFFFFF); // teks sekunder
  static const white40 = Color(0x66FFFFFF); // placeholder / nonaktif
  static const white20 = Color(0x33FFFFFF); // garis tegas
  static const white10 = Color(0x1AFFFFFF); // garis pemisah

  static const accent = Color(0xFFFB9826); // oranye: tombol utama
  static const accentPressed = Color(0xFFFA8805);
  static const onAccent = canvas; // teks di atas oranye (putih tidak lolos kontras)

  // Warna status, semuanya kontras >= 4.5:1 di atas canvas
  static const amber = Color(0xFFF5B841);
  static const sky = Color(0xFF6CC4F5);
  static const green = Color(0xFF4CD39B);
  static const red = Color(0xFFFF6B6B);
}

/// Skala tipografi Plus Jakarta Sans.
class AppText {
  static const _font = 'PlusJakartaSans';

  static const display = TextStyle(
    fontFamily: _font,
    fontSize: 40,
    height: 1.1,
    fontWeight: FontWeight.w700,
    letterSpacing: -0.8,
    color: AppColors.white,
  );
  static const h1 = TextStyle(
    fontFamily: _font,
    fontSize: 32,
    height: 1.18,
    fontWeight: FontWeight.w700,
    letterSpacing: -0.5,
    color: AppColors.white,
  );
  static const h2 = TextStyle(
    fontFamily: _font,
    fontSize: 24,
    height: 1.25,
    fontWeight: FontWeight.w700,
    letterSpacing: -0.3,
    color: AppColors.white,
  );
  static const h3 = TextStyle(
    fontFamily: _font,
    fontSize: 20,
    height: 1.3,
    fontWeight: FontWeight.w600,
    color: AppColors.white,
  );
  static const title = TextStyle(
    fontFamily: _font,
    fontSize: 17,
    height: 1.4,
    fontWeight: FontWeight.w600,
    color: AppColors.white,
  );
  static const body = TextStyle(
    fontFamily: _font,
    fontSize: 15,
    height: 1.47,
    fontWeight: FontWeight.w400,
    color: AppColors.white,
  );
  static const bodySm = TextStyle(
    fontFamily: _font,
    fontSize: 13,
    height: 1.4,
    fontWeight: FontWeight.w400,
    color: AppColors.white60,
  );
  static const label = TextStyle(
    fontFamily: _font,
    fontSize: 13,
    height: 1.3,
    fontWeight: FontWeight.w600,
    color: AppColors.white,
  );

  /// Label kecil huruf kapital (seperti label section di website).
  static const eyebrow = TextStyle(
    fontFamily: _font,
    fontSize: 12,
    height: 1.33,
    fontWeight: FontWeight.w600,
    letterSpacing: 1,
    color: AppColors.white60,
  );

  /// Angka/harga: digit sama lebar supaya rapi saat disusun.
  static const price = TextStyle(
    fontFamily: _font,
    fontSize: 17,
    height: 1.3,
    fontWeight: FontWeight.w700,
    color: AppColors.white,
    fontFeatures: [FontFeature.tabularFigures()],
  );
}

/// Jarak (kelipatan 4).
class AppSpace {
  static const xs = 4.0;
  static const sm = 8.0;
  static const md = 12.0;
  static const lg = 16.0;
  static const gutter = 20.0; // jarak tepi layar
  static const xl = 24.0;
  static const xxl = 32.0;
  static const x3 = 40.0;
  static const x4 = 56.0;
}

/// Sudut tegas: 2px untuk tombol/input/badge, 4px untuk kartu & panel.
class AppRadius {
  static const small = BorderRadius.all(Radius.circular(2));
  static const card = BorderRadius.all(Radius.circular(4));
}

/// Durasi animasi.
class AppMotion {
  static const fast = Duration(milliseconds: 150);
  static const base = Duration(milliseconds: 250);
  static const slow = Duration(milliseconds: 400);
  static const curve = Curves.easeOutCubic;
}

ThemeData buildAppTheme() {
  const scheme = ColorScheme.dark(
    primary: AppColors.accent,
    onPrimary: AppColors.onAccent,
    secondary: AppColors.accent,
    onSecondary: AppColors.onAccent,
    surface: AppColors.canvas,
    onSurface: AppColors.white,
    error: AppColors.red,
    onError: AppColors.canvas,
    outline: AppColors.white20,
    outlineVariant: AppColors.white10,
  );

  const buttonShape = RoundedRectangleBorder(borderRadius: AppRadius.small);
  const buttonSize = Size(64, 52);
  final buttonText = AppText.label.copyWith(fontSize: 15);

  OutlineInputBorder border(Color color, [double width = 1]) => OutlineInputBorder(
    borderRadius: AppRadius.small,
    borderSide: BorderSide(color: color, width: width),
  );

  return ThemeData(
    useMaterial3: true,
    brightness: Brightness.dark,
    colorScheme: scheme,
    fontFamily: 'PlusJakartaSans',
    scaffoldBackgroundColor: AppColors.canvas,
    splashFactory: InkRipple.splashFactory,
    textTheme: const TextTheme(
      displayLarge: AppText.display,
      headlineLarge: AppText.h1,
      headlineMedium: AppText.h2,
      headlineSmall: AppText.h3,
      titleLarge: AppText.h3,
      titleMedium: AppText.title,
      titleSmall: AppText.label,
      bodyLarge: AppText.body,
      bodyMedium: AppText.body,
      bodySmall: AppText.bodySm,
      labelLarge: AppText.label,
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: AppColors.canvas,
      surfaceTintColor: Colors.transparent,
      foregroundColor: AppColors.white,
      elevation: 0,
      scrolledUnderElevation: 0,
      centerTitle: false,
      titleTextStyle: AppText.title,
      shape: Border(bottom: BorderSide(color: AppColors.white10)),
    ),
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        backgroundColor: AppColors.accent,
        foregroundColor: AppColors.onAccent,
        disabledBackgroundColor: AppColors.white10,
        disabledForegroundColor: AppColors.white40,
        minimumSize: buttonSize,
        padding: const EdgeInsets.symmetric(horizontal: AppSpace.xl),
        shape: buttonShape,
        textStyle: buttonText,
      ).copyWith(overlayColor: const WidgetStatePropertyAll(AppColors.accentPressed)),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: AppColors.white,
        minimumSize: buttonSize,
        padding: const EdgeInsets.symmetric(horizontal: AppSpace.xl),
        side: const BorderSide(color: AppColors.white20),
        shape: buttonShape,
        textStyle: buttonText,
      ),
    ),
    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: AppColors.accent,
        shape: buttonShape,
        textStyle: buttonText,
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: AppColors.sunken,
      contentPadding: const EdgeInsets.symmetric(horizontal: AppSpace.lg, vertical: 15),
      hintStyle: AppText.body.copyWith(color: AppColors.white40),
      prefixIconColor: AppColors.white60,
      suffixIconColor: AppColors.white60,
      errorStyle: AppText.bodySm.copyWith(color: AppColors.red),
      errorMaxLines: 2,
      border: border(AppColors.white20),
      enabledBorder: border(AppColors.white20),
      focusedBorder: border(AppColors.accent, 1.5),
      errorBorder: border(AppColors.red),
      focusedErrorBorder: border(AppColors.red, 1.5),
    ),
    dividerTheme: const DividerThemeData(color: AppColors.white10, thickness: 1, space: 1),
    progressIndicatorTheme: const ProgressIndicatorThemeData(color: AppColors.accent),
    snackBarTheme: SnackBarThemeData(
      backgroundColor: AppColors.sunken,
      contentTextStyle: AppText.body,
      behavior: SnackBarBehavior.floating,
      shape: const RoundedRectangleBorder(
        borderRadius: AppRadius.card,
        side: BorderSide(color: AppColors.white20),
      ),
    ),
    dialogTheme: const DialogThemeData(
      backgroundColor: AppColors.sunken,
      surfaceTintColor: Colors.transparent,
      shape: RoundedRectangleBorder(
        borderRadius: AppRadius.card,
        side: BorderSide(color: AppColors.white10),
      ),
      titleTextStyle: AppText.h3,
      contentTextStyle: AppText.body,
    ),
    bottomSheetTheme: const BottomSheetThemeData(
      backgroundColor: AppColors.sunken,
      surfaceTintColor: Colors.transparent,
      shape: RoundedRectangleBorder(borderRadius: AppRadius.card),
      showDragHandle: true,
      dragHandleColor: AppColors.white20,
    ),
    drawerTheme: const DrawerThemeData(
      backgroundColor: AppColors.sunken,
      surfaceTintColor: Colors.transparent,
      shape: RoundedRectangleBorder(),
    ),
    listTileTheme: const ListTileThemeData(
      iconColor: AppColors.white60,
      textColor: AppColors.white,
      selectedColor: AppColors.accent,
      titleTextStyle: AppText.body,
      subtitleTextStyle: AppText.bodySm,
    ),
    tabBarTheme: const TabBarThemeData(
      labelColor: AppColors.white,
      unselectedLabelColor: AppColors.white60,
      labelStyle: AppText.label,
      unselectedLabelStyle: AppText.label,
      indicatorColor: AppColors.accent,
      indicatorSize: TabBarIndicatorSize.tab,
      dividerColor: AppColors.white10,
    ),
    chipTheme: ChipThemeData(
      backgroundColor: Colors.transparent,
      selectedColor: AppColors.accent,
      labelStyle: AppText.label,
      secondaryLabelStyle: AppText.label.copyWith(color: AppColors.onAccent),
      side: const BorderSide(color: AppColors.white20),
      shape: const RoundedRectangleBorder(borderRadius: AppRadius.small),
      showCheckmark: false,
      padding: const EdgeInsets.symmetric(horizontal: AppSpace.sm, vertical: AppSpace.sm),
    ),
    switchTheme: SwitchThemeData(
      thumbColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.disabled)) return AppColors.white40;
        return states.contains(WidgetState.selected) ? AppColors.onAccent : AppColors.white60;
      }),
      trackColor: WidgetStateProperty.resolveWith((states) {
        final selected = states.contains(WidgetState.selected);
        // Switch yang tidak bisa diubah dibuat pudar.
        if (states.contains(WidgetState.disabled)) {
          return selected ? AppColors.accent.withValues(alpha: 0.3) : AppColors.white10;
        }
        return selected ? AppColors.accent : AppColors.white10;
      }),
      trackOutlineColor: const WidgetStatePropertyAll(AppColors.white20),
    ),
    datePickerTheme: const DatePickerThemeData(
      backgroundColor: AppColors.sunken,
      surfaceTintColor: Colors.transparent,
      shape: RoundedRectangleBorder(borderRadius: AppRadius.card),
    ),
    popupMenuTheme: const PopupMenuThemeData(
      color: AppColors.sunken,
      surfaceTintColor: Colors.transparent,
      shape: RoundedRectangleBorder(
        borderRadius: AppRadius.card,
        side: BorderSide(color: AppColors.white10),
      ),
      textStyle: AppText.body,
    ),
    floatingActionButtonTheme: const FloatingActionButtonThemeData(
      backgroundColor: AppColors.accent,
      foregroundColor: AppColors.onAccent,
      shape: RoundedRectangleBorder(borderRadius: AppRadius.small),
    ),
  );
}
