'use client';

import { setApplicantCommitment } from '@/utils/applicantFunctions';
import { Application } from '@/data/types';
import { toTitleCase } from '@/utils/helper';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import Link from 'next/link';

interface ActiveApplicationsProps {
  applications: Application[];
}

const ActiveApplications: React.FC<ActiveApplicationsProps> = ({ applications }) => {
  const { onOpen } = useConfirmationModal();

  // Returns the appropriate status tag styles
  const getStatusTag = (status: string) => {
    const statusStyles: Record<string, string> = {
      accepted: 'bg-emerald-50 text-emerald-600',
      pending: 'bg-amber-50 text-amber-600',
      rejected: 'bg-red-50 text-red-600',
    };
    return statusStyles[status] || 'bg-gray-50 text-gray-600';
  };

  // Handles user commitment action (accept or withdraw)
  const handleCommitment = async (uid: string, isCommitting: boolean) => {
    const action = isCommitting ? 'accept' : 'withdraw from';
    onOpen(
      `Are you sure you want to ${action} this position? This action cannot be undone if you accept.`,
      async () => {
        try {
          await setApplicantCommitment(uid, isCommitting);
        } catch {
          toast.error('Failed to update commitment status. Please try again.');
        }
      }
    );
  };

  if (!applications.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No active applications found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      <header>
        <h1 className="default-subheading">Active Applications</h1>
        <p className="default-label text-gray-500">Review and manage your applications!</p>
      </header>
      
      {applications.map((application) => (
        <div key={application.pid} className="default-card space-y-6">
          {/* Application Details */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h3 className="default-text font-semibold text-gray-900">{application.fullName}</h3>
              <p className="default-text text-gray-600">
                Applied to:{" "}
                <Link 
                  href={`/applicant-dashboard/application-preview?pid=${application.pid}`} 
                  className="text-primary-600 hover:text-primary-700"
                >
                  {application.pid}
                </Link>
              </p>
            </div>
            {/* Status Tags */}
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-md default-label ${getStatusTag(application.status)}`}>
                {toTitleCase(application.status)}
              </span>
              {application.status === "accepted" && (
                application.rescinded ? (
                  <span className="px-2 py-1 rounded-md default-label text-red-600 bg-red-50">
                    Rescinded
                  </span>
                ) : application.committed !== undefined && (
                  <span className={`px-2 py-1 rounded-md default-label ${
                    application.committed 
                      ? "text-emerald-600 bg-emerald-50"
                      : "text-amber-600 bg-amber-50"
                  }`}>
                    {application.committed ? "Committed" : "Withdrawn"}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Status Message */}
          <div className="">
            {application.updatedAt && (
              <span className="mt-2 dynamic-label text-gray-500">
                {format(application.updatedAt.toDate(), 'MMMM d, yyyy')}
              </span>
            )}
            
            <h3 className="default-text text-gray-900 font-medium">
              {application.status === "accepted" 
                ? "Congratulations! You’ve been accepted!" 
                : "Your application is pending"}
            </h3>
            
            <p className="default-text text-gray-600">
              {application.status === "accepted" ? (
                application.rescinded ? (
                  "Your acceptance has been rescinded because you did not respond within 3 days."
                ) : application.committed === undefined ? (
                  "Please accept or withdraw within 3 days to avoid rescission."
                ) : application.committed ? (
                  "You have committed to this position. We wish you the best!"
                ) : (
                  "You have withdrawn from this position."
                )
              ) : (
                "We’ll notify you once the organization reviews your application."
              )}
            </p>
          </div>

          {/* Action Buttons */}
          {application.status === "accepted" && application.committed === undefined && (
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handleCommitment(application.uid, true)}
                disabled={application.rescinded}
                className={`default-button transition-colors ${
                  application.rescinded 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-primary-600 text-white hover:bg-primary-700"
                }`}
              >
                Accept
              </button>
              <button
                onClick={() => handleCommitment(application.uid, false)}
                disabled={application.rescinded}
                className={`default-button transition-colors ${
                  application.rescinded
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-red-600 border border-red-200 hover:bg-red-50"
                }`}
              >
                Withdraw
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActiveApplications;