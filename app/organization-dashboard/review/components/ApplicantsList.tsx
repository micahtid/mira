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
        if (applicant.rescinded) return 'bg-orange-50';                    // Rescinded Applications
        if (applicant.status === 'accepted') return 'bg-emerald-50';        // Accepted Applications
        if (applicant.status === 'rejected') return 'bg-red-50';            // Rejected Applications
        if (applicant.bookMark) return 'bg-yellow-50';                      // Bookmarked Applications
        return 'bg-white';                                                  // Default Applications
    };

    const getCommitmentStatus = (applicant: Application) => {
        if (applicant.committed === undefined) return null;
        return applicant.committed ? (
            <span className="px-2 py-1 text-xs rounded-full font-medium text-emerald-600 bg-emerald-50 border border-emerald-100">
                Committed
            </span>
        ) : (
            <span className="px-2 py-1 text-xs rounded-full font-medium text-amber-600 bg-amber-50 border border-amber-100">
                Withdrawn
            </span>
        );
    };

    return (
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
                <h2 className="default-text font-medium">Applicants</h2>
            </div>
            <div className="p-2 max-h-[600px] overflow-y-auto">
                {/* Sort applicants by status: Accepted -> Pending -> Rejected! */}
                {applicants.length > 0 ? (
                    [...applicants]
                        .sort((a, b) => {
                            const statusOrder = { accepted: 0, pending: 1, rejected: 2 };
                            return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
                        })
                        .map((applicant, index) => {
                            return (
                                <button
                                    key={index}
                                    onClick={() => onSelectApplicant(applicant)}
                                    className={`w-full text-left p-3 rounded-md transition-all mb-1
                                        ${selectedApplicant?.uid === applicant.uid 
                                            ? 'bg-primary-50 border border-primary-100' 
                                            : `${getStatusColor(applicant)} hover:bg-gray-50 border border-transparent`
                                        }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <p className="default-text text-gray-900 font-medium truncate mr-2">
                                            {applicant.fullName}
                                        </p>
                                        {getCommitmentStatus(applicant)}
                                    </div>
                                </button>
                            );
                        })
                ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-gray-500">
                        <p className="default-text text-center">No applicants found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplicantsList;
