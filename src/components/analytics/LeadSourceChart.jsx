import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { GENERAL_CHART_COLORS } from '../../constants/analyticsColors';

/**
 * LeadSourceChart - Renders a horizontal bar chart showing lead counts
 * categorized by capture channel source (e.g. LinkedIn, Website, Referral) sorted descending.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.data - Array of sources [{name: string, count: number}]
 * @returns {React.ReactElement} The rendered LeadSourceChart component
 */
export const LeadSourceChart = ({ data }) => {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between h-[360px] animate-scale-up transition-colors duration-200">
      {/* Title */}
      <div>
        <h3 className="font-bold text-base text-gray-900 dark:text-white">Leads by Capture Source</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">Distribution of prospective client acquisition channels</p>
      </div>

      {hasData ? (
        <div className="h-64 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 10, right: 15, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.3} horizontal={false} />
              <XAxis
                type="number"
                stroke="var(--color-text-gray)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                dy={4}
                allowDecimals={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="var(--color-text-gray)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                dx={-4}
                width={85}
              />
              <Tooltip
                cursor={{ fill: 'var(--color-background)', opacity: 0.2 }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const dataObj = payload[0].payload;
                    return (
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-xl shadow-lg text-xs space-y-0.5">
                        <p className="font-bold text-gray-900 dark:text-white">{dataObj.name}</p>
                        <p className="text-primary font-extrabold">
                          {dataObj.count} {dataObj.count === 1 ? 'Lead' : 'Leads'}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="count"
                fill="#2563EB"
                radius={[0, 6, 6, 0]}
                maxBarSize={25}
                isAnimationActive
              >
                {data.map((entry, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={GENERAL_CHART_COLORS[idx % GENERAL_CHART_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 font-semibold">
          No lead source statistics
        </div>
      )}
    </div>
  );
};

LeadSourceChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    })
  ).isRequired
};

export default React.memo(LeadSourceChart);
