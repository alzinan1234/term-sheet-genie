"use client";

import React, { useState } from 'react';
import { Search, Calendar, X, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation'; // 1. Import the router

// --- Types ---
interface Partner {
  id: string;
  name: string;
  image: string;
  funds: string[];
  committed: string;
  fees: string;
  since: string;
}

export default function Limitedpartners() {
  const router = useRouter(); // 2. Initialize the router
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initial Mock Data
  const [partners] = useState<Partner[]>([
    { id: '1', name: 'Yale Endowment Fund', image: 'https://i.pravatar.cc/150?u=yale', funds: ['TSG Growth', 'TSG Opportunities'], committed: '$125,000,000', fees: '$2,500,000', since: 'Jan 15, 2024' },
    { id: '2', name: 'Singapore GIC', image: 'https://i.pravatar.cc/150?u=gic', funds: ['TSG Growth'], committed: '$75,000,000', fees: '$1,500,000', since: 'Jan 15, 2024' },
    { id: '3', name: 'Rockefeller Family Office', image: 'https://i.pravatar.cc/150?u=rock', funds: ['TSG Growth'], committed: '$25,000,000', fees: '$500,000', since: 'Jan 20, 2024' },
    { id: '4', name: 'CalPERS', image: 'https://i.pravatar.cc/150?u=cal', funds: ['TSG Growth', 'TSG Ventures'], committed: '$200,000,000', fees: '$4,000,000', since: 'Jan 20, 2024' },
    { id: '5', name: 'Abu Dhabi Investment Authority', image: 'https://i.pravatar.cc/150?u=abu', funds: ['TSG Growth'], committed: '$80,000,000', fees: '$1,600,000', since: 'Feb 01, 2024' },
  ]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8 relative">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[28px] font-semibold text-[#101828]">Limited Partners</h1>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#2D5BFF] hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-sm"
        >
          <UserPlus size={18} />
          New Limited Partner
        </button>
      </div>

      {/* Filters Section */}
      <div className="mb-6">
        <p className="text-xs font-bold text-[#475467] uppercase mb-2 tracking-wider">Filters</p>
        <div className="flex gap-3">
          <div className="relative">
            <select className="appearance-none bg-white border border-[#EAECF0] rounded-lg pl-3 pr-10 py-2 text-sm font-medium text-[#344054] outline-none focus:ring-2 focus:ring-blue-500/10 min-w-[140px]">
              <option>All Funds</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div className="relative flex-1 max-w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" size={18} />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#EAECF0] rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/10"
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-[#EAECF0] rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
              <th className="px-6 py-3 text-[12px] font-semibold text-[#475467] uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-[12px] font-semibold text-[#475467] uppercase tracking-wider">Participating in Funds</th>
              <th className="px-6 py-3 text-[12px] font-semibold text-[#475467] uppercase tracking-wider">Total Committed Capital</th>
              <th className="px-6 py-3 text-[12px] font-semibold text-[#475467] uppercase tracking-wider">Total Annual Fees</th>
              <th className="px-6 py-3 text-[12px] font-semibold text-[#475467] uppercase tracking-wider">Relationship Since</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECF0]">
            {partners.map((partner) => (
              <tr 
                key={partner.id} 
                // 3. Added the onClick and cursor-pointer for navigation
                onClick={() => router.push(`/investor-admin/limited-partners/${partner.id}`)}
                className="hover:bg-gray-50/50 transition-colors cursor-pointer" 
              >
                <td className="px-6 py-4 flex items-center gap-3">
                  <img src={partner.image} alt="" className="w-10 h-10 rounded-full bg-gray-100 object-cover" />
                  <span className="text-sm font-medium text-[#101828]">{partner.name}</span>
                </td>
                <td className="px-6 py-4 text-sm text-[#475467]">
                  {partner.funds.join(', ')}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#101828]">
                  {partner.committed}
                </td>
                <td className="px-6 py-4 text-sm text-[#475467]">
                  {partner.fees}
                </td>
                <td className="px-6 py-4 text-sm text-[#475467]">
                  {partner.since}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal logic remains exactly as you provided... */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0c111d]/30 backdrop-blur-[4px]" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-[560px] rounded-[20px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center px-8 py-6 border-b border-[#F2F4F7]">
              <h2 className="text-[20px] font-bold text-[#101828]">Add a Limited Partner</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#98A2B3] hover:text-[#667085] transition-colors p-1"><X size={22} /></button>
            </div>
            <form className="p-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
              {[
                { label: 'Company Name', placeholder: 'TSG Growth', required: true },
                { label: 'Main point of contact name', placeholder: 'John Doe', required: true },
                { label: 'Main point of contact role in organization', placeholder: 'Administrator', required: true },
                { label: 'Main point of contact email', placeholder: 'johndoe@email.com', required: true, type: 'email' },
                { label: 'Main point of contact phone number', placeholder: '+1 00 000 00000', required: true },
              ].map((field, idx) => (
                <div key={idx} className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#344054] uppercase tracking-wider">
                    {field.label} {field.required && <span className="text-[#D92D20]">*</span>}
                  </label>
                  <input type={field.type || 'text'} placeholder={field.placeholder} className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#2D5BFF] transition-all text-[#101828] placeholder:text-[#98A2B3]" />
                </div>
              ))}
              <div className="space-y-1.5 relative">
                <label className="text-[11px] font-bold text-[#344054] uppercase tracking-wider">Relationship since <span className="text-[#D92D20]">*</span></label>
                <div className="relative">
                  <input type="text" placeholder="29/11/2020" className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:border-[#2D5BFF] transition-all" />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-[#98A2B3]" size={18} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#344054] uppercase tracking-wider">Main internal POC <span className="text-[#D92D20]">*</span></label>
                <input type="text" placeholder="Test 1" className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:border-[#2D5BFF] transition-all" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border border-[#D0D5DD] rounded-xl font-bold text-[#344054] hover:bg-gray-50 transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-[#2D5BFF] hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/10 transition-all active:scale-[0.98]">Create Limited Partner</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}