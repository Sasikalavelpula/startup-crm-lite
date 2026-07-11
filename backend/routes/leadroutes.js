import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  getLeads,
  searchLeads,
  createLead,
  getLeadById,
  updateLead,
  updateLeadStatus,
  deleteLead,
  getLeadStats,
  getMonthlyStats
} from '../controllers/leadcontroller.js';

const router = express.Router();

// Apply protect middleware to ALL routes in this file
router.use(protect);

// Define validation rules for creating/updating a lead
const leadValidationRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Lead name is required')
    .isLength({ min: 2 }).withMessage('Lead name must be at least 2 characters long'),
  body('company')
    .trim()
    .notEmpty().withMessage('Company name is required'),
  body('email')
    .trim()
    .isEmail().withMessage('Email must be a valid email address'),
  body('status')
    .optional()
    .isIn(['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'])
    .withMessage('Status must be a valid lead status'),
  body('source')
    .optional()
    .isIn(['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'])
    .withMessage('Source must be a valid lead source'),
  body('value')
    .optional()
    .isNumeric().withMessage('Value must be a number')
    .custom((val) => parseFloat(val) >= 0).withMessage('Value cannot be negative')
];

// Define validation rules for status update
const updateStatusValidationRules = [
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'])
    .withMessage('Status must be a valid lead status')
];

/**
 * 1. Retrieve all leads (supports status filtering, search term query, sorting, and pagination)
 * Route: GET /api/leads
 */
router.get('/', getLeads);

/**
 * Autocomplete quick search query matching lead names, company names, or emails.
 * Route: GET /api/leads/search
 */
router.get('/search', searchLeads);

/**
 * 2. Get lead stats aggregated for dashboard (KPI counts and conversion rate)
 * Route: GET /api/leads/stats
 * Note: Must be defined before /:id route to avoid routing conflicts
 */
router.get('/stats', getLeadStats);

/**
 * 3. Get monthly lead stats trend for the past 6 months
 * Route: GET /api/leads/monthly-stats
 * Note: Must be defined before /:id route to avoid routing conflicts
 */
router.get('/monthly-stats', getMonthlyStats);

/**
 * 4. Retrieve a single lead by its ID
 * Route: GET /api/leads/:id
 */
router.get('/:id', getLeadById);

/**
 * 5. Create a new lead
 * Route: POST /api/leads
 */
router.post('/', validate(leadValidationRules), createLead);

/**
 * 6. Update all details of an existing lead
 * Route: PUT /api/leads/:id
 */
router.put('/:id', validate(leadValidationRules), updateLead);

/**
 * 7. Update only status of a lead
 * Route: PATCH /api/leads/:id/status
 */
router.patch('/:id/status', validate(updateStatusValidationRules), updateLeadStatus);

/**
 * 8. Delete a lead
 * Route: DELETE /api/leads/:id
 */
router.delete('/:id', deleteLead);

export default router;
