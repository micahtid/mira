'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { HiOutlineSearch } from "react-icons/hi";
import { positionTypeOptions, locationTypeOptions } from '@/data';
import SelectField from '../../common/SelectField';
import { SelectOption } from '@/data/types';

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
  
  const [searchText, setSearchText] = useState(searchParams.get('search') || '');
  const [selectedLocationType, setSelectedLocationType] = useState<SelectOption | null>(
    locationTypeOptions.find(opt => opt.value === searchParams.get('locationType')) || null
  );
  const [selectedPositionType, setSelectedPositionType] = useState<SelectOption | null>(
    positionTypeOptions.find(opt => opt.value === searchParams.get('positionType')) || null
  );

  const handleSearch = () => {
    const filters: FilterParams = {
      search: searchText,
      locationType: selectedLocationType?.value || '',
      positionType: selectedPositionType?.value || ''
    };

    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    
    router.push(`?page=positions&${params.toString()}`);
    onFiltersChange(filters);
  };

  return (
    <div className="space-y-4 bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
      {/* Search Bar */}
      <div className="relative">
        <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search positions..."
          className="w-full pl-10 pr-4 py-[10px]
          rounded-[12px]
          border border-primary-100 
          hover:border-primary-300 
          focus:border-primary-500 focus:ring-1 focus:ring-primary-500 
          outline-none bg-gray-50 text-sm"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <SelectField
            label="Position Type"
            value={selectedPositionType}
            onChange={setSelectedPositionType}
            options={positionTypeOptions}
            placeholder="All Position Types"
            isClearable
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <SelectField
            label="Location Type"
            value={selectedLocationType}
            onChange={setSelectedLocationType}
            options={locationTypeOptions}
            placeholder="All Location Types"
            isClearable
          />
        </div>

        <button
          onClick={handleSearch}
          className="
          default-button text-sm
          self-end px-8 py-[11.5px]"
        >
          Find
        </button>
      </div>
    </div>
  );
};

export default PositionFilters;