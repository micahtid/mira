'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { DocumentData, Timestamp } from 'firebase/firestore';
import { getAccount } from '@/utils/globalFunctions';
import { format } from 'date-fns';
import { FaGlobe, FaInstagram } from 'react-icons/fa';
import { FiArrowLeft, FiMapPin, FiCalendar, FiInfo, FiTarget } from 'react-icons/fi';

import Loader from '@/components/common/Loader';

export default function OrganizationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [organization, setOrganization] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganization = async () => {
      const id = searchParams.get('id');
      if (!id) return;

      try {
        const org = await getAccount(id);
        setOrganization(org);

      } catch (error) {
        console.error('Error fetching organization:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, [searchParams]);

  // Handle back button click
  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <Loader />
    );
  }

  if (!organization) {
    return (
      <div className="default-container py-8">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors mb-6 font-poppins"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </button>
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="text-gray-600 font-poppins">Organization not found.</div>
          <button 
            onClick={handleBack} 
            className="mt-4 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg font-poppins font-medium"
          >
            Return to Previous Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="default-container py-8">
      {/* Back Button */}
      <button 
        onClick={handleBack}
        className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors mb-6 font-poppins"
      >
        <FiArrowLeft className="w-4 h-4" />
        <span>Go Back</span>
      </button>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Organization Banner */}
        <div className="h-32 bg-gradient-to-r from-primary-50 to-blue-50 relative">
          <div className="absolute -bottom-16 left-8 w-32 h-32 rounded-lg overflow-hidden bg-white border-4 border-white shadow-sm">
            {organization.profile ? (
              <img
                src={organization.profile}
                alt={organization.organizationName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <span className="text-3xl font-bold text-gray-600 font-poppins">
                  {organization.organizationName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Organization Header */}
        <div className="pt-20 px-8 pb-6 border-b border-gray-100 max-lg:px-3">
          <h1 className="text-2xl font-bold text-gray-900 font-poppins">{organization.organizationName}</h1>
          <p className="text-gray-500 font-poppins mt-1 flex items-center gap-2 text-nowrap">
            <FiCalendar className="w-4 h-4 max-md:hidden" />
            <span className='overflow-hidden overflow-ellipsis'>Member since {format((organization.createdAt as Timestamp).toDate(), 'MMMM d, yyyy')}</span>
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8 max-md:px-3">
          {/* Social Links */}
          <div className="flex flex-wrap gap-4">
            {organization.organizationWebsite && (
              <a 
                href={organization.organizationWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-700 font-poppins transition-colors"
              >
                <FaGlobe className="text-blue-500" />
                <span>Website</span>
              </a>
            )}
            {organization.organizationInstagram && (
              <a 
                href={`https://instagram.com/${organization.organizationInstagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-700 font-poppins transition-colors"
              >
                <FaInstagram className="text-pink-500" />
                <span>@{organization.organizationInstagram}</span>
              </a>
            )}
          </div>

          {/* Mission */}
          {organization.organizationMission && (
            <div className="bg-white rounded-lg border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  <FiTarget className="w-4 h-4 text-gray-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 font-poppins">Our Mission</h2>
              </div>
              <p className="text-gray-700 font-poppins whitespace-pre-wrap leading-relaxed">
                {organization.organizationMission}
              </p>
            </div>
          )}

          {/* Description */}
          {organization.organizationDescription && (
            <div className="bg-white rounded-lg border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  <FiInfo className="w-4 h-4 text-gray-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 font-poppins">About Us</h2>
              </div>
              <p className="text-gray-700 font-poppins whitespace-pre-wrap leading-relaxed">
                {organization.organizationDescription}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}