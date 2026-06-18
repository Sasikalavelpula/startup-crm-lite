import React from 'react';

/**
 * StatsCard - A card component that displays a specific metric with an icon, 
 * a main numeric or text value, and a percentage change indicating status since last month.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - The label/title of the metric (e.g. "Total Leads")
 * @param {string|number} props.value - The main numeric or text value (e.g. "1,248" or "$148,600")
 * @param {React.ComponentType<{ className?: string }>} props.icon - A Lucide React icon component to display
 * @param {string|number} props.change - The percentage change vs last month (e.g. "+12.5%" or "-2.4%")
 * @param {'primary' | 'success' | 'warning' | 'danger'} props.color - Theme color variant to apply
 * @returns {React.ReactElement} The rendered StatsCard component
 */
const StatsCard = ({ title, value, icon: Icon, change, color }) => {
  // Determine if the trend is negative by checking for a minus sign
  const isNegative = String(change).startsWith('-');
  const isNeutral = String(change).startsWith('0') || change === '0%';
  
  // Map our predefined color palette strings to Tailwind CSS classes
  const colorMap = {
    primary: {
      border: 'border-primary',
      iconBg: 'bg-primary/10',
      iconText: 'text-primary',
    },
    success: {
      border: 'border-success',
      iconBg: 'bg-success/10',
      iconText: 'text-success',
    },
    warning: {
      border: 'border-warning',
      iconBg: 'bg-warning/10',
      iconText: 'text-warning',
    },
    danger: {
      border: 'border-danger',
      iconBg: 'bg-danger/10',
      iconText: 'text-danger',
    },
  };

  const activeColors = colorMap[color] || colorMap.primary;

  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 border-l-4 ${activeColors.border} shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 animate-scale-up group`}>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{value}</h3>
        </div>
        
        {/* Icon Container with subtle zoom on hover */}
        {Icon && (
          <div className={`p-3 rounded-xl ${activeColors.iconBg} ${activeColors.iconText} transition-transform duration-300 group-hover:scale-110`}>
            <Icon className="w-5 h-5 stroke-[2.2]" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 mt-4">
        {/* Trend badge */}
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${
          isNegative
            ? 'bg-red-50 dark:bg-red-950/20 text-danger dark:text-red-400 border-red-100 dark:border-red-900'
            : isNeutral
            ? 'bg-gray-50 dark:bg-gray-900 text-gray-550 dark:text-gray-455 border-gray-100 dark:border-gray-800'
            : 'bg-green-50 dark:bg-green-950/20 text-success dark:text-green-400 border-green-100 dark:border-green-900'
        }`}>
          {change}
        </span>
        <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">vs last month</span>
      </div>
    </div>
  );
};

export default StatsCard;
