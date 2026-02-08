// app/simulator/page.tsx
"use client";

import React, { useState } from 'react';
import NewSimulationModal from './NewSimulationModal';


const Simulator = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900">Simulator</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700"
        >
          Open Form
        </button>
      </div>

      <NewSimulationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Simulator;