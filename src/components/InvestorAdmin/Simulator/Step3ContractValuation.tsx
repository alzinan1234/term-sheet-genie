// app/simulator/components/Step3ContractValuation.tsx
"use client";

import React, { useState } from 'react';

interface Step3Props {
  data: any;
  onContinue: (data: any) => void;
  onStepBack: () => void;
}

const Step3ContractValuation: React.FC<Step3Props> = ({ data, onContinue, onStepBack }) => {
  const [formData, setFormData] = useState({
    expectedTimeToExit: data?.expectedTimeToExit || 0,
    volatility: data?.volatility || 0,
    subjectivePostMoneyValuation: data?.subjectivePostMoneyValuation || '',
    riskFreeRate: data?.riskFreeRate || '',
    marketRiskPremium: data?.marketRiskPremium || '',
    betaCoefficient: data?.betaCoefficient || ''
  });
  
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (field: string, value: any) => {
    if (field === 'expectedTimeToExit' || field === 'volatility') {
      setFormData({ ...formData, [field]: Math.max(0, Number(value) || 0) });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleContinue = () => {
    onContinue(formData);
  };

  return (
    <div className=" mx-auto p-6">
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="text-sm text-gray-500 mb-2">Step 3 of 3</div>
        <h1 className="text-2xl font-bold text-gray-900">Use default inputs for contract valuation</h1>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        {/* Section Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Contract Valuation Inputs</h2>
        
        {/* Description */}
        <p className="text-gray-600 mb-8">
          Understanding your valuation of the company as it currently stands and view of market conditions 
          for this kind of investment will permit Term Sheet Genie to calculate the value of your investment contracts.
        </p>

        {/* Input Fields */}
        <div className="space-y-8">
          {/* Expected Time to Exit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Expected Time to Exit (Yrs)
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <button 
                  type="button"
                  onClick={() => handleChange('expectedTimeToExit', formData.expectedTimeToExit - 1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  disabled={formData.expectedTimeToExit <= 0}
                >
                  <span className="text-lg">-</span>
                </button>
                <input
                  type="number"
                  min="0"
                  value={formData.expectedTimeToExit}
                  onChange={(e) => handleChange('expectedTimeToExit', e.target.value)}
                  className="w-20 h-10 border-t border-b border-gray-300 text-center text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <button 
                  type="button"
                  onClick={() => handleChange('expectedTimeToExit', formData.expectedTimeToExit + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  <span className="text-lg">+</span>
                </button>
              </div>
              <div className="text-gray-500 text-sm">Year</div>
            </div>
          </div>

          {/* Volatility Around Holding Period */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Volatility Around Holding Period (Yrs)
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <button 
                  type="button"
                  onClick={() => handleChange('volatility', formData.volatility - 1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  disabled={formData.volatility <= 0}
                >
                  <span className="text-lg">-</span>
                </button>
                <input
                  type="number"
                  min="0"
                  value={formData.volatility}
                  onChange={(e) => handleChange('volatility', e.target.value)}
                  className="w-20 h-10 border-t border-b border-gray-300 text-center text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <button 
                  type="button"
                  onClick={() => handleChange('volatility', formData.volatility + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  <span className="text-lg">+</span>
                </button>
              </div>
              <div className="text-gray-500 text-sm">Year</div>
            </div>
          </div>

          {/* Advanced Options Toggle */}
          <div>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1 transition-colors"
            >
              Advanced Options {showAdvanced ? '▲' : '▼'}
            </button>
            
            {/* Advanced Options Panel */}
            {showAdvanced && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4 border border-gray-200">
                {/* Subjective Post Money Valuation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subjective Post Money Valuation ($M) After All Funding
                  </label>
                  <input
                    type="text"
                    value={formData.subjectivePostMoneyValuation}
                    onChange={(e) => handleChange('subjectivePostMoneyValuation', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter valuation amount"
                  />
                </div>
                
                {/* Advanced Financial Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Risk-Free Rate (%)
                    </label>
                    <input
                      type="text"
                      value={formData.riskFreeRate}
                      onChange={(e) => handleChange('riskFreeRate', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter rate"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Market Risk Premium (%)
                    </label>
                    <input
                      type="text"
                      value={formData.marketRiskPremium}
                      onChange={(e) => handleChange('marketRiskPremium', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter premium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Beta Coefficient
                    </label>
                    <input
                      type="text"
                      value={formData.betaCoefficient}
                      onChange={(e) => handleChange('betaCoefficient', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter beta"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Button Row */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
          <button 
            type="button"
            onClick={() => {
              // Clear form and go back to previous step or home
              setFormData({
                expectedTimeToExit: 0,
                volatility: 0,
                subjectivePostMoneyValuation: '',
                riskFreeRate: '',
                marketRiskPremium: '',
                betaCoefficient: ''
              });
              onStepBack();
            }}
            className="rounded-full border border-gray-300 bg-white px-8 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          
          <div className="flex gap-4">
            <button 
              type="button"
              onClick={onStepBack}
              className="rounded-full border border-gray-300 bg-white px-8 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Step back
            </button>
            
            <button 
              type="button"
              onClick={handleContinue}
              className="rounded-full bg-[#2d63ff] px-8 py-3 font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3ContractValuation;