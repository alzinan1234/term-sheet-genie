"use client";

import React, { useState, useMemo } from 'react';
import { Search, X, Lightbulb, ChevronDown, Copy, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation'; // রাউটার ইম্পোর্ট নিশ্চিত করুন

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
  const router = useRouter(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const [startups] = useState<Startup[]>([
    { id: '1', name: 'Aurora Innovation', website: 'aurora.tech', logo: '🟣', status: 'Active', description: 'Self-driving vehicle technology', investmentAmount: '$25,000,000', growth: '15%' },
    { id: '2', name: 'Checkout.com', website: 'checkout.com', logo: '🔵', status: 'Active', description: 'Global payment processing', investmentAmount: '$30,000,000', growth: '28%' },
    { id: '3', name: 'Flexport', website: 'flexport.com', logo: '🔵', status: 'Active', description: 'Digital freight forwarding platform', investmentAmount: '$22,500,000', growth: '32%' },
    { id: '4', name: 'Notion', website: 'notion.so', logo: '⚪', status: 'Active', description: 'All-in-one workspace', investmentAmount: '$18,000,000', growth: '89%' },
    { id: '5', name: 'Relay Therapeutics', website: 'relaytx.com', logo: '🌀', status: 'Active', description: 'Precision medicine for cancer treatment', investmentAmount: '$15,000,000', growth: '45%' },
  ]);

  // --- Filter Logic (এটি মিসিং ছিল বা এরর ছিল) ---
  const filteredStartups = useMemo(() => {
    return startups.filter((startup) => {
      const matchesSearch = 
        startup.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        startup.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTab = activeTab === 'All' || startup.status === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab, startups]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8 relative font-sans">
      {/* Header & Filters (আগের মতোই থাকবে) */}
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
                <tr 
                  key={item.id} 
                  // পুরো রো ক্লিকেবল
                  onClick={() => router.push(`/investor-admin/startups/${item.id}`)}
                  className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#F9FAFB] border border-[#EAECF0] flex items-center justify-center text-lg shadow-sm">
                        {item.logo}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#101828] group-hover:text-blue-600 transition-colors">
                          {item.name}
                        </div>
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
                    <div className="flex justify-end gap-3 text-[#98A2B3]" onClick={(e) => e.stopPropagation()}>
                      <button className="hover:text-[#2D5BFF] transition-colors"><Copy size={18}/></button>
                      <button className="hover:text-[#2D5BFF] transition-colors"><Pencil size={18}/></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-[#667085]">
                  No startups found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}