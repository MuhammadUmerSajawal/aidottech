/**
 * Centralized Application Error utility class.
 * Standardizes API error formats with HTTP status codes.
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Flag to identify operational errors vs. programming bugs

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
