'use client';

import React, { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import { getAllPositions } from '@/utils/globalFunctions';

import PositionFilters from './PositionFilters';
import PositionCard from './PositionCard';
import PositionPreview from './PositionPreview';

interface FilterParams {
  search: string;
  locationType: string;
  positionType: string;
}

interface PositionListingProps {
  allowApply?: boolean;
  activeApplications?: string[];
}

export default function PositionListing({ 
  allowApply = false, 
  activeApplications = [] 
}: PositionListingProps) {
  const [positions, setPositions] = useState<DocumentData[]>([]);
  const [filteredPositions, setFilteredPositions] = useState<DocumentData[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<DocumentData | null>(null);

  const handleFiltersChange = (filters: FilterParams) => {
    let filtered = [...positions];

    // Apply search filters
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
    
    // Clear selected position if it's no longer in filtered results
    if (selectedPosition && !filtered.find(p => p.pid === selectedPosition.pid)) {
      setSelectedPosition(null);
    }
  };

  // Fetch positions (on component mount)
  useEffect(() => {
    const unsubscribe = getAllPositions((fetchedPositions) => {
      const visiblePositions = fetchedPositions.filter(pos => pos.visible === true);
      setPositions(visiblePositions);
      setFilteredPositions(visiblePositions);
      
      // No position selected by default
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="default-subheading mt-4 mb-2">Available Positions</h1>
      <PositionFilters onFiltersChange={handleFiltersChange} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Position List */}
        <div className="space-y-4">
          {filteredPositions.length > 0 ? (
            filteredPositions.map((position) => (
              <PositionCard
                key={position.pid}
                position={position}
                onClick={() => setSelectedPosition(position)}
                isSelected={selectedPosition?.pid === position.pid}
                allowApply={allowApply}
                hasApplied={activeApplications.includes(position.pid)}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
              <p className="default-text text-gray-500">No positions match your filters</p>
              <p className="default-label text-gray-400 mt-1">Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        {/* Position Preview */}
        <div className="hidden lg:block">
          <PositionPreview 
            position={selectedPosition} 
            allowApply={allowApply}
            hasApplied={selectedPosition ? activeApplications.includes(selectedPosition.pid) : false}
          />
        </div>
      </div>
    </div>
  );
}