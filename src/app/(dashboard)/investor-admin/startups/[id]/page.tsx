"use client";

import React, { use } from 'react';
import ScenarioDetailsCard from '@/components/InvestorAdmin/Simulator/SimulationComparison/ScenarioDetailsCard';
import CapTableOverview from '@/components/InvestorAdmin/Startups/StartupsDetails/CapTableOverview';
import CompanyHeader from '@/components/InvestorAdmin/Startups/StartupsDetails/CompanyHeader';
import ReturnsAnalysis from '@/components/InvestorAdmin/Startups/StartupsDetails/ReturnsAnalysis';
import StatsGrid from '@/components/InvestorAdmin/Startups/StartupsDetails/StatsGrid';
import CompanyInfoAccordion from '@/components/InvestorAdmin/Startups/StartupsDetails/CompanyInfoAccordion';
import ValuationTable from '@/components/InvestorAdmin/Startups/StartupsDetails/ValuationTable';
import ExitWaterfallDiagram from '@/components/InvestorAdmin/Startups/StartupsDetails/ExitWaterfallDiagram';
import CalculateExitBreakdown from '@/components/InvestorAdmin/Startups/StartupsDetails/CalculateExitBreakdown';
import TermSheetGenieValuation from '@/components/InvestorAdmin/Startups/StartupsDetails/TermSheetGenieValuation';
import SimulationSectionCard from '@/components/InvestorAdmin/Startups/StartupsDetails/SimulationSectionCard';
import RoundByRoundDistribution from '@/components/InvestorAdmin/Startups/StartupsDetails/RoundByRoundDistribution';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PortfolioDetails({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  return (
    <div className=" bg-[#F9FAFB] w-ful font-sans">
      {/* ১. হেডার */}
      <CompanyHeader id={id} />

      <div className=" mx-auto p-6 lg:p-10 space-y-10">
        
        <StatsGrid />

    
        <CompanyInfoAccordion />

        <div className=" rounded-2xl  border-[#EAECF0] ">
           <ExitWaterfallDiagram />
        </div>
        <div className=" rounded-2xl  border-[#EAECF0] ">
           <CalculateExitBreakdown />
        </div>
        <div className=" rounded-2xl  border-[#EAECF0] ">
           <TermSheetGenieValuation />
        </div>
        <div className=" rounded-2xl  border-[#EAECF0] ">
           <RoundByRoundDistribution />
        </div>

        <div className="">
          
       
          <div className="lg:col-span-8">
            <div className="space-y-4">
             
              <CapTableOverview />
            </div>
          </div>
           
            <div className=" w-full">
              <SimulationSectionCard />
              
             
              {/* <button className="w-full py-4 border-2 border-dashed border-[#EAECF0] rounded-xl text-[#667085] text-sm font-medium hover:border-blue-400 hover:text-blue-500 transition-all">
                + Add comparison scenario
              </button> */}
            
          </div>

        </div>
      </div>
    </div>
  );
}