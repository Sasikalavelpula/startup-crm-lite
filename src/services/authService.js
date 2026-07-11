import api from './api';

/**
 * Authentication service facilitating signup, login, session termination, and profile updates.
 */
export const authService = {
  /**
   * Registers a new user.
   * @param {string} name 
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<Object>} The API success response body (contains token and user object)
   */
  register: async (name, email, password) => {
    const response = await api.post('/api/auth/register', { name, email, password });
    return response.data;
  },

  /**
   * Logs in an existing user.
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<Object>} The API success response body (contains token and user object)
   */
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },

  /**
   * Performs client-side session logout by cleaning the local token.
   */
  logout: () => {
    localStorage.removeItem('crm-token');
  },

  /**
   * Retrieves the current user's profile details.
   * @returns {Promise<Object>} The API success response body containing user record
   */
  getProfile: async () => {
    const response = await api.get('/api/auth/profile');
    return response.data;
  },

  /**
   * Updates user profile attributes (e.g. name or credentials).
   * @param {Object} data - Form object containing update payloads
   * @returns {Promise<Object>} The updated user profile response
   */
  updateProfile: async (data) => {
    const response = await api.put('/api/auth/profile', data);
    return response.data;
  },
};

export default authService;
