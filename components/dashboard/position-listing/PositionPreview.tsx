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

      {/* Description Section */}
      <div className="p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
        <p className="default-text text-gray-700 whitespace-pre-wrap">
          {position.positionDescription}
        </p>
      </div>

      {/* Requirements Section (Optional) */}
      {position.positionRequirements && (
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Requirements</h3>
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
              className="block w-full py-2 bg-gray-100 text-gray-500 font-medium rounded-lg cursor-not-allowed"
            >
              Already Applied
            </button>
          ) : (
            <Link
              href={`/applicant-dashboard/apply?pid=${position.pid}`}
              className="block w-full py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors text-center"
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