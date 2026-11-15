import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/user.dart';
import '../services/api_service.dart';

/// Menyimpan sesi login: token (di shared_preferences) dan data user yang sedang login.
class AuthProvider extends ChangeNotifier {
  static const _tokenKey = 'auth_token';

  User? _user;
  User? get user => _user;

  /// Dipanggil saat app dibuka: pakai token tersimpan untuk mengambil data user.
  Future<void> restoreSession() async {
    final prefs = await SharedPreferences.getInstance();
    ApiService.token = prefs.getString(_tokenKey);
    if (ApiService.token == null) return;

    try {
      _user = User.fromJson(await ApiService.get('/auth/me'));
      notifyListeners();
    } on ApiException catch (error) {
      // Token kedaluwarsa atau akun dinonaktifkan → harus login ulang.
      if (error.statusCode == 401 || error.statusCode == 403) {
        await logout();
      } else {
        rethrow;
      }
    }
  }

  Future<void> login(String email, String password) async {
    final data = await ApiService.post('/auth/login', {'email': email, 'password': password});
    await _saveSession(data);
  }

  Future<void> register(Map<String, dynamic> fields) async {
    final data = await ApiService.post('/auth/register', fields);
    await _saveSession(data);
  }

  /// Ambil ulang data user, misalnya setelah seller diverifikasi admin.
  Future<void> refreshUser() async {
    _user = User.fromJson(await ApiService.get('/auth/me'));
    notifyListeners();
  }

  Future<void> updateProfile({required String name, required String phone}) async {
    _user = User.fromJson(await ApiService.put('/auth/me', {'name': name, 'phone': phone}));
    notifyListeners();
  }

  Future<void> changePassword(String oldPassword, String newPassword) async {
    await ApiService.put('/auth/password', {
      'old_password': oldPassword,
      'new_password': newPassword,
    });
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
    ApiService.token = null;
    _user = null;
    notifyListeners();
  }

  Future<void> _saveSession(Map<String, dynamic> data) async {
    ApiService.token = data['token'];
    _user = User.fromJson(data['user']);
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_tokenKey, data['token']);
    notifyListeners();
  }
}
