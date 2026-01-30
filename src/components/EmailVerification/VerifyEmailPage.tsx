"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const VerifyEmailPage: React.FC = () => {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [isResending, setIsResending] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    // Get email from sessionStorage
    const email = sessionStorage.getItem('userEmail');
    if (!email) {
      // If no email in session, redirect to signup
      router.push('/signup');
    } else {
      setUserEmail(email);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (verificationCode.length !== 6) {
      alert('Please enter a valid 6-digit code');
      return;
    }

    setIsVerifying(true);

    try {
      // TODO: Replace with your actual API call
      // const response = await fetch('/api/auth/verify-email', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: userEmail, code: verificationCode })
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mark email as verified
      sessionStorage.setItem('emailVerified', 'true');

      // Navigate to role selection page
      router.push('/auth/role-selection');
      
    } catch (error) {
      console.error('Verification error:', error);
      alert('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);

    try {
      // TODO: Replace with your actual API call
      // await fetch('/api/auth/resend-verification', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: userEmail })
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Verification code resent to ' + userEmail);
    } catch (error) {
      console.error('Resend error:', error);
      alert('Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setVerificationCode(value);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      
      <div className="w-full h-full flex flex-col md:flex-row gap-6">
        
        {/* LEFT SIDE: FORM CONTAINER */}
        <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col justify-center px-6 md:px-12 lg:px-20 py-12 rounded-[32px]">
          
          {/* Brand Logo */}
          <div className="mb-12">
            <Link href="/" className="flex items-center gap-2 group">
              <div>
                <img src="/logo/TermSheetGenie.png" alt="TermSheetGenie" />
              </div>
            </Link>
          </div>

          {/* Header Text */}
          <div className="mb-8">
            <h1 className="text-[32px] font-bold text-[#1A1C1E] mb-2 leading-tight">Confirm your email</h1>
            <p className="text-gray-500 text-sm">Enter the code we sent to {userEmail || 'your email'}</p>
          </div>

          {/* Verification Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Verification Code</label>
              <input 
                type="text" 
                placeholder="Enter 6-digit code" 
                maxLength={6}
                value={verificationCode}
                onChange={handleCodeChange}
                disabled={isVerifying}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#0A2A99] focus:ring-1 focus:ring-[#0A2A99] outline-none transition-all placeholder:text-gray-300 bg-gray-50/50 text-center text-2xl font-semibold tracking-widest"
              />
            </div>

            <div className="text-center py-2">
              <button 
                type="button"
                onClick={handleResend}
                disabled={isResending || isVerifying}
                className="text-xs font-medium text-gray-600 hover:text-[#0A2A99] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? 'Resending...' : "Didn't get the code? Resend it now"}
              </button>
            </div>

            <button 
              type="submit"
              disabled={isVerifying || verificationCode.length !== 6}
              className="w-full bg-[#0A2A99] text-white py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition-all active:scale-[0.98] shadow-lg shadow-blue-900/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? 'Verifying...' : 'Submit'}
            </button>
          </form>

          <p className="text-center text-sm font-medium text-gray-500 mt-8">
            Have an account? <Link href="/auth/login" className="text-[#0A2A99] font-bold hover:underline ml-1">Sign In</Link>
          </p>
        </div>

        {/* RIGHT SIDE: FULL DISPLAY IMAGE WITH LEFT ROUNDED CORNERS */}
        <div className="hidden md:block flex-1 relative h-screen">
          <div className="absolute inset-0 overflow-hidden rounded-l-[40px]">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
              alt="Modern Skyscrapers" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default VerifyEmailPage;