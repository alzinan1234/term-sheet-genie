"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Router import kora hoyeche

interface Step2Props {
  data: any;
  onContinue: (data: any) => void;
  onStepBack: () => void;
}

const Step2CapTable: React.FC<Step2Props> = ({ data, onContinue, onStepBack }) => {
  const router = useRouter(); // Router initialize kora hoyeche
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
      commonStock: 0,
      stockOptions: 10000,
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
      commonStock: 0,
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
      commonStock: 0,
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
      console.log('Navigate to future round simulation');
    } else if (action === 'save-as-is') {
      onContinue({ capTable });
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Cap Table Summary</h1>
      </div>

      {/* Cap Table Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-600">Name</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-600">Investors</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-600">Common Stock</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-600">Stock Options</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-600">Series A Preferred</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-600">Series B Preferred</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-600">Fully Diluted Share</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-600">Nominal Ownership</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-600">Price/Share</th>
              </tr>
            </thead>
            <tbody>
              {capTable.map((row: any, index: number) => (
                <tr 
                  key={row.id} 
                  className={`border-b border-gray-100 ${row.name === 'Total' ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900">{row.name}</div>
                  </td>
                  <td className="px-4 py-4">
                    {row.name === 'Total' ? (
                      <div className="text-sm text-gray-900">{row.investors}</div>
                    ) : (
                      <div className="text-sm text-gray-900">
                        Activest III, Sequoia
                        <br />
                        <span 
                          onClick={() => router.push(`/investor-admin/simulator/${row.name.toLowerCase().replace(/\s+/g, '-')}`)}
                          className="text-blue-600 cursor-pointer hover:underline"
                        >
                          Specify Investors
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{row.commonStock ? formatNumber(row.commonStock) : ''}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{row.stockOptions ? formatNumber(row.stockOptions) : ''}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{row.seriesA ? formatNumber(row.seriesA) : ''}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{row.seriesB ? formatNumber(row.seriesB) : ''}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{formatNumber(row.fullyDiluted)}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{row.nominalOwnership}%</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{row.pricePerShare}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6">
        <div className="flex gap-3">
          <button 
            onClick={onStepBack}
            className="px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onStepBack}
            className="px-6 py-3 text-sm font-semibold text-[#2d60ff] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Step back
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className="px-6 py-3 text-sm font-semibold text-[#2d60ff] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Simulate Future Round(s)
          </button>
          
          <button 
            onClick={() => handleActionChange('save-as-is')}
            className="px-6 py-3 text-sm font-semibold text-white bg-[#2d60ff] rounded-lg hover:bg-[#254edd] transition-colors flex items-center gap-2"
          >
            Simulate and Save As-is
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2CapTable;