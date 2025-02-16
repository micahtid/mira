/**
 * OverviewTab Component
 * Displays a table of accepted applicants with their commitment status and provides rescind functionality.
 * - Shows all accepted applicants, including those who have been rescinded
 * - Displays commitment status and last update time for each applicant
 * - Provides rescind functionality for applicants who haven't responded within 3 days
 * - Shows available positions count and rescind policy information
 */

'use client';

import React from 'react';
import { DocumentData } from 'firebase/firestore';
import { Application } from '@/data/types';
import { toTitleCase } from '@/utils/misc';
import { format, differenceInDays } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { rescindApplicant } from '@/utils/organizationFunctions';
import { toast } from 'react-hot-toast';
import { useConfirmationModal } from "@/hooks/useConfirmationModal";

interface OverviewTabProps {
    applicants: Application[];
    position: DocumentData | null;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ applicants, position }) => {
    const acceptedApplicants = applicants.filter(applicant => applicant.status === 'accepted');
    const { onOpen } = useConfirmationModal();

    // Get appropriate commitment status tag for an applicant
    const getCommitmentStatus = (applicant: Application) => {
        if (applicant.rescinded) {
            return (
                <span className="px-2 py-1 rounded-md default-label text-red-600 bg-red-50">
                    Rescinded
                </span>
            );
        }
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

    // Check if an applicant's acceptance can be rescinded
    const canRescind = (applicant: Application) => {
        if (!applicant.updatedAt || applicant.committed !== undefined || applicant.rescinded) {
            return false;
        }
        const daysSinceAcceptance = differenceInDays(new Date(), applicant.updatedAt.toDate());
        return daysSinceAcceptance >= 3;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="grid grid-cols-2 space-2 mb-12">
                <div>
                    <p className="default-text text-gray-900">
                        {acceptedApplicants.length} Accepted Applicant{acceptedApplicants.length !== 1 ? 's' : ''}
                    </p>
                    <p className="default-text text-gray-600">
                        {position?.openSlots || 0} Position{(position?.openSlots || 0) !== 1 ? 's' : ''} Still Available
                    </p>
                </div>

                {/* Rescind Policy */}
                <div className="bg-primary-50 p-4 rounded-lg">
                    <p className="default-label text-primary-700">
                        Note: If an applicant hasn&apos;t accepted or withdrawn from their accepted position within 3 days,
                        you can choose to rescind their offer and accept another candidate.
                    </p>
                </div>
            </div>

            {/* Accepted Applicants Table */}
            <div className="mt-8">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Name
                                </th>
                                <th scope="col" className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Email
                                </th>
                                <th scope="col" className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Status
                                </th>
                                <th scope="col" className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Last Updated
                                </th>
                                <th scope="col" className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {acceptedApplicants.map((applicant, index) => (
                                <tr key={index}>
                                    <td className="px-2 py-4 whitespace-nowrap">
                                        <p className="default-text text-gray-900">{applicant.fullName}</p>
                                    </td>
                                    <td className="px-2 py-4 whitespace-nowrap default-text">{applicant.email}</td>
                                    <td className="px-2 py-4 whitespace-nowrap">{getCommitmentStatus(applicant)}</td>
                                    <td className="px-2 py-4 whitespace-nowrap default-text">
                                        {applicant.updatedAt ? format((applicant.updatedAt as Timestamp).toDate(), 'MMMM d, yyyy') : '-'}
                                    </td>
                                    <td className="px-2 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => {
                                                onOpen(
                                                    'Are you sure you want to rescind this applicant\'s acceptance? This action cannot be undone.',
                                                    async () => {
                                                        try {
                                                            await rescindApplicant({
                                                                uid: applicant.uid,
                                                                email: applicant.email,
                                                                fullName: applicant.fullName,
                                                                positionTitle: position?.title,
                                                                organizationName: position?.organizationName,
                                                                pid: position?.pid
                                                            });
                                                            toast.success('Successfully rescinded applicant\'s acceptance');
                                                        } catch (error) {
                                                            console.error('Failed to rescind applicant:', error);
                                                            toast.error('Failed to rescind applicant');
                                                        }
                                                    }
                                                );
                                            }}
                                            disabled={!canRescind(applicant)}
                                            className={`default-text transition-colors ${
                                                canRescind(applicant)
                                                    ? "text-red-600 hover:bg-red-100"
                                                    : "text-gray-400 cursor-not-allowed"
                                            }`}
                                        >
                                            Rescind
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

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