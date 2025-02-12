"use client";

import { FaArrowDown } from "react-icons/fa6";
import { useState } from "react";

interface AccordinanProps {
  title: string;
  content: string;
}

const Accordian = ({ title, content }: AccordinanProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button 
      onClick={() => setIsOpen(!isOpen)}
      className="w-full px-6 py-4 bg-secondary-300/20 rounded-md text-left"
    >
      <div className="flex items-center justify-between">
        <p className="default-text">{title}</p>
        <FaArrowDown 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          size={20} 
        />
      </div>

      <div 
        className={`grid transition-all duration-300 ${
          isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-base">{content}</p>
        </div>
      </div>
    </button>
  )
}

export default Accordian