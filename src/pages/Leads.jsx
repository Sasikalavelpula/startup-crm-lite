import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { LayoutGrid, List, Plus } from 'lucide-react';

// Import local lead management components
import LeadForm from '../components/leads/LeadForm';
import LeadCard from '../components/leads/LeadCard';
import LeadTable from '../components/leads/LeadTable';
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/common/FilterBar';
import EmptyState from '../components/common/EmptyState';

/**
 * Initial leads database populated with standard seed values.
 * Fields include unique IDs, names, contact channels, statuses, values, capture sources, and dates.
 */
const initialLeads = [
  { id: 1, name: 'Alice Smith', email: 'alice@technova.io', company: 'TechNova', status: 'Contacted', value: 4500, phone: '+1 (555) 019-2834', source: 'LinkedIn', date: 'June 15, 2026' },
  { id: 2, name: 'Bob Johnson', email: 'bob@greenvibe.com', company: 'GreenVibe Corp', status: 'Won', value: 12000, phone: '+1 (555) 014-9821', source: 'Website', date: 'June 14, 2026' },
  { id: 3, name: 'Clara Oswald', email: 'clara@starlight.co', company: 'Starlight Media', status: 'Proposal Sent', value: 8500, phone: '+1 (555) 016-5544', source: 'Referral', date: 'June 12, 2026' },
  { id: 4, name: 'David Miller', email: 'david@apexsol.com', company: 'Apex Solutions', status: 'New', value: 2300, phone: '+1 (555) 012-7711', source: 'Cold Call', date: 'June 11, 2026' },
  { id: 5, name: 'Emma Watson', email: 'emma@lumina.org', company: 'Lumina Group', status: 'Meeting Scheduled', value: 15000, phone: '+1 (555) 018-3489', source: 'Email Campaign', date: 'June 10, 2026' },
];

/**
 * Leads Page - The core CRM Lead Management console.
 * Houses state machine for CRUD actions, layouts (Table grid vs Card listings),
 * and handles localized search, status segment filtering, and visual hot-toasts.
 *
 * @component
 * @returns {React.ReactElement} The rendered Leads page
 */
const Leads = () => {
  const location = useLocation();

  // Primary State Holders
  const [leads, setLeads] = useState(initialLeads);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  
  // Layout and filter states
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'card'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Trigger modal display if routed from Dashboard with 'openAddModal' set
  useEffect(() => {
    if (location.state?.openAddModal) {
      handleOpenAddModal();
      // Clean up routing history to prevent modal triggering on manual page reloads
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Accessibility: Listen for Escape key down to exit the modal overlay
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  /**
   * Modal Open Handler: Instantiates state for adding a fresh lead.
   */
  const handleOpenAddModal = () => {
    setSelectedLead(null);
    setIsModalOpen(true);
  };

  /**
   * Modal Open Handler: Prepares state for editing an existing lead.
   *
   * @param {Object} lead - The lead object targeted for modification
   */
  const handleOpenEditModal = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  /**
   * Modal Close Handler: Dismantles state values and closes overlay.
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  /**
   * Form Submit Router: Redirects form actions to Create or Update sequences.
   *
   * @param {Object} formData - Form input values collected from the LeadForm
   */
  const handleFormSubmit = (formData) => {
    if (selectedLead) {
      handleUpdateLead({ ...selectedLead, ...formData });
    } else {
      handleCreateLead(formData);
    }
  };

  /**
   * Create Operation: Appends a newly compiled lead record to state list.
   *
   * @param {Object} data - Cleaned form input values
   */
  const handleCreateLead = (data) => {
    const newLead = {
      ...data,
      id: Date.now(), // Generate numerical ID
      value: data.value ? parseFloat(data.value) : 0,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setLeads([newLead, ...leads]);
    handleCloseModal();
    toast.success('Lead created successfully!', {
      icon: '🎉',
      style: {
        borderRadius: '12px',
        background: '#FFFFFF',
        color: '#0F172A',
        border: '1px solid #E2E8F0',
      },
    });
  };

  /**
   * Update Operation: Replaces attributes of the selected lead by mapping ID.
   *
   * @param {Object} updatedLead - Lead object containing modified parameters
   */
  const handleUpdateLead = (updatedLead) => {
    setLeads(leads.map((l) => (l.id === updatedLead.id ? updatedLead : l)));
    handleCloseModal();
    toast.success('Lead profile updated successfully!', {
      icon: '💾',
      style: {
        borderRadius: '12px',
        background: '#FFFFFF',
        color: '#0F172A',
        border: '1px solid #E2E8F0',
      },
    });
  };

  /**
   * Delete Operation: Filters out a lead record by ID and issues a warning toast.
   *
   * @param {string|number} id - Target lead unique identifier
   */
  const handleDeleteLead = (id) => {
    const leadToDelete = leads.find((l) => l.id === id);
    setLeads(leads.filter((l) => l.id !== id));
    
    // React Hot Toast notification (red style) for delete warning actions
    toast.error(`Deleted lead: ${leadToDelete ? leadToDelete.name : 'Lead Profile'}`, {
      icon: '🗑️',
      style: {
        borderRadius: '12px',
        background: '#FEF2F2',
        color: '#EF4444',
        border: '1px solid #FEE2E2',
      },
    });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveFilter('All');
  };

  const filteredLeads = leads
    .filter((lead) => activeFilter === 'All' || lead.status === activeFilter)
    .filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Toast popup notifications configuration */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Control Actions Ribbon: Search, Filter, View Toggles, Action Trigger */}
      <div className="flex flex-col xl:flex-row justify-between items-stretch xl:items-center gap-4 bg-card p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        
        {/* Left Side Controls: Search & Stage Filtering */}
        <div className="flex flex-col gap-3 flex-1">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            leads={leads}
          />
        </div>

        {/* Right Side Controls: View Toggles & Add Lead Trigger */}
        <div className="flex items-center justify-between sm:justify-start gap-4">
          
          {/* Toggle View mode panel buttons */}
          <div className="flex items-center bg-slate-100/80 p-1 rounded-lg border border-slate-200/50">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-all duration-150 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-text-gray hover:text-text-dark'
              }`}
              title="Table View Layout"
              aria-label="Switch to Table view layout"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`p-1.5 rounded-md transition-all duration-150 cursor-pointer ${
                viewMode === 'card'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-text-gray hover:text-text-dark'
              }`}
              title="Card View Layout"
              aria-label="Switch to Card view layout"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {/* Add New Lead Trigger Button */}
          <button
            onClick={handleOpenAddModal}
            className="px-4.5 py-2.5 rounded-lg bg-primary hover:bg-primary/95 text-white font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-primary/25 active:scale-98"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add New Lead</span>
          </button>
        </div>
      </div>

      {/* Main Catalog View rendering */}
      {viewMode === 'table' ? (
        <div className="hidden md:block">
          {filteredLeads.length === 0 ? (
            <EmptyState
              totalCount={leads.length}
              onClearFilters={handleClearFilters}
            />
          ) : (
            <LeadTable
              leads={filteredLeads}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteLead}
            />
          )}
        </div>
      ) : null}

      {/* Renders Grid Card layout on toggle selection OR as stack structure for mobile viewports */}
      <div className={`${viewMode === 'card' ? 'block' : 'block md:hidden'}`}>
        {filteredLeads.length === 0 ? (
          <EmptyState
            totalCount={leads.length}
            onClearFilters={handleClearFilters}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteLead}
              />
            ))}
          </div>
        )}
      </div>

      {/* Unified Create/Edit Lead Modal dialog overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="form-dialog-title"
        >
          {/* Modal Card frame Container */}
          <div className="bg-card w-full max-w-lg rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-scale-up p-6">
            <LeadForm
              initialData={selectedLead}
              onSubmit={handleFormSubmit}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
