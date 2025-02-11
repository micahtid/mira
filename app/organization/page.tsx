'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DocumentData, Timestamp } from 'firebase/firestore';
import { getAccount } from '@/utils/accountFunctions';
import { format } from 'date-fns';
import { FaGlobe, FaInstagram } from 'react-icons/fa';

import Loader from '@/components/common/Loader';

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
    <div className="default-container py-4 my-16">
      <div className="space-y-8">
        {/* Header with Profile Image */}
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
            {organization.profile ? (
              <img
                src={organization.profile}
                alt={organization.organizationName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-xl text-gray-400">
                  {organization.organizationName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          <div>
            <h1 className="default-heading mb-1">{organization.organizationName}</h1>
            <p className="default-label text-gray-500">Organization Profile</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Social Links */}
          <div>
            <h2 className="default-subheading">Connect With Us</h2>
            <div className="flex gap-6 mt-2">
              <div className="flex items-center gap-2">
                <FaGlobe className="text-gray-400" />
                {organization.organizationWebsite ? (
                  <a 
                    href={organization.organizationWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="default-text text-gray-400"
                  >
                    Website
                  </a>
                ) : (
                  <span className="default-text text-gray-400">Website Unavailable</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <FaInstagram className="text-gray-400" />
                {organization.organizationInstagram ? (
                  <a 
                    href={`https://instagram.com/${organization.organizationInstagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="default-text text-gray-400"
                  >
                    @{organization.organizationInstagram}
                  </a>
                ) : (
                  <span className="default-text text-gray-400">Instagram Unavailable</span>
                )}
              </div>
            </div>
          </div>

          {/* Mission */}
          <div>
            <h2 className="default-subheading">Our Mission</h2>
            <p className="default-text text-gray-700 mt-2 whitespace-pre-wrap">
              {organization.organizationMission}
            </p>
          </div>

          {/* Description */}
          <div>
            <h2 className="default-subheading">About Us</h2>
            <p className="default-text text-gray-700 mt-2 whitespace-pre-wrap">
              {organization.organizationDescription}
            </p>
          </div>

          {/* Member Since */}
          <div className="pt-4 border-t border-gray-100">
            <p className="default-label text-gray-500">
              Member since {format((organization.createdAt as Timestamp).toDate(), 'MMMM d, yyyy')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}