'use client';

import React, { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import { useAccount } from '@/providers/AccountProvider';
import { getPositionsByOrg, deletePosition } from '@/utils/organizationFunctions';
import { useRouter } from 'next/navigation';

const ManagePositions = () => {
  const { account } = useAccount();
  const [positions, setPositions] = useState<DocumentData[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!account?.uid) return;

    const unsubscribe = getPositionsByOrg(account.uid, (updatedPositions) => {
      setPositions(updatedPositions);
    });

    return () => unsubscribe();
  }, [account?.uid]);

  const handleDelete = async (pid: string) => {
    if (!confirm("Are you sure you want to delete this position?")) return;
    
    try {
      await deletePosition(pid);
    } catch (error) {
      console.error("Error deleting position:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {positions.length > 0 ? (
          <div className="space-y-2">
            {positions.map((position, index) => (
              <div key={index} className="p-4 border rounded-lg shadow">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{position.positionTitle}</h3>
                    <p className="text-gray-600">{position.positionDescription}</p>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <p className=''>Applicants to Review: {position.positionApplicants}</p>
                    <button
                      onClick={() => router.push(`/organization-dashboard/review?pid=${position.pid}`)}
                      className="text-primary-500 hover:text-primary-700"
                    >
                      Review
                    </button>
                    <button
                      onClick={() => handleDelete(position.pid)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No positions posted at the moment</p>
        )}
      </div>
      
      <button 
        onClick={() => router.push("/organization-dashboard/create-position")}
        className="default-button"
      >
        Create Position
      </button>
    </div>
  );
};

export default ManagePositions;