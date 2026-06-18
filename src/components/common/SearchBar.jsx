import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Search, X } from 'lucide-react';

/**
 * SearchBar - Controlled search input with debounced onChange and clear button.
 *
 * @component
 * @param {Object} props
 * @param {string} props.value - Debounced search value from parent
 * @param {Function} props.onChange - Called with debounced value after 300ms
 */
const SearchBar = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    setInputValue(value);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== value) {
        onChange(inputValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, value, onChange]);

  const handleClear = () => {
    setInputValue('');
    onChange('');
  };

  return (
    <div className="relative flex-1 max-w-md">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 dark:text-gray-500 pointer-events-none">
        <Search className="w-4 h-4" />
      </span>
      <input
        type="text"
        placeholder="Search by name, company, or email..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="pl-9 pr-9 py-2.5 w-full text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-150"
        aria-label="Search leads"
      />
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-150 cursor-pointer"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
