import React from 'react';
import PropTypes from 'prop-types';
import { Mail, Pencil, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * LeadTable - Renders a structured grid-based table listing lead details (Name, Company,
 * Status, Email, Source, Date Added, Actions) with hover behaviors and edit/delete events.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.leads - Array of lead objects to display
 * @param {Function} props.onEdit - Callback function invoked with the lead object to edit it
 * @param {Function} props.onDelete - Callback function invoked with the lead ID to delete it
 * @returns {React.ReactElement} The rendered LeadTable component
 */
const LeadTable = ({ leads = [], onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden animate-scale-up transition-colors duration-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" aria-label="Leads catalog table">
          <thead>
            <tr className="bg-gray-50/70 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider transition-colors duration-200">
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Company</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Source</th>
              <th className="py-4 px-6">Date Added</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm text-gray-700 dark:text-gray-300">
            {leads.length > 0 ? (
              leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-gray-50/40 dark:hover:bg-gray-700/30 transition-colors duration-150 group"
                >
                  {/* Lead Name */}
                  <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-200">
                    {lead.name}
                  </td>
                  
                  {/* Company */}
                  <td className="py-4 px-6 text-gray-650 dark:text-gray-400 font-medium">
                    {lead.company}
                  </td>
                  
                  {/* Status Badge */}
                  <td className="py-4 px-6">
                    <StatusBadge status={lead.status} />
                  </td>
                  
                  {/* Email */}
                  <td className="py-4 px-6 text-xs font-medium text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1.5 max-w-[180px] truncate">
                      <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <a
                        href={`mailto:${lead.email}`}
                        className="hover:text-primary transition-colors duration-150 truncate"
                      >
                        {lead.email}
                      </a>
                    </div>
                  </td>
                  
                  {/* Source */}
                  <td className="py-4 px-6">
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-900/60 px-2.5 py-0.5 rounded border border-gray-200 dark:border-gray-700">
                      {lead.source}
                    </span>
                  </td>
                  
                  {/* Date Added */}
                  <td className="py-4 px-6 text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {lead.createdAt 
                      ? new Date(lead.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : (lead.date || 'June 16, 2026')}
                  </td>
                  
                  {/* Actions (Pencil & Trash icons) */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(lead)}
                        className="p-1.5 rounded-lg text-gray-400 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-155 cursor-pointer"
                        title={`Edit ${lead.name}`}
                        aria-label={`Edit ${lead.name}`}
                      >
                        <Pencil className="w-4 h-4 stroke-[2.2]" />
                      </button>
                      <button
                        onClick={() => onDelete(lead.id)}
                        className="p-1.5 rounded-lg text-gray-400 dark:text-gray-300 hover:text-danger hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-155 cursor-pointer"
                        title={`Delete ${lead.name}`}
                        aria-label={`Delete ${lead.name}`}
                      >
                        <Trash2 className="w-4 h-4 stroke-[2.2]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="py-16 text-center text-gray-500 dark:text-gray-450 font-semibold bg-gray-50/10 dark:bg-gray-800/10"
                >
                  No leads found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

LeadTable.propTypes = {
  leads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      source: PropTypes.string,
      date: PropTypes.string,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default LeadTable;
