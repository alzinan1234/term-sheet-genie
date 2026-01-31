"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import router
import { 
  ArrowLeft, MoreVertical, Plus, Edit2, Trash2, 
  X 
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ComposedChart, Bar, Line
} from 'recharts';

// --- Mock Data ---
const CAPITAL_FLOW_DATA = [
  { name: 'Q1 2023', calls: -2.5, returns: 1.2, fees: -0.2, flow: -1.5 },
  { name: 'Q2 2023', calls: -1.0, returns: 2.2, fees: -0.2, flow: 1.0 },
  { name: 'Q3 2023', calls: -3.2, returns: 1.5, fees: -0.2, flow: -2.0 },
  { name: 'Q4 2023', calls: -2.1, returns: 3.8, fees: -0.2, flow: 1.5 },
  { name: 'Q1 2024', calls: -1.5, returns: 4.2, fees: -0.2, flow: 2.5 },
  { name: 'Q2 2024', calls: -2.8, returns: 3.0, fees: -0.2, flow: 0.0 },
];

const SECTOR_DATA = [
  { name: 'Education', value: 20, color: '#6366F1' },
  { name: 'Energy', value: 20, color: '#22C55E' },
  { name: 'Finance', value: 20, color: '#EF4444' },
  { name: 'Healthcare', value: 20, color: '#F97316' },
  { name: 'Technology', value: 20, color: '#3B82F6' },
];

export default function PartnerDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter(); // Initialize router
  const [activeTab, setActiveTab] = useState<'overview' | 'funds'>('overview');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      {/* Breadcrumb / Back */}
      <button 
        onClick={() => router.back()} // Go back functionality
        className="flex items-center gap-2 text-[#667085] hover:text-[#101828] mb-6 transition-colors focus:outline-none"
      >
        <div className="p-1 border border-[#EAECF0] rounded-md">
           <ArrowLeft size={14} />
        </div>
        <span className="text-sm font-medium">Go back</span>
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl font-bold text-[#101828]">Olivia Rhye</h1>
        <span className="px-2.5 py-0.5 bg-[#ECFDF3] text-[#027A48] text-xs font-medium rounded-full flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#12B76A] rounded-full"></span>
          Active
        </span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#EAECF0] mb-8">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-3 text-sm font-medium transition-all relative focus:outline-none ${
            activeTab === 'overview' ? 'text-[#2D5BFF]' : 'text-[#667085]'
          }`}
        >
          Overview
          {activeTab === 'overview' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2D5BFF]" />}
        </button>
        <button 
          onClick={() => setActiveTab('funds')}
          className={`px-4 py-3 text-sm font-medium transition-all relative focus:outline-none ${
            activeTab === 'funds' ? 'text-[#2D5BFF]' : 'text-[#667085]'
          }`}
        >
          Funds
          {activeTab === 'funds' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2D5BFF]" />}
        </button>
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-8">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-6">
              <h3 className="text-lg font-bold text-[#101828] mb-6">Basic information</h3>
              <div className="grid grid-cols-2 gap-y-6">
                <div>
                  <p className="text-xs font-medium text-[#667085] uppercase tracking-wider mb-1">Type of Organization</p>
                  <p className="text-sm text-[#101828] font-medium">University Endowment</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#667085] uppercase tracking-wider mb-1">Maximum Commitment to Private Capital</p>
                  <p className="text-sm text-[#101828] font-medium">10%</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#667085] uppercase tracking-wider mb-1">Relationship Since</p>
                  <p className="text-sm text-[#101828] font-medium">December, 2023</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#667085] uppercase tracking-wider mb-1">Main point of contact</p>
                  <p className="text-sm text-[#101828] font-medium">Pedro Jimenez</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#667085] uppercase tracking-wider mb-1">Main point of contact role</p>
                  <p className="text-sm text-[#101828] font-medium">Director of Private Investments</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-[#667085] uppercase tracking-wider mb-1">Main point of contact email</p>
                  <p className="text-sm text-[#101828] font-medium">pjimenez@investor.com</p>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6 grid grid-cols-2 gap-4">
              {[
                { label: 'Total Committed Capital', value: '$50M' },
                { label: 'Total Invested Capital', value: '$30M' },
                { label: 'Total Returned Capital', value: '$40M' },
                { label: 'IRR to Date', value: '15%' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-[#EAECF0] shadow-sm">
                  <p className="text-[28px] font-bold text-[#101828] mb-1">{stat.value}</p>
                  <p className="text-xs font-medium text-[#667085]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-6 bg-white p-6 rounded-xl border border-[#EAECF0] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-[#101828]">Capital Calls</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#101828]">$10M</span>
                    <span className="text-sm font-medium text-[#12B76A]">+5%</span>
                  </div>
                </div>
                <button className="text-[#98A2B3] focus:outline-none"><MoreVertical size={20}/></button>
              </div>
              
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {/* style={{ outline: 'none' }} removes focus border on click */}
                  <ComposedChart data={CAPITAL_FLOW_DATA} style={{ outline: 'none' }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F2F4F7" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#667085'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#667085'}} />
                    <Tooltip cursor={{fill: '#F9FAFB'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} wrapperStyle={{ outline: 'none' }} />
                    <Bar dataKey="calls" fill="#EF4444" radius={[2, 2, 0, 0]} barSize={12} style={{ outline: 'none' }} />
                    <Bar dataKey="returns" fill="#22C55E" radius={[2, 2, 0, 0]} barSize={12} style={{ outline: 'none' }} />
                    <Bar dataKey="fees" fill="#F97316" radius={[2, 2, 0, 0]} barSize={12} style={{ outline: 'none' }} />
                    <Line type="monotone" dataKey="flow" stroke="#2D5BFF" strokeWidth={2} dot={{ r: 4, fill: '#2D5BFF', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <LegendItem color="#EF4444" label="Capital Calls" />
                <LegendItem color="#22C55E" label="Capital Returns" />
                <LegendItem color="#F97316" label="Management Fees" />
                <LegendItem color="#2D5BFF" label="Net Capital Flow" isLine />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6 bg-white rounded-xl border border-[#EAECF0] shadow-sm overflow-hidden">
               <div className="p-6 flex justify-between items-center border-b border-[#EAECF0]">
                  <h3 className="text-lg font-bold text-[#101828]">Invested Fund Summary</h3>
                  <button className="text-[#98A2B3] focus:outline-none"><MoreVertical size={20}/></button>
               </div>
               <table className="w-full text-left">
                  <thead className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                    <tr>
                      <th className="px-6 py-3 text-[11px] font-bold text-[#667085] uppercase">Fund Name</th>
                      <th className="px-6 py-3 text-[11px] font-bold text-[#667085] uppercase">Committed</th>
                      <th className="px-6 py-3 text-[11px] font-bold text-[#667085] uppercase">Invested</th>
                      <th className="px-6 py-3 text-[11px] font-bold text-[#667085] uppercase text-right">Returned</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAECF0]">
                    {['Olivia Rhye', 'Phoenix Baker', 'Lana Steiner', 'Demi Wilkinson'].map((name, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-[#101828] font-medium">{name}</td>
                        <td className="px-6 py-4 text-sm text-[#475467]">$5M</td>
                        <td className="px-6 py-4 text-sm text-[#475467]">$5M</td>
                        <td className="px-6 py-4 text-sm text-[#475467] text-right">$5M</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#EAECF0] shadow-sm overflow-hidden">
            <div className="p-6 flex justify-between items-center border-b border-[#EAECF0]">
              <h3 className="text-lg font-bold text-[#101828]">Contact List</h3>
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="bg-[#2D5BFF] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all focus:outline-none"
              >
                <Plus size={18} />
                Add Contact
              </button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <tr>
                  <th className="px-6 py-3 text-[11px] font-bold text-[#667085] uppercase">Name</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-[#667085] uppercase">Role</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-[#667085] uppercase">Email</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-[#667085] uppercase">Phone</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAECF0]">
                {[
                  { name: 'Pedro Jimenez', role: 'Director of Private Investments', email: 'example@gmail.com', phone: '+1 0 000 0000', img: 'https://i.pravatar.cc/150?u=pedro' },
                  { name: 'Phoenix Baker', role: 'Investment Analyst', email: 'example@gmail.com', phone: '+1 0 000 0000', img: 'https://i.pravatar.cc/150?u=phoenix' },
                  { name: 'Lana Steiner', role: 'Portfolio Manager', email: 'example@gmail.com', phone: '+1 0 000 0000', img: 'https://i.pravatar.cc/150?u=lana' },
                ].map((contact, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img src={contact.img} className="w-8 h-8 rounded-full object-cover" alt="" />
                      <span className="text-sm font-medium text-[#101828]">{contact.name}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#475467]">{contact.role}</td>
                    <td className="px-6 py-4 text-sm text-[#475467]">{contact.email}</td>
                    <td className="px-6 py-4 text-sm text-[#475467]">{contact.phone}</td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button className="text-[#98A2B3] hover:text-[#2D5BFF] transition-colors focus:outline-none"><Edit2 size={16}/></button>
                      <button className="text-[#98A2B3] hover:text-red-500 transition-colors focus:outline-none"><Trash2 size={16}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-white rounded-xl border border-[#EAECF0] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#EAECF0]">
              <h3 className="text-lg font-bold text-[#101828]">Invested Funds</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                  <tr>
                    <th className="px-6 py-3 text-[11px] font-bold text-[#667085] uppercase">Name</th>
                    <th className="px-6 py-3 text-[11px] font-bold text-[#667085] uppercase whitespace-nowrap">Investment Date</th>
                    <th className="px-6 py-3 text-[11px] font-bold text-[#667085] uppercase">Committed</th>
                    <th className="px-6 py-3 text-[11px] font-bold text-[#667085] uppercase">Called</th>
                    <th className="px-6 py-3 text-[11px] font-bold text-[#667085] uppercase">Returned</th>
                    <th className="px-6 py-3 text-[11px] font-bold text-[#667085] uppercase">Carry %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAECF0]">
                  {['Catalog', 'Circooles', 'Command+R', 'Hourglass'].map((fund, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#2D5BFF] font-bold text-xs">{fund[0]}</div>
                        <span className="text-sm font-medium text-[#101828]">{fund}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#475467]">Jan 19, 2024</td>
                      <td className="px-6 py-4 text-sm text-[#475467]">$5M</td>
                      <td className="px-6 py-4 text-sm text-[#475467]">$100</td>
                      <td className="px-6 py-4 text-sm text-[#475467]">$100</td>
                      <td className="px-6 py-4 text-sm text-[#475467]">5%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl border border-[#EAECF0] shadow-sm overflow-hidden">
               <div className="p-6 flex justify-between items-center border-b border-[#EAECF0]">
                  <h3 className="text-lg font-bold text-[#101828]">Portfolio companies</h3>
                  <button className="text-[#98A2B3] focus:outline-none"><MoreVertical size={20}/></button>
               </div>
               <table className="w-full text-left">
                  <thead className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                    <tr>
                      <th className="px-6 py-3 text-[11px] font-bold text-[#667085] uppercase">Name</th>
                      <th className="px-6 py-3 text-[11px] font-bold text-[#667085] uppercase">Invested Capital</th>
                      <th className="px-6 py-3 text-[11px] font-bold text-[#667085] uppercase">Sector</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAECF0]">
                    {[
                      { name: 'Tech Innovations Inc.', cap: '$200K', sec: 'Technology' },
                      { name: 'Green Energy Solutions', cap: '$200K', sec: 'Energy' },
                      { name: 'HealthTech Partners', cap: '$200K', sec: 'Healthcare' },
                      { name: 'FinServe Global', cap: '$200K', sec: 'Finance' },
                    ].map((comp, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-[#101828] font-medium">{comp.name}</td>
                        <td className="px-6 py-4 text-sm text-[#475467]">{comp.cap}</td>
                        <td className="px-6 py-4 text-sm text-[#475467]">{comp.sec}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#EAECF0] shadow-sm">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-[#101828]">Sector Allocation</h3>
                  <button className="text-[#98A2B3] focus:outline-none"><MoreVertical size={20}/></button>
               </div>
               <div className="h-[280px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    {/* style={{ outline: 'none' }} removes border on click */}
                    <PieChart style={{ outline: 'none' }}>
                      <Pie
                        data={SECTOR_DATA}
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {SECTOR_DATA.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color} 
                            style={{ outline: 'none' }} // Ensure cell click has no border
                          />
                        ))}
                      </Pie>
                      <Tooltip wrapperStyle={{ outline: 'none' }} />
                    </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
                  {SECTOR_DATA.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-[#475467] font-medium">{item.name} {item.value}%</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      )}

      {/* --- ADD NEW CONTACT MODAL --- */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0c111d]/30 backdrop-blur-[4px]" onClick={() => setIsContactModalOpen(false)} />
          <div className="relative bg-white w-full max-w-[480px] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-[#F2F4F7]">
              <h2 className="text-lg font-bold text-[#101828]">Add New Contact</h2>
              <button onClick={() => setIsContactModalOpen(false)} className="text-[#98A2B3] hover:text-[#667085] focus:outline-none"><X size={20} /></button>
            </div>
            <form className="p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-xs font-bold text-[#344054] uppercase tracking-wider block mb-1.5">Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter name" className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:border-[#2D5BFF] transition-all" />
              </div>
              <div>
                <label className="text-xs font-bold text-[#344054] uppercase tracking-wider block mb-1.5">Role <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter role" className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:border-[#2D5BFF] transition-all" />
              </div>
              <div>
                <label className="text-xs font-bold text-[#344054] uppercase tracking-wider block mb-1.5">Email <span className="text-red-500">*</span></label>
                <input type="email" placeholder="Enter email" className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:border-[#2D5BFF] transition-all" />
              </div>
              <div>
                <label className="text-xs font-bold text-[#344054] uppercase tracking-wider block mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" placeholder="Enter phone number" className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-xl outline-none focus:border-[#2D5BFF] transition-all" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsContactModalOpen(false)} className="flex-1 py-3 border border-[#D0D5DD] rounded-xl font-bold text-[#344054] hover:bg-gray-50 transition-all focus:outline-none">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-[#2D5BFF] hover:bg-blue-700 text-white rounded-xl font-bold transition-all focus:outline-none">Add Contact</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Helper Components ---
function LegendItem({ color, label, isLine = false }: { color: string; label: string; isLine?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div 
        className={`${isLine ? 'h-0.5 w-4' : 'h-3 w-3 rounded-sm'}`} 
        style={{ backgroundColor: color }} 
      />
      <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">{label}</span>
    </div>
  );
}