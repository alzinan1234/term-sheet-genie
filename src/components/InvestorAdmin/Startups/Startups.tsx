"use client";

import React, { useState, useMemo } from 'react';
import { Search, X, Lightbulb, ChevronDown, Copy, Pencil } from 'lucide-react';

// --- Types ---
interface Startup {
  id: string;
  name: string;
  website: string;
  logo: string;
  status: 'Active' | 'Closed';
  description: string;
  investmentAmount: string;
  growth: string;
}

export default function Startups() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // --- New Functional States ---
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const [startups] = useState<Startup[]>([
    { id: '1', name: 'Aurora Innovation', website: 'aurora.tech', logo: '🟣', status: 'Active', description: 'Self-driving vehicle technology', investmentAmount: '$25,000,000', growth: '15%' },
    { id: '2', name: 'Checkout.com', website: 'checkout.com', logo: '🔵', status: 'Active', description: 'Global payment processing', investmentAmount: '$30,000,000', growth: '28%' },
    { id: '3', name: 'Flexport', website: 'flexport.com', logo: '🔵', status: 'Active', description: 'Digital freight forwarding platform', investmentAmount: '$22,500,000', growth: '32%' },
    { id: '4', name: 'Notion', website: 'notion.so', logo: '⚪', status: 'Active', description: 'All-in-one workspace', investmentAmount: '$18,000,000', growth: '89%' },
    { id: '5', name: 'Relay Therapeutics', website: 'relaytx.com', logo: '🌀', status: 'Active', description: 'Precision medicine for cancer treatment', investmentAmount: '$15,000,000', growth: '45%' },
  ]);

  // --- Filter Logic ---
  const filteredStartups = useMemo(() => {
    return startups.filter((startup) => {
      const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           startup.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTab = activeTab === 'All' || startup.status === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab, startups]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8 relative font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-[28px] font-semibold text-[#101828]">Startups</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#2D5BFF] hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-sm"
        >
          <Lightbulb size={18} />
          Add New Startup
        </button>
      </div>

      {/* Filters Section */}
      <div className="mb-6">
        <p className="text-[11px] font-bold text-[#475467] uppercase mb-3 tracking-wider">Filters</p>
        <div className="flex gap-3">
          {/* Fund Dropdown */}
          <div className="relative">
            <select className="appearance-none bg-white border border-[#EAECF0] rounded-lg pl-3 pr-10 py-2 text-sm font-medium text-[#344054] outline-none focus:ring-2 focus:ring-blue-500/10 min-w-[160px]">
              <option>All Funds</option>
              <option>TSG Growth</option>
              <option>TSG Ventures</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown size={14} className="text-[#667085]" />
            </div>
          </div>

          {/* Status Tabs - Functional */}
          <div className="flex bg-[#F2F4F7] p-1 rounded-lg border border-[#EAECF0]">
            {['All', 'Active', 'Closed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab 
                    ? 'bg-white text-[#344054] shadow-sm' 
                    : 'text-[#667085] hover:text-[#344054]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Bar - Functional */}
          <div className="relative flex-1 max-w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" size={18} />
            <input 
              type="text" 
              placeholder="Search startups..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#EAECF0] rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/10"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98A2B3] hover:text-[#667085]"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-[#EAECF0] rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
              <th className="px-6 py-4 text-[12px] font-semibold text-[#475467] uppercase tracking-wider">Company</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-[#475467] uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-[#475467] uppercase tracking-wider">Description</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-[#475467] uppercase tracking-wider">Investment Amount</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-[#475467] uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECF0]">
            {filteredStartups.length > 0 ? (
              filteredStartups.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#F9FAFB] border border-[#EAECF0] flex items-center justify-center text-lg shadow-sm">
                        {item.logo}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#101828]">{item.name}</div>
                        <div className="text-xs text-[#667085]">{item.website}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      item.status === 'Active' 
                        ? 'bg-[#ECFDF3] text-[#027A48] border-[#ABEFC6]' 
                        : 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Active' ? 'bg-[#12B76A]' : 'bg-gray-400'}`} />
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#475467]">
                    {item.description}
                  </td>
                  <td className="px-6 py-4"> 
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#101828]">{item.investmentAmount}</span>
                      <span className="text-[11px] font-bold text-[#027A48] bg-[#ECFDF3] px-1.5 py-0.5 rounded flex items-center">
                        ↑ {item.growth}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3 text-[#98A2B3]">
                      <button className="hover:text-[#2D5BFF] transition-colors"><Copy size={18}/></button>
                      <button className="hover:text-[#2D5BFF] transition-colors"><Pencil size={18}/></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-[#667085]">
                  No startups found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal - Remains the same as previous design */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0c111d]/30 backdrop-blur-[4px]" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-[560px] rounded-[20px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center px-8 py-6 border-b border-[#F2F4F7]">
              <h2 className="text-[20px] font-bold text-[#101828]">Add New Startup</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#98A2B3] hover:text-[#667085] transition-colors"><X size={22} /></button>
            </div>
            <form className="p-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
              {[
                { label: 'Startup Name', placeholder: 'e.g. Acme Corp', required: true },
                { label: 'Website URL', placeholder: 'https://acme.com', required: true },
                { label: 'Investment Amount', placeholder: '$0,000,000', required: true },
                { label: 'Description', placeholder: 'Brief description of the startup', required: false },
              ].map((field, idx) => (
                <div key={idx} className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#344054] uppercase tracking-wider">
                    {field.label} {field.required && <span className="text-[#D92D20]">*</span>}
                  </label>
                  <input 
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#2D5BFF] transition-all text-[#101828] placeholder:text-[#98A2B3]"
                  />
                </div>
              ))}
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border border-[#D0D5DD] rounded-xl font-bold text-[#344054] hover:bg-gray-50 transition-all">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 bg-[#2D5BFF] hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/10 transition-all">
                  Create Startup
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}