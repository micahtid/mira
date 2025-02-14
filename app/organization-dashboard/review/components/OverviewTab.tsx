'use client';

import React from 'react';
import { DocumentData } from 'firebase/firestore';
import { Application } from '@/data/types';
import { toTitleCase } from '@/utils/misc';

interface OverviewTabProps {
    applicants: Application[];
    position: DocumentData | null;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ applicants, position }) => {
    const acceptedApplicants = applicants.filter(applicant => applicant.status === 'accepted');

    const getCommitmentStatus = (applicant: Application) => {
        if (applicant.committed === undefined) return null;
        return applicant.committed ? (
            <span className="px-2 py-1 rounded-md default-label text-emerald-600 bg-emerald-50">
                Committed
            </span>
        ) : (
            <span className="px-2 py-1 rounded-md default-label text-amber-600 bg-amber-50">
                Withdrawn
            </span>
        );
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
                                <th className="py-4 px-4 text-left default-text text-gray-600 font-medium">Email</th>
                                <th className="py-4 px-4 text-left default-text text-gray-600 font-medium">Status Notification</th>
                                <th className="py-4 px-4 text-left default-text text-gray-600 font-medium">Commitment</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {acceptedApplicants.map((applicant) => {
                                return (
                                    <tr 
                                        key={applicant.uid}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-4 px-4">
                                            <p className="default-text text-gray-900">{applicant.fullName}</p>
                                        </td>
                                        <td className="py-4 px-4">
                                            <p className="default-text text-gray-600">{applicant.email}</p>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md default-label bg-green-50 text-green-700">
                                                Sent
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            {getCommitmentStatus(applicant)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            {position && (
                <div>
                    <h2 className="default-subheading mt-20 mb-4">Position Overview</h2>
                    <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
                        {/* Header Section */}
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="default-text font-semibold text-gray-900 mb-2">
                                {position.positionTitle}
                            </h3>
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

                        {/* Content Sections */}
                        <div className="divide-y divide-gray-100">
                            {/* Description */}
                            <div className="p-6">
                                <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                                <p className="default-text text-gray-700 whitespace-pre-wrap">
                                    {position.positionDescription}
                                </p>
                            </div>

                            {/* Requirements */}
                            <div className="p-6">
                                <h4 className="text-sm font-medium text-gray-500 mb-1">Requirements</h4>
                                <p className="default-text text-gray-700 whitespace-pre-wrap">
                                    {position.positionRequirements || "No specific requirements listed"}
                                </p>
                            </div>

                            {/* Application Questions */}
                            <div className="p-6">
                                <h4 className="text-sm font-medium text-gray-500 mb-3">Application Questions</h4>
                                {position.positionQuestions?.length > 0 ? (
                                    <div className="space-y-4">
                                        {position.positionQuestions.map((question: string, index: number) => (
                                            <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                                <p className="default-label text-gray-900">
                                                    {index + 1}. {question}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="default-text text-gray-500">No application questions</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OverviewTab;