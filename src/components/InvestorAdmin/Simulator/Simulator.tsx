"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import NewSimulationModal from './NewSimulationModal';
import Step1PriorInvestment from './Step1PriorInvestment';
import Step2CapTable from './Step2CapTable';
import Step3SenioritySelection from './Step3SenioritySelection';
import Step3ContractValuation from './Step3ContractValuation';
import SimulationResults from './SimulationResults';

// Added 'idle' to represent the state when the modal is closed
type Step = 'idle' | 'modal' | 'step1' | 'step2' | 'step3a' | 'step3b' | 'results';

interface SimulationData {
  name: string;
  description: string;
  foundersShares: number;
  allocatedOptions: number;
  unallocatedOptions: number;
  safeNotes: Array<any>;
  debtRounds: Array<any>;
  pricedRounds: Array<any>;
  capTable: Array<any>;
  seniority: {
    debt: Array<string>;
    equity: Array<string>;
  };
  contractValuation: {
    expectedTimeToExit: number;
    volatility: number;
  };
}

const Simulator = () => {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<Step>('step1'); // Start from step1 instead of modal
  const [simulationData, setSimulationData] = useState<SimulationData>({
    name: '',
    description: '',
    foundersShares: 100000,
    allocatedOptions: 20000,
    unallocatedOptions: 20000,
    safeNotes: [
      { id: 1, name: 'Safe A', type: 'Pre-Money', date: '', amount: 0, pmvCap: 0, discount: 0, interestRate: 0, mfn: false, proRata: false }
    ],
    debtRounds: [
      { id: 1, name: 'Debt Round I', paymentNature: 'Lump Sum', date: '', principal: 150000, interestType: 'Fixed', interestFrequency: 'Annual', interestRate: 0, expiration: '' },
      { id: 2, name: 'Debt Round II', paymentNature: 'Lump Sum', date: '', principal: 100000, interestType: 'Fixed', interestFrequency: 'Annual', interestRate: 0, expiration: '' }
    ],
    pricedRounds: [
      { id: 1, round: 'Series A', date: '07.08.2023', amount: 21000000, upfrontPremium: 1, upfrontPremiumPct: 0.5, upfrontPremiumAmount: 50000, participation: 'Yes', participationPct: 'Upside', optionPool: 'Yes', totalInvestment: 0 }
    ],
    capTable: [
      { id: 1, name: 'Founders', investors: 'Activest III, Sequoia', commonStock: 100000, stockOptions: 10000, seriesA: 0, seriesB: 0, seriesD: 0, fullyDiluted: 110000, ownership: 10.8, pricePerShare: 10.8 },
      { id: 2, name: 'Unallocated Options', investors: 'Activest III, Sequoia', commonStock: 10000, stockOptions: 0, seriesA: 0, seriesB: 0, seriesD: 0, fullyDiluted: 10000, ownership: 1.0, pricePerShare: 1.0 },
      { id: 3, name: 'Series A', investors: 'Activest III, Sequoia', commonStock: 0, stockOptions: 0, seriesA: 500000, seriesB: 0, seriesD: 0, fullyDiluted: 500000, ownership: 49.0, pricePerShare: 49.0 },
      { id: 4, name: 'Series B', investors: 'Activest III, Sequoia', commonStock: 0, stockOptions: 0, seriesA: 0, seriesB: 400000, seriesD: 0, fullyDiluted: 400000, ownership: 39.2, pricePerShare: 39.2 },
      { id: 5, name: 'Total', investors: '-', commonStock: 100000, stockOptions: 20000, seriesA: 500000, seriesB: 400000, seriesD: 0, fullyDiluted: 1020000, ownership: 100.0, pricePerShare: 100.0 }
    ],
    seniority: {
      debt: ['Senior Debt', 'Junior Debt', 'Junior Subordinated Debt'],
      equity: ['Series D', 'Series B', 'Series A']
    },
    contractValuation: {
      expectedTimeToExit: 0,
      volatility: 0
    }
  });

  // Load data from sessionStorage on mount or when navigating from modal
  useEffect(() => {
    console.log('Simulator useEffect triggered'); // Debug log
    if (typeof window !== 'undefined') {
      const storedData = sessionStorage.getItem('simulationData');
      console.log('Retrieved from sessionStorage:', storedData); // Debug log
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          console.log('Parsed data:', parsedData); // Debug log
          setSimulationData(prev => {
            const updated = { 
              ...prev, 
              name: parsedData.name || prev.name,
              description: parsedData.description || prev.description
            };
            console.log('Updated simulationData:', updated); // Debug log
            return updated;
          });
          sessionStorage.removeItem('simulationData'); // Clear after loading
        } catch (error) {
          console.error('Error loading simulation data:', error);
        }
      }
    }
  }, [searchParams]); // React to URL changes

  const handleModalSubmit = (data: { name: string; description: string }) => {
    setSimulationData(prev => ({ ...prev, ...data }));
    setCurrentStep('step1');
  };

  const handleStep1Continue = (step1Data: any) => {
    setSimulationData(prev => ({ ...prev, ...step1Data }));
    setCurrentStep('step2');
  };

  const handleStep2Continue = (step2Data: any) => {
    setSimulationData(prev => ({ ...prev, ...step2Data }));
    setCurrentStep('step3a');
  };

  const handleStep3aContinue = (step3aData: any) => {
    setSimulationData(prev => ({ ...prev, seniority: step3aData }));
    setCurrentStep('step3b');
  };

  const handleStep3bContinue = (step3bData: any) => {
    setSimulationData(prev => ({ ...prev, contractValuation: step3bData }));
    setCurrentStep('results');
  };

  const handleStepBack = () => {
    if (currentStep === 'step2') setCurrentStep('step1');
    else if (currentStep === 'step3a') setCurrentStep('step2');
    else if (currentStep === 'step3b') setCurrentStep('step3a');
    else if (currentStep === 'results') setCurrentStep('step3b');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Portfolio Company Investor Seniority</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Status: {['idle', 'modal'].includes(currentStep) ? 'Not Started' : 'In Progress'}
            </span>
            <button 
              onClick={() => setCurrentStep('modal')}
              className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700"
            >
              {['idle', 'modal'].includes(currentStep) ? 'Open Form' : 'New Simulation'}
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar - Updated to match the requested design */}
      {!['idle', 'modal', 'results'].includes(currentStep) && (
        <div className="px-8 py-4  border-gray-200">
          <div className="flex items-center gap-2">
            {['step1', 'step2', 'step3a', 'step3b'].map((step, index) => {
              const stepsOrder = ['step1', 'step2', 'step3a', 'step3b'];
              const isActive = stepsOrder.indexOf(currentStep) >= index;
              
              return (
                <div 
                  key={step} 
                  className={`flex-1 h-[4px] rounded-full transition-colors duration-300 ${
                    isActive ? 'bg-blue-600' : 'bg-gray-200'
                  }`} 
                />
              );
            })}
          </div>
          <div className="mt-3 text-sm text-blue-600">
            {currentStep === 'step1' && 'Step 1: Prior Investment Information'}
            {currentStep === 'step2' && 'Step 2: Cap Table Summary'}
            {currentStep === 'step3a' && 'Step 3: Seniority Selection'}
            {currentStep === 'step3b' && 'Step 3: Contract Valuation'}
          </div>
        </div>
      )}

      <div className="p-8">
        {currentStep === 'modal' && (
          <NewSimulationModal 
            isOpen={true} 
            onClose={() => setCurrentStep('idle')} 
            onSubmit={handleModalSubmit}
          />
        )}
        
        {currentStep === 'step1' && (
          <Step1PriorInvestment 
            data={simulationData}
            onContinue={handleStep1Continue}
            onStepBack={() => setCurrentStep('modal')}
          />
        )}
        
        {currentStep === 'step2' && (
          <Step2CapTable 
            data={simulationData}
            onContinue={handleStep2Continue}
            onStepBack={handleStepBack}
          />
        )}
        
        {currentStep === 'step3a' && (
          <Step3SenioritySelection 
            data={simulationData.seniority}
            onContinue={handleStep3aContinue}
            onStepBack={handleStepBack}
          />
        )}
        
        {currentStep === 'step3b' && (
          <Step3ContractValuation 
            data={simulationData.contractValuation}
            onContinue={handleStep3bContinue}
            onStepBack={handleStepBack}
          />
        )}
        
        {currentStep === 'results' && (
          <SimulationResults 
            data={simulationData}
            onStepBack={handleStepBack}
          />
        )}
      </div>
    </div>
  );
};

export default Simulator;