"use client";
import React from "react";
import { motion } from "framer-motion";

const TermSheetGenieHero = () => {
  return (
    <section className="
      relative w-full 
       lg:min-h-[80vh]
      flex flex-col items-center justify-center pt-37
      px-4 sm:px-6 md:px-8
      bg-[#F8F9FB]
    ">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl
            font-bold text-[#1A1C1E]
            leading-tight md:leading-[1.1]
            tracking-tight
            mb-6 sm:mb-8
          "
        >
          Simulate and manage investment
          <br className="hidden md:block" />
          rounds with precision and ease
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="
            text-gray-500
            text-base sm:text-lg md:text-xl
            max-w-xl md:max-w-2xl
            mx-auto
            leading-relaxed
            mb-8 sm:mb-10
          "
        >
          TermSheetGenie helps venture capital firms and startups model
          investment scenarios, manage cap tables, and understand the real
          impact of term sheet decisions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="
            flex flex-col sm:flex-row
            items-stretch sm:items-center
            justify-center
            gap-4
            w-full
          "
        >
          {/* Primary Button */}
          <button className="
            bg-[#0A2A99] text-white
            px-8 sm:px-10 py-3 sm:py-4
            rounded-full
            font-semibold
            text-base sm:text-lg
            hover:bg-blue-800
            transition-all
            hover:shadow-xl hover:shadow-blue-900/20
            active:scale-95
            w-full sm:w-auto
            min-w-[220px]
          ">
            Request a Demo
          </button>

          {/* Secondary Button */}
          <button className="
            bg-white text-[#0A2A99]
            border-2 border-[#0A2A99]
            px-8 sm:px-10 py-3 sm:py-4
            rounded-full
            font-semibold
            text-base sm:text-lg
            hover:bg-blue-50
            transition-all
            active:scale-95
            w-full sm:w-auto
            min-w-[220px]
          ">
            Get Started Now
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default TermSheetGenieHero;
