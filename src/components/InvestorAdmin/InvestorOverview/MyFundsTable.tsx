"use client";
import React from "react";
import { Plus, ChevronDown } from "lucide-react";
import Link from "next/link";

interface Fund {
  id: string;
  name: string;
  initiationDate: string;
  committed: string;
  invested: string;
  count: number;
  status: "Active" | "Inactive";
  partner: string;
  aum: string;
}

const funds: Fund[] = [
  { id: "tsg-seed", name: "TSG Seed", initiationDate: "2/1/2025", committed: "$250,000,000", invested: "$8,200,000", count: 2, status: "Active", partner: "Jonathan", aum: "$8,200,000" },
  { id: "tsg-iv", name: "TSG IV", initiationDate: "7/13/2019", committed: "$150,000,000", invested: "$80,000,000", count: 15, status: "Active", partner: "Andres", aum: "$132,500,00" },
  { id: "tsg-crypto", name: "TSG Crypto", initiationDate: "1/3/2017", committed: "$50,000,000", invested: "$48,500,000", count: 16, status: "Inactive", partner: "Nitin", aum: "$12,000,000" },
];

export default function MyFundsTable({ onAddNew }: { onAddNew: () => void }) {
  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#101828]">My Funds</h1>
        <button 
          onClick={onAddNew}
          className="bg-[#2D60FF] hover:bg-[#1a4bd6] text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 transition-all font-bold text-sm shadow-md shadow-blue-100 active:scale-95"
        >
          <Plus size={18} /> Add New Fund
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-[#667085] text-[13px] border-b border-gray-100">
              <th className="px-6 py-4 font-semibold">Fund Name</th>
              <th className="px-6 py-4 font-semibold">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-800">
                  Initiation Date <ChevronDown size={14} className="text-gray-400"/>
                </div>
              </th>
              <th className="px-6 py-4 font-semibold">Committed Capital</th>
              <th className="px-6 py-4 font-semibold">Invested Capital</th>
              <th className="px-6 py-4 font-semibold">Investments</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Lead Partner</th>
              <th className="px-6 py-4 font-semibold text-right">Current AUM</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-50">
            {funds.map((fund) => (
              <tr 
                key={fund.id} 
                className="group hover:bg-blue-50/30 transition-all cursor-pointer"
              >
                {/* Clickable Name with Link */}
                <td className="px-6 py-5">
                  <Link 
                    href={`/investor-admin/my-funds/${fund.id}`}
                    className="font-bold text-[#1A2B49] group-hover:text-[#2D60FF] transition-colors"
                  >
                    {fund.name}
                  </Link>
                </td>
                
                <td className="px-6 py-5 text-[#475467] text-sm font-medium">{fund.initiationDate}</td>
                <td className="px-6 py-5 text-[#475467] text-sm font-medium">{fund.committed}</td>
                <td className="px-6 py-5 text-[#475467] text-sm font-medium">{fund.invested}</td>
                <td className="px-6 py-5 text-[#475467] text-sm font-medium">{fund.count}</td>
                
                {/* Status Badge */}
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 w-fit border ${
                    fund.status === 'Active' 
                    ? 'bg-green-50 text-green-700 border-green-100' 
                    : 'bg-red-50 text-red-700 border-red-100'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${fund.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                    {fund.status}
                  </span>
                </td>
                
                <td className="px-6 py-5 text-[#475467] text-sm font-medium">{fund.partner}</td>
                
                <td className="px-6 py-5 text-right font-bold text-[#101828]">
                  {fund.aum}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}