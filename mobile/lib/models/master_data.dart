/// Kategori listing (dikelola admin).
class Category {
  final int id;
  final String name;
  final int listingCount;

  Category({required this.id, required this.name, required this.listingCount});

  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(id: json['id'], name: json['name'], listingCount: json['listing_count'] ?? 0);
  }
}

/// Destinasi wisata (dikelola admin, punya foto).
class Destination {
  final int id;
  final String name;
  final String region;
  final String? imageUrl;
  final int listingCount;

  Destination({
    required this.id,
    required this.name,
    required this.region,
    required this.imageUrl,
    required this.listingCount,
  });

  factory Destination.fromJson(Map<String, dynamic> json) {
    return Destination(
      id: json['id'],
      name: json['name'],
      region: json['region'],
      imageUrl: json['image_url'],
      listingCount: json['listing_count'] ?? 0,
    );
  }
}
