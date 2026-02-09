// app/simulator/components/Step3SenioritySelection.tsx
"use client";

import React, { useState } from 'react';

interface Step3Props {
  data: any;
  onContinue: (data: any) => void;
  onStepBack: () => void;
}

const Step3SenioritySelection: React.FC<Step3Props> = ({ data, onContinue, onStepBack }) => {
  const [debtSeniority, setDebtSeniority] = useState(data.debt);
  const [equitySeniority, setEquitySeniority] = useState(data.equity);

  const handleDragStart = (e: React.DragEvent, type: string, index: number) => {
    e.dataTransfer.setData('type', type);
    e.dataTransfer.setData('index', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, type: string, targetIndex: number) => {
    e.preventDefault();
    const sourceType = e.dataTransfer.getData('type');
    const sourceIndex = parseInt(e.dataTransfer.getData('index'));
    
    if (sourceType === 'debt' && type === 'debt') {
      const newDebtSeniority = [...debtSeniority];
      const [removed] = newDebtSeniority.splice(sourceIndex, 1);
      newDebtSeniority.splice(targetIndex, 0, removed);
      setDebtSeniority(newDebtSeniority);
    } else if (sourceType === 'equity' && type === 'equity') {
      const newEquitySeniority = [...equitySeniority];
      const [removed] = newEquitySeniority.splice(sourceIndex, 1);
      newEquitySeniority.splice(targetIndex, 0, removed);
      setEquitySeniority(newEquitySeniority);
    }
  };

  const handleAddNewLevel = (type: string) => {
    if (type === 'debt') {
      const newLevel = prompt('Enter new debt seniority level:');
      if (newLevel) {
        setDebtSeniority([...debtSeniority, newLevel]);
      }
    } else {
      const newLevel = prompt('Enter new equity seniority level:');
      if (newLevel) {
        setEquitySeniority([...equitySeniority, newLevel]);
      }
    }
  };

  return (
    <div className=" mx-auto">
      <div className="mb-8">
        <div className="text-sm text-gray-500 mb-2">Step 3 of 3</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Seniority Selection</h1>
        <p className="text-gray-600">
          Seniority represents the order in which debt is paid off or preferential returns are distributed. 
          Share classes at the same level are considered part passu.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Debt Seniority</h2>
          <div className="mb-2 text-sm text-gray-600">Receives First</div>
          
          <div className="space-y-2 mb-4">
            {debtSeniority.map((level: string, index: number) => (
              <div
                key={level}
                draggable
                onDragStart={(e) => handleDragStart(e, 'debt', index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'debt', index)}
                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 cursor-move hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded">
                    {index + 1}
                  </div>
                  <span className="font-medium">{level}</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">⋮</button>
              </div>
            ))}
          </div>

          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'debt', debtSeniority.length)}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mb-2 cursor-pointer hover:border-blue-400 hover:bg-blue-50"
            onClick={() => handleAddNewLevel('debt')}
          >
            <div className="text-gray-500">Drop here to create new level</div>
          </div>

          <div className="text-sm text-gray-600 mt-4">Receives Last</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Equity Seniority</h2>
          <div className="mb-2 text-sm text-gray-600">Receives First</div>
          
          <div className="space-y-2 mb-4">
            {equitySeniority.map((level: string, index: number) => (
              <div
                key={level}
                draggable
                onDragStart={(e) => handleDragStart(e, 'equity', index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'equity', index)}
                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 cursor-move hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded">
                    {index + 1}
                  </div>
                  <span className="font-medium">{level}</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">⋮</button>
              </div>
            ))}
          </div>

          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'equity', equitySeniority.length)}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mb-2 cursor-pointer hover:border-blue-400 hover:bg-blue-50"
            onClick={() => handleAddNewLevel('equity')}
          >
            <div className="text-gray-500">Drop here to create new level</div>
          </div>

          <div className="text-sm text-gray-600 mt-4">Receives Last</div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8 pt-6 ">
        <button 
          onClick={onStepBack}
          className="rounded-full border border-gray-300 bg-white px-8 py-3 font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <div className="flex gap-4">
          <button 
            onClick={onStepBack}
            className="rounded-full border border-gray-300 bg-white px-8 py-3 font-medium text-gray-700 hover:bg-gray-50"
          >
            Step back
          </button>
          <div className="flex gap-4">
            <button className="rounded-full border border-blue-600 bg-white px-8 py-3 font-medium text-blue-600 hover:bg-blue-50">
              Add Future Round(s)
            </button>
            <button 
              onClick={() => onContinue({ debt: debtSeniority, equity: equitySeniority })}
              className="rounded-full bg-[#2d63ff] px-8 py-3 font-medium text-white hover:bg-blue-700"
            >
              Simulate and Save As-is
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3SenioritySelection;