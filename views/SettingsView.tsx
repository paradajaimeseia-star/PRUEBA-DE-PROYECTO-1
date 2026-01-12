
import React, { useState } from 'react';
import { Company } from '../types';

const INITIAL_COMPANIES: Company[] = [
  {
    id: '1',
    name: 'Marbella Landscaping',
    logo: 'https://picsum.photos/40/40?seed=marbella',
    status: 'active',
    nextSync: 'No sync',
    weeklyGoal: { current: 0, total: 20 },
    monthlyGoal: { current: 0, total: 70 }
  },
  {
    id: '2',
    name: '3 Brothers',
    logo: 'https://picsum.photos/40/40?seed=3bros',
    status: 'active',
    nextSync: 'No sync',
    weeklyGoal: { current: 0, total: 20 },
    monthlyGoal: { current: 0, total: 70 }
  },
  {
    id: '3',
    name: 'Evergreen Solutions',
    logo: 'https://picsum.photos/40/40?seed=evergreen',
    status: 'active',
    nextSync: 'No sync',
    weeklyGoal: { current: 0, total: 20 },
    monthlyGoal: { current: 0, total: 70 }
  },
  {
    id: '4',
    name: 'Skyline Roofs',
    logo: 'https://picsum.photos/40/40?seed=skyline',
    status: 'warning',
    nextSync: 'No sync',
    weeklyGoal: { current: 0, total: 20 },
    monthlyGoal: { current: 0, total: 70 }
  }
];

const SettingsView: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this company? All sync data will be lost.')) {
      setCompanies(companies.filter(c => c.id !== id));
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCompany) {
      setCompanies(companies.map(c => c.id === editingCompany.id ? editingCompany : c));
      setEditingCompany(null);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black tracking-tight">Account Settings</h2>
        <p className="text-[#616f89] dark:text-gray-400 text-sm">Manage your connected GHL branches and agency preferences.</p>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">business_center</span>
            <h3 className="text-sm font-black uppercase tracking-widest">Connected Branches ({companies.length})</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-[#dbdfe6] dark:border-gray-800 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-[#dbdfe6] dark:border-gray-800">
                <th className="px-6 py-4 text-[10px] font-black text-[#616f89] uppercase tracking-widest">Company & Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-[#616f89] uppercase tracking-widest hidden md:table-cell">API Quotas</th>
                <th className="px-6 py-4 text-[10px] font-black text-[#616f89] uppercase tracking-widest hidden lg:table-cell">Credentials</th>
                <th className="px-6 py-4 text-[10px] font-black text-[#616f89] uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {companies.map(company => (
                <tr key={company.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img src={company.logo} alt="" className="size-10 rounded-xl border dark:border-gray-700 shadow-sm" />
                      <div>
                        <p className="font-bold text-sm">{company.name}</p>
                        <div className="flex items-center gap-1.5">
                          <span className="size-1.5 rounded-full bg-gray-400"></span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{company.status} • Never Synced</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 hidden md:table-cell">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-gray-500 uppercase">W: {company.weeklyGoal.total} • M: {company.monthlyGoal.total}</span>
                      <div className="w-24 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 hidden lg:table-cell">
                    <code className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-500">
                      GHL_KEY_••••_••••
                    </code>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setEditingCompany(company)}
                        className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors text-gray-400"
                        title="Edit Company"
                      >
                        <span className="material-symbols-outlined text-xl">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(company.id)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 rounded-lg transition-colors text-gray-400"
                        title="Delete Company"
                      >
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SettingsView;
