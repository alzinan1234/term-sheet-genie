"use client";

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// ছবির ডাটা পয়েন্ট অনুযায়ী স্যাম্পল ডাটা
const data = [
  { name: 0, seriesA: 0, seriesB: 0, seriesC: 0, founders: 0 },
  { name: 10, seriesA: 2, seriesB: 3, seriesC: 5, founders: 8 },
  { name: 20, seriesA: 4, seriesB: 6, seriesC: 10, founders: 15 },
  { name: 30, seriesA: 6, seriesB: 9, seriesC: 12, founders: 22 },
  { name: 40, seriesA: 8, seriesB: 11, seriesC: 14, founders: 28 },
  { name: 50, seriesA: 10, seriesB: 13, seriesC: 16, founders: 34 },
  { name: 60, seriesA: 12, seriesB: 15, seriesC: 18, founders: 40 },
  { name: 70, seriesA: 14, seriesB: 17, seriesC: 20, founders: 46 },
  { name: 80, seriesA: 16, seriesB: 19, seriesC: 22, founders: 52 },
  { name: 90, seriesA: 18, seriesB: 21, seriesC: 24, founders: 58 },
  { name: 100, seriesA: 20, seriesB: 23, seriesC: 26, founders: 64 },
  { name: 110, seriesA: 22, seriesB: 25, seriesC: 28, founders: 70 },
  { name: 120, seriesA: 24, seriesB: 27, seriesC: 30, founders: 76 },
  { name: 130, seriesA: 26, seriesB: 29, seriesC: 32, founders: 82 },
  { name: 140, seriesA: 28, seriesB: 31, seriesC: 34, founders: 88 },
  { name: 150, seriesA: 30, seriesB: 33, seriesC: 36, founders: 94 },
  { name: 160, seriesA: 32, seriesB: 35, seriesC: 38, founders: 100 },
  { name: 170, seriesA: 34, seriesB: 37, seriesC: 40, founders: 106 },
  { name: 180, seriesA: 36, seriesB: 39, seriesC: 42, founders: 112 },
  { name: 190, seriesA: 38, seriesB: 41, seriesC: 44, founders: 118 },
  { name: 200, seriesA: 40, seriesB: 43, seriesC: 46, founders: 124 },
];

// ছবির মতো হুবহু কাস্টম টুলটিপ
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-100 shadow-xl rounded-xl">
        <p className="text-[12px] font-bold text-gray-800 mb-2">exit value: ${label}m</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-[11px] font-medium" style={{ color: entry.color }}>
              {entry.name}: ${entry.value}m
            </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const ExitDiagramChart = () => (
  <div className="w-full h-full bg-white p-4">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        
        <XAxis 
          dataKey="name" 
          tick={{fontSize: 10, fill: '#64748b'}} 
          axisLine={false}
          tickLine={false}
          dy={10}
          label={{ 
            value: 'exit company valuation ($m)', 
            position: 'insideBottom', 
            offset: -10, 
            fontSize: 11, 
            fill: '#64748b',
            fontWeight: 500
          }} 
        />
        
        <YAxis 
          tick={{fontSize: 10, fill: '#64748b'}} 
          axisLine={false}
          tickLine={false}
          dx={-5}
          label={{ 
            value: 'value to all shareholders (mm)', 
            angle: -90, 
            position: 'insideLeft', 
            fontSize: 11, 
            fill: '#64748b',
            fontWeight: 500
          }} 
        />

        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }} />
        
        <Legend 
          verticalAlign="bottom" 
          height={36} 
          iconType="plainline"
          formatter={(value) => <span className="text-[11px] font-medium text-gray-500">{value}</span>}
          wrapperStyle={{ paddingTop: '20px' }}
        />

        {/* Lines matching the image colors */}
        <Line 
          name="series a"
          type="monotone" 
          dataKey="seriesA" 
          stroke="#818cf8" 
          strokeWidth={2} 
          dot={{ r: 3, fill: '#818cf8', strokeWidth: 0 }} 
          activeDot={{ r: 5 }} 
        />
        <Line 
          name="series b"
          type="monotone" 
          dataKey="seriesB" 
          stroke="#fb7185" 
          strokeWidth={2} 
          dot={{ r: 3, fill: '#fb7185', strokeWidth: 0 }} 
          activeDot={{ r: 5 }} 
        />
        <Line 
          name="series c"
          type="monotone" 
          dataKey="seriesC" 
          stroke="#2dd4bf" 
          strokeWidth={2} 
          dot={{ r: 3, fill: '#2dd4bf', strokeWidth: 0 }} 
          activeDot={{ r: 5 }} 
        />
        <Line 
          name="founders"
          type="monotone" 
          dataKey="founders" 
          stroke="#fbbf24" 
          strokeWidth={2} 
          dot={{ r: 3, fill: '#fbbf24', strokeWidth: 0 }} 
          activeDot={{ r: 5 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default ExitDiagramChart;