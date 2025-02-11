'use client';

import React from 'react';
import { setApplicantCommitment } from '@/utils/applicationFunctions';
import { Applicant } from '@/data/types';

interface ActiveApplicationsProps {
  applications: Applicant[];
}

const ActiveApplications: React.FC<ActiveApplicationsProps> = ({ applications }) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'accepted':
        return 'text-green-600 bg-green-500';
      case 'rejected':
        return 'text-red-600 bg-red-500';
      default:
        return 'text-yellow-600 bg-yellow-500';
    }
  };

  const handleCommitment = async (uid: string, isCommitting: boolean) => {
    const action = isCommitting ? 'accept' : 'withdraw from';
    const confirmed = window.confirm(`Are you sure you want to ${action} this position? This action cannot be undone if you accept.`);
    
    if (confirmed) {
      try {
        await setApplicantCommitment(uid, isCommitting);
      } catch (error) {
        console.error('Error updating commitment:', error);
        alert('Failed to update commitment status. Please try again.');
      }
    }
  };

  if (!applications.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No active applications found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <div key={application.pid} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">{application.fullName}</h3>
              <p className="text-gray-500 text-sm">Applied to: {application.pid}</p>
            </div>
            <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(application.status)} bg-opacity-10`}>
              {application.status}
            </span>
          </div>

          {application.status === 'accepted' && !application.commitment && (
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => handleCommitment(application.uid, true)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Commit
              </button>
              <button
                onClick={() => handleCommitment(application.uid, false)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
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