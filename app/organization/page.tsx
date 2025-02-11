'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DocumentData, Timestamp } from 'firebase/firestore';
import { getAccount } from '@/utils/accountFunctions';
import { format } from 'date-fns';

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
    <div className="default-container space-y-6">
      <h1 className="default-subheading">{organization.organizationName}</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="default-subheading">About Us</h2>
          <p className="default-text">{organization.organizationDescription}</p>
        </div>

        <div>
          <h2 className="default-subheading">Our Mission</h2>
          <p className="default-text">{organization.organizationMission}</p>
        </div>

        <div>
          <h2 className="default-subheading">Member Since</h2>
          <p className="default-text">
            {format((organization.createdAt as Timestamp).toDate(), 'MMMM d, yyyy')}
          </p>
        </div>
      </div>
    </div>
  );
}