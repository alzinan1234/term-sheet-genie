"use client";

import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
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

export default NewSimulationModal;