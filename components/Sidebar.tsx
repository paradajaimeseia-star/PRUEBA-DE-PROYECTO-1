
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  onAddCompany: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, onAddCompany }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'calendar', label: 'Calendar & Quotas', icon: 'calendar_month' },
    { id: 'analytics', label: 'Analytics', icon: 'insights' },
    { id: 'alerts', label: 'Alert Tickets', icon: 'notifications_active', badge: 4 },
    { id: 'integrations', label: 'Integrations', icon: 'link' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <aside className="w-64 border-r border-[#dbdfe6] dark:border-gray-800 bg-white dark:bg-[#111318] flex flex-col justify-between shrink-0 z-20">
      <div className="flex flex-col gap-8 p-6">
        {/* Brand */}
        <div className="flex gap-3 items-center">
          <div className="bg-primary size-10 rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined">sync_alt</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-bold leading-none">GHL Sync</h1>
            <p className="text-[#616f89] text-xs font-normal">Multi-Dashboard</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                currentView === item.id
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-[#616f89] hover:bg-background-light dark:hover:bg-gray-800'
              }`}
            >
              <span className={`material-symbols-outlined text-[22px] ${currentView === item.id ? 'fill-1' : ''}`}>
                {item.icon}
              </span>
              <p className={`text-sm ${currentView === item.id ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </p>
              {item.badge && (
                <span className="ml-auto bg-[#e73908] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-6 space-y-4">
        <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-[#dbdfe6] dark:border-gray-800">
          <p className="text-[10px] text-[#616f89] font-bold uppercase tracking-wider mb-2">Usage Plan</p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full mb-2">
            <div className="bg-primary h-full rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="text-[10px] font-bold">650 / 1000 Accounts</p>
        </div>

        <button 
          onClick={onAddCompany}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white rounded-lg h-11 px-4 text-sm font-bold hover:bg-primary/90 transition-all shadow-md active:scale-95"
        >
          <span className="material-symbols-outlined text-lg">add_business</span>
          <span>Add Company</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
