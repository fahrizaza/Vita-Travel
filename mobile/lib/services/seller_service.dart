import 'api_service.dart';

/// Endpoint /seller/* selain listing.
class SellerService {
  static Future<Map<String, dynamic>> getReport() async {
    return await ApiService.get('/seller/report');
  }

  static Future<void> updateProfile(Map<String, dynamic> fields) async {
    await ApiService.put('/seller/profile', fields);
  }
}
