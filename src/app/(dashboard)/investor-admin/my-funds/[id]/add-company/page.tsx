// app/(dashboard)/investor-admin/my-funds/[id]/add-company/page.tsx
"use client";
import React, { useState } from "react";
import { ArrowLeft, Save, X, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

export default function PortfolioCompanyInvestmentPage() {
  const router = useRouter();
  const params = useParams();
  
  // Get the fundId from params with safety check
  const fundId = (params?.id || "") as string;
  const fundTitle = fundId ? fundId.split("-").join(" ").toUpperCase() : "NEXUS CAPITAL";

  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState<"latest" | "round">("latest");
  
  // Cap Table State
  const [capTable, setCapTable] = useState<any[]>([
    {
      stakeholder: "Founders",
      roundName: "Founders",
      investmentDate: "",
      investmentAmount: "",
      commonShares: "100,000",
      preferredShares: "",
      liquidationPreferences: "",
      participation: "",
      dividendType: "",
      dividend: "",
    },
  ]);

  // SAFEs State
  const [safes, setSafes] = useState([
    {
      id: 1,
      roundName: "Safe A",
      type: "Pre-Money Safe",
      investmentDate: "",
      amount: "$150,000",
      pmvCap: "",
      discount: "20%",
      interestRate: "",
      mfn: false,
      proRata: false,
    },
    {
      id: 2,
      roundName: "Safe B",
      type: "Pre-Money Safe",
      investmentDate: "",
      amount: "$100,000",
      pmvCap: "$10,000,000",
      discount: "",
      interestRate: "",
      mfn: false,
      proRata: false,
    },
  ]);

  // Debt State
  const [debts, setDebts] = useState([
    {
      id: 1,
      roundName: "Debt Round I",
      type: "Convertible",
      investmentDate: "",
      investmentAmount: "$150,000",
      interestType: "",
      interestFrequency: "",
      interestRate: "8%",
      purchaseOption: false,
      timing: "20%",
    },
    {
      id: 2,
      roundName: "Debt Round II",
      type: "PIK",
      investmentDate: "",
      investmentAmount: "$100,000",
      interestType: "",
      interestFrequency: "",
      interestRate: "12%",
      purchaseOption: false,
      timing: "20%",
    },
  ]);

  // Priced Rounds State
  const [pricedRounds, setPricedRounds] = useState([
    {
      id: 1,
      name: "Round A",
      investmentDate: "7/8/2025",
      investmentAmount: "$1,000,000",
      liquidationPreference: "1.2x",
      ownership: "500,000",
      commonStockParticipation: "Participating / Converting",
      qpoThreshold: "",
      cap: "",
      dividends: "Semi-A 4%",
      antidilutionProvision: "N/A",
      narrowBased: "",
      comments: "A 16Z Lead Investor",
    },
    {
      id: 2,
      name: "Series B",
      investmentDate: "7/8/2025",
      investmentAmount: "$1,000,000",
      liquidationPreference: "1.2x",
      ownership: "500,000",
      commonStockParticipation: "Participating / Converting",
      qpoThreshold: "",
      cap: "",
      dividends: "Semi-A 4%",
      antidilutionProvision: "N/A",
      narrowBased: "",
      comments: "A 16Z Lead Investor",
    },
  ]);

  // Option Pools State
  const [optionPools, setOptionPools] = useState([
    {
      id: 1,
      series: "Series A",
      allocatedOptions: "5,000",
      unallocatedOptions: "7,500",
      requestedPool: "10%",
    },
    {
      id: 2,
      series: "Series B",
      allocatedOptions: "5,000",
      unallocatedOptions: "7,500",
      requestedPool: "10%",
    },
  ]);

  // Cap Table Summary State
  const [capTableSummary, setCapTableSummary] = useState([
    {
      id: 1,
      name: "Founders",
      investors: "Activest III, Seq1 Specify Investor",
      commonStock: "100,000",
      stockOptions: "10,000",
      seriesAPreferred: "",
      seriesBPreferred: "",
      fullyDilutedShare: "110,000",
      nominalOwnership: "10.8%",
      pricePerShare: "10.8",
    },
    {
      id: 2,
      name: "Unallocated Options",
      investors: "Activest III, Seq1 Specify Investor",
      commonStock: "10,000",
      stockOptions: "",
      seriesAPreferred: "",
      seriesBPreferred: "",
      fullyDilutedShare: "10,000",
      nominalOwnership: "1.0%",
      pricePerShare: "1.0",
    },
    {
      id: 3,
      name: "Series A ✓",
      investors: "Activest III, Seq1 Specify Investor",
      commonStock: "500,000",
      stockOptions: "",
      seriesAPreferred: "",
      seriesBPreferred: "",
      fullyDilutedShare: "500,000",
      nominalOwnership: "49.0%",
      pricePerShare: "49.0",
    },
    {
      id: 4,
      name: "Series B ✓",
      investors: "Activest III, Seq1 Specify Investor",
      commonStock: "",
      stockOptions: "",
      seriesAPreferred: "400,000",
      seriesBPreferred: "400,000",
      fullyDilutedShare: "",
      nominalOwnership: "39.2%",
      pricePerShare: "39.2",
    },
  ]);

  // Seniority State
  const [debtSeniority, setDebtSeniority] = useState([
    { id: 1, name: "Senior Debt", level: 1 },
    { id: 2, name: "Junior Debt", level: 2 },
    { id: 3, name: "Junior Subordinated Debt", level: 3 },
  ]);

  const [equitySeniority, setEquitySeniority] = useState([
    { id: 1, name: "Series D", level: 1 },
    { id: 2, name: "Series B", level: 2 },
    { id: 3, name: "Series A", level: 3 },
  ]);

  // Founders and Options State
  const [foundersData, setFoundersData] = useState({
    foundersShares: "100,000",
    allocatedOptions: "20,000",
    unallocatedOptions: "20,000",
  });

  // Round by Round State
  const [roundByRoundData, setRoundByRoundData] = useState([
    {
      id: 1,
      roundName: "Safe A",
      type: "Pre-Maturity Sale",
      investmentDate: "",
      amount: "$150,000",
      pmvCap: "",
      discount: "22%",
      interestRate: "",
      isoNo: "",
      priceTableHighlights: "",
    },
    {
      id: 2,
      roundName: "Safe B",
      type: "Pre-Maturity Sale",
      investmentDate: "",
      amount: "$190,000",
      pmvCap: "$10,000",
      discount: "$10,000",
      interestRate: "",
      isoNo: "",
      priceTableHighlights: "",
    },
  ]);

  const [debtRounds, setDebtRounds] = useState([
    {
      id: 1,
      roundName: "Debt Round 1",
      type: "Convertible",
      investmentDate: "",
      amount: "$150,000",
      interestTier: "",
      interestProgram: "",
      interestRate: "6%",
      purchaseOption: "20%",
    },
    {
      id: 2,
      roundName: "Debt Round 2",
      type: "IPR",
      investmentDate: "",
      amount: "$190,000",
      interestTier: "",
      interestProgram: "",
      interestRate: "12%",
      purchaseOption: "20%",
    },
  ]);

  const [pricedRoundsRound, setPricedRoundsRound] = useState([
    {
      id: 1,
      name: "Round A",
      investmentDate: "7/01/2025",
      investmentTier: "3/18/2025",
      amount: "$1,800,000",
      lapsedPeriod: "1 Year",
      conversion: "500,000",
      contractTerm: "100%",
      qboOverdraft1: "",
      qboOverdraft2: "",
      equity: "",
      convertible: "",
      stock: "",
      anticipation: "",
      reserveBased: "",
      concession: "",
      leadInvestor: "A 10% Lead Investor",
    },
    {
      id: 2,
      name: "Series B",
      investmentDate: "3/18/2025",
      investmentTier: "3/18/2025",
      amount: "$1,800,000",
      lapsedPeriod: "1 Year",
      conversion: "500,000",
      contractTerm: "100%",
      qboOverdraft1: "",
      qboOverdraft2: "",
      equity: "",
      convertible: "",
      stock: "",
      anticipation: "",
      reserveBased: "",
      concession: "",
      leadInvestor: "A 10% Lead Investor",
    },
  ]);

  const [optionPoolsRound, setOptionPoolsRound] = useState([
    {
      id: 1,
      series: "Series A",
      description: "Anticipated option terminology up to total $2000",
      unallocated: "Unallocated Optise invested under an earn out plan",
      expanded: "Expanded available Common/Preferred Shares: 10%",
      button: "Add investor details",
    },
    {
      id: 2,
      series: "Series B",
      description: "Anticipated optise terminology up to total $3000",
      unallocated: "Unallocated Optise invested under an earn out plan",
      expanded: "Expanded Optise Plan: 10%",
      button: "Add investor details",
    },
  ]);

  const [foundersRound, setFoundersRound] = useState({
    outstandingShares: "168,000",
    allocatedOptions: "28,000",
    unallocatedOptions: "33,000",
  });

  // Handlers
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save and go back
      alert("Portfolio company added successfully!");
      router.back();
    }
  };

  const handleSave = () => {
    // Save progress logic
    console.log("Saving progress...");
    alert("Progress saved!");
  };

  const handleAddCapTableRow = () => {
    setCapTable([
      ...capTable,
      {
        stakeholder: "",
        roundName: "",
        investmentDate: "",
        investmentAmount: "",
        commonShares: "",
        preferredShares: "",
        liquidationPreferences: "",
        participation: "",
        dividendType: "",
        dividend: "",
      },
    ]);
  };

  const handleAddSafe = () => {
    setSafes([
      ...safes,
      {
        id: safes.length + 1,
        roundName: "",
        type: "Pre-Money Safe",
        investmentDate: "",
        amount: "",
        pmvCap: "",
        discount: "",
        interestRate: "",
        mfn: false,
        proRata: false,
      },
    ]);
  };

  const handleAddDebt = () => {
    setDebts([
      ...debts,
      {
        id: debts.length + 1,
        roundName: "",
        type: "Convertible",
        investmentDate: "",
        investmentAmount: "",
        interestType: "",
        interestFrequency: "",
        interestRate: "",
        purchaseOption: false,
        timing: "",
      },
    ]);
  };

  const handleAddPricedRound = () => {
    setPricedRounds([
      ...pricedRounds,
      {
        id: pricedRounds.length + 1,
        name: `Round ${String.fromCharCode(65 + pricedRounds.length)}`,
        investmentDate: "",
        investmentAmount: "",
        liquidationPreference: "",
        ownership: "",
        commonStockParticipation: "Participating / Converting",
        qpoThreshold: "",
        cap: "",
        dividends: "",
        antidilutionProvision: "N/A",
        narrowBased: "",
        comments: "",
      },
    ]);
  };

  const handleMoveSeniority = (type: "debt" | "equity", id: number, direction: "up" | "down") => {
    if (type === "debt") {
      const newSeniority = [...debtSeniority];
      const currentIndex = newSeniority.findIndex(item => item.id === id);
      const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
      
      if (swapIndex >= 0 && swapIndex < newSeniority.length) {
        [newSeniority[currentIndex], newSeniority[swapIndex]] = 
        [newSeniority[swapIndex], newSeniority[currentIndex]];
        
        // Update levels
        newSeniority.forEach((item, index) => {
          item.level = index + 1;
        });
        
        setDebtSeniority(newSeniority);
      }
    } else {
      const newSeniority = [...equitySeniority];
      const currentIndex = newSeniority.findIndex(item => item.id === id);
      const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
      
      if (swapIndex >= 0 && swapIndex < newSeniority.length) {
        [newSeniority[currentIndex], newSeniority[swapIndex]] = 
        [newSeniority[swapIndex], newSeniority[currentIndex]];
        
        // Update levels
        newSeniority.forEach((item, index) => {
          item.level = index + 1;
        });
        
        setEquitySeniority(newSeniority);
      }
    }
  };

  // Add handlers for round by round sections
  const handleAddSafeRound = () => {
    setRoundByRoundData([
      ...roundByRoundData,
      {
        id: roundByRoundData.length + 1,
        roundName: "",
        type: "Pre-Maturity Sale",
        investmentDate: "",
        amount: "",
        pmvCap: "",
        discount: "",
        interestRate: "",
        isoNo: "",
        priceTableHighlights: "",
      },
    ]);
  };

  const handleAddDebtRound = () => {
    setDebtRounds([
      ...debtRounds,
      {
        id: debtRounds.length + 1,
        roundName: "",
        type: "Convertible",
        investmentDate: "",
        amount: "",
        interestTier: "",
        interestProgram: "",
        interestRate: "",
        purchaseOption: "",
      },
    ]);
  };

  const handleAddPricedRoundRound = () => {
    setPricedRoundsRound([
      ...pricedRoundsRound,
      {
        id: pricedRoundsRound.length + 1,
        name: `Round ${String.fromCharCode(65 + pricedRoundsRound.length)}`,
        investmentDate: "",
        investmentTier: "",
        amount: "",
        lapsedPeriod: "",
        conversion: "",
        contractTerm: "",
        qboOverdraft1: "",
        qboOverdraft2: "",
        equity: "",
        convertible: "",
        stock: "",
        anticipation: "",
        reserveBased: "",
        concession: "",
        leadInvestor: "",
      },
    ]);
  };

  const handleAddOptionPoolRound = () => {
    setOptionPoolsRound([
      ...optionPoolsRound,
      {
        id: optionPoolsRound.length + 1,
        series: `Series ${String.fromCharCode(65 + optionPoolsRound.length)}`,
        description: "",
        unallocated: "",
        expanded: "",
        button: "Add investor details",
      },
    ]);
  };

  // Render Step 1 - Latest Cap Table
  const renderStep1Latest = () => (
    <div className="space-y-8">
      {/* Current Cap Table */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-900 mb-4">Current Cap Table (Prior to New Simulated Round)</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Stakeholder</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Round Name</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Investment Date</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Investment Amount</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Common Shares</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Preferred Shares</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Liquidation Preferences</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Participation</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Dividend Type</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Dividend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {capTable.map((row, index) => (
                <tr key={index}>
                  <td className="p-3">
                    <input
                      type="text"
                      value={row.stakeholder}
                      onChange={(e) => {
                        const newTable = [...capTable];
                        newTable[index].stakeholder = e.target.value;
                        setCapTable(newTable);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="e.g., Founders"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={row.roundName}
                      onChange={(e) => {
                        const newTable = [...capTable];
                        newTable[index].roundName = e.target.value;
                        setCapTable(newTable);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="e.g., Seed Round"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="date"
                      value={row.investmentDate}
                      onChange={(e) => {
                        const newTable = [...capTable];
                        newTable[index].investmentDate = e.target.value;
                        setCapTable(newTable);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={row.investmentAmount}
                      onChange={(e) => {
                        const newTable = [...capTable];
                        newTable[index].investmentAmount = e.target.value;
                        setCapTable(newTable);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="e.g., $1,000,000"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={row.commonShares}
                      onChange={(e) => {
                        const newTable = [...capTable];
                        newTable[index].commonShares = e.target.value;
                        setCapTable(newTable);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="e.g., 100,000"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={row.preferredShares}
                      onChange={(e) => {
                        const newTable = [...capTable];
                        newTable[index].preferredShares = e.target.value;
                        setCapTable(newTable);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="e.g., 50,000"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={row.liquidationPreferences}
                      onChange={(e) => {
                        const newTable = [...capTable];
                        newTable[index].liquidationPreferences = e.target.value;
                        setCapTable(newTable);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="e.g., 1x"
                    />
                  </td>
                  <td className="p-3">
                    <select
                      value={row.participation}
                      onChange={(e) => {
                        const newTable = [...capTable];
                        newTable[index].participation = e.target.value;
                        setCapTable(newTable);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option value="">Select</option>
                      <option value="Participating">Participating</option>
                      <option value="Non-participating">Non-participating</option>
                      <option value="Capped">Capped</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <select
                      value={row.dividendType}
                      onChange={(e) => {
                        const newTable = [...capTable];
                        newTable[index].dividendType = e.target.value;
                        setCapTable(newTable);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option value="">Select</option>
                      <option value="Cumulative">Cumulative</option>
                      <option value="Non-cumulative">Non-cumulative</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={row.dividend}
                      onChange={(e) => {
                        const newTable = [...capTable];
                        newTable[index].dividend = e.target.value;
                        setCapTable(newTable);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="e.g., 8%"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleAddCapTableRow}
          className="mt-4 px-4 py-2 text-blue-600 text-sm font-medium border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          + Add Row
        </button>
      </div>

      {/* SAFEs Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-900">Are there any outstanding SAFEs or Convertible Notes that have not converted?</h3>
          <button
            onClick={handleAddSafe}
            className="text-blue-600 text-sm font-medium"
          >
            + Add SAFE
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Round Name</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Investment Date</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">PMV Cap</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Discount</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Interest Rate</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">MFN</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Pro Rata Rights</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {safes.map((safe, index) => (
                <tr key={safe.id}>
                  <td className="p-3">
                    <input
                      type="text"
                      value={safe.roundName}
                      onChange={(e) => {
                        const newSafes = [...safes];
                        newSafes[index].roundName = e.target.value;
                        setSafes(newSafes);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="p-3">
                    <select
                      value={safe.type}
                      onChange={(e) => {
                        const newSafes = [...safes];
                        newSafes[index].type = e.target.value;
                        setSafes(newSafes);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option>Pre-Money Safe</option>
                      <option>Post-Money Safe</option>
                      <option>Convertible Note</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <input
                      type="date"
                      value={safe.investmentDate}
                      onChange={(e) => {
                        const newSafes = [...safes];
                        newSafes[index].investmentDate = e.target.value;
                        setSafes(newSafes);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={safe.amount}
                      onChange={(e) => {
                        const newSafes = [...safes];
                        newSafes[index].amount = e.target.value;
                        setSafes(newSafes);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={safe.pmvCap}
                      onChange={(e) => {
                        const newSafes = [...safes];
                        newSafes[index].pmvCap = e.target.value;
                        setSafes(newSafes);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={safe.discount}
                      onChange={(e) => {
                        const newSafes = [...safes];
                        newSafes[index].discount = e.target.value;
                        setSafes(newSafes);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={safe.interestRate}
                      onChange={(e) => {
                        const newSafes = [...safes];
                        newSafes[index].interestRate = e.target.value;
                        setSafes(newSafes);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={safe.mfn}
                      onChange={(e) => {
                        const newSafes = [...safes];
                        newSafes[index].mfn = e.target.checked;
                        setSafes(newSafes);
                      }}
                      className="w-4 h-4 border border-gray-300"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={safe.proRata}
                      onChange={(e) => {
                        const newSafes = [...safes];
                        newSafes[index].proRata = e.target.checked;
                        setSafes(newSafes);
                      }}
                      className="w-4 h-4 border border-gray-300"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Debt Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-900">Is there any outstanding debt?</h3>
          <button
            onClick={handleAddDebt}
            className="text-blue-600 text-sm font-medium"
          >
            + Add Debt
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Round Name</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Investment Date</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Investment Amount</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Interest Type</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Interest Frequency</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Interest Rate</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Purchase Option</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Timing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {debts.map((debt, index) => (
                <tr key={debt.id}>
                  <td className="p-3">
                    <input
                      type="text"
                      value={debt.roundName}
                      onChange={(e) => {
                        const newDebts = [...debts];
                        newDebts[index].roundName = e.target.value;
                        setDebts(newDebts);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="p-3">
                    <select
                      value={debt.type}
                      onChange={(e) => {
                        const newDebts = [...debts];
                        newDebts[index].type = e.target.value;
                        setDebts(newDebts);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option>Convertible</option>
                      <option>PIK</option>
                      <option>Senior Debt</option>
                      <option>Junior Debt</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <input
                      type="date"
                      value={debt.investmentDate}
                      onChange={(e) => {
                        const newDebts = [...debts];
                        newDebts[index].investmentDate = e.target.value;
                        setDebts(newDebts);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={debt.investmentAmount}
                      onChange={(e) => {
                        const newDebts = [...debts];
                        newDebts[index].investmentAmount = e.target.value;
                        setDebts(newDebts);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={debt.interestType}
                      onChange={(e) => {
                        const newDebts = [...debts];
                        newDebts[index].interestType = e.target.value;
                        setDebts(newDebts);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={debt.interestFrequency}
                      onChange={(e) => {
                        const newDebts = [...debts];
                        newDebts[index].interestFrequency = e.target.value;
                        setDebts(newDebts);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={debt.interestRate}
                      onChange={(e) => {
                        const newDebts = [...debts];
                        newDebts[index].interestRate = e.target.value;
                        setDebts(newDebts);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={debt.purchaseOption}
                      onChange={(e) => {
                        const newDebts = [...debts];
                        newDebts[index].purchaseOption = e.target.checked;
                        setDebts(newDebts);
                      }}
                      className="w-4 h-4 border border-gray-300"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={debt.timing}
                      onChange={(e) => {
                        const newDebts = [...debts];
                        newDebts[index].timing = e.target.value;
                        setDebts(newDebts);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render Step 1 - Round by Round
  const renderStep1Round = () => (
    <div className="space-y-8">
      {/* Founders Shares and Outstanding Options */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-900 mb-6">Founders Shares and Outstanding Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Founders Outstanding Shares</label>
            <input
              type="text"
              value={foundersRound.outstandingShares}
              onChange={(e) => setFoundersRound({...foundersRound, outstandingShares: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Allocated Options</label>
            <input
              type="text"
              value={foundersRound.allocatedOptions}
              onChange={(e) => setFoundersRound({...foundersRound, allocatedOptions: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Unallocated Options</label>
            <input
              type="text"
              value={foundersRound.unallocatedOptions}
              onChange={(e) => setFoundersRound({...foundersRound, unallocatedOptions: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Outstanding Debt */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-900">Outstanding Debt</h3>
          <button
            onClick={handleAddDebtRound}
            className="text-blue-600 text-sm font-medium"
          >
            + Add Debt
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Round Name</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Investment Date</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Investment Amount</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Interest Tier</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Interest Program</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Interest Rate</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Purchase Option</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {debtRounds.map((debt, index) => (
                <tr key={debt.id}>
                  <td className="p-3">
                    <input
                      type="text"
                      value={debt.roundName}
                      onChange={(e) => {
                        const newDebts = [...debtRounds];
                        newDebts[index].roundName = e.target.value;
                        setDebtRounds(newDebts);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="e.g., Debt Round 1"
                    />
                  </td>
                  <td className="p-3">
                    <select
                      value={debt.type}
                      onChange={(e) => {
                        const newDebts = [...debtRounds];
                        newDebts[index].type = e.target.value;
                        setDebtRounds(newDebts);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option>Convertible</option>
                      <option>IPR</option>
                      <option>Senior Debt</option>
                      <option>Junior Debt</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <input
                      type="date"
                      value={debt.investmentDate}
                      onChange={(e) => {
                        const newDebts = [...debtRounds];
                        newDebts[index].investmentDate = e.target.value;
                        setDebtRounds(newDebts);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={debt.amount}
                      onChange={(e) => {
                        const newDebts = [...debtRounds];
                        newDebts[index].amount = e.target.value;
                        setDebtRounds(newDebts);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="e.g., $150,000"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={debt.interestTier}
                      onChange={(e) => {
                        const newDebts = [...debtRounds];
                        newDebts[index].interestTier = e.target.value;
                        setDebtRounds(newDebts);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={debt.interestProgram}
                      onChange={(e) => {
                        const newDebts = [...debtRounds];
                        newDebts[index].interestProgram = e.target.value;
                        setDebtRounds(newDebts);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={debt.interestRate}
                      onChange={(e) => {
                        const newDebts = [...debtRounds];
                        newDebts[index].interestRate = e.target.value;
                        setDebtRounds(newDebts);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="e.g., 6%"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={debt.purchaseOption}
                      onChange={(e) => {
                        const newDebts = [...debtRounds];
                        newDebts[index].purchaseOption = e.target.value;
                        setDebtRounds(newDebts);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="e.g., 20%"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Unpriced Rounds (SAFEs and Convertible Notes) */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-900">Unpriced Rounds (SAFEs and Convertible Notes)</h3>
          <button
            onClick={handleAddSafeRound}
            className="text-blue-600 text-sm font-medium"
          >
            + Add SAFE
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Round Name</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Investment Date</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">PMV Cap</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Discount</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Interest Rate</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">ISO No</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Price Table Highlights</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {roundByRoundData.map((safe, index) => (
                <tr key={safe.id}>
                  <td className="p-3">
                    <input
                      type="text"
                      value={safe.roundName}
                      onChange={(e) => {
                        const newSafes = [...roundByRoundData];
                        newSafes[index].roundName = e.target.value;
                        setRoundByRoundData(newSafes);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="e.g., Safe A"
                    />
                  </td>
                  <td className="p-3">
                    <select
                      value={safe.type}
                      onChange={(e) => {
                        const newSafes = [...roundByRoundData];
                        newSafes[index].type = e.target.value;
                        setRoundByRoundData(newSafes);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option>Pre-Maturity Sale</option>
                      <option>Post-Money Safe</option>
                      <option>Convertible Note</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <input
                      type="date"
                      value={safe.investmentDate}
                      onChange={(e) => {
                        const newSafes = [...roundByRoundData];
                        newSafes[index].investmentDate = e.target.value;
                        setRoundByRoundData(newSafes);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={safe.amount}
                      onChange={(e) => {
                        const newSafes = [...roundByRoundData];
                        newSafes[index].amount = e.target.value;
                        setRoundByRoundData(newSafes);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="e.g., $150,000"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={safe.pmvCap}
                      onChange={(e) => {
                        const newSafes = [...roundByRoundData];
                        newSafes[index].pmvCap = e.target.value;
                        setRoundByRoundData(newSafes);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="e.g., $10,000,000"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={safe.discount}
                      onChange={(e) => {
                        const newSafes = [...roundByRoundData];
                        newSafes[index].discount = e.target.value;
                        setRoundByRoundData(newSafes);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="e.g., 22%"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={safe.interestRate}
                      onChange={(e) => {
                        const newSafes = [...roundByRoundData];
                        newSafes[index].interestRate = e.target.value;
                        setRoundByRoundData(newSafes);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="e.g., 5%"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={safe.isoNo}
                      onChange={(e) => {
                        const newSafes = [...roundByRoundData];
                        newSafes[index].isoNo = e.target.value;
                        setRoundByRoundData(newSafes);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={safe.priceTableHighlights}
                      onChange={(e) => {
                        const newSafes = [...roundByRoundData];
                        newSafes[index].priceTableHighlights = e.target.value;
                        setRoundByRoundData(newSafes);
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Priced Rounds */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-900">Priced Rounds</h3>
          <button
            onClick={handleAddPricedRoundRound}
            className="text-blue-600 text-sm font-medium"
          >
            + Add Priced Round
          </button>
        </div>
        
        {pricedRoundsRound.map((round, index) => (
          <div key={round.id} className="mb-8 border border-gray-200 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 mb-6">{round.name}</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Investment Date</th>
                    <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Investment Tier</th>
                    <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Investment Amount</th>
                    <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Lapsed Performance Period</th>
                    <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Conversion</th>
                    <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Contract term percentage</th>
                    <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">QBO Overdraft</th>
                    <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">QBO Overdraft</th>
                    <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Equity</th>
                    <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Convertible</th>
                    <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Stock</th>
                    <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Anticipation Provisions</th>
                    <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Reserve Based</th>
                    <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Concession</th>
                    <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">A 10% Lead Investor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3">
                      <input
                        type="text"
                        value={round.investmentDate}
                        onChange={(e) => {
                          const newRounds = [...pricedRoundsRound];
                          newRounds[index].investmentDate = e.target.value;
                          setPricedRoundsRound(newRounds);
                        }}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="e.g., 7/01/2025"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={round.investmentTier}
                        onChange={(e) => {
                          const newRounds = [...pricedRoundsRound];
                          newRounds[index].investmentTier = e.target.value;
                          setPricedRoundsRound(newRounds);
                        }}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="e.g., 3/18/2025"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={round.amount}
                        onChange={(e) => {
                          const newRounds = [...pricedRoundsRound];
                          newRounds[index].amount = e.target.value;
                          setPricedRoundsRound(newRounds);
                        }}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="e.g., $1,800,000"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={round.lapsedPeriod}
                        onChange={(e) => {
                          const newRounds = [...pricedRoundsRound];
                          newRounds[index].lapsedPeriod = e.target.value;
                          setPricedRoundsRound(newRounds);
                        }}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="e.g., 1 Year"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={round.conversion}
                        onChange={(e) => {
                          const newRounds = [...pricedRoundsRound];
                          newRounds[index].conversion = e.target.value;
                          setPricedRoundsRound(newRounds);
                        }}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="e.g., 500,000"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={round.contractTerm}
                        onChange={(e) => {
                          const newRounds = [...pricedRoundsRound];
                          newRounds[index].contractTerm = e.target.value;
                          setPricedRoundsRound(newRounds);
                        }}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="e.g., 100%"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={round.qboOverdraft1}
                        onChange={(e) => {
                          const newRounds = [...pricedRoundsRound];
                          newRounds[index].qboOverdraft1 = e.target.value;
                          setPricedRoundsRound(newRounds);
                        }}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={round.qboOverdraft2}
                        onChange={(e) => {
                          const newRounds = [...pricedRoundsRound];
                          newRounds[index].qboOverdraft2 = e.target.value;
                          setPricedRoundsRound(newRounds);
                        }}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={round.equity}
                        onChange={(e) => {
                          const newRounds = [...pricedRoundsRound];
                          newRounds[index].equity = e.target.value;
                          setPricedRoundsRound(newRounds);
                        }}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={round.convertible}
                        onChange={(e) => {
                          const newRounds = [...pricedRoundsRound];
                          newRounds[index].convertible = e.target.value;
                          setPricedRoundsRound(newRounds);
                        }}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={round.stock}
                        onChange={(e) => {
                          const newRounds = [...pricedRoundsRound];
                          newRounds[index].stock = e.target.value;
                          setPricedRoundsRound(newRounds);
                        }}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={round.anticipation}
                        onChange={(e) => {
                          const newRounds = [...pricedRoundsRound];
                          newRounds[index].anticipation = e.target.value;
                          setPricedRoundsRound(newRounds);
                        }}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={round.reserveBased}
                        onChange={(e) => {
                          const newRounds = [...pricedRoundsRound];
                          newRounds[index].reserveBased = e.target.value;
                          setPricedRoundsRound(newRounds);
                        }}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={round.concession}
                        onChange={(e) => {
                          const newRounds = [...pricedRoundsRound];
                          newRounds[index].concession = e.target.value;
                          setPricedRoundsRound(newRounds);
                        }}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={round.leadInvestor}
                        onChange={(e) => {
                          const newRounds = [...pricedRoundsRound];
                          newRounds[index].leadInvestor = e.target.value;
                          setPricedRoundsRound(newRounds);
                        }}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="e.g., A 10% Lead Investor"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* Option Pools */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">Option Pools</h3>
            <button
              onClick={handleAddOptionPoolRound}
              className="text-blue-600 text-sm font-medium"
            >
              + Add Option Pool
            </button>
          </div>
          
          {optionPoolsRound.map((pool, index) => (
            <div key={pool.id} className="mb-8 border border-gray-200 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-6">{pool.series}</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={pool.description}
                    onChange={(e) => {
                      const newPools = [...optionPoolsRound];
                      newPools[index].description = e.target.value;
                      setOptionPoolsRound(newPools);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    placeholder="e.g., Anticipated option terminology up to total $2000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unallocated Options</label>
                  <input
                    type="text"
                    value={pool.unallocated}
                    onChange={(e) => {
                      const newPools = [...optionPoolsRound];
                      newPools[index].unallocated = e.target.value;
                      setOptionPoolsRound(newPools);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    placeholder="e.g., Unallocated Optise invested under an earn out plan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expanded Options</label>
                  <input
                    type="text"
                    value={pool.expanded}
                    onChange={(e) => {
                      const newPools = [...optionPoolsRound];
                      newPools[index].expanded = e.target.value;
                      setOptionPoolsRound(newPools);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    placeholder="e.g., Expanded available Common/Preferred Shares: 10%"
                  />
                </div>
                <div className="pt-4">
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    {pool.button}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render Step 1
  const renderStep1 = () => (
    <div className="space-y-8">
      {/* Prior Investment Information Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Portfolio Company Investment Information</h2>
        <h3 className="text-md font-semibold text-gray-700 mb-2">Step 1 of 3</h3>
        <div className="h-2 bg-gray-200 rounded-full mb-6">
          <div className="h-full bg-blue-600 rounded-full w-1/3"></div>
        </div>
        
        <h4 className="font-bold text-gray-900 mb-4">Prior Investment Information</h4>
        <p className="text-sm text-gray-600 mb-6">
          Enter all current funding for this company, including common shares held by founders and others, preferred shares held by investors and others, allocated and non allocated options, unpriced rounds and debt.
        </p>

        {/* Latest Cap Table Tabs */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("latest")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "latest"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Latest Cap Table
            </button>
            <button
              onClick={() => setActiveTab("round")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "round"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Round by Round
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            {activeTab === "latest" ? (
              <p>
                The Latest Cap Table entry method is easiest when the current shares outstanding of each share class are known and when the current number of allocated and unallocated options is known.
              </p>
            ) : (
              <p>
                The Round by Round entry method is practical when the terms of each round are known and the number of allocated and unallocated options immediately prior to a round can be estimated, but the current dilution effects are not known.
              </p>
            )}
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "latest" ? renderStep1Latest() : renderStep1Round()}
      </div>
    </div>
  );

  // Render Step 2
  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Portfolio Company Capitalization Table</h2>
        <h3 className="text-md font-semibold text-gray-700 mb-2">Step 2 of 3</h3>
        <div className="h-2 bg-gray-200 rounded-full mb-6">
          <div className="h-full bg-blue-600 rounded-full w-2/3"></div>
        </div>
        
        {/* Founders and Options */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-900 mb-6">Founders Shares and Outstanding Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Founders Outstanding Shares</label>
              <input
                type="text"
                value={foundersData.foundersShares}
                onChange={(e) => setFoundersData({...foundersData, foundersShares: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Allocated Options</label>
              <input
                type="text"
                value={foundersData.allocatedOptions}
                onChange={(e) => setFoundersData({...foundersData, allocatedOptions: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Unallocated Options</label>
              <input
                type="text"
                value={foundersData.unallocatedOptions}
                onChange={(e) => setFoundersData({...foundersData, unallocatedOptions: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Outstanding Debt */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-900 mb-6">Outstanding Debt</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Round Name</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Investment Amount</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Interest Rate</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Timing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {debts.map((debt) => (
                  <tr key={debt.id}>
                    <td className="p-3">{debt.roundName}</td>
                    <td className="p-3">{debt.type}</td>
                    <td className="p-3">{debt.investmentAmount}</td>
                    <td className="p-3">{debt.interestRate}</td>
                    <td className="p-3">{debt.timing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Unpriced Rounds (SAFEs and Convertible Notes) */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-900 mb-6">Unpriced Rounds (SAFEs and Convertible Notes)</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Round Name</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">PMV Cap</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Discount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {safes.map((safe) => (
                  <tr key={safe.id}>
                    <td className="p-3">{safe.roundName}</td>
                    <td className="p-3">{safe.type}</td>
                    <td className="p-3">{safe.amount}</td>
                    <td className="p-3">{safe.pmvCap}</td>
                    <td className="p-3">{safe.discount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Priced Rounds */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">Priced Rounds</h3>
            <button
              onClick={handleAddPricedRound}
              className="text-blue-600 text-sm font-medium"
            >
              + Add Priced Round
            </button>
          </div>
          
          {pricedRounds.map((round, index) => (
            <div key={round.id} className="mb-8 last:mb-0 border-b pb-6 last:border-b-0">
              <h4 className="font-bold text-gray-900 mb-4">{round.name}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Investment Date</label>
                  <input
                    type="text"
                    value={round.investmentDate}
                    onChange={(e) => {
                      const newRounds = [...pricedRounds];
                      newRounds[index].investmentDate = e.target.value;
                      setPricedRounds(newRounds);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount</label>
                  <input
                    type="text"
                    value={round.investmentAmount}
                    onChange={(e) => {
                      const newRounds = [...pricedRounds];
                      newRounds[index].investmentAmount = e.target.value;
                      setPricedRounds(newRounds);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Liquidation Preference</label>
                  <input
                    type="text"
                    value={round.liquidationPreference}
                    onChange={(e) => {
                      const newRounds = [...pricedRounds];
                      newRounds[index].liquidationPreference = e.target.value;
                      setPricedRounds(newRounds);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ownership</label>
                  <input
                    type="text"
                    value={round.ownership}
                    onChange={(e) => {
                      const newRounds = [...pricedRounds];
                      newRounds[index].ownership = e.target.value;
                      setPricedRounds(newRounds);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Common Stock Participation</label>
                  <select
                    value={round.commonStockParticipation}
                    onChange={(e) => {
                      const newRounds = [...pricedRounds];
                      newRounds[index].commonStockParticipation = e.target.value;
                      setPricedRounds(newRounds);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  >
                    <option>Participating / Converting</option>
                    <option>Non-participating</option>
                    <option>Cap</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dividends</label>
                  <input
                    type="text"
                    value={round.dividends}
                    onChange={(e) => {
                      const newRounds = [...pricedRounds];
                      newRounds[index].dividends = e.target.value;
                      setPricedRounds(newRounds);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Antidilution Provision</label>
                  <select
                    value={round.antidilutionProvision}
                    onChange={(e) => {
                      const newRounds = [...pricedRounds];
                      newRounds[index].antidilutionProvision = e.target.value;
                      setPricedRounds(newRounds);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  >
                    <option>N/A</option>
                    <option>Full Ratchet</option>
                    <option>Weighted Average</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
                  <input
                    type="text"
                    value={round.comments}
                    onChange={(e) => {
                      const newRounds = [...pricedRounds];
                      newRounds[index].comments = e.target.value;
                      setPricedRounds(newRounds);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Option Pools */}
          <div className="mt-8">
            <h3 className="font-bold text-gray-900 mb-6">Option Pools</h3>
            {optionPools.map((pool, index) => (
              <div key={pool.id} className="mb-6 last:mb-0">
                <h4 className="font-semibold text-gray-900 mb-4">{pool.series}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Allocated Options Immediately prior to round</label>
                    <input
                      type="text"
                      value={pool.allocatedOptions}
                      onChange={(e) => {
                        const newPools = [...optionPools];
                        newPools[index].allocatedOptions = e.target.value;
                        setOptionPools(newPools);
                      }}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unallocated Options Immediately prior to round</label>
                    <input
                      type="text"
                      value={pool.unallocatedOptions}
                      onChange={(e) => {
                        const newPools = [...optionPools];
                        newPools[index].unallocatedOptions = e.target.value;
                        setOptionPools(newPools);
                      }}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Requested Available Option Pool Post-Round</label>
                    <input
                      type="text"
                      value={pool.requestedPool}
                      onChange={(e) => {
                        const newPools = [...optionPools];
                        newPools[index].requestedPool = e.target.value;
                        setOptionPools(newPools);
                      }}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cap Table Summary */}
        <div className="mt-8">
          <h3 className="font-bold text-gray-900 mb-6">Cap Table Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Investors</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Common Stock</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Stock Options</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Series A Preferred</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Series B Preferred</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Fully Diluted Share</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Nominal Ownership</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase">Price/Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {capTableSummary.map((row) => (
                  <tr key={row.id}>
                    <td className="p-3 font-medium">{row.name}</td>
                    <td className="p-3">{row.investors}</td>
                    <td className="p-3">{row.commonStock}</td>
                    <td className="p-3">{row.stockOptions}</td>
                    <td className="p-3">{row.seriesAPreferred}</td>
                    <td className="p-3">{row.seriesBPreferred}</td>
                    <td className="p-3">{row.fullyDilutedShare}</td>
                    <td className="p-3">{row.nominalOwnership}</td>
                    <td className="p-3">{row.pricePerShare}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-bold">
                  <td className="p-3">Total</td>
                  <td className="p-3">Activest III, Seq1 Specify Investor</td>
                  <td className="p-3">100,000</td>
                  <td className="p-3">20,000</td>
                  <td className="p-3">500,000</td>
                  <td className="p-3">400,000</td>
                  <td className="p-3">1,020,000</td>
                  <td className="p-3">100.0%</td>
                  <td className="p-3">100.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Step 3
  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Step 3 of 3</h2>
        <div className="h-2 bg-gray-200 rounded-full mb-6">
          <div className="h-full bg-blue-600 rounded-full w-full"></div>
        </div>
        
        <h3 className="font-bold text-gray-900 mb-4">Seniority Selection</h3>
        <p className="text-sm text-gray-600 mb-8">
          Seniority represents the order in which debt is paid off or preferential returns are distributed. Share classes at the same level are considered pari passu.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Debt Seniority */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Debt Seniority</h3>
            <div className="space-y-2 mb-4">
              <div className="text-xs text-gray-500 font-semibold">Receives First</div>
              <div className="border-2 border-gray-200 rounded-lg p-4">
                {debtSeniority.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 mb-2 bg-gray-50 rounded-lg last:mb-0"
                  >
                    <span className="font-medium">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleMoveSeniority("debt", item.id, "up")}
                        className={`p-1 hover:bg-gray-200 rounded ${item.level === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={item.level === 1}
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button
                        onClick={() => handleMoveSeniority("debt", item.id, "down")}
                        className={`p-1 hover:bg-gray-200 rounded ${item.level === debtSeniority.length ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={item.level === debtSeniority.length}
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-500 font-semibold text-right">Receives Last</div>
            </div>
          </div>

          {/* Equity Seniority */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Equity Seniority</h3>
            <div className="space-y-2 mb-4">
              <div className="text-xs text-gray-500 font-semibold">Receives First</div>
              <div className="border-2 border-gray-200 rounded-lg p-4">
                {equitySeniority.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 mb-2 bg-gray-50 rounded-lg last:mb-0"
                  >
                    <span className="font-medium">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleMoveSeniority("equity", item.id, "up")}
                        className={`p-1 hover:bg-gray-200 rounded ${item.level === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={item.level === 1}
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button
                        onClick={() => handleMoveSeniority("equity", item.id, "down")}
                        className={`p-1 hover:bg-gray-200 rounded ${item.level === equitySeniority.length ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={item.level === equitySeniority.length}
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-500 font-semibold text-right">Receives Last</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-[#F9FAFB] min-h-screen font-sans text-[#101828]">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <nav className="flex items-center gap-2 text-sm font-medium">
            <span className="text-gray-400">Fund Overview</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-bold">{fundTitle}</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-bold">Add Portfolio Company</span>
          </nav>
        </div>
      </div>

      {/* Step Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Portfolio Company Investment Information</h1>
          <div className="text-sm font-medium text-gray-600">
            Step {currentStep} of 3
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-200">
        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Step back
          </button>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
          >
            <Save size={16} />
            Save progress
          </button>
          <button
            onClick={handleContinue}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentStep === 3 ? "Simulate and Save As-Is" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}