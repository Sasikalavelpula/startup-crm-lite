/**
 * Color mapping configuration for leads status stages.
 * Supports both standard and long-form status string keys.
 */
export const STATUS_COLORS = {
  New: '#94A3B8',
  Contacted: '#2563EB',
  'Meeting Scheduled': '#F59E0B',
  'Proposal Sent': '#7C3AED',
  Won: '#22C55E',
  Lost: '#EF4444',
  
  // Abbreviated versions for fallback safety
  Meeting: '#F59E0B',
  Proposal: '#7C3AED'
};

/**
 * Array of chart colors for general data visualizations.
 */
export const GENERAL_CHART_COLORS = [
  '#2563EB', // Blue
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#3B82F6', // Light Blue
  '#EF4444'  // Red
];

export default STATUS_COLORS;
