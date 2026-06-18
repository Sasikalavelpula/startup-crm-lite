import React from 'react';
import PropTypes from 'prop-types';
import { Mail, Phone, Pencil, Trash2, Building2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * LeadCard - Renders a single CRM lead inside an interactive visual card,
 * showcasing contact details, status indicator, and options to edit or remove the lead.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.lead - The lead object containing details
 * @param {string|number} props.lead.id - Unique ID of the lead
 * @param {string} props.lead.name - Name of the lead
 * @param {string} props.lead.company - Associated company name
 * @param {string} props.lead.status - Current CRM stage/status
 * @param {string} props.lead.email - Email address
 * @param {string} [props.lead.phone] - Phone number (optional)
 * @param {string} [props.lead.source] - Lead capture source (optional)
 * @param {Function} props.onEdit - Callback invoked with the lead object to initiate editing
 * @param {Function} props.onDelete - Callback invoked with the lead's ID to delete it
 * @returns {React.ReactElement} The rendered LeadCard component
 */
const LeadCard = ({ lead, onEdit, onDelete }) => {
  return (
    <article className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between min-h-[200px] animate-scale-up group">
      <div>
        {/* Header: Name and Stage Badge */}
        <div className="flex justify-between items-start gap-3 mb-3">
          <div className="min-w-0">
            <h4 className="font-bold text-base text-gray-900 dark:text-white truncate leading-snug group-hover:text-primary transition-colors duration-200">
              {lead.name}
            </h4>
            
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
              <Building2 className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
              <span className="truncate">{lead.company}</span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <StatusBadge status={lead.status} />
          </div>
        </div>

        {/* Lead Contact Info Block */}
        <div className="space-y-2 py-3 border-t border-b border-gray-100 dark:border-gray-700 text-xs text-gray-650 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 stroke-[1.8]" />
            <a href={`mailto:${lead.email}`} className="hover:text-primary truncate transition-colors duration-150">
              {lead.email}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 stroke-[1.8]" />
            {lead.phone && lead.phone !== 'n/a' ? (
              <a href={`tel:${lead.phone}`} className="hover:text-primary transition-colors duration-150">
                {lead.phone}
              </a>
            ) : (
              <span className="text-gray-400 dark:text-gray-500 italic">No phone added</span>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Buttons Footer */}
      <div className="flex justify-between items-center mt-4 pt-1">
        {lead.source && (
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 px-2 py-0.5 rounded">
            {lead.source}
          </span>
        )}
        
        <div className="flex items-center gap-2 ml-auto">
          {/* Edit Trigger */}
          <button
            onClick={() => onEdit(lead)}
            className="p-1.5 rounded-lg text-gray-400 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer"
            title={`Edit ${lead.name}`}
            aria-label={`Edit ${lead.name}`}
          >
            <Pencil className="w-4 h-4 stroke-[2.2]" />
          </button>

          {/* Delete Trigger */}
          <button
            onClick={() => onDelete(lead.id)}
            className="p-1.5 rounded-lg text-gray-400 dark:text-gray-300 hover:text-danger hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200 cursor-pointer"
            title={`Delete ${lead.name}`}
            aria-label={`Delete ${lead.name}`}
          >
            <Trash2 className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>
    </article>
  );
};

LeadCard.propTypes = {
  lead: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string,
    source: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default LeadCard;
