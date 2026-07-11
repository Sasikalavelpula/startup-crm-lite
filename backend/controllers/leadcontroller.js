import mongoose from 'mongoose';
import Lead from '../models/Lead.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/apiResponse.js';

/**
 * Retrieves all leads belonging to the authenticated user with filtering, searching, and pagination.
 * Supports status, search queries, source types, and createdAt date ranges.
 *
 * @async
 * @function getLeads
 * @param {import('express').Request} req - The Express Request object.
 * @param {import('express').Response} res - The Express Response object.
 * @param {import('express').NextFunction} next - The Express Next Function.
 * @returns {Promise<import('express').Response|void>} A paginated JSON response containing the matching leads.
 */
export const getLeads = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      status,
      search,
      source,
      dateFrom,
      dateTo
    } = req.query;

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[getLeads] User: ${req.user._id} | Query:`, req.query);
    }

    // Build filter object: isolate by the authenticated user's ID
    const filter = { owner: req.user._id };

    // Filter by status if provided and is not 'All'
    if (status && status !== 'All') {
      filter.status = status;
    }

    // Filter by source if provided and is not 'All'
    if (source && source !== 'All') {
      filter.source = source;
    }

    // Filter by search query (regex matching name, company, or email)
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = [
        { name: searchRegex },
        { company: searchRegex },
        { email: searchRegex }
      ];
    }

    // Filter by date ranges on createdAt
    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) {
        filter.createdAt.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        filter.createdAt.$lte = new Date(dateTo);
      }
    }

    // Parse and handle pagination indices
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skipNum = (pageNum - 1) * limitNum;

    // Build the sort configuration (asc = 1, desc = -1)
    const sortVal = sortOrder === 'asc' ? 1 : -1;
    const sortObj = { [sortBy]: sortVal };

    // Run query and document count in parallel
    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .sort(sortObj)
        .skip(skipNum)
        .limit(limitNum),
      Lead.countDocuments(filter)
    ]);

    const pages = Math.ceil(total / limitNum) || 1;
    const hasNext = pageNum < pages;
    const hasPrev = pageNum > 1;

    return res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages,
        hasNext,
        hasPrev
      }
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[getLeads Error]: ${error.message}`);
    }
    next(error);
  }
};

/**
 * Creates a new lead owned by the authenticated user.
 *
 * @async
 * @function createLead
 * @param {import('express').Request} req - The Express Request object.
 * @param {import('express').Response} res - The Express Response object.
 * @param {import('express').NextFunction} next - The Express Next Function.
 * @returns {Promise<import('express').Response|void>} A JSON response with the newly created lead details.
 */
export const createLead = async (req, res, next) => {
  try {
    const { name, company, email, phone, status, source, notes, value } = req.body;

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[createLead] User: ${req.user._id} | Body:`, req.body);
    }

    // Create new lead with the authenticated user's ID as the owner
    const newLead = await Lead.create({
      name,
      company,
      email,
      phone,
      status,
      source,
      notes,
      value: value ? parseFloat(value) : 0,
      owner: req.user._id
    });

    return successResponse(res, newLead, 'Lead created successfully', 201);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[createLead Error]: ${error.message}`);
    }
    next(error);
  }
};

/**
 * Retrieves a single lead by its ID, ensuring owner isolation.
 *
 * @async
 * @function getLeadById
 * @param {import('express').Request} req - The Express Request object.
 * @param {import('express').Response} res - The Express Response object.
 * @param {import('express').NextFunction} next - The Express Next Function.
 * @returns {Promise<import('express').Response|void>} A JSON response containing the requested lead.
 */
export const getLeadById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[getLeadById] User: ${req.user._id} | ID: ${id}`);
    }

    // Find the lead by ID and ensure it belongs to the authenticated user
    const lead = await Lead.findOne({ _id: id, owner: req.user._id });
    if (!lead) {
      return errorResponse(res, 'Lead not found', 404);
    }

    return successResponse(res, lead, 'Lead retrieved successfully');
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[getLeadById Error]: ${error.message}`);
    }
    next(error);
  }
};

/**
 * Updates a lead's attributes, ensuring ownership and preventing owner reassignment.
 *
 * @async
 * @function updateLead
 * @param {import('express').Request} req - The Express Request object.
 * @param {import('express').Response} res - The Express Response object.
 * @param {import('express').NextFunction} next - The Express Next Function.
 * @returns {Promise<import('express').Response|void>} A JSON response with the updated lead details.
 */
export const updateLead = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[updateLead] User: ${req.user._id} | ID: ${id} | Body:`, req.body);
    }

    // Isolate updating payload and prevent owner field modification
    const updateData = { ...req.body };
    delete updateData.owner;

    // Find and update the lead, enforcing ownership isolation
    const updatedLead = await Lead.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedLead) {
      return errorResponse(res, 'Lead not found', 404);
    }

    return successResponse(res, updatedLead, 'Lead updated successfully');
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[updateLead Error]: ${error.message}`);
    }
    next(error);
  }
};

/**
 * Updates only the status field of a lead, validating status values and enforcing ownership.
 *
 * @async
 * @function updateLeadStatus
 * @param {import('express').Request} req - The Express Request object.
 * @param {import('express').Response} res - The Express Response object.
 * @param {import('express').NextFunction} next - The Express Next Function.
 * @returns {Promise<import('express').Response|void>} A JSON response with the updated lead details.
 */
export const updateLeadStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[updateLeadStatus] User: ${req.user._id} | ID: ${id} | Status: ${status}`);
    }

    // Validate that the status is a valid Lead.js status enum value
    const validStatuses = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];
    if (!status || !validStatuses.includes(status)) {
      return errorResponse(res, 'Invalid status value', 400);
    }

    // Find and update in a single atomic database operation to ensure owner isolation
    const updatedLead = await Lead.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedLead) {
      return errorResponse(res, 'Lead not found', 404);
    }

    return successResponse(res, updatedLead, 'Lead status updated successfully');
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[updateLeadStatus Error]: ${error.message}`);
    }
    next(error);
  }
};

/**
 * Deletes a lead using Mongoose document deletion, ensuring owner isolation.
 *
 * @async
 * @function deleteLead
 * @param {import('express').Request} req - The Express Request object.
 * @param {import('express').Response} res - The Express Response object.
 * @param {import('express').NextFunction} next - The Express Next Function.
 * @returns {Promise<import('express').Response|void>} A JSON response confirming deletion.
 */
export const deleteLead = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[deleteLead] User: ${req.user._id} | ID: ${id}`);
    }

    // Retrieve the lead and check ownership
    const lead = await Lead.findOne({ _id: id, owner: req.user._id });
    if (!lead) {
      return errorResponse(res, 'Lead not found', 404);
    }

    // Execute deletion using the document .deleteOne() method
    await lead.deleteOne();

    return successResponse(res, null, 'Lead deleted successfully');
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[deleteLead Error]: ${error.message}`);
    }
    next(error);
  }
};

/**
 * Aggregates statistics of leads belonging to the authenticated user in a single database call.
 * Returns totalCount, statusBreakdown, sourceBreakdown, MoM comparison counts, and conversion/growth rates.
 *
 * @async
 * @function getLeadStats
 * @param {import('express').Request} req - The Express Request object.
 * @param {import('express').Response} res - The Express Response object.
 * @param {import('express').NextFunction} next - The Express Next Function.
 * @returns {Promise<import('express').Response|void>} A JSON response containing aggregated lead statistics.
 */
export const getLeadStats = async (req, res, next) => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[getLeadStats] User: ${req.user._id}`);
    }

    const ownerId = new mongoose.Types.ObjectId(req.user._id);

    // Compute calendar dates for Month-over-Month calculations
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    // Execute multiple pipelines in parallel via $facet in a single DB roundtrip
    const aggregationResults = await Lead.aggregate([
      { $match: { owner: ownerId } },
      {
        $facet: {
          totalCount: [
            { $count: 'count' }
          ],
          statusGroup: [
            { $group: { _id: '$status', count: { $sum: 1 } } }
          ],
          sourceGroup: [
            { $group: { _id: '$source', count: { $sum: 1 } } }
          ],
          monthlyCompare: [
            {
              $project: {
                isThisMonth: {
                  $cond: [{ $gte: ['$createdAt', startOfThisMonth] }, 1, 0]
                },
                isLastMonth: {
                  $cond: [
                    {
                      $and: [
                        { $gte: ['$createdAt', startOfLastMonth] },
                        { $lte: ['$createdAt', endOfLastMonth] }
                      ]
                    },
                    1,
                    0
                  ]
                }
              }
            },
            {
              $group: {
                _id: null,
                thisMonthCount: { $sum: '$isThisMonth' },
                lastMonthCount: { $sum: '$isLastMonth' }
              }
            }
          ]
        }
      }
    ]);

    const results = aggregationResults[0];
    const totalLeads = results.totalCount[0]?.count || 0;

    // 1. Status Breakdown mapping (ensures all statuses default to 0)
    const statusBreakdown = {
      New: 0,
      Contacted: 0,
      'Meeting Scheduled': 0,
      'Proposal Sent': 0,
      Won: 0,
      Lost: 0
    };
    if (results.statusGroup) {
      results.statusGroup.forEach(group => {
        if (group._id in statusBreakdown) {
          statusBreakdown[group._id] = group.count;
        }
      });
    }

    // 2. Source Breakdown mapping (ensures all sources default to 0)
    const sourceBreakdown = {
      Website: 0,
      Referral: 0,
      LinkedIn: 0,
      'Cold Call': 0,
      'Email Campaign': 0,
      Other: 0
    };
    if (results.sourceGroup) {
      results.sourceGroup.forEach(group => {
        if (group._id in sourceBreakdown) {
          sourceBreakdown[group._id] = group.count;
        }
      });
    }

    // 3. Conversion Rate: (Won / Total) * 100 (handles edge case division by zero)
    const won = statusBreakdown.Won || 0;
    const conversionRate = totalLeads > 0 ? parseFloat(((won / totalLeads) * 100).toFixed(1)) : 0.0;

    // 4. MoM Leads Ingest counts
    const thisMonthLeads = results.monthlyCompare[0]?.thisMonthCount || 0;
    const lastMonthLeads = results.monthlyCompare[0]?.lastMonthCount || 0;

    // 5. Growth Rate: ((ThisMonth - LastMonth) / LastMonth) * 100 (handles edge case division by zero)
    let growthRate = 0.0;
    if (lastMonthLeads > 0) {
      growthRate = parseFloat((((thisMonthLeads - lastMonthLeads) / lastMonthLeads) * 100).toFixed(1));
    } else {
      growthRate = thisMonthLeads > 0 ? 100.0 : 0.0;
    }

    const statsObj = {
      totalLeads,
      statusBreakdown,
      conversionRate,
      sourceBreakdown,
      thisMonthLeads,
      lastMonthLeads,
      growthRate
    };

    return successResponse(res, statsObj, 'Lead statistics retrieved successfully');
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[getLeadStats Error]: ${error.message}`);
    }
    next(error);
  }
};

/**
 * Aggregates and groups leads by year and month for the last 6 calendar months.
 * Returns a chronological list of months containing total, won, lost counts, and conversion rate.
 *
 * @async
 * @function getMonthlyStats
 * @param {import('express').Request} req - The Express Request object.
 * @param {import('express').Response} res - The Express Response object.
 * @param {import('express').NextFunction} next - The Express Next Function.
 * @returns {Promise<import('express').Response|void>} A JSON response containing the monthly trend array.
 */
export const getMonthlyStats = async (req, res, next) => {
  try {
    // Calculate date exactly 5 months prior to the first of the current month (6 months total)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setDate(1); // Set to 1st first to prevent month subtraction overflow
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[getMonthlyStats] User: ${req.user._id} | Fetching from: ${sixMonthsAgo}`);
    }

    const ownerId = new mongoose.Types.ObjectId(req.user._id);

    // Run aggregation pipeline to group by year and month
    const results = await Lead.aggregate([
      {
        $match: {
          owner: ownerId,
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          total: { $sum: 1 },
          won: {
            $sum: {
              $cond: [{ $eq: ['$status', 'Won'] }, 1, 0]
            }
          },
          lost: {
            $sum: {
              $cond: [{ $eq: ['$status', 'Lost'] }, 1, 0]
            }
          }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyStats = [];

    // Chronologically generate the 6 months leading up to and including the current month
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setDate(1); // Ensure first day of month to avoid boundary month overflow
      d.setMonth(d.getMonth() - i);
      const year = d.getFullYear();
      const monthIndex = d.getMonth();
      const monthName = monthNames[monthIndex];

      // Match MongoDB aggregation results (Mongoose $month returns 1-12; JS getMonth returns 0-11)
      const matchedResult = results.find(
        (r) => r._id.year === year && r._id.month === (monthIndex + 1)
      );

      const total = matchedResult ? matchedResult.total : 0;
      const won = matchedResult ? matchedResult.won : 0;
      const lost = matchedResult ? matchedResult.lost : 0;
      const conversionRate = total > 0 ? parseFloat(((won / total) * 100).toFixed(1)) : 0.0;

      monthlyStats.push({
        month: `${monthName} ${year}`,
        total,
        won,
        lost,
        conversionRate
      });
    }

    return successResponse(res, monthlyStats, 'Monthly statistics retrieved successfully');
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[getMonthlyStats Error]: ${error.message}`);
    }
    next(error);
  }
};

/**
 * Autocomplete quick search query matching lead names, company names, or emails.
 * Projection restricted to _id, name, company, email, status. Limits to 5 matches by default.
 *
 * @async
 * @function searchLeads
 * @param {import('express').Request} req - The Express Request object.
 * @param {import('express').Response} res - The Express Response object.
 * @param {import('express').NextFunction} next - The Express Next Function.
 * @returns {Promise<import('express').Response|void>} A JSON response containing autocomplete results.
 */
export const searchLeads = async (req, res, next) => {
  try {
    const { q, limit = 5 } = req.query;

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[searchLeads] User: ${req.user._id} | Query: "${q}"`);
    }

    const filter = { owner: req.user._id };

    // Apply regex search on q if provided
    if (q) {
      const searchRegex = new RegExp(q, 'i');
      filter.$or = [
        { name: searchRegex },
        { company: searchRegex },
        { email: searchRegex }
      ];
    }

    const limitNum = parseInt(limit, 10) || 5;

    const results = await Lead.find(filter)
      .select('_id name company email status')
      .limit(limitNum);

    return successResponse(res, results, 'Autocomplete search completed successfully');
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[searchLeads Error]: ${error.message}`);
    }
    next(error);
  }
};
