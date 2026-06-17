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
 * Mock leads data for initial dashboard state.
 * Real CRM integration will occur in a later phase.
 */
const mockLeads = [
  { id: 1, name: 'Alice Smith', company: 'TechNova', status: 'Contacted', value: 4500, date: 'June 15, 2026' },
  { id: 2, name: 'Bob Johnson', company: 'GreenVibe Corp', status: 'Qualified', value: 12000, date: 'June 14, 2026' },
  { id: 3, name: 'Clara Oswald', company: 'Starlight Media', status: 'Negotiating', value: 8500, date: 'June 12, 2026' },
  { id: 4, name: 'David Miller', company: 'Apex Solutions', status: 'New', value: 2300, date: 'June 11, 2026' },
  { id: 5, name: 'Emma Watson', company: 'Lumina Group', status: 'Qualified', value: 15000, date: 'June 10, 2026' },
  { id: 6, name: 'Frank Castle', company: 'Punisher Inc', status: 'Contacted', value: 3100, date: 'June 09, 2026' },
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

  // Define metrics statistics card array
  const metrics = [
    {
      title: 'Total Leads',
      value: '1,248',
      icon: Users,
      change: '+12.5%',
      color: 'primary',
    },
    {
      title: 'Conversion Rate',
      value: '24.3%',
      icon: TrendingUp,
      change: '+4.1%',
      color: 'success',
    },
    {
      title: 'Deals Closed',
      value: '86',
      icon: CheckCircle,
      change: '+8.2%',
      color: 'warning',
    },
    {
      title: 'Pipeline Value',
      value: '$148,600',
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
      <Toaster position="top-right" reverseOrder={false} />

      {/* Metrics Grid Section - Responsive Columns */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" aria-label="Quick Stats">
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
        <section className="lg:col-span-2 bg-card p-6 rounded-2xl border border-slate-200/80 shadow-sm" aria-label="Acquisition Progress">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-lg text-text-dark">Acquisition Progress</h3>
              <p className="text-xs text-text-gray">Overview of incoming leads and closed conversions</p>
            </div>
            <div className="flex gap-4 text-xs font-semibold">
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
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    background: '#FFF', 
                    border: '1px solid #E2E8F0', 
                    borderRadius: '12px', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' 
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
          <RecentLeads leads={mockLeads} />
        </section>

        {/* Pipeline Overview Chart (Spans 1 column on desktop) */}
        <section aria-label="Pipeline Stages Distribution">
          <PipelineOverview leads={mockLeads} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
