import React from 'react';
import PropTypes from 'prop-types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Formats values into Indian shorthand notation (e.g. ₹1.2L, ₹15k).
 */
const formatShorthandINR = (value) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}k`;
  return `₹${value}`;
};

/**
 * RevenueChartCard - Displays an Area chart of historical won deal revenue per month.
 * Uses linear gradients to fill the area container smoothly.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.data - Array of monthly items [{name: string, revenue: number}]
 * @returns {React.ReactElement} The rendered RevenueChartCard component
 */
export const RevenueChartCard = ({ data }) => {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between h-[360px] animate-scale-up transition-colors duration-200">
      {/* Title */}
      <div>
        <h3 className="font-bold text-base text-gray-900 dark:text-white">Revenue Over Time</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">Growth of closed-won deal values by month</p>
      </div>

      {hasData ? (
        <div className="h-64 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 15, right: 15, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                </linearGradient>
              </defs>
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
                tickFormatter={formatShorthandINR}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const dataObj = payload[0].payload;
                    return (
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-xl shadow-lg text-xs space-y-0.5">
                        <p className="font-bold text-gray-900 dark:text-white">{dataObj.name} Revenue</p>
                        <p className="text-success font-black">
                          ₹{dataObj.revenue.toLocaleString('en-IN')}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#22C55E"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#revenueGradient)"
                isAnimationActive
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-xs text-gray-550 dark:text-gray-400 font-semibold">
          No monthly revenue data
        </div>
      )}
    </div>
  );
};

RevenueChartCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      revenue: PropTypes.number.isRequired
    })
  ).isRequired
};

export default React.memo(RevenueChartCard);
