"use client";

import React, { useState, useEffect } from 'react';

interface Step3Props {
  data: any;
  onContinue: (data: any) => void;
  onStepBack: () => void;
}

const Step3SenioritySelection: React.FC<Step3Props> = ({ data, onContinue, onStepBack }) => {
  const [debtSeniority, setDebtSeniority] = useState<string[]>([]);
  const [equitySeniority, setEquitySeniority] = useState<string[][]>([]);

  useEffect(() => {
    const initialDebt = Array.isArray(data?.debt) ? data.debt : ['Senior Debt', 'Junior Debt', 'Junior Subordinated Debt'];
    const initialEquity = Array.isArray(data?.equity) && Array.isArray(data?.equity[0]) 
      ? data.equity 
      : [['Series D'], ['Series B', 'Series C'], ['Series A']];
    
    setDebtSeniority(initialDebt);
    setEquitySeniority(initialEquity);
  }, [data]);

  // --- Drag and Drop Logic ---
  const handleDragStart = (e: React.DragEvent, type: 'debt' | 'equity', rowIndex: number, itemIndex?: number) => {
    e.dataTransfer.setData('type', type);
    e.dataTransfer.setData('sourceRowIndex', rowIndex.toString());
    if (itemIndex !== undefined) {
      e.dataTransfer.setData('sourceItemIndex', itemIndex.toString());
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetType: 'debt' | 'equity', targetRowIndex: number) => {
    e.preventDefault();
    const sourceType = e.dataTransfer.getData('type');
    const sourceRowIndex = parseInt(e.dataTransfer.getData('sourceRowIndex'));
    const sourceItemIndexStr = e.dataTransfer.getData('sourceItemIndex');

    if (sourceType !== targetType) return;

    if (targetType === 'debt') {
      const newList = [...debtSeniority];
      const [movedItem] = newList.splice(sourceRowIndex, 1);
      newList.splice(targetRowIndex, 0, movedItem);
      setDebtSeniority(newList);
    } else {
      const sourceItemIndex = parseInt(sourceItemIndexStr);
      const newEquity = [...equitySeniority.map(row => [...row])];
      
      // Remove item from source
      const [movedItem] = newEquity[sourceRowIndex].splice(sourceItemIndex, 1);
      
      // Add item to target row (pari passu)
      newEquity[targetRowIndex].push(movedItem);

      // Clean up empty rows (optional, but keeps UI clean)
      const filteredEquity = newEquity.filter(row => row.length > 0);
      setEquitySeniority(filteredEquity);
    }
  };

  const addNewLevel = (type: 'debt' | 'equity') => {
    const name = prompt(`Enter name for new ${type} level:`);
    if (!name) return;

    if (type === 'debt') {
      setDebtSeniority([...debtSeniority, name]);
    } else {
      setEquitySeniority([...equitySeniority, [name]]);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] p-8 font-sans text-[#1e293b]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold mb-1 text-slate-800">Seniority Selection</h1>
        <p className="text-[11px] text-slate-400">
          Seniority represents the order in which debt is paid off or preferential returns are distributed. Share classes at the same level are considered pari passu.
        </p>
      </div>

      <div className="space-y-6">
        {/* --- Debt Seniority Section --- */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
          <div className="px-6 py-3 border-b border-slate-50">
            <h2 className="text-[#1e293b] font-semibold text-sm">Debt Seniority</h2>
          </div>
          
          <div className="p-6">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-4 font-bold">Receives First</div>
            
            <div className="space-y-3">
              {debtSeniority.map((level, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'debt', index)}
                >
                  <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-500 border border-slate-100 shrink-0">
                    {index + 1}
                  </div>
                  <div 
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'debt', index)}
                    className="flex-1 bg-[#fcfdfe] border border-slate-100 rounded-lg p-2.5 flex items-center gap-3 cursor-grab active:cursor-grabbing hover:border-blue-200 transition-colors"
                  >
                    <div className="flex flex-col gap-0.5 opacity-20">
                      <div className="flex gap-0.5"><div className="w-0.5 h-0.5 bg-slate-900 rounded-full"></div><div className="w-0.5 h-0.5 bg-slate-900 rounded-full"></div></div>
                      <div className="flex gap-0.5"><div className="w-0.5 h-0.5 bg-slate-900 rounded-full"></div><div className="w-0.5 h-0.5 bg-slate-900 rounded-full"></div></div>
                      <div className="flex gap-0.5"><div className="w-0.5 h-0.5 bg-slate-900 rounded-full"></div><div className="w-0.5 h-0.5 bg-slate-900 rounded-full"></div></div>
                    </div>
                    <span className="bg-white border border-slate-200 px-3 py-1.5 rounded-md text-[12px] font-medium shadow-sm text-slate-600">
                      {level}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div 
              onClick={() => addNewLevel('debt')}
              className="mt-3 ml-11 border-2 border-dashed border-slate-100 rounded-lg py-3 text-center bg-slate-50/30 cursor-pointer hover:bg-slate-100 transition-all"
            >
              <span className="text-[10px] text-slate-400 font-medium">Click or Drop here to create new level</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-4 font-bold">Receives Last</div>
          </div>
        </div>

        {/* --- Equity Seniority Section --- */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
          <div className="px-6 py-3 border-b border-slate-50">
            <h2 className="text-[#1e293b] font-semibold text-sm">Equity Seniority</h2>
          </div>
          
          <div className="p-6">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-4 font-bold">Receives First</div>
            
            <div className="space-y-3">
              {equitySeniority.map((row, rowIndex) => (
                <div 
                  key={rowIndex} 
                  className="flex items-center gap-4"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'equity', rowIndex)}
                >
                  <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-500 border border-slate-100 shrink-0">
                    {rowIndex + 1}
                  </div>
                  <div className="flex-1 bg-[#fcfdfe] border border-slate-100 rounded-lg p-2.5 flex items-center gap-3 transition-colors min-h-[54px]">
                    <div className="flex flex-col gap-0.5 opacity-20">
                      <div className="flex gap-0.5"><div className="w-0.5 h-0.5 bg-slate-900 rounded-full"></div><div className="w-0.5 h-0.5 bg-slate-900 rounded-full"></div></div>
                      <div className="flex gap-0.5"><div className="w-0.5 h-0.5 bg-slate-900 rounded-full"></div><div className="w-0.5 h-0.5 bg-slate-900 rounded-full"></div></div>
                      <div className="flex gap-0.5"><div className="w-0.5 h-0.5 bg-slate-900 rounded-full"></div><div className="w-0.5 h-0.5 bg-slate-900 rounded-full"></div></div>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      {row.map((item, itemIdx) => (
                        <span 
                          key={itemIdx} 
                          draggable
                          onDragStart={(e) => handleDragStart(e, 'equity', rowIndex, itemIdx)}
                          className="bg-white border border-slate-200 px-3 py-1.5 rounded-md text-[12px] font-medium shadow-sm text-slate-600 cursor-grab active:cursor-grabbing hover:border-blue-400 transition-all"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div 
              onClick={() => addNewLevel('equity')}
              className="mt-3 ml-11 border-2 border-dashed border-slate-100 rounded-lg py-3 text-center bg-slate-50/30 cursor-pointer hover:bg-slate-100 transition-all"
            >
              <span className="text-[10px] text-slate-400 font-medium">Click to create new level</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-4 font-bold">Receives Last</div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between items-center mt-10 pb-8">
        <div className="flex gap-3">
          <button onClick={onStepBack} className="px-6 py-2.5 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-50 transition-all text-[12px] font-semibold bg-white shadow-sm">
            Cancel
          </button>
          <button onClick={onStepBack} className="px-6 py-2.5 border border-slate-200 text-slate-500 rounded-full hover:bg-slate-50 transition-all text-[12px] font-semibold bg-white shadow-sm">
            Step back
          </button>
        </div>
        
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-[#eff6ff] text-[#3b66ff] rounded-full hover:bg-blue-100 transition-all text-[12px] font-bold">
            Add Future Round(s)
          </button>
          <button 
            onClick={() => onContinue({ debt: debtSeniority, equity: equitySeniority })}
            className="px-6 py-2.5 bg-[#3b66ff] text-white rounded-full hover:bg-blue-700 transition-all text-[12px] font-bold flex items-center gap-2 shadow-md shadow-blue-200"
          >
            Simulate and Save As-is <span className="w-4 h-4 bg-white text-[#3b66ff] rounded flex items-center justify-center text-[10px]">✓</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3SenioritySelection;