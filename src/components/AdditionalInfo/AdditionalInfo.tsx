"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdditionalInfoFormData {
  firstName: string; // Added
  lastName: string;  // Added
  companyName: string;
  companySize: string;
  companyType: string;
  companySubtype: string;
  roleInCompany: string;
  phoneNumber: string;
}

const AdditionalInfoPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<AdditionalInfoFormData>({
    firstName: '', // Added
    lastName: '',  // Added
    companyName: '',
    companySize: '', // Changed to empty for placeholder logic
    companyType: '',
    companySubtype: '',
    roleInCompany: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const userRole = sessionStorage.getItem('userRole');
    const emailVerified = sessionStorage.getItem('emailVerified');
    
    // Autofill Name from Session Storage
    const fullName = sessionStorage.getItem('userName') || '';
    const nameParts = fullName.split(' ');
    
    setFormData(prev => ({
      ...prev,
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || ''
    }));

    if (!emailVerified || !userRole) {
      if (!emailVerified) {
        router.push('/verify-email');
      } else {
        router.push('/role-selection');
      }
    }
  }, [router]);

  const companySizes: string[] = [
    '1 - 10 employees', '11 - 50 employees', '51 - 200 employees',
    '201 - 500 employees', '501 - 1000 employees', '1000+ employees'
  ];

  const companySubtypes: string[] = [
    'VC', 'PE', 'Search Fund', 'Angel', 'Family Office', 'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.roleInCompany) {
      alert('Please fill in all required fields (Company Name and Position)');
      return;
    }

    setIsLoading(true);

    try {
      const userRole = sessionStorage.getItem('userRole');
      const userEmail = sessionStorage.getItem('userEmail');

      const completeData = {
        email: userEmail,
        name: `${formData.firstName} ${formData.lastName}`, // Updated to use current form state
        role: userRole,
        additionalInfo: formData
      };

      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Final Registration Data:', completeData);

      sessionStorage.removeItem('userEmail');
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('emailVerified');
      sessionStorage.removeItem('userRole');

      alert('Registration completed successfully!');

      switch (userRole) {
        case 'investor': router.push('/investor-admin'); break;
        case 'entrepreneur': router.push('/entrepreneur-admin'); break;
        case 'student': router.push('/student-dashboard'); break;
        default: router.push('/'); break;
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      alert('Failed to complete registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#1A1C1E] mb-2">Additional Information</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Moved and Updated */}
          <div>
            <h2 className="text-lg font-bold text-[#1A1C1E] mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} disabled={isLoading} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A2A99] outline-none bg-gray-50/50 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} disabled={isLoading} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A2A99] outline-none bg-gray-50/50 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">Position <span className="text-red-500">*</span></label>
                <input type="text" name="roleInCompany" placeholder="Role/Position" value={formData.roleInCompany} onChange={handleInputChange} disabled={isLoading} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A2A99] outline-none bg-gray-50/50 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">Phone Number</label>
                <input type="tel" name="phoneNumber" placeholder="+1 (555) 000-0000" value={formData.phoneNumber} onChange={handleInputChange} disabled={isLoading} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A2A99] outline-none bg-gray-50/50 text-sm" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#1A1C1E] mb-6">Company Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">Name <span className="text-red-500">*</span></label>
                <input type="text" name="companyName" placeholder="Name of the Company" value={formData.companyName} onChange={handleInputChange} disabled={isLoading} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A2A99] outline-none bg-gray-50/50 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">Size</label>
                <select name="companySize" value={formData.companySize} onChange={handleInputChange} disabled={isLoading} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A2A99] outline-none bg-gray-50/50 text-sm text-gray-500">
                  <option value="" disabled hidden>Select Number of Employees</option>
                  {companySizes.map((size) => <option key={size} value={size} className="text-black">{size}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">Type of Company</label>
                <input type="text" name="companyType" placeholder="Type of business" value={formData.companyType} onChange={handleInputChange} disabled={isLoading} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A2A99] outline-none bg-gray-50/50 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">Entity Type</label>
                <select name="companySubtype" value={formData.companySubtype} onChange={handleInputChange} disabled={isLoading} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A2A99] outline-none bg-gray-50/50 text-sm text-gray-500">
                  <option value="" disabled hidden>Select Type of Entity</option>
                  {companySubtypes.map((subtype) => <option key={subtype} value={subtype} className="text-black">{subtype}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" disabled={isLoading} className="w-full bg-[#0A2A99] text-white py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition-all shadow-lg disabled:opacity-50">
              {isLoading ? 'Completing Registration...' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdditionalInfoPage;