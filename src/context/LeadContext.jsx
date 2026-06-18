import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import sampleLeads from '../data/sampleLeads';

/**
 * TypeScript-style shape of the Lead object:
 * 
 * interface Lead {
 *   id: string;
 *   name: string;
 *   company: string;
 *   email: string;
 *   phone: string;
 *   status: 'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Won' | 'Lost';
 *   source: 'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Email Campaign' | 'Other';
 *   createdAt: string; // ISO date string
 *   value?: number; // Financial deal value (optional, derived/used in pipeline and stats)
 * }
 */

/**
 * Context object for managing leads state and actions.
 */
export const LeadContext = createContext(undefined);

/**
 * LeadProvider component that manages lead state and provides CRUD actions.
 * Synchronizes list state automatically using the custom useLocalStorage hook.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components to wrap
 * @returns {React.ReactElement} The Context Provider wrapping child elements
 */
export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useLocalStorage('startup-crm-leads', sampleLeads);

  /**
   * Creates a new lead, prepending it to the leads collection.
   * Automatically generates a unique ID and appends a createdAt ISO date.
   *
   * @param {Omit<Lead, 'id' | 'createdAt'>} leadData - Inputs for the new lead from the form
   * @returns {void}
   */
  const addLead = (leadData) => {
    const newLead = {
      ...leadData,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      createdAt: new Date().toISOString(),
      value: leadData.value ? parseFloat(leadData.value) : 0,
    };
    setLeads([newLead, ...leads]);
  };

  /**
   * Updates fields of an existing lead by matching ID.
   *
   * @param {Lead} updatedLead - Lead object containing modified attributes and target ID
   * @returns {void}
   */
  const updateLead = (updatedLead) => {
    setLeads(leads.map((l) => (l.id === updatedLead.id ? updatedLead : l)));
  };

  /**
   * Deletes a lead from state by ID.
   *
   * @param {string} id - The unique ID of the lead to delete
   * @returns {void}
   */
  const deleteLead = (id) => {
    setLeads(leads.filter((l) => l.id !== id));
  };

  /**
   * Searches and returns a lead by its unique ID.
   *
   * @param {string} id - The unique ID of the lead to retrieve
   * @returns {Lead | undefined} The matching lead object or undefined
   */
  const getLeadById = (id) => {
    return leads.find((l) => l.id === id);
  };

  return (
    <LeadContext.Provider value={{ leads, addLead, updateLead, deleteLead, getLeadById }}>
      {children}
    </LeadContext.Provider>
  );
};

/**
 * Custom React hook to access leads state and actions.
 * Throws an error if used outside a LeadProvider wrapper.
 *
 * @throws {Error} If context is undefined (hook used outside LeadProvider)
 * @returns {{ leads: Lead[], addLead: Function, updateLead: Function, deleteLead: Function, getLeadById: Function }} Leads context value
 */
export const useLeads = () => {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};
