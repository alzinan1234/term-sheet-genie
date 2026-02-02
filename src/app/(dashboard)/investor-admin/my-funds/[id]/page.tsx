"use client";
import React, { use, useState, useMemo } from "react";
import { Plus, Search, Edit2, ChevronDown, ChevronUp, FileText, ArrowLeft, Save, X } from "lucide-react";

// --- Types ---
interface PageProps {
  params: Promise<{ id: string }>;
}

export default function FundDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const fundId = resolvedParams.id;
  const fundTitle = fundId.split('-').join(' ').toUpperCase();

  // --- UI States ---
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [activeModal, setActiveModal] = useState<{ type: 'startup' | 'partner', data?: any } | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="p-8 bg-[#F9FAFB] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <nav className="text-sm font-medium">
            <span className="text-gray-400">Fund Overview</span>
            <span className="text-gray-300 mx-2">/</span>
            <span className="text-gray-900 font-bold">{fundTitle}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard label="Committed Capital" value="$100,000,000" badge="Label" color="blue" />
          <MetricCard label="Invested Capital" value="$50,000,000" badge="Label" color="purple" />
          <MetricCard label="AUM (Including Dry Powder)" value="5.000" badge="Label" color="green" />
          <MetricCard label="Total NPV" value="5.000" badge="Label" color="gray" />
        </div>

        {/* 1. Basic Fund Information Accordion */}
        <AccordionSection 
          title="Basic Fund Information" 
          rightElement={
            <button 
              onClick={(e) => { e.stopPropagation(); setIsEditingBasic(!isEditingBasic); }}
              className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-all"
            >
              {isEditingBasic ? <><Save size={14}/> Save</> : <><Edit2 size={14}/> Edit Info</>}
            </button>
          }
        >
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <EditableInfoItem isEditing={isEditingBasic} label="Inception Date" defaultValue="January 15, 2020" />
              <InfoItem label="Status" value="Active" isStatus />
              <EditableInfoItem isEditing={isEditingBasic} label="Lead General Partner" defaultValue="John McIntire" />
              <EditableInfoItem isEditing={isEditingBasic} label="Investment Period Ends" defaultValue="January 15, 2025" />
              <EditableInfoItem isEditing={isEditingBasic} label="Return Deadline" defaultValue="January 15, 2030" />
              <EditableInfoItem isEditing={isEditingBasic} label="Extension Option" defaultValue="24 months" />
            </div>
            <div className="space-y-6">
              <h3 className="text-[16px] font-bold text-gray-900 mb-4">Standard LP Terms</h3>
              <div className="grid grid-cols-1 gap-6">
                <EditableInfoItem isEditing={isEditingBasic} label="Management Fees" defaultValue="2% annually" />
                <EditableInfoItem isEditing={isEditingBasic} label="Carry (Type and Percentage)" defaultValue="Standard - 20%" />
                <EditableInfoItem isEditing={isEditingBasic} label="Hurdle Rate (%)" defaultValue="8%" />
              </div>
            </div>
          </div>
        </AccordionSection>

        {/* 2. Investments Section */}
        <SectionTable 
          title="Investments" 
          description="Companies that this fund has invested in"
          buttonText="New Portfolio Company"
          columns={[
            { key: 'name', label: "Company" },
            { key: 'status', label: "Status" },
            { key: 'desc', label: "Description" },
            { key: 'docs', label: "Documents" },
            { key: 'amount', label: "Investment Amount" }
          ]}
          initialData={investmentData}
          onAdd={() => setActiveModal({ type: 'startup' })}
          onEdit={(item: any) => setActiveModal({ type: 'startup', data: item })}
        />

        {/* 3. Limited Partners Section */}
        <SectionTable 
          title="Limited Partners" 
          description="Partners who have committed capital to this fund"
          buttonText="New Partner"
          columns={[
            { key: 'name', label: "Name" },
            { key: 'amount', label: "Committed Capital" },
            { key: 'carry', label: "Carried Interest" },
            { key: 'invested', label: "Invested Capital" },
            { key: 'returned', label: "Returned Capital" }
          ]}
          initialData={lpData}
          onAdd={() => setActiveModal({ type: 'partner' })}
          onEdit={(item: any) => setActiveModal({ type: 'partner', data: item })}
        />
      </div>

      {/* --- Modals --- */}
      {activeModal && (
        <Modal 
          title={activeModal.data ? `Edit ${activeModal.type === 'startup' ? 'Startup' : 'Partner'}` : `Add New ${activeModal.type === 'startup' ? 'Portfolio Company' : 'Partner'}`}
          onClose={closeModal}
        >
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase">Name</label>
                <input defaultValue={activeModal.data?.name} className="p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Enter name..." />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase">Primary Value</label>
                <input defaultValue={activeModal.data?.amount} className="p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="$0.00" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase">Details/Description</label>
              <textarea defaultValue={activeModal.data?.desc || activeModal.data?.subtext} className="p-3 bg-gray-50 border border-gray-100 rounded-xl h-24 outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Enter details..." />
            </div>
            <div className="flex gap-3 pt-4">
              <button type="button" onClick={closeModal} className="flex-1 py-3 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors">Cancel</button>
              <button type="submit" className="flex-1 py-3 text-sm font-bold text-white bg-[#2D60FF] hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-100 transition-all">
                {activeModal.data ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// --- Helper: Modal Component ---
const Modal = ({ title, children, onClose }: any) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
      <div className="p-8 border-b border-gray-50 flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#101828]">{title}</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full text-gray-400"><X size={20}/></button>
      </div>
      <div className="p-8">{children}</div>
    </div>
  </div>
);

// --- Helper: Accordion Wrapper ---
const AccordionSection = ({ title, children, rightElement }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-50 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          {isOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
          <h2 className="font-bold text-[#101828] text-lg">{title}</h2>
        </div>
        {rightElement}
      </div>
      {isOpen && <div className="animate-in fade-in slide-in-from-top-2 duration-300">{children}</div>}
    </div>
  );
};

// --- Helper: Table Section with Sorting ---
const SectionTable = ({ title, description, buttonText, columns, initialData, onEdit, onRowClick, onAdd }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' | null }>({ key: '', direction: null });

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const filteredAndSortedData = useMemo(() => {
    let data = [...initialData].filter((item: any) => 
      item.name.toLowerCase().includes(search.toLowerCase()) || 
      (item.subtext && item.subtext.toLowerCase().includes(search.toLowerCase()))
    );

    if (sortConfig.direction) {
      data.sort((a, b) => {
        const valA = String(a[sortConfig.key] || "");
        const valB = String(b[sortConfig.key] || "");
        return sortConfig.direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
    }
    return data;
  }, [search, initialData, sortConfig]);

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-3 group text-left">
          {isOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
          <div>
            <h2 className="font-bold text-[#101828] text-lg leading-tight">{title}</h2>
            <p className="text-xs text-gray-400 font-medium">{description}</p>
          </div>
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onAdd(); }}
          className="bg-[#2D60FF] hover:bg-[#1a4bd6] text-white px-5 py-2.5 rounded-[14px] text-xs font-bold flex items-center gap-2 transition-all shadow-md active:scale-95"
        >
          <Plus size={16} /> {buttonText}
        </button>
      </div>

      {isOpen && (
        <div className="animate-in fade-in duration-300">
          <div className="px-6 py-5 bg-[#FDFDFF]">
            <div className="relative max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder={`Filter ${title.toLowerCase()}...`}
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-[14px] text-sm outline-none focus:ring-4 focus:ring-blue-50 transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-[11px] text-gray-400 uppercase tracking-widest font-bold border-b border-gray-100">
                  {columns.map((col: any) => (
                    <th 
                      key={col.key} 
                      className="px-8 py-4 cursor-pointer hover:text-blue-600 select-none"
                      onClick={() => handleSort(col.key)}
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        {sortConfig.key === col.key && (sortConfig.direction === 'asc' ? <ChevronUp size={12}/> : <ChevronDown size={12}/>)}
                      </div>
                    </th>
                  ))}
                  <th className="px-8 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredAndSortedData.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-blue-50/20 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4 cursor-pointer" onClick={() => onRowClick && onRowClick(row)}>
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">{row.name.charAt(0)}</div>
                        <div>
                          <div className="text-sm font-bold text-[#101828] group-hover:text-blue-600">{row.name}</div>
                          <div className="text-[11px] text-gray-400 font-medium">{row.subtext}</div>
                        </div>
                      </div>
                    </td>
                    {columns.slice(1).map((col: any) => (
                      <td key={col.key} className="px-8 py-5">
                        {col.key === 'status' ? (
                          <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 w-fit border border-green-100">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> {row.status || 'Active'}
                          </span>
                        ) : col.key === 'docs' ? (
                          <FileText size={20} className="text-gray-300 hover:text-blue-500 transition-colors cursor-pointer" />
                        ) : (
                          <div className="flex items-center gap-2">
                             <span className="text-sm font-bold text-[#101828]">{row[col.key]}</span>
                             {row.change && col.key === 'amount' && <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md border border-green-100">{row.change}</span>}
                          </div>
                        )}
                      </td>
                    ))}
                    <td className="px-8 py-5 text-right">
                      <button onClick={() => onEdit(row)} className="p-2 opacity-0 group-hover:opacity-100 hover:bg-white rounded-lg transition-all border border-transparent hover:border-gray-100">
                        <Edit2 size={16} className="text-blue-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Standard UI Components ---
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

const EditableInfoItem = ({ label, defaultValue, isEditing }: any) => (
  <div className="flex flex-col gap-1.5">
    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.08em]">{label}</div>
    {isEditing ? (
      <input 
        type="text" 
        defaultValue={defaultValue} 
        className="text-[15px] font-bold text-[#101828] border-b border-blue-200 outline-none focus:border-blue-500 bg-blue-50/30 px-1 rounded"
      />
    ) : (
      <div className="text-[15px] font-bold text-[#101828]">{defaultValue}</div>
    )}
  </div>
);

// --- Mock Data ---
const investmentData = [
  { name: "Catalog", subtext: "catalogapp.io", desc: "Content curation app", amount: "$1,250,000", change: "+20%", status: "Active" },
  { name: "Circooles", subtext: "getcircooles.com", desc: "Design software", amount: "$3,750,000", change: "+10%", status: "Active" },
  { name: "Command+R", subtext: "cmdr.ai", desc: "Data prediction", amount: "$850,000", change: "+25%", status: "Active" },
  { name: "Hourglass", subtext: "hourglass.app", desc: "Productivity app", amount: "$1,500,000", change: "-20%", status: "Closed" },
];

const lpData = [
  { 
    name: "Olivia Rhye", 
    subtext: "Lead Partner", 
    amount: "$1,250,000", 
    carry: "15%", 
    invested: "$1,000,000", 
    returned: "$250,000" 
  },
  { 
    name: "Phoenix Baker", 
    subtext: "Institutional", 
    amount: "$3,750,000", 
    carry: "12%", 
    invested: "$2,500,000", 
    returned: "$0" 
  },
  { 
    name: "Lana Steiner", 
    subtext: "Individual", 
    amount: "$850,000", 
    carry: "12%", 
    invested: "$850,000", 
    returned: "$1,200,000" 
  },
];