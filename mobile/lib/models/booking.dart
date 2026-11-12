/// Pesanan buyer, termasuk bukti transfer dan data rekening seller.
class Booking {
  final int id;
  final int buyerId;
  final int listingId;
  final int sellerId;
  final String serviceDate; // YYYY-MM-DD
  final int days;
  final int participants;
  final double totalPrice;
  final String? note;
  final String status;
  final String? statusNote; // alasan bukti ditolak / pesanan dibatalkan
  final String? proofUrl;
  final String? senderName;
  final String? senderBank;
  final DateTime createdAt;
  final String listingTitle;
  final String listingType;
  final String? listingImageUrl;
  final String sellerName;
  final String? bankName;
  final String? bankAccountNumber;
  final String? bankAccountName;
  final String buyerName;
  final String? buyerEmail;
  final String? buyerPhone;
  final int? reviewRating;
  final String? reviewComment;

  Booking({
    required this.id,
    required this.buyerId,
    required this.listingId,
    required this.sellerId,
    required this.serviceDate,
    required this.days,
    required this.participants,
    required this.totalPrice,
    required this.note,
    required this.status,
    required this.statusNote,
    required this.proofUrl,
    required this.senderName,
    required this.senderBank,
    required this.createdAt,
    required this.listingTitle,
    required this.listingType,
    required this.listingImageUrl,
    required this.sellerName,
    required this.bankName,
    required this.bankAccountNumber,
    required this.bankAccountName,
    required this.buyerName,
    required this.buyerEmail,
    required this.buyerPhone,
    required this.reviewRating,
    required this.reviewComment,
  });

  bool get isOngoing =>
      status == 'pending_payment' || status == 'waiting_verification' || status == 'confirmed';

  factory Booking.fromJson(Map<String, dynamic> json) {
    return Booking(
      id: json['id'],
      buyerId: json['buyer_id'],
      listingId: json['listing_id'],
      sellerId: json['seller_id'],
      serviceDate: json['service_date'],
      days: json['days'],
      participants: json['participants'],
      totalPrice: (json['total_price'] as num).toDouble(),
      note: json['note'],
      status: json['status'],
      statusNote: json['status_note'],
      proofUrl: json['proof_url'],
      senderName: json['sender_name'],
      senderBank: json['sender_bank'],
      createdAt: DateTime.parse(json['created_at']).toLocal(),
      listingTitle: json['listing_title'],
      listingType: json['listing_type'],
      listingImageUrl: json['listing_image_url'],
      sellerName: json['seller_name'],
      bankName: json['bank_name'],
      bankAccountNumber: json['bank_account_number'],
      bankAccountName: json['bank_account_name'],
      buyerName: json['buyer_name'],
      buyerEmail: json['buyer_email'],
      buyerPhone: json['buyer_phone'],
      reviewRating: json['review_rating'],
      reviewComment: json['review_comment'],
    );
  }
}
