/**
 * Helper to get the last 6 months labels dynamically.
 * Returns an array of objects containing month names and corresponding years/indices.
 * 
 * @returns {Array<{label: string, year: number, monthIndex: number}>}
 */
const getLast6MonthsLabels = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const result = [];
  const d = new Date();
  for (let i = 5; i >= 0; i--) {
    const targetDate = new Date(d.getFullYear(), d.getMonth() - i, 1);
    result.push({
      label: months[targetDate.getMonth()],
      year: targetDate.getFullYear(),
      monthIndex: targetDate.getMonth()
    });
  }
  return result;
};

/**
 * Returns lead count grouped by status for a pie/doughnut chart.
 * 
 * @param {Array<Object>} leads 
 * @returns {Array<{name: string, value: number, percentage: number}>}
 */
export const getStatusDistribution = (leads) => {
  if (!Array.isArray(leads) || leads.length === 0) return [];
  const total = leads.length;
  const counts = {};

  leads.forEach((lead) => {
    const status = lead.status || 'New';
    counts[status] = (counts[status] || 0) + 1;
  });

  const statuses = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];
  return statuses
    .map((status) => {
      const count = counts[status] || 0;
      const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
      return { name: status, value: count, percentage };
    })
    .filter((item) => item.value > 0);
};

/**
 * Groups leads created in the last 6 months.
 * 
 * @param {Array<Object>} leads 
 * @returns {Array<{name: string, leads: number}>}
 */
export const getMonthlyLeads = (leads) => {
  if (!Array.isArray(leads)) return [];
  const monthInfo = getLast6MonthsLabels();
  const data = monthInfo.map((m) => ({ name: m.label, leads: 0 }));

  leads.forEach((lead) => {
    if (!lead.createdAt) return;
    const date = new Date(lead.createdAt);
    const mIndex = date.getMonth();
    const year = date.getFullYear();

    const matched = monthInfo.findIndex((m) => m.monthIndex === mIndex && m.year === year);
    if (matched !== -1) {
      data[matched].leads += 1;
    }
  });

  return data;
};

/**
 * Calculates monthly won conversion percentage rates (Won Leads in month / Leads created in month).
 * 
 * @param {Array<Object>} leads 
 * @returns {Array<{name: string, rate: number}>}
 */
export const getConversionByMonth = (leads) => {
  if (!Array.isArray(leads)) return [];
  const monthInfo = getLast6MonthsLabels();
  const data = monthInfo.map((m) => ({ name: m.label, rate: 0 }));

  monthInfo.forEach((m, idx) => {
    let createdCount = 0;
    let wonCount = 0;

    leads.forEach((lead) => {
      if (!lead.createdAt) return;
      const createdDate = new Date(lead.createdAt);
      if (createdDate.getMonth() === m.monthIndex && createdDate.getFullYear() === m.year) {
        createdCount += 1;
        if (lead.status === 'Won') {
          wonCount += 1;
        }
      }
    });

    data[idx].rate = createdCount > 0 ? Math.round((wonCount / createdCount) * 100) : 0;
  });

  return data;
};

/**
 * Calculates cumulative Won deal revenue grouped by month.
 * 
 * @param {Array<Object>} leads 
 * @returns {Array<{name: string, revenue: number}>}
 */
export const getRevenueByMonth = (leads) => {
  if (!Array.isArray(leads)) return [];
  const monthInfo = getLast6MonthsLabels();
  const data = monthInfo.map((m) => ({ name: m.label, revenue: 0 }));

  leads.forEach((lead) => {
    if (lead.status !== 'Won') return;
    const dateStr = lead.wonAt || lead.createdAt;
    if (!dateStr) return;
    const date = new Date(dateStr);
    const mIndex = date.getMonth();
    const year = date.getFullYear();

    const matched = monthInfo.findIndex((m) => m.monthIndex === mIndex && m.year === year);
    if (matched !== -1) {
      data[matched].revenue += Number(lead.value) || 0;
    }
  });

  return data;
};

/**
 * Returns sum value of all active opportunities (excludes Won/Lost).
 * 
 * @param {Array<Object>} leads 
 * @returns {number}
 */
export const getPipelineValue = (leads) => {
  if (!Array.isArray(leads)) return 0;
  return leads
    .filter((l) => l.status !== 'Won' && l.status !== 'Lost')
    .reduce((sum, l) => sum + (Number(l.value) || 0), 0);
};

/**
 * Returns sum value of all closed Won opportunities.
 * 
 * @param {Array<Object>} leads 
 * @returns {number}
 */
export const getWonRevenue = (leads) => {
  if (!Array.isArray(leads)) return 0;
  return leads
    .filter((l) => l.status === 'Won')
    .reduce((sum, l) => sum + (Number(l.value) || 0), 0);
};

/**
 * Calculates the average sales cycle in days (wonAt - createdAt) for won deals.
 * 
 * @param {Array<Object>} leads 
 * @returns {number} Average days, defaults to 0
 */
export const getAverageSalesCycle = (leads) => {
  if (!Array.isArray(leads)) return 0;
  const wonLeads = leads.filter((l) => l.status === 'Won' && l.wonAt && l.createdAt);
  if (wonLeads.length === 0) return 0;

  const totalDays = wonLeads.reduce((sum, l) => {
    const wonDate = new Date(l.wonAt);
    const createdDate = new Date(l.createdAt);
    const diffTime = Math.max(0, wonDate - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return sum + diffDays;
  }, 0);

  return Math.round(totalDays / wonLeads.length);
};

/**
 * Calculates the lost lead rate percentage.
 * 
 * @param {Array<Object>} leads 
 * @returns {number} Lost leads percentage, defaults to 0
 */
export const getLostRate = (leads) => {
  if (!Array.isArray(leads) || leads.length === 0) return 0;
  const lostCount = leads.filter((l) => l.status === 'Lost').length;
  return Math.round((lostCount / leads.length) * 100);
};

/**
 * Compiles and sorts lead source frequencies descending.
 * 
 * @param {Array<Object>} leads 
 * @returns {Array<{name: string, count: number}>}
 */
export const getLeadSourceStats = (leads) => {
  if (!Array.isArray(leads)) return [];
  const counts = {};
  leads.forEach((l) => {
    const source = l.source || 'Other';
    counts[source] = (counts[source] || 0) + 1;
  });

  return Object.keys(counts)
    .map((source) => ({ name: source, count: counts[source] }))
    .sort((a, b) => b.count - a.count);
};

/**
 * Calculates conversion and dropoff counts/percentages for sales funnel stages.
 * 
 * @param {Array<Object>} leads 
 * @returns {Array<{stage: string, count: number, conversion: number, dropoff: number}>}
 */
export const getFunnelData = (leads) => {
  if (!Array.isArray(leads)) return [];

  let newCount = 0;
  let contactedCount = 0;
  let meetingCount = 0;
  let proposalCount = 0;
  let wonCount = 0;

  leads.forEach((l) => {
    // 1. New (All leads)
    newCount++;

    // 2. Contacted: status isn't 'New' or contactedAt is set
    const isContacted = l.status !== 'New' || l.contactedAt;
    if (isContacted) contactedCount++;

    // 3. Meeting: meetingAt is set, or status is Meeting, Proposal, or Won
    const isMeeting = ['Meeting Scheduled', 'Proposal Sent', 'Won'].includes(l.status) || l.meetingAt;
    if (isMeeting) meetingCount++;

    // 4. Proposal: proposalAt is set, or status is Proposal or Won
    const isProposal = ['Proposal Sent', 'Won'].includes(l.status) || l.proposalAt;
    if (isProposal) proposalCount++;

    // 5. Won: status is Won or wonAt is set
    const isWon = l.status === 'Won' || l.wonAt;
    if (isWon) wonCount++;
  });

  return [
    { stage: 'New', count: newCount, conversion: 100, dropoff: 0 },
    { stage: 'Contacted', count: contactedCount, conversion: newCount > 0 ? Math.round((contactedCount / newCount) * 100) : 0, dropoff: newCount > 0 ? 100 - Math.round((contactedCount / newCount) * 100) : 0 },
    { stage: 'Meeting', count: meetingCount, conversion: contactedCount > 0 ? Math.round((meetingCount / contactedCount) * 100) : 0, dropoff: contactedCount > 0 ? 100 - Math.round((meetingCount / contactedCount) * 100) : 0 },
    { stage: 'Proposal', count: proposalCount, conversion: meetingCount > 0 ? Math.round((proposalCount / meetingCount) * 100) : 0, dropoff: meetingCount > 0 ? 100 - Math.round((proposalCount / meetingCount) * 100) : 0 },
    { stage: 'Won', count: wonCount, conversion: proposalCount > 0 ? Math.round((wonCount / proposalCount) * 100) : 0, dropoff: proposalCount > 0 ? 100 - Math.round((wonCount / proposalCount) * 100) : 0 }
  ];
};

/**
 * Calculates SaaS sales deal velocity rate (Opportunities * Win Rate * Avg Deal Size) / Cycle Length.
 * 
 * @param {Array<Object>} leads 
 * @returns {number} Daily velocity value
 */
export const getSalesVelocity = (leads) => {
  if (!Array.isArray(leads) || leads.length === 0) return 0;

  const opportunities = leads.filter((l) => l.status !== 'Won' && l.status !== 'Lost').length;
  
  const wonCount = leads.filter((l) => l.status === 'Won').length;
  const lostCount = leads.filter((l) => l.status === 'Lost').length;
  const closedCount = wonCount + lostCount;
  const winRate = closedCount > 0 ? wonCount / closedCount : 0.2; // Fallback 20%

  const totalWonVal = leads.filter((l) => l.status === 'Won').reduce((sum, l) => sum + (Number(l.value) || 0), 0);
  const avgDealSize = wonCount > 0 ? totalWonVal / wonCount : 5000; // Fallback 5000

  const salesCycle = getAverageSalesCycle(leads) || 14; // Fallback 14 days

  const velocity = (opportunities * winRate * avgDealSize) / salesCycle;
  return Math.round(velocity);
};

/**
 * Forecasts revenue using a moving average model and weighted pipeline value.
 * 
 * @param {Array<Object>} leads 
 * @returns {{predicted: number, growth: number, confidence: number}} Forecast details
 */
export const getForecastRevenue = (leads) => {
  if (!Array.isArray(leads) || leads.length === 0) {
    return { predicted: 0, growth: 0, confidence: 50 };
  }

  const monthlyRev = getRevenueByMonth(leads);
  const totalRev = monthlyRev.reduce((sum, m) => sum + m.revenue, 0);
  const avgRev = totalRev / 6;

  // Growth trend (last 3 months vs previous 3 months)
  const firstHalf = monthlyRev.slice(0, 3).reduce((sum, m) => sum + m.revenue, 0);
  const secondHalf = monthlyRev.slice(3, 6).reduce((sum, m) => sum + m.revenue, 0);
  
  let growth = 0;
  if (firstHalf > 0) {
    growth = Math.round(((secondHalf - firstHalf) / firstHalf) * 100);
  }

  const wonCount = leads.filter((l) => l.status === 'Won').length;
  const lostCount = leads.filter((l) => l.status === 'Lost').length;
  const winRate = (wonCount + lostCount) > 0 ? wonCount / (wonCount + lostCount) : 0.2;
  
  const activeOpportunitiesVal = leads
    .filter((l) => l.status !== 'Won' && l.status !== 'Lost')
    .reduce((sum, l) => sum + (Number(l.value) || 0), 0);

  // Forecast predicted revenue: average + 30% of probability weighted active pipeline value
  const predicted = Math.round(avgRev + (activeOpportunitiesVal * winRate * 0.3));
  const confidence = Math.min(Math.max(Math.round(winRate * 100), 30), 95);

  return {
    predicted: predicted || 150000,
    growth: growth || 5,
    confidence
  };
};

/**
 * Ranks sales owners based on closed won deal values.
 * 
 * @param {Array<Object>} leads 
 * @returns {Array<{name: string, value: number}>} Leaderboard list
 */
export const getTopPerformers = (leads) => {
  if (!Array.isArray(leads)) return [];
  const repSales = {};

  leads.forEach((l) => {
    if (l.status !== 'Won') return;
    const owner = l.owner || 'Unassigned';
    repSales[owner] = (repSales[owner] || 0) + (Number(l.value) || 0);
  });

  return Object.keys(repSales)
    .map((owner) => ({ name: owner, value: repSales[owner] }))
    .sort((a, b) => b.value - a.value);
};

/**
 * Groups counts of lead created, contacted, and meeting actions by day calendar.
 * 
 * @param {Array<Object>} leads 
 * @returns {Array<{date: string, count: number}>}
 */
export const getActivityHeatmapData = (leads) => {
  if (!Array.isArray(leads)) return [];
  const dailyCounts = {};

  leads.forEach((l) => {
    const dates = [l.createdAt, l.meetingAt, l.contactedAt].filter(Boolean);
    dates.forEach((dStr) => {
      const dateKey = dStr.split('T')[0];
      dailyCounts[dateKey] = (dailyCounts[dateKey] || 0) + 1;
    });
  });

  return Object.keys(dailyCounts).map((date) => ({
    date,
    count: dailyCounts[date]
  }));
};
