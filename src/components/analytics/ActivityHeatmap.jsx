import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Calendar, HelpCircle } from 'lucide-react';

/**
 * Gets the color coding class based on action count.
 */
const getHeatmapColorClass = (count) => {
  if (!count || count === 0) return 'bg-slate-100 dark:bg-slate-850/70 border-slate-200/50 dark:border-slate-800/50';
  if (count <= 1) return 'bg-emerald-100 dark:bg-emerald-950/30 border-emerald-200/40';
  if (count <= 2) return 'bg-emerald-300 dark:bg-emerald-900/50 border-emerald-400/40';
  if (count <= 4) return 'bg-emerald-500 dark:bg-emerald-700 border-emerald-600/30';
  return 'bg-emerald-700 dark:bg-emerald-500 border-emerald-800/30';
};

/**
 * Generates dates list representing the last 35 days (5 full weeks).
 */
const getLast35Days = () => {
  const result = [];
  const now = new Date();
  // We align start date to begin at a Sunday/Monday for perfect grid column alignment
  const startOffset = now.getDay() === 0 ? 6 : now.getDay() - 1; // days since Monday
  const totalDays = 35 + startOffset;
  
  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    result.push(d);
  }
  return result;
};

/**
 * ActivityHeatmap - Renders a GitHub-style grid representing daily activity frequency
 * (Leads generated, meetings booked, calls conducted) over the last 5 weeks.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.data - Array of active days [{date: string, count: number}]
 * @returns {React.ReactElement} The rendered ActivityHeatmap component
 */
export const ActivityHeatmap = ({ data = [] }) => {
  const days = useMemo(() => getLast35Days(), []);

  // Hash map for fast O(1) daily frequency lookups
  const dataMap = useMemo(() => {
    const map = {};
    if (Array.isArray(data)) {
      data.forEach((item) => {
        if (item.date) {
          map[item.date] = (map[item.date] || 0) + item.count;
        }
      });
    }
    return map;
  }, [data]);

  const weekDays = ['Mon', 'Wed', 'Fri', 'Sun'];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between h-[360px] animate-scale-up transition-colors duration-200">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-500" />
          <h3 className="font-bold text-base text-gray-900 dark:text-white">Sales Activity Heatmap</h3>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">Frequency of lead actions, meetings, and call events</p>
      </div>

      {/* Grid Heatmap Container */}
      <div className="flex gap-3 flex-1 mt-6 items-center justify-center">
        {/* Day of Week Labels */}
        <div className="flex flex-col justify-between h-28 text-[9px] font-bold text-gray-500/80 dark:text-gray-400/80 pb-2 select-none">
          {weekDays.map((wd) => (
            <span key={wd}>{wd}</span>
          ))}
        </div>

        {/* Calendar Grid Cells */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 justify-center">
            {days.map((day, idx) => {
              const year = day.getFullYear();
              const month = String(day.getMonth() + 1).padStart(2, '0');
              const date = String(day.getDate()).padStart(2, '0');
              const dateStr = `${year}-${month}-${date}`;
              
              const count = dataMap[dateStr] || 0;
              const cellColor = getHeatmapColorClass(count);

              const formattedDate = day.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });

              return (
                <div
                  key={idx}
                  className={`w-3.5 h-3.5 rounded border transition-all duration-200 hover:scale-120 hover:shadow-sm cursor-help relative group ${cellColor}`}
                >
                  {/* Micro tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 dark:bg-gray-950 text-white text-[10px] font-bold py-1 px-2.5 rounded-lg whitespace-nowrap shadow-xl z-50 pointer-events-none">
                    {count} {count === 1 ? 'activity' : 'activities'} on {formattedDate}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend Footer */}
      <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 dark:text-gray-400 border-t border-gray-150 dark:border-gray-700/80 pt-4">
        <span>Showing last 5 weeks</span>
        <div className="flex items-center gap-1 cursor-default select-none">
          <span>Less</span>
          <span className="w-2.5 h-2.5 rounded border bg-slate-100 dark:bg-slate-850/70 border-slate-200/50 dark:border-slate-800/50"></span>
          <span className="w-2.5 h-2.5 rounded border bg-emerald-100 dark:bg-emerald-950/30 border-emerald-200/40"></span>
          <span className="w-2.5 h-2.5 rounded border bg-emerald-300 dark:bg-emerald-900/50 border-emerald-400/40"></span>
          <span className="w-2.5 h-2.5 rounded border bg-emerald-500 dark:bg-emerald-700 border-emerald-600/30"></span>
          <span className="w-2.5 h-2.5 rounded border bg-emerald-700 dark:bg-emerald-500 border-emerald-800/30"></span>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

ActivityHeatmap.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    })
  )
};

export default React.memo(ActivityHeatmap);
