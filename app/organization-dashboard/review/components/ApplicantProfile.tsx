/**
 * ApplicantProfile Component
 * Displays detailed information about an applicant and provides actions for managing their application.
 * - Shows applicant's personal information and application details
 * - Displays application status with appropriate color coding
 * - Provides accept/reject actions for pending applications
 * - Handles available slots validation for accepting applicants
 */

'use client';

import { DocumentData } from 'firebase/firestore';
import { Application } from '@/data/types';
import { setApplicationStatus, toggleBookmarkStatus } from '@/utils/organizationFunctions';
import { useConfirmationModal } from "@/hooks/useConfirmationModal";


interface ApplicantProfileProps {
    applicant: Application;
    position: DocumentData | null;
}

const getStatusColor = (status: string, rescinded: boolean) => {
  if (rescinded) {
    return 'bg-orange-50 text-orange-600';          // Rescinded Applications
  }
  switch (status) {
    case 'accepted':
      return 'bg-emerald-50 text-emerald-600';      // Accepted Applications
    case 'rejected':
      return 'bg-rose-50 text-rose-600';            // Rejected Applications     
    default:
      return 'bg-amber-50 text-amber-600';          // Pending Applications    
  }
};

const ApplicantProfile: React.FC<ApplicantProfileProps> = ({ applicant, position }) => {
    const { onOpen } = useConfirmationModal();

    return (
        <div className="space-y-6">
            {/* Applicant Name & Status */}
            <div>
                <div className="flex items-center gap-4">
                    <h1 className="default-subheading text-nowrap overflow-hidden overflow-ellipsis">{applicant.fullName}</h1>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize
                        max-md:max-w-[75px] max-md:overflow-hidden max-md:overflow-ellipsis
                         ${getStatusColor(applicant.status, applicant.rescinded || false)}`}>
                        {applicant.rescinded ? 'Rescinded' : applicant.status}
                    </span>
                </div>

                {/* Applicant Details */}
                <div className="mt-4 space-y-4">
                    <div>
                        <h3 className="font-semibold text-gray-700">Education</h3>
                        <p className="default-text">{applicant.educationLevel}</p>
                    </div>
                    {applicant.resumeText && (
                        <div>
                            <h3 className="font-semibold text-gray-700">Resume</h3>
                            <p className="default-text whitespace-pre-wrap">{applicant.resumeText}</p>
                        </div>
                    )}
                    {/* External Links */}
                    {(applicant.resumeLink || applicant.portfolioLink) && (
                        <div className="space-y-2">
                            {applicant.resumeLink && (
                                <div>
                                    <h3 className="font-semibold text-gray-700">Resume Link</h3>
                                    <a 
                                        href={applicant.resumeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="default-text text-blue-600 hover:text-blue-800 underline"
                                    >
                                        {applicant.resumeLink}
                                    </a>
                                </div>
                            )}
                            {applicant.portfolioLink && (
                                <div>
                                    <h3 className="font-semibold text-gray-700">Portfolio Link</h3>
                                    <a 
                                        href={applicant.portfolioLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="default-text text-blue-600 hover:text-blue-800 underline"
                                    >
                                        {applicant.portfolioLink}
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Application Responses */}
            {position?.positionQuestions[0] && (
                <div className="space-y-4">
                    <h3 className="default-text font-semibold">Application Responses</h3>
                    {position.positionQuestions.map((question: string, index: number) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <p className="font-medium text-gray-700">{question}</p>
                            <p className="mt-2 default-text">
                                {applicant.applicantResponses && applicant.applicantResponses[index]}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4
            max-md:flex-col">
                <button 
                    onClick={() => {
                        onOpen(
                            'Are you sure you want to accept this applicant? This action cannot be undone.',
                            async () => {
                                try {
                                    await setApplicationStatus({
                                        uid: applicant.uid,
                                        status: "accepted",
                                        email: applicant.email,
                                        fullName: applicant.fullName,
                                        positionTitle: position?.title,
                                        organizationName: position?.organizationName
                                    });
                                } catch (error) {
                                    console.error('Failed to update status:', error);
                                }
                            }
                        );
                    }}
                    disabled={applicant.status !== 'pending' || (position?.openSlots || 0) <= 0}
                    className={`default-button bg-emerald-600 hover:bg-emerald-700 
                        disabled:opacity-50 disabled:cursor-not-allowed
                        max-md:w-full`}
                >
                    {(position?.openSlots || 0) <= 0 ? 'No Available Slots' : 'Accept'}
                </button>
                <button 
                    onClick={() => {
                        onOpen(
                            'Are you sure you want to reject this applicant? This action cannot be undone.',
                            async () => {
                                try {
                                    await setApplicationStatus({
                                        uid: applicant.uid,
                                        status: "rejected",
                                        email: applicant.email,
                                        fullName: applicant.fullName,
                                        positionTitle: position?.title,
                                        organizationName: position?.organizationName
                                    });
                                } catch (error) {
                                    console.error('Failed to update status:', error);
                                }
                            }
                        );
                    }}
                    disabled={applicant.status !== 'pending'}
                    className={`default-button bg-rose-600 hover:bg-rose-700 
                        disabled:opacity-50 disabled:cursor-not-allowed
                        max-md:w-full`}
                >
                    Reject
                </button>
                <button 
                    onClick={async () => {
                        await toggleBookmarkStatus(applicant.uid);
                    }}
                    disabled={applicant.status !== 'pending'}
                    className={`default-button ${
                        applicant.bookMark 
                            ? 'bg-gray-600 hover:bg-gray-700' 
                            : 'bg-yellow-600 hover:bg-yellow-700'
                    } disabled:opacity-50 disabled:cursor-not-allowed
                    max-md:w-full`}
                >
                    {applicant.bookMark ? 'Remove Bookmark' : 'Bookmark'}
                </button>
            </div>
        </div>
    );
};

export default ApplicantProfile;