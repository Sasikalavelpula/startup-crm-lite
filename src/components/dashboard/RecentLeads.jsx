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
      case 'Qualified':
        return 'bg-green-50 text-success border-green-200';
      case 'Negotiating':
        return 'bg-amber-50 text-warning border-amber-200';
      case 'Contacted':
        return 'bg-blue-50 text-primary border-blue-200';
      case 'New':
      default:
        return 'bg-slate-50 text-slate-500 border-slate-200';
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden animate-scale-up">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg text-text-dark">Recent Lead Activity</h3>
          <p className="text-xs text-text-gray">Leads added or modified in the last 48 hours</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-xs font-bold text-text-gray uppercase tracking-wider">
              <th className="py-3.5 px-6">Name</th>
              <th className="py-3.5 px-6">Company</th>
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6">Date Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {recentLeads.length > 0 ? (
              recentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/40 transition-colors duration-150 group">
                  <td className="py-4 px-6 font-semibold text-text-dark group-hover:text-primary transition-colors duration-200">
                    {lead.name}
                  </td>
                  <td className="py-4 px-6 text-slate-600">{lead.company}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadgeClass(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-text-gray">
                    {lead.date || 'June 16, 2026'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-12 text-center text-text-gray font-medium">
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
    })
  ),
};

export default RecentLeads;
