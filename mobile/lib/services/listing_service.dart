import '../models/listing.dart';
import 'api_service.dart';

class ListingService {
  /// GET /listings — pencarian publik dengan filter.
  static Future<List<Listing>> getListings({
    String? search,
    String? type,
    int? categoryId,
    int? destinationId,
    int? minPrice,
    int? maxPrice,
    String sort = 'newest',
  }) async {
    final data = await ApiService.get(
      '/listings',
      query: {
        'search': search,
        'type': type,
        'category_id': categoryId?.toString(),
        'destination_id': destinationId?.toString(),
        'min_price': minPrice?.toString(),
        'max_price': maxPrice?.toString(),
        'sort': sort,
      },
    );
    return (data as List).map((json) => Listing.fromJson(json)).toList();
  }

  /// GET /listings/:id — detail + ulasan.
  static Future<Listing> getListing(int id) async {
    return Listing.fromJson(await ApiService.get('/listings/$id'));
  }

  // ---------- Seller ----------

  static Future<List<Listing>> getMyListings() async {
    final data = await ApiService.get('/seller/listings');
    return (data as List).map((json) => Listing.fromJson(json)).toList();
  }

  /// POST /seller/listings (baru) atau PUT /seller/listings/:id (edit).
  static Future<Listing> saveListing({
    int? id,
    required Map<String, String> fields,
    PickedImage? image,
  }) async {
    final data = id == null
        ? await ApiService.upload('POST', '/seller/listings', fields: fields, image: image)
        : await ApiService.upload('PUT', '/seller/listings/$id', fields: fields, image: image);
    return Listing.fromJson(data);
  }

  static Future<void> deleteListing(int id) async {
    await ApiService.delete('/seller/listings/$id');
  }

  /// Field form dari listing yang sudah ada (dipakai untuk mengubah status aktif/nonaktif).
  static Map<String, String> fieldsFrom(Listing listing, {required String status}) {
    return {
      'type': listing.type,
      'title': listing.title,
      'description': listing.description,
      'price': listing.price.toStringAsFixed(0),
      'quota': listing.quota.toString(),
      'category_id': listing.categoryId.toString(),
      'destination_id': listing.destinationId.toString(),
      'start_date': listing.startDate ?? '',
      'duration_days': listing.durationDays?.toString() ?? '',
      'languages': listing.languages ?? '',
      'includes': listing.includes ?? '',
      'status': status,
    };
  }
}
