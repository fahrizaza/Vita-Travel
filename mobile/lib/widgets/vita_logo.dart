import 'package:flutter/material.dart';

import '../theme/app_theme.dart';

/// Logo monogram "V" (bentuknya sama dengan ikon app di assets/icon/app_icon.png).
class VitaLogo extends StatelessWidget {
  final double size;
  final bool withBackground;

  const VitaLogo({super.key, this.size = 40, this.withBackground = true});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      color: withBackground ? AppColors.canvas : null,
      child: CustomPaint(painter: _VPainter()),
    );
  }
}

class _VPainter extends CustomPainter {
  // Titik sudut huruf V dalam skala 0..1
  static const _points = [
    Offset(0.20, 0.26),
    Offset(0.355, 0.26),
    Offset(0.5, 0.62),
    Offset(0.645, 0.26),
    Offset(0.80, 0.26),
    Offset(0.565, 0.78),
    Offset(0.435, 0.78),
  ];

  @override
  void paint(Canvas canvas, Size size) {
    final path = Path()
      ..addPolygon(
        _points.map((point) => Offset(point.dx * size.width, point.dy * size.height)).toList(),
        true,
      );
    canvas.drawPath(path, Paint()..color = AppColors.accent);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

/// Logo + tulisan "Vita Travel".
class VitaWordmark extends StatelessWidget {
  final double logoSize;

  const VitaWordmark({super.key, this.logoSize = 32});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        VitaLogo(size: logoSize, withBackground: false),
        const SizedBox(width: AppSpace.sm),
        Text('Vita Travel', style: AppText.title.copyWith(fontWeight: FontWeight.w700)),
      ],
    );
  }
}
