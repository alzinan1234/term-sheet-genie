"use client";
import React from "react";
import { Edit2, Calendar, ChevronDown, Plus } from "lucide-react";

export default function CreateNewFund({ onCancel, onEditLPs }: { onCancel: () => void, onEditLPs: () => void }) {
  return (
    <div className="p-8 bg-[#F9FAFB] min-h-screen">
      <div className=" mx-auto">
        <h1 className="text-2xl font-bold text-[#1A2B49] mb-8">Creating a New Fund</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Fund Details */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <div className="relative">
                <label className="text-xs font-bold text-gray-400 uppercase">Fund Name</label>
                <div className="flex items-center gap-2 mt-1">
                  <input className="w-full bg-gray-100 p-3 rounded-lg text-gray-700 font-medium border-none focus:ring-2 focus:ring-[#2D60FF]" defaultValue="TSG Growth" />
                  <Edit2 size={18} className="text-gray-400" />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
                <textarea className="w-full bg-gray-100 p-3 rounded-lg text-sm text-gray-600 mt-1 border-none" rows={2} defaultValue="Fund focused on growth stage investments in the supply chain industry" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InputField label="Inception Date" value="07/08/2025" />
                <DropdownField label="Status" value="Fundraising" />
                <InputField label="Lead GP" value="Nitin Strulovic" />
                <InputField label="Committed Capital" value="$100,000,000" />
                <DateField label="Investment Period" value="7/8/2025" />
                <DateField label="Return Deadline" value="7/8/2025" />
                <div className="flex items-end gap-2">
                   <InputField label="Extension Option" value="1" />
                   <span className="mb-3 text-sm text-gray-500">Years</span>
                </div>
              </div>

              {/* Standard LP Terms Section */}
              <div className="border border-gray-100 rounded-xl p-4 space-y-4">
                <h3 className="text-sm font-bold text-gray-800">Standard LP Terms</h3>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Management Fees</span>
                  <div className="bg-gray-100 px-3 py-1 rounded text-gray-700">2%</div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Carry</span>
                  <div className="flex gap-2">
                    <div className="bg-gray-100 px-3 py-1 rounded flex items-center gap-2">Aggregate <ChevronDown size={14}/></div>
                    <div className="bg-gray-100 px-3 py-1 rounded">20%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: LPs & Portfolios */}
          <div className="space-y-6">
            <SideListCard title="Limited Partners" onEdit={onEditLPs} items={[
              { name: "Olivia Rhye", value: "$1,250,000" },
              { name: "Phoenix Baker", value: "$3,750,000" },
              { name: "Lana Steiner", value: "$850,000" }
            ]} />

            <SideListCard title="Portfolio Company" onEdit={() => {}} items={[
              { name: "Catalog", value: "$1,250,000" },
              { name: "Circooles", value: "$3,750,000" },
              { name: "Command+R", value: "$850,000" }
            ]} />
          </div>
        </div>

        <div className="flex justify-between items-center mt-10">
          <button onClick={onCancel} className="px-8 py-2.5 rounded-full border border-gray-200 text-gray-500 font-medium hover:bg-gray-50">Cancel</button>
          <button className="px-8 py-2.5 rounded-xl bg-[#2D60FF] text-white font-medium hover:bg-[#1a4bd6] shadow-lg shadow-blue-200">Create New Fund</button>
        </div>
      </div>
    </div>
  );
}

// Sub-components for Form
const InputField = ({ label, value }: any) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold text-gray-400 uppercase">{label}</label>
    <input className="w-full bg-gray-100 p-2.5 rounded-lg text-sm border-none" defaultValue={value} />
  </div>
);

const DateField = ({ label, value }: any) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold text-gray-400 uppercase">{label}</label>
    <div className="relative">
      <input className="w-full bg-gray-100 p-2.5 rounded-lg text-sm border-none pr-10" defaultValue={value} />
      <Calendar size={16} className="absolute right-3 top-2.5 text-gray-400" />
    </div>
  </div>
);

const DropdownField = ({ label, value }: any) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold text-gray-400 uppercase">{label}</label>
    <div className="relative">
      <div className="w-full bg-gray-100 p-2.5 rounded-lg text-sm flex justify-between items-center text-gray-700">
        {value} <ChevronDown size={16} className="text-gray-400" />
      </div>
    </div>
  </div>
);

const SideListCard = ({ title, onEdit, items }: any) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-bold text-gray-800">{title}</h2>
      <button onClick={onEdit} className="text-[11px] font-bold text-[#2D60FF] bg-blue-50 px-3 py-1 rounded-lg hover:bg-blue-100">
        Edit or add {title}
      </button>
    </div>
    <div className="space-y-3">
      {items.map((item: any, i: number) => (
        <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50">
          <span className="text-sm font-semibold text-gray-700">{item.name}</span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{item.value}</span>
            <Edit2 size={16} className="text-gray-300 hover:text-gray-500 cursor-pointer" />
          </div>
        </div>
      ))}
    </div>
  </div>
);