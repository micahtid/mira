'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { DocumentData } from 'firebase/firestore';
import { getApplicantsByPosition } from '@/utils/organizationFunctions';
import { getPosition } from '@/utils/applicantFunctions';
import { Application } from '@/data/types';
import { FaArrowLeft, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';

import TabControl from './components/TabControl';
import OverviewTab from './components/OverviewTab';
import ApplicantsList from './components/ApplicantsList';
import ApplicantProfile from './components/ApplicantProfile';

const ReviewPosition = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pid = searchParams.get('pid');
  
  const [position, setPosition] = useState<DocumentData | null>(null);
  const [applicants, setApplicants] = useState<Application[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<Application | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'review'>('overview');
  
  const handleBack = () => {
    router.back();
  };

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
  }, [pid, selectedApplicant, selectedApplicant?.uid]);

  return (
    <div className="default-container space-y-6 py-8">
      {/* Back button */}
      <button 
        onClick={handleBack}
        className="back-button mb-6"
      >
        <FaArrowLeft className="w-4 h-4" />
        <span>Back to Positions</span>
      </button>
      
      {/* Header with position info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-6 max-sm:p-4 mb-6">
        <h1 className="default-subheading">
          {position?.positionTitle || 'Loading position...'}
        </h1>
        
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <div className="inline-flex items-center gap-1.5 default-label text-gray-600">
            <FaUsers className="w-4 h-4 text-gray-500" />
            <span>
              {applicants.length} applicant{applicants.length !== 1 ? 's' : ''}
            </span>
          </div>
          {position?.location && (
            <div className="inline-flex items-center gap-1.5 default-label text-gray-600">
              <FaMapMarkerAlt className="w-4 h-4 text-gray-500" />
              <span>{position.location}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <TabControl activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div>
          {activeTab === 'overview' ? (
            <OverviewTab applicants={applicants} position={position} />
          ) : (
            <div className="flex flex-row gap-6 max-lg:flex-col-reverse">
              <ApplicantsList 
                applicants={applicants}
                selectedApplicant={selectedApplicant}
                onSelectApplicant={setSelectedApplicant}
              />

              <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                {selectedApplicant ? (
                  <ApplicantProfile 
                    applicant={selectedApplicant}
                    position={position}
                  />
                ) : (
                  <div className="h-64 lg:h-full flex flex-col items-center justify-center p-6">
                    <FaUsers className="w-12 h-12 text-gray-300 mb-4" />
                    <p className="text-gray-500 default-text text-center">Select an applicant to view their details</p>
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