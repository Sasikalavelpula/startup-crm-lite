import PropTypes from 'prop-types';

const FILTER_OPTIONS = [
  'All',
  'New',
  'Contacted',
  'Meeting Scheduled',
  'Proposal Sent',
  'Won',
  'Lost',
];

/**
 * FilterBar - Row of clickable status filter buttons with lead counts.
 *
 * @component
 * @param {Object} props
 * @param {string} props.activeFilter - Currently selected filter
 * @param {Function} props.onFilterChange - Called with new filter value
 * @param {Array<Object>} props.leads - Full leads array for count calculation
 */
const FilterBar = ({ activeFilter, onFilterChange, leads }) => {
  const getCount = (option) => {
    if (option === 'All') return leads.length;
    return leads.filter((lead) => lead.status === option).length;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_OPTIONS.map((option) => {
        const isActive = activeFilter === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onFilterChange(option)}
            aria-pressed={isActive}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out cursor-pointer ${
              isActive
                ? 'bg-primary text-white shadow-sm scale-102'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:scale-102'
            }`}
          >
            {option} ({getCount(option)})
          </button>
        );
      })}
    </div>
  );
};

FilterBar.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  leads: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FilterBar;
