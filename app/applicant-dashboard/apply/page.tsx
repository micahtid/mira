'use client';

import React, { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import { useSearchParams, useRouter } from 'next/navigation';
import { incrementApplicantCount } from '@/utils/applicationFunctions';
import { addApplication, getPosition } from '@/utils/applicationFunctions';
import { useForm } from 'react-hook-form';
import { useAccount } from '@/providers/AccountProvider';

const Apply = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pid = searchParams.get('pid');
  const [position, setPosition] = useState<DocumentData | null>(null);
  const [acknowledgeRequirements, setAcknowledgeRequirements] = useState(false);
  const { accountData } = useAccount();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (pid) {
      const unsubscribe = getPosition(pid, (fetchedPosition) => {
        setPosition(fetchedPosition);
      });

      return () => unsubscribe();
    }
  }, [pid]);

  const onSubmit = async (data: any) => {
    if (!acknowledgeRequirements) {
      alert('Please confirm that you have read the description and meet the requirements.');
      return;
    }

    if (!accountData) {
      alert('Please sign in to submit an application.');
      return;
    }

    if (!pid) {
      alert('Invalid position ID.');
      return;
    }

    // TODO : CLEAN UP UNECESSARY TYPE!
    try {
      interface ApplicationData {
        pid: string;
        applicantResponses: string[];
        fullName: string;
        education: string;
        currentEmployment: string;
        resume?: string;
        resumeLink?: string;
        portfolioLink?: string;
      }

      const applicationData: ApplicationData = {
        pid,
        applicantResponses: position?.positionQuestions?.map((_: string, index: number) => data.questions[index]) || [],
        fullName: accountData.fullName || '',
        education: accountData.education || '',
        currentEmployment: accountData.currentEmployment || ''
      };

      if (position?.requireResume && accountData.resume) {
        applicationData.resume = accountData.resume;
      }

      if (accountData.resumeLink) {
        applicationData.resumeLink = accountData.resumeLink;
      }

      if (accountData.portfolioLink) {
        applicationData.portfolioLink = accountData.portfolioLink;
      }

      await addApplication(applicationData);
      await incrementApplicantCount(pid);

      alert('Application submitted successfully!');
      router.push('/applicant-dashboard');

    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="default-container space-y-6">
      {position ? (
        <>
          {/* Header Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Apply for {position.positionTitle}</h1>
            <button className="text-blue-500 hover:underline" onClick={() => {}}>
              @{position.organizationName}
            </button>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Position Details */}
            <div className="space-y-6">
              <div className="bg-white p-4 rounded border">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{position.positionDescription}</p>
              </div>

              {position.positionRequirements && (
                <div className="bg-white p-4 rounded border">
                  <h2 className="text-lg font-semibold mb-2">Requirements</h2>
                  <p className="text-gray-600">{position.positionRequirements}</p>
                </div>
              )}

              {position.positionLocation && (
                <div className="bg-white p-4 rounded border">
                  <h2 className="text-lg font-semibold mb-2">Location</h2>
                  <p className="text-gray-600">{position.positionLocation}</p>
                </div>
              )}
            </div>

            {/* Application Questions */}
            <div className="bg-white p-4 rounded border">
              <h2 className="text-lg font-semibold mb-4">Application Form</h2>

              {position.requireResume && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-blue-600">
                    Your resume will be sent in (This is the same resume in your account settings).
                    {(accountData?.resumeLink || accountData?.portfolioLink) && (
                      <> Your resume link and portfolio link will also be included in your application.</>
                    )}
                  </p>
                </div>
              )}

              {position.positionQuestions && position.positionQuestions.map((question: string, index: number) => (
                <div key={index} className="mb-4 last:mb-0">
                  <label className="block mb-2 font-medium">{question}</label>
                  <textarea
                    {...register(`questions.${index}`)}
                    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
              
              <div className="mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={acknowledgeRequirements}
                    onChange={(e) => setAcknowledgeRequirements(e.target.checked)}
                    className="form-checkbox h-4 w-4 text-blue-500"
                  />
                  <span className="text-gray-700">I confirm that I have read the description and meet the requirements.</span>
                </label>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <p className="text-center text-gray-500">Loading position details...</p>
      )}
    </div>
  );
};

export default Apply;