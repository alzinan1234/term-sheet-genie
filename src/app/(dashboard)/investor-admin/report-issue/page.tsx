"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

interface ReportForm {
  email: string;
  title: string;
  type: string;
  description: string;
}

const ReportIssue = () => {
  const [formData, setFormData] = useState<ReportForm>({
    email: "",
    title: "",
    type: "",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Report Submitted:", formData);
    alert("Issue submitted successfully!");
    setFormData({ email: "", title: "", type: "", description: "" }); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-lg border border-gray-200 rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          Report an Issue
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-[#2D60FF] focus:border-[#2D60FF]"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issue Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Short issue title"
              className="w-full rounded-lg border border-gray-300 px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-[#2D60FF] focus:border-[#2D60FF]"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issue Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-[#2D60FF] focus:border-[#2D60FF]"
            >
              <option value="">Select issue type</option>
              <option value="bug">Bug</option>
              <option value="ui">UI Issue</option>
              <option value="performance">Performance</option>
              <option value="payment">Payment</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe the issue..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-[#2D60FF] focus:border-[#2D60FF]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#2D60FF] text-white py-2.5 rounded-lg
            hover:bg-[#244ED8] transition font-medium"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;
