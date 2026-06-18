import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Plus } from 'lucide-react';

/**
 * EmptyAnalyticsState - Display widget shown when there are zero leads matching
 * the active date query criteria. Includes a prominent CTA button that routes users
 * to the Lead console with automated modal activation triggers.
 *
 * @component
 * @returns {React.ReactElement} The rendered EmptyAnalyticsState component
 */
export const EmptyAnalyticsState = () => {
  const navigate = useNavigate();

  /**
   * Action trigger that navigates the user to the lead catalog
   * and prepares state to automatically prompt the Add Lead form overlay.
   */
  const handleAddLeadClick = () => {
    navigate('/leads', { state: { openAddModal: true } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[450px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center animate-scale-up shadow-sm transition-colors duration-200">
      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-full text-primary mb-5 border border-gray-100 dark:border-gray-700">
        <BarChart3 className="w-12 h-12 stroke-[1.5]" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No analytics available yet</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm text-xs mb-6 leading-relaxed">
        Add your first lead to start tracking business performance, sales pipeline health, and team conversion analytics.
      </p>
      <button
        onClick={handleAddLeadClick}
        className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/95 text-white font-semibold text-xs transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-primary/20 hover:shadow-md active:scale-98"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        <span>Add Lead</span>
      </button>
    </div>
  );
};

export default EmptyAnalyticsState;
