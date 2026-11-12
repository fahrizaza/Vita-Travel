import '../models/listing.dart';
import 'api_service.dart';

/// Endpoint /admin/*. Data ringkasan dibiarkan berupa Map karena hanya ditampilkan.
class AdminService {
  static Future<Map<String, dynamic>> getDashboard() async {
    return await ApiService.get('/admin/dashboard');
  }

  static Future<List<Map<String, dynamic>>> getUsers({String? role, String? search}) async {
    final data = await ApiService.get('/admin/users', query: {'role': role, 'search': search});
    return List<Map<String, dynamic>>.from(data);
  }

  static Future<void> setUserActive(int id, bool isActive) async {
    await ApiService.patch('/admin/users/$id/status', {'is_active': isActive});
  }

  static Future<List<Map<String, dynamic>>> getSellers({String? status}) async {
    final data = await ApiService.get('/admin/sellers', query: {'status': status});
    return List<Map<String, dynamic>>.from(data);
  }

  static Future<void> verifySeller(int id, {required bool approve, String? reason}) async {
    await ApiService.patch('/admin/sellers/$id/verify', {
      'status': approve ? 'approved' : 'rejected',
      'reason': reason,
    });
  }

  static Future<List<Listing>> getListings({String? status, String? search}) async {
    final data = await ApiService.get(
      '/admin/listings',
      query: {'status': status, 'search': search},
    );
    return (data as List).map((json) => Listing.fromJson(json)).toList();
  }

  static Future<void> moderateListing(int id, {required bool suspend, String? note}) async {
    await ApiService.patch('/admin/listings/$id/moderate', {
      'action': suspend ? 'suspend' : 'restore',
      'note': note,
    });
  }
}
