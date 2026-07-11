import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { successResponse } from '../utils/apiResponse.js';
import {
  register,
  login,
  getProfile,
  updateProfile
} from '../controllers/authController.js';

const router = express.Router();

/**
 * PRODUCTION SECURITY RECOMMENDATION:
 * 
 * In a production environment, express-rate-limit should be applied to prevent brute-force attacks on
 * authentication endpoints (register and login).
 * 
 * Example Implementation:
 * import rateLimit from 'express-rate-limit';
 * 
 * const authRateLimiter = rateLimit({
 *   windowMs: 15 * 60 * 1000, // 15 minutes
 *   max: 20, // Limit each IP to 20 auth requests per windowMs
 *   message: {
 *     success: false,
 *     message: 'Too many authentication attempts, please try again after 15 minutes'
 *   },
 *   standardHeaders: true,
 *   legacyHeaders: false,
 * });
 * 
 * router.use('/register', authRateLimiter);
 * router.use('/login', authRateLimiter);
 */

// Validation rules for Registration
const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be a valid email address'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Validation rules for Login
const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be a valid email address'),
  body('password')
    .notEmpty().withMessage('Password is required')
];

// Validation rules for Profile Update
const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('newPassword')
    .optional()
    .isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
];

// 1. Register Endpoint
router.post('/register', validate(registerValidation), register);

// 2. Login Endpoint
router.post('/login', validate(loginValidation), login);

// 3. Retrieve User Profile Endpoint (Protected)
router.get('/profile', protect, getProfile);

// 4. Update User Profile Endpoint (Protected)
router.put('/profile', protect, validate(updateProfileValidation), updateProfile);

// 5. Logout Endpoint (Protected - stateless JWT logout confirmation)
router.post('/logout', protect, (req, res) => {
  return successResponse(res, null, 'Logged out successfully', 200);
});

export default router;
