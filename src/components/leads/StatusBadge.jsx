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
          wrapper: 'bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-300 border-slate-200 dark:border-slate-700',
          dot: 'bg-slate-400 dark:bg-slate-500',
        };
      case 'Contacted':
        return {
          wrapper: 'bg-blue-50 dark:bg-blue-950/20 text-primary dark:text-blue-400 border-blue-200 dark:border-blue-900',
          dot: 'bg-primary dark:bg-blue-500',
        };
      case 'Meeting Scheduled':
        return {
          wrapper: 'bg-indigo-50 dark:bg-indigo-950/20 text-indigo-650 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900',
          dot: 'bg-indigo-600 dark:bg-indigo-500',
        };
      case 'Proposal Sent':
        return {
          wrapper: 'bg-amber-50 dark:bg-amber-950/20 text-warning dark:text-amber-400 border-amber-200 dark:border-amber-900',
          dot: 'bg-warning dark:bg-amber-500',
        };
      case 'Won':
        return {
          wrapper: 'bg-green-50 dark:bg-green-950/20 text-success dark:text-green-400 border-green-200 dark:border-green-900',
          dot: 'bg-success dark:bg-green-500',
        };
      case 'Lost':
        return {
          wrapper: 'bg-red-50 dark:bg-red-950/20 text-danger dark:text-red-400 border-red-200 dark:border-red-900',
          dot: 'bg-danger dark:bg-red-500',
        };
      default:
        return {
          wrapper: 'bg-slate-50 dark:bg-slate-850 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700',
          dot: 'bg-slate-400 dark:bg-slate-500',
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
