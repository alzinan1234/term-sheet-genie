"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const VerifyEmailPage: React.FC = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const [isResending, setIsResending] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    const email = sessionStorage.getItem('userEmail');
    if (!email) {
      router.push('/signup');
    } else {
      setUserEmail(email);
    }
  }, [router]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value.replace(/\D/g, ''); 
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalCode = otp.join("");
    
    if (finalCode.length !== 6) {
      alert('Please enter a valid 6-digit code');
      return;
    }

    setIsVerifying(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      sessionStorage.setItem('emailVerified', 'true');
      router.push('/role-selection');
    } catch (error) {
      alert('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Verification code resent to ' + userEmail);
    } catch (error) {
      alert('Failed to resend code.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white overflow-hidden">
      
      {/* 50/50 Grid Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
        
        {/* LEFT SIDE: CONTENT CONTAINER (50%) */}
        <div className="flex flex-col justify-center items-center px-6 md:px-12 bg-white">
          
          {/* Fixed width container: 434px */}
          <div className="w-full max-w-[434px]">
            
            {/* Brand Logo */}
            <div className="mb-10">
              <Link href="/" className="flex items-center gap-2">
                <img 
                  src="/logo/TermSheetGenie.png" 
                  alt="TermSheetGenie" 
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            {/* Header Text */}
            <div className="mb-8">
              <h1 className="text-[32px] font-bold text-[#1A1C1E] mb-2 leading-tight">
                Confirm your email
              </h1>
              <p className="text-gray-500 text-sm">
                Enter the code we send you to your email
              </p>
            </div>

            {/* OTP Form */}
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="flex justify-between gap-2">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-full h-14 text-center text-2xl font-bold border border-gray-200 rounded-xl bg-gray-50/50 focus:border-[#0A2A99] focus:ring-1 focus:ring-[#0A2A99] outline-none transition-all"
                  />
                ))}
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Not getting the code?{" "}
                  <button 
                    type="button"
                    onClick={handleResend}
                    disabled={isResending}
                    className="text-[#0A2A99] font-bold hover:underline disabled:opacity-50"
                  >
                    {isResending ? 'Resending...' : "Send again"}
                  </button>
                </p>
              </div>

              <button 
                type="submit"
                disabled={isVerifying || otp.join("").length !== 6}
                className="w-full bg-[#0A2A99] text-white py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition-all active:scale-[0.98] shadow-lg shadow-blue-900/10 disabled:opacity-50"
              >
                {isVerifying ? 'Verifying...' : 'Submit'}
              </button>
            </form>

            <p className="text-center text-sm font-medium text-gray-500 mt-10">
              Have an account? <Link href="/login" className="text-[#0A2A99] font-bold hover:underline ml-1">Sign In</Link>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: IMAGE (50%) */}
        <div className="hidden md:block relative h-full ">
          <div className="w-full h-full overflow-hidden rounded-l-[40px]">
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