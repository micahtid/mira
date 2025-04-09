'use client';

import React, { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

// Icons
import { FiArrowLeft, FiCheckCircle, FiAlertCircle, FiFileText, FiMapPin, FiInfo } from 'react-icons/fi';

// Data & Types
import { Application } from '@/data/types';

// Utils & Functions
import { incrementTotalApplicants, addApplication, getPosition } from '@/utils/applicantFunctions';
import { toTitleCase } from '@/utils/helper';

// Hooks & Context
import { useAccount } from '@/providers/AccountProvider';

// Components
import EntryField from '@/components/common/EntryField';
import Loader from '@/components/common/Loader';


type FormData = {
  questions: string[];
};

const Apply = () => {
  // Hooks
  const searchParams = useSearchParams();
  const router = useRouter();
  const { accountData } = useAccount();
  const { register, handleSubmit: handleFormSubmit } = useForm<FormData>();
  
  // States
  const pid = searchParams.get('pid');
  const [position, setPosition] = useState<DocumentData | null>(null);
  const [acknowledgeRequirements, setAcknowledgeRequirements] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch position data
  useEffect(() => {
    if (pid) {
      const unsubscribe = getPosition(pid, (fetchedPosition) => {
        setPosition(fetchedPosition);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [pid]);
  
  // Handle back button click
  const handleBack = () => {
    router.back();
  };

  // Form Submission
  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      // 1. Validate requirements
      if (!acknowledgeRequirements) {
        toast.error('Please confirm that you have read the description and meet the requirements.');
        setIsSubmitting(false);
        return;
      }

      if (!accountData) {
        toast.error('Please sign in to submit an application.');
        setIsSubmitting(false);
        return;
      }

      if (!pid) {
        toast.error('Invalid position ID.');
        setIsSubmitting(false);
        return;
      }

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
        educationLevel: accountData.educationLevel || '',
        
        // Position responses
        applicantResponses: position?.positionQuestions?.map((_: string, index: number) => data.questions[index]) || [],
        
        // Optional links
        ...(position?.requireResume && accountData.resumeText && { resumeText: accountData.resumeText }),
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
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }
  
  if (!position) {
    return (
      <div className="default-container py-8">
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <FiAlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 font-poppins mb-2">Position Not Found</h2>
          <p className="text-gray-600 font-poppins mb-6">The position you are looking for does not exist or has been removed.</p>
          <button onClick={handleBack} className="default-button">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // CSS Helper Classes
  const sectionClass = "bg-white rounded-lg border border-gray-200 p-6 space-y-5";
  const sectionTitleClass = "text-lg font-semibold text-gray-900 font-poppins flex items-center gap-2";
  
  return (
    <div className="default-container py-8">
      {/* Back Button */}
      <button 
        onClick={handleBack}
        className="back-button mb-6"
      >
        <FiArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </button>
      
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col space-y-2">
          <Link 
            href={`/organization?id=${position.oid}`}
            className="default-text text-primary-600 hover:text-primary-700 font-medium font-poppins"
          >
            @{position.organizationName}
          </Link>
          
          <h1 className="default-subheading font-bold text-gray-900 font-poppins">
            {position.positionTitle}
          </h1>
          
          <div className="flex items-center gap-4 mt-1
          max-sm:flex-col max-sm:items-start max-sm:gap-y-1">
            {position.positionType && (
              <div className="flex items-center text-gray-600 default-text font-poppins">
                <span className="font-medium mr-1">Type:</span> {toTitleCase(position.positionType)}
              </div>
            )}
            
            {position.locationType && (
              <div className="flex items-center text-gray-600 default-text font-poppins">
                <FiMapPin className="w-4 h-4 mr-1 text-gray-500" />
                {position.locationType === 'remote' ? 'Remote' : position.positionLocation}
              </div>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-10">
        {/* Position Details Section */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>
            <FiInfo className="w-5 h-5 text-gray-400" />
            Position Details
          </h2>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h3 className="font-medium text-gray-800 font-poppins mb-2">Description</h3>
            <p className="text-gray-600 font-poppins whitespace-pre-wrap">{position.positionDescription}</p>
          </div>

          {position.positionRequirements && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="font-medium text-gray-800 font-poppins mb-2">Requirements</h3>
              <p className="text-gray-600 font-poppins whitespace-pre-wrap">{position.positionRequirements}</p>
            </div>
          )}

          {position.positionLocation && position.locationType !== 'remote' && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="font-medium text-gray-800 font-poppins mb-2">Location</h3>
              <div className="flex items-center gap-2">
                <FiMapPin className="text-gray-500" />
                <p className="text-gray-600 font-poppins">{position.positionLocation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Application Form Section */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass}>
            <FiFileText className="w-5 h-5 text-gray-400" />
            Application Form
          </h2>

          {position.requireResume && (
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
              <FiCheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-poppins text-blue-700 font-medium">Resume Required</p>
                <p className="text-sm font-poppins text-blue-600 mt-1">
                  Your resume will be included with this application
                  {(accountData?.resumeLink || accountData?.portfolioLink) && (
                    <> along with your resume link and portfolio link</>
                  )}.
                </p>
              </div>
            </div>
          )}

          {/* Questions Section */}
          <div className="space-y-6 mt-6">
            <label className="font-medium text-gray-700 font-poppins">
              Application Questions
            </label>
            
            {position.positionQuestions && position.positionQuestions.length > 0 ? (
              <div className="space-y-6">
                {position.positionQuestions.map((question: string, index: number) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="font-medium text-gray-800 font-poppins mb-3">{question}</p>
                    <textarea
                      {...register(`questions.${index}`, { required: true })}
                      placeholder="Enter your answer"
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-poppins text-gray-700"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic font-poppins">No questions required for this position.</p>
            )}
          </div>
          
          {/* Acknowledgement Section */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acknowledgeRequirements}
                onChange={(e) => setAcknowledgeRequirements(e.target.checked)}
                className="h-5 w-5"
              />
              <span className="text-sm font-poppins text-gray-700">
                I confirm that I have read the position description and meet all the requirements.
              </span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 max-md:justify-start">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`default-button ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Apply;