'use client';

import React, { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

import { getAllPositions } from '@/utils/positionFunctions';

interface PositionListingProps {
  allowApply?: boolean;
}

const PositionListing = ({ allowApply }: PositionListingProps) => {
  const router = useRouter();
  const [positions, setPositions] = useState<DocumentData[]>([]);

  useEffect(() => {
    const unsubscribe = getAllPositions((updatedPositions) => {
      setPositions(updatedPositions);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="default-heading">View Listings</h2>
      <div className="space-y-4">
        {positions.map((position, index) => (
          <div key={index} className="p-4 border rounded-lg shadow">
            <h3 className="font-semibold">{position.positionTitle}</h3>
            <p className="text-gray-600 default-text">{position.organizationName}</p>
            <p className="text-gray-600 default-text line-clamp-2">{position.positionDescription}</p>
            {allowApply && (
              <button
                onClick={() => router.push(`/dashboard/applicant-dashboard/apply?pid=${position.pid}`)}
                className="default-button mt-4"
              >
                Apply
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PositionListing;