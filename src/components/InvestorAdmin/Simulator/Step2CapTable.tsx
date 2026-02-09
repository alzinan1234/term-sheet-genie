// app/simulator/components/Step2CapTable.tsx
"use client";

import React, { useState } from 'react';

interface Step2Props {
  data: any;
  onContinue: (data: any) => void;
  onStepBack: () => void;
}

const Step2CapTable: React.FC<Step2Props> = ({ data, onContinue, onStepBack }) => {
  const [capTable, setCapTable] = useState(data.capTable || [
    {
      id: 1,
      name: 'Founders',
      investors: 'Activest III, Sequoia\nSpecify Investors',
      commonStock: 100000,
      stockOptions: 10000,
      seriesA: 0,
      seriesB: 0,
      fullyDiluted: 110000,
      nominalOwnership: 10.8,
      pricePerShare: 10.8
    },
    {
      id: 2,
      name: 'Unallocated Options',
      investors: 'Activest III, Sequoia\nSpecify Investors',
      commonStock: 10000,
      stockOptions: 0,
      seriesA: 0,
      seriesB: 0,
      fullyDiluted: 10000,
      nominalOwnership: 1.0,
      pricePerShare: 1.0
    },
    {
      id: 3,
      name: 'Series A',
      investors: 'Activest III, Sequoia\nSpecify Investors',
      commonStock: 500000,
      stockOptions: 0,
      seriesA: 500000,
      seriesB: 0,
      fullyDiluted: 500000,
      nominalOwnership: 49.0,
      pricePerShare: 49.0
    },
    {
      id: 4,
      name: 'Series B',
      investors: 'Activest III, Sequoia\nSpecify Investors',
      commonStock: 400000,
      stockOptions: 0,
      seriesA: 0,
      seriesB: 400000,
      fullyDiluted: 400000,
      nominalOwnership: 39.2,
      pricePerShare: 39.2
    },
    {
      id: 5,
      name: 'Total',
      investors: '-',
      commonStock: 100000,
      stockOptions: 20000,
      seriesA: 500000,
      seriesB: 400000,
      fullyDiluted: 1020000,
      nominalOwnership: 100.0,
      pricePerShare: 100.0
    }
  ]);

  const [selectedAction, setSelectedAction] = useState('');

  const updateCapTable = (id: number, field: string, value: any) => {
    const newCapTable = capTable.map((row: any) => 
      row.id === id ? { ...row, [field]: value } : row
    );

    // Recalculate totals if not updating total row
    if (field !== 'name' && id !== 5) {
      recalculateTotals(newCapTable);
    } else {
      setCapTable(newCapTable);
    }
  };

  const recalculateTotals = (table: any[]) => {
    const totalRow = table.find(row => row.name === 'Total');
    if (!totalRow) return;

    const totals = {
      commonStock: 0,
      stockOptions: 0,
      seriesA: 0,
      seriesB: 0,
      fullyDiluted: 0,
      nominalOwnership: 0,
      pricePerShare: 0
    };

    // Sum all rows except Total
    table.forEach(row => {
      if (row.name !== 'Total') {
        totals.commonStock += Number(row.commonStock) || 0;
        totals.stockOptions += Number(row.stockOptions) || 0;
        totals.seriesA += Number(row.seriesA) || 0;
        totals.seriesB += Number(row.seriesB) || 0;
        totals.fullyDiluted += Number(row.fullyDiluted) || 0;
        totals.nominalOwnership += Number(row.nominalOwnership) || 0;
        totals.pricePerShare += Number(row.pricePerShare) || 0;
      }
    });

    // Update total row
    const updatedTable = table.map(row => {
      if (row.name === 'Total') {
        return {
          ...row,
          commonStock: totals.commonStock,
          stockOptions: totals.stockOptions,
          seriesA: totals.seriesA,
          seriesB: totals.seriesB,
          fullyDiluted: totals.fullyDiluted,
          nominalOwnership: totals.nominalOwnership,
          pricePerShare: totals.pricePerShare
        };
      }
      return row;
    });

    setCapTable(updatedTable);
  };

  const handleActionChange = (action: string) => {
    setSelectedAction(action);
    if (action === 'simulate-future') {
      // Navigate to future round simulation
      console.log('Navigate to future round simulation');
    } else if (action === 'save-as-is') {
      onContinue({ capTable });
    }
  };

  const handleSimulateAndSave = () => {
    if (selectedAction === 'simulate-future') {
      console.log('Simulating future rounds...');
      // Add future round simulation logic here
    } else {
      onContinue({ capTable });
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className=" mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="text-sm text-gray-500 mb-1">Step 2 of 3</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cap Table Summary</h1>
      </div>

      {/* Cap Table Section */}
      <div className="bg-white rounded-xl border border-gray-300 shadow-sm mb-8">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 text-sm font-medium text-gray-700 border border-gray-300">Name</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700 border border-gray-300">Investors</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700 border border-gray-300">Common Stock</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700 border border-gray-300">Stock Options</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700 border border-gray-300">Series A Preferred</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700 border border-gray-300">Series B Preferred</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700 border border-gray-300">Fully Diluted Share</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700 border border-gray-300">Nominal Ownership</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700 border border-gray-300">Price/Share</th>
                </tr>
              </thead>
              <tbody>
                {capTable.map((row: any) => (
                  <tr key={row.id} className={`hover:bg-gray-50 ${row.name === 'Total' ? 'bg-gray-50 font-semibold' : ''}`}>
                    <td className="p-4 border border-gray-300">
                      {row.name === 'Total' ? (
                        row.name
                      ) : (
                        <input
                          type="text"
                          value={row.name}
                          onChange={(e) => updateCapTable(row.id, 'name', e.target.value)}
                          className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      )}
                    </td>
                    <td className="p-4 border border-gray-300">
                      {row.name === 'Total' ? (
                        row.investors
                      ) : (
                        <textarea
                          value={row.investors}
                          onChange={(e) => updateCapTable(row.id, 'investors', e.target.value)}
                          className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          rows={2}
                        />
                      )}
                    </td>
                    <td className="p-4 border border-gray-300">
                      <input
                        type="text"
                        value={formatNumber(row.commonStock)}
                        onChange={(e) => {
                          const num = parseInt(e.target.value.replace(/,/g, '')) || 0;
                          updateCapTable(row.id, 'commonStock', num);
                        }}
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-right"
                        disabled={row.name === 'Total'}
                      />
                    </td>
                    <td className="p-4 border border-gray-300">
                      <input
                        type="text"
                        value={formatNumber(row.stockOptions)}
                        onChange={(e) => {
                          const num = parseInt(e.target.value.replace(/,/g, '')) || 0;
                          updateCapTable(row.id, 'stockOptions', num);
                        }}
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-right"
                        disabled={row.name === 'Total'}
                      />
                    </td>
                    <td className="p-4 border border-gray-300">
                      <input
                        type="text"
                        value={formatNumber(row.seriesA)}
                        onChange={(e) => {
                          const num = parseInt(e.target.value.replace(/,/g, '')) || 0;
                          updateCapTable(row.id, 'seriesA', num);
                        }}
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-right"
                        disabled={row.name === 'Total'}
                      />
                    </td>
                    <td className="p-4 border border-gray-300">
                      <input
                        type="text"
                        value={formatNumber(row.seriesB)}
                        onChange={(e) => {
                          const num = parseInt(e.target.value.replace(/,/g, '')) || 0;
                          updateCapTable(row.id, 'seriesB', num);
                        }}
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-right"
                        disabled={row.name === 'Total'}
                      />
                    </td>
                    <td className="p-4 border border-gray-300">
                      <input
                        type="text"
                        value={formatNumber(row.fullyDiluted)}
                        onChange={(e) => {
                          const num = parseInt(e.target.value.replace(/,/g, '')) || 0;
                          updateCapTable(row.id, 'fullyDiluted', num);
                        }}
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-right"
                        disabled={row.name === 'Total'}
                      />
                    </td>
                    <td className="p-4 border border-gray-300">
                      <div className="relative">
                        <input
                          type="text"
                          value={row.nominalOwnership}
                          onChange={(e) => {
                            const num = parseFloat(e.target.value) || 0;
                            updateCapTable(row.id, 'nominalOwnership', num);
                          }}
                          className="w-full rounded border border-gray-300 px-3 py-2 pr-7 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-right"
                          disabled={row.name === 'Total'}
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </td>
                    <td className="p-4 border border-gray-300">
                      <input
                        type="text"
                        value={row.pricePerShare}
                        onChange={(e) => {
                          const num = parseFloat(e.target.value) || 0;
                          updateCapTable(row.id, 'pricePerShare', num);
                        }}
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-right"
                        disabled={row.name === 'Total'}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Row Button */}
          <div className="mt-4">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span> Add Row</span>
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-8 border-t border-gray-300">
        <button 
          onClick={onStepBack}
          className="rounded-full border border-gray-300 bg-white px-8 py-3 font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onStepBack}
            className="rounded-full border border-gray-300 bg-white px-8 py-3 font-medium text-gray-700 hover:bg-gray-50"
          >
            Step back
          </button>
          
          <div className="relative inline-block">
            <button className="rounded-full border border-blue-600 bg-white px-8 py-3 font-medium text-blue-600 hover:bg-blue-50">
              Simulate Future Round(s)
            </button>
          </div>
          
          {/* <div className="relative inline-block">
            <select 
              value={selectedAction}
              onChange={(e) => handleActionChange(e.target.value)}
              className="rounded-full border border-gray-300 bg-white px-8 py-3 font-medium text-gray-700 appearance-none cursor-pointer hover:bg-gray-50 pr-10"
            >
              <option value="">Select Action...</option>
              <option value="simulate-future">Simulate Future Round(s)</option>
              <option value="save-as-is">Simulate and Save As-is</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div> */}
          
          <button 
            onClick={() => handleActionChange('save-as-is')}
            className="rounded-full bg-[#2d63ff] px-8 py-3 font-medium text-white hover:bg-blue-700"
          >
            Simulate and Save As-is
          </button>
        </div>
      </div>

      {/* Alternative Layout with Both Buttons Side by Side */}
      {/* <div className="mt-8 flex justify-end gap-4">
        <button className="rounded-full border border-blue-600 bg-white px-8 py-3 font-medium text-blue-600 hover:bg-blue-50">
          Simulate Future Round(s)
        </button>
        <button 
          onClick={() => onContinue({ capTable })}
          className="rounded-full bg-[#2d63ff] px-8 py-3 font-medium text-white hover:bg-blue-700"
        >
          Simulate and Save As-is
        </button>
      </div> */}
    </div>
  );
};

export default Step2CapTable;