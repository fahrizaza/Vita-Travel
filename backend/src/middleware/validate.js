import { ApiError } from "../utils/response.js";

/**
 * Validasi req.body memakai schema zod (lihat src/validators.js).
 * Jika tidak valid, response 400 berisi daftar error per field.
 */
export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body ?? {});
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      throw new ApiError(400, errors[0].message, errors);
    }
    req.body = result.data;
    next();
  };
}
