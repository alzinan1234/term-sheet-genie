"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface InvestorTopbarProps {
  onBellClick?: () => void;
  isCollapsed: boolean; // Add this to handle fixed width
}

export default function InvestorTopbar({ onBellClick, isCollapsed }: InvestorTopbarProps) {
  const router = useRouter();

  const handleUserImageClick = () => {
    router.push("/investor-admin/profile");
  };

  return (
    <header 
      className={`
        fixed top-0 right-0 h-20 bg-white p-5 border-b border-[#D6D6D6] z-40
        transition-all duration-300 ease-in-out flex items-center justify-end
        ${isCollapsed ? "left-20" : "left-72"} 
        max-lg:left-0
      `}
    >
      <div className="flex items-center gap-6">
        <div
          className="relative rounded-full cursor-pointer"
          onClick={handleUserImageClick}
        >
          <Image
            src="/avatar.png"
            alt="User Icon"
            width={40}
            height={40}
          />
        </div>
      </div>
    </header>
  );
}