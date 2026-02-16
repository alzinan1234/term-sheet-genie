"use client";
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface InviteFormData {
  email: string;
  role: string;
  type: string;
  permissions: string;
}

// --- Main Component ---
const MySettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'User' | 'Team'>('User');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <div className="min-h-screen  p-6 md:p-12 font-sans text-[#1A1C21]">
      <div className=" mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Settings</h1>
          <p className="text-gray-500 text-sm">Manage your account and team settings</p>
        </header>

        {/* Tab Switcher */}
        <div className="flex bg-[#E9EDF5] w-fit p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('User')}
            className={`px-6 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeTab === 'User' ? 'bg-white text-[#4F46E5] shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            User Settings
          </button>
          <button
            onClick={() => setActiveTab('Team')}
            className={`px-6 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeTab === 'Team' ? 'bg-white text-[#4F46E5] shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Team Settings
          </button>
        </div>

        {activeTab === 'User' ? <UserSettingsView /> : <TeamSettingsView onOpenInvite={() => setIsInviteModalOpen(true)} />}
      </div>

      {/* Invite New User Modal */}
      {isInviteModalOpen && (
        <InviteUserModal 
          isOpen={isInviteModalOpen} 
          onClose={() => setIsInviteModalOpen(false)} 
        />
      )}
    </div>
  );
};

// --- User Settings Tab Content ---
const UserSettingsView = () => {
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: "john.investor@fundgroup.com",
    phone: "+1 (555) 123-4567"
  });

  const [notifications, setNotifications] = useState({
    activity: true,
    capital: false,
    security: true
  });

  const handleToggle = (key: keyof typeof notifications) => {
    if (key === 'security') return; 
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Profile Information */}
      <section className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
        <h2 className="text-lg font-bold mb-6">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReadOnlyInput label="NAME" value="John Smith" />
          <ReadOnlyInput label="USERNAME" value="john.smith" />
          <ReadOnlyInput label="COMPANY NAME" value="Acme Fund Group" />
          <ReadOnlyInput label="ROLE" value="Managing Partner" />
          <div className="md:col-span-2">
            <ReadOnlyInput label="COMPANY TYPE" value="Venture Capital" />
          </div>
        </div>
      </section>

      {/* Contact Information - NOW EDITABLE */}
      <section className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Contact Information</h2>
          {!isEditingContact ? (
            <button 
              onClick={() => setIsEditingContact(true)}
              className="text-[#4F46E5] text-sm font-medium flex items-center gap-1 hover:underline"
            >
              <span className="text-xs">✎</span> Edit
            </button>
          ) : (
            <div className="flex gap-4">
               <button 
                onClick={() => setIsEditingContact(false)}
                className="text-gray-400 text-sm font-medium hover:text-gray-600"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                    setIsEditingContact(false);
                    alert("Contact information updated!");
                }}
                className="text-[#4F46E5] text-sm font-bold hover:underline"
              >
                Save
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
            {isEditingContact ? (
              <input 
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                className="w-full p-3 bg-white border border-[#4F46E5] rounded-lg text-gray-800 text-sm outline-none focus:ring-2 focus:ring-[#4F46E5]/10"
              />
            ) : (
              <div className="p-3 bg-gray-50/50 border border-gray-200 rounded-lg text-gray-600 text-sm">{contactInfo.email}</div>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
            {isEditingContact ? (
              <input 
                type="text"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                className="w-full p-3 bg-white border border-[#4F46E5] rounded-lg text-gray-800 text-sm outline-none focus:ring-2 focus:ring-[#4F46E5]/10"
              />
            ) : (
              <div className="p-3 bg-gray-50/50 border border-gray-200 rounded-lg text-gray-600 text-sm">{contactInfo.phone}</div>
            )}
          </div>
        </div>
      </section>

      {/* Security & Sessions */}
      <section className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
        <h2 className="text-lg font-bold mb-6">Security</h2>
        <div className="space-y-6">
          <SecurityRow title="Change Password" desc="Update your account password" action={() => alert('Change Password Modal')} actionLabel="Change" />
          <SecurityRow title="Two-Factor Authentication" desc="Enabled" isTag action={() => alert('Manage 2FA')} actionLabel="Manage" />
          <div className="flex justify-between items-center pt-2">
            <div>
              <p className="font-semibold text-sm">Active Sessions</p>
              <p className="text-xs text-gray-400">3 active devices • Last activity: 2 minutes ago</p>
            </div>
            <button onClick={() => confirm('Sign out of all devices?')} className="text-[#D92D20] font-bold text-sm">Sign Out All</button>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
        <h2 className="text-lg font-bold mb-6">Notifications</h2>
        <div className="space-y-6">
          <NotificationRow 
            title="Fund Activity Updates" 
            desc="Receive updates on fund performance and changes" 
            isActive={notifications.activity} 
            onToggle={() => handleToggle('activity')} 
          />
          <NotificationRow 
            title="Capital Calls / Distributions" 
            desc="Notifications for capital calls and distributions" 
            isActive={notifications.capital} 
            onToggle={() => handleToggle('capital')} 
          />
          <NotificationRow 
            title="Security Alerts" 
            desc="Critical security notifications (always enabled)" 
            isActive={notifications.security} 
            isLocked 
          />
        </div>
      </section>
    </div>
  );
};

// --- Team Settings Tab Content ---
const TeamSettingsView = ({ onOpenInvite }: { onOpenInvite: () => void }) => {
  const [companyData, setCompanyData] = useState({
    name: "Acme Fund Group",
    type: "Venture Capital",
    classification: "Registered Investment Advisor"
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <section className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
        <h2 className="text-lg font-bold mb-6">Company Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Company Name</label>
            <input 
              type="text" 
              value={companyData.name} 
              onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#4F46E5]/10 focus:border-[#4F46E5] text-sm font-medium" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Company Type</label>
            <div className="relative">
              <select 
                value={companyData.type}
                onChange={(e) => setCompanyData({...companyData, type: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-lg bg-white outline-none text-sm appearance-none font-medium"
              >
                <option>Venture Capital</option>
                <option>Private Equity</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none">▼</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Regulatory Classification</label>
            <div className="relative">
              <select 
                value={companyData.classification}
                onChange={(e) => setCompanyData({...companyData, classification: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-lg bg-white outline-none text-sm appearance-none font-medium"
              >
                <option>Registered Investment Advisor</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none">▼</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Firm ID</label>
            <div className="relative">
              <input disabled defaultValue="FG-2024-001" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 text-sm cursor-not-allowed font-medium" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm">🔒</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center gap-6 pt-2">
          <button onClick={() => alert('Cancelled')} className="text-sm font-medium text-gray-400 hover:text-gray-600">Cancel</button>
          <button onClick={() => alert('Saved')} className="px-6 py-2.5 bg-[#2D60FF] text-white rounded-lg font-bold text-sm shadow-sm hover:opacity-90 transition-opacity">Save Changes</button>
        </div>
      </section>

      {/* Users & Permissions Table */}
      <section className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="p-8 flex justify-between items-center">
          <h2 className="text-lg font-bold">Users & Permissions</h2>
          <button onClick={onOpenInvite} className="bg-[#2D60FF] text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm hover:opacity-90">Invite New User</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F9FAFB] text-[10px] font-bold text-gray-400 uppercase tracking-widest border-y border-gray-50">
              <tr>
                <th className="px-8 py-4">Name</th>
                <th className="px-4 py-4">User ID</th>
                <th className="px-4 py-4">Type</th>
                <th className="px-4 py-4">Role</th>
                <th className="px-4 py-4">Permissions</th>
                <th className="px-4 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <UserTableRow name="John Smith" id="JS-001" type="Internal" role="Managing Partner" perm="Admin" />
              <UserTableRow name="Sarah Johnson" id="SJ-002" type="Internal" role="Investment Analyst" perm="Edit" />
              <UserTableRow name="Michael Chen" id="MC-003" type="External" role="Limited Partner" perm="View Only" status="Pending" />
            </tbody>
          </table>
        </div>
      </section>

      {/* Billing */}
      <section className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
        <h2 className="text-lg font-bold mb-8">Billing Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <StatBox label="Active Users" value="3" />
          <StatBox label="Current Plan" value="Professional" />
          <StatBox label="Monthly Cost" value="$2,500" subValue="per user" />
        </div>
        <div className="space-y-6">
          <BillingRow label="Payment Method" actionLabel="Change" onAction={() => alert('Change Payment')}
            content={<div className="flex items-center gap-4">
              <div className="w-10 h-7 bg-white border border-gray-200 rounded flex items-center justify-center text-lg">💳</div>
              <div><p className="text-sm font-bold text-[#1A1C21]">Card ending in 4242</p><p className="text-xs text-gray-400">Expires 12/2026</p></div>
            </div>} 
          />
          <div>
            <p className="text-[11px] font-bold text-[#1A1C21] mb-4">Invoice History</p>
            <div className="space-y-1">
              <InvoiceRow date="Jan 1, 2026" id="INV-2026-001" amount="2,500.00" />
              <InvoiceRow date="Dec 1, 2025" id="INV-2025-012" amount="2,500.00" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Invite New User Modal ---
const InviteUserModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState<InviteFormData>({
    email: '',
    role: '',
    type: 'Internal',
    permissions: 'Edit'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.role) {
      alert('Please fill in all required fields');
      return;
    }
    console.log('Invite data:', formData);
    alert(`Invitation sent to ${formData.email}`);
    setFormData({ email: '', role: '', type: 'Internal', permissions: 'Edit' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-[440px] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        {/* Header */}
        <div className="p-8 pb-6 flex justify-between items-start border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1C21] leading-tight">Invite New User</h2>
            <p className="text-sm text-gray-400 mt-2">Add a new team member to your organization</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 border border-gray-200 rounded-full text-gray-400 hover:bg-gray-50 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address *</label>
            <input 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="user@example.com"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm outline-none focus:ring-2 focus:ring-[#2D60FF]/20 focus:border-[#2D60FF] font-medium"
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Role/Title *</label>
            <input 
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g. Investment Manager"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm outline-none focus:ring-2 focus:ring-[#2D60FF]/20 focus:border-[#2D60FF] font-medium"
            />
          </div>

          {/* User Type */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">User Type</label>
            <div className="relative">
              <select 
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm outline-none focus:ring-2 focus:ring-[#2D60FF]/20 focus:border-[#2D60FF] appearance-none font-medium"
              >
                <option value="Internal">Internal</option>
                <option value="External">External</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none">▼</span>
            </div>
          </div>

          {/* Permissions */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Permissions</label>
            <div className="relative">
              <select 
                value={formData.permissions}
                onChange={(e) => setFormData({ ...formData, permissions: e.target.value })}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm outline-none focus:ring-2 focus:ring-[#2D60FF]/20 focus:border-[#2D60FF] appearance-none font-medium"
              >
                <option value="Admin">Admin</option>
                <option value="Edit">Edit</option>
                <option value="View Only">View Only</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none">▼</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg font-bold text-sm transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 text-white bg-[#2D60FF] hover:bg-blue-700 rounded-lg font-bold text-sm shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
            >
              Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Helper Components ---

const ReadOnlyInput = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
    <div className="relative">
      <input disabled value={value} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 font-medium cursor-not-allowed text-sm" />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm">🔒</span>
    </div>
  </div>
);

const SecurityRow = ({ title, desc, action, actionLabel, isTag }: any) => (
  <div className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0">
    <div>
      <p className="font-semibold text-sm">{title}</p>
      {isTag ? <span className="inline-block mt-1 px-2 py-0.5 bg-[#ECFDF3] text-[#027A48] text-[9px] font-bold rounded">ENABLED</span> : <p className="text-xs text-gray-400 mt-1">{desc}</p>}
    </div>
    <button onClick={action} className="text-[#2D60FF] font-bold text-sm">{actionLabel}</button>
  </div>
);

const NotificationRow = ({ title, desc, isLocked, isActive, onToggle }: any) => (
  <div className="flex justify-between items-center py-2">
    <div className="max-w-md">
      <div className="flex items-center gap-2">
        <p className="font-semibold text-sm">{title}</p>
        {isLocked && <span className="text-gray-300 text-xs">🔒</span>}
      </div>
      <p className="text-xs text-gray-400 mt-1">{desc}</p>
    </div>
    <div onClick={onToggle} className={`w-10 h-5 rounded-full relative transition-all cursor-pointer ${isActive ? 'bg-[#2D60FF]' : 'bg-gray-200'} ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-all shadow-sm ${isActive ? 'right-1' : 'left-1'}`} />
    </div>
  </div>
);

const UserTableRow = ({ name, id, type, role, perm, status }: any) => {
  const [currentRole, setCurrentRole] = useState(role);
  return (
    <tr className="text-sm hover:bg-gray-50/50 transition-colors">
      <td className="px-8 py-5">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#1A1C21]">{name}</span>
          {status === 'Pending' && <span className="px-2 py-0.5 bg-[#FFF4E5] text-[#B45309] text-[9px] font-bold rounded uppercase">Pending</span>}
        </div>
      </td>
      <td className="px-4 py-5 text-gray-400 font-medium text-xs">{id}</td>
      <td className="px-4 py-5">
        <select className="w-full p-2 border border-gray-200 rounded-lg bg-white text-xs font-medium" defaultValue={type}>
          <option>Internal</option>
          <option>External</option>
        </select>
      </td>
      <td className="px-4 py-5">
        <input value={currentRole} onChange={(e) => setCurrentRole(e.target.value)} className="w-full p-2 border border-gray-200 rounded-lg text-xs font-medium" />
      </td>
      <td className="px-4 py-5">
        <select className="w-full p-2 border border-gray-200 rounded-lg bg-white text-xs font-medium" defaultValue={perm}>
          <option>Admin</option>
          <option>Edit</option>
          <option>View Only</option>
        </select>
      </td>
      <td className="px-4 py-5 text-center text-gray-300 cursor-pointer">⋮</td>
    </tr>
  );
};

const StatBox = ({ label, value, subValue }: any) => (
  <div>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{label}</p>
    <div className="flex items-baseline gap-1">
      <p className="text-3xl font-bold text-[#1A1C21]">{value}</p>
      {subValue && <p className="text-[10px] text-gray-400 font-medium">{subValue}</p>}
    </div>
  </div>
);

const BillingRow = ({ label, content, actionLabel, onAction }: any) => (
  <div>
    <p className="text-[11px] font-bold text-[#1A1C21] mb-3">{label}</p>
    <div className="flex justify-between items-center p-4 bg-gray-50/50 border border-gray-100 rounded-xl">
      {content}
      <button onClick={onAction} className="text-[#2D60FF] text-sm font-bold">{actionLabel}</button>
    </div>
  </div>
);

const InvoiceRow = ({ date, id, amount }: any) => (
  <div className="flex justify-between items-center p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 rounded-lg transition-colors">
    <div>
      <p className="text-sm font-bold text-[#1A1C21]">{date}</p>
      <p className="text-[10px] text-gray-400 font-medium uppercase">{id}</p>
    </div>
    <div className="flex items-center gap-6">
      <p className="text-sm font-bold text-[#1A1C21]">${amount}</p>
      <button className="text-gray-300 hover:text-[#2D60FF]">↓</button>
    </div>
  </div>
);

export default MySettings;