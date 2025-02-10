'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { HiOutlineSearch, HiOutlineFilter } from "react-icons/hi";

interface PositionFiltersProps {
  onFiltersChange: (filters: FilterParams) => void;
}

interface FilterParams {
  search: string;
  locationType: string;
  positionType: string;
}

const PositionFilters: React.FC<PositionFiltersProps> = ({ onFiltersChange }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<FilterParams>({
    search: searchParams.get('search') || '',
    locationType: searchParams.get('locationType') || '',
    positionType: searchParams.get('positionType') || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    
    router.push(`?${params.toString()}`);
    onFiltersChange(filters);
  };

  return (
    <div className="space-y-4 bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
      {/* Search Bar */}
      <div className="relative">
        <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleInputChange}
          placeholder="Search for positions, organizations, or keywords..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 
                   focus:border-primary-300 focus:ring-2 focus:ring-primary-100 
                   transition-colors duration-200 default-text"
        />
      </div>

      {/* Filters Row */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 flex-1">
          <HiOutlineFilter className="w-5 h-5 text-gray-400" />
          <select
            name="locationType"
            value={filters.locationType}
            onChange={handleInputChange}
            className="flex-1 py-2 px-3 rounded-lg border border-gray-200 
                     focus:border-primary-300 focus:ring-2 focus:ring-primary-100 
                     transition-colors duration-200 default-text"
          >
            <option value="">Location Type</option>
            <option value="remote">Remote</option>
            <option value="in-person">In Person</option>
          </select>

          <select
            name="positionType"
            value={filters.positionType}
            onChange={handleInputChange}
            className="flex-1 py-2 px-3 rounded-lg border border-gray-200 
                     focus:border-primary-300 focus:ring-2 focus:ring-primary-100 
                     transition-colors duration-200 default-text"
          >
            <option value="">Position Type</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="default-button"
        >
          Find Jobs
        </button>
      </div>
    </div>
  );
};

export default PositionFilters;