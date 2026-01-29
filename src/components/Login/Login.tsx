"use client";

import React from 'react';
import Link from 'next/link';

const LoginPage = () => {
  return (
    // Outer container with light grey background and full screen height
    <div className="min-h-screen  flex items-center justify-center ">
      
      <div className="w-full  h-full flex flex-col md:flex-row gap-6">
        
        {/* LEFT SIDE: FORM CONTAINER */}
        <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col justify-center px-6 md:px-12 lg:px-20 py-12  rounded-[32px] ">
          
          {/* Brand Logo */}
          <div className="mb-12">
          <Link href="/" className="flex items-center gap-2 group">
          
            <div>
                <img src="/logo/TermSheetGenie.png" alt="" />
            </div>
        
        </Link>
          </div>

          {/* Header Text */}
          <div className="mb-8">
            <h1 className="text-[32px] font-bold text-[#1A1C1E] mb-2 leading-tight">Welcome back!</h1>
            <p className="text-gray-500 text-sm">Enter your credentials to access your account</p>
          </div>

          {/* Login Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Email address</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#0A2A99] focus:ring-1 focus:ring-[#0A2A99] outline-none transition-all placeholder:text-gray-300 bg-gray-50/50"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Password</label>
                <button type="button" className="text-xs font-bold text-[#0A2A99] hover:underline">Forgot password?</button>
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#0A2A99] focus:ring-1 focus:ring-[#0A2A99] outline-none transition-all placeholder:text-gray-300 bg-gray-50/50"
              />
            </div>

            <div className="flex items-center gap-2 py-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-[#0A2A99] focus:ring-[#0A2A99]" />
              <label htmlFor="remember" className="text-xs font-medium text-gray-600">Remember this account</label>
            </div>

            <button className="w-full bg-[#0A2A99] text-white py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition-all active:scale-[0.98] shadow-lg shadow-blue-900/10">
              Log in
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <span className="bg-white px-4">Or continue with</span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <button className="flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-all font-semibold text-xs text-gray-700">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-all font-semibold text-xs text-black">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.03 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.702z"/></svg>
              Apple
            </button>
          </div>

          <p className="text-center text-sm font-medium text-gray-500">
            Don't have an account? <Link href="/auth/signup" className="text-[#0A2A99] font-bold hover:underline ml-1">Sign Up</Link>
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

export default LoginPage;