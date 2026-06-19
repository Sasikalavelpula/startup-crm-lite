import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { LayoutGrid, List, Plus, Download } from 'lucide-react';

// Import local lead management components
import LeadForm from '../components/leads/LeadForm';
import LeadCard from '../components/leads/LeadCard';
import LeadTable from '../components/leads/LeadTable';
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/common/FilterBar';
import EmptyState from '../components/common/EmptyState';
import { useLeads } from '../context/LeadContext';
import { useTheme } from '../context/ThemeContext';
import { exportLeadsToCSV } from '../utils/csvExport';

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
  const { leads, addLead, updateLead, deleteLead } = useLeads();
  const { isDarkMode } = useTheme();

  // Primary State Holders
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  
  // Layout and filter states
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'card'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

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
   * Create Operation: Appends a newly compiled lead record to context state list.
   *
   * @param {Object} data - Cleaned form input values
   */
  const handleCreateLead = (data) => {
    addLead(data);
    handleCloseModal();
    toast.success('Lead created successfully!', {
      icon: '🎉',
      style: {
        borderRadius: '12px',
        background: isDarkMode ? '#1E293B' : '#FFFFFF',
        color: isDarkMode ? '#F8FAFC' : '#0F172A',
        border: isDarkMode ? '1px solid #334155' : '1px solid #E2E8F0',
      },
    });
  };

  /**
   * Update Operation: Replaces attributes of the selected lead in context by mapping ID.
   *
   * @param {Object} updatedLead - Lead object containing modified parameters
   */
  const handleUpdateLead = (updatedLead) => {
    updateLead(updatedLead);
    handleCloseModal();
    toast.success('Lead profile updated successfully!', {
      icon: '💾',
      style: {
        borderRadius: '12px',
        background: isDarkMode ? '#1E293B' : '#FFFFFF',
        color: isDarkMode ? '#F8FAFC' : '#0F172A',
        border: isDarkMode ? '1px solid #334155' : '1px solid #E2E8F0',
      },
    });
  };

  /**
   * Delete Operation: Filters out a lead record by ID in context and issues a warning toast.
   *
   * @param {string|number} id - Target lead unique identifier
   */
  const handleDeleteLead = (id) => {
    const leadToDelete = leads.find((l) => l.id === id);
    deleteLead(id);
    
    // React Hot Toast notification (red style) for delete warning actions
    toast.error(`Deleted lead: ${leadToDelete ? leadToDelete.name : 'Lead Profile'}`, {
      icon: '🗑️',
      style: {
        borderRadius: '12px',
        background: isDarkMode ? '#1E293B' : '#FEF2F2',
        color: '#EF4444',
        border: isDarkMode ? '1px solid #7F1D1D' : '1px solid #FEE2E2',
      },
    });
  };

  // Trigger modal display if routed from Dashboard with 'openAddModal' set
  useEffect(() => {
    if (location.state?.openAddModal) {
      const timer = setTimeout(() => {
        handleOpenAddModal();
      }, 0);
      // Clean up routing history to prevent modal triggering on manual page reloads
      window.history.replaceState({}, document.title);
      return () => clearTimeout(timer);
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

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveFilter('All');
  };

  /**
   * Action handler for exporting current filtered list of leads.
   */
  const handleExportFilteredLeads = () => {
    if (filteredLeads.length === 0) {
      toast.error('No leads available to export!');
      return;
    }
    const toastId = toast.loading('Generating export CSV package...');
    setTimeout(() => {
      try {
        exportLeadsToCSV(filteredLeads);
        toast.success(`${filteredLeads.length} leads exported successfully!`, { id: toastId });
      } catch (error) {
        console.error('Export failed:', error);
        toast.error('Failed to export leads data.', { id: toastId });
      }
    }, 800);
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
    <div className="space-y-6 animate-fade-in relative pb-8">
      {/* Toast popup notifications configuration */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Control Actions Ribbon: Search, Filter, View Toggles, Action Trigger */}
      <div className="flex flex-col xl:flex-row justify-between items-stretch xl:items-center gap-4 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
        
        {/* Left Side Controls: Search & Stage Filtering */}
        <div className="flex flex-col gap-3.5 flex-1">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            leads={leads}
          />
        </div>

        {/* Right Side Controls: View Toggles, Export & Add Lead Trigger */}
        <div className="flex flex-wrap items-center justify-between md:justify-start gap-4 w-full md:w-auto">
          
          {/* Toggle View mode panel buttons - Only visible on Tablet (md) viewports */}
          <div className="hidden md:flex lg:hidden items-center bg-gray-100 dark:bg-gray-900 p-1 rounded-lg border border-gray-200 dark:border-gray-750 transition-colors duration-200">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition-all duration-150 cursor-pointer min-h-[36px] flex items-center justify-center ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-gray-800 text-primary shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              title="Table View Layout"
              aria-label="Switch to Table view layout"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`p-2 rounded-md transition-all duration-150 cursor-pointer min-h-[36px] flex items-center justify-center ${
                viewMode === 'card'
                  ? 'bg-white dark:bg-gray-800 text-primary shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              title="Card View Layout"
              aria-label="Switch to Card view layout"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {/* Export CSV Button */}
          <button
            onClick={handleExportFilteredLeads}
            className="flex-1 md:flex-initial px-4.5 py-2.5 min-h-[44px] rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Download className="w-4 h-4 stroke-[2.2]" />
            <span>Export CSV</span>
          </button>

          {/* Add New Lead Trigger Button - Min 44px tap target on mobile */}
          <button
            onClick={handleOpenAddModal}
            className="flex-1 md:flex-initial px-4.5 py-2.5 min-h-[44px] rounded-lg bg-primary hover:bg-primary/95 text-white font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-primary/25 active:scale-98"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add New Lead</span>
          </button>
        </div>
      </div>

      {/* 1. Table view: on desktop always, or on tablet when viewMode === 'table' */}
      <div className={`hidden lg:block ${viewMode === 'table' ? 'md:block' : ''}`}>
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

      {/* 2. Card view: on mobile always, or on tablet when viewMode === 'card' */}
      <div className={`block lg:hidden ${viewMode === 'card' ? 'md:block' : 'md:hidden'}`}>
        {filteredLeads.length === 0 ? (
          <EmptyState
            totalCount={leads.length}
            onClearFilters={handleClearFilters}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-scale-up">
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

      {/* Unified Create/Edit Lead Modal dialog overlay - Full Screen on mobile, centered max-w-lg on tablet+ */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-0 md:p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="form-dialog-title"
        >
          {/* Modal Card frame Container - Full screen w-full h-full on mobile, auto-height max-w-lg rounded-2xl on tablet+ */}
          <div className="bg-white dark:bg-gray-800 w-full h-full md:h-auto md:max-w-lg rounded-none md:rounded-2xl border-0 md:border border-gray-250 dark:border-gray-700 shadow-2xl overflow-y-auto md:overflow-visible p-6 transition-all duration-200">
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
