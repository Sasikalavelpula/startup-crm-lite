import React from 'react';

/**
 * LoadingSkeleton - Displays shimmering card and chart structures
 * while analytics states are compiled or fetched asynchronously.
 *
 * @component
 * @returns {React.ReactElement} The rendered LoadingSkeleton component
 */
export const LoadingSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* 6 KPI Skeletons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-3 transition-colors duration-200">
            <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>

      {/* Row 2: Doughnut and Funnel Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4 transition-colors duration-200">
            <div className="flex justify-between items-center">
              <div className="space-y-2 w-1/2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </div>
            <div className="h-64 bg-gray-100 dark:bg-gray-900 rounded-xl flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border-8 border-gray-200 dark:border-gray-750 border-t-gray-300 dark:border-t-gray-600"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Row 3: Monthly Volume and Trend Lines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4 transition-colors duration-200">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
            <div className="h-64 bg-gray-100 dark:bg-gray-900 rounded-xl flex items-end justify-between p-6">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="w-10 bg-gray-250 dark:bg-gray-700 rounded" style={{ height: `${20 + idx * 15}%` }}></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
