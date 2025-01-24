'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getUserAuth } from '@/utils/databaseFunctions';
import { getUserApplications } from '@/utils/applicationFunctions';
import { Applicant } from '@/data/types';

const ActiveApplications = () => {
  const [applications, setApplications] = useState<Applicant[]>([]);
  const auth = getUserAuth(true);

  useEffect(() => {
    if (auth.currentUser) {
      const unsubscribe = getUserApplications(auth.currentUser.uid, (fetchedApplications) => {
        setApplications(fetchedApplications);
      });

      return () => unsubscribe();
    }
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
                <span className={`font-medium capitalize ${getStatusColor(application.status)}`}>
                  {application.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            You haven't submitted any applications yet
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveApplications;