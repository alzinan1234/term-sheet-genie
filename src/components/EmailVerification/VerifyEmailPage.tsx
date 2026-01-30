"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const VerifyEmailPage: React.FC = () => {
  const router = useRouter();
  // Changed to an array of 6 strings for individual boxes
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

  // Handle individual box changes
  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value.replace(/\D/g, ''); // Only digits
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Get last char
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full h-full flex flex-col md:flex-row gap-6">
        
        {/* LEFT SIDE: FORM CONTAINER */}
        <div className="w-full md:w-[45%] lg:w-[32%] flex flex-col justify-center px-6 md:px-12 lg:px-20 py-12">
          
          <div className="mb-12">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo/TermSheetGenie.png" alt="TermSheetGenie" />
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-[32px] font-bold text-[#1A1C1E] mb-2 leading-tight">Confirm your email</h1>
            <p className="text-gray-500 text-sm">Enter the code we send you to your email</p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* OTP FIELD GROUP */}
            <div className="flex justify-between gap-2 sm:gap-4">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-14 sm:h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-2xl bg-gray-50/30 focus:border-[#0A2A99] focus:bg-white outline-none transition-all"
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
                  className="text-[#0A2A99] font-semibold hover:underline decoration-2 underline-offset-4 disabled:opacity-50"
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

          <p className="text-center text-sm font-medium text-gray-500 mt-8">
            Have an account? <Link href="/auth/login" className="text-[#0A2A99] font-bold hover:underline ml-1">Sign In</Link>
          </p>
        </div>

        {/* RIGHT SIDE: IMAGE */}
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