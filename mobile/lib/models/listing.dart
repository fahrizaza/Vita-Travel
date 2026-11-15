/// Paket trip atau jasa pemandu yang dijual seller.
class Listing {
  final int id;
  final int sellerId;
  final int categoryId;
  final int destinationId;
  final String type; // trip | guide
  final String title;
  final String description;
  final double price; // trip: per orang, guide: per hari
  final int quota; // trip: jumlah kursi, guide: maksimal orang per grup
  final int remainingQuota;
  final String? startDate; // khusus trip, format YYYY-MM-DD
  final int? durationDays; // khusus trip
  final String? languages; // khusus guide
  final String? includes; // fasilitas, satu per baris
  final String? imageUrl;
  final String status; // active | inactive | suspended
  final String? moderationNote;
  final String categoryName;
  final String destinationName;
  final String destinationRegion;
  final String sellerName;
  final String sellerCity;
  final double rating;
  final int reviewCount;
  final List<Review> reviews; // hanya terisi di halaman detail

  Listing({
    required this.id,
    required this.sellerId,
    required this.categoryId,
    required this.destinationId,
    required this.type,
    required this.title,
    required this.description,
    required this.price,
    required this.quota,
    required this.remainingQuota,
    required this.startDate,
    required this.durationDays,
    required this.languages,
    required this.includes,
    required this.imageUrl,
    required this.status,
    required this.moderationNote,
    required this.categoryName,
    required this.destinationName,
    required this.destinationRegion,
    required this.sellerName,
    required this.sellerCity,
    required this.rating,
    required this.reviewCount,
    required this.reviews,
  });

  bool get isTrip => type == 'trip';
  bool get isActive => status == 'active';

  /// Daftar fasilitas dari teks "satu per baris".
  List<String> get includeList => (includes ?? '')
      .split('\n')
      .map((line) => line.trim())
      .where((line) => line.isNotEmpty)
      .toList();

  factory Listing.fromJson(Map<String, dynamic> json) {
    return Listing(
      id: json['id'],
      sellerId: json['seller_id'],
      categoryId: json['category_id'],
      destinationId: json['destination_id'],
      type: json['type'],
      title: json['title'],
      description: json['description'],
      price: (json['price'] as num).toDouble(),
      quota: json['quota'],
      remainingQuota: json['remaining_quota'] ?? json['quota'],
      startDate: json['start_date'],
      durationDays: json['duration_days'],
      languages: json['languages'],
      includes: json['includes'],
      imageUrl: json['image_url'],
      status: json['status'],
      moderationNote: json['moderation_note'],
      categoryName: json['category_name'] ?? '',
      destinationName: json['destination_name'] ?? '',
      destinationRegion: json['destination_region'] ?? '',
      sellerName: json['seller_name'] ?? '',
      sellerCity: json['seller_city'] ?? '',
      rating: (json['rating'] as num? ?? 0).toDouble(),
      reviewCount: json['review_count'] ?? 0,
      reviews: (json['reviews'] as List? ?? []).map((item) => Review.fromJson(item)).toList(),
    );
  }
}

class Review {
  final int id;
  final int rating;
  final String? comment;
  final String buyerName;
  final DateTime createdAt;

  Review({
    required this.id,
    required this.rating,
    required this.comment,
    required this.buyerName,
    required this.createdAt,
  });

  factory Review.fromJson(Map<String, dynamic> json) {
    return Review(
      id: json['id'],
      rating: json['rating'],
      comment: json['comment'],
      buyerName: json['buyer_name'] ?? '',
      createdAt: DateTime.parse(json['created_at']).toLocal(),
    );
  }
}
