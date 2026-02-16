"use client";

import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export default function RoundByRoundDistribution() {
  const [isDistributionOpen, setIsDistributionOpen] = useState(true);

  const distributionData = [
    { name: 'Post Series A', seriesA: 20, seriesB: 0, seriesC: 0, founders: 15 },
    { name: 'Post Series B', seriesA: 30, seriesB: 25, seriesC: 0, founders: 25 },
    { name: 'Post Series C', seriesA: 25, seriesB: 20, seriesC: 30, founders: 25 },
  ];

  return (
    <div className="bg-white rounded-lg border border-[#EAECF0] shadow-sm overflow-hidden">
      <div 
        className="px-6 py-4 border-b border-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsDistributionOpen(!isDistributionOpen)}
      >
        <h3 className="text-[16px] font-semibold text-[#000000]">Round-by-Round Distribution</h3>
        <div className="text-[#667085]">
          {isDistributionOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {isDistributionOpen && (
        <div className="p-8 flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1 h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData} margin={{ bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAECF0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#98A2B3' }} axisLine={{ stroke: '#EAECF0' }} />
                <YAxis tick={{ fontSize: 11, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#F9FAFB' }} />
                <Legend verticalAlign="bottom" iconType="rect" wrapperStyle={{ paddingTop: '30px', fontSize: '12px' }} />
                <Bar dataKey="seriesA" stackId="a" fill="#8465FF" barSize={80} name="Series A" />
                <Bar dataKey="seriesB" stackId="a" fill="#FF8A8A" name="Series B" />
                <Bar dataKey="seriesC" stackId="a" fill="#26C6DA" name="Series C" />
                <Bar dataKey="founders" stackId="a" fill="#FFB74D" name="Founder" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* ডান পাশের স্ট্যাটস */}
          <div className="w-full lg:w-[300px] flex flex-col justify-center gap-10 lg:border-l lg:border-gray-100 lg:pl-10">
            <div>
              <p className="text-[13px] text-[#98A2B3] font-medium mb-1">Nominal Post Money Valuation</p>
              <p className="text-[44px] font-bold text-[#101828] tracking-tight leading-none">5.000</p>
            </div>
            <div>
              <p className="text-[13px] text-[#98A2B3] font-medium mb-1">Contract Based Valuation</p>
              <p className="text-[44px] font-bold text-[#101828] tracking-tight leading-none">5.000</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}