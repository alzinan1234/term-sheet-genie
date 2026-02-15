"use client";

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation'; // useRouter ইমপোর্ট করুন

const CompanyHeader = ({ id }: { id: string }) => {
  const router = useRouter(); // রাউটার ইনিশিয়ালাইজ করুন

  return (
    <div className=" px-8 py-5 sticky top-0 z-30 ">
      <div className="flex items-center justify-between  mx-auto">
        <div className="flex items-center gap-5">
          {/* Back Button */}
          <button 
            onClick={() => router.back()} // এখানে back ফাংশন কল করা হয়েছে
            className="p-2 hover:bg-gray-50 rounded-lg border border-gray-100 transition-all text-[#667085]"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="">
            <div>
              <div className="">
                {/* Uppercase রিমুভ করে ইমেজ অনুযায়ী ক্লিন রাখা হয়েছে */}
                <h1 className="text-2xl font-bold text-[#101828]">Catalog</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;