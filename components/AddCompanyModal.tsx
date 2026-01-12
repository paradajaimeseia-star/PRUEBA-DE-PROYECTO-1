
import React, { useState } from 'react';

interface AddCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSyncing, setIsSyncing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      setIsSyncing(true);
      // Simulando sincronización con GHL API
      setTimeout(() => {
        setIsSyncing(false);
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setStep(1);
          setSuccess(false);
        }, 2000);
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#111318] w-full max-w-lg rounded-2xl shadow-2xl border border-[#dbdfe6] dark:border-gray-800 overflow-hidden transform transition-all scale-100 animate-in zoom-in-95 duration-300">
        
        {success ? (
          <div className="p-12 flex flex-col items-center text-center">
            <div className="size-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <span className="material-symbols-outlined text-5xl">check_circle</span>
            </div>
            <h3 className="text-2xl font-bold">Company Linked!</h3>
            <p className="text-[#616f89] text-sm mt-2">Data is now being synchronized in the background.</p>
          </div>
        ) : isSyncing ? (
          <div className="p-12 flex flex-col items-center text-center">
            <div className="size-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6"></div>
            <h3 className="text-2xl font-bold">Connecting to GHL...</h3>
            <p className="text-[#616f89] text-sm mt-2">Authenticating API Key and fetching location data.</p>
          </div>
        ) : (
          <form onSubmit={handleNext}>
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#dbdfe6] dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
              <div className="flex flex-col">
                <h3 className="font-bold text-lg">Add New Company</h3>
                <p className="text-[10px] text-[#616f89] font-bold uppercase tracking-widest">Step {step} of 2</p>
              </div>
              <button type="button" onClick={onClose} className="text-[#616f89] hover:text-primary transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Body */}
            <div className="p-8 space-y-6">
              {step === 1 ? (
                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#616f89] uppercase tracking-widest">Company Name</label>
                    <input 
                      required
                      placeholder="e.g. Skyline Landscaping"
                      className="w-full h-12 px-4 rounded-xl border-[#dbdfe6] dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#616f89] uppercase tracking-widest">GHL API Key</label>
                    <div className="relative">
                      <input 
                        required
                        type="password"
                        placeholder="••••••••••••••••••••••••••••"
                        className="w-full h-12 pl-4 pr-12 rounded-xl border-[#dbdfe6] dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      />
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#616f89] cursor-pointer">visibility</span>
                    </div>
                    <p className="text-[10px] text-[#616f89] font-medium italic mt-1">Found in GHL Settings > Business Profile</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#616f89] uppercase tracking-widest">Weekly Quota</label>
                      <input 
                        type="number"
                        placeholder="20"
                        className="w-full h-12 px-4 rounded-xl border-[#dbdfe6] dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#616f89] uppercase tracking-widest">Monthly Quota</label>
                      <input 
                        type="number"
                        placeholder="80"
                        className="w-full h-12 px-4 rounded-xl border-[#dbdfe6] dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#616f89] uppercase tracking-widest">Logo URL (Optional)</label>
                    <input 
                      placeholder="https://example.com/logo.png"
                      className="w-full h-12 px-4 rounded-xl border-[#dbdfe6] dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 dark:bg-gray-800/30 border-t border-[#dbdfe6] dark:border-gray-800 flex gap-3">
              {step > 1 && (
                <button 
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 h-12 rounded-xl border border-[#dbdfe6] dark:border-gray-700 font-bold text-sm hover:bg-white dark:hover:bg-gray-800 transition-all"
                >
                  Back
                </button>
              )}
              <button 
                type="submit"
                className="flex-[2] h-12 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                {step === 2 ? 'Link Account' : 'Next Step'}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddCompanyModal;
