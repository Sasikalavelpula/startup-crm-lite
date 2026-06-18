import React from 'react';
import PropTypes from 'prop-types';
import { Calendar } from 'lucide-react';

/**
 * AnalyticsFilters - Button preset triggers and custom calendar pickers.
 * Updates filtering state instantly to refresh downstream Recharts calculations.
 *
 * @component
 * @param {Object} props
 * @param {string} props.filterType - Active filter preset string
 * @param {Function} props.onFilterChange - Selection callback
 * @param {{startDate: string, endDate: string}} props.customRange - Calendar dates selection
 * @param {Function} props.onCustomRangeChange - Calendar change callback
 * @returns {React.ReactElement} The rendered AnalyticsFilters component
 */
export const AnalyticsFilters = ({
  filterType,
  onFilterChange,
  customRange,
  onCustomRangeChange
}) => {
  const options = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Year', 'Custom Range'];

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-white dark:bg-gray-800 p-3 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm w-full md:w-auto transition-colors duration-200">
      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-bold text-[11px] uppercase tracking-wider pl-1">
        <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
        <span>Timeframe</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onFilterChange(opt)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-150 border ${
              filterType === opt
                ? 'bg-primary text-white border-primary shadow-sm shadow-primary/20'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {filterType === 'Custom Range' && (
        <div className="flex items-center gap-2 animate-scale-up w-full md:w-auto mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-150 dark:border-gray-750">
          <input
            type="date"
            value={customRange.startDate || ''}
            onChange={(e) => onCustomRangeChange({ ...customRange, startDate: e.target.value })}
            className="text-xs px-2.5 py-1.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:border-primary text-gray-900 dark:text-white w-full md:w-auto"
            aria-label="Start Date"
          />
          <span className="text-gray-500 dark:text-gray-400 text-xs font-semibold">to</span>
          <input
            type="date"
            value={customRange.endDate || ''}
            onChange={(e) => onCustomRangeChange({ ...customRange, endDate: e.target.value })}
            className="text-xs px-2.5 py-1.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:border-primary text-gray-900 dark:text-white w-full md:w-auto"
            aria-label="End Date"
          />
        </div>
      )}
    </div>
  );
};

AnalyticsFilters.propTypes = {
  filterType: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  customRange: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string
  }).isRequired,
  onCustomRangeChange: PropTypes.func.isRequired
};

export default AnalyticsFilters;
