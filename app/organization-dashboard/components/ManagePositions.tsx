'use client';

import React, { useEffect, useState } from 'react';

import { DocumentData, Timestamp } from 'firebase/firestore';
import { getPositionsByOrg, deletePosition, updateVisibility } from '@/utils/organizationFunctions';
import { toTitleCase } from '@/utils/misc';

import { useRouter } from 'next/navigation';
import { useAccount } from '@/providers/AccountProvider';
import { useConfirmationModal } from "@/hooks/useConfirmationModal";
import { toast } from "react-hot-toast";

import * as Switch from '@radix-ui/react-switch';

const ManagePositions = () => {
  const { account } = useAccount();
  const [positions, setPositions] = useState<DocumentData[]>([]);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();
  const { onOpen } = useConfirmationModal();

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
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
      "Are you sure you want to delete this position? This action cannot be undone.",
      async () => {
        try {
          setDeleting(pid);
          await deletePosition(pid);
          setDeleting(null);
          router.refresh();

        } catch (error) {
          toast.error("Failed to delete position. Please try again.");
          setDeleting(null);
        }
      }
    );
  };

  const handleVisibilityChange = async (pid: string, newVisibility: boolean) => {
    try {
      await updateVisibility(pid, newVisibility);
      router.refresh();

    } catch (error) {
      toast.error("Failed to update visibility. Please try again.");
    }
  };

  return (
    <div className="space-y-6 mt-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="default-subheading">Manage Positions</h1>
          <p className="default-label text-gray-500">Review and manage your posted positions</p>
        </div>
        <button 
          onClick={() => router.push("/organization-dashboard/create-position")}
          className="default-button"
        >
          Create Position
        </button>
      </div>

      <div className="space-y-4">
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
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-primary-50 text-primary-600 rounded-lg text-sm font-medium">
                      {position.availableSlots} Slot{position.availableSlots !== 1 ? 's' : ''}
                    </div>
                    <div className="px-3 py-1 bg-primary-50 text-primary-600 rounded-lg text-sm font-medium">
                      {position.positionApplicants} Applicant{position.positionApplicants !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Switch.Root
                      checked={position.visible}
                      onCheckedChange={(checked) => handleVisibilityChange(position.pid, checked)}
                      className="w-[42px] h-[25px] bg-gray-200 rounded-full relative data-[state=checked]:bg-primary-600"
                    >
                      <Switch.Thumb 
                        className="block w-[21px] h-[21px] bg-white rounded-full shadow-lg transition-transform duration-150 ease-out absolute top-0.5 left-0.5 data-[state=checked]:translate-x-[17px]"
                      />
                    </Switch.Root>
                    <span className="text-sm text-gray-600 font-medium">
                      {position.visible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => router.push(`/organization-dashboard/review?pid=${position.pid}`)}
                      className="px-4 py-2 bg-primary-50 text-primary-600 hover:bg-primary-100 font-medium rounded-lg transition-colors"
                    >
                      Review Applications
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