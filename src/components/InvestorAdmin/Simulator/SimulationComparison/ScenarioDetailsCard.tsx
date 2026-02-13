"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ScenarioDetailsCard = ({ id }: { id: number }) => {
  // ড্রপডাউন ওপেন বা ক্লোজ রাখার স্টেট
  const [isOpen, setIsOpen] = useState(true);

  // ইমেজের ডেটা অনুযায়ী ভ্যালু সেট করা
  const details = id === 1 ? {
    investment: "$10,000,000",
    preMoney: "$40,000,000",
    ownership: "20%"
  } : {
    investment: "$12,000,000",
    preMoney: "$45,000,000",
    ownership: "21%"
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm transition-all overflow-hidden w-full">
      {/* Header Section */}
      <div 
        className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50/50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-[15px] font-semibold text-[#1e293b]">
          Scenario {id} Details
        </h3>
        {isOpen ? (
          <ChevronUp size={18} className="text-gray-400" />
        ) : (
          <ChevronDown size={18} className="text-gray-400" />
        )}
      </div>

      {/* Expandable Content */}
      {isOpen && (
        <div className="px-5 pb-6 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-gray-500 font-medium">Investment Amount</span>
            <span className="font-semibold text-[#1e293b]">{details.investment}</span>
          </div>
          
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-gray-500 font-medium">Pre-Money Valuation</span>
            <span className="font-semibold text-[#1e293b]">{details.preMoney}</span>
          </div>
          
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-gray-500 font-medium">Ownership %</span>
            <span className="font-semibold text-[#1e293b]">{details.ownership}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioDetailsCard;