import mongoose from 'mongoose';

/**
 * Mongoose Schema representing a Lead in the Startup CRM.
 * @typedef {Object} LeadDocument
 * @property {string} name - The lead contact's full name (2 to 100 characters, trimmed).
 * @property {string} company - The company name the lead is associated with (trimmed).
 * @property {string} email - The lead's email address (trimmed, validated format).
 * @property {string} [phone] - The lead's telephone number (optional, trimmed).
 * @property {('New'|'Contacted'|'Meeting Scheduled'|'Proposal Sent'|'Won'|'Lost')} status - The sales stage/status of the lead (default: 'New').
 * @property {('Website'|'Referral'|'LinkedIn'|'Cold Call'|'Email Campaign'|'Other')} source - The source from which the lead originated (default: 'Website').
 * @property {string} [notes] - Additional details or history about the lead (optional, up to 1000 characters).
 * @property {mongoose.Types.ObjectId} owner - The ID of the User who owns/created this lead.
 * @property {Date} createdAt - The timestamp when the lead was created.
 * @property {Date} updatedAt - The timestamp when the lead was last updated.
 * @property {number} age - Virtual field showing the number of days since the lead was created.
 */
const leadSchema = new mongoose.Schema(
  {
    /**
     * The lead contact's full name.
     * Must be between 2 and 100 characters, required, and trimmed.
     * @type {String}
     */
    name: {
      type: String,
      required: [true, 'Lead name is required'],
      trim: true,
      minlength: [2, 'Lead name must be at least 2 characters long'],
      maxlength: [100, 'Lead name cannot exceed 100 characters']
    },

    /**
     * The company or organization name.
     * Required and trimmed.
     * @type {String}
     */
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true
    },

    /**
     * The lead's contact email.
     * Required, trimmed, and validated against standard email format.
     * @type {String}
     */
    email: {
      type: String,
      required: [true, 'Email is required'],
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
     * The lead's telephone/mobile number.
     * Optional and trimmed.
     * @type {String}
     */
    phone: {
      type: String,
      trim: true
    },

    /**
     * The current status/stage of the lead in the sales pipeline.
     * Must match exactly one of the defined CRM stages. Defaults to 'New'.
     * @type {String}
     */
    status: {
      type: String,
      enum: {
        values: ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'],
        message: '{VALUE} is not a valid lead status'
      },
      default: 'New'
    },

    /**
     * The marketing or outreach source from which the lead originated.
     * Must match exactly one of the defined sources. Defaults to 'Website'.
     * @type {String}
     */
    source: {
      type: String,
      enum: {
        values: ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'],
        message: '{VALUE} is not a valid lead source'
      },
      default: 'Website'
    },

    /**
     * Contextual notes, updates, or communication logs for the lead.
     * Optional, with a maximum length of 1000 characters.
     * @type {String}
     */
    notes: {
      type: String,
      maxlength: [1000, 'Notes cannot exceed 1000 characters']
    },

    /**
     * The financial value of the deal associated with this lead.
     * Optional, defaults to 0.
     * @type {Number}
     */
    value: {
      type: Number,
      default: 0,
      min: [0, 'Lead value cannot be negative']
    },

    /**
     * The reference to the User model object that created/owns this lead.
     * Required field establishing ownership and access control.
     * @type {mongoose.Schema.Types.ObjectId}
     */
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Owner is required']
    }
  },
  {
    timestamps: true,
    // Ensure virtuals are serialized in JSON and Object formats
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

/**
 * Virtual field: age
 * Calculates the number of days elapsed since the lead's creation.
 * Returns 0 if the creation date is not set or is in the future.
 * @name age
 * @type {number}
 */
leadSchema.virtual('age').get(function() {
  if (!this.createdAt) {
    return 0;
  }
  const diffTimeInMs = Date.now() - this.createdAt.getTime();
  const diffDays = Math.floor(diffTimeInMs / (1000 * 60 * 60 * 24));
  return diffDays < 0 ? 0 : diffDays;
});

// Compound index on (owner, status) for fast filtered queries
leadSchema.index({ owner: 1, status: 1 });

// Index on email for fast lookups
leadSchema.index({ email: 1 });

// Compound index on owner and createdAt for default listings sorting and MoM comparison ranges
leadSchema.index({ owner: 1, createdAt: -1 });

// Compound index on owner and source for analytics filters
leadSchema.index({ owner: 1, source: 1 });

// Compound query indexes starting with owner to optimize autocomplete regex queries
leadSchema.index({ owner: 1, name: 1 });
leadSchema.index({ owner: 1, company: 1 });
leadSchema.index({ owner: 1, email: 1 });

// Create the Lead model from the schema
const Lead = mongoose.model('Lead', leadSchema);

// Export both the model and the schema separately
export { leadSchema, Lead };
export default Lead;
