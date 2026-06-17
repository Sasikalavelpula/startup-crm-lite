import React from 'react';
import PropTypes from 'prop-types';

/**
 * PipelineOverview - Renders a horizontal visual pipeline distribution bar
 * showing the relative abundance of leads at each stage (New, Contacted, Qualified, Negotiating),
 * along with detailed stage counts and financial values.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.leads - Array of lead objects
 * @returns {React.ReactElement} The rendered PipelineOverview component
 */
const PipelineOverview = ({ leads = [] }) => {
  const stages = [
    { key: 'New', name: 'New', color: '#94A3B8', bgClass: 'bg-slate-400', textClass: 'text-slate-500' },
    { key: 'Contacted', name: 'Contacted', color: '#2563EB', bgClass: 'bg-primary', textClass: 'text-primary' },
    { key: 'Qualified', name: 'Qualified', color: '#22C55E', bgClass: 'bg-success', textClass: 'text-success' },
    { key: 'Negotiating', name: 'Negotiating', color: '#F59E0B', bgClass: 'bg-warning', textClass: 'text-warning' },
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
    <div className="bg-card p-6 rounded-2xl border border-slate-200/80 shadow-sm animate-scale-up">
      <div className="flex justify-between items-baseline mb-6">
        <div>
          <h3 className="font-bold text-lg text-text-dark">Pipeline Overview</h3>
          <p className="text-xs text-text-gray">Distribution of leads across sales stages</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-text-gray font-semibold block">Total Pipeline</span>
          <span className="text-lg font-bold text-text-dark">${totalPipelineValue.toLocaleString()}</span>
        </div>
      </div>

      {/* Visual Horizontal Segmented Bar */}
      <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex mb-6">
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
          <div className="w-full h-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-400 font-semibold">
            No active leads in pipeline
          </div>
        )}
      </div>

      {/* Stage Breakdown Legend Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stageStats.map((stage) => (
          <div key={stage.key} className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl flex flex-col hover:bg-slate-50 transition-colors duration-150">
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`w-2 h-2 rounded-full ${stage.bgClass}`} />
              <span className="text-xs font-bold text-text-dark">{stage.name}</span>
            </div>
            
            <div className="flex justify-between items-baseline mt-1">
              <span className="text-lg font-extrabold text-text-dark">{stage.count}</span>
              <span className="text-[10px] font-semibold text-text-gray">
                {stage.percentage.toFixed(0)}%
              </span>
            </div>
            
            <span className="text-[10px] font-medium text-text-gray mt-1">
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
