'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAccount } from '@/providers/AccountProvider';
import { getApplication, getPosition } from '@/utils/applicantFunctions';
import { Applicant, Position } from '@/data/types';
import { toTitleCase } from '@/utils/misc';
import Loader from '@/components/common/Loader';

export default function ApplicationPreview() {
  const searchParams = useSearchParams();
  const { account } = useAccount();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [application, setApplication] = useState<Applicant | null>(null);
  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    const pid = searchParams.get('pid');
    if (!pid || !account) return;

    const unsubscribeApplication = getApplication(account.uid, pid, (application) => {
      if (!application) {
        setError('Application not found');
        setLoading(false);
        return;
      }
      setApplication(application);
      setLoading(false);
    });

    const unsubscribePosition = getPosition(pid, (position) => {
      if (!position) {
        setError('Position not found');
        setLoading(false);
        return;
      }
      setPosition(position);
    });

    return () => {
      unsubscribeApplication();
      unsubscribePosition();
    };
  }, [searchParams, account]);

  if (loading) {
    return (
      <Loader />
    );
  }

  if (error || !application || !position) {
    return (
      <div className="p-6">
        <p className="text-red-500">{error || 'Application not found'}</p>
      </div>
    );
  }

  return (
    <div className="default-container space-y-8 my-16">
      <div className="space-y-4">
        <div>
          <h1 className="default-heading">{position.positionTitle}</h1>
          <Link 
            href={`/organization?id=${position.oid}`}
            className="default-text text-primary-600 hover:text-primary-700 font-medium"
          >
            @{position.organizationName}
          </Link>
        </div>

        <div className="flex flex-wrap gap-x-4">
          <span className="default-tag">
            {toTitleCase(position.positionType)}
          </span>
          <span className="default-tag">
            {position.requireResume ? 'Resume Required' : 'No Resume Required'}
          </span>
          {position.locationType == "remote" ? (
            <span className="default-tag">
                {toTitleCase(position.locationType)}
            </span>
          ) : (
            <span className="default-tag">
                {position.positionLocation}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="default-subheading">Position Description</h2>
          <p className="default-text text-gray-600 whitespace-pre-wrap">{position.positionDescription}</p>
        </div>

        <div>
          <h2 className="default-subheading">Requirements</h2>
          <p className="default-text text-gray-600 whitespace-pre-wrap">{position.positionRequirements}</p>
        </div>

        <div>
          <h2 className="default-subheading mb-2">Your Responses</h2>
          <div className="space-y-4">
            {position.positionQuestions?.map((question, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="default-text font-medium text-gray-900 mb-2">{question}</p>
                <p className="default-text text-gray-600">{application.applicantResponses && application.applicantResponses[index]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}