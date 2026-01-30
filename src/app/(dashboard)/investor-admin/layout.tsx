"use client";

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./investor.css";
import InvestorTopbar from "@/components/InvestorAdmin/InvestorTopbar";
import InvestorSidebar from "@/components/InvestorAdmin/InvestorSidebar";

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
  // States
  const [isOpen, setIsOpen] = useState<boolean>(false);       // Mobile
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false); // Desktop
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex bg-[#F5F7FA] text-black min-h-screen">
          
          {/* Sidebar */}
          <InvestorSidebar 
            isOpen={isOpen} 
            setIsOpen={setIsOpen} 
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />

          {/* Main Content Area */}
          <main
            className={`
              flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out
              ${isCollapsed ? "lg:ml-20" : "lg:ml-72"} 
            `}
          >
            {/* Topbar: Mobile menu open handler passed via props inside Topbar usually */}
            <InvestorTopbar onBellClick={() => setShowNotifications(true)} />

            {/* Dynamic Content */}
            <div className="p-4 lg:p-8">
              {showNotifications ? (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="mb-4 text-[#2D60FF] font-medium flex items-center gap-2"
                  >
                    ← Back to Dashboard
                  </button>
                  {/* <NotificationPage /> */}
                  <h2 className="text-xl font-bold">Notifications</h2>
                </div>
              ) : (
                <div className="animate-in fade-in duration-500">
                  {children}
                </div>
              )}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}