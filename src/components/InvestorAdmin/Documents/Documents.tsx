"use client";

import React, { useState, useMemo } from 'react';
import { ChevronDown, Upload, MoreVertical, FileText, Search, X, Download, Trash2 } from 'lucide-react';

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
  const [selectedFund, setSelectedFund] = useState('All Funds');
  const [selectedCompany, setSelectedCompany] = useState('All Companies');
  const [selectedRound, setSelectedRound] = useState('All Rounds');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const [documents] = useState<Document[]>([
    { id: '1', fileName: 'Investment Specifications.pdf', fileSize: '200 KB', fileType: 'pdf', company: 'Hourglass', investmentRound: 'Series B', fund: 'Horizon Fund' },
    { id: '2', fileName: 'Fund Performance Snapshot.jpg', fileSize: '720 KB', fileType: 'jpg', company: 'Command+R', investmentRound: 'Series A', fund: 'Horizon Fund' },
    { id: '3', fileName: 'Fund Analysis Video.mp4', fileSize: '16 MB', fileType: 'mp4', company: 'Command+R', investmentRound: 'Series C', fund: 'Valley Investments' },
    { id: '4', fileName: 'Portfolio Allocation Prototype.fig', fileSize: '4.2 MB', fileType: 'fig', company: 'Catalog', investmentRound: 'Series B', fund: 'Valley Investments' },
    { id: '5', fileName: 'Fund Strategy Document.docx', fileSize: '400 KB', fileType: 'docx', company: 'Hourglass', investmentRound: 'Series D', fund: 'Oak Capital' },
  ]);

  const toggleRow = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesFund = selectedFund === 'All Funds' || doc.fund === selectedFund;
      const matchesCompany = selectedCompany === 'All Companies' || doc.company === selectedCompany;
      const matchesRound = selectedRound === 'All Rounds' || doc.investmentRound === selectedRound;
      const matchesSearch = doc.fileName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFund && matchesCompany && matchesRound && matchesSearch;
    });
  }, [selectedFund, selectedCompany, selectedRound, searchTerm, documents]);

  const renderFileIcon = (type: string) => {
    const colors: Record<string, string> = {
      pdf: 'text-red-500 bg-red-50',
      jpg: 'text-purple-500 bg-purple-50',
      mp4: 'text-blue-500 bg-blue-50',
      fig: 'text-pink-500 bg-pink-50',
      docx: 'text-blue-600 bg-blue-50',
    };
    return (
      <div className={`w-10 h-10 flex items-center justify-center rounded-lg border border-gray-100 ${colors[type] || 'bg-gray-50'}`}>
        <FileText size={20} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8 font-sans relative">
      
      {/* --- Floating Action Bar (Fix for Screenshot Overlay) --- */}
      {selectedRows.length > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#101828] text-white px-6 py-3 rounded-full flex items-center gap-6 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-4">
          <span className="text-sm font-medium">{selectedRows.length} files selected</span>
          <div className="h-4 w-[1px] bg-gray-600" />
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors"><Download size={16}/> Download</button>
            <button className="flex items-center gap-2 text-sm hover:text-red-400 transition-colors"><Trash2 size={16}/> Delete</button>
          </div>
          <button onClick={() => setSelectedRows([])} className="ml-2 p-1 hover:bg-gray-800 rounded-full"><X size={16}/></button>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#101828]">Documents</h1>
      </div>

      {/* Filters Section */}
      <div className="mb-6">
        <div className="flex flex-col gap-4">
          <p className="text-[12px] font-bold text-[#667085] uppercase tracking-wider">Filters</p>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-3">
              {[
                { val: selectedFund, set: setSelectedFund, opts: ['All Funds', 'Horizon Fund', 'Valley Investments'] },
                { val: selectedCompany, set: setSelectedCompany, opts: ['All Companies', 'Hourglass', 'Command+R', 'Catalog'] },
                { val: selectedRound, set: setSelectedRound, opts: ['All Rounds', 'Series A', 'Series B', 'Series C'] }
              ].map((filter, idx) => (
                <div key={idx} className="relative">
                  <select 
                    value={filter.val}
                    onChange={(e) => filter.set(e.target.value)}
                    className="appearance-none bg-white border border-[#EAECF0] rounded-lg pl-3 pr-10 py-2.5 text-sm font-medium text-[#344054] outline-none min-w-[140px] shadow-sm hover:border-gray-300 transition-all"
                  >
                    {filter.opts.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
                </div>
              ))}
            </div>

            <button className="bg-[#2D5BFF] hover:bg-[#1e44cc] text-white px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-sm">
              <Upload size={18} />
              Upload document
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-[320px] mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" size={18} />
            <input 
              type="text" 
              placeholder="Search documents by name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#EAECF0] rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/10 transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-[#EAECF0] rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
              <th className="px-6 py-4 w-12 text-center">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                  onChange={(e) => {
                    if (e.target.checked) setSelectedRows(filteredDocuments.map(d => d.id));
                    else setSelectedRows([]);
                  }}
                  checked={selectedRows.length === filteredDocuments.length && filteredDocuments.length > 0}
                />
              </th>
              <th className="px-4 py-4 text-[12px] font-semibold text-[#475467] uppercase">File name</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-[#475467] uppercase">Company</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-[#475467] uppercase">Investment round</th>
              <th className="px-6 py-4 text-[12px] font-semibold text-[#475467] uppercase">Fund</th>
              <th className="px-6 py-4 w-12 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECF0]">
            {filteredDocuments.map((doc) => (
              <tr 
                key={doc.id} 
                className={`hover:bg-gray-50/80 transition-colors group ${selectedRows.includes(doc.id) ? 'bg-blue-50/30' : ''}`}
              >
                <td className="px-6 py-4 text-center">
                  <input 
                    type="checkbox" 
                    checked={selectedRows.includes(doc.id)}
                    onChange={() => toggleRow(doc.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    {renderFileIcon(doc.fileType)}
                    <div>
                      <div className="text-sm font-semibold text-[#101828]">{doc.fileName}</div>
                      <div className="text-[12px] text-[#667085]">{doc.fileSize}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#475467] font-medium">{doc.company}</td>
                <td className="px-6 py-4 text-sm text-[#475467]">{doc.investmentRound}</td>
                <td className="px-6 py-4 text-sm text-[#475467]">{doc.fund}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[#98A2B3] hover:text-[#667085] p-2 hover:bg-gray-100 rounded-lg transition-all">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}