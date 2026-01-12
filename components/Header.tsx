
import React from 'react';

interface HeaderProps {
  title: string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, isDarkMode, toggleDarkMode }) => {
  return (
    <header className="h-16 border-b border-[#dbdfe6] dark:border-gray-800 bg-white/80 dark:bg-[#111318]/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-8">
        <h2 className="text-lg font-bold truncate max-w-[200px] md:max-w-none">{title}</h2>
        
        <div className="relative hidden md:block w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#616f89] text-xl">search</span>
          <input 
            className="w-full h-10 pl-10 pr-4 bg-background-light dark:bg-gray-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 transition-all" 
            placeholder="Search accounts or tickets..." 
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full">
          <span className="material-symbols-outlined text-base animate-spin-slow">sync</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Live GHL Sync</span>
        </div>

        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-background-light dark:bg-gray-800 text-[#616f89] hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
        </button>

        <button className="p-2 rounded-lg bg-background-light dark:bg-gray-800 text-[#616f89] hover:text-primary transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-[#e73908] rounded-full border border-white dark:border-gray-800"></span>
        </button>

        <div className="h-8 w-[1px] bg-[#dbdfe6] dark:bg-gray-800 mx-2 hidden md:block"></div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-sm font-bold leading-none">Admin User</span>
            <span className="text-[10px] text-[#616f89] font-bold uppercase">Agency Owner</span>
          </div>
          <div 
            className="size-10 rounded-full bg-cover bg-center ring-2 ring-primary/20 cursor-pointer hover:ring-primary/40 transition-all" 
            style={{ backgroundImage: 'url("https://picsum.photos/100/100?seed=admin")' }}
          ></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
