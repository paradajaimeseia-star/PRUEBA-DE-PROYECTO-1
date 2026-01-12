
import React, { useState } from 'react';
import { View, Company } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './views/DashboardView';
import CalendarView from './views/CalendarView';
import AlertTicketsView from './views/AlertTicketsView';
import AnalyticsView from './views/AnalyticsView';
import SettingsView from './views/SettingsView';
import AddCompanyModal from './components/AddCompanyModal';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'calendar':
        return <CalendarView />;
      case 'alerts':
        return <AlertTicketsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-12">
            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">construction</span>
            <h2 className="text-2xl font-bold">Work in Progress</h2>
            <p className="text-[#616f89]">The {currentView} module is currently being optimized.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        onAddCompany={() => setIsAddCompanyModalOpen(true)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={
            currentView === 'dashboard' ? 'Multi-Company Overview' : 
            currentView === 'calendar' ? 'Calendar & Quotas' : 
            currentView === 'analytics' ? 'Performance Analytics' :
            currentView === 'settings' ? 'Agency Settings' :
            'Alert & Ticket Management'
          }
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        
        <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
          {renderView()}
        </main>
      </div>

      <AddCompanyModal 
        isOpen={isAddCompanyModalOpen} 
        onClose={() => setIsAddCompanyModalOpen(false)} 
      />
    </div>
  );
};

export default App;
