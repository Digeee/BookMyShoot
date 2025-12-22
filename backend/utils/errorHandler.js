/**
 * Centralized error handling utility
 */

// Custom error classes
class AppError extends Error {
  constructor(message, statusCode, errorCode) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message, details = null) {
    super(message, 400, 'VALIDATION_ERROR');
    this.details = details;
  }
}

class AuthenticationError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}

class AuthorizationError extends AppError {
  constructor(message = 'Access denied') {
    super(message, 403, 'AUTHORIZATION_ERROR');
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND_ERROR');
  }
}

class ConflictError extends AppError {
  constructor(message) {
    super(message, 409, 'CONFLICT_ERROR');
  }
}

class InternalServerError extends AppError {
  constructor(message = 'Internal server error') {
    super(message, 500, 'INTERNAL_SERVER_ERROR');
  }
}

// Error response formatter
const sendErrorResponse = (err, res) => {
  // Operational errors
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.errorCode,
        message: err.message,
        ...(err.details && { details: err.details })
      }
    });
  }

  // Programming errors (unexpected)
  console.error('UNEXPECTED ERROR:', err);
  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong!'
    }
  });
};

// Global error handling middleware
const globalErrorHandler = (err, req, res, next) => {
  sendErrorResponse(err, res);
};

// Async wrapper to catch async errors
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  InternalServerError,
  sendErrorResponse,
  globalErrorHandler,
  catchAsync
};