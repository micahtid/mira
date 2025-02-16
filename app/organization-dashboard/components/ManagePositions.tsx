'use client';

import React, { useEffect, useState } from 'react';

import { DocumentData, Timestamp } from 'firebase/firestore';
import { getPositionsByOrg, deletePosition, updateVisibility } from '@/utils/organizationFunctions';
import { toTitleCase } from '@/utils/misc';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useAccount } from '@/providers/AccountProvider';
import { useConfirmationModal } from "@/hooks/useConfirmationModal";
import * as Switch from '@radix-ui/react-switch';
import { toast } from "react-hot-toast";

const ManagePositions = () => {
  const { account } = useAccount();
  const [positions, setPositions] = useState<DocumentData[]>([]);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();
  const { onOpen } = useConfirmationModal();

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return '';
    return format(timestamp.toDate(), 'MMM d, yyyy');
  };

  useEffect(() => {
    if (!account?.uid) return;

    const unsubscribe = getPositionsByOrg(account.uid, (updatedPositions) => {
      setPositions(updatedPositions);
    });

    return () => unsubscribe();
  }, [account?.uid]);

  const handleDelete = async (pid: string) => {
    onOpen(
      "Are you sure you want to delete this position?",
      async () => {
        try {
          setDeleting(pid);
          await deletePosition(pid);
          setDeleting(null);
          router.refresh();
        } catch {
          toast.error("Failed to delete position. Please try again.");
          setDeleting(null);
        }
      }
    );
  };

  const handleVisibilityChange = async (pid: string, newVisibility: boolean, locked: boolean) => {
    // If position is locked, visibility cannot be changed
    if (locked) {
      toast.error("Position is complete and locked. No further modifications are allowed.");
      return;
    }

    try {
      await updateVisibility(pid, newVisibility);
      router.refresh();
    } catch {
      toast.error("Failed to update visibility. Please try again.");
    }
  };

  return (
    <div className="space-y-6 mt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Manage Positions
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {positions.length > 0 ? (
          positions.map((position) => (
            <div 
              key={position.pid} 
              className="w-full default-card"
            >
              <div className="flex flex-col gap-4">
                {/* Title and Type Row */}
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {position.positionTitle}
                    </h3>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-medium text-primary-600">
                        {toTitleCase(position.positionType)}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-500">
                        Created {formatDate(position.createdAt)}
                      </span>
                      {position.positionLocation && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm text-gray-600">
                            {position.positionLocation}
                          </span>
                        </>
                      )}
                    </div>

                    {position.locked && (
                      <span className="
                      inline-flex items-center 
                      px-2 py-[2px] mt-4
                      rounded-md 
                      bg-gray-100 text-gray-700 
                      border border-gray-200
                        text-xs font-poppins font-medium">
                        <svg className="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Position Filled
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium">
                      {position.totalApplicants} Total Applicant{position.totalApplicants !== 1 ? 's' : ''}
                    </div>
                    <div className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium">
                      {position.committedApplicants}/{position.totalSlots} Committed
                    </div>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <Switch.Root
                      checked={position.visible}
                      onCheckedChange={(checked) => handleVisibilityChange(position.pid, checked, position.locked)}
                      // disabled={position.locked}
                      className={`w-10 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-primary-600 
                        outline-none cursor-default ${position.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-1 will-change-transform data-[state=checked]:translate-x-5" />
                    </Switch.Root>
                    <span className="text-sm font-medium text-gray-700">
                      {position.visible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => router.push(`/organization-dashboard/review?pid=${position.pid}`)}
                      className="px-4 py-2 bg-primary-50 text-primary-600 hover:bg-primary-100 font-medium rounded-lg transition-colors"
                    >
                      Review
                    </button>
                    <button
                      onClick={() => handleDelete(position.pid)}
                      disabled={deleting === position.pid}
                      className={`px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-lg transition-colors ${
                        deleting === position.pid ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {deleting === position.pid ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No positions posted yet</p>
            <p className="text-gray-400 text-sm mt-1">Create your first position to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePositions;