'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';

// Icons - Using filled versions
import { 
  FaArrowLeft, 
  FaFileAlt, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaUser, 
  FaLink, 
  FaBookmark,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaClock,
  FaBriefcase,
  FaInfoCircle
} from 'react-icons/fa';

// Hooks & Context
import { useAccount } from '@/providers/AccountProvider';

// Utils & Functions
import { getApplication, getPosition } from '@/utils/applicantFunctions';
import { Application, Position } from '@/data/types';
import { toTitleCase } from '@/utils/helper';

// Components
import Loader from '@/components/common/Loader';
import { twMerge } from 'tailwind-merge';

export default function ApplicationPreview() {
  // Hooks
  const searchParams = useSearchParams();
  const router = useRouter();
  const { account, accountData } = useAccount();
  
  // State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [application, setApplication] = useState<Application | null>(null);
  const [position, setPosition] = useState<Position | null>(null);

  // Format timestamp to readable date
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    return format(timestamp.toDate(), 'MMM d, yyyy');
  };
  
  // Get appropriate status icon based on application status
  const getStatusIcon = (status: string, rescinded?: boolean, committed?: boolean) => {
    if (rescinded) return <FaExclamationCircle className="w-5 h-5 text-red-500" />;
    
    if (status === 'accepted') {
      if (committed === true) return <FaCheckCircle className="w-5 h-5 text-emerald-500" />;
      if (committed === false) return <FaTimesCircle className="w-5 h-5 text-amber-500" />;
      return <FaCheckCircle className="w-5 h-5 text-emerald-500" />;
    }
    
    if (status === 'pending') return <FaClock className="w-5 h-5 text-amber-500" />;
    if (status === 'rejected') return <FaTimesCircle className="w-5 h-5 text-red-500" />;
    
    return <FaFileAlt className="w-5 h-5 text-gray-500" />;
  };
  
  // Get status badge styles
  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium";
    
    const statusStyles: Record<string, string> = {
      accepted: `${baseClasses} bg-emerald-50 text-emerald-600`,
      pending: `${baseClasses} bg-amber-50 text-amber-600`,
      rejected: `${baseClasses} bg-red-50 text-red-600`,
    };
    
    return statusStyles[status] || `${baseClasses} bg-gray-50 text-gray-600`;
  };
  
  // Handle back button click
  const handleBack = () => {
    router.back();
  };

  // Fetch application and position data
  useEffect(() => {
    const pid = searchParams.get('pid');
    if (!pid || !account) return;

    const unsubscribeApplication = getApplication(account.uid, pid, (application) => {
      if (!application) {
        setError('Application not found');
        setLoading(false);
        return;
      }
      setApplication(application);
      setLoading(false);
    });

    const unsubscribePosition = getPosition(pid, (position) => {
      if (!position) {
        setError('Position not found');
        setLoading(false);
        return;
      }
      setPosition(position);
    });

    return () => {
      unsubscribeApplication();
      unsubscribePosition();
    };
  }, [searchParams, account]);

  // Loading state
  if (loading) {
    return <Loader />;
  }

  // Error state
  if (error || !application || !position) {
    return (
      <div className="default-container py-8">
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <FaExclamationCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="default-subheading mb-2">Application Not Found</h2>
          <p className="default-text text-gray-600 mb-6">{error || 'The application you are looking for does not exist or has been removed.'}</p>
          <button 
            onClick={handleBack}
            className="outlined-button inline-flex items-center gap-2"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Applications
          </button>
        </div>
      </div>
    );
  }

  // Main content
  return (
    <div className="default-container py-8">
      {/* Back button */}
      <button 
        onClick={handleBack}
        className="back-button mb-6"
      >
        <FaArrowLeft className="w-4 h-4" />
        <span>Back to Applications</span>
      </button>

      {/* Application Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-4 sm:p-6 space-y-4">
          {/* Title and Status */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <h1 className="default-subheading text-gray-900">{position.positionTitle}</h1>
              <div className={twMerge(getStatusBadge(application.status), `w-min max-md:mb-2`)}>
                {getStatusIcon(application.status, application.rescinded, application.committed)}
                <span className="default-label text-sm">{toTitleCase(application.status)}</span>
              </div>
            </div>
            
            {/* Organization and Position Details */}
            <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-3 border-t border-gray-100 pt-3 mt-4">
              <Link 
                href={`/organization?id=${position.oid}`}
                className="inline-flex items-center gap-2 default-label text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                <FaBriefcase className="w-4 h-4" />
                {position.organizationName}
              </Link>
              
              {position.positionType && (
                <div className="inline-flex items-center gap-1.5 default-label text-gray-600">
                  <span className="h-1 w-1 rounded-full bg-gray-300 hidden sm:block"></span>
                  <span>{toTitleCase(position.positionType)}</span>
                </div>
              )}
              
              {position.locationType && (
                <div className="inline-flex items-center gap-1.5 default-label text-gray-600">
                  <span className="h-1 w-1 rounded-full bg-gray-300 hidden sm:block"></span>
                  <span>
                    {position.locationType === "remote" 
                      ? "Remote" 
                      : position.positionLocation || "On-site"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Application Status Info */}
          {application.status === "accepted" && (
            <div className="mt-4 p-3 sm:p-4 rounded-lg border bg-gray-50">
              <div className="flex items-start gap-3">
                {application.rescinded ? (
                  <>
                    <FaExclamationCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 default-text">Acceptance Rescinded</p>
                      <p className="default-label text-gray-600 mt-1">Your acceptance for this position has been rescinded by the organization.</p>
                    </div>
                  </>
                ) : application.committed === undefined ? (
                  <>
                    <FaInfoCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 default-text">Action Required</p>
                      <p className="default-label text-gray-600 mt-1">Please accept or withdraw from this position within 3 days.</p>
                    </div>
                  </>
                ) : application.committed ? (
                  <>
                    <FaCheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 default-text">Position Accepted</p>
                      <p className="default-label text-gray-600 mt-1">You have committed to this position.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 default-text">Position Withdrawn</p>
                      <p className="default-label text-gray-600 mt-1">You have withdrawn from this position.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content in single column layout */}
      <div className="space-y-6">
        {/* Applicant Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <FaUser className="w-5 h-5 text-gray-500" />
              Applicant Information
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Left column */}
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <p className="default-label text-gray-500">Full Name</p>
                  <p className="default-text font-medium text-gray-800">{application.fullName}</p>
                </div>
                
                {/* Email */}
                <div>
                  <p className="default-label text-gray-500">Email</p>
                  <p className="default-text font-medium text-gray-800">{application.email}</p>
                </div>
                
                {/* Education */}
                {application.educationLevel && (
                  <div>
                    <p className="default-label text-gray-500">Education Level</p>
                    <p className="default-text font-medium text-gray-800">{application.educationLevel}</p>
                  </div>
                )}
              </div>
              
              {/* Right column */}
              <div className="space-y-4">
                {/* Resume Link - Only if position requires it or if provided */}
                {(position.requireResume || application.resumeLink) && (
                  <div>
                    <p className="default-label text-gray-500">Resume</p>
                    {application.resumeLink ? (
                      <a 
                        href={application.resumeLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 default-label text-primary-600 hover:text-primary-700 font-medium transition-colors"
                      >
                        <FaLink className="w-4 h-4" />
                        View Resume
                      </a>
                    ) : (
                      <p className="default-label text-gray-500 italic">No resume link provided</p>
                    )}
                  </div>
                )}
                
                {/* Portfolio Link - If provided */}
                {application.portfolioLink && (
                  <div>
                    <p className="default-label text-gray-500">Portfolio</p>
                    <a 
                      href={application.portfolioLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 default-label text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                      <FaLink className="w-4 h-4" />
                      View Portfolio
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Position Description */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <FaFileAlt className="w-5 h-5 text-gray-500" />
              Position Description
            </h2>
            <p className="default-text text-gray-700 whitespace-pre-wrap">{position.positionDescription}</p>
          </div>
        </div>

        {/* Position Requirements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <FaInfoCircle className="w-5 h-5 text-gray-500" />
              Requirements
            </h2>
            <p className="default-text text-gray-700 whitespace-pre-wrap">{position.positionRequirements}</p>
          </div>
        </div>

        {/* Your Responses */}
        {position.positionQuestions && position.positionQuestions.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 sm:p-6">
              <h2 className="default-subheading mb-4 flex items-center gap-2">
                <FaFileAlt className="w-5 h-5 text-gray-500" />
                Your Responses
              </h2>
              <div className="space-y-4">
                {position.positionQuestions.map((question, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="default-text font-medium text-gray-800 mb-2">{question}</p>
                    <p className="default-text text-gray-600">
                      {application.applicantResponses && application.applicantResponses[index] 
                        ? application.applicantResponses[index] 
                        : 'No response provided'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}