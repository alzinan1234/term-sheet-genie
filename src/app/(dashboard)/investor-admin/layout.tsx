"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./investor.css";
import InvestorTopbar from "@/components/InvestorAdmin/InvestorTopbar";
import InvestorSidebar from "@/components/InvestorAdmin/InvestorSidebar";
import NewSimulationModal from "@/components/InvestorAdmin/Simulator/NewSimulationModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [isSimulatorModalOpen, setIsSimulatorModalOpen] = useState<boolean>(false);

  const handleSimulatorSubmit = (data: { name: string; description: string }) => {
    // Store the simulation data in sessionStorage
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('simulationData', JSON.stringify(data));
      } catch (error) {
        console.error('Error saving simulation data:', error);
      }
    }
    setIsSimulatorModalOpen(false);
    // Add timestamp to force navigation
    router.push(`/investor-admin/simulator?t=${Date.now()}`);
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex bg-[#F5F7FA] text-black min-h-screen">
          
          <InvestorSidebar 
            isOpen={isOpen} 
            setIsOpen={setIsOpen} 
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            onSimulatorClick={() => setIsSimulatorModalOpen(true)}
          />

          <main
            className={`
              flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out
              ${isCollapsed ? "lg:ml-20" : "lg:ml-72"} 
            `}
          >
            {/* Pass isCollapsed to topbar to calculate fixed width */}
            <InvestorTopbar 
              isCollapsed={isCollapsed} 
              onBellClick={() => setShowNotifications(true)} 
            />

            {/* Dynamic Content: Added pt-20 to account for the fixed header height */}
            <div className="p-4 lg:p-8 pt-24 lg:pt-28"> 
              {showNotifications ? (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="mb-4 text-[#2D60FF] font-medium flex items-center gap-2"
                  >
                    ← Back to Dashboard
                  </button>
                  <h2 className="text-xl font-bold">Notifications</h2>
                </div>
              ) : (
                <div className="animate-in fade-in duration-500">
                  {children}
                </div>
              )}
            </div>
          </main>

          {/* New Simulation Modal - Opens on any page, redirects to simulator on submit */}
          {isSimulatorModalOpen && (
            <NewSimulationModal 
              isOpen={isSimulatorModalOpen}
              onClose={() => setIsSimulatorModalOpen(false)}
              onSubmit={handleSimulatorSubmit}
            />
          )}
        </div>
      </body>
    </html>
  );
}