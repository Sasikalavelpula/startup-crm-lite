import api from './api';

/**
 * Lead service facilitating CRUD operations and statistics ingestion.
 */
export const leadService = {
  /**
   * Retrieves all leads owned by the user, applying optional status, search queries, and pagination.
   * @param {Object} [params] - Query filter parameters { status, search, page, limit }
   * @returns {Promise<Object>} The paginated API response containing leads and pagination info
   */
  getLeads: async (params) => {
    const response = await api.get('/api/leads', { params });
    return response.data;
  },

  /**
   * Creates a new lead record.
   * @param {Object} leadData - Form details of the lead to construct
   * @returns {Promise<Object>} The API response containing the newly created lead object
   */
  createLead: async (leadData) => {
    const response = await api.post('/api/leads', leadData);
    return response.data;
  },

  /**
   * Modifies an existing lead.
   * @param {string} id - Lead unique database ObjectId
   * @param {Object} leadData - Properties to update
   * @returns {Promise<Object>} The updated lead record
   */
  updateLead: async (id, leadData) => {
    const response = await api.put(`/api/leads/${id}`, leadData);
    return response.data;
  },

  /**
   * Updates only the pipeline status of a lead.
   * @param {string} id - Lead unique identifier
   * @param {string} status - Target status enum value
   * @returns {Promise<Object>} The updated lead record
   */
  updateLeadStatus: async (id, status) => {
    const response = await api.patch(`/api/leads/${id}/status`, { status });
    return response.data;
  },

  /**
   * Deletes a lead.
   * @param {string} id - Lead unique identifier
   * @returns {Promise<Object>} API response confirming deletion
   */
  deleteLead: async (id) => {
    const response = await api.delete(`/api/leads/${id}`);
    return response.data;
  },

  /**
   * Retrieves aggregated KPI totals and conversion metrics.
   * @returns {Promise<Object>} Lead statistics summary
   */
  getLeadStats: async () => {
    const response = await api.get('/api/leads/stats');
    return response.data;
  },

  /**
   * Retrieves monthly lead trends over the last 6 months.
   * @returns {Promise<Object>} Lead trends array
   */
  getMonthlyStats: async () => {
    const response = await api.get('/api/leads/monthly-stats');
    return response.data;
  },
};

export default leadService;
