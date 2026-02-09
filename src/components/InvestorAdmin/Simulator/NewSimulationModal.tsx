// app/simulator/NewSimulationModal.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

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

  // Sync internal visibility with the isOpen prop
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      // Reset form when modal closes
      setFormData({ name: "", description: "" });
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
      // Let the parent handle the closing state
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    // Wait for the CSS transition (300ms) before telling the parent to unmount/hide
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen && isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleClose} // Clicking the backdrop also closes the modal
    >
      <div 
        className={`relative w-full max-w-2xl rounded-3xl bg-white p-10 shadow-2xl transition-all duration-300 ease-out ${
          isOpen && isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button 
          type="button"
          onClick={handleClose}
          className="absolute right-8 top-8 rounded-full border border-gray-200 p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <h1 className="mb-2 text-3xl font-bold text-gray-900">Create New Simulation</h1>
        <p className="mb-8 text-gray-600">Enter a name and description for your simulation</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Simulation Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Series A Scenario"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea 
              rows={4}
              placeholder="Add a description for this simulation..."
              className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button 
              type="button"
              onClick={handleClose}
              className="rounded-full border border-gray-300 bg-white px-8 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50 active:scale-[0.98]"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={!formData.name.trim()}
              className="rounded-full bg-[#2d63ff] px-8 py-3 font-medium text-white transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
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