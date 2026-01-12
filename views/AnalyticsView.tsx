
import React from 'react';

const ANALYTICS_DATA = [
  {
    id: '1',
    name: 'Marbella Landscaping',
    logo: 'https://picsum.photos/40/40?seed=marbella',
    currentMonthAppts: 0,
    prevMonthAppts: 0,
    goal: 70,
    history: [0, 0, 0, 0, 0],
  },
  {
    id: '2',
    name: '3 Brothers',
    logo: 'https://picsum.photos/40/40?seed=3bros',
    currentMonthAppts: 0,
    prevMonthAppts: 0,
    goal: 70,
    history: [0, 0, 0, 0, 0],
  },
  {
    id: '3',
    name: 'Evergreen Solutions',
    logo: 'https://picsum.photos/40/40?seed=evergreen',
    currentMonthAppts: 0,
    prevMonthAppts: 0,
    goal: 70,
    history: [0, 0, 0, 0, 0],
  },
  {
    id: '4',
    name: 'Skyline Roofs',
    logo: 'https://picsum.photos/40/40?seed=skyline',
    currentMonthAppts: 0,
    prevMonthAppts: 0,
    goal: 70,
    history: [0, 0, 0, 0, 0],
  }
];

const AnalyticsView: React.FC = () => {
  const currentMonthName = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight">Monthly Insights</h2>
          <p className="text-[#616f89] dark:text-gray-400 text-sm">Growth analysis and goal tracking across all branches.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 px-4 py-2 rounded-xl border border-[#dbdfe6] dark:border-gray-800 flex items-center gap-3">
          <span className="text-[10px] font-black uppercase text-[#616f89]">Period:</span>
          <span className="text-xs font-bold">{currentMonthName}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {ANALYTICS_DATA.map(company => {
          return (
            <div key={company.id} className="bg-white dark:bg-[#1a212e] rounded-2xl border border-[#dbdfe6] dark:border-[#2a303c] overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="p-6 flex flex-col lg:flex-row lg:items-center gap-8">
                <div className="flex items-center gap-4 min-w-[240px]">
                  <img src={company.logo} className="size-12 rounded-xl border dark:border-gray-700" alt="" />
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{company.name}</h3>
                    <div className="mt-1">
                      <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-400 text-[9px] font-black uppercase rounded">No sync data</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl">
                    <p className="text-[9px] font-black text-[#616f89] uppercase tracking-widest mb-1">Total Appointments</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-black">0</span>
                      <span className="text-[10px] text-gray-400 mb-1">/ {company.goal}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl">
                    <p className="text-[9px] font-black text-[#616f89] uppercase tracking-widest mb-1">Monthly Growth</p>
                    <div className="text-xl font-black text-gray-400">--%</div>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl">
                    <p className="text-[9px] font-black text-[#616f89] uppercase tracking-widest mb-1">Goal Status</p>
                    <div className="flex flex-col gap-1.5 mt-1">
                      <div className="flex justify-between text-[10px] font-bold text-gray-400">
                        <span>0% reached</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl flex flex-col justify-center">
                    <p className="text-[9px] font-black text-[#616f89] uppercase tracking-widest mb-1">System Alert</p>
                    <div className="flex items-center gap-2 text-gray-400">
                      <span className="material-symbols-outlined text-lg">sync</span>
                      <span className="text-xs font-bold">Awaiting Data</span>
                    </div>
                  </div>
                </div>

                <div className="hidden xl:flex items-center gap-2 h-16 min-w-[120px]">
                  {[1, 2, 3, 4, 5].map((_, idx) => (
                    <div key={idx} className="w-4 bg-gray-100 dark:bg-gray-800 rounded-t-sm self-end h-1"></div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalyticsView;
