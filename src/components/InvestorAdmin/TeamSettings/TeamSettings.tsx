"use client";
import React, { useState } from 'react';

// --- Types ---
interface Member {
  id: number;
  name: string;
  role: string;
  permissions: string;
  img: string;
}

const TeamSettings: React.FC = () => {
  // --- State ---
  const [activeTab, setActiveTab] = useState<'Overview' | 'Plan Info' | 'Team'>('Overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState('TermSheetGenie');
  const [companyType, setCompanyType] = useState('Startup'); // Added state for controlled select

  const tabs = ['Overview', 'Plan Info', 'Team'];

  const members: Member[] = [
    { id: 1, name: 'Olivia Rhye', role: 'User type #1', permissions: '6 companies', img: 'https://i.pravatar.cc/150?u=olivia' },
    { id: 2, name: 'Phoenix Baker', role: 'User type #2', permissions: '4 companies', img: 'https://i.pravatar.cc/150?u=phoenix' },
    { id: 3, name: 'Lana Steiner', role: 'User type #3', permissions: '11 companies', img: 'https://i.pravatar.cc/150?u=lana' },
    { id: 4, name: 'Demi Wilkinson', role: 'User type #4', permissions: '3 companies', img: 'https://i.pravatar.cc/150?u=demi' },
    { id: 5, name: 'Candice Wu', role: 'User type #2', permissions: '10 companies', img: 'https://i.pravatar.cc/150?u=wu' },
    { id: 6, name: 'Olivia Rhye', role: 'User type #1', permissions: '5 companies', img: 'https://i.pravatar.cc/150?u=olivia2' },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-10 font-sans text-slate-900">
      <div className=" mx-auto">
        <h1 className="text-3xl font-bold text-[#002050] mb-8">Team Settings</h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-all relative ${
                activeTab === tab ? 'text-[#002050]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2D60FF]" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content: Overview */}
        {activeTab === 'Overview' && (
          <div className="animate-fadeIn">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center ">
                <img src="/mm.png" alt="Company Logo" />
              </div>
              <div className="flex-1 w-full max-w-md">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Company Name</label>
                <input 
                  type="text" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg text-lg font-medium outline-none focus:border-[#2D60FF] transition-all"
                />
              </div>
            </div>
            <div className="max-w-xs">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Type of Company</label>
              <select 
                value={companyType}
                onChange={(e) => setCompanyType(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg bg-white outline-none cursor-pointer hover:border-gray-300 transition-all font-medium"
              >
                <option value="Startup">Startup</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Venture Capital">Venture Capital</option>
              </select>
            </div>
          </div>
        )}

        {/* Tab Content: Team */}
        {activeTab === 'Team' && (
          <div className="animate-fadeIn">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'User type #1', val: 15, color: 'text-blue-500', bg: 'bg-blue-50' },
                { label: 'User type #2', val: 10, color: 'text-purple-500', bg: 'bg-purple-50' },
                { label: 'User type #3', val: 20, color: 'text-green-500', bg: 'bg-green-50' },
                { label: 'User type #4', val: 16, color: 'text-gray-500', bg: 'bg-gray-100' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center mb-3 font-bold`}>
                    📄
                  </div>
                  <p className="text-xs text-gray-400 font-medium mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.val}</p>
                </div>
              ))}
            </div>

            {/* Table Area */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 flex justify-between items-center border-b border-gray-50">
                <h2 className="font-bold text-lg text-[#002050]">Total people: 61</h2>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#2D60FF] text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition shadow-md shadow-blue-100"
                >
                  <span className="text-xl leading-none">+</span> Add New Member
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4 w-10"><input type="checkbox" className="rounded text-[#2D60FF]" /></th>
                      <th className="px-6 py-4 font-semibold">Name</th>
                      <th className="px-6 py-4 font-semibold">Role/Title</th>
                      <th className="px-6 py-4 font-semibold">Permissions</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {members.map((m) => (
                      <tr key={m.id} className="hover:bg-gray-50/50 transition">
                        <td className="px-6 py-4"><input type="checkbox" className="rounded border-gray-300" /></td>
                        <td className="px-6 py-4 flex items-center gap-3">
                          <img src={m.img} alt="" className="w-10 h-10 rounded-full border border-gray-100 shadow-sm" />
                          <span className="font-semibold text-sm text-[#002050]">{m.name}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{m.role}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{m.permissions}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-300 hover:text-[#2D60FF] transition text-xl">✎</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Plan Info (Placeholder) */}
        {activeTab === 'Plan Info' && (
          <div className="p-20 text-center text-gray-400 animate-fadeIn">
            Plan information details would go here.
          </div>
        )}
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] w-full max-w-[440px] p-10 relative shadow-2xl animate-modalScale">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute right-8 top-8 w-8 h-8 flex items-center justify-center rounded-full border border-gray-100 text-gray-400 hover:bg-gray-50 transition"
            >
              ✕
            </button>
            
            <h2 className="text-3xl font-bold text-[#101828] mb-8">New member</h2>
            
            <div className="space-y-6">
              {[
                { label: 'Name', placeholder: 'Victor Velasquez' },
                { label: 'Email', placeholder: 'correodeejemplo@gmail.com' },
                { label: 'Role/Title', placeholder: 'Product Designer' },
              ].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
                  <input 
                    type="text" 
                    placeholder={field.placeholder} 
                    className="w-full p-3.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:bg-white focus:border-[#2D60FF] focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-gray-300" 
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Permissions</label>
                <div className="relative">
                  <select className="w-full p-3.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:bg-white focus:border-[#2D60FF] outline-none appearance-none cursor-pointer">
                    <option>2 funds access</option>
                    <option>Full access</option>
                    <option>Admin access</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-[#2D60FF] text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98] mt-4"
              >
                Send invitation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styles for smooth entry */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes modalScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-modalScale { animation: modalScale 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default TeamSettings;