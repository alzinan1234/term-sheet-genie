// // app/simulator/components/SimulationResults.tsx
// "use client";

// import React, { useState } from 'react';
// import { 
//   LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
//   XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
//   AreaChart, Area, ScatterChart, Scatter, ComposedChart
// } from 'recharts';
// import { Download, Plus, Save, Filter, ChevronDown, X, Check, Trash2 } from 'lucide-react';

// interface ResultsProps {
//   data: any;
//   onStepBack: () => void;
// }

// interface InvestmentRound {
//   id: number;
//   name: string;
//   date: string;
//   amount: number;
//   liquidationPref: string;
//   ownership: number;
//   participation: string;
//   qpoThreshold: string;
//   dividends: string;
//   dividendRate: string;
//   antidilution: string;
//   comments: string;
//   allocatedOptions: number;
//   unallocatedOptions: number;
//   requestedPool: string;
//   myInvestment: number;
// }

// const SimulationResults: React.FC<ResultsProps> = ({ data, onStepBack }) => {
//   const [scenarios, setScenarios] = useState<string[]>(['Scenario 1', 'Scenario 2']);
//   const [activeScenario, setActiveScenario] = useState('Scenario 1');
//   const [exitValue, setExitValue] = useState(50000000);
//   const [exitTiming, setExitTiming] = useState(5);
//   const [exitType, setExitType] = useState('M&A');
//   const [investmentRounds, setInvestmentRounds] = useState<InvestmentRound[]>([
//     {
//       id: 1,
//       name: 'Series A',
//       date: '07/08/2025',
//       amount: 1000000,
//       liquidationPref: '1.2x',
//       ownership: 500000,
//       participation: 'Participating',
//       qpoThreshold: 'Cap',
//       dividends: 'Annual',
//       dividendRate: '8%',
//       antidilution: 'None',
//       comments: 'A 162 Lead Investor',
//       allocatedOptions: 5000,
//       unallocatedOptions: 7500,
//       requestedPool: '10%',
//       myInvestment: 500000
//     },
//     {
//       id: 2,
//       name: 'Series B',
//       date: 'mm/dd/yyyy',
//       amount: 1000000,
//       liquidationPref: '1x',
//       ownership: 500000,
//       participation: 'Converting',
//       qpoThreshold: 'Select',
//       dividends: 'Simple',
//       dividendRate: 'None',
//       antidilution: 'None',
//       comments: 'A 162 Lead Investor',
//       allocatedOptions: 5000,
//       unallocatedOptions: 7500,
//       requestedPool: '10%',
//       myInvestment: 500000
//     }
//   ]);

//   // Pre-simulation cap table data
//   const preSimulationCapTable = [
//     { name: 'Founders', investors: '3 Founders', commonStock: 100000, stockOptions: 10000, seriesA: '-', seriesB: '-', fullyDiluted: 110000, nominalOwnership: '10.8%', pricePerShare: 10.8 },
//     { name: 'Unallocated Options', investors: '-', commonStock: '-', stockOptions: 10000, seriesA: '-', seriesB: '-', fullyDiluted: 10000, nominalOwnership: '1.0%', pricePerShare: 1.0 },
//     { name: 'Series A', investors: '2 Investors', commonStock: '-', stockOptions: '-', seriesA: 500000, seriesB: '-', fullyDiluted: 500000, nominalOwnership: '49.0%', pricePerShare: 49.0 },
//     { name: 'Series B', investors: 'Accel Partners', commonStock: '-', stockOptions: '-', seriesA: '-', seriesB: 400000, fullyDiluted: 400000, nominalOwnership: '39.2%', pricePerShare: 39.2 },
//     { name: 'Total', investors: '-', commonStock: 100000, stockOptions: 20000, seriesA: 500000, seriesB: 400000, fullyDiluted: 1020000, nominalOwnership: '100.0%', pricePerShare: 100.0 }
//   ];

//   // Post-simulation cap table data
//   const postSimulationCapTable = [
//     { name: 'Founders', investors: '3 Founders', commonStock: 100000, stockOptions: 10000, seriesA: '', seriesB: '', fullyDiluted: 110000, nominalOwnership: '10.8%', pricePerShare: 10.8 },
//     { name: 'Unallocated Options', investors: '-', commonStock: 10000, stockOptions: '', seriesA: '', seriesB: '', fullyDiluted: 10000, nominalOwnership: '1.0%', pricePerShare: 1.0 },
//     { name: 'Series A', investors: '2 Investors', commonStock: '', stockOptions: 500000, seriesA: '', seriesB: '', fullyDiluted: 500000, nominalOwnership: '49.0%', pricePerShare: 49.0 },
//     { name: 'Series B', investors: 'Accel Partners', commonStock: '', stockOptions: '', seriesA: '', seriesB: 400000, fullyDiluted: 400000, nominalOwnership: '39.2%', pricePerShare: 39.2 },
//     { name: 'Total', investors: '-', commonStock: 100000, stockOptions: 20000, seriesA: 500000, seriesB: 400000, fullyDiluted: 1020000, nominalOwnership: '100.0%', pricePerShare: 100.0 }
//   ];

//   // Exit breakdown data
//   const exitBreakdownData = [
//     { shareholder: 'Series A', totalExitValue: 12500000, effectiveOwnership: '25.00%', effectivePricePerShare: 2.50, lpExitValue: 11250000, gpExitValue: 1250000 },
//     { shareholder: 'Series B', totalExitValue: 17500000, effectiveOwnership: '35.00%', effectivePricePerShare: 3.50, lpExitValue: 15750000, gpExitValue: 1750000 },
//     { shareholder: 'Founders', totalExitValue: 20000000, effectiveOwnership: '40.00%', effectivePricePerShare: 4.00, lpExitValue: null, gpExitValue: null }
//   ];

//   // Term sheet valuation data
//   const termSheetValuation = {
//     roundC: {
//       totalContractValue: 13890000,
//       founderValuation: 4500000,
//       breakevenValuation: 53090000
//     },
//     xyzGrowthFund: {
//       totalContractValue: 'Partial Value',
//       lpValuation: 13890000,
//       gpValuation: 12500000,
//       breakevenValuation: 53090000
//     }
//   };

//   // Breakeven analysis data
//   const breakevenAnalysis = [
//     { series: 'Series A', ownership: '100,000,000', investmentAmount: 5000000, liquidationPref: '1x', participation: 'Non-Participating', seniority: 'Senior', breakevenValue: '25.00M' },
//     { series: 'Investor 1', ownership: '50,000,000', investmentAmount: 2500000, liquidationPref: '1x', participation: 'Non-Participating', seniority: 'Senior', breakevenValue: '12.50M' }
//   ];

//   // Round by round distribution data
//   const roundDistributionData = [
//     { round: 'Post Series A', nominal: 100, contract: 85 },
//     { round: 'Post Series B', nominal: 75, contract: 65 },
//     { round: 'Post Series C', nominal: 50, contract: 45 },
//     { round: 'Founders', nominal: 25, contract: 20 }
//   ];

//   // Waterfall data
//   const waterfallData = [
//     { exitValue: 0, seriesA: 0, seriesB: 0, seriesC: 0, founders: 0 },
//     { exitValue: 20, seriesA: 5, seriesB: 10, seriesC: 15, founders: 30 },
//     { exitValue: 40, seriesA: 12, seriesB: 22, seriesC: 32, founders: 55 },
//     { exitValue: 60, seriesA: 25, seriesB: 40, seriesC: 55, founders: 80 },
//     { exitValue: 80, seriesA: 42, seriesB: 62, seriesC: 82, founders: 105 },
//     { exitValue: 100, seriesA: 65, seriesB: 90, seriesC: 115, founders: 130 }
//   ];

//   // Helper functions
//   const formatCurrency = (value: number | null) => {
//     if (value === null || value === undefined) return '-';
//     if (value >= 1000000) {
//       return `$${(value / 1000000).toFixed(2)}M`;
//     }
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(value);
//   };

//   const formatLargeNumber = (num: number) => {
//     return new Intl.NumberFormat('en-US').format(num);
//   };

//   // Add a new investment round
//   const handleAddRound = () => {
//     const nextLetter = String.fromCharCode(65 + investmentRounds.length); // A, B, C, etc.
//     const newRound: InvestmentRound = {
//       id: Date.now(),
//       name: `Series ${nextLetter}`,
//       date: 'mm/dd/yyyy',
//       amount: 0,
//       liquidationPref: '1x',
//       ownership: 0,
//       participation: 'Select',
//       qpoThreshold: 'Select',
//       dividends: 'Select',
//       dividendRate: '0%',
//       antidilution: 'None',
//       comments: '',
//       allocatedOptions: 0,
//       unallocatedOptions: 0,
//       requestedPool: '0%',
//       myInvestment: 0
//     };
//     setInvestmentRounds([...investmentRounds, newRound]);
//   };

//   // Remove the last investment round
//   const handleRemoveLastRound = () => {
//     if (investmentRounds.length > 1) {
//       const updatedRounds = [...investmentRounds];
//       updatedRounds.pop();
//       setInvestmentRounds(updatedRounds);
//     } else {
//       alert('Cannot remove the last investment round');
//     }
//   };

//   // Update an investment round
//   const updateInvestmentRound = (id: number, field: keyof InvestmentRound, value: any) => {
//     setInvestmentRounds(investmentRounds.map(round => 
//       round.id === id ? { ...round, [field]: value } : round
//     ));
//   };

//   const handleCalculateExit = () => {
//     alert('Exit calculation would be performed here with real data');
//   };

//   const handleSaveScenario = () => {
//     alert('Scenario saved successfully!');
//   };

//   const handleGenerateTermSheet = () => {
//     alert('Generating term sheet...');
//   };

//   const handleCompareScenarios = () => {
//     alert('Opening scenario comparison...');
//   };

//   const handleExportResults = () => {
//     alert('Exporting results...');
//   };

//   const handleAddScenario = () => {
//     const newScenario = `Scenario ${scenarios.length + 1}`;
//     setScenarios([...scenarios, newScenario]);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       {/* Main Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Simulation Results</h1>
//         <p className="text-gray-600 mt-2">
//           Visualize simulation exit waterfall, cap table, contract values and the difference between nominal and effective contract valuation.
//         </p>
//       </div>

//       {/* Action Buttons Header */}
//       <div className="flex justify-between items-center mb-8 p-4 bg-white rounded-lg border border-gray-300">
//         <div className="flex items-center gap-4">
//           <button 
//             onClick={handleGenerateTermSheet}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
//           >
//             Generate Term Sheet
//           </button>
//           <button 
//             onClick={handleCompareScenarios}
//             className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
//           >
//             Compare Scenarios
//           </button>
//         </div>
//         <button 
//           onClick={handleSaveScenario}
//           className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2"
//         >
//           <Save size={16} />
//           Save and Exit
//         </button>
//       </div>

//       <div className="grid grid-cols-12 gap-6">
//         {/* Left Sidebar - 3 columns */}
//         <div className="col-span-3 space-y-6">
//           {/* Scenario Selection */}
//           <div className="bg-white rounded-lg border border-gray-300 p-4">
//             <h3 className="font-semibold text-gray-900 mb-3">Scenario Selection</h3>
//             <div className="space-y-2">
//               {scenarios.map((scenario) => (
//                 <div key={scenario} className="flex items-center">
//                   <input
//                     type="radio"
//                     id={scenario}
//                     name="scenario"
//                     checked={activeScenario === scenario}
//                     onChange={() => setActiveScenario(scenario)}
//                     className="h-4 w-4 text-blue-600 border-gray-300"
//                   />
//                   <label htmlFor={scenario} className="ml-2 text-sm text-gray-700">
//                     {scenario}
//                   </label>
//                 </div>
//               ))}
//               <button 
//                 onClick={handleAddScenario}
//                 className="flex items-center gap-1 text-blue-600 text-sm hover:text-blue-800 mt-2"
//               >
//                 <Plus size={14} />
//                 Add scenario
//               </button>
//             </div>
//           </div>

//           {/* Pre Simulation Cap Table */}
//           <div className="bg-white rounded-lg border border-gray-300 p-4">
//             <h3 className="font-semibold text-gray-900 mb-3">Pre Simulation Cap Table</h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="bg-gray-50">
//                     <th className="text-left p-2 text-xs font-medium text-gray-700 border-b border-gray-300">Name</th>
//                     <th className="text-left p-2 text-xs font-medium text-gray-700 border-b border-gray-300">Investors</th>
//                     <th className="text-left p-2 text-xs font-medium text-gray-700 border-b border-gray-300">Common</th>
//                     <th className="text-left p-2 text-xs font-medium text-gray-700 border-b border-gray-300">Options</th>
//                     <th className="text-left p-2 text-xs font-medium text-gray-700 border-b border-gray-300">Series A</th>
//                     <th className="text-left p-2 text-xs font-medium text-gray-700 border-b border-gray-300">Series B</th>
//                     <th className="text-left p-2 text-xs font-medium text-gray-700 border-b border-gray-300">Fully Diluted</th>
//                     <th className="text-left p-2 text-xs font-medium text-gray-700 border-b border-gray-300">Ownership</th>
//                     <th className="text-left p-2 text-xs font-medium text-gray-700 border-b border-gray-300">Price/Share</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {preSimulationCapTable.map((row, index) => (
//                     <tr key={index} className={`${row.name === 'Total' ? 'bg-gray-50 font-semibold' : ''}`}>
//                       <td className="p-2 border-b border-gray-200">{row.name}</td>
//                       <td className="p-2 border-b border-gray-200">{row.investors}</td>
//                       <td className="p-2 border-b border-gray-200 text-right">{row.commonStock}</td>
//                       <td className="p-2 border-b border-gray-200 text-right">{row.stockOptions}</td>
//                       <td className="p-2 border-b border-gray-200 text-right">{row.seriesA}</td>
//                       <td className="p-2 border-b border-gray-200 text-right">{row.seriesB}</td>
//                       <td className="p-2 border-b border-gray-200 text-right">{formatLargeNumber(row.fullyDiluted)}</td>
//                       <td className="p-2 border-b border-gray-200 text-right">{row.nominalOwnership}</td>
//                       <td className="p-2 border-b border-gray-200 text-right">{row.pricePerShare}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Main Content - 6 columns */}
//         <div className="col-span-6 space-y-6">
//           {/* Simulated Future Round Details */}
//           <div className="bg-white rounded-lg border border-gray-300 p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Simulated Future Round Details</h2>
            
//             {/* Investment Rounds - Display all rounds */}
//             {investmentRounds.map((round, index) => (
//               <div key={round.id} className="mb-6">
//                 {/* Round Header */}
//                 <div className="flex items-center justify-between mb-3">
//                   <h3 className="font-semibold text-gray-900">{round.name}</h3>
//                   {index > 1 && (
//                     <button
//                       onClick={() => {
//                         if (investmentRounds.length > 1) {
//                           setInvestmentRounds(investmentRounds.filter(r => r.id !== round.id));
//                         } else {
//                           alert('Cannot remove the last investment round');
//                         }
//                       }}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   )}
//                 </div>

//                 {/* Round Details Grid */}
//                 <div className="grid grid-cols-2 gap-6 mb-4">
//                   {/* Investment Details */}
//                   <div className="bg-white rounded-lg border border-gray-200 p-4">
//                     <div className="space-y-3">
//                       <div>
//                         <p className="text-xs text-gray-600">Investment Date</p>
//                         <input 
//                           type="text"
//                           value={round.date}
//                           onChange={(e) => updateInvestmentRound(round.id, 'date', e.target.value)}
//                           className="w-full p-1 border border-gray-300 rounded text-gray-900"
//                           placeholder="mm/dd/yyyy"
//                         />
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-600">Investment Amount</p>
//                         <input 
//                           type="number"
//                           value={round.amount}
//                           onChange={(e) => updateInvestmentRound(round.id, 'amount', parseInt(e.target.value) || 0)}
//                           className="w-full p-1 border border-gray-300 rounded text-gray-900"
//                         />
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-600">Liquidation Preference</p>
//                         <select 
//                           value={round.liquidationPref}
//                           onChange={(e) => updateInvestmentRound(round.id, 'liquidationPref', e.target.value)}
//                           className="w-full p-1 border border-gray-300 rounded text-gray-900"
//                         >
//                           <option>1x</option>
//                           <option>1.2x</option>
//                           <option>1.5x</option>
//                           <option>2x</option>
//                         </select>
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-600">Ownership</p>
//                         <input 
//                           type="number"
//                           value={round.ownership}
//                           onChange={(e) => updateInvestmentRound(round.id, 'ownership', parseInt(e.target.value) || 0)}
//                           className="w-full p-1 border border-gray-300 rounded text-gray-900"
//                         />
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-600">Common Stock Participation</p>
//                         <select 
//                           value={round.participation}
//                           onChange={(e) => updateInvestmentRound(round.id, 'participation', e.target.value)}
//                           className="w-full p-1 border border-gray-300 rounded text-gray-900"
//                         >
//                           <option>Select</option>
//                           <option>Participating</option>
//                           <option>Non-Participating</option>
//                           <option>Converting</option>
//                         </select>
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-600">QPO Threshold</p>
//                         <select 
//                           value={round.qpoThreshold}
//                           onChange={(e) => updateInvestmentRound(round.id, 'qpoThreshold', e.target.value)}
//                           className="w-full p-1 border border-gray-300 rounded text-gray-900"
//                         >
//                           <option>Select</option>
//                           <option>Cap</option>
//                           <option>Floor</option>
//                           <option>None</option>
//                         </select>
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-600">Dividends</p>
//                         <div className="flex gap-2">
//                           <select 
//                             value={round.dividends}
//                             onChange={(e) => updateInvestmentRound(round.id, 'dividends', e.target.value)}
//                             className="w-1/2 p-1 border border-gray-300 rounded text-gray-900"
//                           >
//                             <option>Select</option>
//                             <option>Annual</option>
//                             <option>Simple</option>
//                             <option>Compound</option>
//                             <option>None</option>
//                           </select>
//                           <input 
//                             type="text"
//                             value={round.dividendRate}
//                             onChange={(e) => updateInvestmentRound(round.id, 'dividendRate', e.target.value)}
//                             className="w-1/2 p-1 border border-gray-300 rounded text-gray-900"
//                             placeholder="Rate %"
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-600">Antidilution Provision</p>
//                         <select 
//                           value={round.antidilution}
//                           onChange={(e) => updateInvestmentRound(round.id, 'antidilution', e.target.value)}
//                           className="w-full p-1 border border-gray-300 rounded text-gray-900"
//                         >
//                           <option>None</option>
//                           <option>Full Ratchet</option>
//                           <option>Weighted Average</option>
//                           <option>Broad-based</option>
//                           <option>Narrow-based</option>
//                         </select>
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-600">Comments</p>
//                         <input 
//                           type="text"
//                           value={round.comments}
//                           onChange={(e) => updateInvestmentRound(round.id, 'comments', e.target.value)}
//                           className="w-full p-1 border border-gray-300 rounded text-gray-900"
//                           placeholder="Add comments"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Option Pools */}
//                   <div className="bg-white rounded-lg border border-gray-200 p-4">
//                     <h4 className="font-medium text-gray-900 mb-3">Option Pools {round.name}</h4>
//                     <div className="space-y-3">
//                       <div>
//                         <p className="text-xs text-gray-600">Allocated Options Immediately prior to round</p>
//                         <input 
//                           type="number"
//                           value={round.allocatedOptions}
//                           onChange={(e) => updateInvestmentRound(round.id, 'allocatedOptions', parseInt(e.target.value) || 0)}
//                           className="w-full p-1 border border-gray-300 rounded text-gray-900"
//                         />
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-600">Unallocated Options Immediately prior to round</p>
//                         <input 
//                           type="number"
//                           value={round.unallocatedOptions}
//                           onChange={(e) => updateInvestmentRound(round.id, 'unallocatedOptions', parseInt(e.target.value) || 0)}
//                           className="w-full p-1 border border-gray-300 rounded text-gray-900"
//                         />
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-600">Requested Available Option Pool Post-Round</p>
//                         <input 
//                           type="text"
//                           value={round.requestedPool}
//                           onChange={(e) => updateInvestmentRound(round.id, 'requestedPool', e.target.value)}
//                           className="w-full p-1 border border-gray-300 rounded text-gray-900"
//                           placeholder="e.g., 10%"
//                         />
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-600">My Funds Investment in This Round</p>
//                         <p className="text-xl font-bold text-blue-700">{formatCurrency(round.myInvestment)}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* Round Controls */}
//             <div className="flex justify-between items-center mb-6">
//               <div className="flex gap-3">
//                 <button 
//                   onClick={handleAddRound}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
//                 >
//                   <Plus size={16} />
//                   Add Round
//                 </button>
//                 <button 
//                   onClick={handleRemoveLastRound}
//                   className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center gap-2"
//                 >
//                   <Trash2 size={16} />
//                   Remove Last Round
//                 </button>
//               </div>
//               <button 
//                 onClick={handleSaveScenario}
//                 className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
//               >
//                 Save this scenario
//               </button>
//             </div>

//             {/* Exit Waterfall Distribution */}
//             <div className="bg-white rounded-lg border border-gray-300 p-4">
//               <h3 className="font-semibold text-gray-900 mb-4">Exit Waterfall Distribution</h3>
//               <div className="h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={waterfallData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//                     <XAxis 
//                       dataKey="exitValue"
//                       label={{ value: 'Exit Company Valuation ($M)', position: 'insideBottom', offset: -5 }}
//                       tick={{ fill: '#6B7280' }}
//                       axisLine={{ stroke: '#E5E7EB' }}
//                       ticks={[0, 20, 40, 60, 80, 100]}
//                     />
//                     <YAxis 
//                       label={{ value: 'Value to All Shareholders (MM)', angle: -90, position: 'insideLeft' }}
//                       tick={{ fill: '#6B7280' }}
//                       axisLine={{ stroke: '#E5E7EB' }}
//                     />
//                     <Tooltip 
//                       formatter={(value) => [`$${value}M`, 'Value']}
//                       labelFormatter={(label) => `Exit Value: $${label}M`}
//                     />
//                     <Legend />
//                     <Area type="monotone" dataKey="seriesA" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Series A" />
//                     <Area type="monotone" dataKey="seriesB" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Series B" />
//                     <Area type="monotone" dataKey="seriesC" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} name="Series C" />
//                     <Area type="monotone" dataKey="founders" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} name="Founders" />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>

//           {/* Calculate Exit Breakdown */}
//           <div className="bg-white rounded-lg border border-gray-300 p-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Calculate Exit Breakdown</h3>
//             <div className="grid grid-cols-3 gap-4 mb-6">
//               <div>
//                 <p className="text-sm text-gray-600 mb-2">Exit Value</p>
//                 <input 
//                   type="text"
//                   value={`$${exitValue.toLocaleString()}`}
//                   onChange={(e) => {
//                     const value = parseInt(e.target.value.replace(/[^0-9]/g, '') || '0');
//                     setExitValue(value);
//                   }}
//                   className="w-full p-2 border border-gray-300 rounded-lg text-lg font-medium text-gray-900"
//                 />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 mb-2">Exit Timing (years)</p>
//                 <input 
//                   type="number"
//                   value={exitTiming}
//                   onChange={(e) => setExitTiming(parseInt(e.target.value) || 0)}
//                   className="w-full p-2 border border-gray-300 rounded-lg text-lg font-medium text-gray-900"
//                 />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 mb-2">Exit Type</p>
//                 <select 
//                   value={exitType}
//                   onChange={(e) => setExitType(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-lg text-lg font-medium text-gray-900"
//                 >
//                   <option>M&A</option>
//                   <option>IPO</option>
//                   <option>Secondary Sale</option>
//                 </select>
//               </div>
//             </div>
//             <button 
//               onClick={handleCalculateExit}
//               className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
//             >
//               Calculate
//             </button>

//             {/* Exit Breakdown Table */}
//             <div className="mt-6 overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-gray-50">
//                     <th className="text-left p-3 text-sm font-medium text-gray-700 border-b border-gray-300">SHAREHOLDERS</th>
//                     <th className="text-left p-3 text-sm font-medium text-gray-700 border-b border-gray-300">TOTAL EXIT VALUE</th>
//                     <th className="text-left p-3 text-sm font-medium text-gray-700 border-b border-gray-300">EFFECTIVE OWNERSHIP</th>
//                     <th className="text-left p-3 text-sm font-medium text-gray-700 border-b border-gray-300">EFFECTIVE PRICE/SHARE</th>
//                     <th className="text-left p-3 text-sm font-medium text-gray-700 border-b border-gray-300">LP EXIT VALUE</th>
//                     <th className="text-left p-3 text-sm font-medium text-gray-700 border-b border-gray-300">GP EXIT VALUE</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {exitBreakdownData.map((row, index) => (
//                     <tr key={index} className="border-b border-gray-200">
//                       <td className="p-3 font-medium text-gray-900">{row.shareholder}</td>
//                       <td className="p-3 text-gray-900">{formatCurrency(row.totalExitValue)}</td>
//                       <td className="p-3 text-gray-900">{row.effectiveOwnership}</td>
//                       <td className="p-3 text-gray-900">${row.effectivePricePerShare.toFixed(2)}</td>
//                       <td className="p-3 text-gray-900">{formatCurrency(row.lpExitValue)}</td>
//                       <td className="p-3 text-gray-900">{formatCurrency(row.gpExitValue)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Right Sidebar - 3 columns */}
//         <div className="col-span-3 space-y-6">
//           {/* Term Sheet Genie Valuation */}
//           <div className="bg-white rounded-lg border border-gray-300 p-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Term Sheet Genie Valuation</h3>
            
//             {/* Round C */}
//             <div className="mb-6 p-3 bg-white rounded border border-gray-200">
//               <h4 className="font-medium text-gray-900 mb-2">Round C</h4>
//               <div className="space-y-2">
//                 <div>
//                   <p className="text-xs text-gray-600">Total Contract Value</p>
//                   <p className="text-lg font-bold text-gray-900">{formatCurrency(termSheetValuation.roundC.totalContractValue)}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-600">Founder Valuation</p>
//                   <p className="text-lg font-bold text-gray-900">{formatCurrency(termSheetValuation.roundC.founderValuation)}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-600">Breakeven Valuation</p>
//                   <p className="text-lg font-bold text-gray-900">{formatCurrency(termSheetValuation.roundC.breakevenValuation)}</p>
//                 </div>
//               </div>
//             </div>

//             {/* XYZ Growth Fund */}
//             <div className="p-3 bg-white rounded border border-gray-200">
//               <h4 className="font-medium text-gray-900 mb-2">XYZ Growth Fund</h4>
//               <div className="space-y-2">
//                 <div>
//                   <p className="text-xs text-gray-600">Total Contract Value</p>
//                   <p className="text-lg font-bold text-gray-900">{termSheetValuation.xyzGrowthFund.totalContractValue}</p>
//                 </div>
//                 <div className="grid grid-cols-2 gap-2">
//                   <div>
//                     <p className="text-xs text-gray-600">LP Valuation</p>
//                     <p className="font-bold text-gray-900">{formatCurrency(termSheetValuation.xyzGrowthFund.lpValuation)}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-600">GP Valuation</p>
//                     <p className="font-bold text-gray-900">{formatCurrency(termSheetValuation.xyzGrowthFund.gpValuation)}</p>
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-600">Breakeven Valuation</p>
//                   <p className="text-lg font-bold text-gray-900">{formatCurrency(termSheetValuation.xyzGrowthFund.breakevenValuation)}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Breakeven Analysis */}
//           <div className="bg-white rounded-lg border border-gray-300 p-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Breakeven Analysis</h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="bg-gray-50">
//                     <th className="text-left p-2 text-xs font-medium text-gray-700 border-b border-gray-300">Series</th>
//                     <th className="text-left p-2 text-xs font-medium text-gray-700 border-b border-gray-300">Name</th>
//                     <th className="text-left p-2 text-xs font-medium text-gray-700 border-b border-gray-300">Ownership</th>
//                     <th className="text-left p-2 text-xs font-medium text-gray-700 border-b border-gray-300">Investment Amount</th>
//                     <th className="text-left p-2 text-xs font-medium text-gray-700 border-b border-gray-300">Liquidation Pref</th>
//                     <th className="text-left p-2 text-xs font-medium text-gray-700 border-b border-gray-300">Participation</th>
//                     <th className="text-left p-2 text-xs font-medium text-gray-700 border-b border-gray-300">Seniority</th>
//                     <th className="text-left p-2 text-xs font-medium text-gray-700 border-b border-gray-300">Breakeven Value</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {breakevenAnalysis.map((row, index) => (
//                     <tr key={index} className="border-b border-gray-200">
//                       <td className="p-2 text-gray-900">{row.series === 'Series A' ? 'Series A' : ''}</td>
//                       <td className="p-2 font-medium text-gray-900">{row.series}</td>
//                       <td className="p-2 text-gray-900">{row.ownership}</td>
//                       <td className="p-2 text-gray-900">{formatCurrency(row.investmentAmount)}</td>
//                       <td className="p-2 text-gray-900">{row.liquidationPref}</td>
//                       <td className="p-2 text-gray-900">{row.participation}</td>
//                       <td className="p-2 text-gray-900">{row.seniority}</td>
//                       <td className="p-2 font-bold text-gray-900">{row.breakevenValue}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//               Calculate
//             </button>
//           </div>

//           {/* Round by Round Nominal vs. Contract Based Value */}
//           <div className="bg-white rounded-lg border border-gray-300 p-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Round by Round Nominal vs. Contract Based Value</h3>
//             <div className="mb-4">
//               <h4 className="text-sm font-medium text-gray-700 mb-2">Round-by-Round distribution</h4>
//               <div className="h-48">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={roundDistributionData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//                     <XAxis dataKey="round" tick={{ fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} />
//                     <YAxis tick={{ fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} />
//                     <Tooltip formatter={(value) => [`$${value}M`, 'Value']} />
//                     <Legend />
//                     <Bar dataKey="nominal" fill="#3B82F6" name="Nominal" />
//                     <Bar dataKey="contract" fill="#10B981" name="Contract Based" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//             <div className="text-xs text-gray-600">
//               <p className="font-medium mb-1">Legend:</p>
//               <div className="flex flex-wrap gap-2">
//                 <span className="flex items-center">
//                   <div className="w-3 h-3 bg-blue-500 mr-1"></div>
//                   Series A
//                 </span>
//                 <span className="flex items-center">
//                   <div className="w-3 h-3 bg-green-500 mr-1"></div>
//                   Series B
//                 </span>
//                 <span className="flex items-center">
//                   <div className="w-3 h-3 bg-purple-500 mr-1"></div>
//                   Series C
//                 </span>
//                 <span className="flex items-center">
//                   <div className="w-3 h-3 bg-yellow-500 mr-1"></div>
//                   Founders
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Section - Full width */}
//       <div className="mt-8">
//         {/* Cap Table */}
//         <div className="bg-white rounded-lg border border-gray-300 p-6 mb-6">
//           <h3 className="font-semibold text-gray-900 mb-4">Cap Table</h3>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gray-50">
//                   <th className="text-left p-3 text-sm font-medium text-gray-700 border-b border-gray-300">Name</th>
//                   <th className="text-left p-3 text-sm font-medium text-gray-700 border-b border-gray-300">Investors</th>
//                   <th className="text-left p-3 text-sm font-medium text-gray-700 border-b border-gray-300">Common Stock</th>
//                   <th className="text-left p-3 text-sm font-medium text-gray-700 border-b border-gray-300">Stock Options</th>
//                   <th className="text-left p-3 text-sm font-medium text-gray-700 border-b border-gray-300">Series A Preferred</th>
//                   <th className="text-left p-3 text-sm font-medium text-gray-700 border-b border-gray-300">Series B Preferred</th>
//                   <th className="text-left p-3 text-sm font-medium text-gray-700 border-b border-gray-300">Fully Diluted Share</th>
//                   <th className="text-left p-3 text-sm font-medium text-gray-700 border-b border-gray-300">Nominal Ownership</th>
//                   <th className="text-left p-3 text-sm font-medium text-gray-700 border-b border-gray-300">Price/Share</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {postSimulationCapTable.map((row, index) => (
//                   <tr key={index} className={`${row.name === 'Total' ? 'bg-gray-50 font-semibold' : ''}`}>
//                     <td className="p-3 border-b border-gray-200 text-gray-900">{row.name}</td>
//                     <td className="p-3 border-b border-gray-200 text-gray-900">{row.investors}</td>
//                     <td className="p-3 border-b border-gray-200 text-right text-gray-900">{row.commonStock}</td>
//                     <td className="p-3 border-b border-gray-200 text-right text-gray-900">{row.stockOptions}</td>
//                     <td className="p-3 border-b border-gray-200 text-right text-gray-900">{row.seriesA}</td>
//                     <td className="p-3 border-b border-gray-200 text-right text-gray-900">{row.seriesB}</td>
//                     <td className="p-3 border-b border-gray-200 text-right text-gray-900">{formatLargeNumber(row.fullyDiluted)}</td>
//                     <td className="p-3 border-b border-gray-200 text-right text-gray-900">{row.nominalOwnership}</td>
//                     <td className="p-3 border-b border-gray-200 text-right text-gray-900">{row.pricePerShare}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Final Action Buttons */}
//         <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-300">
//           <div className="flex gap-3">
//             <button 
//               onClick={onStepBack}
//               className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
//             >
//               Back to Simulation
//             </button>
//             <button 
//               onClick={handleExportResults}
//               className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2"
//             >
//               <Download size={16} />
//               Export Results
//             </button>
//           </div>
//           <div className="flex gap-3">
//             <button 
//               onClick={handleCompareScenarios}
//               className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
//             >
//               Compare with Another Scenario
//             </button>
//             <button 
//               onClick={handleGenerateTermSheet}
//               className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
//             >
//               Generate Term Sheet
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SimulationResults;

import React, { useState } from 'react';
import { Save } from 'lucide-react';
// import { useNavigate } from 'react-router-dom'; // Uncomment if using React Router
import Sidebar from './Sidebar';
import SectionCard from './SectionCard';
import PreSimCapTable from './PreSimCapTable';
import FutureRoundDetails from './FutureRoundDetails';
import ExitWaterfall from './ExitWaterfall';
import CalculateExit from './CalculateExit';
import ValuationAnalysis from './ValuationAnalysis';
import BreakevenAnalysis from './BreakevenAnalysis';
import CapTable from './CapTable';

const SimulationResults: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<number>(1);
  // const navigate = useNavigate(); // Uncomment if using React Router

  const handleSaveAndExit = async () => {
    try {
      // 1. Logic to gather data (example: activeScenario)
      console.log("Saving scenario:", activeScenario);

      // 2. Simulate an API call
      // await api.saveSimulation({ scenario: activeScenario }); 
      
      alert("Simulation saved successfully!");

      // 3. Exit Logic
      // If using React Router:
      // navigate('/dashboard'); 
      
      // Standard browser fallback:
      window.location.href = '/'; 
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Error saving simulation.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 font-sans text-[#1e293b]">
      {/* Top Header Section */}
      <div className="flex flex-col gap-10 items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Simulation Results</h1>
          <p className="text-[13px] text-gray-500 max-w-2xl">
            Visualize simulation exit waterfall, cap table, contract values and the difference 
            between nominal and effective contract valuation.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-[#eef2ff] text-[#4f46e5] rounded-full text-[13px] font-semibold hover:bg-[#e0e7ff] transition-all">
            Generate Term Sheet
          </button>
          <button className="px-4 py-2 bg-[#eef2ff] text-[#4f46e5] rounded-full text-[13px] font-semibold hover:bg-[#e0e7ff] transition-all">
            Compare Scenarios
          </button>
          
          {/* Updated Save and Exit Button */}
          <button 
            onClick={handleSaveAndExit}
            className="px-6 py-2 bg-[#2563eb] text-white rounded-full text-[13px] font-bold hover:bg-[#1d4ed8] shadow-sm flex items-center gap-2 active:scale-95 transition-transform"
          >
            <Save size={16} /> Save and Exit
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        <Sidebar activeScenario={activeScenario} setActiveScenario={setActiveScenario} />

        <div className="flex-1 space-y-6">
          <SectionCard title="Pre Simulation Cap Table">
            <PreSimCapTable />
          </SectionCard>

          <SectionCard title="Simulated Future Round Details">
            <FutureRoundDetails />
          </SectionCard>

          <SectionCard title="Exit Waterfall Distribution">
            <ExitWaterfall />
          </SectionCard>

          <SectionCard title="Calculate Exit Breakdown">
            <CalculateExit />
          </SectionCard>

          <SectionCard title="Breakeven Analysis">
            <BreakevenAnalysis />
          </SectionCard>

          <SectionCard title="Round by Round Nominal vs. Contract Based Value">
            <ValuationAnalysis />
          </SectionCard>
          <SectionCard title="Cap Table">
            <CapTable />
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default SimulationResults;