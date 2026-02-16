"use client";

import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { FilterDropdown } from '../../Simulator/SimulationComparison/ComparisonFilters';


export default function ExitWaterfallDiagram() {
  const [isWaterfallOpen, setIsWaterfallOpen] = useState(true);
  
  // Shareholder selection state - all selected by default
  const [selectedShareholders, setSelectedShareholders] = useState([
    'seriesA', 'seriesB', 'seriesC', 'founders', 'employeePool'
  ]);

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

  // Define line configurations
  const lineConfigs = [
    { 
      id: 'seriesA', 
      dataKey: 'seriesA', 
      name: 'Series A', 
      stroke: '#8465FF' 
    },
    { 
      id: 'seriesB', 
      dataKey: 'seriesB', 
      name: 'Series B', 
      stroke: '#FF8A8A' 
    },
    { 
      id: 'seriesC', 
      dataKey: 'seriesC', 
      name: 'Series C', 
      stroke: '#26C6DA' 
    },
    { 
      id: 'founders', 
      dataKey: 'founders', 
      name: 'Founders', 
      stroke: '#FFB74D' 
    },
  ];

  // Filter lines based on selected shareholders
  const visibleLines = lineConfigs.filter(line => selectedShareholders.includes(line.id));

  return (
    <div className="space-y-4">
      {/* Shareholder Filter */}
      <div className="flex flex-wrap gap-4 items-center">
        <span className="text-xs font-bold text-gray-400 tracking-wider">Filters</span>
        <FilterDropdown 
          selectedShareholders={selectedShareholders} 
          setSelectedShareholders={setSelectedShareholders} 
        />
      </div>

      {/* Exit Waterfall Diagram */}
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
                  
                  {/* Render only visible lines */}
                  {visibleLines.map((line) => (
                    <Line 
                      key={line.id}
                      type="monotone" 
                      dataKey={line.dataKey} 
                      stroke={line.stroke} 
                      strokeWidth={2} 
                      dot={{ r: 3, fill: line.stroke }} 
                      name={line.name} 
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}