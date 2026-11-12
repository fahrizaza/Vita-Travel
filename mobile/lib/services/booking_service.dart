import '../models/booking.dart';
import 'api_service.dart';

class BookingService {
  /// POST /bookings (buyer). Untuk pemandu wajib mengirim tanggal & jumlah hari.
  static Future<Booking> createBooking({
    required int listingId,
    required int participants,
    String? serviceDate,
    int? days,
    String? note,
  }) async {
    final data = await ApiService.post('/bookings', {
      'listing_id': listingId,
      'participants': participants,
      'service_date': serviceDate,
      'days': days,
      'note': note,
    });
    return Booking.fromJson(data);
  }

  /// GET /bookings — isi menyesuaikan role (buyer: milik saya, seller: pesanan masuk).
  static Future<List<Booking>> getBookings({String? status}) async {
    final data = await ApiService.get('/bookings', query: {'status': status});
    return (data as List).map((json) => Booking.fromJson(json)).toList();
  }

  static Future<Booking> getBooking(int id) async {
    return Booking.fromJson(await ApiService.get('/bookings/$id'));
  }

  /// PATCH /bookings/:id/payment (buyer upload bukti transfer).
  static Future<Booking> uploadPayment(
    int id, {
    required String senderName,
    required String senderBank,
    required PickedImage image,
  }) async {
    final data = await ApiService.upload(
      'PATCH',
      '/bookings/$id/payment',
      fields: {'sender_name': senderName, 'sender_bank': senderBank},
      image: image,
    );
    return Booking.fromJson(data);
  }

  /// PATCH /bookings/:id/verify (seller setujui / tolak bukti transfer).
  static Future<void> verifyPayment(int id, {required bool approve, String? note}) async {
    await ApiService.patch('/bookings/$id/verify', {'approve': approve, 'note': note});
  }

  static Future<void> completeBooking(int id) async {
    await ApiService.patch('/bookings/$id/complete');
  }

  static Future<void> cancelBooking(int id, {String? reason}) async {
    await ApiService.patch('/bookings/$id/cancel', {'reason': reason});
  }

  static Future<void> createReview(int id, {required int rating, String? comment}) async {
    await ApiService.post('/bookings/$id/review', {'rating': rating, 'comment': comment});
  }
}
