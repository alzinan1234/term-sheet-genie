"use client";
import React, { useState } from "react";
import { Plus, MoreHorizontal, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SimulationResults from "../Simulator/SimulationResults";
import SimulationResultsWrapper from "./Simulationresultswrapper";



interface Simulation {
  id: string;
  companyName: string;
  description: string;
  scenarios: number;
  badgeColor: string;
}

// NewSimulationModal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string }) => void;
}

const NewSimulationModal: React.FC<ModalProps> = ({ isOpen, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setFormData({ name: "", description: "" });
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${
        isOpen && isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`relative w-[480px] rounded-xl bg-white p-8 shadow-xl transition-all duration-300 ease-out ${
          isOpen && isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[22px] font-bold text-[#1e293b] mb-1">Create New Simulation</h1>
          <p className="text-[15px] text-[#64748b]">Enter a name and description for your simulation</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Simulation Name */}
          <div className="space-y-2">
            <label className="text-[14px] font-semibold text-[#1e293b]">
              Simulation Name *
            </label>
            <input
              type="text"
              placeholder="e.g., Series A Scenario"
              className="w-full rounded-lg border border-[#e2e8f0] bg-white px-4 py-[10px] text-[15px] text-gray-800 placeholder:text-[#cbd5e1] focus:border-[#94a3b8] focus:outline-none transition-colors"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[14px] font-semibold text-[#1e293b]">Description</label>
            <textarea 
              rows={4}
              placeholder="Add a description for this simulation..."
              className="w-full resize-none rounded-lg border border-[#e2e8f0] bg-white px-4 py-[10px] text-[15px] text-gray-800 placeholder:text-[#cbd5e1] focus:border-[#94a3b8] focus:outline-none transition-colors"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end items-center gap-6 pt-4">
            <button 
              type="button"
              onClick={handleClose}
              className="text-[15px] font-medium text-[#64748b] hover:text-[#1e293b] transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={!formData.name.trim()}
              className="rounded-lg bg-[#94a3ff] px-8 py-[10px] text-[15px] font-bold text-white transition-all hover:bg-[#7e8fff] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface SimulationSectionProps {
  onSimulationOpen?: () => void;
  onSimulationClose?: () => void;
}

export default function SimulationSection({ onSimulationOpen, onSimulationClose }: SimulationSectionProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSimulation, setSelectedSimulation] = useState<Simulation | null>(null);
  const [showResults, setShowResults] = useState(false);

  const simulations: Simulation[] = [
    { id: "1", companyName: "Real-Time Data Analysis", description: "Generate Report", scenarios: 4, badgeColor: "bg-purple-50 text-purple-600 border-purple-100" },
    { id: "2", companyName: "Stellar Dynamics", description: "Projecting the necessary investment and its valuation in 5 years", scenarios: 3, badgeColor: "bg-blue-50 text-blue-600 border-blue-100" },
    { id: "3", companyName: "Nebula Innovations", description: "Projecting the necessary investment and its valuation in 5 years", scenarios: 1, badgeColor: "bg-orange-50 text-orange-600 border-orange-100" },
    { id: "4", companyName: "AstroTech Industries", description: "Projecting the necessary investment and its valuation in 5 years", scenarios: 2, badgeColor: "bg-green-50 text-green-600 border-green-100" },
    { id: "5", companyName: "Cosmic Solutions", description: "Projecting the necessary investment and its valuation in 5 years", scenarios: 4, badgeColor: "bg-purple-50 text-purple-600 border-purple-100" },
    { id: "6", companyName: "Galactic Enterprises", description: "Projecting the necessary investment and its valuation in 5 years", scenarios: 4, badgeColor: "bg-purple-50 text-purple-600 border-purple-100" },
  ];

  const handleCardClick = (simulation: Simulation) => {
    setSelectedSimulation(simulation);
    setShowResults(true);
    // Notify parent যে SimulationResults open হচ্ছে
    onSimulationOpen?.();
  };

  const handleModalSubmit = (data: { name: string; description: string }) => {
    // Store the simulation data in sessionStorage
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('simulationData', JSON.stringify(data));
      } catch (error) {
        console.error('Error saving simulation data:', error);
      }
    }
    setIsModalOpen(false);
    // Redirect to simulator page with timestamp to force refresh
    router.push(`/investor-admin/simulator?t=${Date.now()}`);
  };

  const handleStepBack = () => {
    setShowResults(false);
    setSelectedSimulation(null);
    // Notify parent যে SimulationResults close হচ্ছে
    onSimulationClose?.();
  };

  // যদি SimulationResults দেখানোর প্রয়োজন হয় - FULL SCREEN overlay দিয়ে দেখাবে
  if (showResults && selectedSimulation) {
    return (
      <SimulationResultsWrapper
        data={selectedSimulation}
        onStepBack={handleStepBack}
      >
        <SimulationResults 
          data={selectedSimulation}
          onStepBack={handleStepBack}
        />
      </SimulationResultsWrapper>
    );
  }

  // সিমুলেশন লিস্ট পেজ
  return (
    <div className="relative">
      <div className="mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Individual Investment Simulations</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#2D60FF] hover:bg-[#1a4bd6] text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 font-bold text-sm shadow-lg shadow-blue-100 transition-all active:scale-95"
          >
            <Plus size={18} /> Create New Simulation
          </button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {simulations.map((item) => (
            <div 
              key={item.id} 
              onClick={() => handleCardClick(item)}
              className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm cursor-pointer hover:shadow-md hover:border-gray-200 transition-all duration-200 group"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-[#1A2B49] group-hover:text-[#2D60FF] transition-colors">{item.companyName}</h3>
                <MoreHorizontal size={20} className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" onClick={(e) => e.stopPropagation()} />
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">{item.description}</p>
              <div className="flex justify-end">
                <span className={`px-4 py-1 rounded-full text-[10px] font-bold border ${item.badgeColor}`}>
                  {item.scenarios} scenarios
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <NewSimulationModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      </div>
    </div>
  );
}