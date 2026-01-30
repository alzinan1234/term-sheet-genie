"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdditionalInfoFormData {
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
    companyName: '',
    companySize: '1 - 10 employees',
    companyType: '',
    companySubtype: '',
    roleInCompany: '',
    phoneNumber: ''
  });

  useEffect(() => {
    // Check if user has selected a role
    const userRole = sessionStorage.getItem('userRole');
    const emailVerified = sessionStorage.getItem('emailVerified');
    
    if (!emailVerified || !userRole) {
      // If prerequisites not met, redirect appropriately
      if (!emailVerified) {
        router.push('/verify-email');
      } else {
        router.push('/role-selection');
      }
    }
  }, [router]);

  const companySizes: string[] = [
    '1 - 10 employees',
    '11 - 50 employees',
    '51 - 200 employees',
    '201 - 500 employees',
    '501 - 1000 employees',
    '1000+ employees'
  ];

  const companySubtypes: string[] = [
    'VC',
    'PE',
    'Search Fund',
    'Angel',
    'Family Office',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.companyName || !formData.roleInCompany) {
      alert('Please fill in all required fields (Company Name and Role)');
      return;
    }

    setIsLoading(true);

    try {
      // Get all stored data
      const userEmail = sessionStorage.getItem('userEmail');
      const userName = sessionStorage.getItem('userName');
      const userRole = sessionStorage.getItem('userRole');

      const completeData = {
        email: userEmail,
        name: userName,
        role: userRole,
        additionalInfo: formData
      };

      // TODO: Replace with your actual API call
      // const response = await fetch('/api/auth/complete-registration', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(completeData)
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Complete registration data:', completeData);

      // Clear session storage after successful registration
      sessionStorage.removeItem('userEmail');
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('emailVerified');
      sessionStorage.removeItem('userRole');

      // TODO: Set authentication token/session
      // localStorage.setItem('authToken', response.token);

      // Navigate to dashboard or home page
      alert('Registration completed successfully!');
      router.push('/investor-admin');
      
    } catch (error) {
      console.error('Registration completion error:', error);
      alert('Failed to complete registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm p-8 md:p-12">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#1A1C1E] mb-2">
            Additional Information
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Company Information Section */}
          <div>
            <h2 className="text-lg font-bold text-[#1A1C1E] mb-6">Company Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Company Name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">
                  Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="companyName"
                  placeholder="Name of the Company" 
                  value={formData.companyName}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A2A99] focus:ring-1 focus:ring-[#0A2A99] outline-none transition-all placeholder:text-gray-300 bg-gray-50/50 text-sm disabled:opacity-50"
                />
              </div>

              {/* Company Size */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">Size</label>
                <select 
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A2A99] focus:ring-1 focus:ring-[#0A2A99] outline-none transition-all bg-gray-50/50 text-sm text-gray-700 disabled:opacity-50"
                >
                  {companySizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              {/* Type of Company */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">Type of Company</label>
                <input 
                  type="text" 
                  name="companyType"
                  placeholder="Type of business" 
                  value={formData.companyType}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A2A99] focus:ring-1 focus:ring-[#0A2A99] outline-none transition-all placeholder:text-gray-300 bg-gray-50/50 text-sm disabled:opacity-50"
                />
              </div>

              {/* Subtype */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">Subtype</label>
                <select 
                  name="companySubtype"
                  value={formData.companySubtype}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A2A99] focus:ring-1 focus:ring-[#0A2A99] outline-none transition-all bg-gray-50/50 text-sm text-gray-700 disabled:opacity-50"
                >
                  <option value="">VC, PE, Search Fund, Angel...</option>
                  {companySubtypes.map((subtype) => (
                    <option key={subtype} value={subtype}>{subtype}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div>
            <h2 className="text-lg font-bold text-[#1A1C1E] mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Role in Company */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">
                  Role in Company <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="roleInCompany"
                  placeholder="Role/Position" 
                  value={formData.roleInCompany}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A2A99] focus:ring-1 focus:ring-[#0A2A99] outline-none transition-all placeholder:text-gray-300 bg-gray-50/50 text-sm disabled:opacity-50"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">Phone Number</label>
                <input 
                  type="tel" 
                  name="phoneNumber"
                  placeholder="--- ----" 
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A2A99] focus:ring-1 focus:ring-[#0A2A99] outline-none transition-all placeholder:text-gray-300 bg-gray-50/50 text-sm disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0A2A99] text-white py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition-all active:scale-[0.98] shadow-lg shadow-blue-900/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Completing Registration...' : 'Continue'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default AdditionalInfoPage;