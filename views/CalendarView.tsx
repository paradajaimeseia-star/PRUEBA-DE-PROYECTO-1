
import React from 'react';
import { Company } from '../types';

const COMPANIES: Company[] = [
  {
    id: '1',
    name: 'Marbella Landscaping',
    logo: 'https://picsum.photos/40/40?seed=marbella',
    status: 'active',
    nextSync: 'No sync yet',
    weeklyGoal: { current: 0, total: 20 },
    monthlyGoal: { current: 0, total: 70 }
  },
  {
    id: '2',
    name: '3 Brothers',
    logo: 'https://picsum.photos/40/40?seed=3bros',
    status: 'active',
    nextSync: 'No sync yet',
    weeklyGoal: { current: 0, total: 20 },
    monthlyGoal: { current: 0, total: 70 }
  },
  {
    id: '3',
    name: 'Evergreen Solutions',
    logo: 'https://picsum.photos/40/40?seed=evergreen',
    status: 'active',
    nextSync: 'No sync yet',
    weeklyGoal: { current: 0, total: 20 },
    monthlyGoal: { current: 0, total: 70 }
  },
  {
    id: '4',
    name: 'Skyline Roofs',
    logo: 'https://picsum.photos/40/40?seed=skyline',
    status: 'warning',
    nextSync: 'No sync yet',
    weeklyGoal: { current: 0, total: 20 },
    monthlyGoal: { current: 0, total: 70 }
  }
];

const MiniCalendar: React.FC<{ company: Company }> = ({ company }) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const todayDate = now.getDate();

  const monthName = now.toLocaleString('default', { month: 'long' });
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Función de citas reseteada a 0
  const getApptsForDay = (day: number) => 0;

  return (
    <div className="bg-white dark:bg-[#1a212e] rounded-2xl border border-[#dbdfe6] dark:border-[#2a303c] shadow-sm hover:shadow-md transition-all overflow-hidden group">
      <div className="p-4 border-b border-[#dbdfe6] dark:border-[#2a303c] flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/20">
        <div className="flex items-center gap-3">
          <img src={company.logo} alt="" className="size-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700" />
          <div className="flex flex-col">
            <h4 className="text-sm font-bold truncate max-w-[120px]">{company.name}</h4>
            <div className="flex items-center gap-1">
               <span className="relative flex h-1.5 w-1.5">
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gray-400"></span>
              </span>
              <span className="text-[9px] text-[#616f89] font-bold uppercase tracking-wider">Awaiting Sync</span>
            </div>
          </div>
        </div>
        <div className="text-right">
           <span className="text-[10px] font-black uppercase text-primary">{monthName}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-7 mb-2">
          {weekDays.map((d, i) => (
            <span key={i} className="text-[9px] font-black text-center text-gray-400 uppercase">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`fill-${i}`} className="aspect-square"></div>
          ))}
          
          {daysArray.map(day => {
            const isToday = day === todayDate;
            return (
              <div 
                key={day} 
                className={`relative aspect-square flex flex-col items-center justify-center rounded-md transition-all cursor-default ${
                  isToday 
                  ? 'bg-primary text-white shadow-lg shadow-primary/30 z-10 scale-105' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500'
                }`}
              >
                <span className={`text-[10px] font-bold`}>{day}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-[#616f89]">
            <span>Weekly Progress</span>
            <span className="text-gray-400 font-bold">0/{company.weeklyGoal.total}</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `0%` }}></div>
          </div>
        </div>
        <button className="w-full py-2 bg-gray-50 dark:bg-gray-800/50 hover:bg-primary/10 hover:text-primary rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border border-transparent hover:border-primary/20">
          Open Branch GHL
        </button>
      </div>
    </div>
  );
};

const CalendarView: React.FC = () => {
  const currentMonthName = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined fill-1">calendar_today</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-[#111318] dark:text-white">Live Agency Calendars</h1>
          </div>
          <p className="text-[#616f89] dark:text-gray-400 text-sm max-w-2xl">
            Real-time appointment tracking for <span className="text-primary font-bold uppercase">{currentMonthName}</span>. 
            Connect your API keys in settings to begin synchronization.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-white dark:bg-gray-900 rounded-lg p-1 border border-[#dbdfe6] dark:border-gray-800">
            <button className="px-3 py-1.5 bg-primary text-white rounded-md text-xs font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">grid_view</span>Grid View
            </button>
            <button className="px-3 py-1.5 text-[#616f89] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-xs font-bold flex items-center gap-2 transition-all">
              <span className="material-symbols-outlined text-sm">view_agenda</span>Timeline
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {COMPANIES.map(company => (
          <MiniCalendar key={company.id} company={company} />
        ))}
        <button className="bg-gray-50/50 dark:bg-gray-900/20 rounded-2xl border-2 border-dashed border-[#dbdfe6] dark:border-gray-800 p-8 flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-primary hover:border-primary transition-all group min-h-[350px]">
          <div className="size-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-2xl">add</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Add Calendar</span>
        </button>
      </div>
    </div>
  );
};

export default CalendarView;
