import PropTypes from 'prop-types';

/**
 * EmptyState - Shown when no leads match search/filter or when there are no leads at all.
 *
 * @component
 * @param {Object} props
 * @param {number} props.totalCount - Total number of leads before filtering
 * @param {Function} props.onClearFilters - Resets search and filter state
 */
const EmptyState = ({ totalCount, onClearFilters }) => {
  const isEmptyDatabase = totalCount === 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-12 text-center rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm animate-scale-up">
      {isEmptyDatabase ? (
        <>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No leads yet</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Get started by adding your first lead using the{' '}
            <span className="font-semibold text-gray-900 dark:text-white">Add New Lead</span> button above.
          </p>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No leads found</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            No leads match your current search or filter. Try adjusting your criteria.
          </p>
          <button
            type="button"
            onClick={onClearFilters}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-primary/95 transition-all duration-150 cursor-pointer shadow-sm shadow-primary/25"
          >
            Clear filters
          </button>
        </>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  totalCount: PropTypes.number.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};

export default EmptyState;
