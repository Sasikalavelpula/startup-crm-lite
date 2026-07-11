import { errorResponse } from '../utils/apiResponse.js';

/**
 * Global centralized error-handling middleware for Express applications.
 * Handles specific Mongoose errors, MongoDB duplicate keys, JWT errors,
 * and formats all generic server errors.
 * 
 * @param {Error} err - The error object thrown or passed next().
 * @param {import('express').Request} req - The Express Request object.
 * @param {import('express').Response} res - The Express Response object.
 * @param {import('express').NextFunction} next - The Express Next Function.
 */
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Server error';
  let validationErrors = null;

  // Clone err properties
  const errName = err.name;
  const errCode = err.code;

  // 1. Mongoose Validation Error (HTTP 400 Bad Request)
  if (errName === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    validationErrors = {};
    Object.values(err.errors).forEach((val) => {
      validationErrors[val.path] = val.message;
    });
  }

  // 2. Mongoose Cast Error (HTTP 404 Not Found - e.g. invalid ObjectId)
  else if (errName === 'CastError') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // 3. MongoDB Duplicate Key (HTTP 409 Conflict)
  else if (errCode === 11000) {
    statusCode = 409;
    const duplicateField = Object.keys(err.keyValue || {})[0] || 'field';
    const formattedField = duplicateField.charAt(0).toUpperCase() + duplicateField.slice(1);
    message = `${formattedField} already exists`;
  }

  // 4. JWT Web Token Error (HTTP 401 Unauthorized)
  else if (errName === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Not authorized, invalid token';
  }

  // 5. JWT Token Expired Error (HTTP 401 Unauthorized)
  else if (errName === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Not authorized, token expired';
  }

  // Log error stack to server console in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  // Return standard formatted API response
  return errorResponse(
    res,
    message,
    statusCode,
    validationErrors,
    err.stack
  );
};

export default errorHandler;
