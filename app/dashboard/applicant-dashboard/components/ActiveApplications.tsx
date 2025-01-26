'use client';

import React, { useEffect, useState } from 'react';
import { getUserAuth } from '@/utils/databaseFunctions';
import { getUserApplications, setApplicantCommitment } from '@/utils/applicationFunctions';
import { Applicant } from '@/data/types';

const ActiveApplications = () => {
  const [applications, setApplications] = useState<Applicant[]>([]);
  const auth = getUserAuth(true);

  useEffect(() => {
    let unsubscribe: () => void;

    const setupSubscription = async () => {
      if (auth.currentUser) {
        unsubscribe = getUserApplications(auth.currentUser.uid, (fetchedApplications) => {
          setApplications(fetchedApplications);
        });
      }
    };

    setupSubscription();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [auth.currentUser]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'accepted':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
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

  return (
    <div className="space-y-6">
      <h2 className="default-heading">Your Applications</h2>
      
      <div className="space-y-4">
        {applications.length > 0 ? (
          applications.map((application, index) => (
            <div key={index} className="p-4 border rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <a 
                  href={`/dashboard/applicant-dashboard/apply?pid=${application.pid}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Position ID: {application.pid}
                </a>
                <div className="flex items-center gap-4">
                  <span className={`font-medium capitalize ${getStatusColor(application.status)}`}>
                    {application.status}
                  </span>
                  {application.status === 'accepted' && (
                    <div className="flex gap-2">
                      {application.commitment ? (
                        <span className="text-green-600 font-medium">
                          {application.commitment === 'committed' ? 'Committed' : 'Withdrawn'}
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleCommitment(application.uid, true)}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleCommitment(application.uid, false)}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                          >
                            Withdraw
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No active applications found.</p>
        )}
      </div>
    </div>
  );
};

export default ActiveApplications;