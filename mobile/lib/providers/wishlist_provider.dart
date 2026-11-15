import 'package:flutter/foundation.dart';

import '../models/listing.dart';
import '../services/api_service.dart';

/// Daftar favorit buyer. Disimpan di provider supaya ikon hati di semua halaman ikut berubah.
class WishlistProvider extends ChangeNotifier {
  List<Listing> items = [];
  bool loading = false;
  String? error;

  bool contains(int listingId) => items.any((listing) => listing.id == listingId);

  Future<void> load() async {
    loading = true;
    error = null;
    notifyListeners();
    try {
      final data = await ApiService.get('/wishlist');
      items = (data as List).map((json) => Listing.fromJson(json)).toList();
    } on ApiException catch (e) {
      error = e.message;
    }
    loading = false;
    notifyListeners();
  }

  /// Tambah atau hapus dari favorit. Mengembalikan pesan untuk ditampilkan.
  Future<String> toggle(Listing listing) async {
    if (contains(listing.id)) {
      await ApiService.delete('/wishlist/${listing.id}');
      items.removeWhere((item) => item.id == listing.id);
      notifyListeners();
      return 'Dihapus dari favorit';
    }
    await ApiService.post('/wishlist/${listing.id}');
    items.insert(0, listing);
    notifyListeners();
    return 'Ditambahkan ke favorit';
  }

  void clear() {
    items = [];
    notifyListeners();
  }
}
