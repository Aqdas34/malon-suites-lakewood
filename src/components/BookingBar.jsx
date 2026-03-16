import React from 'react';
import { Calendar, Users, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookingBar = () => {
  return (
    <div className="w-full bg-[#FAF9F6] border-b border-black/5 sticky top-[150px] z-30 hidden md:block">
      <div className="max-w-[1400px] mx-auto flex items-center divide-x divide-black/5 h-[80px]">
        
        {/* Check In */}
        <div className="flex-[1.5] px-8 h-full flex items-center justify-between group cursor-pointer hover:bg-white transition-colors">
          <div className="flex flex-col">
            <label className="text-[10px] uppercase tracking-widest text-malon-gray/50 font-bold mb-1">Check In</label>
            <span className="text-[13px] text-malon-dark font-medium">March 16, 2026</span>
          </div>
          <Calendar size={14} className="text-malon-gold" />
        </div>

        {/* Check Out */}
        <div className="flex-[1.5] px-8 h-full flex items-center justify-between group cursor-pointer hover:bg-white transition-colors">
          <div className="flex flex-col">
            <label className="text-[10px] uppercase tracking-widest text-malon-gray/50 font-bold mb-1">Check Out</label>
            <span className="text-[13px] text-malon-dark font-medium">March 17, 2026</span>
          </div>
          <Calendar size={14} className="text-malon-gold" />
        </div>

        {/* Adults */}
        <div className="flex-1 px-8 h-full flex items-center justify-between group cursor-pointer hover:bg-white transition-colors">
          <div className="flex flex-col">
            <label className="text-[10px] uppercase tracking-widest text-malon-gray/50 font-bold mb-1">Adults</label>
            <div className="flex items-center">
               <span className="text-[13px] text-malon-dark font-medium">1</span>
               <ChevronDown size={12} className="ml-2 text-malon-gold" />
            </div>
          </div>
        </div>

        {/* Children */}
        <div className="flex-1 px-8 h-full flex items-center justify-between group cursor-pointer hover:bg-white transition-colors">
          <div className="flex flex-col">
            <label className="text-[10px] uppercase tracking-widest text-malon-gray/50 font-bold mb-1">Children</label>
            <div className="flex items-center">
               <span className="text-[13px] text-malon-dark font-medium">1</span>
               <ChevronDown size={12} className="ml-2 text-malon-gold" />
            </div>
          </div>
        </div>

        {/* Check Availability Button */}
        <div className="flex-[2] h-full p-2">
          <Link to="/suites" className="w-full h-full flex items-center justify-center bg-[#D9534F] text-white uppercase tracking-[.3em] text-[11px] font-bold transition-all duration-300 hover:bg-[#c9302c] shadow-md">
            Check Availability
          </Link>
        </div>

      </div>
    </div>
  );
};

export default BookingBar;
