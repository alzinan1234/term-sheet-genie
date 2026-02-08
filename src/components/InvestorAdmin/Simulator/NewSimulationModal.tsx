// components/NewSimulationModal.tsx
"use client";

import React, { useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewSimulationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "Bug type #1",
    fund: "Bug type #1",
    description: "Playing around",
  });
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Simulation:", { ...formData, file });
    // Add your API logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full border border-gray-200 p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="mb-8 text-3xl font-semibold text-gray-900">New Simulation</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Simulation Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Name your new simulation</label>
            <select 
              className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            >
              <option>Bug type #1</option>
              <option>Bug type #2</option>
            </select>
          </div>

          {/* Fund Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Would you like to add the simulation to a specific fund?</label>
            <select 
              className="w-full appearance-none rounded-xl bg-gray-100 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.fund}
              onChange={(e) => setFormData({...formData, fund: e.target.value})}
            >
              <option>Bug type #1</option>
              <option>Alternative Fund A</option>
            </select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Add a description</label>
            <textarea 
              rows={4}
              className="w-full resize-none rounded-xl bg-[#f0f4f8] px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Document or Image</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="flex cursor-pointer items-center gap-4 rounded-xl p-2 transition-colors hover:bg-gray-50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0f4f8] text-gray-500">
                <Upload size={24} />
              </div>
              <span className="text-sm text-gray-400">
                {file ? file.name : "Upload an image or document that describe the bug"}
              </span>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full rounded-full bg-[#2d63ff] py-4 text-lg font-semibold text-white transition-all hover:bg-blue-700 active:scale-[0.98]"
          >
            Create Simulation
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewSimulationModal;