import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { successResponse, errorResponse } from '../utils/apiresponse.js';

/**
 * Helper utility to sign a JWT for a user.
 * 
 * @param {string} userId - The unique user database ObjectId.
 * @returns {string} The signed JWT token string.
 */
export const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

/**
 * Registers a new user.
 * Checks for email duplication, saves the user record, and returns a session token.
 * 
 * @async
 * @function register
 * @param {import('express').Request} req - The Express Request object.
 * @param {import('express').Response} res - The Express Response object.
 * @param {import('express').NextFunction} next - The Express Next Function.
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 'Email already exists', 409);
    }

    // Create and save new user (pre-save hook will hash password)
    const user = await User.create({
      name,
      email,
      password
    });

    // Generate JWT
    const token = generateToken(user._id);

    // Return success response with user profile details
    return successResponse(
      res,
      { token, user },
      'User registered successfully',
      201
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Authenticates an existing user.
 * Validates credentials, checks if the account is active, and returns a session token.
 * 
 * @async
 * @function login
 * @param {import('express').Request} req - The Express Request object.
 * @param {import('express').Response} res - The Express Response object.
 * @param {import('express').NextFunction} next - The Express Next Function.
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user and explicitly select the password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      // General message to mitigate email enumeration attacks
      return errorResponse(res, 'Invalid credentials', 401);
    }

    // Compare plain-text password with hashed database password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    // Ensure the account has not been deactivated
    if (!user.isActive) {
      return errorResponse(res, 'Account is deactivated', 403);
    }

    // Generate JWT
    const token = generateToken(user._id);

    return successResponse(
      res,
      { token, user },
      'Login successful',
      200
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves the current authenticated user's profile.
 * 
 * @async
 * @function getProfile
 * @param {import('express').Request} req - The Express Request object.
 * @param {import('express').Response} res - The Express Response object.
 * @param {import('express').NextFunction} next - The Express Next Function.
 */
export const getProfile = async (req, res, next) => {
  try {
    // req.user has already been set by the protect middleware
    return successResponse(
      res,
      req.user,
      'Profile retrieved successfully',
      200
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Updates the profile of the current authenticated user.
 * Allows updating the user's name.
 * If password change is requested, validates the current password before applying changes.
 * 
 * @async
 * @function updateProfile
 * @param {import('express').Request} req - The Express Request object.
 * @param {import('express').Response} res - The Express Response object.
 * @param {import('express').NextFunction} next - The Express Next Function.
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { name, currentPassword, newPassword } = req.body;

    // Fetch user and explicitly select the password field for comparison
    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    // 1. Update name if provided
    if (name) {
      user.name = name;
    }

    // 2. Process password change if newPassword is provided
    if (newPassword) {
      if (!currentPassword) {
        return errorResponse(res, 'Please provide current password to update password', 400);
      }

      // Verify the current password
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return errorResponse(res, 'Invalid current password', 401);
      }

      // Set new password (pre-save hook will handle hashing)
      user.password = newPassword;
    }

    // Save changes
    await user.save();

    // Fetch the updated user profile without the password field
    const updatedUser = await User.findById(user._id).select('-password');

    return successResponse(
      res,
      updatedUser,
      'Profile updated successfully',
      200
    );
  } catch (error) {
    next(error);
  }
};
