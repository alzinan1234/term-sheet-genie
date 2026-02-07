"use client";
import React from "react";
import { Calendar, ChevronDown, Edit2 } from "lucide-react";

export default function CreateNewFund({ onCancel, onEditLPs }: { onCancel: () => void, onEditLPs: () => void }) {
  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">
      <div className="mx-auto ">
        <h1 className="text-2xl font-bold text-[#1A2B49] mb-6">Creating a New Fund</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left Column: Fund Details */}
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              {/* Fund Name - Pencil Icon Removed */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Fund Name</label>
                <input className="w-full bg-gray-100 p-2.5 rounded-lg text-gray-700 font-medium border-none focus:ring-2 focus:ring-[#2D60FF] mt-0.5" defaultValue="TSG Growth" />
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Description</label>
                <textarea className="w-full bg-gray-100 p-2.5 rounded-lg text-sm text-gray-600 border-none mt-0.5" rows={2} defaultValue="Fund focused on growth stage investments..." />
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {/* Inception Date - Now a Date Box */}
                <DateField label="Inception Date" value="2025-07-08" />
                
                {/* Status Dropdown with specific options */}
                <DropdownField 
                  label="Status" 
                  value="Open" 
                  options={["Closed", "Fully Invested", "Liquidated", "Open", "Evergreen"]} 
                />

                <InputField label="Lead GP" value="Nitin Strulovic" />
                <InputField label="Committed Capital" value="$100,000,000" />
                
                {/* Investment Period -> Initial Closing Date */}
                <DateField label="Initial Closing Date" value="2025-07-08" />
                
                {/* Return Deadline -> Term (Number) */}
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <InputField label="Term" value="10" type="number" />
                  </div>
                  <span className="mb-2.5 text-xs text-gray-500 font-medium">Years</span>
                </div>

                {/* Commitment Period added to the left of Maximal Extension */}
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <InputField label="Commitment Period" value="5" type="number" />
                  </div>
                  <span className="mb-2.5 text-xs text-gray-500 font-medium">Years</span>
                </div>

                {/* Extension Option -> Maximal Extension */}
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <InputField label="Maximal Extension" value="2" type="number" />
                  </div>
                  <span className="mb-2.5 text-xs text-gray-500 font-medium">Years</span>
                </div>
              </div>

              {/* Standard LP Terms Section Updated */}
              <div className="border border-gray-100 rounded-xl p-4 space-y-3">
                <h3 className="text-sm font-bold text-gray-800 border-b border-gray-50 pb-2">Standard LP Terms</h3>
                
                {/* Management Fees Split into two lines */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 text-xs font-medium">Commitment Period Management Fee</span>
                    <div className="flex items-center gap-2">
                       <input className="w-16 bg-gray-100 px-2 py-1 rounded text-right text-gray-700 outline-none" defaultValue="2.0" />
                       <span className="text-gray-400">%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 text-xs font-medium">Post Commitment Period Management Fee</span>
                    <div className="flex items-center gap-2">
                       <input className="w-16 bg-gray-100 px-2 py-1 rounded text-right text-gray-700 outline-none" defaultValue="1.5" />
                       <span className="text-gray-400">%</span>
                    </div>
                  </div>
                </div>

                {/* Carry Dropdown Updated */}
                <div className="flex justify-between items-center text-sm pt-2">
                  <span className="text-gray-500 text-xs font-medium">Carry</span>
                  <div className="flex gap-2">
                    <select className="bg-gray-100 px-2 py-1 rounded text-xs outline-none cursor-pointer">
                       <option>Aggregate</option>
                       <option>Deal by Deal</option>
                    </select>
                    <div className="bg-gray-100 px-3 py-1 rounded text-xs font-bold text-gray-700">20%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: LPs & Portfolios */}
          <div className="space-y-4">
            {/* Limited Partners - Pencil Icon Removed and Capitalized 'A' */}
            <SideListCard 
              title="Limited Partners" 
              onEdit={onEditLPs} 
              hideItemEdit={true}
              items={[
                { name: "Olivia Rhye", value: "$1,250,000" },
                { name: "Phoenix Baker", value: "$3,750,000" },
                { name: "Lana Steiner", value: "$850,000" }
              ]} 
            />

            <SideListCard 
              title="Portfolio Company" 
              onEdit={() => {}} 
              items={[
                { name: "Catalog", value: "$1,250,000" },
                { name: "Circooles", value: "$3,750,000" },
                { name: "Command+R", value: "$850,000" }
              ]} 
            />
          </div>
        </div>

        {/* Buttons - Simulation flow removed from bottom */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
          <button onClick={onCancel} className="px-8 py-2 rounded-full border border-gray-200 text-gray-500 text-sm font-semibold hover:bg-gray-50 transition-colors">Cancel</button>
          <button className="px-8 py-2 rounded-xl bg-[#2D60FF] text-white text-sm font-semibold hover:bg-[#1a4bd6] shadow-lg shadow-blue-100 transition-all">Create New Fund</button>
        </div>
      </div>
    </div>
  );
}

// Sub-components
const InputField = ({ label, value, type = "text" }: any) => (
  <div className="space-y-0.5">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{label}</label>
    <input type={type} className="w-full bg-gray-100 p-2 rounded-lg text-sm border-none focus:ring-1 focus:ring-blue-200 outline-none" defaultValue={value} />
  </div>
);

const DateField = ({ label, value }: any) => (
  <div className="space-y-0.5">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{label}</label>
    <div className="relative">
      <input type="date" className="w-full bg-gray-100 p-2 rounded-lg text-sm border-none outline-none appearance-none" defaultValue={value} />
    </div>
  </div>
);

const DropdownField = ({ label, value, options = [] }: any) => (
  <div className="space-y-0.5">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{label}</label>
    <div className="relative">
      <select className="w-full bg-gray-100 p-2 rounded-lg text-sm border-none outline-none appearance-none cursor-pointer pr-8">
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
    </div>
  </div>
);

const SideListCard = ({ title, onEdit, items, hideItemEdit = false }: any) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-bold text-sm text-gray-800">{title}</h2>
      <button onClick={onEdit} className="text-[10px] font-bold text-[#2D60FF] bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
        Edit or Add {title}
      </button>
    </div>
    <div className="space-y-1">
      {items.map((item: any, i: number) => (
        <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
          <span className="text-xs font-semibold text-gray-700">{item.name}</span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">{item.value}</span>
            {!hideItemEdit && <Edit2 size={14} className="text-gray-300 hover:text-gray-500 cursor-pointer" />}
          </div>
        </div>
      ))}
    </div>
  </div>
);