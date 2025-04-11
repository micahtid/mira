"use client";

import React from 'react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

const TermsAndPolicy = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-primary-50/30 to-white py-6 sm:py-8 md:py-12 overflow-hidden">
      <div className="default-container px-4 sm:px-6 md:px-8">
        {/* Back Button */}
        <Link href="/" className="back-button mb-6">
          <FiArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h1 className="default-heading text-gray-900 mb-3">Terms and Policies</h1>
          <p className="default-text text-gray-600 max-w-3xl mx-auto">
            Please review our terms of service and privacy policy to understand how we operate and protect your information.
          </p>
        </motion.div>
        
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* Privacy Policy Section */}
          <motion.section 
            id="privacy-policy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-lg p-8 mb-6"
          >
            <h2 className="default-subheading text-gray-900 mb-8 pb-3 border-b border-gray-100">Privacy Policy</h2>
            
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="font-poppins font-semibold text-xl sm:text-2xl text-gray-800 mb-3 sm:mb-4">Information We Collect</h3>
                <p className="default-text text-gray-700">
                  At Mira, we collect information to provide a better experience for our users. This includes:
                </p>
                <ul className="list-disc pl-6 mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                  <li className="default-text text-gray-700">Account information (name, email, profile details)</li>
                  <li className="default-text text-gray-700">Application data for volunteer positions</li>
                  <li className="default-text text-gray-700">Organization information for those posting positions</li>
                  <li className="default-text text-gray-700">Usage data to improve our platform</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-poppins font-semibold text-xl sm:text-2xl text-gray-800 mb-3 sm:mb-4">How We Use Your Information</h3>
                <p className="default-text text-gray-700">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                  <li className="default-text text-gray-700">Connect students with volunteer opportunities</li>
                  <li className="default-text text-gray-700">Help organizations find suitable volunteers</li>
                  <li className="default-text text-gray-700">Improve our platform and user experience</li>
                  <li className="default-text text-gray-700">Communicate important updates and information</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-poppins font-semibold text-xl sm:text-2xl text-gray-800 mb-3 sm:mb-4">Data Security</h3>
                <p className="default-text text-gray-700">
                  We implement appropriate security measures to protect your personal information. 
                  Our platform uses secure authentication methods and data encryption to ensure 
                  your information remains private and secure.
                </p>
              </div>
              
              <div>
                <h3 className="font-poppins font-semibold text-xl sm:text-2xl text-gray-800 mb-3 sm:mb-4">Third-Party Services</h3>
                <p className="default-text text-gray-700">
                  Mira uses Firebase for authentication and data storage. Please review 
                  Firebase&apos;s privacy policy to understand how they handle your data. <strong>We do not 
                  sell your personal information to third parties under any circumstances.</strong>
                </p>
              </div>
              
              <div>
                <h3 className="font-poppins font-semibold text-xl sm:text-2xl text-gray-800 mb-3 sm:mb-4">Your Rights</h3>
                <p className="default-text text-gray-700">
                  You have the right to access, correct, or delete your personal information. 
                  You can manage your account settings or contact us for assistance with 
                  data-related requests.
                </p>
              </div>
            </div>
          </motion.section>
          
          {/* Terms of Service Section */}
          <motion.section 
            id="terms-of-service"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg p-8 mb-6"
          >
            <h2 className="default-subheading text-gray-900 mb-8 pb-3 border-b border-gray-100">Terms of Service</h2>
            
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="font-poppins font-semibold text-xl sm:text-2xl text-gray-800 mb-3 sm:mb-4">Platform Overview</h3>
                <p className="default-text text-gray-700">
                  Mira is a platform that connects students with meaningful youth-led volunteer 
                  opportunities. We provide tools for organizations to post positions and for 
                  students to discover and apply for volunteer opportunities that match their 
                  interests and skills.
                </p>
              </div>
              
              <div>
                <h3 className="font-poppins font-semibold text-xl sm:text-2xl text-gray-800 mb-3 sm:mb-4">User Accounts</h3>
                <p className="default-text text-gray-700">
                  Users must create an account to access Mira&apos;s features. You are responsible for 
                  maintaining the confidentiality of your account information and for all activities 
                  that occur under your account. You must provide accurate and complete information 
                  when creating your account.
                </p>
              </div>
              
              <div>
                <h3 className="font-poppins font-semibold text-xl sm:text-2xl text-gray-800 mb-3 sm:mb-4">Organization Responsibilities</h3>
                <p className="default-text text-gray-700">
                  Organizations posting volunteer positions must:
                </p>
                <ul className="list-disc pl-6 mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                  <li className="default-text text-gray-700">Provide accurate information about their organization and positions</li>
                  <li className="default-text text-gray-700">Respond to applications in a timely manner</li>
                  <li className="default-text text-gray-700">Treat applicants with respect and fairness</li>
                  <li className="default-text text-gray-700">Comply with all applicable laws and regulations</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-poppins font-semibold text-xl sm:text-2xl text-gray-800 mb-3 sm:mb-4">Applicant Responsibilities</h3>
                <p className="default-text text-gray-700">
                  Students applying for volunteer positions must:
                </p>
                <ul className="list-disc pl-6 mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                  <li className="default-text text-gray-700">Provide accurate information in their applications</li>
                  <li className="default-text text-gray-700">Honor commitments made to organizations</li>
                  <li className="default-text text-gray-700">Communicate promptly regarding application status changes</li>
                  <li className="default-text text-gray-700">Comply with organization policies when volunteering</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-poppins font-semibold text-xl sm:text-2xl text-gray-800 mb-3 sm:mb-4">Prohibited Activities</h3>
                <p className="default-text text-gray-700">
                  Users may not:
                </p>
                <ul className="list-disc pl-6 mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                  <li className="default-text text-gray-700">Use Mira for any illegal purpose</li>
                  <li className="default-text text-gray-700">Post false or misleading information</li>
                  <li className="default-text text-gray-700">Harass or discriminate against other users</li>
                  <li className="default-text text-gray-700">Attempt to gain unauthorized access to Mira&apos;s systems</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-poppins font-semibold text-xl sm:text-2xl text-gray-800 mb-3 sm:mb-4">Limitation of Liability</h3>
                <p className="default-text text-gray-700">
                  Mira is not responsible for the actions of organizations or volunteers using our platform. 
                  We provide a connection service but do not guarantee the quality or safety of volunteer 
                  opportunities or the reliability of volunteers.
                </p>
              </div>
            </div>
          </motion.section>
        </div>
        
        {/* Contact Information */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center px-4 py-6"
        >
          <p className="default-label text-gray-700">
            If you have any questions about our Terms of Service or Privacy Policy, please contact us at{' '}
            <a href="mailto:support@mira-volunteer.com" className="text-primary-500 hover:text-primary-600 font-medium">
              support@mira-volunteer.com
            </a>
          </p>
          <p className="default-label text-gray-500 mt-2">
            Last updated: April 2025
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default TermsAndPolicy;