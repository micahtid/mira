'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DocumentData, Timestamp } from 'firebase/firestore';
import { getAccount } from '@/utils/accountFunctions';
import { format } from 'date-fns';
import { FaGlobe, FaInstagram } from 'react-icons/fa';

import Loader from '@/components/Loader';

export default function OrganizationPage() {
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

  if (loading) {
    return (
        <Loader />
    );
  }

  if (!organization) {
    return (
      <div className="default-container">
        <div className="default-text">Organization not found.</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header with Profile Image */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-100">
              {organization.profile ? (
                <img
                  src={organization.profile}
                  alt={organization.organizationName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-3xl text-gray-400">
                    {organization.organizationName.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-20 px-8 pb-8">
          <h1 className="text-3xl font-bold text-gray-900">{organization.organizationName}</h1>
          
          {/* Social Links */}
          <div className="mt-4 flex gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <FaGlobe className="text-lg" />
              {organization.organizationWebsite ? (
                <a 
                  href={organization.organizationWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors"
                >
                  Website
                </a>
              ) : (
                <span className="text-gray-400">Website unavailable</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaInstagram className="text-lg" />
              {organization.organizationInstagram ? (
                <a 
                  href={`https://instagram.com/${organization.organizationInstagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-500 transition-colors"
                >
                  @{organization.organizationInstagram}
                </a>
              ) : (
                <span className="text-gray-400">Instagram unavailable</span>
              )}
            </div>
          </div>

          {/* Mission */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">Our Mission</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              {organization.organizationMission}
            </p>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">About Us</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              {organization.organizationDescription}
            </p>
          </div>

          {/* Member Since */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Member since {format((organization.createdAt as Timestamp).toDate(), 'MMMM d, yyyy')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}