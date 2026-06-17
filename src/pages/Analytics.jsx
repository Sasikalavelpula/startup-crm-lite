import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const channelData = [
  { name: 'Cold Outreach', Leads: 240, Conversions: 45 },
  { name: 'Organic Search', Leads: 480, Conversions: 110 },
  { name: 'LinkedIn Referral', Leads: 320, Conversions: 95 },
  { name: 'Product Hunt', Leads: 180, Conversions: 38 },
];

const stageDistribution = [
  { name: 'New Leads', value: 380, color: '#64748B' },
  { name: 'Contacted', value: 450, color: '#2563EB' },
  { name: 'Qualified', value: 240, color: '#10B981' },
  { name: 'Negotiating', value: 178, color: '#F59E0B' },
];

const Analytics = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* High-level summaries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold text-text-gray uppercase tracking-wider">Average Deal Value</p>
            <h3 className="text-3xl font-extrabold text-text-dark mt-2">$8,520</h3>
          </div>
          <p className="text-xs text-green-600 font-semibold mt-4 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            +5.8% from last month
          </p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold text-text-gray uppercase tracking-wider">Average Sales Cycle</p>
            <h3 className="text-3xl font-extrabold text-text-dark mt-2">14 Days</h3>
          </div>
          <p className="text-xs text-green-600 font-semibold mt-4 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            -2 days improvement
          </p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold text-text-gray uppercase tracking-wider">Top Performing Channel</p>
            <h3 className="text-3xl font-extrabold text-text-dark mt-2 truncate">Organic Search</h3>
          </div>
          <p className="text-xs text-text-gray mt-4">
            Contributes 38.5% of total leads
          </p>
        </div>
      </div>

      {/* Charts Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Channel Breakdown */}
        <div className="bg-card p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-text-dark">Leads by Channel</h3>
            <p className="text-xs text-text-gray mb-6">Performance across primary client acquisition sources</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '12px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                <Bar dataKey="Leads" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Conversions" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Stages Distribution */}
        <div className="bg-card p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-text-dark">Pipeline Distribution</h3>
            <p className="text-xs text-text-gray mb-6">Share of leads across each sales pipeline stage</p>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stageDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4 text-[11px] font-semibold text-text-gray">
            {stageDistribution.map((entry, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: entry.color }}></span>
                <span>{entry.name} ({entry.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
