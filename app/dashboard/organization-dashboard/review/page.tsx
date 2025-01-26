'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DocumentData } from 'firebase/firestore';
import { getPosition, updateApplicantStatus, toggleApplicantBookmark } from '@/utils/applicationFunctions';
import { getApplicants } from '@/utils/positionFunctions';
import { Applicant } from '@/data/types';

const ReviewPosition = () => {
  const searchParams = useSearchParams();
  const pid = searchParams.get('pid');
  
  const [position, setPosition] = useState<DocumentData | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  useEffect(() => {
    if (pid) {
      //////// Get Position Details //////////
      const unsubscribePosition = getPosition(pid, (fetchedPosition) => {
        setPosition(fetchedPosition);
      });

      //////// Get Applicants //////////
      const unsubscribeApplicants = getApplicants(pid, (fetchedApplicants) => {
        setApplicants(fetchedApplicants);

        if (selectedApplicant) {                                            // Update selected applicant!
          const updatedSelectedApplicant = fetchedApplicants.find(
            (applicant) => applicant.uid === selectedApplicant.uid
          );

          if (updatedSelectedApplicant) {
            setSelectedApplicant(updatedSelectedApplicant);
          }
        }
      });

      return () => {
        unsubscribePosition();
        unsubscribeApplicants();
      };
    }
  }, [pid, selectedApplicant?.uid]);

  return (
    <div className="default-container">
      <div className="flex gap-6">
        {/* Applicants List */}
        <div className="w-1/3 bg-gray-50 rounded-lg p-4 space-y-4">
          <h2 className="default-heading">Applicants</h2>
          <div className="space-y-2">
            {[...applicants]
              .sort((a, b) => {
                // Sort by status (accepted first, then pending, then rejected)
                const statusOrder = { accepted: 0, pending: 1, rejected: 2 };
                return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
              })
              .map((applicant, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedApplicant(applicant)}
                  className={`w-full text-left p-3 rounded-md hover:bg-gray-100 transition-colors ${
                    selectedApplicant?.uid === applicant.uid ? 'bg-gray-200' : ''
                  } ${
                    applicant.status === 'accepted' ? 'bg-green-100' : 
                    applicant.status === 'rejected' ? 'bg-red-100' : 
                    applicant.bookMark ? 'bg-yellow-100' : ''
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{applicant.fullName}</p>
                    {applicant.status === 'accepted' && applicant.commitment && (
                      <span className={`text-sm font-medium px-2 py-1 rounded ${
                        applicant.commitment === 'committed' 
                          ? 'bg-green-200 text-green-800' 
                          : 'bg-red-200 text-red-800'
                      }`}>
                        {applicant.commitment === 'committed' ? 'Accepted' : 'Withdrawn'}
                      </span>
                    )}
                  </div>
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
                      <p className="default-text whitespace-pre-wrap">{selectedApplicant.resume}</p>
                    </div>
                  )}
                  {(selectedApplicant.resumeLink || selectedApplicant.portfolioLink) && (
                    <div className="space-y-2">
                      {selectedApplicant.resumeLink && (
                        <div>
                          <h3 className="font-semibold text-gray-700">Resume Link</h3>
                          <a 
                            href={selectedApplicant.resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            View Resume
                          </a>
                        </div>
                      )}
                      {selectedApplicant.portfolioLink && (
                        <div>
                          <h3 className="font-semibold text-gray-700">Portfolio Link</h3>
                          <a 
                            href={selectedApplicant.portfolioLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            View Portfolio
                          </a>
                        </div>
                      )}
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
                        {selectedApplicant.applicantResponses && selectedApplicant.applicantResponses[index]}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={async () => {
                    if (selectedApplicant && window.confirm('Are you sure you want to accept this applicant? This action cannot be undone.')) {
                      await updateApplicantStatus(selectedApplicant.uid, "accepted");
                    }
                  }}
                  disabled={selectedApplicant?.status !== 'pending'}
                  className={`default-button bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Accept
                </button>
                <button 
                  onClick={async () => {
                    if (selectedApplicant && window.confirm('Are you sure you want to reject this applicant? This action cannot be undone.')) {
                      await updateApplicantStatus(selectedApplicant.uid, "rejected");
                    }
                  }}
                  disabled={selectedApplicant?.status !== 'pending'}
                  className={`default-button bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Reject
                </button>
                <button 
                  onClick={async () => {
                    if (selectedApplicant) {
                      await toggleApplicantBookmark(selectedApplicant.uid);
                    }
                  }}
                  disabled={selectedApplicant?.status !== 'pending'}
                  className={`default-button ${
                    selectedApplicant?.bookMark 
                      ? 'bg-gray-600 hover:bg-gray-700' 
                      : 'bg-yellow-600 hover:bg-yellow-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {selectedApplicant?.bookMark ? 'Remove Bookmark' : 'Bookmark'}
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