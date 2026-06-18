import React from 'react';
import PropTypes from 'prop-types';
import { Plus, Users, Download } from 'lucide-react';

/**
 * QuickActions - A component that displays common shortcuts and buttons
 * for immediate operations such as adding a lead, viewing all leads, or exporting data.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onAddLead - Callback function invoked when "Add New Lead" is clicked
 * @param {Function} props.onViewAll - Callback function invoked when "View All Leads" is clicked
 * @param {Function} props.onExportData - Callback function invoked when "Export Data" is clicked
 * @returns {React.ReactElement} The rendered QuickActions component
 */
const QuickActions = ({ onAddLead, onViewAll, onExportData }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between h-full animate-scale-up transition-colors duration-200">
      <div>
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Quick Actions</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Frequently used tools and shortcuts</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-3">
        {/* Add Lead Button */}
        <button
          onClick={onAddLead}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary hover:bg-primary/95 text-white font-semibold text-sm transition-all duration-200 shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/25 cursor-pointer active:scale-98"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Lead</span>
        </button>

        {/* View All Leads Button */}
        <button
          onClick={onViewAll}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold text-sm transition-all duration-200 cursor-pointer active:scale-98"
        >
          <Users className="w-4 h-4 stroke-[2.2]" />
          <span>View All Leads</span>
        </button>

        {/* Export Data Button */}
        <button
          onClick={onExportData}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold text-sm transition-all duration-200 cursor-pointer active:scale-98"
        >
          <Download className="w-4 h-4 stroke-[2.2]" />
          <span>Export Data</span>
        </button>
      </div>
    </div>
  );
};

QuickActions.propTypes = {
  onAddLead: PropTypes.func.isRequired,
  onViewAll: PropTypes.func.isRequired,
  onExportData: PropTypes.func.isRequired,
};

export default QuickActions;
