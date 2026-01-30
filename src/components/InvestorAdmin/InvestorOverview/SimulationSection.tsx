"use client";
import React, { useState } from "react";
import { Plus, MoreHorizontal, X } from "lucide-react";

interface Simulation {
  id: string;
  companyName: string;
  description: string;
  scenarios: number;
  badgeColor: string;
}

export default function SimulationSection() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [simName, setSimName] = useState("");
  const [simDesc, setSimDesc] = useState("");

  const simulations: Simulation[] = [
    { id: "1", companyName: "Real-Time Data Analysis", description: "Generate Report", scenarios: 4, badgeColor: "bg-purple-50 text-purple-600 border-purple-100" },
    { id: "2", companyName: "Stellar Dynamics", description: "Projecting the necessary investment and its valuation in 5 years", scenarios: 3, badgeColor: "bg-blue-50 text-blue-600 border-blue-100" },
    { id: "3", companyName: "Nebula Innovations", description: "Projecting the necessary investment and its valuation in 5 years", scenarios: 1, badgeColor: "bg-orange-50 text-orange-600 border-orange-100" },
    { id: "4", companyName: "AstroTech Industries", description: "Projecting the necessary investment and its valuation in 5 years", scenarios: 2, badgeColor: "bg-green-50 text-green-600 border-green-100" },
    { id: "5", companyName: "Cosmic Solutions", description: "Projecting the necessary investment and its valuation in 5 years", scenarios: 4, badgeColor: "bg-purple-50 text-purple-600 border-purple-100" },
    { id: "6", companyName: "Galactic Enterprises", description: "Projecting the necessary investment and its valuation in 5 years", scenarios: 4, badgeColor: "bg-purple-50 text-purple-600 border-purple-100" },
  ];

  // Button disabled thakbe jodi input empty hoy (Image-er logic onujayi)
  const isFormValid = simName.trim() !== "" && simDesc.trim() !== "";

  return (
    <div className="  mt-10 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Individual Investment Simulations</h2>
        <button 
          onClick={() => setIsPopupOpen(true)}
          className="bg-[#2D60FF] hover:bg-[#1a4bd6] text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 font-bold text-sm shadow-lg shadow-blue-100 transition-all active:scale-95"
        >
          <Plus size={18} /> Create New Simulation
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {simulations.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-[#1A2B49]">{item.companyName}</h3>
              <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">{item.description}</p>
            <div className="flex justify-end">
              <span className={`px-4 py-1 rounded-full text-[10px] font-bold border ${item.badgeColor}`}>
                {item.scenarios} scenarios
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-[400px] mt-6 py-3 border border-[#D1E2F5] rounded-xl text-[#145AA3] font-bold text-sm bg-gray-50/50 hover:bg-gray-100 transition-colors">
        View all
      </button>

      {/* --- NEW SIMULATION POPUP (MODAL) --- */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-[500px] rounded-[32px] p-10 shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors border border-gray-200 rounded-full p-1"
            >
              <X size={20} />
            </button>

            <h2 className="text-3xl font-bold text-gray-900 mb-8">New Simulation</h2>

            <div className="space-y-6">
              {/* Simulation Name Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400">Simulation name</label>
                <input 
                  type="text"
                  placeholder="VC Simulation"
                  className="w-full bg-[#F5F8FA] border-none rounded-xl p-4 text-sm text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-blue-100 outline-none"
                  value={simName}
                  onChange={(e) => setSimName(e.target.value)}
                />
              </div>

              {/* Description Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400">Description</label>
                <textarea 
                  rows={4}
                  placeholder="Write some context of the simulation"
                  className="w-full bg-[#F5F8FA] border-none rounded-xl p-4 text-sm text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-blue-100 outline-none resize-none"
                  value={simDesc}
                  onChange={(e) => setSimDesc(e.target.value)}
                />
              </div>

              {/* Action Button - Dynamic State */}
              <button 
                disabled={!isFormValid}
                className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm transition-all active:scale-[0.98] mt-4 shadow-lg 
                  ${isFormValid 
                    ? "bg-[#2D60FF] text-white shadow-blue-200 hover:bg-[#1a4bd6]" 
                    : "bg-[#D1D9E2] text-white cursor-not-allowed shadow-none"
                  }`}
              >
                <Plus size={18} /> Create New Simulation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}