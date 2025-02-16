'use client';

import React, { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import { useSearchParams, useRouter } from 'next/navigation';

import { incrementTotalApplicants } from '@/utils/applicantFunctions';
import { addApplication, getPosition } from '@/utils/applicantFunctions';

import { useForm } from 'react-hook-form';
import { useAccount } from '@/providers/AccountProvider';
import { toast } from 'react-hot-toast';

import EntryField from '@/components/common/EntryField';
import Loader from '@/components/common/Loader';

import { Application } from '@/data/types';

interface FormData {
  questions: string[];
}

const Apply = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pid = searchParams.get('pid');
  const [position, setPosition] = useState<DocumentData | null>(null);
  const [acknowledgeRequirements, setAcknowledgeRequirements] = useState(false);
  const { accountData } = useAccount();

  const { register, handleSubmit } = useForm<FormData>();

  useEffect(() => {
    if (pid) {
      const unsubscribe = getPosition(pid, (fetchedPosition) => {
        setPosition(fetchedPosition);
      });

      return () => unsubscribe();
    }
  }, [pid]);

  const onSubmit = async (data: FormData) => {
    // 1. Validate requirements
    if (!acknowledgeRequirements) {
      toast.error('Please confirm that you have read the description and meet the requirements.');
      return;
    }

    if (!accountData) {
      toast.error('Please sign in to submit an application.');
      return;
    }

    if (!pid) {
      toast.error('Invalid position ID.');
      return;
    }

    try {
      // 2. Prepare application data
      const applicationData: Application = {
        // Core application data
        pid,
        uid: accountData.uid,
        email: accountData.email,
        status: "pending",
        bookMark: false,

        // Applicant information
        fullName: accountData.fullName || '',
        education: accountData.education || '',
        currentEmployment: accountData.currentEmployment || '',
        
        // Position responses
        applicantResponses: position?.positionQuestions?.map((_: string, index: number) => data.questions[index]) || [],
        
        // Optional links
        ...(position?.requireResume && accountData.resume && { resume: accountData.resume }),
        ...(accountData.resumeLink && { resumeLink: accountData.resumeLink }),
        ...(accountData.portfolioLink && { portfolioLink: accountData.portfolioLink })
      };

      // 3. Submit application and update position
      await addApplication(applicationData);
      await incrementTotalApplicants(pid);

      // 4. Success and redirect
      toast.success('Application submitted successfully!');
      router.push('/applicant-dashboard');

    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    }
  };

  if (!position) {
    return <Loader />;
  }

  return (
    <div className="default-container py-8">
      <div className="mb-8">
        <h1 className="default-subheading text-primary-900 mb-2">Apply for {position.positionTitle}</h1>
        <button className="default-text font-medium text-blue-500 hover:text-blue-600" onClick={() => {}}>
          @{position.organizationName}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div>
            <h2 className="default-text font-semibold text-gray-900 mb-3">Description</h2>
            <p className="default-text text-gray-600">{position.positionDescription}</p>
          </div>

          {position.positionRequirements && (
            <div>
              <h2 className="default-text font-semibold text-gray-900 mb-3">Requirements</h2>
              <p className="default-text text-gray-600">{position.positionRequirements}</p>
            </div>
          )}

          {position.positionLocation && (
            <div>
              <h2 className="default-text font-semibold text-gray-900 mb-3">Location</h2>
              <p className="default-text text-gray-600">{position.positionLocation}</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="default-text font-semibold text-primary-900 mb-6">Application Form</h2>

          {position.requireResume && (
            <div className="mb-6 p-4 bg-primary-50 border border-primary-100 rounded-lg">
              <p className="text-sm font-poppins text-primary-700">
                Your resume will be sent in (This is the same resume in your account settings).
                {(accountData?.resumeLink || accountData?.portfolioLink) && (
                  <> Your resume link and portfolio link will also be included in your application.</>
                )}
              </p>
            </div>
          )}

          {position.positionQuestions && position.positionQuestions.map((question: string, index: number) => (
            <div key={index} className="mb-6 last:mb-0">
              <EntryField
                field={{
                  name: `questions.${index}`,
                  label: question,
                  type: 'text',
                  multiline: true,
                  required: true,
                  placeholder: 'Enter your answer'
                }}
                register={register}
              />
            </div>
          ))}
          
          <div className="mt-8">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acknowledgeRequirements}
                onChange={(e) => setAcknowledgeRequirements(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm font-poppins text-gray-700">
                I confirm that I have read the description and meet the requirements.
              </span>
            </label>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full default-button"
            >
              Submit Application
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Apply;