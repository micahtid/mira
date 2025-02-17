/**
 * ApplicantsList Component
 * Displays a list of applicants with their status and commitment information.
 * - Uses color-coding to indicate different application statuses
 * - Shows commitment status (committed/withdrawn) when applicable
 * - Handles selection of applicants for detailed view
 */

'use client';

import React from 'react';
import { Application } from '@/data/types';

interface ApplicantsListProps {
    applicants: Application[];
    selectedApplicant: Application | null;
    onSelectApplicant: (applicant: Application) => void;
}

const ApplicantsList: React.FC<ApplicantsListProps> = ({ 
    applicants, 
    selectedApplicant, 
    onSelectApplicant 
}) => {
    const getStatusColor = (applicant: Application) => {
        if (applicant.rescinded) return 'bg-orange-100';                    // Rescinded Applications
        if (applicant.status === 'accepted') return 'bg-green-200';         // Accepted Applications
        if (applicant.status === 'rejected') return 'bg-red-200';           // Rejected Applications
        if (applicant.bookMark) return 'bg-yellow-50';                      // Bookmarked Applications
        return 'bg-white';                                                  // Default Applications
    };

    const getCommitmentStatus = (applicant: Application) => {
        if (applicant.committed === undefined) return null;
        return applicant.committed ? (
            <span className="px-2 py-1 text-sm rounded-md text-emerald-600 bg-emerald-50">
                Committed
            </span>
        ) : (
            <span className="px-2 py-1 text-sm rounded-md text-amber-600 bg-amber-50">
                Withdrawn
            </span>
        );
    };

    return (
        <div className="w-full lg:w-1/3 bg-gray-50 rounded-lg p-4 space-y-4 border border-gray-200">
            <h2 className="default-text font-medium text-gray-900">Applicants</h2>
            <div className="space-y-2">
                {/* Sort applicants by status: Accepted -> Pending -> Rejected! */}
                {[...applicants]
                    .sort((a, b) => {
                        const statusOrder = { accepted: 0, pending: 1, rejected: 2 };
                        return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
                    })
                    .map((applicant, index) => {
                        return (
                            <button
                                key={index}
                                onClick={() => onSelectApplicant(applicant)}
                                className={`w-full text-left p-3 rounded-md transition-all
                                    ${getStatusColor(applicant)}
                                    ${selectedApplicant?.uid === applicant.uid 
                                        ? 'bg-gray-100' 
                                        : 'hover:bg-gray-100'
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <p className="default-text text-gray-900">
                                        {applicant.fullName}
                                    </p>
                                    {getCommitmentStatus(applicant)}
                                </div>
                            </button>
                        );
                    })}
            </div>
        </div>
    );
};

export default ApplicantsList;
