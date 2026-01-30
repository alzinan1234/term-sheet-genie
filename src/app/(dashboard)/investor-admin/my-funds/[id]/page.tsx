"use client";
import React, { use, useState, useMemo } from "react";
import { Plus, Search, Edit2, ChevronDown, ChevronUp, FileText } from "lucide-react";

// --- Types ---
interface PageProps {
  params: Promise<{ id: string }>;
}

// --- Main Component ---
export default function FundDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const fundId = resolvedParams.id;
  const fundTitle = fundId.split('-').join(' ').toUpperCase();

  return (
    <div className="p-8 bg-[#F9FAFB] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-8">
        <nav className="text-sm font-medium">
          <span className="text-gray-400">Fund Overview</span>
          <span className="text-gray-300 mx-2">/</span>
          <span className="text-gray-900 font-bold">{fundTitle}</span>
        </nav>
      
      </div>

      <div className=" mx-auto space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard label="Committed Capital" value="$100,000,000" badge="Label" color="blue" />
          <MetricCard label="Invested Capital" value="$50,000,000" badge="Label" color="purple" />
          <MetricCard label="AUM (Including Dry Powder)" value="5.000" badge="Label" color="green" />
          <MetricCard label="Total NPV" value="5.000" badge="Label" color="gray" />
        </div>

        {/* 1. Basic Fund Information Accordion */}
        <AccordionSection title="Basic Fund Information">
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <InfoItem label="Inception Date" value="January 15, 2020" />
              <InfoItem label="Status" value="Active" isStatus />
              <InfoItem label="Lead General Partner" value="John McIntire" />
              <InfoItem label="Investment Period Ends" value="January 15, 2025" />
              <InfoItem label="Return Deadline" value="January 15, 2030" />
              <InfoItem label="Extension Option" value="24 months" />
            </div>
            <div className="space-y-6">
              <h3 className="text-[13px] font-bold text-gray-900 mb-4">Standard LP Terms</h3>
              <InfoItem label="Management Fees" value="2% annually" />
              <InfoItem label="Carry (Type and Percentage)" value="Standard - 20%" />
              <InfoItem label="Hurdle Rate (%)" value="8%" />
            </div>
          </div>
        </AccordionSection>

        {/* 2. Investments Section with Search Functionality */}
        <SectionTable 
          title="Investments" 
          description="Companies that this fund has invested in"
          buttonText="New Portfolio Company"
          columns={["Company", "Status", "Description", "Documents", "Investment Amount"]}
          initialData={investmentData}
        />

        {/* 3. Limited Partners Section with Search Functionality */}
        <SectionTable 
          title="Limited Partners" 
          description="Partners who have committed capital to this fund"
          buttonText="New Partner"
          columns={["Name", "Committed Capital", "Annual Fees", "Carried Interest"]}
          initialData={lpData}
        />
      </div>
    </div>
  );
}

// --- Helper: Accordion Wrapper ---
const AccordionSection = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-50"
      >
        {isOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
        <h2 className="font-bold text-[#101828] text-lg">{title}</h2>
      </button>
      {isOpen && <div className="animate-in fade-in slide-in-from-top-2 duration-300">{children}</div>}
    </div>
  );
};

// --- Helper: Table Section with Filter logic ---
const SectionTable = ({ title, description, buttonText, columns, initialData }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return initialData.filter((item: any) => 
      item.name.toLowerCase().includes(search.toLowerCase()) || 
      (item.subtext && item.subtext.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, initialData]);

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-3 group">
          {isOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
          <div className="text-left">
            <h2 className="font-bold text-[#101828] text-lg leading-tight">{title}</h2>
            <p className="text-xs text-gray-400 font-medium">{description}</p>
          </div>
        </button>
        <button className="bg-[#2D60FF] hover:bg-[#1a4bd6] text-white px-5 py-2.5 rounded-[14px] text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-100 active:scale-95">
          <Plus size={16} /> {buttonText}
        </button>
      </div>

      {isOpen && (
        <div className="animate-in fade-in duration-300">
          <div className="px-6 py-5 bg-[#FDFDFF]">
            <div className="relative max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Filter ${title.toLowerCase()}...`}
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-[14px] text-sm outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all placeholder:text-gray-300"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-[11px] text-gray-400 uppercase tracking-widest font-bold border-b border-gray-100">
                  {columns.map((col: string) => (
                    <th key={col} className="px-8 py-4">{col}</th>
                  ))}
                  <th className="px-8 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredData.length > 0 ? filteredData.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-blue-50/20 transition-colors group cursor-pointer">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm">
                          {row.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#101828]">{row.name}</div>
                          <div className="text-[11px] text-gray-400 font-medium">{row.subtext}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 w-fit border border-green-100">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> {row.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm text-gray-500 font-medium max-w-[240px] truncate">{row.desc}</td>
                    <td className="px-8 py-5">
                        <FileText size={20} className="text-gray-300 hover:text-blue-500 transition-colors" />
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#101828]">{row.amount}</span>
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md border border-green-100">{row.change}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <Edit2 size={18} className="text-gray-300 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100" />
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={columns.length + 1} className="px-8 py-10 text-center text-gray-400 text-sm italic">
                      No results found matching "{search}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Small UI Components ---
const MetricCard = ({ label, value, badge, color }: any) => {
  const colors: any = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    green: "bg-green-50 text-green-600 border-green-100",
    gray: "bg-gray-50 text-gray-600 border-gray-100"
  };
  return (
    <div className="bg-white p-7 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border uppercase tracking-wider ${colors[color]}`}>{badge}</span>
      <div className="text-[28px] font-bold text-[#101828] mt-4 tracking-tight">{value}</div>
      <div className="text-[13px] font-semibold text-gray-400 mt-1">{label}</div>
    </div>
  );
};

const InfoItem = ({ label, value, isStatus }: any) => (
  <div className="flex flex-col gap-1.5">
    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.08em]">{label}</div>
    {isStatus ? (
       <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 w-fit border border-green-100">
       <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> {value}
     </span>
    ) : (
      <div className="text-[15px] font-bold text-[#101828]">{value}</div>
    )}
  </div>
);

// --- Mock Data ---
const investmentData = [
  { name: "Catalog", subtext: "catalogapp.io", desc: "Content curation app", amount: "$1,250,000", change: "+20%" },
  { name: "Circooles", subtext: "getcircooles.com", desc: "Design software", amount: "$3,750,000", change: "+10%" },
  { name: "Command+R", subtext: "cmdr.ai", desc: "Data prediction", amount: "$850,000", change: "+25%" },
  { name: "Hourglass", subtext: "hourglass.app", desc: "Productivity app", amount: "$1,500,000", change: "-20%", status: "Closed" },
];

const lpData = [
  { name: "Olivia Rhye", subtext: "Lead Partner", amount: "$1,250,000", desc: "15%", change: "↑ 15%" },
  { name: "Phoenix Baker", subtext: "Institutional", amount: "$3,750,000", desc: "12%", change: "↑ 15%" },
  { name: "Lana Steiner", subtext: "Individual", amount: "$850,000", desc: "12%", change: "↑ 15%" },
];