import 'dart:async';
import 'dart:convert';
import 'dart:typed_data';

import 'package:http/http.dart' as http;
import 'package:http_parser/http_parser.dart';

import '../config.dart';

/// Error dari API: berisi pesan dari server (sudah dalam Bahasa Indonesia).
class ApiException implements Exception {
  final String message;
  final int? statusCode;

  ApiException(this.message, [this.statusCode]);

  @override
  String toString() => message;
}

/// Gambar yang dipilih user, siap diupload.
class PickedImage {
  final Uint8List bytes;
  final String name;
  final String mimeType; // image/jpeg | image/png | image/webp

  PickedImage({required this.bytes, required this.name, required this.mimeType});
}

/// Semua request ke backend lewat class ini.
/// Response sukses dari server: { success, message, data } → yang dikembalikan hanya `data`.
class ApiService {
  /// Token JWT dari login, dikirim di header Authorization.
  static String? token;

  /// Dipanggil saat server membalas 401 (token kedaluwarsa), supaya app kembali ke halaman login.
  static void Function()? onUnauthorized;

  static Future<dynamic> get(String path, {Map<String, String?>? query}) {
    return _send(() => http.get(_uri(path, query), headers: _headers()));
  }

  static Future<dynamic> post(String path, [Map<String, dynamic>? body]) {
    return _send(() => http.post(_uri(path), headers: _headers(), body: jsonEncode(body ?? {})));
  }

  static Future<dynamic> put(String path, [Map<String, dynamic>? body]) {
    return _send(() => http.put(_uri(path), headers: _headers(), body: jsonEncode(body ?? {})));
  }

  static Future<dynamic> patch(String path, [Map<String, dynamic>? body]) {
    return _send(() => http.patch(_uri(path), headers: _headers(), body: jsonEncode(body ?? {})));
  }

  static Future<dynamic> delete(String path) {
    return _send(() => http.delete(_uri(path), headers: _headers()));
  }

  /// Request multipart/form-data: field teks + satu gambar (nama field "image").
  static Future<dynamic> upload(
    String method,
    String path, {
    required Map<String, String> fields,
    PickedImage? image,
  }) {
    return _send(() async {
      final request = http.MultipartRequest(method, _uri(path));
      request.headers.addAll(_headers(json: false));
      request.fields.addAll(fields);
      if (image != null) {
        request.files.add(
          http.MultipartFile.fromBytes(
            'image',
            image.bytes,
            filename: image.name,
            contentType: MediaType.parse(image.mimeType),
          ),
        );
      }
      return http.Response.fromStream(await request.send());
    });
  }

  static Uri _uri(String path, [Map<String, String?>? query]) {
    final uri = Uri.parse('$apiUrl$path');
    if (query == null) return uri;
    // Parameter kosong tidak ikut dikirim.
    final params = <String, String>{
      for (final entry in query.entries)
        if (entry.value != null && entry.value!.isNotEmpty) entry.key: entry.value!,
    };
    return uri.replace(queryParameters: params);
  }

  static Map<String, String> _headers({bool json = true}) {
    return {
      if (json) 'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  static Future<dynamic> _send(Future<http.Response> Function() request) async {
    final http.Response response;
    try {
      response = await request().timeout(const Duration(seconds: 20));
    } on TimeoutException {
      throw ApiException('Server tidak merespons, coba lagi');
    } catch (_) {
      throw ApiException('Tidak dapat terhubung ke server. Pastikan backend sudah berjalan.');
    }

    final Map<String, dynamic> body;
    try {
      body = jsonDecode(response.body);
    } catch (_) {
      throw ApiException('Respons server tidak valid', response.statusCode);
    }

    if (response.statusCode >= 200 && response.statusCode < 300) {
      return body['data'];
    }
    if (response.statusCode == 401 && token != null) {
      onUnauthorized?.call();
    }
    throw ApiException(body['message'] ?? 'Terjadi kesalahan', response.statusCode);
  }
}
