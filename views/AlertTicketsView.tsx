
import React, { useState } from 'react';
import { Alert as AlertType } from '../types';

const INITIAL_ALERTS: AlertType[] = [
  { id: '8829', companyName: 'Evergreen Landscaping', logo: 'https://picsum.photos/40/40?seed=evergreen', issueType: 'Weekly Quota', metricStatus: '0/15 Apps', progress: 0, detectedAt: 'Just now', status: 'active' },
  { id: '1102', companyName: 'Green Horizon Care', logo: 'https://picsum.photos/40/40?seed=horizon', issueType: 'Monthly Quota', metricStatus: '0/60 Apps', progress: 0, detectedAt: 'Just now', status: 'active' },
];

const AlertTicketsView: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertType[]>(INITIAL_ALERTS);
  const [resolvedTickets, setResolvedTickets] = useState<AlertType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<AlertType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Reminder states
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [isReminderActive, setIsReminderActive] = useState(false);
  const [isSavingReminder, setIsSavingReminder] = useState(false);

  const handleCreateTicket = (alert: AlertType) => {
    setSelectedAlert(alert);
    setIsModalOpen(true);
    setSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess(false);
      }, 1500);
    }, 1000);
  };

  const handleResolve = (id: string) => {
    const alertToResolve = alerts.find(a => a.id === id);
    if (alertToResolve) {
      setAlerts(alerts.filter(a => a.id !== id));
      setResolvedTickets([{ ...alertToResolve, status: 'resolved', detectedAt: new Date().toLocaleString() }, ...resolvedTickets]);
    }
  };

  const handleSaveReminder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingReminder(true);
    setTimeout(() => {
      setIsSavingReminder(false);
      setIsReminderActive(true);
    }, 1000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-wrap justify-between items-end gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black tracking-tight">Alert & Ticket Center</h2>
          <p className="text-[#616f89] dark:text-gray-400 text-sm max-w-2xl">
            Track automated system alerts and manage support resolutions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column: Active Alerts & History */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Alerts Table */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-red-500 animate-pulse"></span>
              <h3 className="text-sm font-black uppercase tracking-widest text-red-500">Active Issues ({alerts.length})</h3>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-[#dbdfe6] dark:border-gray-800 shadow-sm overflow-hidden">
              {alerts.length === 0 ? (
                <div className="p-12 text-center text-gray-400 italic text-sm">No active alerts at the moment.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/30 border-b border-[#dbdfe6] dark:border-gray-800">
                        <th className="px-6 py-4 text-[10px] font-bold text-[#616f89] uppercase tracking-widest">Company</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-[#616f89] uppercase tracking-widest">Problem</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-[#616f89] uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {alerts.map(alert => (
                        <tr key={alert.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img src={alert.logo} alt="" className="size-8 rounded border dark:border-gray-700 grayscale" />
                              <span className="text-sm font-bold">{alert.companyName}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black text-red-500 uppercase">{alert.issueType}</span>
                              <span className="text-xs text-gray-500">{alert.metricStatus}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button 
                              onClick={() => handleCreateTicket(alert)}
                              className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-[#dbdfe6] dark:border-gray-700 text-[10px] font-black uppercase rounded hover:bg-gray-50 transition-all inline-flex items-center gap-1"
                            >
                              Open Ticket
                            </button>
                            <button 
                              onClick={() => handleResolve(alert.id)}
                              className="px-3 py-1.5 bg-green-500 text-white text-[10px] font-black uppercase rounded shadow-sm hover:bg-green-600 transition-all active:scale-95 inline-flex items-center gap-1"
                            >
                              <span className="material-symbols-outlined text-[14px]">check</span>
                              Resolve
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

          {/* Resolved History Panel */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-gray-400"></span>
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-500">Resolved History</h3>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-[#dbdfe6] dark:border-gray-800 shadow-sm overflow-hidden">
              {resolvedTickets.length === 0 ? (
                <div className="p-8 text-center text-gray-400 italic text-xs">History is empty. Resolved tickets will appear here.</div>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {resolvedTickets.map(ticket => (
                    <div key={ticket.id} className="p-4 flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="size-8 rounded bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500">
                          <span className="material-symbols-outlined text-sm">verified</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold">{ticket.companyName}</p>
                          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{ticket.issueType} • {ticket.detectedAt}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded uppercase tracking-tighter">Completed</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar: Reminder Tool */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#111318] rounded-2xl border-2 border-primary/10 p-6 shadow-xl shadow-primary/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">mail_lock</span>
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Reminders</h3>
                <p className="text-[10px] text-[#616f89] font-bold uppercase tracking-widest">Automatic Reports</p>
              </div>
            </div>

            <form onSubmit={handleSaveReminder} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#616f89] uppercase tracking-widest ml-1">Email Recipient</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">alternate_email</span>
                  <input 
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@agency.com"
                    className="w-full h-10 pl-10 pr-4 rounded-lg border-[#dbdfe6] dark:border-gray-700 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#616f89] uppercase tracking-widest ml-1">Frequency</label>
                <select 
                  value={frequency} 
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border-[#dbdfe6] dark:border-gray-700 dark:bg-gray-800 text-sm outline-none"
                >
                  <option value="daily">Daily Summary</option>
                  <option value="weekly">Weekly Summary</option>
                  <option value="instantly">Instantly on Alert</option>
                </select>
              </div>

              <button 
                disabled={isSavingReminder}
                className={`w-full h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ${
                  isReminderActive 
                  ? 'bg-green-500 text-white shadow-green-500/20' 
                  : 'bg-primary text-white shadow-primary/20 hover:bg-primary/90'
                }`}
              >
                {isSavingReminder ? (
                  <span className="material-symbols-outlined animate-spin">sync</span>
                ) : isReminderActive ? (
                  <>
                    <span className="material-symbols-outlined text-base">check</span>
                    Active Schedule
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">schedule_send</span>
                    Activate Reminder
                  </>
                )}
              </button>

              {isReminderActive && (
                <button 
                  type="button"
                  onClick={() => setIsReminderActive(false)}
                  className="w-full text-[9px] font-bold text-red-500 uppercase hover:underline"
                >
                  Stop current automation
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Ticket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-[#111318] w-full max-w-md rounded-2xl shadow-2xl border border-[#dbdfe6] dark:border-gray-800 overflow-hidden">
            {success ? (
              <div className="p-12 flex flex-col items-center text-center animate-in zoom-in duration-300">
                <div className="size-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-4xl">mark_email_read</span>
                </div>
                <h3 className="text-xl font-bold">Action Logged</h3>
                <p className="text-[#616f89] text-sm mt-2">Support has been assigned to this case.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="px-6 py-4 border-b border-[#dbdfe6] dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                  <h3 className="font-bold">New Support Entry</h3>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="text-[#616f89] hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                
                <div className="p-6 space-y-4 text-left">
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                    <img src={selectedAlert?.logo} className="size-8 rounded" alt="" />
                    <div>
                      <span className="block text-[10px] font-bold text-primary uppercase">Company</span>
                      <span className="text-sm font-bold">{selectedAlert?.companyName}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#616f89] uppercase tracking-widest">Resolution Steps</label>
                    <textarea 
                      required
                      className="w-full h-24 p-3 rounded-lg border-[#dbdfe6] dark:border-gray-700 dark:bg-gray-800 text-sm outline-none resize-none"
                      placeholder="What needs to be done?"
                    ></textarea>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-gray-800/30 border-t border-[#dbdfe6] dark:border-gray-800 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 h-10 rounded-lg border border-[#dbdfe6] font-bold text-xs uppercase">Cancel</button>
                  <button disabled={isSubmitting} className="flex-[2] h-10 rounded-lg bg-primary text-white font-bold text-xs uppercase shadow-lg shadow-primary/20">
                    {isSubmitting ? 'Processing...' : 'Assign Support'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertTicketsView;
