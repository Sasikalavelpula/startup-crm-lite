import React from 'react';
import PropTypes from 'prop-types';
import { FunnelChart, Funnel, Cell, LabelList, ResponsiveContainer, Tooltip } from 'recharts';

// Stage color mapping
const STAGE_COLORS = {
  New: '#94A3B8',
  Contacted: '#2563EB',
  Meeting: '#F59E0B',
  Proposal: '#7C3AED',
  Won: '#22C55E'
};

/**
 * FunnelChartCard - Displays sales pipeline conversion funnel, showcasing lead volume
 * decay and drop-off percentages between consecutive sales cycle milestones.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.data - Funnel stage items [{stage, count, conversion, dropoff}]
 * @returns {React.ReactElement} The rendered FunnelChartCard component
 */
export const FunnelChartCard = ({ data }) => {
  const hasData = Array.isArray(data) && data.length > 0 && data[0].count > 0;

  // Format Recharts data model
  const chartData = data.map((item) => ({
    value: item.count,
    name: item.stage,
    conversion: item.conversion,
    dropoff: item.dropoff
  }));

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between h-[360px] animate-scale-up transition-colors duration-200">
      {/* Title */}
      <div>
        <h3 className="font-bold text-base text-gray-900 dark:text-white">Sales Funnel</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">Milestone conversion rates and stage drop-offs</p>
      </div>

      {hasData ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 flex-1 mt-4">
          {/* Funnel Visual */}
          <div className="w-full sm:w-1/2 h-52 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const dataObj = payload[0].payload;
                      return (
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-xl shadow-lg text-xs space-y-1">
                          <p className="font-bold text-gray-900 dark:text-white" style={{ color: STAGE_COLORS[dataObj.name] }}>
                            {dataObj.name}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 font-semibold">
                            Volume: {dataObj.value} {dataObj.value === 1 ? 'Lead' : 'Leads'}
                          </p>
                          {dataObj.name !== 'New' && (
                            <>
                              <p className="text-green-600 dark:text-green-400 font-bold">
                                Conv: {dataObj.conversion}%
                              </p>
                              <p className="text-red-500 dark:text-red-400 font-semibold">
                                Drop-off: {dataObj.dropoff}%
                              </p>
                            </>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Funnel
                  data={chartData}
                  dataKey="value"
                  isAnimationActive
                  labelKey="name"
                >
                  <LabelList
                    position="right"
                    fill="var(--text-dark)"
                    stroke="none"
                    dataKey="name"
                    style={{ fontSize: 10, fontWeight: 700 }}
                  />
                  {chartData.map((entry, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={STAGE_COLORS[entry.name] || '#64748B'}
                    />
                  ))}
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed step analysis grid */}
          <div className="flex flex-col gap-2.5 flex-1 w-full max-h-52 overflow-y-auto pr-1">
            {data.map((item, idx) => {
              const color = STAGE_COLORS[item.stage] || '#64748B';
              return (
                <div key={idx} className="flex flex-col text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-55/50 dark:bg-gray-900/30 p-2.5 border border-gray-100 dark:border-gray-750 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: color }}></span>
                      <span className="text-gray-900 dark:text-white font-bold">{item.stage}</span>
                    </div>
                    <span className="font-extrabold text-gray-900 dark:text-white">{item.count}</span>
                  </div>
                  
                  {item.stage !== 'New' && (
                    <div className="flex items-center justify-between text-[10px] mt-1 pt-1 border-t border-gray-150 dark:border-gray-750">
                      <span className="text-green-600 dark:text-green-400 font-bold">
                        ▲ {item.conversion}% Conversion
                      </span>
                      <span className="text-red-500 dark:text-red-400 font-semibold">
                        ▼ {item.dropoff}% Drop-off
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 font-semibold">
          No funnel conversion data available
        </div>
      )}
    </div>
  );
};

FunnelChartCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      stage: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      conversion: PropTypes.number.isRequired,
      dropoff: PropTypes.number.isRequired
    })
  ).isRequired
};

export default React.memo(FunnelChartCard);
