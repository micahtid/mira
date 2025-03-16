'use client';

import React from 'react';
import { DocumentData } from 'firebase/firestore';
import Link from 'next/link';
import { toTitleCase } from '@/utils/misc';

interface PositionPreviewProps {
  position: DocumentData | null;
  allowApply: boolean;
  hasApplied: boolean;
}

const OrganizationLink: React.FC<{ oid: string; name: string }> = ({ oid, name }) => (
  <Link 
    href={`/organization?id=${oid}`}
    className="default-text text-gray-500 hover:text-primary-600 transition-colors"
  >
    {name}
  </Link>
);

const PositionPreview: React.FC<PositionPreviewProps> = ({ position, allowApply, hasApplied }) => {
  if (!position) {
    return (
      <div className="
      sticky top-6 p-8 
      bg-white rounded-lg border border-gray-100 text-center 
      default-text text-gray-500">
        Select a position to view details
      </div>
    );
  }

  return (
    <div className="sticky top-6 bg-white rounded-lg border border-gray-100 divide-y divide-gray-100">
      {/* Header Section */}
      <div className="p-6">
        <h2 className="default-subheading mb-2">
          {position.positionTitle}
        </h2>
        <div className="mb-4">
          <OrganizationLink oid={position.oid} name={`@${position.organizationName}`} />
        </div>
        <div className="flex flex-wrap gap-3">
          <span className="px-3 py-1 bg-primary-50 default-label text-primary-600 rounded-lg font-medium">
            {toTitleCase(position.positionType)}
          </span>
          <span className="px-3 py-1 bg-gray-50 default-label text-gray-600 rounded-lg font-medium">
            {position.positionLocation || "Remote"}
          </span>
          {position.requireResume && (
            <span className="px-3 py-1 bg-gray-50 default-label text-gray-600 rounded-lg font-medium">
              Resume Required
            </span>
          )}
        </div>
      </div>

      {/* Description Section */}
      <div className="p-6">
        <h3 className="default-label font-medium text-gray-500 mb-1">Description</h3>
        <p className="default-text text-gray-700 whitespace-pre-wrap">
          {position.positionDescription}
        </p>
      </div>

      {/* Requirements Section (Optional) */}
      {position.positionRequirements && (
        <div className="p-6">
          <h3 className="default-label font-medium text-gray-500 mb-1">Requirements</h3>
          <p className="default-text text-gray-700 whitespace-pre-wrap">
            {position.positionRequirements}
          </p>
        </div>
      )}

      {/* Apply Button Section */}
      {allowApply && (
        <div className="p-6">
          {hasApplied ? (
            <button
              disabled
              className="block w-full default-button 
              bg-gray-100 text-gray-500 hover:bg-gray-100 
              font-medium cursor-not-allowed"
            >
              Already Applied
            </button>
          ) : (
            <Link
              href={`/applicant-dashboard/apply?pid=${position.pid}`}
              className="
              block default-button w-full
              bg-primary-600 text-white hover:bg-primary-700 
              font-medium"
            >
              Apply Now
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default PositionPreview;