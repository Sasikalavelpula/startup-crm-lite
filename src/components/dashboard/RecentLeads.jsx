import React from 'react';
import PropTypes from 'prop-types';

/**
 * RecentLeads - Displays a table of the 5 most recently added or modified leads,
 * showing lead name, company, stage status, and addition date.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.leads - Complete list of leads
 * @returns {React.ReactElement} The rendered RecentLeads component
 */
const RecentLeads = ({ leads = [] }) => {
  // Take the top 5 leads (assumed to be sorted or pre-ordered by newest)
  const recentLeads = [...leads].slice(0, 5);

  /**
   * Helper to render appropriate color classes for lead status badges.
   *
   * @param {string} status - Lead stage status
   * @returns {string} Tailwind CSS color classes
   */
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Won':
        return 'bg-green-50 dark:bg-green-950/20 text-success dark:text-green-400 border-green-200 dark:border-green-800';
      case 'Meeting Scheduled':
        return 'bg-amber-50 dark:bg-amber-950/20 text-warning dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'Proposal Sent':
        return 'bg-indigo-50 dark:bg-indigo-950/20 text-indigo-650 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800';
      case 'Contacted':
        return 'bg-blue-50 dark:bg-blue-950/20 text-primary dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Lost':
        return 'bg-red-50 dark:bg-red-950/20 text-danger dark:text-red-400 border-red-200 dark:border-red-800';
      case 'New':
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden animate-scale-up transition-colors duration-200">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center transition-colors duration-200">
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">Recent Lead Activity</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Leads added or modified in the last 48 hours</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/70 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider transition-colors duration-200">
              <th className="py-3.5 px-6">Name</th>
              <th className="py-3.5 px-6">Company</th>
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6">Date Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm text-gray-700 dark:text-gray-300">
            {recentLeads.length > 0 ? (
              recentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/40 dark:hover:bg-gray-800/40 transition-colors duration-150 group">
                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-200">
                    {lead.name}
                  </td>
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-400">{lead.company}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadgeClass(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-gray-500 dark:text-gray-400">
                    {lead.createdAt 
                      ? new Date(lead.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : (lead.date || 'June 16, 2026')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-12 text-center text-gray-500 dark:text-gray-400 font-medium">
                  No recent leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

RecentLeads.propTypes = {
  leads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      company: PropTypes.string,
      status: PropTypes.string.isRequired,
      date: PropTypes.string,
      createdAt: PropTypes.string,
    })
  ),
};

export default RecentLeads;
