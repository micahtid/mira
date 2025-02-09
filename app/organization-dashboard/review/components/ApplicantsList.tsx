'use client';

import React from 'react';
import { Applicant } from '@/data/types';

interface ApplicantsListProps {
    applicants: Applicant[];
    selectedApplicant: Applicant | null;
    onSelectApplicant: (applicant: Applicant) => void;
}

const ApplicantsList: React.FC<ApplicantsListProps> = ({ 
    applicants, 
    selectedApplicant, 
    onSelectApplicant 
}) => {
    const getStatusColor = (applicant: Applicant) => {
        if (applicant.status === 'accepted') return 'bg-green-200';
        if (applicant.status === 'rejected') return 'bg-red-200';
        if (applicant.bookMark) return 'bg-yellow-50';
        return 'bg-white';
    };

    const getStatusText = (applicant: Applicant) => {
        if (applicant.status === 'accepted' && applicant.commitment) {
            return {
                text: applicant.commitment === 'committed' ? 'Accepted' : 'Withdrawn',
                className: applicant.commitment === 'committed' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
            };
        }
        return null;
    };

    return (
        <div className="w-full lg:w-1/3 bg-gray-50 rounded-lg p-4 space-y-4 border border-gray-200">
            <h2 className="default-text font-medium text-gray-900">Applicants</h2>
            <div className="space-y-2">
                {[...applicants]
                    .sort((a, b) => {
                        const statusOrder = { accepted: 0, pending: 1, rejected: 2 };
                        return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
                    })
                    .map((applicant, index) => {
                        const status = getStatusText(applicant);
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
                                    {status && (
                                        <span className={`text-sm font-medium px-2 py-1 rounded ${status.className}`}>
                                            {status.text}
                                        </span>
                                    )}
                                </div>
                            </button>
                        );
                    })}
            </div>
        </div>
    );
};

export default ApplicantsList;
