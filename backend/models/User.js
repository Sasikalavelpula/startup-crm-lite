import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * Mongoose Schema representing a User in the Startup CRM.
 * @typedef {Object} UserDocument
 * @property {string} name - The user's full name (2 to 50 characters, trimmed).
 * @property {string} email - The user's unique, lowercase, trimmed email address (validated format).
 * @property {string} password - The user's hashed password (minimum length of 6 characters).
 * @property {('admin'|'user')} role - The user's authorization role (default: 'user').
 * @property {boolean} isActive - Whether the user account is active (default: true).
 * @property {Date} createdAt - The timestamp when the user account was created.
 * @property {Date} updatedAt - The timestamp when the user account was last updated.
 */
const userSchema = new mongoose.Schema(
  {
    /**
     * The user's full name.
     * Must be between 2 and 50 characters, required, and trimmed.
     * @type {String}
     */
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [50, 'Name cannot exceed 50 characters']
    },

    /**
     * The user's unique email address.
     * Required, lowercase, trimmed, and validated against standard email format.
     * @type {String}
     */
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function(v) {
          // Standard robust regex for email validation
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: 'Email must be a valid email address'
      }
    },

    /**
     * The user's password.
     * Required, minimum length of 6. Stored as a bcrypt hash.
     * @type {String}
     */
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long']
    },

    /**
     * The user's authorization role.
     * Restricted to 'admin' or 'user'. Defaults to 'user'.
     * @type {String}
     */
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: 'Role must be either admin or user'
      },
      default: 'user'
    },

    /**
     * Flag indicating if the user's account is active.
     * Defaults to true.
     * @type {Boolean}
     */
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

/**
 * Pre-save middleware to hash the password before saving it to the database.
 * Runs only if the password field has been modified.
 */
userSchema.pre('save', async function() {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return;
  }

  // Generate a salt with 10 rounds
  const salt = await bcrypt.genSalt(10);
  // Hash the password using the generated salt
  user.password = await bcrypt.hash(user.password, salt);
});

/**
 * Compares a candidate plain text password with the hashed password stored in the database.
 * @param {string} candidatePassword - The plain text password to compare.
 * @returns {Promise<boolean>} Resolves to true if the passwords match, false otherwise.
 */
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed: ' + error.message);
  }
};

/**
 * Overrides the toJSON method to ensure the hashed password is never returned
 * in JSON representations of the User document.
 * @returns {Object} The user object without the password field.
 */
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export both the model and the schema separately
export { userSchema, User };
export default User;
