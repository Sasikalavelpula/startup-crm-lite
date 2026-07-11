/**
 * Sends a successful API response.
 * 
 * @param {import('express').Response} res - The Express response object.
 * @param {any} data - The payload to send back.
 * @param {string} message - A descriptive success message.
 * @param {number} [statusCode=200] - The HTTP status code (defaults to 200).
 * @returns {import('express').Response} The JSON response.
 */
export const successResponse = (res, data, message, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

/**
 * Sends an error API response.
 * Supports standard field-specific validation errors and debug stack trace for development.
 * 
 * @param {import('express').Response} res - The Express response object.
 * @param {string} message - The error message.
 * @param {number} [statusCode=500] - The HTTP status code (defaults to 500).
 * @param {any} [errors=null] - Object containing validation errors.
 * @param {string} [stack=null] - The stack trace of the error.
 * @returns {import('express').Response} The JSON response.
 */
export const errorResponse = (res, message, statusCode = 500, errors = null, stack = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
    ...(process.env.NODE_ENV === 'development' && stack && { stack })
  });
};

/**
 * Sends a paginated API response.
 * Formats data list and includes metadata on pages, current page, and total count.
 * 
 * @param {import('express').Response} res - The Express response object.
 * @param {any[]} data - The array of paginated documents.
 * @param {number} total - The total count of matching records.
 * @param {number} page - The current page number.
 * @param {number} limit - The number of records per page.
 * @returns {import('express').Response} The JSON response.
 */
export const paginatedResponse = (res, data, total, page, limit) => {
  const pages = Math.ceil(total / limit) || 1;
  return res.status(200).json({
    success: true,
    data,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages
    }
  });
};

export default {
  successResponse,
  errorResponse,
  paginatedResponse
};
