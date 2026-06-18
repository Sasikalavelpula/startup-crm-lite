import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { STATUS_COLORS } from '../../constants/analyticsColors';

/**
 * Custom active shape renderer for slice hover expansion in Recharts.
 */
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

/**
 * PieChartCard - Doughnut status distribution chart with hover interactive scaling,
 * dynamic absolute center metrics, and details legend listing item frequencies and share percentage.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.data - Array of status distribution items [{name, value, percentage}]
 * @returns {React.ReactElement} The rendered PieChartCard component
 */
export const PieChartCard = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const onMouseEnter = useCallback((_, index) => {
    setActiveIndex(index);
  }, []);

  const onMouseLeave = useCallback(() => {
    setActiveIndex(-1);
  }, []);

  const totalLeads = useMemo(() => {
    if (!Array.isArray(data)) return 0;
    return data.reduce((sum, item) => sum + item.value, 0);
  }, [data]);

  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between h-[360px] animate-scale-up transition-colors duration-200">
      {/* Title */}
      <div>
        <h3 className="font-bold text-base text-gray-900 dark:text-white">Lead Status Distribution</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">Proportion of leads active across pipeline stages</p>
      </div>

      {hasData ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 flex-1 mt-4">
          {/* Doughnut Wrapper */}
          <div className="relative w-44 h-44 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={78}
                  paddingAngle={3}
                  dataKey="value"
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  animationDuration={800}
                >
                  {data.map((entry, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={STATUS_COLORS[entry.name] || '#64748B'}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const dataObj = payload[0].payload;
                      return (
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-xl shadow-lg text-xs space-y-1">
                          <p className="font-bold text-gray-900 dark:text-white" style={{ color: STATUS_COLORS[dataObj.name] }}>
                            {dataObj.name}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 font-semibold">
                            {dataObj.value} {dataObj.value === 1 ? 'Lead' : 'Leads'}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 font-semibold">
                            {dataObj.percentage}% of total
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Absolute Center Typography */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-black text-gray-900 dark:text-white leading-none">
                {totalLeads}
              </span>
              <span className="text-[9px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mt-1">
                Total Leads
              </span>
            </div>
          </div>

          {/* Custom Side Legend Panel */}
          <div className="flex flex-col gap-2 flex-1 w-full max-h-48 overflow-y-auto pr-1">
            {data.map((entry, index) => {
              const color = STATUS_COLORS[entry.name] || '#64748B';
              return (
                <div
                  key={index}
                  className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700/40 pb-1.5 last:border-0 last:pb-0"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(-1)}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: color }}></span>
                    <span className="text-gray-900 dark:text-white font-semibold truncate max-w-[100px] sm:max-w-none">{entry.name}</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {entry.value} <span className="text-gray-500 dark:text-gray-400/70 font-normal">({entry.percentage}%)</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 font-semibold">
          No status distribution data
        </div>
      )}
    </div>
  );
};

// Simple memo implementation
import { useMemo } from 'react';

PieChartCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      percentage: PropTypes.number.isRequired
    })
  ).isRequired
};

export default React.memo(PieChartCard);
