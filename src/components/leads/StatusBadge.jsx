import React from 'react';
import PropTypes from 'prop-types';

/**
 * StatusBadge - A pill-shaped colored badge to visually display a lead's status.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.status - The current lead status (e.g. 'New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost')
 * @returns {React.ReactElement} The rendered StatusBadge component
 */
const StatusBadge = ({ status }) => {
  /**
   * Helper function to match status strings to Tailwind CSS styling configurations.
   *
   * @param {string} statusVal - The status value to map
   * @returns {Object} Class list and dot indicators for the pill badge
   */
  const getBadgeStyle = (statusVal) => {
    switch (statusVal) {
      case 'New':
        return {
          wrapper: 'bg-slate-100 text-slate-600 border-slate-200',
          dot: 'bg-slate-400',
        };
      case 'Contacted':
        return {
          wrapper: 'bg-blue-50 text-primary border-blue-200',
          dot: 'bg-primary',
        };
      case 'Meeting Scheduled':
        return {
          wrapper: 'bg-indigo-50 text-indigo-650 border-indigo-200',
          dot: 'bg-indigo-600',
        };
      case 'Proposal Sent':
        return {
          wrapper: 'bg-amber-50 text-warning border-amber-200',
          dot: 'bg-warning',
        };
      case 'Won':
        return {
          wrapper: 'bg-green-50 text-success border-green-200',
          dot: 'bg-success',
        };
      case 'Lost':
        return {
          wrapper: 'bg-red-50 text-danger border-red-200',
          dot: 'bg-danger',
        };
      default:
        return {
          wrapper: 'bg-slate-50 text-slate-500 border-slate-200',
          dot: 'bg-slate-400',
        };
    }
  };

  const styles = getBadgeStyle(status);

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${styles.wrapper} shadow-sm transition-all duration-200`}>
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} aria-hidden="true" />
      <span>{status}</span>
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusBadge;
