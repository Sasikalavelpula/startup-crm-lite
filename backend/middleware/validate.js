import { validationResult } from 'express-validator';

/**
 * Validation execution middleware wrapper.
 * Runs an array of express-validator chains, compiles any generated validation errors,
 * and outputs them in a standardized format.
 * 
 * @param {Array<import('express-validator').ValidationChain>} validations - Array of express-validator validation rules.
 * @returns {import('express').RequestHandler} The validation middleware route handler.
 */
export const validate = (validations) => {
  return async (req, res, next) => {
    // Execute all validation checks in parallel
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Extract validation results
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Format errors to match: [{ field: error.path, message: error.msg }]
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg
    }));

    return res.status(400).json({
      success: false,
      errors: formattedErrors
    });
  };
};

export default validate;
