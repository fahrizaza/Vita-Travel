/// Akun yang sedang login (admin / seller / buyer).
class User {
  final int id;
  final String name;
  final String email;
  final String? phone;
  final String role;
  final bool isActive;
  final SellerProfile? seller; // hanya terisi untuk role seller

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.phone,
    required this.role,
    required this.isActive,
    required this.seller,
  });

  bool get isBuyer => role == 'buyer';
  bool get isSeller => role == 'seller';
  bool get isAdmin => role == 'admin';

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      phone: json['phone'],
      role: json['role'],
      isActive: json['is_active'] ?? true,
      seller: json['seller'] == null ? null : SellerProfile.fromJson(json['seller']),
    );
  }
}

/// Data usaha milik seller.
class SellerProfile {
  final String businessName;
  final String city;
  final String? description;
  final String? bankName;
  final String? bankAccountNumber;
  final String? bankAccountName;
  final String verificationStatus; // pending | approved | rejected
  final String? rejectionReason;

  SellerProfile({
    required this.businessName,
    required this.city,
    required this.description,
    required this.bankName,
    required this.bankAccountNumber,
    required this.bankAccountName,
    required this.verificationStatus,
    required this.rejectionReason,
  });

  bool get isApproved => verificationStatus == 'approved';

  factory SellerProfile.fromJson(Map<String, dynamic> json) {
    return SellerProfile(
      businessName: json['business_name'],
      city: json['city'],
      description: json['description'],
      bankName: json['bank_name'],
      bankAccountNumber: json['bank_account_number'],
      bankAccountName: json['bank_account_name'],
      verificationStatus: json['verification_status'],
      rejectionReason: json['rejection_reason'],
    );
  }
}
