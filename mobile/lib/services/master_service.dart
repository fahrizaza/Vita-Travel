import '../models/master_data.dart';
import 'api_service.dart';

/// Data master: kategori & destinasi (GET publik, tambah/ubah/hapus khusus admin).
class MasterService {
  static Future<List<Category>> getCategories() async {
    final data = await ApiService.get('/categories');
    return (data as List).map((json) => Category.fromJson(json)).toList();
  }

  static Future<void> saveCategory({int? id, required String name}) async {
    if (id == null) {
      await ApiService.post('/categories', {'name': name});
    } else {
      await ApiService.put('/categories/$id', {'name': name});
    }
  }

  static Future<void> deleteCategory(int id) async {
    await ApiService.delete('/categories/$id');
  }

  static Future<List<Destination>> getDestinations() async {
    final data = await ApiService.get('/destinations');
    return (data as List).map((json) => Destination.fromJson(json)).toList();
  }

  static Future<void> saveDestination({
    int? id,
    required String name,
    required String region,
    PickedImage? image,
  }) async {
    final fields = {'name': name, 'region': region};
    if (id == null) {
      await ApiService.upload('POST', '/destinations', fields: fields, image: image);
    } else {
      await ApiService.upload('PUT', '/destinations/$id', fields: fields, image: image);
    }
  }

  static Future<void> deleteDestination(int id) async {
    await ApiService.delete('/destinations/$id');
  }
}
