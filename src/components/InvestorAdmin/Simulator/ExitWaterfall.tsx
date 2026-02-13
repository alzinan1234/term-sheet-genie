import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChevronUp } from 'lucide-react';

// Data points precisely matching the trajectories in the provided image
const waterfallData = [
  { val: 0, seriesA: 0, seriesB: 0, seriesC: 0, founders: 0 },
  { val: 10, seriesA: 2, seriesB: 5, seriesC: 10, founders: 6 },
  { val: 20, seriesA: 4, seriesB: 8, seriesC: 15, founders: 12 },
  { val: 30, seriesA: 6, seriesB: 10, seriesC: 15, founders: 18 },
  { val: 40, seriesA: 8, seriesB: 12, seriesC: 16, founders: 22 },
  { val: 50, seriesA: 10, seriesB: 13, seriesC: 17, founders: 28 },
  { val: 60, seriesA: 12, seriesB: 15, seriesC: 18, founders: 33 },
  { val: 70, seriesA: 14, seriesB: 16, seriesC: 19, founders: 39 },
  { val: 80, seriesA: 16, seriesB: 17, seriesC: 20, founders: 44 },
  { val: 90, seriesA: 18, seriesB: 19, seriesC: 21, founders: 50 },
  { val: 100, seriesA: 20, seriesB: 20, seriesC: 22, founders: 55 },
  { val: 110, seriesA: 23, seriesB: 22, seriesC: 23, founders: 60 },
  { val: 120, seriesA: 25, seriesB: 24, seriesC: 24, founders: 66 },
  { val: 130, seriesA: 26, seriesB: 25, seriesC: 25, founders: 72 },
  { val: 140, seriesA: 28, seriesB: 27, seriesC: 26, founders: 77 },
  { val: 150, seriesA: 30, seriesB: 28, seriesC: 27, founders: 82 },
  { val: 160, seriesA: 32, seriesB: 30, seriesC: 29, founders: 88 },
  { val: 170, seriesA: 34, seriesB: 31, seriesC: 30, founders: 93 },
  { val: 180, seriesA: 37, seriesB: 33, seriesC: 31, founders: 99 },
  { val: 190, seriesA: 38, seriesB: 35, seriesC: 32, founders: 104 },
  { val: 200, seriesA: 40, seriesB: 36, seriesC: 33, founders: 110 },
];

const ExitWaterfall: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm font-sans overflow-hidden">
      {/* Header Bar */}
   

      <div className="p-8 h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={waterfallData} margin={{ top: 10, right: 30, left: 20, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            
            <XAxis 
              dataKey="val" 
              fontSize={10} 
              tick={{ fill: '#64748b' }}
              axisLine={{ stroke: '#94a3b8' }}
              tickLine={false}
              label={{ 
                value: 'Exit Company Valuation ($M)', 
                position: 'bottom', 
                offset: 20, 
                fontSize: 12, 
                fontWeight: 600, 
                fill: '#1e293b' 
              }} 
            />
            
            <YAxis 
              fontSize={11} 
              tick={{ fill: '#64748b' }}
              axisLine={{ stroke: '#94a3b8' }}
              tickLine={false}
              domain={[0, 120]}
              ticks={[0, 30, 60, 90, 120]}
              label={{ 
                value: 'Value to All Shareholders (MM)', 
                angle: -90, 
                position: 'center', 
                offset: -10,
                fontSize: 12, 
                fontWeight: 600, 
                fill: '#1e293b' 
              }} 
            />

            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #e2e8f0', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                fontSize: '12px'
              }} 
            />

            <Legend 
              verticalAlign="bottom" 
              align="center" 
              iconType="circle" 
              iconSize={8}
              wrapperStyle={{ paddingTop: '40px', fontSize: '11px', color: '#64748b' }} 
            />

            <Line 
              type="monotone" 
              dataKey="seriesA" 
              name="Series A" 
              stroke="#818cf8" 
              strokeWidth={2} 
              dot={{ r: 3, fill: '#818cf8' }} 
              activeDot={{ r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="seriesB" 
              name="Series B" 
              stroke="#f87171" 
              strokeWidth={2} 
              dot={{ r: 3, fill: '#f87171' }} 
              activeDot={{ r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="seriesC" 
              name="Series C" 
              stroke="#22d3ee" 
              strokeWidth={2} 
              dot={{ r: 3, fill: '#22d3ee' }} 
              activeDot={{ r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="founders" 
              name="Founders" 
              stroke="#fbbf24" 
              strokeWidth={2} 
              dot={{ r: 3, fill: '#fbbf24' }} 
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>  
  );
};

export default ExitWaterfall;