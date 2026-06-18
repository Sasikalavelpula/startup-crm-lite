import { useState, useMemo } from 'react';
import { useLeads } from '../context/LeadContext';
import * as helpers from '../utils/analyticsHelpers';

/**
 * Custom React hook to compute period-filtered SaaS analytics metrics from CRM leads.
 * Handles date filtering presets and custom ranges, compares metrics to preceding periods
 * to determine trends, and memoizes all outputs to prevent unnecessary redraws.
 *
 * @returns {{
 *   filterType: string,
 *   setFilterType: Function,
 *   customRange: {startDate: string, endDate: string},
 *   setCustomRange: Function,
 *   leads: Array<Object>,
 *   metrics: Object
 * }}
 */
export const useAnalytics = () => {
  const { leads } = useLeads();
  const [filterType, setFilterType] = useState('Last 30 Days');
  const [customRange, setCustomRange] = useState({ startDate: '', endDate: '' });

  // Calculate current and previous comparison date boundaries
  const dateRanges = useMemo(() => {
    const now = new Date();
    let startDate = new Date();
    let prevStartDate = new Date();
    let prevEndDate = new Date();

    switch (filterType) {
      case 'Last 7 Days':
        startDate.setDate(now.getDate() - 7);
        prevEndDate.setDate(now.getDate() - 8);
        prevStartDate.setDate(now.getDate() - 15);
        break;
      case 'Last 30 Days':
        startDate.setDate(now.getDate() - 30);
        prevEndDate.setDate(now.getDate() - 31);
        prevStartDate.setDate(now.getDate() - 61);
        break;
      case 'Last 90 Days':
        startDate.setDate(now.getDate() - 90);
        prevEndDate.setDate(now.getDate() - 91);
        prevStartDate.setDate(now.getDate() - 181);
        break;
      case 'This Year':
        startDate = new Date(now.getFullYear(), 0, 1);
        const yearDays = Math.ceil((now - startDate) / (1000 * 60 * 60 * 24)) || 1;
        prevEndDate = new Date(startDate.getTime() - 1);
        prevStartDate = new Date(startDate.getTime() - (yearDays * 24 * 60 * 60 * 1000));
        break;
      case 'Custom Range':
        if (customRange.startDate && customRange.endDate) {
          startDate = new Date(customRange.startDate);
          const endDate = new Date(customRange.endDate);
          const diffDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) || 1;
          
          prevEndDate = new Date(startDate.getTime() - 1);
          prevStartDate = new Date(startDate.getTime() - (diffDays * 24 * 60 * 60 * 1000));
        } else {
          // Default fallback: Last 30 Days
          startDate.setDate(now.getDate() - 30);
          prevEndDate.setDate(now.getDate() - 31);
          prevStartDate.setDate(now.getDate() - 61);
        }
        break;
      default:
        startDate.setDate(now.getDate() - 30);
        prevEndDate.setDate(now.getDate() - 31);
        prevStartDate.setDate(now.getDate() - 61);
    }

    return {
      current: { start: startDate, end: now },
      previous: { start: prevStartDate, end: prevEndDate }
    };
  }, [filterType, customRange]);

  // Group leads into current and previous time buckets
  const { currentLeads, previousLeads } = useMemo(() => {
    if (!Array.isArray(leads)) return { currentLeads: [], previousLeads: [] };

    const currentList = [];
    const previousList = [];

    leads.forEach((lead) => {
      if (!lead.createdAt) return;
      const leadDate = new Date(lead.createdAt);

      if (leadDate >= dateRanges.current.start && leadDate <= dateRanges.current.end) {
        currentList.push(lead);
      } else if (leadDate >= dateRanges.previous.start && leadDate <= dateRanges.previous.end) {
        previousList.push(lead);
      }
    });

    return { currentLeads: currentList, previousLeads: previousList };
  }, [leads, dateRanges]);

  // Calculate SaaS KPIs and trends dynamically
  const metrics = useMemo(() => {
    const totalLeads = currentLeads.length;
    const pipelineValue = helpers.getPipelineValue(currentLeads);
    const wonRevenue = helpers.getWonRevenue(currentLeads);
    const averageSalesCycle = helpers.getAverageSalesCycle(currentLeads);
    const lostRate = helpers.getLostRate(currentLeads);
    
    const wonLeadsCount = currentLeads.filter((l) => l.status === 'Won').length;
    const conversionRate = totalLeads > 0 ? Math.round((wonLeadsCount / totalLeads) * 100) : 0;

    const prevTotalLeads = previousLeads.length;
    const prevPipelineValue = helpers.getPipelineValue(previousLeads);
    const prevWonRevenue = helpers.getWonRevenue(previousLeads);
    const prevAverageSalesCycle = helpers.getAverageSalesCycle(previousLeads);
    const prevLostRate = helpers.getLostRate(previousLeads);

    const prevWonLeadsCount = previousLeads.filter((l) => l.status === 'Won').length;
    const prevConversionRate = prevTotalLeads > 0 ? Math.round((prevWonLeadsCount / prevTotalLeads) * 100) : 0;

    const getGrowth = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    return {
      kpis: {
        totalLeads: {
          value: totalLeads,
          growth: getGrowth(totalLeads, prevTotalLeads)
        },
        conversionRate: {
          value: conversionRate,
          growth: conversionRate - prevConversionRate
        },
        pipelineValue: {
          value: pipelineValue,
          growth: getGrowth(pipelineValue, prevPipelineValue)
        },
        wonRevenue: {
          value: wonRevenue,
          growth: getGrowth(wonRevenue, prevWonRevenue)
        },
        averageSalesCycle: {
          value: averageSalesCycle,
          growth: prevAverageSalesCycle > 0 ? Math.round(((prevAverageSalesCycle - averageSalesCycle) / prevAverageSalesCycle) * 100) : 0
        },
        lostRate: {
          value: lostRate,
          growth: lostRate - prevLostRate
        }
      },
      statusDistribution: helpers.getStatusDistribution(currentLeads),
      monthlyLeads: helpers.getMonthlyLeads(currentLeads),
      conversionByMonth: helpers.getConversionByMonth(currentLeads),
      revenueByMonth: helpers.getRevenueByMonth(currentLeads),
      leadSourceStats: helpers.getLeadSourceStats(currentLeads),
      funnelData: helpers.getFunnelData(currentLeads),
      salesVelocity: helpers.getSalesVelocity(currentLeads),
      forecast: helpers.getForecastRevenue(currentLeads),
      topPerformers: helpers.getTopPerformers(currentLeads),
      heatmapData: helpers.getActivityHeatmapData(currentLeads)
    };
  }, [currentLeads, previousLeads]);

  return {
    filterType,
    setFilterType,
    customRange,
    setCustomRange,
    leads: currentLeads,
    metrics
  };
};

export default useAnalytics;
