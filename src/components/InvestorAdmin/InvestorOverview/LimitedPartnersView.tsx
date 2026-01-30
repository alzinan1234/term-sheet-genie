"use client";
import React, { useState } from "react";
import { ChevronLeft, Plus, Trash2, Edit2 } from "lucide-react";

interface LPData {
  id: string;
  name: string;
  agreementDate: string;
  committedCapital: string;
  capitalCalls: string;
  mgmtFees: string;
  carry1: string;
  carry2: string;
  contactPerson: string;
  contactEmail: string;
  fund: string;
}

export default function LimitedPartnersView({ onBack }: { onBack: () => void }) {
  const [partners, setPartners] = useState<LPData[]>([
    { id: "1", name: "Olivia Rhye", agreementDate: "01/02/2024", committedCapital: "$1,250,000", capitalCalls: "$0", mgmtFees: "2%", carry1: "2%", carry2: "20%", contactPerson: "Olivia Rhye", contactEmail: "olivia@example.com", fund: "TSG Growth" },
    { id: "2", name: "Phoenix Baker", agreementDate: "03/15/2024", committedCapital: "$3,750,000", capitalCalls: "$0", mgmtFees: "2%", carry1: "2%", carry2: "20%", contactPerson: "Phoenix Baker", contactEmail: "phoenix@example.com", fund: "TSG Growth" },
    { id: "3", name: "Lana Steiner", agreementDate: "05/20/2024", committedCapital: "$850,000", capitalCalls: "$0", mgmtFees: "2%", carry1: "2%", carry2: "20%", contactPerson: "Lana Steiner", contactEmail: "lana@example.com", fund: "TSG Growth" },
    { id: "4", name: "Demi Wilkinson", agreementDate: "07/08/2025", committedCapital: "$10,000,000", capitalCalls: "$0", mgmtFees: "2%", carry1: "2%", carry2: "20%", contactPerson: "Moses Melon", contactEmail: "melo@upenn.edu", fund: "TSG Growth" },
  ]);

  const [selectedId, setSelectedId] = useState<string>("4");

  // Helper to find current LP
  const currentLP = partners.find(p => p.id === selectedId) || partners[0];

  // --- Centralized Update Logic ---
  const updateLPField = (field: keyof LPData, value: string) => {
    setPartners(prev => prev.map(p => 
      p.id === selectedId ? { ...p, [field]: value } : p
    ));
  };

  const handleAddNewLP = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newLP: LPData = {
      id: newId,
      name: "New Partner",
      agreementDate: new Date().toLocaleDateString(),
      committedCapital: "$0",
      capitalCalls: "$0",
      mgmtFees: "0%",
      carry1: "0%",
      carry2: "0%",
      contactPerson: "",
      contactEmail: "",
      fund: "Select Fund",
    };
    setPartners([...partners, newLP]);
    setSelectedId(newId);
  };

  const handleRemoveLP = (id: string) => {
    if (partners.length > 1) {
      const filtered = partners.filter(p => p.id !== id);
      setPartners(filtered);
      setSelectedId(filtered[0].id);
    }
  };

  const handleSaveChanges = () => {
    console.log("Saving Data to Database:", currentLP);
    alert(`Settings saved for ${currentLP.name}!`);
  };

  return (
    <div className="p-8 bg-[#F9FAFB] min-h-screen font-sans">
      <div className="flex items-start gap-12  mx-auto">
        
        {/* Sidebar Navigation */}
        <div className="w-64 flex-shrink-0">
          <button 
            onClick={onBack} 
            className="flex items-center gap-2 text-[#2D60FF] bg-white border border-blue-100 px-5 py-2.5 rounded-full font-bold text-sm hover:shadow-md transition-all active:scale-95 mb-8"
          >
            <ChevronLeft size={18} /> Return
          </button>
          
          <div className="space-y-1 mb-6">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase px-3 mb-2 tracking-wider">Current LPs</h3>
            {partners.map((lp) => (
              <button 
                key={lp.id} 
                onClick={() => setSelectedId(lp.id)}
                className={`w-full text-left p-3 text-sm transition-all rounded-xl ${
                  selectedId === lp.id 
                  ? "text-[#2D60FF] font-bold border-l-[4px] border-[#2D60FF] bg-blue-50/50" 
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }`}
              >
                {lp.name}
              </button>
            ))}
          </div>

          <button 
            onClick={handleAddNewLP}
            className="w-full flex items-center justify-center gap-2 bg-blue-50 text-[#2D60FF] py-3.5 rounded-2xl font-bold text-sm hover:bg-blue-100 transition-all active:scale-95"
          >
            <Plus size={18} /> Add new LP
          </button>
        </div>

        {/* Main Form Content */}
        <div className="flex-1 bg-white p-10 rounded-[32px] shadow-sm border border-gray-100">
          
          {/* Header Section */}
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-50">
             <div className="flex items-center gap-4 group">
               <div className="relative">
                 <input 
                   className="text-3xl font-bold text-gray-800 bg-transparent border-none focus:ring-0 p-0 w-auto min-w-[200px]" 
                   value={currentLP.name}
                   onChange={(e) => updateLPField("name", e.target.value)}
                 />
                 <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2D60FF] group-hover:w-full transition-all duration-300"></div>
               </div>
               <Edit2 size={20} className="text-gray-300" />
             </div>

             <div className="flex flex-col items-end">
               <label className="text-[10px] font-bold text-gray-400 uppercase mb-1">Quick Select</label>
               <select 
                 value={selectedId}
                 onChange={(e) => setSelectedId(e.target.value)}
                 className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm font-medium text-gray-600 outline-none focus:ring-2 focus:ring-blue-100"
               >
                 {partners.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
               </select>
             </div>
          </div>

          {/* Form Fields */}
          <div className="grid gap-6">
            <LPInput 
              label="Agreement Date" 
              value={currentLP.agreementDate} 
              onChange={(val) => updateLPField("agreementDate", val)}
            />
            <LPInput 
              label="Committed Capital" 
              value={currentLP.committedCapital} 
              onChange={(val) => updateLPField("committedCapital", val)}
            />
            <LPInput 
              label="Capital Calls" 
              value={currentLP.capitalCalls} 
              onChange={(val) => updateLPField("capitalCalls", val)}
            />
            <LPInput 
              label="Management Fees" 
              value={currentLP.mgmtFees} 
              onChange={(val) => updateLPField("mgmtFees", val)}
            />
            
            <div className="flex items-center justify-between gap-8">
              <label className="text-sm font-bold text-gray-800 w-1/3">Carry</label>
              <div className="flex-1 flex gap-4">
                <input 
                  className="w-1/2 bg-gray-50 border-none rounded-xl p-3 text-sm text-gray-600 focus:ring-2 focus:ring-blue-100 outline-none" 
                  value={currentLP.carry1}
                  onChange={(e) => updateLPField("carry1", e.target.value)}
                />
                <input 
                  className="w-1/2 bg-gray-50 border-none rounded-xl p-3 text-sm text-gray-600 focus:ring-2 focus:ring-blue-100 outline-none" 
                  value={currentLP.carry2}
                  onChange={(e) => updateLPField("carry2", e.target.value)}
                />
              </div>
            </div>

            <LPInput 
              label="Contact Person" 
              value={currentLP.contactPerson} 
              onChange={(val) => updateLPField("contactPerson", val)}
            />
            <LPInput 
              label="Contact Email" 
              value={currentLP.contactEmail} 
              onChange={(val) => updateLPField("contactEmail", val)}
            />
            <LPInput 
              label="Fund" 
              value={currentLP.fund} 
              onChange={(val) => updateLPField("fund", val)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-50">
            <button 
              onClick={() => handleRemoveLP(selectedId)}
              className="flex items-center gap-2 text-red-500 text-sm font-bold border border-red-50 hover:bg-red-50 px-5 py-3 rounded-2xl transition-all active:scale-95"
            >
              <Trash2 size={18} /> Remove LP
            </button>
            
            <button 
              onClick={handleSaveChanges}
              className="bg-[#2D60FF] hover:bg-[#1a4bd6] text-white px-12 py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for Inputs
const LPInput = ({ label, value, onChange }: { label: string; value: string; onChange: (val: string) => void }) => (
  <div className="flex items-center justify-between gap-8">
    <label className="text-sm font-bold text-gray-800 w-1/3">{label}</label>
    <input 
      className="flex-1 bg-gray-50 border-none rounded-xl p-3 text-sm text-gray-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all" 
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);