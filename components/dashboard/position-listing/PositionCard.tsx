'use client';

import React from 'react';
import { DocumentData } from 'firebase/firestore';
import Link from 'next/link';
import { toTitleCase } from '@/utils/misc';
import { FaBuilding } from 'react-icons/fa6';
import { format } from 'date-fns';

interface PositionCardProps {
  position: DocumentData;
  onClick: () => void;
  isSelected: boolean;
  allowApply: boolean;
  hasApplied: boolean;
}

const OrganizationLink: React.FC<{ oid: string; name: string }> = ({ oid, name }) => (
  <Link 
    href={`/organization?id=${oid}`}
    className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors"
    onClick={(e) => e.stopPropagation()} 
  >
    <FaBuilding className="w-3.5 h-3.5" />
    <span className="default-label">{name}</span>
  </Link>
);

const PositionCard: React.FC<PositionCardProps> = ({ 
  position, 
  onClick, 
  isSelected,
  allowApply,
  hasApplied
}) => {
  // Handle apply button click without triggering card selection
  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `/applicant-dashboard/apply?pid=${position.pid}`;
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 bg-white border rounded-lg transition-all duration-200 ${
        isSelected 
          ? 'border-primary-500 shadow-sm' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="space-y-3">
        {/* Header: Title and Metadata */}
        <div>
          <h3 className="default-text font-semibold text-gray-900 mb-2">
            {position.positionTitle}
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <OrganizationLink oid={position.oid} name={position.organizationName} />
            <span className="text-gray-300">•</span>
            <span className="default-label font-medium text-primary-600">
              {toTitleCase(position.positionType)}
            </span>
            <span className="text-gray-300">•</span>
            <span className="default-label text-gray-600">
              {position.positionLocation || "Remote"}
            </span>
            <span className="text-gray-300">•</span>
            <span className="default-label text-gray-500">
              Posted {position.createdAt && format(position.createdAt.toDate(), 'MMM d, yyyy')}
            </span>
          </div>
        </div>

        {/* Footer: Stats and Apply Button */}
        <div className="
        flex items-center justify-between 
        max-sm:flex-col max-sm:items-start max-sm:gap-y-6
        pt-3 border-t border-gray-100">
          <div className="flex gap-2">
            <div className="px-2.5 py-1 bg-primary-50 text-primary-600 rounded-lg default-label font-medium">
              {position.openSlots} Slot{position.openSlots != 1 ? 's' : ''}
            </div>
            <div className="px-2.5 py-1 bg-primary-50 text-primary-600 rounded-lg default-label font-medium">
              {position.totalApplicants} Applicant{position.totalApplicants != 1 ? 's' : ''}
            </div>
          </div>

          {/* Apply button only shows on mobile/tablet and when allowed */}
          {allowApply && (
            <button
              onClick={handleApplyClick}
              disabled={hasApplied}
              className={`lg:hidden default-button max-lg:w-full ${
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