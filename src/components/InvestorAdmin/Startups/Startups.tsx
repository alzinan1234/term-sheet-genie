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
  
  // --- Functional States ---
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

          {/* Status Tabs */}
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

          {/* Search Bar */}
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

      {/* Modern Modal Section */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with slight blur */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300" 
            onClick={() => setIsModalOpen(false)} 
          />
          
          {/* Modal Container */}
          <div className="relative bg-white w-full max-w-[520px] rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="px-8 pt-8 pb-4">
              <h2 className="text-[22px] font-bold text-[#1e293b] mb-1">Add New Startup</h2>
              <p className="text-[15px] text-[#64748b]">Enter the details below to register a new portfolio company.</p>
            </div>

            {/* Modal Form */}
            <form className="px-8 pb-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                {[
                  { id: 'name', label: 'Startup Name', placeholder: 'e.g. Acme Corp', required: true },
                  { id: 'url', label: 'Website URL', placeholder: 'https://acme.com', required: true },
                  { id: 'amount', label: 'Investment Amount', placeholder: '$0,000,000', required: true },
                  { id: 'desc', label: 'Description', placeholder: 'Brief description of the startup', required: false, isTextArea: true },
                ].map((field) => (
                  <div key={field.id} className="space-y-1.5">
                    <label className="text-[14px] font-semibold text-[#1e293b]">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    
                    {field.isTextArea ? (
                      <textarea
                        rows={3}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-[10px] bg-white border border-[#e2e8f0] rounded-lg text-[15px] text-gray-800 placeholder:text-[#cbd5e1] outline-none focus:border-[#94a3b8] focus:ring-4 focus:ring-blue-500/5 transition-all resize-none"
                      />
                    ) : (
                      <input 
                        type="text"
                        placeholder={field.placeholder}
                        className="w-full px-4 py-[10px] bg-white border border-[#e2e8f0] rounded-lg text-[15px] text-gray-800 placeholder:text-[#cbd5e1] outline-none focus:border-[#94a3b8] focus:ring-4 focus:ring-blue-500/5 transition-all"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Modal Footer Actions */}
              <div className="flex justify-end items-center gap-6 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="text-[15px] font-medium text-[#64748b] hover:text-[#1e293b] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-[#2D5BFF] hover:bg-blue-700 text-white px-8 py-[10px] rounded-lg text-[15px] font-bold shadow-sm transition-all active:scale-[0.98]"
                >
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