import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { errorResponse } from '../utils/apiresponse.js';

/**
 * Authentication protector middleware.
 * Verifies the presence and validity of a JSON Web Token in the Authorization header.
 * Attaches the authenticated, active user to the request object.
 * 
 * @async
 * @function protect
 * @param {import('express').Request} req - The Express Request object.
 * @param {import('express').Response} res - The Express Response object.
 * @param {import('express').NextFunction} next - The Express Next Function.
 * @returns {Promise<import('express').Response|void>} Calls next() if successful, returns 401/403 error response otherwise.
 */
export const protect = async (req, res, next) => {
  let token;

  // 1. Extract token from Authorization header (Bearer <token>)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2. Return error if token is missing
  if (!token) {
    return errorResponse(res, 'No token provided, access denied', 401);
  }

  try {
    // 3. Verify token authenticity
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Find the user associated with this token (excluding password)
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return errorResponse(res, 'User belonging to this token no longer exists', 401);
    }

    // 5. Ensure the user is active
    if (!user.isActive) {
      return errorResponse(res, 'Account is deactivated', 403);
    }

    // 6. Attach user to request context
    req.user = user;
    next();
  } catch (error) {
    // Handle specific JWT error cases
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Token has expired, please login again', 401);
    }
    return errorResponse(res, 'Token is invalid', 401);
  }
};

export default protect;
