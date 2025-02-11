'use client';

import React, { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import { useSearchParams, useRouter } from 'next/navigation';
import { incrementApplicantCount } from '@/utils/applicationFunctions';
import { addApplication, getPosition } from '@/utils/applicationFunctions';
import { useForm } from 'react-hook-form';
import { useAccount } from '@/providers/AccountProvider';
import { motion } from 'framer-motion';
import EntryField from '@/components/dashboard/EntryField';
import { FormField } from '@/data/types';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto py-8 px-4"
    >
      {position ? (
        <>
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-primary-900 mb-2">Apply for {position.positionTitle}</h1>
            <button className="text-blue-500 hover:text-blue-600 font-medium" onClick={() => {}}>
              @{position.organizationName}
            </button>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Position Details */}
            <div className="space-y-6 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">{position.positionDescription}</p>
              </div>

              {position.positionRequirements && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h2>
                  <p className="text-gray-600 leading-relaxed">{position.positionRequirements}</p>
                </div>
              )}

              {position.positionLocation && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Location</h2>
                  <p className="text-gray-600">{position.positionLocation}</p>
                </div>
              )}
            </div>

            {/* Application Questions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-primary-900 mb-6">Application Form</h2>

              {position.requireResume && (
                <div className="mb-6 p-4 bg-primary-50 border border-primary-100 rounded-lg">
                  <p className="text-primary-700 text-sm">
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
                  <span className="text-gray-700">
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
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading position details...</p>
        </div>
      )}
    </motion.div>
  );
};

export default Apply;