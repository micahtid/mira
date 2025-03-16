'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DocumentData } from 'firebase/firestore';
import { toast } from "react-hot-toast";
import { FiPlus, FiPackage } from 'react-icons/fi';

// Components
import PositionCard from './PositionCard';

// Hooks & Context
import { useAccount } from '@/providers/AccountProvider';
import { useConfirmationModal } from "@/hooks/useConfirmationModal";

// Utils & Functions
import { getPositionsByOrg, deletePosition, updateVisibility } from '@/utils/organizationFunctions';

/**
 * ManagePositions Component
 * 
 * Displays and manages all positions created by an organization.
 * Features:
 * - View all positions with their details
 * - Toggle position visibility
 * - Review applications
 * - Delete positions
 */
const ManagePositions = () => {
  // Hooks
  const router = useRouter();
  const { account } = useAccount();
  const { onOpen } = useConfirmationModal();
  
  // State
  const [positions, setPositions] = useState<DocumentData[]>([]);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Effects
  useEffect(() => {
    if (!account?.uid) return;

    const unsubscribe = getPositionsByOrg(account.uid, (updatedPositions) => {
      setPositions(updatedPositions);
    });

    return () => unsubscribe();
  }, [account?.uid]);

  // Handlers
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

  // Render Methods
  const renderHeader = () => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="default-subheading text-gray-900">Manage Positions</h2>
        <p className="default-label text-gray-500 mt-1">Review and manage your positions!</p>
      </div>

      <button 
        onClick={() => router.push('/organization-dashboard/create-position')}
        className="
          inline-flex items-center justify-center gap-2
          px-5 py-2.5 w-full sm:w-auto
          bg-white text-gray-700
          hover:bg-gray-50
          border border-gray-200
          rounded-lg
          transition-colors duration-200
        "
      >
        <FiPlus className="w-4 h-4" />
        <span>Create Position</span>
      </button>
    </div>
  );

  const renderEmptyState = () => (
    <div className="
      text-center py-16
      bg-white
      border border-gray-200
      rounded-lg
    ">
      <FiPackage className="w-12 h-12 mx-auto text-gray-400 mb-4" />
      <p className="text-gray-600 font-medium">No positions posted yet</p>
      <p className="text-gray-400 text-sm mt-1.5">Create your first position to get started</p>
    </div>
  );

  return (
    <div className="space-y-6 mt-4">
      {renderHeader()}

      <div className="flex flex-col gap-4">
        {positions.length > 0 ? (
          positions.map((position) => (
            <PositionCard
              key={position.pid}
              position={position}
              onVisibilityChange={handleVisibilityChange}
              onDelete={handleDelete}
              isDeleting={deleting === position.pid}
            />
          ))
        ) : renderEmptyState()}
      </div>
    </div>
  );
};

export default ManagePositions;