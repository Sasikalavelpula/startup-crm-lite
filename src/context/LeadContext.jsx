import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { leadService } from '../services/leadService';
import { useAuth } from './AuthContext';

// Expose LeadContext
export const LeadContext = createContext(undefined);

/**
 * LeadProvider component that manages CRM lead state and coordinates CRUD operations with the API.
 */
export const LeadProvider = ({ children }) => {
  const { token } = useAuth();
  
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    pages: 1
  });

  // Fetch leads automatically when the user authentication token becomes available
  useEffect(() => {
    if (token) {
      fetchLeads();
    } else {
      setLeads([]);
      setPagination({ total: 0, page: 1, limit: 20, pages: 1 });
    }
  }, [token]);

  /**
   * Fetches all leads from the API with optional filter parameters.
   * @param {Object} [params] - Query filter variables { status, search, page }
   */
  const fetchLeads = async (params = {}) => {
    setIsLoading(true);
    try {
      const response = await leadService.getLeads(params);
      if (response && response.data) {
        // Enforce backward-compatibility with UI components expecting .id property
        const leadsData = response.data.map((lead) => ({
          ...lead,
          id: lead._id || lead.id,
        }));
        setLeads(leadsData);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      }
    } catch (error) {
      console.error('Failed to load leads:', error);
      const errMsg = error.response?.data?.message || error.message || 'Failed to load leads';
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Creates a new lead on the backend.
   * @param {Object} leadData - Form details
   */
  const addLead = async (leadData) => {
    try {
      const response = await leadService.createLead(leadData);
      if (response && response.data) {
        const createdLead = {
          ...response.data,
          id: response.data._id || response.data.id
        };
        setLeads((prev) => [createdLead, ...prev]);
        toast.success('Lead created successfully!', { icon: '🎉' });
        return createdLead;
      }
    } catch (error) {
      console.error('Create lead failure:', error);
      const errMsg = error.response?.data?.message || error.message || 'Failed to create lead';
      toast.error(errMsg);
      throw error;
    }
  };

  /**
   * Updates an existing lead. Supports both (id, data) and (updatedLeadObj) signatures.
   * @param {string|Object} idOrLead - Lead identifier or full updated lead object
   * @param {Object} [dataPayload] - Specific fields to update (if first parameter was id)
   */
  const updateLead = async (idOrLead, dataPayload) => {
    let id = idOrLead;
    let leadData = dataPayload;

    // Detect and unpack updatedLead object passed from Leads.jsx
    if (typeof idOrLead === 'object' && idOrLead !== null && !dataPayload) {
      id = idOrLead._id || idOrLead.id;
      leadData = idOrLead;
    }

    try {
      const response = await leadService.updateLead(id, leadData);
      if (response && response.data) {
        const updated = {
          ...response.data,
          id: response.data._id || response.data.id
        };
        setLeads((prev) =>
          prev.map((l) => (l.id === id || l._id === id ? updated : l))
        );
        toast.success('Lead updated successfully!', { icon: '💾' });
        return updated;
      }
    } catch (error) {
      console.error('Update lead failure:', error);
      const errMsg = error.response?.data?.message || error.message || 'Failed to update lead';
      toast.error(errMsg);
      throw error;
    }
  };

  /**
   * Deletes a lead.
   * @param {string} id - Lead identifier
   */
  const deleteLead = async (id) => {
    try {
      const response = await leadService.deleteLead(id);
      if (response) {
        setLeads((prev) => prev.filter((l) => l.id !== id && l._id !== id));
        toast.success('Lead deleted successfully!', { icon: '🗑️' });
      }
    } catch (error) {
      console.error('Delete lead failure:', error);
      const errMsg = error.response?.data?.message || error.message || 'Failed to delete lead';
      toast.error(errMsg);
      throw error;
    }
  };

  /**
   * Retrieves a cached lead by ID.
   * @param {string} id 
   * @returns {Object|undefined}
   */
  const getLeadById = (id) => {
    return leads.find((l) => l.id === id || l._id === id);
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        isLoading,
        pagination,
        fetchLeads,
        addLead,
        updateLead,
        deleteLead,
        getLeadById,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

/**
 * Custom React hook to consume LeadContext values safely.
 */
export const useLeads = () => {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};
