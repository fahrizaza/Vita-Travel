import 'package:flutter/foundation.dart';

/// Alamat REST API backend.
///
/// - Chrome (flutter run -d chrome): http://localhost:3001/api
/// - Emulator Android: http://10.0.2.2:3001/api (10.0.2.2 = localhost laptop)
/// - HP fisik: jalankan dengan --dart-define=API_URL=http://IP-LAPTOP:3001/api
String get apiUrl {
  const fromCommand = String.fromEnvironment('API_URL');
  if (fromCommand.isNotEmpty) return fromCommand;
  if (!kIsWeb && defaultTargetPlatform == TargetPlatform.android) {
    return 'http://10.0.2.2:3001/api';
  }
  return 'http://localhost:3001/api';
}
