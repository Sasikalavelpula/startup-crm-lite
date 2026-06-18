import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * BarChartCard - Renders a vertical bar chart representing the volume
 * of new leads created per month over the last 6 months.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.data - Array of monthly items [{name: string, leads: number}]
 * @returns {React.ReactElement} The rendered BarChartCard component
 */
export const BarChartCard = ({ data }) => {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between h-[360px] animate-scale-up transition-colors duration-200">
      {/* Title */}
      <div>
        <h3 className="font-bold text-base text-gray-900 dark:text-white">Monthly Leads Volume</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">Ingestion trends of new prospects generated</p>
      </div>

      {hasData ? (
        <div className="h-64 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                allowDecimals={false}
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
                          {dataObj.leads} {dataObj.leads === 1 ? 'Lead' : 'Leads'}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="leads"
                fill="#2563EB"
                radius={[6, 6, 0, 0]}
                maxBarSize={45}
                isAnimationActive
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-xs text-gray-550 dark:text-gray-400 font-semibold">
          No monthly volume data
        </div>
      )}
    </div>
  );
};

BarChartCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      leads: PropTypes.number.isRequired
    })
  ).isRequired
};

export default React.memo(BarChartCard);
