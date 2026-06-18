import React, { useState, useEffect } from 'react';
import { useLeads } from '../context/LeadContext';
import useAnalytics from '../hooks/useAnalytics';
import AnalyticsFilters from '../components/analytics/AnalyticsFilters';
import StatsCards from '../components/analytics/StatsCards';
import PieChartCard from '../components/analytics/PieChartCard';
import FunnelChartCard from '../components/analytics/FunnelChartCard';
import BarChartCard from '../components/analytics/BarChartCard';
import LineChartCard from '../components/analytics/LineChartCard';
import RevenueChartCard from '../components/analytics/RevenueChartCard';
import LeadSourceChart from '../components/analytics/LeadSourceChart';
import SalesVelocityCard from '../components/analytics/SalesVelocityCard';
import ForecastCard from '../components/analytics/ForecastCard';
import ActivityHeatmap from '../components/analytics/ActivityHeatmap';
import TopPerformersCard from '../components/analytics/TopPerformersCard';
import EmptyAnalyticsState from '../components/analytics/EmptyAnalyticsState';
import LoadingSkeleton from '../components/analytics/LoadingSkeleton';

/**
 * Analytics Page - The core analytics module for Startup CRM Lite.
 * Integrates date timeframe filters, dynamic metrics hook calculations,
 * and responsive chart grids (Doughnut, Funnel, Area, Line, Bar, Heatmap).
 *
 * @component
 * @returns {React.ReactElement} The rendered Analytics page
 */
export const Analytics = () => {
  const { leads: rawLeads } = useLeads();
  const { filterType, setFilterType, customRange, setCustomRange, leads, metrics } = useAnalytics();
  
  // Shimmer effect triggers when switching presets for premium UX feedback
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [filterType]);

  // Fallback: If no leads exist in the entire CRM system
  if (!rawLeads || rawLeads.length === 0) {
    return <EmptyAnalyticsState />;
  }

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Header Panel */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Track sales pipeline performance, conversion rates, and revenue forecasting.</p>
        </div>
        
        {/* Presets and custom pickers */}
        <AnalyticsFilters
          filterType={filterType}
          onFilterChange={setFilterType}
          customRange={customRange}
          onCustomRangeChange={setCustomRange}
        />
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : leads.length === 0 ? (
        <EmptyAnalyticsState />
      ) : (
        <>
          {/* Key KPI Stats Grid */}
          <StatsCards kpis={metrics.kpis} />
          
          {/* Main Charts Matrix - Stacked single column on mobile, 2 columns on tablet & desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Section 2: Doughnut & Funnel */}
            <PieChartCard data={metrics.statusDistribution} />
            <FunnelChartCard data={metrics.funnelData} />

            {/* Section 3: Monthly Ingestion Volume & Win Conversion Curves */}
            <BarChartCard data={metrics.monthlyLeads} />
            <LineChartCard data={metrics.conversionByMonth} />

            {/* Section 4: Won Revenues Areas & Lead Sources */}
            <RevenueChartCard data={metrics.revenueByMonth} />
            <LeadSourceChart data={metrics.leadSourceStats} />

            {/* Section 5: Activity Heatmap & Leaderboard */}
            <ActivityHeatmap data={metrics.heatmapData} />
            <TopPerformersCard data={metrics.topPerformers} />

            {/* Section 6: Next Month Forecaster & Opportunities Velocity */}
            <ForecastCard forecast={metrics.forecast} />
            <SalesVelocityCard leads={leads} />
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
