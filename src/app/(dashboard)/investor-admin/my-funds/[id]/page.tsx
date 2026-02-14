"use client";
import React, { use, useState } from "react";
import { Plus, Edit2, ChevronDown, ChevronUp, FileText, ArrowLeft, Save, X, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// --- Types ---
interface PageProps {
  params: Promise<{ id: string }>;
}

type ModalType = 'portfolio' | 'potential' | 'partner' | 'team';

export default function FundDetailsPage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const fundId = resolvedParams.id;
  const fundTitle = fundId.split('-').join(' ').toUpperCase() || "NEXUS CAPITAL";

  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [activeModal, setActiveModal] = useState<{ type: ModalType; data?: any } | null>(null);
  
  // State for the new company form in modal
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyDescription, setNewCompanyDescription] = useState("");

  const closeModal = () => {
    setActiveModal(null);
    setNewCompanyName("");
    setNewCompanyDescription("");
  };

  // Handle adding a new portfolio company from modal
  const handleAddCompanyFromModal = (e: React.FormEvent) => {
    e.preventDefault();
    
    // First, add the company to the list (you can save it to your backend here)
    console.log("Adding new company:", {
      name: newCompanyName,
      description: newCompanyDescription,
      fundId: fundId
    });
    
    // Close the modal
    closeModal();
    
    // Then navigate to the 3-step investment information page
    setTimeout(() => {
      router.push(`/investor-admin/my-funds/${fundId}/add-company?companyName=${encodeURIComponent(newCompanyName)}&companyDescription=${encodeURIComponent(newCompanyDescription)}`);
    }, 100);
  };

  return (
    <div className="p-8 bg-[#F9FAFB] min-h-screen font-sans text-[#101828]">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <nav className="flex items-center gap-2 text-sm font-medium">
            <span className="text-gray-400">Fund Overview</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-bold">{fundTitle}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard label="Committed Capital" value="$100,000,000" badge="Label" />
          <MetricCard label="Invested Capital" value="$50,000,000" badge="Label" />
          <MetricCard label="AUM Excluding Dry Powder" value="5.000" badge="Label" />
          <MetricCard label="TSG NPV" value="5.000" badge="Label" />
        </div>

        {/* 1. Basic Fund Information */}
        <AccordionSection 
          title="Basic Fund Information" 
          rightElement={
            <button 
              onClick={(e) => { e.stopPropagation(); setIsEditingBasic(!isEditingBasic); }}
              className="flex items-center gap-2 text-[11px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-all"
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
            </div>
            <div className="space-y-6">
              <h3 className="text-[16px] font-bold text-gray-900 mb-4">Standard LP Terms</h3>
              <EditableInfoItem isEditing={isEditingBasic} label="Management Fees" defaultValue="2% annually" />
              <EditableInfoItem isEditing={isEditingBasic} label="Carry" defaultValue="Standard - 20%" />
            </div>
          </div>
        </AccordionSection>

        {/* 2. Investments Section */}
        <SectionTable 
          title="Investments" 
          description="Companies that this fund has invested in"
          buttonText="New Portfolio Company"
          onAdd={() => setActiveModal({ type: 'portfolio' })} // Open modal first
          columns={[
            { key: 'name', label: "Company" },
            { key: 'status', label: "Status" },
            { key: 'desc', label: "Description" },
            { key: 'docs', label: "Documents" },
            { key: 'amount', label: "Investment Amount" }
          ]}
          initialData={investmentData}
        />

        {/* 3. Investment Pipeline Section */}
        <SectionTable 
          title="Investment Pipeline" 
          description="Companies with attractive investment potential"
          buttonText="New Potential Investment"
          onAdd={() => setActiveModal({ type: 'potential' })}
          columns={[
            { key: 'name', label: "Company" },
            { key: 'desc', label: "Brief Description" },
            { key: 'companyStatus', label: "Company Status" },
            { key: 'decisionStatus', label: "Decision Status" }
          ]}
          initialData={pipelineData}
        />

        {/* 4. Limited Partners Section */}
        <SectionTable 
          title="Limited Partners" 
          description="Partners who have committed capital to this fund"
          buttonText="New Partner"
          onAdd={() => setActiveModal({ type: 'partner' })}
          columns={[
            { key: 'name', label: "Name" },
            { key: 'amount', label: "Committed Capital" },
            { key: 'fees', label: "Annual Fees" },
            { key: 'carry', label: "Carried Interest" }
          ]}
          initialData={lpData}
        />

        {/* 5. Active Team Section */}
        <SectionTable 
          title="Active Team" 
          description="Team members managing this fund"
          buttonText="New Team Member"
          onAdd={() => setActiveModal({ type: 'team' })}
          columns={[
            { key: 'name', label: "Name" },
            { key: 'position', label: "Position" }
          ]}
          initialData={teamData}
        />
      </div>

      {/* --- Dynamic Modals --- */}
      {activeModal && (
        <Modal 
          title={
            activeModal.type === 'portfolio' ? "Add new company" : 
            activeModal.type === 'potential' ? "Add new Potential Investment" :
            activeModal.type === 'partner' ? "Add new Partner" : "New member"
          }
          onClose={closeModal}
        >
          <form className="space-y-5" onSubmit={activeModal.type === 'portfolio' ? handleAddCompanyFromModal : (e) => { e.preventDefault(); closeModal(); }}>
            
            {/* PORTFOLIO MODAL */}
            {activeModal.type === 'portfolio' && (
              <>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-gray-500">Name of the company</label>
                  <input 
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                    className="w-full p-3.5 bg-[#F2F4F7] border border-transparent rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium" 
                    placeholder="Starlight Tech" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-gray-500">Description</label>
                  <textarea 
                    value={newCompanyDescription}
                    onChange={(e) => setNewCompanyDescription(e.target.value)}
                    className="w-full p-3.5 bg-[#F2F4F7] border border-transparent rounded-xl h-24 outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium resize-none" 
                    placeholder="Platform that simulates and evaluate investment contracts"
                    required
                  />
                </div>
              </>
            )}

            {/* POTENTIAL INVESTMENT MODAL */}
            {activeModal.type === 'potential' && (
              <>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-gray-500">Name of the company</label>
                  <input className="w-full p-3.5 bg-[#F2F4F7] border border-transparent rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium" placeholder="Starlight Tech" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-gray-500">Description</label>
                  <textarea className="w-full p-3.5 bg-[#F2F4F7] border border-transparent rounded-xl h-24 outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium resize-none" placeholder="Brief description..." />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-gray-500">Company Status</label>
                  <input className="w-full p-3.5 bg-[#F2F4F7] border border-transparent rounded-xl text-sm font-medium" placeholder="Raising" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-gray-500">Decision Status</label>
                  <input className="w-full p-3.5 bg-[#F2F4F7] border border-transparent rounded-xl text-sm font-medium" placeholder="Investment Committee" />
                </div>
              </>
            )}

            {/* NEW PARTNER MODAL (LP) */}
            {activeModal.type === 'partner' && (
              <>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-gray-500">Partner Name</label>
                  <input className="w-full p-3.5 bg-[#F2F4F7] border border-transparent rounded-xl text-sm font-medium" placeholder="Full name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-gray-500">Committed Capital</label>
                  <input className="w-full p-3.5 bg-[#F2F4F7] border border-transparent rounded-xl text-sm font-medium" placeholder="$0,000,000" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[13px] font-semibold text-gray-500">Annual Fees</label>
                    <input className="w-full p-3.5 bg-[#F2F4F7] border border-transparent rounded-xl text-sm font-medium" placeholder="0%" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-semibold text-gray-500">Carried Interest</label>
                    <input className="w-full p-3.5 bg-[#F2F4F7] border border-transparent rounded-xl text-sm font-medium" placeholder="0%" />
                  </div>
                </div>
              </>
            )}

            {/* NEW TEAM MEMBER MODAL */}
            {activeModal.type === 'team' && (
              <>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-gray-500">Name</label>
                  <input className="w-full p-3.5 bg-[#F2F4F7] border border-transparent rounded-xl text-sm font-medium outline-none" placeholder="Add the name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-gray-500">Email</label>
                  <input className="w-full p-3.5 bg-[#F2F4F7] border border-transparent rounded-xl text-sm font-medium outline-none" placeholder="example@gmail.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-gray-500">Role/Title</label>
                  <input className="w-full p-3.5 bg-[#F2F4F7] border border-transparent rounded-xl text-sm font-medium outline-none" placeholder="e.g. Lead Partner" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-gray-500">Permissions</label>
                  <div className="relative">
                    <select className="w-full p-3.5 bg-[#F2F4F7] border border-transparent rounded-xl text-sm font-medium outline-none appearance-none cursor-pointer">
                      <option value="">Select a group</option>
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </>
            )}

            {/* BUTTONS */}
            <button type="submit" className="w-full py-4 mt-4 text-white bg-[#2D60FF] hover:bg-blue-700 rounded-full font-bold text-sm shadow-lg shadow-blue-100 transition-all active:scale-[0.98]">
              {activeModal.type === 'team' ? 'Send invitation' : 
               activeModal.type === 'partner' ? 'Add Partner' : 'Add company'}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

// --- Helper Components ---

const Modal = ({ title, children, onClose }: any) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-white w-full max-w-[440px] rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
      <div className="p-8 pb-0 flex justify-between items-start">
        <h2 className="text-2xl font-bold text-[#101828] leading-tight pr-8">{title}</h2>
        <button onClick={onClose} className="p-1.5 border border-gray-200 rounded-full text-gray-400 hover:bg-gray-50 transition-colors">
          <X size={18}/>
        </button>
      </div>
      <div className="p-8 pt-6">{children}</div>
    </div>
  </div>
);

const SectionTable = ({ title, description, buttonText, columns, initialData, onAdd }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer group">
          <div className="flex items-center gap-2">
             <h2 className="font-bold text-lg text-[#101828]">{title}</h2>
             {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </div>
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">{description}</p>
        </div>
       
        <button  className="bg-[#2D60FF] hover:bg-blue-700 text-white px-5 py-2.5 rounded-[12px] text-xs font-bold flex items-center gap-2 transition-all active:scale-95">
          <Plus size={14} /> {buttonText}
        </button>
      
      </div>
      {isOpen && (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/40 text-[10px] text-gray-400 uppercase tracking-[0.1em] font-bold border-b border-gray-100">
                {columns.map((col: any) => (
                  <th key={col.key} className="px-8 py-4">{col.label}</th>
                ))}
                <th className="px-8 py-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {initialData.map((row: any, i: number) => (
                <tr key={i} className="hover:bg-blue-50/10 transition-colors">
                  {columns.map((col: any) => (
                    <td key={col.key} className="px-8 py-5">
                      {col.key === 'name' ? (
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-[#F2F4F7] rounded-xl flex items-center justify-center text-[#475467] font-bold text-xs">{row.name.charAt(0)}</div>
                          <div>
                            <div className="text-sm font-bold text-[#101828]">{row.name}</div>
                            {row.url && <div className="text-[10px] text-gray-400 font-medium">{row.url}</div>}
                          </div>
                        </div>
                      ) : col.key === 'status' || col.key === 'companyStatus' || col.key === 'decisionStatus' ? (
                        <StatusBadge status={row[col.key]} />
                      ) : col.key === 'docs' ? (
                        <FileText size={18} className="text-gray-300 hover:text-blue-500 cursor-pointer transition-colors" />
                      ) : (
                        <div className="text-sm font-bold text-[#101828]">{row[col.key]}</div>
                      )}
                    </td>
                  ))}
                  <td className="px-8 py-5 text-right"><button className="text-gray-300 hover:text-gray-600"><Edit2 size={14}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const isGreen = ["Active", "Currently Fundraising", "Investment Committee"].includes(status);
  const isBlue = ["Under Review"].includes(status);
  const isRed = ["Closed"].includes(status);
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border flex items-center gap-1.5 w-fit whitespace-nowrap
      ${isGreen ? 'bg-green-50 text-green-700 border-green-100' : 
        isBlue ? 'bg-blue-50 text-blue-700 border-blue-100' : 
        isRed ? 'bg-red-50 text-red-700 border-red-100' : 'bg-orange-50 text-orange-700 border-orange-100'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isGreen ? 'bg-green-500' : isBlue ? 'bg-blue-500' : isRed ? 'bg-red-500' : 'bg-orange-500'}`} />
      {status}
    </span>
  );
};

const MetricCard = ({ label, value, badge }: any) => (
  <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
    <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase border border-blue-100 tracking-wider">{badge}</span>
    <div className="text-[26px] font-bold mt-4 tracking-tight text-[#101828] leading-none">{value}</div>
    <div className="text-[12px] text-gray-400 font-bold uppercase tracking-wider mt-2">{label}</div>
  </div>
);

const AccordionSection = ({ title, children, rightElement }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div onClick={() => setIsOpen(!isOpen)} className="p-6 flex items-center justify-between border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
          {isOpen ? <ChevronUp size={18} className="text-gray-400"/> : <ChevronDown size={18} className="text-gray-400"/>}
          <h2 className="font-bold text-lg text-[#101828]">{title}</h2>
        </div>
        {rightElement}
      </div>
      {isOpen && <div className="animate-in fade-in duration-300">{children}</div>}
    </div>
  );
};

const InfoItem = ({ label, value, isStatus }: any) => (
  <div className="flex flex-col gap-1.5">
    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{label}</div>
    {isStatus ? <StatusBadge status={value} /> : <div className="text-[15px] font-bold text-[#101828]">{value}</div>}
  </div>
);

const EditableInfoItem = ({ label, defaultValue, isEditing }: any) => (
  <div className="flex flex-col gap-1.5">
    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{label}</div>
    {isEditing ? (
      <input defaultValue={defaultValue} className="text-[15px] font-bold text-[#101828] bg-[#F9FAFB] px-2 py-1 rounded-md border border-gray-200 outline-none focus:border-gray-400 transition-all w-full" />
    ) : (
      <div className="text-[15px] font-bold text-[#101828] py-1">{defaultValue}</div>
    )}
  </div>
);

// --- Mock Data ---
const investmentData = [
  { name: "Catalog", url: "catalogapp.io", status: "Active", desc: "Content curating app", amount: "$1,800" },
  { name: "Circooles", url: "getcircooles.com", status: "Active", desc: "Design software", amount: "$1,800" },
];
const pipelineData = [
  { name: "Starlight", desc: "AI Platform", companyStatus: "Raising", decisionStatus: "Under Review" },
];
const lpData = [
  { name: "Olivia Rhye", amount: "$1,250,000", fees: "15%", carry: "15%" },
];
const teamData = [
  { name: "John McIntire", position: "Lead Partner" },
];