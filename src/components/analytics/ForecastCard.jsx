import React from 'react';
import PropTypes from 'prop-types';
import { TrendingUp, ArrowUpRight, ArrowDownRight, ShieldCheck } from 'lucide-react';

/**
 * Formats value as Indian Rupee (INR).
 */
const formatINR = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * ForecastCard - Displays next month's predicted revenue based on a 6-month
 * moving average and weighted pipeline opportunities, alongside a confidence bar and growth indicator.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.forecast - Predicted object [{predicted, growth, confidence}]
 * @returns {React.ReactElement} The rendered ForecastCard component
 */
export const ForecastCard = ({ forecast }) => {
  const { predicted = 184000, growth = 5, confidence = 75 } = forecast || {};

  const isPositive = growth >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between h-[360px] animate-scale-up transition-colors duration-200">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-success" />
          <h3 className="font-bold text-base text-gray-900 dark:text-white">Revenue Forecasting</h3>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">Predictive revenue analysis for the next monthly cohort</p>
      </div>

      {/* Main Prediction Output */}
      <div className="space-y-1 py-4.5 border-b border-gray-200 dark:border-gray-700">
        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">Predicted Next Month Revenue</span>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          {formatINR(predicted)}
        </h2>
        
        <div className="flex items-center gap-1.5 pt-1 text-xs">
          <span className={`inline-flex items-center font-bold px-1.5 py-0.5 rounded text-[10px] ${
            isPositive
              ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20'
              : 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/20'
          }`}>
            {isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            {isPositive ? '+' : ''}{growth}% Growth
          </span>
          <span className="text-gray-500 dark:text-gray-400 font-semibold">projected month-on-month</span>
        </div>
      </div>

      {/* Confidence Score Bar */}
      <div className="space-y-2 py-4">
        <div className="flex justify-between items-baseline text-xs font-bold text-gray-500 dark:text-gray-400">
          <span>Confidence Score</span>
          <span className="text-gray-900 dark:text-white font-black">{confidence}%</span>
        </div>

        {/* Shaded Progress Bar */}
        <div className="w-full h-2.5 bg-gray-150 dark:bg-gray-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-success rounded-full transition-all duration-1000"
            style={{ width: `${confidence}%` }}
          />
        </div>

        <p className="text-[10px] text-gray-550 dark:text-gray-400 leading-relaxed font-semibold">
          Weighted model analyzing historical win cycles, status-weighted pipeline distributions, and active sales rep velocities.
        </p>
      </div>

      {/* Summary Footer */}
      <div className="bg-gray-50 dark:bg-gray-900/30 p-2.5 rounded-xl border border-gray-100 dark:border-gray-750 text-[10px] text-gray-500 dark:text-gray-400 font-bold select-none text-center">
        Avg 6M Won Deals baseline adjusted for pipeline probabilities.
      </div>
    </div>
  );
};

ForecastCard.propTypes = {
  forecast: PropTypes.shape({
    predicted: PropTypes.number,
    growth: PropTypes.number,
    confidence: PropTypes.number
  })
};

export default React.memo(ForecastCard);
