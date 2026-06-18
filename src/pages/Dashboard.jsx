import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp, CheckCircle, DollarSign } from 'lucide-react';

// Import custom dashboard components
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';
import { useLeads } from '../context/LeadContext';
import { useTheme } from '../context/ThemeContext';

/**
 * Mock chart data representing lead acquisition over the past 6 months.
 * Used for visualization in the Acquisition Progress chart.
 */
const mockChartData = [
  { name: 'Jan', leads: 45, conversions: 12 },
  { name: 'Feb', leads: 52, conversions: 18 },
  { name: 'Mar', leads: 85, conversions: 29 },
  { name: 'Apr', leads: 78, conversions: 24 },
  { name: 'May', leads: 110, conversions: 40 },
  { name: 'Jun', leads: 145, conversions: 55 },
];

/**
 * Dashboard Page - Assembles all dashboard modules into a cohesive, responsive grid layout.
 * Displays key metrics via StatsCards, historical trends via AreaChart, sales pipeline distributions,
 * recent lead transactions, and operational shortcuts.
 *
 * @component
 * @returns {React.ReactElement} The main Dashboard page element
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const { leads } = useLeads();
  const { isDarkMode } = useTheme();

  // Calculate dynamic stats
  const totalLeads = leads.length;
  const wonLeadsCount = leads.filter((l) => l.status === 'Won').length;
  const conversionRate = totalLeads > 0 ? ((wonLeadsCount / totalLeads) * 100).toFixed(1) + '%' : '0%';
  const totalValue = leads.reduce((sum, l) => sum + (Number(l.value) || 0), 0);

  // Define metrics statistics card array dynamically
  const metrics = [
    {
      title: 'Total Leads',
      value: totalLeads.toLocaleString(),
      icon: Users,
      change: '+12.5%',
      color: 'primary',
    },
    {
      title: 'Conversion Rate',
      value: conversionRate,
      icon: TrendingUp,
      change: '+4.1%',
      color: 'success',
    },
    {
      title: 'Deals Closed',
      value: wonLeadsCount.toLocaleString(),
      icon: CheckCircle,
      change: '+8.2%',
      color: 'warning',
    },
    {
      title: 'Pipeline Value',
      value: '$' + totalValue.toLocaleString(),
      icon: DollarSign,
      change: '-2.4%',
      color: 'danger',
    },
  ];

  /**
   * Action handler for adding a new lead.
   * Navigates to the Leads page and initiates the lead addition sequence.
   */
  const handleAddLead = () => {
    navigate('/leads', { state: { openAddModal: true } });
  };

  /**
   * Action handler for viewing all leads.
   * Redirects the user to the lead management catalog.
   */
  const handleViewAllLeads = () => {
    navigate('/leads');
  };

  /**
   * Action handler for exporting CRM data.
   * Simulates a CSV download with a high-fidelity visual toast completion feedback.
   */
  const handleExportData = () => {
    const toastId = toast.loading('Generating export CSV package...');
    
    // Simulate slight download delay for professional UX feedback
    setTimeout(() => {
      toast.success('Leads database exported successfully!', { id: toastId });
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Toast notifications container */}
      <Toaster 
        position="top-right" 
        reverseOrder={false} 
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: isDarkMode ? '#1E293B' : '#FFFFFF',
            color: isDarkMode ? '#F8FAFC' : '#0F172A',
            border: isDarkMode ? '1px solid #334155' : '1px solid #E2E8F0',
          }
        }}
      />

      {/* Metrics Grid Section - Responsive Columns */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" aria-label="Quick Stats">
        {metrics.map((metric, idx) => (
          <StatsCard
            key={idx}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            change={metric.change}
            color={metric.color}
          />
        ))}
      </section>

      {/* Middle Section: Chart & Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Acquisition Area Chart (Spans 2 columns on desktop) */}
        <section className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200" aria-label="Acquisition Progress">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Acquisition Progress</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Overview of incoming leads and closed conversions</p>
            </div>
            <div className="flex gap-4 text-xs font-semibold text-gray-700 dark:text-gray-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-primary"></span>
                Leads
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-success"></span>
                Conversions
              </span>
            </div>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#F1F5F9'} />
                <XAxis dataKey="name" stroke={isDarkMode ? '#94A3B8' : '#64748B'} fontSize={11} tickLine={false} />
                <YAxis stroke={isDarkMode ? '#94A3B8' : '#64748B'} fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    background: isDarkMode ? '#1E293B' : '#FFF', 
                    border: isDarkMode ? '1px solid #374151' : '1px solid #E2E8F0', 
                    borderRadius: '12px', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                    color: isDarkMode ? '#F8FAFC' : '#0F172A'
                  }} 
                  itemStyle={{
                    color: isDarkMode ? '#E2E8F0' : '#334155'
                  }}
                  labelStyle={{
                    color: isDarkMode ? '#94A3B8' : '#64748B'
                  }}
                />
                <Area type="monotone" dataKey="leads" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#colorLeads)" />
                <Area type="monotone" dataKey="conversions" stroke="#22C55E" strokeWidth={2.5} fillOpacity={1} fill="url(#colorConversions)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Quick Actions Panel (Spans 1 column on desktop) */}
        <section aria-label="Quick Tools">
          <QuickActions
            onAddLead={handleAddLead}
            onViewAll={handleViewAllLeads}
            onExportData={handleExportData}
          />
        </section>
      </div>

      {/* Bottom Section: Recent Lead List & Sales Stage Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads Table (Spans 2 columns on desktop) */}
        <section className="lg:col-span-2" aria-label="Lead Activity Log">
          <RecentLeads leads={leads} />
        </section>

        {/* Pipeline Overview Chart (Spans 1 column on desktop) */}
        <section aria-label="Pipeline Stages Distribution">
          <PipelineOverview leads={leads} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
