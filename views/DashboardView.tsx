
import React from 'react';
import { Company } from '../types';

const STATS = [
  { label: 'Total Appointments', value: '0', trend: 'Waiting for sync', trendType: 'neutral', icon: 'calendar_today', iconColor: 'text-gray-400' },
  { label: 'Active Alerts', value: '0', trend: 'All clear', trendType: 'up', icon: 'check_circle', iconColor: 'text-green-500' },
  { label: 'Avg. Conversion', value: '0%', trend: 'No data', trendType: 'neutral', icon: 'query_stats', iconColor: 'text-gray-400' },
  { label: 'Synced Branches', value: '4', trend: 'Configured', trendType: 'up', icon: 'lan', iconColor: 'text-blue-400' },
];

const COMPANIES: Company[] = [
  {
    id: '1',
    name: 'Marbella Landscaping',
    logo: 'https://picsum.photos/120/120?seed=marbella',
    status: 'active',
    nextSync: 'Pending...',
    weeklyGoal: { current: 0, total: 20 },
    monthlyGoal: { current: 0, total: 70 }
  },
  {
    id: '2',
    name: '3 Brothers',
    logo: 'https://picsum.photos/120/120?seed=3bros',
    status: 'active',
    nextSync: 'Pending...',
    weeklyGoal: { current: 0, total: 20 },
    monthlyGoal: { current: 0, total: 70 }
  }
];

const DashboardView: React.FC = () => {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-[#111318] p-6 rounded-xl border border-[#dbdfe6] dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <p className="text-[#616f89] text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <span className={`material-symbols-outlined ${stat.iconColor}`}>{stat.icon}</span>
            </div>
            <p className="text-3xl font-extrabold mb-1">{stat.value}</p>
            <p className={`text-xs font-bold flex items-center gap-1 ${stat.trendType === 'up' ? 'text-green-500' : 'text-gray-400'}`}>
              <span className="material-symbols-outlined text-sm">
                {stat.trendType === 'up' ? 'trending_up' : 'sync'}
              </span> 
              {stat.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">Performance Quotas</h3>
          <p className="text-[#616f89] text-sm mt-1">Real-time GoHighLevel appointment tracking. Connect your API keys to see data.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-4 h-10 flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-[#dbdfe6] dark:border-gray-700 rounded-lg text-sm font-bold hover:bg-background-light transition-colors">
            <span className="material-symbols-outlined text-lg">filter_alt</span> Filter
          </button>
          <button className="flex-1 md:flex-none px-4 h-10 flex items-center justify-center gap-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-lg">download</span> Export Report
          </button>
        </div>
      </div>

      {/* Performance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {COMPANIES.map(company => (
          <div 
            key={company.id} 
            className="bg-white dark:bg-[#111318] rounded-xl border border-[#dbdfe6] dark:border-gray-800 p-8 shadow-sm transition-all"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div 
                  className="size-14 bg-center bg-cover rounded-xl shadow-inner border border-gray-100 dark:border-gray-800" 
                  style={{ backgroundImage: `url(${company.logo})` }}
                ></div>
                <div>
                  <h4 className="text-xl font-bold">{company.name}</h4>
                  <p className="text-[#616f89] text-sm">Status: <span className="text-primary font-bold">{company.nextSync}</span></p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${company.status === 'active' ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'}`}>
                {company.status}
              </span>
            </div>

            <div className="space-y-8">
              {/* Weekly Quota Horizontal Bar */}
              <div className="bg-background-light dark:bg-gray-800/30 p-5 rounded-xl border border-[#dbdfe6] dark:border-gray-800/50">
                <div className="flex justify-between items-end mb-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#616f89] font-black uppercase tracking-widest">Weekly Goal</span>
                    <span className="text-lg font-black">{company.weeklyGoal.current} / {company.weeklyGoal.total}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                    0% Complete
                  </span>
                </div>
                <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000"
                    style={{ width: `0%` }}
                  ></div>
                </div>
              </div>

              {/* Monthly Goal & Circle View */}
              <div className="flex flex-col items-center gap-4 p-6 bg-background-light dark:bg-gray-800/50 rounded-xl">
                <div className="relative flex items-center justify-center">
                  <svg className="size-28 transform -rotate-90">
                    <circle className="text-gray-200 dark:text-gray-700" cx="56" cy="56" fill="transparent" r="48" stroke="currentColor" strokeWidth="10"></circle>
                    <circle 
                      className="text-primary" 
                      cx="56" cy="56" fill="transparent" r="48" stroke="currentColor" 
                      strokeWidth="10" strokeDasharray="301.6" strokeDashoffset={301.6}
                      strokeLinecap="round"
                    ></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-black leading-none">0/{company.monthlyGoal.total}</span>
                    <span className="text-[10px] text-[#616f89] font-bold uppercase mt-1">Monthly</span>
                  </div>
                </div>
                <p className="text-xs font-bold text-[#616f89]">
                  Waiting for GHL synchronization
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardView;
