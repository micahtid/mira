'use client';

import React from 'react';
import { DocumentData } from 'firebase/firestore';
import Link from 'next/link';
import { toTitleCase } from '@/utils/helper';
import { format } from 'date-fns';
import { FaBuilding } from 'react-icons/fa6';
import { FiCalendar, FiMapPin, FiUsers, FiCheckCircle } from 'react-icons/fi';

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
    className="inline-flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors"
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
  // Handle Apply Button Click
  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `/applicant-dashboard/apply?pid=${position.pid}`;
  };

  // CSS Class Helpers
  const badgeClasses = "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border";
  const statClasses = "inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold";
  const textWithIconClasses = "inline-flex items-center gap-1.5 text-sm text-gray-600 font-medium";

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white/90 backdrop-blur-sm border rounded-2xl transition-all duration-200 ${
        isSelected
          ? 'border-primary-300 ring-1 ring-primary-100'
          : 'border-gray-200/60 hover:border-gray-300'
      }`}
    >

      <div className="p-6">
        <div className="space-y-4">
          {/* Header: Title and Organization */}
          <div>
            <h3 className="default-text font-semibold text-gray-900 mb-2">
              {position.positionTitle}
            </h3>
            
            <div className="flex items-center gap-2 mb-3">
              <OrganizationLink oid={position.oid} name={position.organizationName} />
            </div>
            
            {/* Position Details */}
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className={`${badgeClasses} bg-blue-50 text-blue-700 border-blue-100`}>
                {toTitleCase(position.positionType)}
              </span>
              
              <span className={textWithIconClasses}>
                <FiMapPin className="w-3.5 h-3.5" />
                {position.positionLocation || "Remote"}
              </span>
              
              <span className={textWithIconClasses}>
                <FiCalendar className="w-3.5 h-3.5" />
                {position.createdAt && format(position.createdAt.toDate(), 'MMM d, yyyy')}
              </span>
            </div>
          </div>

          {/* Position Stats */}
          <div className="flex flex-wrap gap-3 mt-2">
            <div className={`${statClasses} bg-blue-50 text-blue-700`}>
              <FiCheckCircle className="w-4 h-4 text-blue-600" />
              <span>{position.openSlots} Slot{position.openSlots !== 1 ? 's' : ''}</span>
            </div>
            
            <div className={`${statClasses} bg-green-50 text-green-700`}>
              <FiUsers className="w-4 h-4 text-green-600" />
              <span>{position.totalApplicants} Applicant{position.totalApplicants !== 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Footer: Apply Button */}
          {allowApply && (
            <div className="flex justify-end pt-4 mt-2 border-t border-gray-100/60">
              <button
                onClick={handleApplyClick}
                disabled={hasApplied}
                className={`lg:hidden inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-poppins font-semibold max-lg:w-full transition-all duration-200 ${
                  hasApplied
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {hasApplied ? 'Applied' : 'Apply Now'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PositionCard;