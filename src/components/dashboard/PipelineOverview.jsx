import React from 'react';
import PropTypes from 'prop-types';

/**
 * PipelineOverview - Renders a horizontal visual pipeline distribution bar
 * showing the relative abundance of leads at each stage (New, Contacted, Meeting Scheduled, Proposal Sent, Won, Lost),
 * along with detailed stage counts and financial values.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.leads - Array of lead objects
 * @returns {React.ReactElement} The rendered PipelineOverview component
 */
const PipelineOverview = ({ leads = [] }) => {
  const stages = [
    { key: 'New', name: 'New', bgClass: 'bg-slate-400 dark:bg-slate-500', textClass: 'text-slate-500 dark:text-slate-400' },
    { key: 'Contacted', name: 'Contacted', bgClass: 'bg-primary', textClass: 'text-primary' },
    { key: 'Meeting Scheduled', name: 'Meeting', bgClass: 'bg-warning', textClass: 'text-warning' },
    { key: 'Proposal Sent', name: 'Proposal', bgClass: 'bg-indigo-500', textClass: 'text-indigo-500' },
    { key: 'Won', name: 'Won', bgClass: 'bg-success', textClass: 'text-success' },
    { key: 'Lost', name: 'Lost', bgClass: 'bg-danger', textClass: 'text-danger' },
  ];

  const totalLeads = leads.length;

  // Calculate metrics per stage
  const stageStats = stages.map((stage) => {
    const stageLeads = leads.filter((l) => l.status === stage.key);
    const count = stageLeads.length;
    const value = stageLeads.reduce((sum, l) => sum + (Number(l.value) || 0), 0);
    const percentage = totalLeads > 0 ? (count / totalLeads) * 100 : 0;

    return {
      ...stage,
      count,
      value,
      percentage,
    };
  });

  const totalPipelineValue = leads.reduce((sum, l) => sum + (Number(l.value) || 0), 0);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm animate-scale-up transition-colors duration-200">
      <div className="flex justify-between items-baseline mb-6">
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">Pipeline Overview</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Distribution of leads across sales stages</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold block">Total Pipeline</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">${totalPipelineValue.toLocaleString()}</span>
        </div>
      </div>

      {/* Visual Horizontal Segmented Bar */}
      <div className="w-full h-4 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden flex mb-6">
        {totalLeads > 0 ? (
          stageStats.map((stage) => {
            if (stage.count === 0) return null;
            return (
              <div
                key={stage.key}
                style={{ width: `${stage.percentage}%` }}
                className={`${stage.bgClass} h-full transition-all duration-500 relative group`}
                title={`${stage.name}: ${stage.count} (${stage.percentage.toFixed(0)}%)`}
              />
            );
          })
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] text-gray-400 dark:text-gray-500 font-semibold">
            No active leads in pipeline
          </div>
        )}
      </div>

      {/* Stage Breakdown Legend Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stageStats.map((stage) => (
          <div key={stage.key} className="p-3 bg-gray-50 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-750 rounded-xl flex flex-col hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-150">
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`w-2 h-2 rounded-full ${stage.bgClass}`} />
              <span className="text-xs font-bold text-gray-900 dark:text-white">{stage.name}</span>
            </div>
            
            <div className="flex justify-between items-baseline mt-1">
              <span className="text-lg font-extrabold text-gray-900 dark:text-white">{stage.count}</span>
              <span className="text-[10px] font-semibold text-gray-550 dark:text-gray-400">
                {stage.percentage.toFixed(0)}%
              </span>
            </div>
            
            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mt-1">
              ${stage.value.toLocaleString()} value
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

PipelineOverview.propTypes = {
  leads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      company: PropTypes.string,
      status: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
};

export default PipelineOverview;
