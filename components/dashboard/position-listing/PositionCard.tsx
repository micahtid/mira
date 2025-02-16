'use client';

import React from 'react';
import { DocumentData, Timestamp } from 'firebase/firestore';
import Link from 'next/link';
import { toTitleCase } from '@/utils/misc';

interface PositionCardProps {
  position: DocumentData;
  onClick: () => void;
  isSelected: boolean;
  allowApply: boolean;
  hasApplied: boolean;
}

// Component for organization name that links to organization page
const OrganizationLink: React.FC<{ oid: string; name: string }> = ({ oid, name }) => (
  <Link 
    href={`/organization?id=${oid}`}
    className="text-sm text-gray-500 hover:text-primary-600 transition-colors"
    onClick={(e) => e.stopPropagation()} // Prevent card selection when clicking org link
  >
    {name}
  </Link>
);

const PositionCard: React.FC<PositionCardProps> = ({ 
  position, 
  onClick, 
  isSelected,
  allowApply,
  hasApplied
}) => {
  // Format timestamp to readable date
  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Handle apply button click without triggering card selection
  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `/applicant-dashboard/apply?pid=${position.pid}`;
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer default-card ${
        isSelected 
          ? 'border-primary-500 hover:border-primary-500 shadow-md' 
          : 'border-gray-100 hover:border-primary-200'
      }`}
    >
      <div className="space-y-4">
        {/* Header: Title and Metadata */}
        <div>
          <h3 className="default-text font-semibold text-gray-900">
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

        {/* Footer: Stats and Apply Button */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className="px-3 py-1 bg-primary-50 text-primary-600 rounded-lg text-sm font-medium">
              {position.openSlots} Slot{position.openSlots != 1 ? 's' : ''}
            </div>
            <div className="px-3 py-1 bg-primary-50 text-primary-600 rounded-lg text-sm font-medium">
              {position.totalApplicants} Applicant{position.totalApplicants != 1 ? 's' : ''}
            </div>
          </div>

          {/* Apply button only shows on mobile/tablet and when allowed */}
          {allowApply && (
            <button
              onClick={handleApplyClick}
              disabled={hasApplied}
              className={`lg:hidden px-4 py-2 rounded-lg font-medium transition-colors ${
                hasApplied
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              {hasApplied ? 'Applied' : 'Apply Now'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PositionCard;