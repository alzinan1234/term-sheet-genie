"use client";

import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Plus, MoreVertical, LayoutGrid } from 'lucide-react';

// --- Types ---
interface Investment {
  id: string;
  name: string;
  website: string;
  logo: string;
  companyStatus: 'Currently Fundraising' | 'Mid-cycle';
  decisionStatus: 'Under Review' | 'Investment Committee' | 'Interviews';
  sourceFund: string;
}

export default function InvestmentPipeline() {
  // --- States ---
  const [selectedFund, setSelectedFund] = useState('All Funds');
  const [isFundOpen, setIsFundOpen] = useState(false);

  const [investments] = useState<Investment[]>([
    { id: '1', name: 'Catalog', website: 'catalogapp.io', logo: '🌀', companyStatus: 'Currently Fundraising', decisionStatus: 'Under Review', sourceFund: 'TSG Growth' },
    { id: '2', name: 'Circooles', website: 'getcirooles.com', logo: '🔵', companyStatus: 'Mid-cycle', decisionStatus: 'Investment Committee', sourceFund: 'TSG Ventures' },
    { id: '3', name: 'Command+R', website: 'cmdr.ai', logo: '🟠', companyStatus: 'Currently Fundraising', decisionStatus: 'Under Review', sourceFund: 'TSG Opportunities' },
    { id: '4', name: 'Hourglass', website: 'hourglass.app', logo: '⌛', companyStatus: 'Currently Fundraising', decisionStatus: 'Interviews', sourceFund: 'TSG Growth' },
    { id: '5', name: 'Layers', website: 'getlayers.io', logo: '🟣', companyStatus: 'Mid-cycle', decisionStatus: 'Investment Committee', sourceFund: 'TSG Ventures' },
  ]);

  // --- Filter Logic ---
  const filteredData = useMemo(() => {
    return investments.filter(item => 
      selectedFund === 'All Funds' || item.sourceFund === selectedFund
    );
  }, [selectedFund, investments]);

  // Badge Style Helper
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Currently Fundraising': return 'bg-[#ECFDF3] text-[#027A48] border-[#ABEFC6] dot-[#12B76A]';
      case 'Mid-cycle': return 'bg-[#FFFAEB] text-[#B54708] border-[#FEDF89] dot-[#F79009]';
      case 'Under Review': return 'bg-[#EFF8FF] text-[#175CD3] border-[#B2DDFF] dot-[#2E90FA]';
      case 'Investment Committee': return 'bg-[#F6FEF9] text-[#087443] border-[#B8F3D1] dot-[#12B76A]';
      case 'Interviews': return 'bg-[#FFFAEB] text-[#B54708] border-[#FEDF89] dot-[#F79009]';
      default: return 'bg-gray-50 text-gray-600 border-gray-200 dot-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8 relative font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[28px] font-semibold text-[#101828]">Investment Pipeline</h1>
      
      </div>

      {/* Filters Section */}
      <div className="mb-6">
        <p className="text-[11px] font-bold text-[#475467] uppercase mb-3 tracking-wider">Filters</p>
        <div className="flex justify-between items-center">
          {/* Fund Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsFundOpen(!isFundOpen)}
              className="flex items-center justify-between gap-8 px-4 py-2 bg-white border border-[#EAECF0] rounded-lg text-sm font-medium text-[#344054] hover:bg-gray-50 transition-all min-w-[180px]"
            >
              {selectedFund === 'All Funds' ? 'Fund' : selectedFund}
              <ChevronDown size={16} className={`text-[#667085] transition-transform ${isFundOpen ? 'rotate-180' : ''}`} />
            </button>

            {isFundOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-[#EAECF0] rounded-lg shadow-lg z-20 py-1">
                {['All Funds', 'TSG Growth', 'TSG Ventures', 'TSG Opportunities'].map((fund) => (
                  <button
                    key={fund}
                    className="w-full text-left px-4 py-2 text-sm text-[#344054] hover:bg-[#F9FAFB]"
                    onClick={() => { setSelectedFund(fund); setIsFundOpen(false); }}
                  >
                    {fund}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Add Button */}
          <button className="bg-[#2D5BFF] hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-sm">
            <LayoutGrid size={18} />
            Add Potential Investment
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-[#EAECF0] rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
              <th className="px-6 py-4 text-[12px] font-semibold text-[#475467] uppercase tracking-wider">
                <div className="flex items-center gap-1">Company <ChevronDown size={12}/></div>
              </th>
              <th className="px-6 py-4 text-[12px] font-semibold text-[#475467] uppercase tracking-wider text-center">Company Status</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-[#475467] uppercase tracking-wider text-center">Decision Status</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-[#475467] uppercase tracking-wider">Source fund</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-[#475467] uppercase tracking-wider text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECF0]">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-[#EAECF0] flex items-center justify-center text-lg bg-[#F9FAFB]">
                      {item.logo}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#101828]">{item.name}</div>
                      <div className="text-xs text-[#667085]">{item.website}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-medium ${getStatusStyles(item.companyStatus).split(' dot')[0]}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${getStatusStyles(item.companyStatus).includes('dot-[#12B76A]') ? 'bg-[#12B76A]' : 'bg-[#F79009]'}`} />
                    {item.companyStatus}
                  </span>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-medium ${getStatusStyles(item.decisionStatus).split(' dot')[0]}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${getStatusStyles(item.decisionStatus).includes('dot-[#2E90FA]') ? 'bg-[#2E90FA]' : 'dot-[#12B76A]' ? 'bg-[#12B76A]' : 'bg-[#F79009]'}`} />
                    {item.decisionStatus}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm text-[#475467]">
                  Fund Name
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="text-[#98A2B3] hover:text-[#667085] transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}