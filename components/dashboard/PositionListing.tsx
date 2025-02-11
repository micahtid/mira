'use client';

import React, { useEffect, useState } from 'react';
import { DocumentData, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAllPositions } from '@/utils/applicationFunctions';
import { toTitleCase } from '@/utils/misc';

interface PositionCardProps {
  position: DocumentData;
  onClick: () => void;
  isSelected: boolean;
}

const OrganizationLink: React.FC<{ oid: string; name: string }> = ({ oid, name }) => (
  <Link 
    href={`/organization?id=${oid}`}
    className="text-sm text-gray-500 hover:text-primary-600 transition-colors"
    onClick={(e) => e.stopPropagation()} // Prevent card selection when clicking org link...
  >
    {name}
  </Link>
);

const PositionCard: React.FC<PositionCardProps> = ({ position, onClick, isSelected }) => {
  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card selection
    window.location.href = `/applicant-dashboard/apply?pid=${position.pid}`;
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-6 bg-white rounded-lg border transition-all duration-200 ${
        isSelected 
          ? 'border-primary-500 shadow-md' 
          : 'border-gray-100 hover:border-primary-200'
      }`}
    >
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {position.positionTitle}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-primary-600">
              {toTitleCase(position.positionType)}
            </span>
            <span className="text-gray-300">•</span>
            <OrganizationLink oid={position.oid} name={position.organizationName} />
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-500">
              {position.positionLocation || "Remote"}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-500">
              Posted {formatDate(position.createdAt)}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className="px-3 py-1 bg-primary-50 text-primary-600 rounded-lg text-sm font-medium">
              {position.availableSlots} Slot{position.availableSlots != 1 ? 's' : ''}
            </div>
            <div className="px-3 py-1 bg-primary-50 text-primary-600 rounded-lg text-sm font-medium">
              {position.positionApplicants} Applicant{position.positionApplicants != 1 ? 's' : ''}
            </div>
          </div>

          {/* Apply button only shows on mobile/tablet */}
          <button
            onClick={handleApplyClick}
            className="lg:hidden px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

const PositionPreview: React.FC<{ position: DocumentData | null }> = ({ position }) => {
  if (!position) {
    return (
      <div className="sticky top-6 p-8 bg-white rounded-lg border border-gray-100 text-center text-gray-500">
        Select a position to view details
      </div>
    );
  }

  return (
    <div className="sticky top-6 bg-white rounded-lg border border-gray-100 divide-y divide-gray-100">
      {/* Header */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {position.positionTitle}
        </h2>
        <div className="mb-4">
          <OrganizationLink oid={position.oid} name={`@${position.organizationName}`} />
        </div>
        <div className="flex flex-wrap gap-3">
          <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-lg text-sm font-medium">
            {toTitleCase(position.positionType)}
          </span>
          <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium">
            {position.positionLocation || "Remote"}
          </span>
          {position.requireResume && (
            <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium">
              Resume Required
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Description</h3>
        <p className="text-gray-700 whitespace-pre-wrap">
          {position.positionDescription}
        </p>
      </div>

      {/* Requirements */}
      {position.positionRequirements && (
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Requirements</h3>
          <p className="text-gray-700 whitespace-pre-wrap">
            {position.positionRequirements}
          </p>
        </div>
      )}

      {/* Apply Button */}
      <div className="p-6">
        <Link
          href={`/applicant-dashboard/apply?pid=${position.pid}`}
          className="block w-full py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors text-center"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default function PositionListing() {
  const [positions, setPositions] = useState<DocumentData[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<DocumentData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = getAllPositions((fetchedPositions) => {
      // Filter only visible positions
      const visiblePositions = fetchedPositions.filter(pos => pos.visible === true);
      setPositions(visiblePositions);
      
      // If there are positions and none selected, select the first one
      if (visiblePositions.length > 0 && !selectedPosition) {
        setSelectedPosition(visiblePositions[0]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Position List */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Open Positions</h1>
          {positions.length > 0 ? (
            positions.map((position) => (
              <PositionCard
                key={position.pid}
                position={position}
                onClick={() => setSelectedPosition(position)}
                isSelected={selectedPosition?.pid === position.pid}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
              <p className="text-gray-500">No positions available at the moment</p>
              <p className="text-gray-400 text-sm mt-1">Check back later for new opportunities</p>
            </div>
          )}
        </div>

        {/* Position Preview */}
        <div className="hidden lg:block mt-14">
          <PositionPreview position={selectedPosition} />
        </div>
      </div>
    </div>
  );
}