import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { useTheme } from '../../context/ThemeContext';

/**
 * LineChartCard - Renders a line chart showing the percentage rate
 * of leads converted to Won status over the last 6 months.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.data - Array of monthly items [{name: string, rate: number}]
 * @returns {React.ReactElement} The rendered LineChartCard component
 */
export const LineChartCard = ({ data }) => {
  const hasData = Array.isArray(data) && data.length > 0;
  const { isDarkMode } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between h-[360px] animate-scale-up transition-colors duration-200">
      {/* Title */}
      <div>
        <h3 className="font-bold text-base text-gray-900 dark:text-white">Monthly Conversion Rate</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">Ratio of leads won vs created per month</p>
      </div>

      {hasData ? (
        <div className="h-64 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 15, right: 15, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.4} vertical={false} />
              <XAxis
                dataKey="name"
                stroke="var(--color-text-gray)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                dy={8}
              />
              <YAxis
                stroke="var(--color-text-gray)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                dx={-8}
                domain={[0, 100]}
                tickFormatter={(val) => `${val}%`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const dataObj = payload[0].payload;
                    return (
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-xl shadow-lg text-xs space-y-0.5">
                        <p className="font-bold text-gray-900 dark:text-white">{dataObj.name}</p>
                        <p className="text-success font-extrabold">
                          {dataObj.rate}% Conversion
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#22C55E"
                strokeWidth={3}
                dot={{ r: 4, stroke: '#22C55E', strokeWidth: 2, fill: isDarkMode ? '#1F2937' : '#FFFFFF' }}
                activeDot={{ r: 6, stroke: '#22C55E', strokeWidth: 2, fill: '#22C55E' }}
                isAnimationActive
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-xs text-gray-550 dark:text-gray-400 font-semibold">
          No monthly conversion data
        </div>
      )}
    </div>
  );
};

LineChartCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired
    })
  ).isRequired
};

export default React.memo(LineChartCard);
