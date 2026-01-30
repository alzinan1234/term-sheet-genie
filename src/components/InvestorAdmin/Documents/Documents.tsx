"use client";

import React, { useState, useMemo } from 'react';
import { ChevronDown, Upload, MoreVertical, FileText, Search, X } from 'lucide-react';

// --- Types ---
interface Document {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: 'pdf' | 'jpg' | 'mp4' | 'fig' | 'docx' | 'aep' | 'mp3';
  company: string;
  investmentRound: string;
  fund: string;
}

export default function Documents() {
  // --- States for Filters ---
  const [selectedFund, setSelectedFund] = useState('All Funds');
  const [selectedCompany, setSelectedCompany] = useState('All Companies');
  const [selectedRound, setSelectedRound] = useState('All Rounds');
  const [searchTerm, setSearchTerm] = useState('');

  // --- Mock Data from Screenshot ---
  const [documents] = useState<Document[]>([
    { id: '1', fileName: 'Investment Specifications.pdf', fileSize: '200 KB', fileType: 'pdf', company: 'Hourglass', investmentRound: 'Series B', fund: 'Horizon Fund' },
    { id: '2', fileName: 'Fund Performance Snapshot.jpg', fileSize: '720 KB', fileType: 'jpg', company: 'Command+R', investmentRound: 'Series A', fund: 'Horizon Fund' },
    { id: '3', fileName: 'Fund Analysis Video.mp4', fileSize: '16 MB', fileType: 'mp4', company: 'Command+R', investmentRound: 'Series C', fund: 'Valley Investments' },
    { id: '4', fileName: 'Portfolio Allocation Prototype.fig', fileSize: '4.2 MB', fileType: 'fig', company: 'Catalog', investmentRound: 'Series B', fund: 'Valley Investments' },
    { id: '5', fileName: 'Fund Strategy Document.docx', fileSize: '400 KB', fileType: 'docx', company: 'Hourglass', investmentRound: 'Series D', fund: 'Oak Capital' },
    { id: '6', fileName: 'Investment Interaction Model.aep', fileSize: '12 MB', fileType: 'aep', company: 'Circooles', investmentRound: 'Series A', fund: 'Horizon Fund' },
    { id: '7', fileName: 'Investment Fund Overview.mp3', fileSize: '18.6 MB', fileType: 'mp3', company: 'Layers', investmentRound: 'Series C', fund: 'Oak Capital' },
  ]);

  // --- Filter Logic ---
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesFund = selectedFund === 'All Funds' || doc.fund === selectedFund;
      const matchesCompany = selectedCompany === 'All Companies' || doc.company === selectedCompany;
      const matchesRound = selectedRound === 'All Rounds' || doc.investmentRound === selectedRound;
      const matchesSearch = doc.fileName.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesFund && matchesCompany && matchesRound && matchesSearch;
    });
  }, [selectedFund, selectedCompany, selectedRound, searchTerm, documents]);

  // Helper to render File Icons based on type
  const renderFileIcon = (type: string) => {
    const colors: Record<string, string> = {
      pdf: 'text-red-500',
      jpg: 'text-purple-500',
      mp4: 'text-blue-500',
      fig: 'text-pink-500',
      docx: 'text-blue-600',
      aep: 'text-indigo-500',
      mp3: 'text-rose-500',
    };
    return (
      <div className={`relative flex items-center justify-center w-10 h-12 bg-gray-50 rounded-md border border-gray-100`}>
        <FileText className={`w-6 h-6 ${colors[type] || 'text-gray-400'}`} />
        <span className={`absolute bottom-1 right-1 text-[8px] font-bold uppercase p-0.5 rounded bg-white border border-gray-100 ${colors[type]}`}>
          {type}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[28px] font-semibold text-[#101828]">Documents</h1>
     
      </div>

      {/* Filters Section */}
      <div className="mb-6 space-y-4">
        <p className="text-[11px] font-bold text-[#475467] uppercase tracking-wider">Filters</p>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-3">
            {/* Fund Select */}
            <div className="relative">
              <select 
                value={selectedFund}
                onChange={(e) => setSelectedFund(e.target.value)}
                className="appearance-none bg-white border border-[#EAECF0] rounded-lg pl-3 pr-10 py-2 text-sm font-medium text-[#344054] outline-none min-w-[160px] shadow-sm"
              >
                <option>All Funds</option>
                <option>Horizon Fund</option>
                <option>Valley Investments</option>
                <option>Oak Capital</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
            </div>

            {/* Company Select */}
            <div className="relative">
              <select 
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="appearance-none bg-white border border-[#EAECF0] rounded-lg pl-3 pr-10 py-2 text-sm font-medium text-[#344054] outline-none min-w-[160px] shadow-sm"
              >
                <option>All Companies</option>
                <option>Hourglass</option>
                <option>Command+R</option>
                <option>Catalog</option>
                <option>Circooles</option>
                <option>Layers</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
            </div>

            {/* Round Select */}
            <div className="relative">
              <select 
                value={selectedRound}
                onChange={(e) => setSelectedRound(e.target.value)}
                className="appearance-none bg-white border border-[#EAECF0] rounded-lg pl-3 pr-10 py-2 text-sm font-medium text-[#344054] outline-none min-w-[160px] shadow-sm"
              >
                <option>All Rounds</option>
                <option>Series A</option>
                <option>Series B</option>
                <option>Series C</option>
                <option>Series D</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
            </div>
          </div>

          <button className="bg-[#2D5BFF] hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-sm">
            <Upload size={18} />
            Upload document
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" size={18} />
          <input 
            type="text" 
            placeholder="Search documents by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#EAECF0] rounded-lg text-sm outline-none shadow-sm focus:ring-2 focus:ring-blue-500/10"
          />
          {searchTerm && <X size={14} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#98A2B3]" onClick={() => setSearchTerm('')} />}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-[#EAECF0] rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
              <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded border-gray-300" /></th>
              <th className="px-4 py-4 text-[12px] font-semibold text-[#475467] uppercase tracking-wider">
                <div className="flex items-center gap-1">File name <ChevronDown size={12}/></div>
              </th>
              <th className="px-6 py-4 text-[12px] font-semibold text-[#475467] uppercase tracking-wider">Company</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-[#475467] uppercase tracking-wider">Investment round</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-[#475467] uppercase tracking-wider">Fund</th>
              <th className="px-6 py-4 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECF0]">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4"><input type="checkbox" className="rounded border-gray-300" /></td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {renderFileIcon(doc.fileType)}
                      <div>
                        <div className="text-sm font-bold text-[#101828]">{doc.fileName}</div>
                        <div className="text-xs text-[#667085] font-medium">{doc.fileSize}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#475467]">{doc.company}</td>
                  <td className="px-6 py-4 text-sm text-[#475467]">{doc.investmentRound}</td>
                  <td className="px-6 py-4 text-sm text-[#475467]">{doc.fund}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#98A2B3] hover:text-[#667085] transition-colors p-1 rounded-md">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-sm text-[#667085]">
                  No documents found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}