"use client";

import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export default function ExitWaterfallDiagram() {
  const [isWaterfallOpen, setIsWaterfallOpen] = useState(true);

  // চার্টের জন্য ডেটা
  const exitData = Array.from({ length: 21 }, (_, i) => {
    const v = i * 10;
    return {
      valuation: v,
      seriesA: v * 0.25,
      seriesB: v * 0.20,
      seriesC: v > 20 ? (v - 20) * 0.30 : 0,
      founders: v * 0.45,
    };
  });

  return (
    <div className="rounded-lg border border-[#EAECF0] shadow-sm overflow-hidden">
      <div 
        className="px-6 py-4 border-b border-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsWaterfallOpen(!isWaterfallOpen)}
      >
        <h3 className="text-[16px] font-semibold text-[#000000]">Exit Waterfall Diagram</h3>
        <div className="text-[#667085]">
          {isWaterfallOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
      
      {isWaterfallOpen && (
        <div className="p-6">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={exitData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAECF0" />
                <XAxis 
                  dataKey="valuation" 
                  tick={{ fontSize: 11, fill: '#98A2B3' }} 
                  axisLine={{ stroke: '#EAECF0' }}
                  label={{ value: 'Exit Company Valuation ($M)', position: 'bottom', offset: 0, fontSize: 12, fill: '#667085' }}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: '#98A2B3' }} 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #EAECF0', fontSize: '12px' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  iconType="rect"
                  wrapperStyle={{ paddingTop: '40px', fontSize: '12px' }} 
                />
                <Line type="monotone" dataKey="seriesA" stroke="#8465FF" strokeWidth={2} dot={{ r: 3, fill: '#8465FF' }} name="Series A" />
                <Line type="monotone" dataKey="seriesB" stroke="#FF8A8A" strokeWidth={2} dot={{ r: 3, fill: '#FF8A8A' }} name="Series B" />
                <Line type="monotone" dataKey="seriesC" stroke="#26C6DA" strokeWidth={2} dot={{ r: 3, fill: '#26C6DA' }} name="Series C" />
                <Line type="monotone" dataKey="founders" stroke="#FFB74D" strokeWidth={2} dot={{ r: 3, fill: '#FFB74D' }} name="Founders" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}