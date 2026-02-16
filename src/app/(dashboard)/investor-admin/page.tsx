"use client";
import CreateNewFund from "@/components/InvestorAdmin/InvestorOverview/CreateNewFund";
import LimitedPartnersView from "@/components/InvestorAdmin/InvestorOverview/LimitedPartnersView";
import MyFundsTable from "@/components/InvestorAdmin/InvestorOverview/MyFundsTable";
import SimulationSection from "@/components/InvestorAdmin/InvestorOverview/SimulationSection";
import React, { useState } from "react";

export default function InvestorDashboard() {
  const [view, setView] = useState<"table" | "create" | "lp">("table");
  const [isSimulationResultsOpen, setIsSimulationResultsOpen] = useState(false);

  return (
    <div>
      {/* Table View - শুধুমাত্র যখন SimulationResults open নয় */}
      {view === "table" && !isSimulationResultsOpen && (
        <MyFundsTable onAddNew={() => setView("create")} />
      )}
      
      {/* Create Fund View */}
      {view === "create" && (
        <CreateNewFund 
          onCancel={() => setView("table")} 
          onEditLPs={() => setView("lp")} 
        />
      )}

      {/* Limited Partners View */}
      {view === "lp" && (
        <LimitedPartnersView onBack={() => setView("create")} />
      )}

      {/* SimulationSection - শুধুমাত্র table view এ দেখাবে */}
      {view === "table" && (
        <SimulationSection 
          onSimulationOpen={() => setIsSimulationResultsOpen(true)}
          onSimulationClose={() => setIsSimulationResultsOpen(false)}
        />
      )}
    </div>
  );
}