import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronUp } from 'lucide-react';

const data = [
  { name: 'Post Series A', SeriesA: 20, Founders: 15 },
  { name: 'Post Series B', SeriesA: 30, SeriesB: 25, Founders: 25 },
  { name: 'Post Series C', SeriesA: 25, SeriesB: 20, SeriesC: 30, Founders: 25 },
];

const ValuationAnalysis: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm font-sans overflow-hidden">
      {/* Header precisely as seen in image_c1713b.png */}
      {/* <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-[14px] font-medium text-[#1e293b]">Round by Round Nominal vs. Contract Based Value</h2>
        <ChevronUp size={18} className="text-gray-400 cursor-pointer" />
      </div> */}

      <div className="p-6">
        <p className="text-[12px] text-[#475569] mb-8 font-medium">Round-by-Round distribution</p>
        
        <div className="flex flex-row gap-4 items-start">
          {/* Chart Section */}
          <div className="flex-[3] h-[350px] flex flex-col">
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  fontSize={10} 
                  axisLine={{ stroke: '#cbd5e1' }} 
                  tickLine={false} 
                  tickMargin={10}
                  tick={{ fill: '#64748b' }}
                />
                <YAxis 
                  fontSize={10} 
                  axisLine={{ stroke: '#cbd5e1' }} 
                  tickLine={false} 
                  domain={[0, 100]}
                  ticks={[0, 25, 50, 75, 100]}
                  tick={{ fill: '#64748b' }}
                  label={{ 
                    value: 'Nominal Post Money Valuation', 
                    angle: -90, 
                    position: 'center', 
                    offset: 35,
                    fontSize: 10,
                    fill: '#64748b'
                  }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(241, 245, 249, 0.4)' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="SeriesA" stackId="a" fill="#818cf8" barSize={120} />
                <Bar dataKey="SeriesB" stackId="a" fill="#f87171" />
                <Bar dataKey="SeriesC" stackId="a" fill="#22d3ee" />
                <Bar dataKey="Founders" stackId="a" fill="#fbbf24" />
              </BarChart>
            </ResponsiveContainer>
            
            {/* Centered Legend Fixed - Matching image_c1713b.png */}
            <div className="flex justify-center items-center gap-6 mt-6">
              {[
                { label: 'Series A', color: '#818cf8' },
                { label: 'Series B', color: '#f87171' },
                { label: 'Series C', color: '#22d3ee' },
                { label: 'Founder', color: '#fbbf24' }
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] text-[#64748b] font-semibold whitespace-nowrap uppercase tracking-tighter">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Metrics Section precisely as seen in image_c1713b.png */}
          <div className="flex-1 pt-4 space-y-10 border-l border-gray-50 pl-8">
            <div className="text-right">
              <p className="text-[11px] font-bold text-[#94a3b8] mb-1 uppercase tracking-tight">Nominal Post Money Valuation</p>
              <p className="text-[72px] font-medium text-[#0f172a] leading-none tracking-tighter">
                5.000
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-bold text-[#94a3b8] mb-1 uppercase tracking-tight">Contract Based Valuation</p>
              <p className="text-[72px] font-medium text-[#0f172a] leading-none tracking-tighter">
                5.000
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuationAnalysis;