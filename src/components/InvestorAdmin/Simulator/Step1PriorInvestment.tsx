// app/simulator/components/Step1PriorInvestment.tsx
"use client";

import React, { useState } from 'react';
import { Plus, Trash2, Edit2, ChevronDown, ChevronUp, Save } from 'lucide-react';

interface Step1Props {
  data: any;
  onContinue: (data: any) => void;
  onStepBack: () => void;
}

const Step1PriorInvestment: React.FC<Step1Props> = ({ data, onContinue, onStepBack }) => {
  const [formData, setFormData] = useState({
    ...data,
    // Ensure default values if not provided
    foundersShares: data.foundersShares || 100000,
    allocatedOptions: data.allocatedOptions || 20000,
    unallocatedOptions: data.unallocatedOptions || 20000,
    safeNotes: data.safeNotes || [],
    debtRounds: data.debtRounds || [],
    equityRounds: data.equityRounds || [],
    pricedRounds: data.pricedRounds || [{
      id: Date.now(),
      roundName: 'Series A',
      investmentDate: '2025-07-08',
      investmentAmount: 1000000,
      liquidationPreference: 1.2,
      ownership: 500000,
      participation: 'Participating / Converting',
      qpoThreshold: 0,
      dividends: 'Simulate',
      antidilution: 'None',
      comments: 'A 162 Lead Investor',
      allocatedOptionsPrior: 5000,
      unallocatedOptionsPrior: 7500,
      requestedOptionPool: 10,
      myInvestment: 500000
    }],
  });
  
  const [activeTab, setActiveTab] = useState<'latest' | 'roundbyround'>('latest');
  const [expandedRounds, setExpandedRounds] = useState<number[]>([0]); // Start with first round expanded
  const [editingEquityId, setEditingEquityId] = useState<number | null>(null);
  const [editingSafeNoteId, setEditingSafeNoteId] = useState<number | null>(null);
  const [editingDebtId, setEditingDebtId] = useState<number | null>(null);

  const handleAddEquity = () => {
    const newEquity = {
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
      antiDilutionProvisions: 'None'
    };
    setFormData({ ...formData, equityRounds: [...formData.equityRounds, newEquity] });
    setEditingEquityId(newEquity.id);
  };

  const handleAddSafeNote = () => {
    const newSafeNote = {
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
    const newDebt = {
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
    const newRound = {
      id: Date.now(),
      roundName: `Series ${String.fromCharCode(66 + formData.pricedRounds.length)}`,
      investmentDate: '',
      investmentAmount: 0,
      liquidationPreference: 1.0,
      ownership: 0,
      participation: 'Non-participating',
      qpoThreshold: 0,
      dividends: 'Non-cumulative',
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
      equityRounds: formData.equityRounds.filter((equity: any) => equity.id !== id)
    });
  };

  const handleRemoveSafeNote = (id: number) => {
    setFormData({
      ...formData,
      safeNotes: formData.safeNotes.filter((note: any) => note.id !== id)
    });
  };

  const handleRemoveDebt = (id: number) => {
    setFormData({
      ...formData,
      debtRounds: formData.debtRounds.filter((debt: any) => debt.id !== id)
    });
  };

  const handleRemovePricedRound = (id: number) => {
    const index = formData.pricedRounds.findIndex((round: any) => round.id === id);
    setFormData({
      ...formData,
      pricedRounds: formData.pricedRounds.filter((round: any) => round.id !== id)
    });
    setExpandedRounds(expandedRounds.filter(i => i !== index));
  };

  const updateEquity = (id: number, field: string, value: any) => {
    setFormData({
      ...formData,
      equityRounds: formData.equityRounds.map((equity: any) => 
        equity.id === id ? { ...equity, [field]: value } : equity
      )
    });
  };

  const updateSafeNote = (id: number, field: string, value: any) => {
    setFormData({
      ...formData,
      safeNotes: formData.safeNotes.map((note: any) => 
        note.id === id ? { ...note, [field]: value } : note
      )
    });
  };

  const updateDebt = (id: number, field: string, value: any) => {
    setFormData({
      ...formData,
      debtRounds: formData.debtRounds.map((debt: any) => 
        debt.id === id ? { ...debt, [field]: value } : debt
      )
    });
  };

  const updatePricedRound = (id: number, field: string, value: any) => {
    setFormData({
      ...formData,
      pricedRounds: formData.pricedRounds.map((round: any) => 
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

  // Helper function to safely format numbers with toLocaleString
  const formatNumber = (value: any) => {
    const num = Number(value);
    return isNaN(num) ? '0' : num.toLocaleString();
  };

  const saveProgress = () => {
    console.log('Saving progress:', formData);
    // Here you would typically make an API call to save the data
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
    <div className=" mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="text-sm text-gray-500 mb-1">Step 1 of 3</div>
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
        <p className="text-sm ">
          <strong>About this:</strong> {activeTab === 'latest' ? (
            'The Latest Cap Table entry method is easiest when the current shares outstanding of each share class are known and when the current number of allocated and unallocated options is. The Round by Round entry method is practical when the terms of each round are known and the number of allocated and unallocated options immediately prior to a round can be estimated, but the current dilutive effects are not known.'
          ) : (
            'The Round by Round entry method is practical when the terms of each round are known and the number of allocated and unallocated options immediately prior to a round can be estimated, but the current dilutive effects are not known. The Latest Cap Table entry method is easiest when the current shares outstanding of each share class are known and when the current number of allocated and unallocated options is.'
          )}
        </p>
      </div>

      {activeTab === 'latest' ? (
        /* LATEST CAP TABLE VIEW */
        <div className="space-y-8">
          {/* Current Cap Table Section */}
          <div className="bg-white rounded-xl border border-gray-300 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Cap Table (Existing Equity)</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Round Name</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Investment Date</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Investment Amount</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Common Shares</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Preferred Shares</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Liquidation Preferences</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Participation Type</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Dividend Timing</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Dividend Rate</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Anti-dilution Provisions</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.equityRounds.map((equity: any, index: number) => (
                      <tr key={equity.id} className="hover:bg-gray-50">
                        <td className="p-3 border border-gray-300">
                          <input
                            type="text"
                            value={equity.roundName}
                            onChange={(e) => updateEquity(equity.id, 'roundName', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="p-3 border border-gray-300">
                          <input
                            type="date"
                            value={equity.investmentDate}
                            onChange={(e) => updateEquity(equity.id, 'investmentDate', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="p-3 border border-gray-300">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                            <input
                              type="number"
                              value={equity.investmentAmount}
                              onChange={(e) => updateEquity(equity.id, 'investmentAmount', parseInt(e.target.value) || 0)}
                              className="w-full rounded border border-gray-300 pl-7 pr-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <input
                            type="number"
                            value={equity.commonShares}
                            onChange={(e) => updateEquity(equity.id, 'commonShares', parseInt(e.target.value) || 0)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="p-3 border border-gray-300">
                          <input
                            type="number"
                            value={equity.preferredShares}
                            onChange={(e) => updateEquity(equity.id, 'preferredShares', parseInt(e.target.value) || 0)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="p-3 border border-gray-300">
                          <input
                            type="text"
                            value={equity.liquidationPreferences}
                            onChange={(e) => updateEquity(equity.id, 'liquidationPreferences', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="p-3 border border-gray-300">
                          <select
                            value={equity.participationType}
                            onChange={(e) => updateEquity(equity.id, 'participationType', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          >
                            <option>Non-participating</option>
                            <option>Participating</option>
                            <option>Capped</option>
                          </select>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <select
                            value={equity.dividendTiming}
                            onChange={(e) => updateEquity(equity.id, 'dividendTiming', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          >
                            <option>Non-cumulative</option>
                            <option>Cumulative</option>
                            <option>Accruing</option>
                          </select>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <div className="relative">
                            <input
                              type="number"
                              value={equity.dividendRate}
                              onChange={(e) => updateEquity(equity.id, 'dividendRate', parseInt(e.target.value) || 0)}
                              className="w-full rounded border border-gray-300 px-3 py-2 pr-7 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                          </div>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <select
                            value={equity.antiDilutionProvisions}
                            onChange={(e) => updateEquity(equity.id, 'antiDilutionProvisions', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          >
                            <option>None</option>
                            <option>Full ratchet</option>
                            <option>Weighted average</option>
                          </select>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <div className="flex items-center gap-2">
                            {editingEquityId === equity.id ? (
                              <button
                                onClick={() => saveEquity(equity.id)}
                                className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                                title="Save"
                              >
                                <Save size={16} />
                              </button>
                            ) : (
                              <button
                                onClick={() => startEditEquity(equity.id)}
                                className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                title="Edit"
                              >
                                <Edit2 size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => handleRemoveEquity(equity.id)}
                              className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={11} className="p-4 border border-gray-300">
                        <button 
                          onClick={handleAddEquity}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        >
                          <Plus size={16} />
                          <span> Add Equity</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Founders Shares and Options Section */}
          <div className="bg-white rounded-xl border border-gray-300 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Founders Shares and Outstanding Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Founders Outstanding Shares</label>
                  <input
                    type="number"
                    value={formData.foundersShares}
                    onChange={(e) => setFormData({...formData, foundersShares: parseInt(e.target.value) || 0})}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Allocated Options</label>
                  <input
                    type="number"
                    value={formData.allocatedOptions}
                    onChange={(e) => setFormData({...formData, allocatedOptions: parseInt(e.target.value) || 0})}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Unallocated Options</label>
                  <input
                    type="number"
                    value={formData.unallocatedOptions}
                    onChange={(e) => setFormData({...formData, unallocatedOptions: parseInt(e.target.value) || 0})}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SAFEs and Convertible Notes Section */}
          <div className="bg-white rounded-xl border border-gray-300 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SAFEs and Convertible Notes</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Round Name</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Type</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Investment Date</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Amount</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">PMV Cap</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Discount</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Interest Rate</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">MFN</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Pro Rata Rights</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.safeNotes.map((note: any) => (
                      <tr key={note.id} className="hover:bg-gray-50">
                        <td className="p-3 border border-gray-300">
                          <input
                            type="text"
                            value={note.roundName}
                            onChange={(e) => updateSafeNote(note.id, 'roundName', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="p-3 border border-gray-300">
                          <select
                            value={note.type}
                            onChange={(e) => updateSafeNote(note.id, 'type', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="Pre-Money">Pre-Money</option>
                            <option value="Post-Money">Post-Money</option>
                          </select>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <input
                            type="date"
                            value={note.investmentDate}
                            onChange={(e) => updateSafeNote(note.id, 'investmentDate', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="p-3 border border-gray-300">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                            <input
                              type="number"
                              value={note.investmentAmount}
                              onChange={(e) => updateSafeNote(note.id, 'investmentAmount', parseInt(e.target.value) || 0)}
                              className="w-full rounded border border-gray-300 pl-7 pr-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                            <input
                              type="number"
                              value={note.pmvCap}
                              onChange={(e) => updateSafeNote(note.id, 'pmvCap', parseInt(e.target.value) || 0)}
                              className="w-full rounded border border-gray-300 pl-7 pr-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <div className="relative">
                            <input
                              type="number"
                              value={note.discount}
                              onChange={(e) => updateSafeNote(note.id, 'discount', parseInt(e.target.value) || 0)}
                              className="w-full rounded border border-gray-300 px-3 py-2 pr-7 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                          </div>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <div className="relative">
                            <input
                              type="number"
                              value={note.interestRate}
                              onChange={(e) => updateSafeNote(note.id, 'interestRate', parseInt(e.target.value) || 0)}
                              className="w-full rounded border border-gray-300 px-3 py-2 pr-7 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                          </div>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <div className="flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={note.mfn || false}
                              onChange={(e) => updateSafeNote(note.id, 'mfn', e.target.checked)}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </div>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <div className="flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={note.proRata || false}
                              onChange={(e) => updateSafeNote(note.id, 'proRata', e.target.checked)}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </div>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <div className="flex items-center gap-2">
                            {editingSafeNoteId === note.id ? (
                              <button
                                onClick={() => saveSafeNote(note.id)}
                                className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                                title="Save"
                              >
                                <Save size={16} />
                              </button>
                            ) : (
                              <button
                                onClick={() => startEditSafeNote(note.id)}
                                className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                title="Edit"
                              >
                                <Edit2 size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => handleRemoveSafeNote(note.id)}
                              className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={10} className="p-4 border border-gray-300">
                        <button 
                          onClick={handleAddSafeNote}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        >
                          <Plus size={16} />
                          <span> Add SAFE/Note</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Debt Section */}
          <div className="bg-white rounded-xl border border-gray-300 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Debt</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Round Name</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Payment Nature</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Issuance Date</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Principal Amount</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Interest Type</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Interest Frequency</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Annual Interest Rate</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Expiration Date</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.debtRounds.map((debt: any) => (
                      <tr key={debt.id} className="hover:bg-gray-50">
                        <td className="p-3 border border-gray-300">
                          <input
                            type="text"
                            value={debt.roundName}
                            onChange={(e) => updateDebt(debt.id, 'roundName', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="p-3 border border-gray-300">
                          <select
                            value={debt.paymentNature}
                            onChange={(e) => updateDebt(debt.id, 'paymentNature', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="Lump Sum">Lump Sum</option>
                            <option value="Installment">Installment</option>
                          </select>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <input
                            type="date"
                            value={debt.issuanceDate}
                            onChange={(e) => updateDebt(debt.id, 'issuanceDate', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="p-3 border border-gray-300">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                            <input
                              type="number"
                              value={debt.principalAmount}
                              onChange={(e) => updateDebt(debt.id, 'principalAmount', parseInt(e.target.value) || 0)}
                              className="w-full rounded border border-gray-300 pl-7 pr-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <select
                            value={debt.interestType}
                            onChange={(e) => updateDebt(debt.id, 'interestType', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="Fixed">Fixed</option>
                            <option value="Variable">Variable</option>
                          </select>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <select
                            value={debt.interestFrequency}
                            onChange={(e) => updateDebt(debt.id, 'interestFrequency', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="Annual">Annual</option>
                            <option value="Quarterly">Quarterly</option>
                            <option value="Monthly">Monthly</option>
                          </select>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <div className="relative">
                            <input
                              type="number"
                              value={debt.interestRate}
                              onChange={(e) => updateDebt(debt.id, 'interestRate', parseInt(e.target.value) || 0)}
                              className="w-full rounded border border-gray-300 px-3 py-2 pr-7 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                          </div>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <input
                            type="date"
                            value={debt.expirationDate}
                            onChange={(e) => updateDebt(debt.id, 'expirationDate', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="p-3 border border-gray-300">
                          <div className="flex items-center gap-2">
                            {editingDebtId === debt.id ? (
                              <button
                                onClick={() => saveDebt(debt.id)}
                                className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                                title="Save"
                              >
                                <Save size={16} />
                              </button>
                            ) : (
                              <button
                                onClick={() => startEditDebt(debt.id)}
                                className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                title="Edit"
                              >
                                <Edit2 size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => handleRemoveDebt(debt.id)}
                              className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={9} className="p-4 border border-gray-300">
                        <button 
                          onClick={handleAddDebt}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        >
                          <Plus size={16} />
                          <span> Add Debt</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ROUND BY ROUND VIEW */
        <div className="space-y-8">
          {/* Priced Rounds Section */}
          <div className="bg-white rounded-xl border border-gray-300 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Priced Rounds</h3>
              
              {formData.pricedRounds.map((round: any, index: number) => (
                <div key={round.id} className="mb-6">
                  <div 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleRoundExpansion(index)}
                  >
                    <div className="flex items-center gap-4">
                      <h4 className="text-lg font-semibold text-gray-900">{round.roundName}</h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemovePricedRound(round.id);
                        }}
                        className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                        title="Delete Round"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">${formatNumber(round.investmentAmount)} • {formatNumber(round.ownership)} shares</span>
                      {expandedRounds.includes(index) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                  
                  {expandedRounds.includes(index) && (
                    <div className="mt-4 p-6 border border-gray-300 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Investment Date</label>
                          <input
                            type="date"
                            value={round.investmentDate}
                            onChange={(e) => updatePricedRound(round.id, 'investmentDate', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                            <input
                              type="number"
                              value={round.investmentAmount}
                              onChange={(e) => updatePricedRound(round.id, 'investmentAmount', parseInt(e.target.value) || 0)}
                              className="w-full rounded-lg border border-gray-300 pl-7 pr-3 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Liquidation Preference</label>
                          <div className="relative">
                            <input
                              type="number"
                              step="0.1"
                              value={round.liquidationPreference}
                              onChange={(e) => updatePricedRound(round.id, 'liquidationPreference', parseFloat(e.target.value) || 0)}
                              className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-7 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">x</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Ownership</label>
                          <input
                            type="number"
                            value={round.ownership}
                            onChange={(e) => updatePricedRound(round.id, 'ownership', parseInt(e.target.value) || 0)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Common Stock Participation</label>
                          <select
                            value={round.participation}
                            onChange={(e) => updatePricedRound(round.id, 'participation', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          >
                            <option>Participating / Converting</option>
                            <option>Non-participating</option>
                            <option>Capped</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">QPO Threshold</label>
                          <div className="relative">
                            <input
                              type="number"
                              value={round.qpoThreshold}
                              onChange={(e) => updatePricedRound(round.id, 'qpoThreshold', parseInt(e.target.value) || 0)}
                              className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-7 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                          </div>
                        </div>
                      </div>

                      {/* Additional Round A Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Dividends</label>
                          <select
                            value={round.dividends}
                            onChange={(e) => updatePricedRound(round.id, 'dividends', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          >
                            <option>Simulate</option>
                            <option>Non-cumulative</option>
                            <option>Cumulative</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Antidilution Provision</label>
                          <select
                            value={round.antidilution}
                            onChange={(e) => updatePricedRound(round.id, 'antidilution', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          >
                            <option>None</option>
                            <option>Full ratchet</option>
                            <option>Weighted average</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
                          <input
                            type="text"
                            value={round.comments}
                            onChange={(e) => updatePricedRound(round.id, 'comments', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      {/* Option Pool Section */}
                      <div className="mt-8 pt-6 border-t border-gray-300">
                        <h5 className="text-md font-semibold text-gray-900 mb-4">Option Pools {round.roundName}</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Allocated Options Immediately prior to round</label>
                            <input
                              type="number"
                              value={round.allocatedOptionsPrior}
                              onChange={(e) => updatePricedRound(round.id, 'allocatedOptionsPrior', parseInt(e.target.value) || 0)}
                              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Unallocated Options Immediately prior to round</label>
                            <input
                              type="number"
                              value={round.unallocatedOptionsPrior}
                              onChange={(e) => updatePricedRound(round.id, 'unallocatedOptionsPrior', parseInt(e.target.value) || 0)}
                              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Requested Available Option Pool Post-Round</label>
                            <div className="relative">
                              <input
                                type="number"
                                value={round.requestedOptionPool}
                                onChange={(e) => updatePricedRound(round.id, 'requestedOptionPool', parseInt(e.target.value) || 0)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-7 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                              />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">My Funds Investment in This Round</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                              <input
                                type="number"
                                value={round.myInvestment}
                                onChange={(e) => updatePricedRound(round.id, 'myInvestment', parseInt(e.target.value) || 0)}
                                className="w-full rounded-lg border border-gray-300 pl-7 pr-3 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Add New Round Button */}
              <div className="mt-4">
                <button 
                  onClick={handleAddPricedRound}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  <Plus size={16} />
                  <span> Add Priced Round</span>
                </button>
              </div>
            </div>
          </div>

          {/* Founders Shares and Outstanding Options Section */}
          <div className="bg-white rounded-xl border border-gray-300 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Founders Shares and Outstanding Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Founders Outstanding Shares</label>
                  <input
                    type="number"
                    value={formData.foundersShares}
                    onChange={(e) => setFormData({...formData, foundersShares: parseInt(e.target.value) || 0})}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Allocated Options</label>
                  <input
                    type="number"
                    value={formData.allocatedOptions}
                    onChange={(e) => setFormData({...formData, allocatedOptions: parseInt(e.target.value) || 0})}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Unallocated Options</label>
                  <input
                    type="number"
                    value={formData.unallocatedOptions}
                    onChange={(e) => setFormData({...formData, unallocatedOptions: parseInt(e.target.value) || 0})}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Outstanding Debt Section */}
          <div className="bg-white rounded-xl border border-gray-300 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Outstanding Debt</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Round Name</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Payment Nature</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Issuance Date</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Principal Amount</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Interest Type</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Interest Frequency</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Interest Rate</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Expiration Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.debtRounds.map((debt: any) => (
                      <tr key={debt.id} className="hover:bg-gray-50">
                        <td className="p-3 border border-gray-300">{debt.roundName || 'N/A'}</td>
                        <td className="p-3 border border-gray-300">{debt.paymentNature || 'N/A'}</td>
                        <td className="p-3 border border-gray-300">{debt.issuanceDate || 'N/A'}</td>
                        <td className="p-3 border border-gray-300">${formatNumber(debt.principalAmount)}</td>
                        <td className="p-3 border border-gray-300">{debt.interestType || 'N/A'}</td>
                        <td className="p-3 border border-gray-300">{debt.interestFrequency || 'N/A'}</td>
                        <td className="p-3 border border-gray-300">{debt.interestRate || 0}%</td>
                        <td className="p-3 border border-gray-300">{debt.expirationDate || 'N/A'}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={8} className="p-4 border border-gray-300">
                        <button 
                          onClick={handleAddDebt}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        >
                          <Plus size={16} />
                          <span> Add Debt</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Unpriced Rounds Section */}
          <div className="bg-white rounded-xl border border-gray-300 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Unpriced Rounds (SAFEs and Convertible Notes)</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Round Name</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Type</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Investment Date</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Investment Amount</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">PMV Cap</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Discount</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 border border-gray-300">Interest Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.safeNotes.map((note: any) => (
                      <tr key={note.id} className="hover:bg-gray-50">
                        <td className="p-3 border border-gray-300">{note.roundName || 'N/A'}</td>
                        <td className="p-3 border border-gray-300">{note.type || 'N/A'}</td>
                        <td className="p-3 border border-gray-300">{note.investmentDate || 'N/A'}</td>
                        <td className="p-3 border border-gray-300">${formatNumber(note.investmentAmount)}</td>
                        <td className="p-3 border border-gray-300">${formatNumber(note.pmvCap)}</td>
                        <td className="p-3 border border-gray-300">{note.discount || 0}%</td>
                        <td className="p-3 border border-gray-300">{note.interestRate || 0}%</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={7} className="p-4 border border-gray-300">
                        <button 
                          onClick={handleAddSafeNote}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        >
                          <Plus size={16} />
                          <span> Add SAFE/Convertible Note</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-300">
        <button 
          onClick={onStepBack}
          className="rounded-full border border-gray-300 bg-white px-8 py-3 font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <div className="flex gap-4">
          <button 
            onClick={saveProgress}
            className="rounded-full border border-gray-300 bg-white px-8 py-3 font-medium text-gray-700 hover:bg-gray-50"
          >
            Save progress
          </button>
          <button 
            onClick={onStepBack}
            className="rounded-full border border-gray-300 bg-white px-8 py-3 font-medium text-gray-700 hover:bg-gray-50"
          >
            Step back
          </button>
          <button 
            onClick={() => onContinue(formData)}
            className="rounded-full bg-[#2d63ff] px-8 py-3 font-medium text-white hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1PriorInvestment;