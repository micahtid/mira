'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DocumentData } from 'firebase/firestore';
import { getApplicantsByPosition } from '@/utils/organizationFunctions';
import { getPosition } from '@/utils/applicationFunctions';
import { Applicant } from '@/data/types';

import ReviewTab from './components/ReviewTab';
import OverviewTab from './components/OverviewTab';
import ApplicantsList from './components/ApplicantsList';
import ApplicantProfile from './components/ApplicantProfile';

const ReviewPosition = () => {
  const searchParams = useSearchParams();
  const pid = searchParams.get('pid');
  
  const [position, setPosition] = useState<DocumentData | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'review'>('overview');

  useEffect(() => {
    if (pid) {
      const unsubscribePosition = getPosition(pid, (fetchedPosition) => {
        setPosition(fetchedPosition);
      });

      const unsubscribeApplicants = getApplicantsByPosition(pid, (fetchedApplicants) => {
        setApplicants(fetchedApplicants);

        if (selectedApplicant) {                                          
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
    <div className="default-container space-y-6 my-12">
      <div className="space-y-1">
        <h1 className="default-subheading text-gray-900">
          {position?.positionTitle || 'Loading position...'}
        </h1>
        <p className="default-text text-gray-600">
          {applicants.length} applicant{applicants.length !== 1 ? 's' : ''}
          {position?.location && ` • ${position.location}`}
        </p>
      </div>

      <div className="space-y-6">
        <ReviewTab activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div>
          {activeTab === 'overview' ? (
            <OverviewTab applicants={applicants} position={position} />
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">
              <ApplicantsList 
                applicants={applicants}
                selectedApplicant={selectedApplicant}
                onSelectApplicant={setSelectedApplicant}
              />

              <div className="flex-1 bg-white rounded-lg p-6 border border-gray-200">
                {selectedApplicant ? (
                  <ApplicantProfile 
                    applicant={selectedApplicant}
                    position={position}
                  />
                ) : (
                  <div className="h-64 lg:h-full flex items-center justify-center text-gray-500 dynamic-text">
                    Select an applicant to view their details
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPosition;