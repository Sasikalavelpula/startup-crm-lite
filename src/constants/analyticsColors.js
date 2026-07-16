/**
 * Color mapping configuration for leads status stages.
 * Supports both standard and long-form status string keys.
 */
export const STATUS_COLORS = {
  New: 'var(--text-secondary)',
  Contacted: 'var(--primary)',
  'Meeting Scheduled': 'var(--warning)',
  'Proposal Sent': 'var(--secondary)',
  Won: 'var(--success)',
  Lost: 'var(--error)',
  
  // Abbreviated versions for fallback safety
  Meeting: 'var(--warning)',
  Proposal: 'var(--secondary)'
};

/**
 * Array of chart colors for general data visualizations.
 */
export const GENERAL_CHART_COLORS = [
  'var(--primary)',
  'var(--success)',
  'var(--warning)',
  'var(--secondary)',
  'var(--accent)',
  'var(--text-secondary)',
  'var(--error)'
];

export default STATUS_COLORS;
