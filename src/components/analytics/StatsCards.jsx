import React from 'react';
import PropTypes from 'prop-types';
import { ArrowUpRight, ArrowDownRight, Users, TrendingUp, CheckCircle, DollarSign, Calendar, AlertCircle } from 'lucide-react';

/**
 * Formats a numerical value as Indian Rupee (INR) currency without decimal fractions.
 *
 * @param {number} value
 * @returns {string} Formatted currency text
 */
const formatINR = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * StatsCards - Renders 6 key metrics (Total Leads, Conversion Rate, Pipeline Value,
 * Won Revenue, Average Sales Cycle, and Lost Rate) in a responsive grid.
 * Displays growth rates compared to the previous period with semantic coloring.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.kpis - Key metrics data object compiled by useAnalytics hook
 * @returns {React.ReactElement} The rendered StatsCards component
 */
export const StatsCards = ({ kpis }) => {
  if (!kpis) return null;

  const {
    totalLeads,
    conversionRate,
    pipelineValue,
    wonRevenue,
    averageSalesCycle,
    lostRate
  } = kpis;

  const items = [
    {
      title: 'Total Leads',
      value: totalLeads?.value?.toLocaleString() || '0',
      growth: totalLeads?.growth || 0,
      icon: Users,
      colorClass: 'text-primary bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30',
      suffix: '',
      isLowerBetter: false
    },
    {
      title: 'Conversion Rate',
      value: `${conversionRate?.value || 0}%`,
      growth: conversionRate?.growth || 0,
      icon: TrendingUp,
      colorClass: 'text-success bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900/30',
      suffix: '',
      isLowerBetter: false,
      isPercentagePoint: true
    },
    {
      title: 'Pipeline Value',
      value: formatINR(pipelineValue?.value || 0),
      growth: pipelineValue?.growth || 0,
      icon: DollarSign,
      colorClass: 'text-warning bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30',
      suffix: '',
      isLowerBetter: false
    },
    {
      title: 'Won Revenue',
      value: formatINR(wonRevenue?.value || 0),
      growth: wonRevenue?.growth || 0,
      icon: CheckCircle,
      colorClass: 'text-success bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900/30',
      suffix: '',
      isLowerBetter: false
    },
    {
      title: 'Avg Sales Cycle',
      value: `${averageSalesCycle?.value || 0} Days`,
      growth: averageSalesCycle?.growth || 0,
      icon: Calendar,
      colorClass: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/30',
      suffix: '',
      isLowerBetter: true // Decreasing sales cycle days is good
    },
    {
      title: 'Lost Rate',
      value: `${lostRate?.value || 0}%`,
      growth: lostRate?.growth || 0,
      icon: AlertCircle,
      colorClass: 'text-danger bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30',
      suffix: '',
      isLowerBetter: true, // Lower lost rate is good
      isPercentagePoint: true
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full">
      {items.map((item, idx) => {
        const Icon = item.icon;
        const hasGrowth = item.growth !== 0;
        
        // Semantic color coding check: is the trend positive for business?
        const isPositiveChange = item.isLowerBetter ? item.growth < 0 : item.growth > 0;
        const growthColor = isPositiveChange
          ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30'
          : item.growth === 0
          ? 'text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900'
          : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30';

        const growthLabel = item.isPercentagePoint 
          ? `${item.growth > 0 ? '+' : ''}${item.growth} pp` 
          : `${item.growth > 0 ? '+' : ''}${item.growth}%`;

        return (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            {/* Card Header Label */}
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider truncate">
                {item.title}
              </span>
              <span className={`p-1.5 rounded-lg border flex items-center justify-center ${item.colorClass}`}>
                <Icon className="w-4 h-4 stroke-[2]" />
              </span>
            </div>

            {/* Value & Growth Trend Tag */}
            <div className="space-y-1 mt-auto">
              <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
                {item.value}
              </h3>
              
              <div className="flex items-center gap-1.5 pt-1.5">
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${growthColor}`}>
                  {hasGrowth && (
                    isPositiveChange ? (
                      <ArrowUpRight className="w-3 h-3 stroke-[2.5] mr-0.5" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 stroke-[2.5] mr-0.5" />
                    )
                  )}
                  {item.growth === 0 ? '0% change' : growthLabel}
                </span>
                <span className="text-[9px] text-gray-500 dark:text-gray-400 font-medium">vs prev period</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

StatsCards.propTypes = {
  kpis: PropTypes.shape({
    totalLeads: PropTypes.object,
    conversionRate: PropTypes.object,
    pipelineValue: PropTypes.object,
    wonRevenue: PropTypes.object,
    averageSalesCycle: PropTypes.object,
    lostRate: PropTypes.object
  }).isRequired
};

export default StatsCards;
