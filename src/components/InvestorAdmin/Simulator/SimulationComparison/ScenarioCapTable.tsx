"use client";

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ChevronRight, ChevronDown } from 'lucide-react';

const barData = [
  { name: 'Post series A', SeriesA: 25, SeriesB: 0, SeriesC: 0, Founder: 15 },
  { name: 'Post series B', SeriesA: 30, SeriesB: 20, SeriesC: 0, Founder: 30 },
  { name: 'Post series C', SeriesA: 25, SeriesB: 20, SeriesC: 25, Founder: 30 },
];

const ScenarioCapTable = ({ id }: { id: number }) => {
  // ড্রপডাউন স্টেট
  const [isFoundersOpen, setIsFoundersOpen] = useState(false);
  const [isSeriesAOpen, setIsSeriesAOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Top Section: Chart and Valuations */}
      <div className="flex flex-col xl:flex-row gap-8 bg-[#fcfdfe] p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex-1">
          <p className="text-[11px] font-semibold text-gray-500 mb-6 tracking-tight">
            Round-by-round distribution
          </p>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 11, fill: '#64748b'}} 
                />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="SeriesA" stackId="a" fill="#818cf8" barSize={45} />
                <Bar dataKey="SeriesB" stackId="a" fill="#fb7185" />
                <Bar dataKey="SeriesC" stackId="a" fill="#2dd4bf" />
                <Bar dataKey="Founder" stackId="a" fill="#fbbf24" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            {[
              { label: 'Series A', color: 'bg-[#818cf8]' },
              { label: 'Series B', color: 'bg-[#fb7185]' },
              { label: 'Series C', color: 'bg-[#2dd4bf]' },
              { label: 'Founder', color: 'bg-[#fbbf24]' }
            ].map((item, idx) => (
               <div key={idx} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-sm ${item.color}`} />
                  <span className="text-[11px] font-medium text-gray-500">{item.label}</span>
               </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center text-right border-l border-gray-100 pl-8 space-y-6 min-w-[220px]">
          <div>
            <p className="text-[11px] font-medium text-gray-400 tracking-tight">Nominal post money valuation</p>
            <p className="text-5xl font-bold text-[#1e293b] tracking-tighter">
                {(id === 1 ? 5.000 : 4.800).toFixed(3)}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-gray-400 tracking-tight">Contract based valuation</p>
            <p className="text-5xl font-bold text-[#1e293b] tracking-tighter">
                {(id === 1 ? 5.000 : 4.600).toFixed(3)}
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Table Section */}
      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-[13px] text-left border-collapse">
          <thead className="bg-[#f8fafc] text-gray-500 font-semibold text-[11px] border-b border-gray-100">
            <tr>
              <th className="px-4 py-4 font-bold">Name</th>
              <th className="px-4 py-4">Investors</th>
              <th className="px-4 py-4">Common Stock</th>
              <th className="px-4 py-4">Stock Options</th>
              <th className="px-4 py-4">Series A Preferred</th>
              <th className="px-4 py-4">Series B Preferred</th>
              <th className="px-4 py-4">Fully Diluted Share</th>
              <th className="px-4 py-4">Nominal Ownership</th>
              <th className="px-4 py-4">Price/Share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            
            {/* --- FOUNDERS PARENT ROW --- */}
            <tr 
              className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
              onClick={() => setIsFoundersOpen(!isFoundersOpen)}
            >
              <td className="px-4 py-4 font-bold text-gray-800 flex items-center gap-2">
                {isFoundersOpen ? <ChevronDown size={14} className="text-gray-600" /> : <ChevronRight size={14} className="text-gray-400" />} founders
              </td>
              <td className="px-4 py-4 text-gray-500 italic text-xs">3 founders</td>
              <td className="px-4 py-4">100,000</td>
              <td className="px-4 py-4">10,000</td>
              <td className="px-4 py-4">-</td>
              <td className="px-4 py-4">-</td>
              <td className="px-4 py-4 font-medium">110,000</td>
              <td className="px-4 py-4 text-blue-600 font-medium">10.8%</td>
              <td className="px-4 py-4">10.8</td>
            </tr>

            {/* FOUNDERS CHILD ROWS */}
            {isFoundersOpen && (
              <>
                <tr className="bg-gray-50/20 text-xs">
                  <td className="px-12 py-3 text-gray-600 italic">John Doe</td>
                  <td className="px-4 py-3 text-gray-400">-</td>
                  <td className="px-4 py-3">40,000</td>
                  <td className="px-4 py-3">5,000</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">45,000</td>
                  <td className="px-4 py-3">4.4%</td>
                  <td className="px-4 py-3">4.4</td>
                </tr>
                <tr className="bg-gray-50/20 text-xs">
                  <td className="px-12 py-3 text-gray-600 italic">Jane Smith</td>
                  <td className="px-4 py-3 text-gray-400">-</td>
                  <td className="px-4 py-3">35,000</td>
                  <td className="px-4 py-3">3,000</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">38,000</td>
                  <td className="px-4 py-3">3.7%</td>
                  <td className="px-4 py-3">3.7</td>
                </tr>
                <tr className="bg-gray-50/20 text-xs">
                  <td className="px-12 py-3 text-gray-600 italic">Bob Johnson</td>
                  <td className="px-4 py-3 text-gray-400">-</td>
                  <td className="px-4 py-3">25,000</td>
                  <td className="px-4 py-3">2,000</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">27,000</td>
                  <td className="px-4 py-3">2.6%</td>
                  <td className="px-4 py-3">2.6</td>
                </tr>
              </>
            )}
            
            {/* --- UNALLOCATED OPTIONS ROW --- */}
            <tr className="bg-white">
              <td className="px-12 py-4 text-gray-500">unallocated options</td>
              <td className="px-4 py-4 text-gray-400">-</td>
              <td className="px-4 py-4">-</td>
              <td className="px-4 py-4">10,000</td>
              <td className="px-4 py-4">-</td>
              <td className="px-4 py-4">-</td>
              <td className="px-4 py-4 text-gray-600">10,000</td>
              <td className="px-4 py-4">1.0%</td>
              <td className="px-4 py-4 text-gray-400">1.0</td>
            </tr>

            {/* --- SERIES A PARENT ROW --- */}
            <tr 
              className="hover:bg-gray-50/50 transition-colors cursor-pointer"
              onClick={() => setIsSeriesAOpen(!isSeriesAOpen)}
            >
              <td className="px-4 py-4 font-bold text-gray-800 flex items-center gap-2">
                {isSeriesAOpen ? <ChevronDown size={14} className="text-gray-600" /> : <ChevronRight size={14} className="text-gray-400" />} series A
              </td>
              <td className="px-4 py-4 text-gray-500 italic text-xs">2 investors</td>
              <td className="px-4 py-4">-</td>
              <td className="px-4 py-4">-</td>
              <td className="px-4 py-4">500,000</td>
              <td className="px-4 py-4">-</td>
              <td className="px-4 py-4 font-medium">500,000</td>
              <td className="px-4 py-4 text-blue-600 font-medium">49.0%</td>
              <td className="px-4 py-4">49.0</td>
            </tr>

            {/* SERIES A CHILD ROWS */}
            {isSeriesAOpen && (
              <>
                <tr className="bg-gray-50/20 text-xs">
                  <td className="px-12 py-3 text-gray-600 italic">Sequoia Capital</td>
                  <td className="px-4 py-3 text-gray-400">-</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">300,000</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">300,000</td>
                  <td className="px-4 py-3">29.4%</td>
                  <td className="px-4 py-3">29.4</td>
                </tr>
                <tr className="bg-gray-50/20 text-xs">
                  <td className="px-12 py-3 text-gray-600 italic">Andreessen Horowitz</td>
                  <td className="px-4 py-3 text-gray-400">-</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">200,000</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">200,000</td>
                  <td className="px-4 py-3">19.6%</td>
                  <td className="px-4 py-3">19.6</td>
                </tr>
              </>
            )}

            {/* --- SERIES B ROW --- */}
            <tr className="hover:bg-gray-50/50">
              <td className="px-4 py-4 font-bold text-gray-800">series B</td>
              <td className="px-4 py-4 text-gray-500 italic text-xs">Accel Partners</td>
              <td className="px-4 py-4">-</td>
              <td className="px-4 py-4">-</td>
              <td className="px-4 py-4">-</td>
              <td className="px-4 py-4">400,000</td>
              <td className="px-4 py-4 font-medium">400,000</td>
              <td className="px-4 py-4 text-blue-600 font-medium">39.2%</td>
              <td className="px-4 py-4">39.2</td>
            </tr>

            {/* --- TOTAL ROW --- */}
            <tr className="bg-gray-50/50 text-gray-900 font-bold border-t-2 border-gray-100">
              <td className="px-4 py-4 flex items-center gap-2">
                total
              </td>
              <td className="px-4 py-4">-</td>
              <td className="px-4 py-4">100,000</td>
              <td className="px-4 py-4">20,000</td>
              <td className="px-4 py-4">500,000</td>
              <td className="px-4 py-4">400,000</td>
              <td className="px-4 py-4">1,020,000</td>
              <td className="px-4 py-4 text-blue-700">100.0%</td>
              <td className="px-4 py-4">100.0</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Scroll Bar */}
      {/* <div className="px-1 pt-2">
        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
          <div className="bg-gray-300 h-full w-full rounded-full transition-all"></div>
        </div>
      </div> */}
    </div>
  );
};

export default ScenarioCapTable;