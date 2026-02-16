// app/simulator/components/Step1PriorInvestment.tsx
"use client";

import React, { useState } from 'react';
import { Plus, Trash2, Edit2, ChevronDown, ChevronUp, Save } from 'lucide-react';

interface PricedRound {
  id: number;
  roundName: string;
  investmentDate: string;
  investmentAmount: number;
  liquidationPreference: number;
  ownership: number;
  participation: string;
  converting: boolean;
  qpoThreshold: boolean;
  qpoThresholdValue: number;
  cap: boolean;
  capValue: number;
  dividends: string;
  dividendsSelect: string;
  dividendRate: number;
  antidilution: string;
  comments: string;
  allocatedOptionsPrior: number;
  unallocatedOptionsPrior: number;
  requestedOptionPool: number;
  myInvestment: number;
}

interface EquityRound {
  id: number;
  roundName: string;
  investmentDate: string;
  investmentAmount: number;
  commonShares: number;
  preferredShares: number;
  liquidationPreferences: string;
  participationType: string;
  dividendTiming: string;
  dividendRate: number;
  antiDilutionProvisions: string;
  qpoSharePriceMultiple?: number;
  qpoMinimumProceeds?: number;
  forcedConversionSharePriceMultipleCap?: number;
}

interface SafeNote {
  id: number;
  roundName: string;
  type: string;
  investmentDate: string;
  investmentAmount: number;
  pmvCap: number;
  discount: number;
  interestRate: number;
  mfn: boolean;
  proRata: boolean;
}

interface DebtRound {
  id: number;
  roundName: string;
  paymentNature: string;
  issuanceDate: string;
  principalAmount: number;
  interestType: string;
  interestFrequency: string;
  interestRate: number;
  expirationDate: string;
}

interface Step1Props {
  data: any;
  onContinue: (data: any) => void;
  onStepBack: () => void;
}

const Step1PriorInvestment: React.FC<Step1Props> = ({ data, onContinue, onStepBack }) => {
  const [formData, setFormData] = useState({
    ...data,
    foundersShares: data.foundersShares || 100000,
    allocatedOptions: data.allocatedOptions || 20000,
    unallocatedOptions: data.unallocatedOptions || 20000,
    safeNotes: data.safeNotes || [],
    debtRounds: data.debtRounds || [],
    equityRounds: data.equityRounds || [],
    pricedRounds: data.pricedRounds || [{
      id: Date.now(),
      roundName: 'Round A',
      investmentDate: '2025-07-08',
      investmentAmount: 1000000,
      liquidationPreference: 1.2,
      ownership: 500000,
      participation: 'Participating',
      converting: false,
      qpoThreshold: false,
      qpoThresholdValue: 0,
      cap: false,
      capValue: 0,
      dividends: 'Simple',
      dividendsSelect: 'Select',
      dividendRate: 4,
      antidilution: 'None',
      comments: 'A 162 Lead Investor',
      allocatedOptionsPrior: 5000,
      unallocatedOptionsPrior: 7500,
      requestedOptionPool: 10,
      myInvestment: 500000
    }],
  });
  
  const [activeTab, setActiveTab] = useState<'latest' | 'roundbyround'>('latest');
  const [expandedRounds, setExpandedRounds] = useState<number[]>([0]);
  const [editingEquityId, setEditingEquityId] = useState<number | null>(null);
  const [editingSafeNoteId, setEditingSafeNoteId] = useState<number | null>(null);
  const [editingDebtId, setEditingDebtId] = useState<number | null>(null);

  const handleAddEquity = () => {
    const newEquity: EquityRound = {
      id: Date.now(),
      roundName: `Round ${String.fromCharCode(65 + formData.equityRounds.length)}`,
      investmentDate: '',
      investmentAmount: 0,
      commonShares: 0,
      preferredShares: 0,
      liquidationPreferences: '',
      participationType: 'Non-participating',
      dividendTiming: 'Non-cumulative',
      dividendRate: 0,
      antiDilutionProvisions: 'None',
      qpoSharePriceMultiple: 0,
      qpoMinimumProceeds: 0,
      forcedConversionSharePriceMultipleCap: 0
    };
    setFormData({ ...formData, equityRounds: [...formData.equityRounds, newEquity] });
    setEditingEquityId(newEquity.id);
  };

  const handleAddSafeNote = () => {
    const newSafeNote: SafeNote = {
      id: Date.now(),
      roundName: `Safe ${String.fromCharCode(65 + formData.safeNotes.length)}`,
      type: 'Pre-Money',
      investmentDate: '',
      investmentAmount: 0,
      pmvCap: 0,
      discount: 0,
      interestRate: 0,
      mfn: false,
      proRata: false
    };
    setFormData({ ...formData, safeNotes: [...formData.safeNotes, newSafeNote] });
    setEditingSafeNoteId(newSafeNote.id);
  };

  const handleAddDebt = () => {
    const newDebt: DebtRound = {
      id: Date.now(),
      roundName: `Debt Round ${formData.debtRounds.length + 1}`,
      paymentNature: 'Lump Sum',
      issuanceDate: '',
      principalAmount: 0,
      interestType: 'Fixed',
      interestFrequency: 'Annual',
      interestRate: 0,
      expirationDate: ''
    };
    setFormData({ ...formData, debtRounds: [...formData.debtRounds, newDebt] });
    setEditingDebtId(newDebt.id);
  };

  const handleAddPricedRound = () => {
    const newRound: PricedRound = {
      id: Date.now(),
      roundName: `Round ${String.fromCharCode(65 + formData.pricedRounds.length)}`,
      investmentDate: '',
      investmentAmount: 0,
      liquidationPreference: 1.0,
      ownership: 0,
      participation: 'Participating',
      converting: false,
      qpoThreshold: false,
      qpoThresholdValue: 0,
      cap: false,
      capValue: 0,
      dividends: 'Simple',
      dividendsSelect: 'Select',
      dividendRate: 0,
      antidilution: 'None',
      comments: '',
      allocatedOptionsPrior: 0,
      unallocatedOptionsPrior: 0,
      requestedOptionPool: 0,
      myInvestment: 0
    };
    setFormData({ ...formData, pricedRounds: [...formData.pricedRounds, newRound] });
    setExpandedRounds([...expandedRounds, formData.pricedRounds.length]);
  };

  const handleRemoveEquity = (id: number) => {
    setFormData({
      ...formData,
      equityRounds: formData.equityRounds.filter((equity: EquityRound) => equity.id !== id)
    });
  };

  const handleRemoveSafeNote = (id: number) => {
    setFormData({
      ...formData,
      safeNotes: formData.safeNotes.filter((note: SafeNote) => note.id !== id)
    });
  };

  const handleRemoveDebt = (id: number) => {
    setFormData({
      ...formData,
      debtRounds: formData.debtRounds.filter((debt: DebtRound) => debt.id !== id)
    });
  };

  const handleRemovePricedRound = (id: number) => {
    const index = formData.pricedRounds.findIndex((round: PricedRound) => round.id === id);
    setFormData({
      ...formData,
      pricedRounds: formData.pricedRounds.filter((round: PricedRound) => round.id !== id)
    });
    setExpandedRounds(expandedRounds.filter(i => i !== index));
  };

  const updateEquity = (id: number, field: string, value: any) => {
    setFormData({
      ...formData,
      equityRounds: formData.equityRounds.map((equity: EquityRound) => 
        equity.id === id ? { ...equity, [field]: value } : equity
      )
    });
  };

  const updateSafeNote = (id: number, field: string, value: any) => {
    setFormData({
      ...formData,
      safeNotes: formData.safeNotes.map((note: SafeNote) => 
        note.id === id ? { ...note, [field]: value } : note
      )
    });
  };

  const updateDebt = (id: number, field: string, value: any) => {
    setFormData({
      ...formData,
      debtRounds: formData.debtRounds.map((debt: DebtRound) => 
        debt.id === id ? { ...debt, [field]: value } : debt
      )
    });
  };

  const updatePricedRound = (id: number, field: string, value: any) => {
    setFormData({
      ...formData,
      pricedRounds: formData.pricedRounds.map((round: PricedRound) => 
        round.id === id ? { ...round, [field]: value } : round
      )
    });
  };

  const toggleRoundExpansion = (index: number) => {
    setExpandedRounds(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const formatNumber = (value: any) => {
    const num = Number(value);
    return isNaN(num) ? '0' : num.toLocaleString();
  };

  const saveProgress = () => {
    console.log('Saving progress:', formData);
    alert('Progress saved successfully!');
  };

  const startEditEquity = (id: number) => {
    setEditingEquityId(id);
  };

  const startEditSafeNote = (id: number) => {
    setEditingSafeNoteId(id);
  };

  const startEditDebt = (id: number) => {
    setEditingDebtId(id);
  };

  const saveEquity = (id: number) => {
    setEditingEquityId(null);
  };

  const saveSafeNote = (id: number) => {
    setEditingSafeNoteId(null);
  };

  const saveDebt = (id: number) => {
    setEditingDebtId(null);
  };

  return (
    <div className="mx-auto px-4 py-1 ">
      {/* Header */}
      <div className="mb-8">
        {/* <div className="text-sm  text-blue-600 mb-1">Step 1 of 3</div> */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{formData.name || 'Portfolio Company Investment Information'}</h1>
        <p className="text-gray-600">{formData.description || 'Enter all current funding for this company'}</p>
      </div>

      {/* Tab Navigation */}
      <div className="inline-flex p-1 bg-[#ebf0f7] rounded-full mb-8 w-full">
        <button
          className={`px-12 py-2.5 w-full font-bold text-sm transition-all duration-200 rounded-full ${
            activeTab === 'latest' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
          onClick={() => setActiveTab('latest')}
        >
          Latest Cap Table
        </button>
        <button
          className={`px-12 py-2.5 font-bold w-full text-sm transition-all duration-200 rounded-full ${
            activeTab === 'roundbyround' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
          onClick={() => setActiveTab('roundbyround')}
        >
          Round by Round
        </button>
      </div>

      {/* About This Section */}
      <div className="border bg-white border-gray-200 rounded-lg p-4 mb-8 shadow-sm">
        <p className="text-sm text-gray-700">
          <strong>About this:</strong> {activeTab === 'latest' ? (
            'The Latest Cap Table entry method is easiest when the current shares outstanding of each share class are known and when the current number of allocated and unallocated options is. The Round by Round entry method is practical when the terms of each round are known and the number of allocated and unallocated options immediately prior to a round can be estimated, but the current dilutive effects are not known.'
          ) : (
            'The Round by Round entry method is practical when the terms of each round are known and the number of allocated and unallocated options immediately prior to a round can be estimated, but the current dilutive effects are not known. The Latest Cap Table entry method is easiest when the current shares outstanding of each share class are known and when the current number of allocated and unallocated options is.'
          )}
        </p>
      </div>

      {activeTab === 'latest' ? (
        /* LATEST CAP TABLE VIEW */
        <div className="space-y-5">
          {/* Founders Shares and Outstanding Options Summary - COPIED FROM ROUND BY ROUND */}
          <div className="bg-white rounded-lg border border-[#e5e7eb]">
            <div className="px-5 py-4 border-b border-[#e5e7eb]">
              <h3 className="text-[15px] font-semibold text-[#1f2937]">Founders Shares and Outstanding Options</h3>
            </div>
            
            <div className="p-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2.5 px-4 bg-[#f9fafb] rounded-md border border-[#e5e7eb]">
                  <label className="text-[13px] font-normal text-[#374151]">Founders Outstanding Shares</label>
                  <input
                    type="text"
                    value={(formData.foundersShares || 0).toLocaleString()}
                    onChange={(e) => {
                      const value = e.target.value.replace(/,/g, '');
                      setFormData({...formData, foundersShares: parseInt(value) || 0});
                    }}
                    className="w-28 h-9 rounded-md bg-white border border-[#d1d5db] px-3 text-right text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] transition-all"
                  />
                </div>

                <div className="flex items-center justify-between py-2.5 px-4 bg-[#f9fafb] rounded-md border border-[#e5e7eb]">
                  <label className="text-[13px] font-normal text-[#374151]">Total Allocated Options</label>
                  <input
                    type="text"
                    value={(formData.allocatedOptions || 0).toLocaleString()}
                    onChange={(e) => {
                      const value = e.target.value.replace(/,/g, '');
                      setFormData({...formData, allocatedOptions: parseInt(value) || 0});
                    }}
                    className="w-28 h-9 rounded-md bg-white border border-[#d1d5db] px-3 text-right text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] transition-all"
                  />
                </div>

                <div className="flex items-center justify-between py-2.5 px-4 bg-[#f9fafb] rounded-md border border-[#e5e7eb]">
                  <label className="text-[13px] font-normal text-[#374151]">Total Unallocated Options</label>
                  <input
                    type="text"
                    value={(formData.unallocatedOptions || 0).toLocaleString()}
                    onChange={(e) => {
                      const value = e.target.value.replace(/,/g, '');
                      setFormData({...formData, unallocatedOptions: parseInt(value) || 0});
                    }}
                    className="w-28 h-9 rounded-md bg-white border border-[#d1d5db] px-3 text-right text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Current Cap Table Section */}
          <div className="bg-white rounded-lg border border-[#e5e7eb]">
            <div className="px-5 py-4 border-b border-[#e5e7eb]">
              <h3 className="text-[15px] font-semibold text-[#1f2937]">Current Cap Table (Existing Equity)</h3>
            </div>
            
            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#f9fafb]">
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Round Name</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Investment Date</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Investment Amount</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Common Shares</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Preferred Shares</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Liquidation Preferences</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Participation</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Dividend Type</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Dividend Timing</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Dividend Rate</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Anti-dilution Provisions</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">QPO Share Price Multiple</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">QPO Minimum Proceeds</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Forced Conversion Share Price Multiple Cap</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.equityRounds.map((equity: EquityRound) => (
                      <tr key={equity.id} className="hover:bg-[#f9fafb] border-b border-[#f3f4f6]">
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={equity.roundName}
                            onChange={(e) => updateEquity(equity.id, 'roundName', e.target.value)}
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="date"
                            value={equity.investmentDate}
                            onChange={(e) => updateEquity(equity.id, 'investmentDate', e.target.value)}
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[13px]">$</span>
                            <input
                              type="text"
                              value={(equity.investmentAmount || 0).toLocaleString()}
                              onChange={(e) => {
                                const value = e.target.value.replace(/,/g, '');
                                updateEquity(equity.id, 'investmentAmount', parseInt(value) || 0);
                              }}
                              className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] pl-7 pr-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={(equity.commonShares || 0).toLocaleString()}
                            onChange={(e) => {
                              const value = e.target.value.replace(/,/g, '');
                              updateEquity(equity.id, 'commonShares', parseInt(value) || 0);
                            }}
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={(equity.preferredShares || 0).toLocaleString()}
                            onChange={(e) => {
                              const value = e.target.value.replace(/,/g, '');
                              updateEquity(equity.id, 'preferredShares', parseInt(value) || 0);
                            }}
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={equity.liquidationPreferences}
                            onChange={(e) => updateEquity(equity.id, 'liquidationPreferences', e.target.value)}
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={equity.participationType}
                            onChange={(e) => updateEquity(equity.id, 'participationType', e.target.value)}
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          >
                            <option>Non-participating</option>
                            <option>Participating</option>
                            <option>Capped</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={equity.dividendTiming}
                            onChange={(e) => updateEquity(equity.id, 'dividendTiming', e.target.value)}
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          >
                            <option>Non-cumulative</option>
                            <option>Cumulative</option>
                            <option>Accruing</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            placeholder="Select..."
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="relative">
                            <input
                              type="number"
                              value={equity.dividendRate}
                              onChange={(e) => updateEquity(equity.id, 'dividendRate', parseInt(e.target.value) || 0)}
                              className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 pr-7 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[13px]">%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={equity.antiDilutionProvisions}
                            onChange={(e) => updateEquity(equity.id, 'antiDilutionProvisions', e.target.value)}
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          >
                            <option>None</option>
                            <option>Full ratchet</option>
                            <option>Weighted average</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={(equity.qpoSharePriceMultiple || 0).toLocaleString()}
                            onChange={(e) => {
                              const value = e.target.value.replace(/,/g, '');
                              updateEquity(equity.id, 'qpoSharePriceMultiple', parseFloat(value) || 0);
                            }}
                            placeholder="0"
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[13px]">$</span>
                            <input
                              type="text"
                              value={(equity.qpoMinimumProceeds || 0).toLocaleString()}
                              onChange={(e) => {
                                const value = e.target.value.replace(/,/g, '');
                                updateEquity(equity.id, 'qpoMinimumProceeds', parseInt(value) || 0);
                              }}
                              placeholder="0"
                              className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] pl-7 pr-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={(equity.forcedConversionSharePriceMultipleCap || 0).toLocaleString()}
                            onChange={(e) => {
                              const value = e.target.value.replace(/,/g, '');
                              updateEquity(equity.id, 'forcedConversionSharePriceMultipleCap', parseFloat(value) || 0);
                            }}
                            placeholder="0"
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleRemoveEquity(equity.id)}
                            className="text-[#ef4444] hover:text-[#dc2626] p-1 rounded hover:bg-[#fef2f2]"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <button 
                onClick={handleAddEquity}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-[#3b82f6] hover:text-[#2563eb] transition-colors"
              >
                <Plus size={16} />
                <span>Add Equity</span>
              </button>
            </div>
          </div>

          {/* SAFEs and Convertible Notes Section */}
          <div className="bg-white rounded-lg border border-[#e5e7eb]">
            <div className="px-5 py-4 border-b border-[#e5e7eb]">
              <h3 className="text-[15px] font-semibold text-[#1f2937]">SAFEs and Convertible Notes</h3>
            </div>
            
            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#f9fafb]">
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Round Name</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Type</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Investment Date</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Amount</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">PMV Cap</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Discount</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Interest Rate</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">MFN</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Pro Rata Rights</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.safeNotes.map((note: SafeNote) => (
                      <tr key={note.id} className="hover:bg-[#f9fafb] border-b border-[#f3f4f6]">
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={note.roundName}
                            onChange={(e) => updateSafeNote(note.id, 'roundName', e.target.value)}
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={note.type}
                            onChange={(e) => updateSafeNote(note.id, 'type', e.target.value)}
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          >
                            <option value="Pre-Money">Pre-Money SAFE</option>
                            <option value="Post-Money">Post-Money</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="date"
                            value={note.investmentDate}
                            onChange={(e) => updateSafeNote(note.id, 'investmentDate', e.target.value)}
                            placeholder="mm/dd/yyyy"
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[13px]">$</span>
                            <input
                              type="text"
                              value={(note.investmentAmount || 0).toLocaleString()}
                              onChange={(e) => {
                                const value = e.target.value.replace(/,/g, '');
                                updateSafeNote(note.id, 'investmentAmount', parseInt(value) || 0);
                              }}
                              className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] pl-7 pr-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[13px]">$</span>
                            <input
                              type="text"
                              value={(note.pmvCap || 0).toLocaleString()}
                              onChange={(e) => {
                                const value = e.target.value.replace(/,/g, '');
                                updateSafeNote(note.id, 'pmvCap', parseInt(value) || 0);
                              }}
                              className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] pl-7 pr-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="relative">
                            <input
                              type="number"
                              value={note.discount}
                              onChange={(e) => updateSafeNote(note.id, 'discount', parseInt(e.target.value) || 0)}
                              className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 pr-7 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[13px]">%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="relative">
                            <input
                              type="number"
                              value={note.interestRate}
                              onChange={(e) => updateSafeNote(note.id, 'interestRate', parseInt(e.target.value) || 0)}
                              className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 pr-7 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[13px]">%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={note.mfn || false}
                              onChange={(e) => updateSafeNote(note.id, 'mfn', e.target.checked)}
                              className="w-4 h-4 rounded border-[#d1d5db] text-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={note.proRata || false}
                              onChange={(e) => updateSafeNote(note.id, 'proRata', e.target.checked)}
                              className="w-4 h-4 rounded border-[#d1d5db] text-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleRemoveSafeNote(note.id)}
                            className="text-[#ef4444] hover:text-[#dc2626] p-1 rounded hover:bg-[#fef2f2]"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <button 
                onClick={handleAddSafeNote}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-[#3b82f6] hover:text-[#2563eb] transition-colors"
              >
                <Plus size={16} />
                <span>Add SAFE/Convertible Note</span>
              </button>
            </div>
          </div>

          {/* Debt Section */}
          <div className="bg-white rounded-lg border border-[#e5e7eb]">
            <div className="px-5 py-4 border-b border-[#e5e7eb]">
              <h3 className="text-[15px] font-semibold text-[#1f2937]">Debt</h3>
            </div>
            
            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#f9fafb]">
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Round Name</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Payment Nature</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Issuance Date</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Principal Amount</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Interest Type</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Interest Frequency</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Annual Interest Rate</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Expiration Date</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.debtRounds.map((debt: DebtRound) => (
                      <tr key={debt.id} className="hover:bg-[#f9fafb] border-b border-[#f3f4f6]">
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={debt.roundName}
                            onChange={(e) => updateDebt(debt.id, 'roundName', e.target.value)}
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={debt.paymentNature}
                            onChange={(e) => updateDebt(debt.id, 'paymentNature', e.target.value)}
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          >
                            <option value="Lump Sum">Lump Sum</option>
                            <option value="Installment">Installment</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="date"
                            value={debt.issuanceDate}
                            onChange={(e) => updateDebt(debt.id, 'issuanceDate', e.target.value)}
                            placeholder="mm/dd/yyyy"
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[13px]">$</span>
                            <input
                              type="text"
                              value={(debt.principalAmount || 0).toLocaleString()}
                              onChange={(e) => {
                                const value = e.target.value.replace(/,/g, '');
                                updateDebt(debt.id, 'principalAmount', parseInt(value) || 0);
                              }}
                              className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] pl-7 pr-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={debt.interestType}
                            onChange={(e) => updateDebt(debt.id, 'interestType', e.target.value)}
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          >
                            <option value="Simple">Simple</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Variable">Variable</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={debt.interestFrequency}
                            onChange={(e) => updateDebt(debt.id, 'interestFrequency', e.target.value)}
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          >
                            <option value="Annual">Annual</option>
                            <option value="Quarterly">Quarterly</option>
                            <option value="Monthly">Monthly</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <div className="relative">
                            <input
                              type="number"
                              value={debt.interestRate}
                              onChange={(e) => updateDebt(debt.id, 'interestRate', parseInt(e.target.value) || 0)}
                              className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 pr-7 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[13px]">%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="date"
                            value={debt.expirationDate}
                            onChange={(e) => updateDebt(debt.id, 'expirationDate', e.target.value)}
                            placeholder="mm/dd/yyyy"
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleRemoveDebt(debt.id)}
                            className="text-[#ef4444] hover:text-[#dc2626] p-1 rounded hover:bg-[#fef2f2]"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <button 
                onClick={handleAddDebt}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-[#3b82f6] hover:text-[#2563eb] transition-colors"
              >
                <Plus size={16} />
                <span>Add Debt</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ROUND BY ROUND VIEW - MATCHING PROTOTYPE */
        <div className="space-y-5">
          {/* Founders Shares and Outstanding Options - FIRST */}
          <div className="bg-white rounded-lg border border-[#e5e7eb]">
            <div className="px-5 py-4 border-b border-[#e5e7eb]">
              <h3 className="text-[15px] font-semibold text-[#111827]">
                Founders Shares and Outstanding Options
              </h3>
            </div>
            
            <div className="p-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2.5 px-4 bg-[#f9fafb] rounded-md border border-[#e5e7eb]">
                  <label className="text-[13px] font-normal text-[#374151]">Founders Outstanding Shares</label>
                  <input
                    type="text"
                    value={(formData.foundersShares || 0).toLocaleString()}
                    onChange={(e) => {
                      const value = e.target.value.replace(/,/g, '');
                      setFormData({...formData, foundersShares: parseInt(value) || 0});
                    }}
                    className="w-28 h-9 rounded-md bg-white border border-[#d1d5db] px-3 text-right text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] transition-all"
                  />
                </div>

                <div className="flex items-center justify-between py-2.5 px-4 bg-[#f9fafb] rounded-md border border-[#e5e7eb]">
                  <label className="text-[13px] font-normal text-[#374151]">Total Allocated Options</label>
                  <input
                    type="text"
                    value={(formData.allocatedOptions || 0).toLocaleString()}
                    onChange={(e) => {
                      const value = e.target.value.replace(/,/g, '');
                      setFormData({...formData, allocatedOptions: parseInt(value) || 0});
                    }}
                    className="w-28 h-9 rounded-md bg-white border border-[#d1d5db] px-3 text-right text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] transition-all"
                  />
                </div>

                <div className="flex items-center justify-between py-2.5 px-4 bg-[#f9fafb] rounded-md border border-[#e5e7eb]">
                  <label className="text-[13px] font-normal text-[#374151]">Total Unallocated Options</label>
                  <input
                    type="text"
                    value={(formData.unallocatedOptions || 0).toLocaleString()}
                    onChange={(e) => {
                      const value = e.target.value.replace(/,/g, '');
                      setFormData({...formData, unallocatedOptions: parseInt(value) || 0});
                    }}
                    className="w-28 h-9 rounded-md bg-white border border-[#d1d5db] px-3 text-right text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Outstanding Debt - SECOND */}
          <div className="bg-white rounded-lg border border-[#e5e7eb]">
            <div className="px-5 py-4 border-b border-[#e5e7eb]">
              <h3 className="text-[15px] font-semibold text-[#111827]">Outstanding Debt</h3>
            </div>
            
            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#f9fafb]">
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Round Name</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Payment Nature</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Issuance Date</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Principal Amount</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Interest Type</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Interest Frequency</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Interest Rate</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Expiration Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.debtRounds.map((debt: DebtRound) => (
                      <tr key={debt.id} className="hover:bg-[#f9fafb] border-b border-[#f3f4f6]">
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={debt.roundName}
                            onChange={(e) => updateDebt(debt.id, 'roundName', e.target.value)}
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={debt.paymentNature}
                            onChange={(e) => updateDebt(debt.id, 'paymentNature', e.target.value)}
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          >
                            <option value="Lump Sum">Lump Sum</option>
                            <option value="Installment">Installment</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="date"
                            value={debt.issuanceDate}
                            onChange={(e) => updateDebt(debt.id, 'issuanceDate', e.target.value)}
                            placeholder="mm/dd/yyyy"
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[13px]">$</span>
                            <input
                              type="text"
                              value={(debt.principalAmount || 0).toLocaleString()}
                              onChange={(e) => {
                                const value = e.target.value.replace(/,/g, '');
                                updateDebt(debt.id, 'principalAmount', parseInt(value) || 0);
                              }}
                              className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] pl-7 pr-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={debt.interestType}
                            onChange={(e) => updateDebt(debt.id, 'interestType', e.target.value)}
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          >
                            <option value="Simple">Simple</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Variable">Variable</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={debt.interestFrequency}
                            onChange={(e) => updateDebt(debt.id, 'interestFrequency', e.target.value)}
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          >
                            <option value="Annual">Annual</option>
                            <option value="Quarterly">Quarterly</option>
                            <option value="Monthly">Monthly</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <div className="relative">
                            <input
                              type="number"
                              value={debt.interestRate}
                              onChange={(e) => updateDebt(debt.id, 'interestRate', parseInt(e.target.value) || 0)}
                              className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 pr-7 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[13px]">%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="date"
                            value={debt.expirationDate}
                            onChange={(e) => updateDebt(debt.id, 'expirationDate', e.target.value)}
                            placeholder="mm/dd/yyyy"
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <button 
                onClick={handleAddDebt}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-[#3b82f6] hover:text-[#2563eb] transition-colors"
              >
                <Plus size={16} />
                <span>Add Debt</span>
              </button>
            </div>
          </div>

          {/* Unpriced Rounds (SAFEs and Convertible Notes) - THIRD */}
          <div className="bg-white rounded-lg border border-[#e5e7eb]">
            <div className="px-5 py-4 border-b border-[#e5e7eb]">
              <h3 className="text-[15px] font-semibold text-[#111827]">
                Unpriced Rounds (SAFEs and Convertible Notes)
              </h3>
            </div>
            
            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#f9fafb]">
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Round Name</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Type</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Investment Date</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Investment Amount</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">PMV Cap</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Discount</th>
                      <th className="text-left py-3 px-4 text-[12px] font-medium text-[#6b7280] border-b border-[#e5e7eb]">Interest Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.safeNotes.map((note: SafeNote) => (
                      <tr key={note.id} className="hover:bg-[#f9fafb] border-b border-[#f3f4f6]">
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={note.roundName}
                            onChange={(e) => updateSafeNote(note.id, 'roundName', e.target.value)}
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={note.type}
                            onChange={(e) => updateSafeNote(note.id, 'type', e.target.value)}
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          >
                            <option value="Pre-Money">Pre-Money SAFE</option>
                            <option value="Post-Money">Post-Money</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="date"
                            value={note.investmentDate}
                            onChange={(e) => updateSafeNote(note.id, 'investmentDate', e.target.value)}
                            placeholder="mm/dd/yyyy"
                            className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[13px]">$</span>
                            <input
                              type="text"
                              value={(note.investmentAmount || 0).toLocaleString()}
                              onChange={(e) => {
                                const value = e.target.value.replace(/,/g, '');
                                updateSafeNote(note.id, 'investmentAmount', parseInt(value) || 0);
                              }}
                              className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] pl-7 pr-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[13px]">$</span>
                            <input
                              type="text"
                              value={(note.pmvCap || 0).toLocaleString()}
                              onChange={(e) => {
                                const value = e.target.value.replace(/,/g, '');
                                updateSafeNote(note.id, 'pmvCap', parseInt(value) || 0);
                              }}
                              className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] pl-7 pr-3 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="relative">
                            <input
                              type="number"
                              value={note.discount}
                              onChange={(e) => updateSafeNote(note.id, 'discount', parseInt(e.target.value) || 0)}
                              className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 pr-7 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[13px]">%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="relative">
                            <input
                              type="number"
                              value={note.interestRate}
                              onChange={(e) => updateSafeNote(note.id, 'interestRate', parseInt(e.target.value) || 0)}
                              className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#d1d5db] px-3 pr-7 text-[13px] text-[#111827] focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:bg-white"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[13px]">%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <button 
                onClick={handleAddSafeNote}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-[#3b82f6] hover:text-[#2563eb] transition-colors"
              >
                <Plus size={16} />
                <span>Add SAFE/Convertible Note</span>
              </button>
            </div>
          </div>

{/* Priced Rounds Section */}
<div className="mt-8">
  <h3 className="text-[16px] font-semibold text-[#111827] mb-6">Priced Rounds</h3>
  
  <div className="flex flex-nowrap gap-6 overflow-x-auto pb-6">
    {formData.pricedRounds.map((round: PricedRound, index: number) => (
      <div key={round.id} className="flex flex-col gap-4 min-w-[310px] max-w-[310px]">
        
        {/* Main Investment Card */}
        <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f3f4f6] flex items-center justify-between">
            <h2 
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updatePricedRound(round.id, 'roundName', e.currentTarget.textContent || '')}
              className="text-[15px] font-semibold text-[#111827] text-center flex-1 focus:outline-none cursor-text"
            >
              {round.roundName || `Round A`}
            
            </h2>
            <button
              onClick={() => handleRemovePricedRound(round.id)}
              className="text-[#ef4444] hover:text-[#dc2626] p-1 rounded hover:bg-[#fef2f2] flex-shrink-0"
              title="Delete Round"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="p-5 space-y-4">
            {/* Investment Date */}
            <div>
              <label className="block text-[12px] font-medium text-[#4b5563] mb-1.5">Investment Date</label>
              <input
                type="date"
                value={round.investmentDate}
                onChange={(e) => updatePricedRound(round.id, 'investmentDate', e.target.value)}
                className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#e5e7eb] px-3 text-[13px] text-[#111827] focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            {/* Investment Amount */}
            <div>
              <label className="block text-[12px] font-medium text-[#4b5563] mb-1.5">Investment Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[13px]">$</span>
                <input
                  type="text"
                  value={(round.investmentAmount || 0).toLocaleString()}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '');
                    updatePricedRound(round.id, 'investmentAmount', parseInt(value) || 0);
                  }}
                  className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#e5e7eb] pl-7 pr-3 text-[13px] text-[#111827] focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Liquidation Preference */}
            <div>
              <label className="block text-[12px] font-medium text-[#4b5563] mb-1.5">Liquidation Preference</label>
              <div className="relative">
                <input
                  type="text"
                  value={round.liquidationPreference}
                  onChange={(e) => updatePricedRound(round.id, 'liquidationPreference', e.target.value)}
                  className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#e5e7eb] px-3 text-[13px] text-[#111827] focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[13px]">x</span>
              </div>
            </div>

            {/* Ownership */}
            <div>
              <label className="block text-[12px] font-medium text-[#4b5563] mb-1.5">Ownership</label>
              <div className="flex gap-0">
                <div className="w-10 h-9 rounded-l-md bg-[#f9fafb] border border-r-0 border-[#e5e7eb] flex items-center justify-center text-[#9ca3af] text-[13px]">#</div>
                <input
                  type="text"
                  value={(round.ownership || 0).toLocaleString()}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '');
                    updatePricedRound(round.id, 'ownership', parseInt(value) || 0);
                  }}
                  className="flex-1 h-9 rounded-r-md bg-[#f9fafb] border border-[#e5e7eb] px-3 text-[13px] text-[#111827] focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Participation */}
            <div>
              <label className="block text-[12px] font-medium text-[#4b5563] mb-2">Common Stock Participation</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={round.participation === 'Participating'}
                    onChange={() => updatePricedRound(round.id, 'participation', 'Participating')}
                    className="w-4 h-4 text-blue-600 border-[#d1d5db]"
                  />
                  <span className="text-[13px] text-[#111827]">Participating</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={round.participation === 'Converting'}
                    onChange={() => updatePricedRound(round.id, 'participation', 'Converting')}
                    className="w-4 h-4 text-blue-600 border-[#d1d5db]"
                  />
                  <span className="text-[13px] text-[#111827]">Converting</span>
                </label>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-[#d1d5db] text-blue-600" />
                <span className="text-[13px] text-[#111827]">QPO Threshold</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-[#d1d5db] text-blue-600" />
                <span className="text-[13px] text-[#111827]">Cap</span>
              </label>
            </div>

            {/* Dividends */}
            <div>
              <label className="block text-[12px] font-medium text-[#4b5563] mb-2">Dividends</label>
              <div className="flex gap-2 mb-2">
                <div className="h-8 px-4 bg-[#f9fafb] border border-[#e5e7eb] rounded flex items-center text-[12px] text-[#111827]">Simple</div>
                <select className="flex-1 h-8 bg-[#f9fafb] border border-[#e5e7eb] rounded px-2 text-[12px] outline-none">
                  <option>Select</option>
                </select>
                <div className="w-12 h-8 bg-[#f9fafb] border border-[#e5e7eb] rounded flex items-center justify-center text-[12px] text-[#111827]">4%</div>
              </div>
            </div>

            {/* Antidilution */}
            <div>
              <label className="block text-[12px] font-medium text-[#4b5563] mb-1.5">Antidilution Provision</label>
              <select className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#e5e7eb] px-3 text-[13px] outline-none">
                <option>None</option>
              </select>
            </div>

            {/* Comments */}
            <div>
              <label className="block text-[12px] font-medium text-[#4b5563] mb-1.5">Comments</label>
              <input
                type="text"
                placeholder="A 16Z Lead Investor"
                className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#e5e7eb] px-3 text-[13px] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Option Pools Card */}
        <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm p-5 space-y-4">
          <h5 className="text-[15px] font-semibold text-[#111827] text-center mb-2">Option Pools</h5>
          
          <div>
            <label className="block text-[12px] font-medium text-[#4b5563] mb-1.5 leading-tight">
              Allocated Options Immediately prior to round
            </label>
            <input type="text" className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#e5e7eb] px-3 text-[13px]" defaultValue="5,000" />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[#4b5563] mb-1.5 leading-tight">
              Unallocated Options Immediately prior to round
            </label>
            <input type="text" className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#e5e7eb] px-3 text-[13px]" defaultValue="7,500" />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[#4b5563] mb-1.5 leading-tight">
              Requested Available Option Pool Post-Round
            </label>
            <div className="relative">
              <input type="text" className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#e5e7eb] px-3 text-[13px]" defaultValue="10" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[13px]">%</span>
            </div>
          </div>
        </div>

        {/* My Fund Investment Card */}
        <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm p-5">
          <label className="block text-[12px] font-medium text-[#4b5563] mb-2">
            My Fund's Investment in This Round
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[13px]">$</span>
            <input type="text" className="w-full h-9 rounded-md bg-[#f9fafb] border border-[#e5e7eb] pl-7 pr-3 text-[13px]" defaultValue="500,000" />
          </div>
        </div>

      </div>
    ))}

    {/* Add Round Placeholder (Gray Card with Plus) */}
    <button
      onClick={handleAddPricedRound}
      className="min-w-[250px] bg-[#e5e7eb]/40 border border-transparent rounded-xl flex flex-col items-center justify-center hover:bg-[#e5e7eb]/60 transition-all"
    >
      <Plus size={40} className="text-[#374151]" />
    </button>
  </div>
</div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-200">
        <button 
          onClick={onStepBack}
          className="px-5 py-2.5 text-[13px] font-medium text-[#6b7280] bg-white hover:bg-gray-50 rounded-md border border-[#e5e7eb] transition-colors"
        >
          Cancel
        </button>
        <div className="flex gap-3">
          <button 
            onClick={onStepBack}
            className="px-5 py-2.5 text-[13px] font-medium text-[#6b7280] bg-white hover:bg-gray-50 rounded-md border border-[#e5e7eb] transition-colors"
          >
            Step back
          </button>
          <button 
            onClick={saveProgress}
            className="px-5 py-2.5 text-[13px] font-medium text-[#3b82f6] bg-white border border-[#3b82f6] rounded-md hover:bg-[#eff6ff] transition-colors"
          >
            Save progress
          </button>
          <button 
            onClick={() => onContinue(formData)}
            className="px-5 py-2.5 text-[13px] font-medium text-white bg-[#3b82f6] rounded-md hover:bg-[#2563eb] transition-colors shadow-sm"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1PriorInvestment;