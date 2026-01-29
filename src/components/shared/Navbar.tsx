"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed bg-white py-7 top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          
            <div>
                <img src="/logo/TermSheetGenie.png" alt="" />
            </div>
           
        </Link>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/auth/login" className="text-gray-600 hover:text-black font-bold  transition-colors">
            Log in
          </Link>
          <Link 
            href="/auth/signup" 
            className="bg-[#0A2A99] text-white px-8 py-2.5 rounded-full font-semibold hover:bg-blue-800 transition-all active:scale-95 shadow-lg shadow-blue-900/10"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-4 md:hidden"
          >
            <Link href="/login" className="text-gray-600 font-medium">Log in</Link>
            <Link href="/signup" className="bg-[#0A2A99] text-white px-6 py-3 rounded-full text-center font-semibold">
              Sign up
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
