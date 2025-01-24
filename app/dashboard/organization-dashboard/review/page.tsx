'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DocumentData } from 'firebase/firestore';
import { getPosition } from '@/utils/applicationFunctions';
import { getApplicants } from '@/utils/positionFunctions';

const ReviewPosition = () => {
  const searchParams = useSearchParams();
  const pid = searchParams.get('pid');
  
  const [position, setPosition] = useState<DocumentData | null>(null);
  const [applicants, setApplicants] = useState<DocumentData[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<DocumentData | null>(null);

  useEffect(() => {
    if (pid) {
      // Get position details
      const unsubscribePosition = getPosition(pid, (fetchedPosition) => {
        setPosition(fetchedPosition);
      });

      // Get applicants
      const unsubscribeApplicants = getApplicants(pid, (fetchedApplicants) => {
        setApplicants(fetchedApplicants);
      });

      return () => {
        unsubscribePosition();
        unsubscribeApplicants();
      };
    }
  }, [pid]);

  return (
    <div className="default-container">
      <div className="flex gap-6">
        {/* Applicants List */}
        <div className="w-1/3 bg-gray-50 rounded-lg p-4 space-y-4">
          <h2 className="default-heading">Applicants</h2>
          <div className="space-y-2">
            {applicants.map((applicant, index) => (
              <button
                key={index}
                onClick={() => setSelectedApplicant(applicant)}
                className={`w-full text-left p-3 rounded-md hover:bg-gray-100 transition-colors ${
                  selectedApplicant?.uid === applicant.uid ? 'bg-gray-200' : ''
                }`}
              >
                <p className="font-medium">{applicant.fullName}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Applicant Details */}
        <div className="flex-1 bg-white rounded-lg p-6">
          {selectedApplicant ? (
            <div className="space-y-6">
              <div>
                <h2 className="default-heading">{selectedApplicant.fullName}</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">Education</h3>
                    <p className="default-text">{selectedApplicant.education}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Current Employment</h3>
                    <p className="default-text">{selectedApplicant.currentEmployment}</p>
                  </div>
                  {selectedApplicant.resume && (
                    <div>
                      <h3 className="font-semibold text-gray-700">Resume</h3>
                      <p className="default-text">{selectedApplicant.resume}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Questions and Responses */}
              {position?.positionQuestions && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Application Responses</h3>
                  {position.positionQuestions.map((question: string, index: number) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium text-gray-700">{question}</p>
                      <p className="mt-2 default-text">
                        {selectedApplicant.applicantResponses[index]}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button className="default-button bg-green-600 hover:bg-green-700">
                  Accept
                </button>
                <button className="default-button bg-red-600 hover:bg-red-700">
                  Reject
                </button>
                <button className="default-button bg-yellow-600 hover:bg-yellow-700">
                  Bookmark
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select an applicant to view their details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPosition;