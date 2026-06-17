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
    <div className="bg-card rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden animate-scale-up">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" aria-label="Leads catalog table">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-xs font-bold text-text-gray uppercase tracking-wider">
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Company</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Source</th>
              <th className="py-4 px-6">Date Added</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-755">
            {leads.length > 0 ? (
              leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-slate-50/40 transition-colors duration-150 group"
                >
                  {/* Lead Name */}
                  <td className="py-4 px-6 font-semibold text-text-dark group-hover:text-primary transition-colors duration-200">
                    {lead.name}
                  </td>
                  
                  {/* Company */}
                  <td className="py-4 px-6 text-slate-600 font-medium">
                    {lead.company}
                  </td>
                  
                  {/* Status Badge */}
                  <td className="py-4 px-6">
                    <StatusBadge status={lead.status} />
                  </td>
                  
                  {/* Email */}
                  <td className="py-4 px-6 text-xs font-medium text-slate-650">
                    <div className="flex items-center gap-1.5 max-w-[180px] truncate">
                      <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
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
                    <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-50 px-2.5 py-0.5 rounded border border-slate-100">
                      {lead.source}
                    </span>
                  </td>
                  
                  {/* Date Added */}
                  <td className="py-4 px-6 text-xs text-text-gray font-medium">
                    {lead.date || 'June 16, 2026'}
                  </td>
                  
                  {/* Actions (Pencil & Trash icons) */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(lead)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-100 transition-all duration-155 cursor-pointer"
                        title={`Edit ${lead.name}`}
                        aria-label={`Edit ${lead.name}`}
                      >
                        <Pencil className="w-4 h-4 stroke-[2.2]" />
                      </button>
                      <button
                        onClick={() => onDelete(lead.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-danger hover:bg-red-50 transition-all duration-155 cursor-pointer"
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
                  className="py-16 text-center text-text-gray font-semibold bg-slate-50/10"
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
