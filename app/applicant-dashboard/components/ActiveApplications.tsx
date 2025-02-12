'use client';

import { setApplicantCommitment } from '@/utils/applicantFunctions';
import { Applicant } from '@/data/types';

import { toTitleCase } from '@/utils/misc';
import { useConfirmationModal } from "@/hooks/useConfirmationModal";
import { toast } from "react-hot-toast";

import Link from 'next/link';

interface ActiveApplicationsProps {
  applications: Applicant[];
}

const ActiveApplications: React.FC<ActiveApplicationsProps> = ({ applications }) => {
  const { onOpen } = useConfirmationModal();
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'accepted':
        return 'bg-emerald-50 text-emerald-600';
      case 'rejected':
        return 'bg-red-50 text-red-600';
      default:
        return 'bg-amber-50 text-amber-600';
    }
  };

  const getCommitmentTag = (committed: boolean | null | undefined) => {
    if (committed === null || committed === undefined) return null;
    
    return committed ? (
      <span className="ml-2 px-3 py-1 rounded-lg text-sm font-medium bg-emerald-50 text-emerald-600">
        Committed
      </span>
    ) : (
      <span className="ml-2 px-3 py-1 rounded-lg text-sm font-medium bg-amber-50 text-amber-600">
        Withdrawn
      </span>
    );
  };

  const handleCommitment = async (uid: string, isCommitting: boolean) => {
    const action = isCommitting ? 'accept' : 'withdraw from';
    onOpen(
      `Are you sure you want to ${action} this position? This action cannot be undone if you accept.`,
      async () => {
        try {
          await setApplicantCommitment(uid, isCommitting);
        } catch (error) {
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
      <div>
        <h1 className="default-subheading">Active Applications</h1>
        <p className="default-label text-gray-500">Review and manage your applications</p>
      </div>
      {applications.map((application) => (
        <div key={application.pid} className="default-card">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="default-text font-semibold text-gray-900">{application.fullName}</h3>
              <p className="text-sm text-gray-500">
                Applied to: <Link href={`/applicant-dashboard/application-preview?pid=${application.pid}`} className="text-primary-600 hover:text-primary-700">
                  {application.pid}
                </Link>
              </p>
            </div>
            <div className="flex items-center">
              <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(application.status)}`}>
                {toTitleCase(application.status)}
              </span>
              {getCommitmentTag(application.committed)}
            </div>
          </div>

          {application.status === 'accepted' && application.committed === undefined && (
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => handleCommitment(application.uid, true)}
                className="px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                Commit
              </button>
              <button
                onClick={() => handleCommitment(application.uid, false)}
                className="px-4 py-2 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Withdraw
              </button>
            </div>
          )}
          {application.status === 'accepted' && application.committed === true && (
            <p className="mt-6 default-label text-gray-600">
              Please monitor your email for further communication from the organization regarding next steps.
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActiveApplications;