"use client";
import React, { useState, useMemo } from "react";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";

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

const initialFunds: Fund[] = [
  { id: "tsg-seed", name: "TSG Seed", initiationDate: "2/1/2025", committed: "$250,000,000", invested: "$8,200,000", count: 2, status: "Active", partner: "Jonathan", aum: "$8,200,000" },
  { id: "tsg-iv", name: "TSG IV", initiationDate: "7/13/2019", committed: "$150,000,000", invested: "$80,000,000", count: 15, status: "Active", partner: "Andres", aum: "$132,500,000" },
  { id: "tsg-crypto", name: "TSG Crypto", initiationDate: "1/3/2017", committed: "$50,000,000", invested: "$48,500,000", count: 16, status: "Inactive", partner: "Nitin", aum: "$12,000,000" },
];

type SortConfig = {
  key: keyof Fund | null;
  direction: "asc" | "desc";
};

export default function MyFundsTable({ onAddNew }: { onAddNew: () => void }) {
  const router = useRouter();
  
  // --- Sorting State ---
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });

  const handleSort = (key: keyof Fund) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // --- Sorting Logic ---
  const sortedFunds = useMemo(() => {
    const items = [...initialFunds];
    if (sortConfig.key !== null) {
      items.sort((a, b) => {
        const rawA = a[sortConfig.key!];
        const rawB = b[sortConfig.key!];

        // Fix: Use type assertion to resolve the 'replace' error on string | number
        const valA = typeof rawA === 'string' 
          ? (rawA as string).replace(/[^0-9.-]+/g, "") 
          : rawA;
        const valB = typeof rawB === 'string' 
          ? (rawB as string).replace(/[^0-9.-]+/g, "") 
          : rawB;

        // Handle numeric comparison for currency and counts
        const aNum = parseFloat(valA as string);
        const bNum = parseFloat(valB as string);

        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortConfig.direction === "asc" ? aNum - bNum : bNum - aNum;
        }

        // Standard string/fallback comparison
        if (rawA < rawB) return sortConfig.direction === "asc" ? -1 : 1;
        if (rawA > rawB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return items;
  }, [sortConfig]);

  // Helper to render sort icon
  const SortIcon = ({ column }: { column: keyof Fund }) => {
    if (sortConfig.key !== column) return <ChevronDown size={14} className="text-gray-300 opacity-0 group-hover:opacity-100" />;
    return sortConfig.direction === "asc" ? <ChevronUp size={14} className="text-blue-500" /> : <ChevronDown size={14} className="text-blue-500" />;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#101828]">My Funds</h1>
        <button 
          onClick={onAddNew}
          className="bg-[#2D60FF] hover:bg-[#1a4bd6] text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 transition-all font-bold text-sm shadow-md shadow-blue-100 active:scale-95"
        >
          <Plus size={18} /> Add New Fund
        </button>
      </div>

      <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-[#667085] text-[13px] border-b border-gray-100">
              <th onClick={() => handleSort("name")} className="px-6 py-4 font-semibold cursor-pointer group select-none">
                <div className="flex items-center gap-1">Fund Name <SortIcon column="name" /></div>
              </th>
              <th onClick={() => handleSort("initiationDate")} className="px-6 py-4 font-semibold cursor-pointer group select-none">
                <div className="flex items-center gap-1"> Initiation Date <SortIcon column="initiationDate" /></div>
              </th>
              <th onClick={() => handleSort("committed")} className="px-6 py-4 font-semibold cursor-pointer group select-none">
                <div className="flex items-center gap-1">Committed Capital <SortIcon column="committed" /></div>
              </th>
              <th onClick={() => handleSort("invested")} className="px-6 py-4 font-semibold cursor-pointer group select-none">
                <div className="flex items-center gap-1">Invested Capital <SortIcon column="invested" /></div>
              </th>
              <th onClick={() => handleSort("count")} className="px-6 py-4 font-semibold cursor-pointer group select-none">
                <div className="flex items-center gap-1">Investments <SortIcon column="count" /></div>
              </th>
              <th onClick={() => handleSort("status")} className="px-6 py-4 font-semibold cursor-pointer group select-none">
                <div className="flex items-center gap-1">Status <SortIcon column="status" /></div>
              </th>
              <th onClick={() => handleSort("partner")} className="px-6 py-4 font-semibold cursor-pointer group select-none">
                <div className="flex items-center gap-1">Lead Partner <SortIcon column="partner" /></div>
              </th>
              <th onClick={() => handleSort("aum")} className="px-6 py-4 font-semibold cursor-pointer group select-none text-right">
                <div className="flex items-center justify-end gap-1">Current AUM <SortIcon column="aum" /></div>
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-50">
            {sortedFunds.map((fund) => (
              <tr 
                key={fund.id} 
                onClick={() => router.push(`/investor-admin/my-funds/${fund.id}`)}
                className="group hover:bg-blue-50/30 transition-all cursor-pointer"
              >
                <td className="px-6 py-5">
                  <span className="font-bold text-[#1A2B49]">{fund.name}</span>
                </td>
                <td className="px-6 py-5 text-[#475467] text-sm font-medium">{fund.initiationDate}</td>
                <td className="px-6 py-5 text-[#475467] text-sm font-medium">{fund.committed}</td>
                <td className="px-6 py-5 text-[#475467] text-sm font-medium">{fund.invested}</td>
                <td className="px-6 py-5 text-[#475467] text-sm font-medium">{fund.count}</td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 w-fit border ${
                    fund.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${fund.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                    {fund.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-[#475467] text-sm font-medium">{fund.partner}</td>
                <td className="px-6 py-5 text-right font-bold text-[#101828]">{fund.aum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}