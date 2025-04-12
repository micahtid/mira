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
    return 'bg-orange-50 text-orange-600 border border-orange-100';          // Rescinded Applications
  }
  switch (status) {
    case 'accepted':
      return 'bg-emerald-50 text-emerald-600 border border-emerald-100';      // Accepted Applications
    case 'rejected':
      return 'bg-rose-50 text-rose-600 border border-rose-100';              // Rejected Applications     
    default:
      return 'bg-amber-50 text-amber-600 border border-amber-100';           // Pending Applications    
  }
};

const ApplicantProfile: React.FC<ApplicantProfileProps> = ({ applicant, position }) => {
    const { onOpen } = useConfirmationModal();

    return (
        <div className="space-y-6 p-4 sm:p-6">
            {/* Applicant Name & Status */}
            <div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <h1 className="default-subheading">{applicant.fullName}</h1>
                    <span className={`px-3 py-1 rounded-full default-label capitalize inline-flex items-center w-fit
                         ${getStatusColor(applicant.status, applicant.rescinded || false)}`}>
                        {applicant.rescinded ? 'Rescinded' : applicant.status}
                    </span>
                </div>

                {/* Applicant Details */}
                <div className="mt-6 space-y-6">
                    {/* Applicant Information Card */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <h3 className="default-text font-medium mb-4">Applicant Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <h4 className="default-label text-gray-500">Education</h4>
                                <p className="default-text font-medium">{applicant.educationLevel}</p>
                            </div>
                            
                            {/* External Links */}
                            {applicant.resumeLink && (
                                <div>
                                    <h4 className="default-label text-gray-500">Resume</h4>
                                    <a 
                                        href={applicant.resumeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="default-text text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        View Resume
                                    </a>
                                </div>
                            )}
                            
                            {applicant.portfolioLink && (
                                <div>
                                    <h4 className="default-label text-gray-500">Portfolio</h4>
                                    <a 
                                        href={applicant.portfolioLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="default-text text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        View Portfolio
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Resume Text if available */}
                    {applicant.resumeText && (
                        <div>
                            <h3 className="default-text font-medium mb-2">Resume</h3>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                <p className="default-text whitespace-pre-wrap">{applicant.resumeText}</p>
                            </div>
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
            <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="default-text font-medium mb-4">Actions</h3>
                <div className="flex gap-3 flex-wrap">
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
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-white default-label transition-colors
                            ${applicant.status === 'pending' && (position?.openSlots || 0) > 0
                                ? 'bg-emerald-600 hover:bg-emerald-700' 
                                : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
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
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-white default-label transition-colors
                            ${applicant.status === 'pending'
                                ? 'bg-rose-600 hover:bg-rose-700' 
                                : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Reject
                    </button>
                    <button 
                        onClick={async () => {
                            await toggleBookmarkStatus(applicant.uid);
                        }}
                        disabled={applicant.status !== 'pending'}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-white default-label transition-colors
                            ${applicant.status === 'pending'
                                ? (applicant.bookMark 
                                    ? 'bg-gray-600 hover:bg-gray-700' 
                                    : 'bg-amber-600 hover:bg-amber-700')
                                : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                        <svg className="w-4 h-4" fill={applicant.bookMark ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        {applicant.bookMark ? 'Remove Bookmark' : 'Bookmark'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplicantProfile;