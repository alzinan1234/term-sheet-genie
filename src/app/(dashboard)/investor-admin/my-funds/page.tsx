"use client";
import CreateNewFund from "@/components/InvestorAdmin/InvestorOverview/CreateNewFund";
import LimitedPartnersView from "@/components/InvestorAdmin/InvestorOverview/LimitedPartnersView";
import MyFundsTable from "@/components/InvestorAdmin/InvestorOverview/MyFundsTable";
import SimulationSection from "@/components/InvestorAdmin/InvestorOverview/SimulationSection";
import React, { useState } from "react";


export default function page() {
  const [view, setView] = useState<"table" | "create" | "lp">("table");

  return (
   <>
    <div>
      {view === "table" && (
        <MyFundsTable onAddNew={() => setView("create")} />
      )}
      
      {view === "create" && (
        <CreateNewFund 
          onCancel={() => setView("table")} 
          onEditLPs={() => setView("lp")} 
        />
      )}

      {view === "lp" && (
        <LimitedPartnersView onBack={() => setView("create")} />
      )}


      
    </div>
    <SimulationSection />
   </>
  );
}
