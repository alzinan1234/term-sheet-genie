"use client";

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

const capTableData = [
  {
    id: 'founders',
    name: 'Founders',
    investors: '3 Founders',
    commonStock: '100,000',
    stockOptions: '10,000',
    seriesA: '',
    seriesB: '',
    fullyDiluted: '110,000',
    ownership: '10.8%',
    price: '10.8',
    subRows: [
      { name: 'John Doe', common: '40,000', options: '5,000', total: '45,000', ownership: '4.4%', price: '4.4' },
      { name: 'Jane Smith', common: '35,000', options: '3,000', total: '38,000', ownership: '3.7%', price: '3.7' },
      { name: 'Bob Johnson', common: '25,000', options: '2,000', total: '27,000', ownership: '2.6%', price: '2.6' },
    ]
  },
  {
    id: 'unallocated',
    name: 'Unallocated Options',
    investors: '-',
    commonStock: '',
    stockOptions: '10,000',
    seriesA: '',
    seriesB: '',
    fullyDiluted: '10,000',
    ownership: '1.0%',
    price: '1.0',
  },
  {
    id: 'seriesA',
    name: 'Series A',
    investors: '2 Investors',
    commonStock: '',
    stockOptions: '',
    seriesA: '500,000',
    seriesB: '',
    fullyDiluted: '500,000',
    ownership: '49.0%',
    price: '49.0',
    subRows: [
      { name: 'Sequoia Capital', preferred: '300,000', total: '300,000', ownership: '29.4%', price: '29.4' },
      { name: 'Andreessen Horowitz', preferred: '200,000', total: '200,000', ownership: '19.6%', price: '19.6' },
    ]
  },
  {
    id: 'seriesB',
    name: 'Series B',
    investors: 'Accel Partners',
    commonStock: '',
    stockOptions: '',
    seriesA: '',
    seriesB: '400,000',
    fullyDiluted: '400,000',
    ownership: '39.2%',
    price: '39.2',
  }
];

export default function CapTable() {
  const [expandedRows, setExpandedRows] = useState<string[]>(['founders']); 
  const [isTableVisible, setIsTableVisible] = useState(true);

  const toggleRow = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full bg-[#F9FAFB] font-sans">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        
        {/* Header Section with Toggle Functionality */}
        <div 
          className="px-6 py-4 flex justify-between items-center border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setIsTableVisible(!isTableVisible)}
        >
          <h2 className="text-[16px] font-semibold">Cap Table</h2>
          <button className="text-[#667085] focus:outline-none">
            {isTableVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {/* Table Container - Conditional Rendering */}
        {isTableVisible && (
          <div className="overflow-x-auto transition-all duration-300">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[12px] font-medium text-[#667085] border-b border-gray-100 bg-[#FCFCFD]">
                  <th className="pl-6 pr-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Investors</th>
                  <th className="px-4 py-3 font-medium">Common Stock</th>
                  <th className="px-4 py-3 font-medium">Stock Options</th>
                  <th className="px-4 py-3 font-medium">Series A Preferred</th>
                  <th className="px-4 py-3 font-medium">Series B Preferred</th>
                  <th className="px-4 py-3 font-medium text-right">Fully Diluted Share</th>
                  <th className="px-4 py-3 font-medium text-right">Nominal Ownership</th>
                  <th className="pr-6 pl-4 py-3 font-medium text-right">Price/Share</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-[#101828]">
                {capTableData.map((row) => (
                  <React.Fragment key={row.id}>
                    <tr className="hover:bg-gray-50 border-b border-gray-100 transition-colors">
                      <td className="pl-6 pr-4 py-4">
                        <div className="flex items-center gap-2">
                          {row.subRows ? (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation(); 
                                toggleRow(row.id);
                              }} 
                              className="focus:outline-none"
                            >
                              {expandedRows.includes(row.id) ? 
                                <ChevronDown size={14} className="text-[#667085]" /> : 
                                <ChevronRight size={14} className="text-[#667085]" />
                              }
                            </button>
                          ) : <div className="w-[14px]" />}
                          <span className="font-medium text-[#344054]">{row.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-[#667085]">{row.investors}</td>
                      <td className="px-4 py-4 text-[#101828]">{row.commonStock}</td>
                      <td className="px-4 py-4 text-[#101828]">{row.stockOptions}</td>
                      <td className="px-4 py-4 text-[#101828]">{row.seriesA}</td>
                      <td className="px-4 py-4 text-[#101828]">{row.seriesB}</td>
                      <td className="px-4 py-4 font-medium text-right">{row.fullyDiluted}</td>
                      <td className="px-4 py-4 font-medium text-right">{row.ownership}</td>
                      <td className="pr-6 pl-4 py-4 text-[#667085] text-right">{row.price}</td>
                    </tr>

                    {/* Sub-rows fixed with 'any' type to solve property errors */}
                    {row.subRows && expandedRows.includes(row.id) && row.subRows.map((sub: any, idx) => (
                      <tr key={idx} className="bg-[#F9FAFB] border-b border-gray-100">
                        <td className="pl-12 pr-4 py-3 text-[#475467]">{sub.name}</td>
                        <td className="px-4 py-3 text-[#98A2B3]">-</td>
                        <td className="px-4 py-3 text-[#667085]">{sub.common || '-'}</td>
                        <td className="px-4 py-3 text-[#667085]">{sub.options || '-'}</td>
                        <td className="px-4 py-3 text-[#667085]">{sub.preferred || '-'}</td>
                        <td className="px-4 py-3 text-[#98A2B3]">-</td>
                        <td className="px-4 py-3 text-right text-[#667085]">{sub.total}</td>
                        <td className="px-4 py-3 text-right text-[#667085]">{sub.ownership}</td>
                        <td className="pr-6 pl-4 py-3 text-right text-[#667085]">{sub.price}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}

                {/* Total Row */}
                <tr className="bg-white">
                  <td className="pl-6 pr-4 py-5 font-bold text-[#101828]">Total</td>
                  <td className="px-4 py-5 text-[#667085]">-</td>
                  <td className="px-4 py-5 font-bold">100,000</td>
                  <td className="px-4 py-5 font-bold">20,000</td>
                  <td className="px-4 py-5 font-bold">500,000</td>
                  <td className="px-4 py-5 font-bold">400,000</td>
                  <td className="px-4 py-5 font-bold text-right">1,020,000</td>
                  <td className="px-4 py-5 font-bold text-right">100.0%</td>
                  <td className="pr-6 pl-4 py-5 font-bold text-right">100.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}