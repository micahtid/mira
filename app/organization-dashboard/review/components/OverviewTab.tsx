'use client';

import React from 'react';
import { DocumentData } from 'firebase/firestore';
import { Applicant } from '@/data/types';

interface OverviewTabProps {
    applicants: Applicant[];
    position: DocumentData | null;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ applicants, position }) => {
    const acceptedApplicants = applicants.filter(applicant => applicant.status === 'accepted');

    const getCommitmentStatus = (applicant: Applicant) => {
        if (!applicant.commitment) return 'pending';
        return applicant.commitment;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'committed':
                return 'bg-green-50 text-green-700';
            case 'uncommitted':
                return 'bg-red-50 text-red-700';
            default:
                return 'bg-gray-50 text-gray-600';
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <h2 className="default-subheading text-gray-900">Accepted Applicants</h2>
                    <p className="default-text text-gray-600">
                        {acceptedApplicants.length} applicant{acceptedApplicants.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>

            {acceptedApplicants.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="default-text text-gray-600">No accepted applicants yet</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-4 px-4 text-left default-text text-gray-600 font-medium">Name</th>
                                <th className="py-4 px-4 text-left default-text text-gray-600 font-medium">Education</th>
                                <th className="py-4 px-4 text-left default-text text-gray-600 font-medium">Email</th>
                                <th className="py-4 px-4 text-left default-text text-gray-600 font-medium">Notification</th>
                                <th className="py-4 px-4 text-left default-text text-gray-600 font-medium">Commitment</th>
                                <th className="py-4 px-4 text-left default-text text-gray-600 font-medium">Confirmation</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {acceptedApplicants.map((applicant) => {
                                const status = getCommitmentStatus(applicant);
                                return (
                                    <tr 
                                        key={applicant.uid}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-4 px-4">
                                            <p className="default-text text-gray-900">{applicant.fullName}</p>
                                        </td>
                                        <td className="py-4 px-4">
                                            <p className="default-text text-gray-600">{applicant.education}</p>
                                        </td>
                                        <td className="py-4 px-4">
                                            <p className="default-text text-gray-600">xyz@gmail.com</p>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-50 text-green-700">
                                                Sent
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-md ${getStatusColor(status)}`}>
                                                {status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-md ${
                                                status === 'pending' 
                                                    ? 'bg-gray-50 text-gray-600'
                                                    : 'bg-green-50 text-green-700'
                                            }`}>
                                                {status === 'pending' ? 'Waiting' : 'Confirmed'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OverviewTab;