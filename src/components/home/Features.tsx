"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, FileText, Users } from 'lucide-react';

const features = [
  {
    title: "Advanced Simulations",
    description: "Model multiple investment scenarios and understand the impact on ownership, dilution, and returns.",
    icon: <BarChart3 size={24} className="text-[#0A2A99]" />,
  },
  {
    title: "Clear Projections",
    description: "Visualize future funding rounds and their effects on your cap table with precision and clarity.",
    icon: <FileText size={24} className="text-[#0A2A99]" />,
  },    
  {
    title: "Efficient Management",
    description: "Manage your portfolio and term sheets in one place, built for the venture capital ecosystem.",
    icon: <Users size={24} className="text-[#0A2A99]" />,
  }
];

const Features = () => {
  return (
    <section className="bg-[#F8F9FB] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-4xl font-bold text-center text-[#1A1C1E] mb-16">
          Key Features
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-10 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 bg-[#EEF2FF] rounded-xl flex items-center justify-center mb-8">
                {feature.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-bold text-[#1A1C1E] mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-lg">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
