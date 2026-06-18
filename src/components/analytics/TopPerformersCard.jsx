import React from 'react';
import PropTypes from 'prop-types';
import { Award, Medal, User } from 'lucide-react';

/**
 * Formats a value as Indian Rupee (INR).
 */
const formatINR = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Gets initials from a sales rep's name.
 */
const getInitials = (name) => {
  if (!name) return 'SR';
  const parts = name.split(' ');
  return parts.map((p) => p[0]).join('').toUpperCase().slice(0, 2);
};

/**
 * TopPerformersCard - Displays a ranked leaderboard of sales representatives
 * based on cumulative closed-won revenue values.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.data - Array of performers [{name: string, value: number}]
 * @returns {React.ReactElement} The rendered TopPerformersCard component
 */
export const TopPerformersCard = ({ data }) => {
  const hasData = Array.isArray(data) && data.length > 0;
  
  // Find top value to calculate contribution ratio
  const maxRevenue = hasData ? data[0].value : 1;

  // Render rank trophy or number helper
  const renderRankBadge = (rank) => {
    switch (rank) {
      case 0:
        return <Award className="w-5 h-5 text-amber-500 stroke-[2.2]" />;
      case 1:
        return <Medal className="w-5 h-5 text-slate-400 stroke-[2.2]" />;
      case 2:
        return <Medal className="w-5 h-5 text-amber-700 stroke-[2.2]" />;
      default:
        return <span className="text-xs font-black text-gray-500 dark:text-gray-400">{rank + 1}</span>;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between h-[360px] animate-scale-up transition-colors duration-200">
      {/* Title */}
      <div>
        <h3 className="font-bold text-base text-gray-900 dark:text-white">Top Performers Leaderboard</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">Sales representatives ranked by won deal values</p>
      </div>

      {/* Performers List Wrapper */}
      {hasData ? (
        <div className="flex-1 mt-6 overflow-y-auto space-y-4 pr-1">
          {data.map((item, idx) => {
            const percentageOfMax = maxRevenue > 0 ? (item.value / maxRevenue) * 100 : 0;
            const initials = getInitials(item.name);
            
            return (
              <div key={idx} className="flex items-center gap-3">
                {/* Ranking Flag */}
                <div className="w-6 flex items-center justify-center flex-shrink-0">
                  {renderRankBadge(idx)}
                </div>

                {/* Avatar with Initials */}
                <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-900 dark:text-white font-bold text-xs border border-gray-200/50 dark:border-gray-700/50 flex-shrink-0">
                  {initials}
                </div>

                {/* Info and Progress Stack */}
                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex justify-between items-baseline text-xs font-semibold">
                    <span className="text-gray-900 dark:text-white font-extrabold truncate">{item.name}</span>
                    <span className="text-gray-900 dark:text-white font-black flex-shrink-0 pl-2">
                      {formatINR(item.value)}
                    </span>
                  </div>
                  
                  {/* Contribution Bar */}
                  <div className="w-full h-1.5 bg-gray-150 dark:bg-gray-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-800 ${
                        idx === 0 
                          ? 'bg-amber-500' 
                          : idx === 1 
                          ? 'bg-slate-400' 
                          : 'bg-primary'
                      }`}
                      style={{ width: `${percentageOfMax}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-xs text-gray-550 dark:text-gray-400 font-semibold">
          No deal performance recorded yet
        </div>
      )}
    </div>
  );
};

TopPerformersCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ).isRequired
};

export default React.memo(TopPerformersCard);
