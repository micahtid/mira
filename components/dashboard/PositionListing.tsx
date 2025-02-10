'use client';

import React, { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

import { HiOutlineBuildingOffice2, HiOutlineUsers } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";

import { getAllPositions } from '@/utils/applicationFunctions';
import PositionFilters from './PositionFilters';
import { Position } from '@/data/types';

interface FilterParams {
  search: string;
  locationType: string;
  positionType: string;
}

interface PositionCardProps {
  position: Position;
  allowApply?: boolean;
  onApply: (pid: string) => void;
}

const PositionCard: React.FC<PositionCardProps> = ({ position, allowApply, onApply }) => {
  return (
    <div className="w-full bg-white rounded-lg border border-gray-100 p-4 shadow-sm hover:border-primary-200 transition-colors duration-200">
      <div className="space-y-3">
        <h3 className="default-text font-semibold text-gray-900">{position.positionTitle}</h3>
        
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-1.5">
            <HiOutlineBuildingOffice2 className="w-4 h-4" />
            <span className="default-text text-base">{position.organizationName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <IoLocationOutline className="w-4 h-4" />
            <span className="default-text text-base">
              {position.positionLocation === null ? 'Remote' : position.positionLocation}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 text-primary-700 rounded-md">
            <HiOutlineUsers className="w-4 h-4" />
            <span className="default-text text-sm font-medium">
              {position.availableSlots} Available Spot(s)
            </span>
          </div>
          
          {allowApply && (
            <button
              onClick={() => onApply(position.pid)}
              className="default-button"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface PositionListingProps {
  allowApply?: boolean;
}

const PositionListing = ({ allowApply }: PositionListingProps) => {
  const router = useRouter();
  const [positions, setPositions] = useState<Position[]>([]);
  const [filteredPositions, setFilteredPositions] = useState<Position[]>([]);

  useEffect(() => {
    const unsubscribe = getAllPositions((updatedPositions) => {
      setPositions(updatedPositions as Position[]);
      setFilteredPositions(updatedPositions as Position[]);
    });

    return () => unsubscribe();
  }, []);

  const handleFiltersChange = (filters: FilterParams) => {
    let filtered = [...positions];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(position => 
        position.positionTitle.toLowerCase().includes(searchLower) ||
        position.positionDescription.toLowerCase().includes(searchLower) ||
        position.organizationName.toLowerCase().includes(searchLower) ||
        position.positionRequirements?.toLowerCase().includes(searchLower) ||
        position.positionType.toLowerCase().includes(searchLower)
      );
    }

    // Apply location type filter
    if (filters.locationType) {
      filtered = filtered.filter(position => 
        position.locationType.toLowerCase() === filters.locationType.toLowerCase()
      );
    }

    // Apply position type filter
    if (filters.positionType) {
      filtered = filtered.filter(position => 
        position.positionType.toLowerCase() === filters.positionType.toLowerCase()
      );
    }

    setFilteredPositions(filtered);
  };

  const handleApply = (pid: string) => {
    router.push(`/applicant-dashboard/apply?pid=${pid}`);
  };

  return (
    <div className="space-y-6 py-16">
      <h2 className="default-subheading">View Listings</h2>
      <PositionFilters onFiltersChange={handleFiltersChange} />
      <div className="space-y-4">
        {filteredPositions.map((position) => (
          <PositionCard
            key={position.pid}
            position={position}
            allowApply={allowApply}
            onApply={handleApply}
          />
        ))}
      </div>
    </div>
  );
};

export default PositionListing;