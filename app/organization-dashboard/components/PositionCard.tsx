'use client';

import { DocumentData, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import * as Switch from '@radix-ui/react-switch';
import { format } from 'date-fns';
import { toTitleCase } from '@/utils/helper';
import { 
  FiMapPin, 
  FiLock, 
  FiUsers, 
  FiCheckCircle, 
  FiEye, 
  FiTrash2 
} from 'react-icons/fi';

interface PositionCardProps {
  position: DocumentData;
  onVisibilityChange: (pid: string, newVisibility: boolean, locked: boolean) => void;
  onDelete: (pid: string) => void;
  isDeleting: boolean;
}

/**
 * PositionCard Component
 * Displays a single position with its details and actions
 */
const PositionCard = ({ 
  position, 
  onVisibilityChange,
  onDelete,
  isDeleting
}: PositionCardProps) => {
  const router = useRouter();

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return '';
    return format(timestamp.toDate(), 'MMM d, yyyy');
  };

  return (
    <div className="
      group
      w-full p-6
      bg-white 
      border border-gray-200
      rounded-lg
    ">
      <div className="flex flex-col gap-4">
        {/* Position Details */}
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="
              text-xl font-semibold text-gray-900
              hover:text-primary-600 
              cursor-pointer truncate
              transition-colors duration-200
            ">
              {position.positionTitle}
            </h3>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="
                inline-flex items-center gap-1.5
                px-3 py-1 
                bg-gray-50 text-gray-700
                rounded-full text-sm font-medium
                border border-gray-200
              ">
                {toTitleCase(position.positionType)}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500">
                Created {formatDate(position.createdAt)}
              </span>
              {position.positionLocation && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="
                    inline-flex items-center gap-1.5
                    text-sm text-gray-600
                  ">
                    <FiMapPin className="w-3.5 h-3.5" />
                    {position.positionLocation}
                  </span>
                </>
              )}
            </div>

            {position.locked && (
              <span className="
                inline-flex items-center gap-1.5
                px-3 py-1 mt-3
                bg-gray-50 text-gray-600
                rounded-full text-xs font-medium
                border border-gray-200
              ">
                <FiLock className="w-3 h-3" />
                Position Filled
              </span>
            )}
          </div>

          {/* Position Stats */}
          <div className="flex flex-wrap gap-3">
            <div className="
              inline-flex items-center gap-2
              px-3.5 py-1.5
              bg-gray-50 text-gray-700
              rounded-lg text-sm font-medium
              border border-gray-200
            ">
              <FiUsers className="w-4 h-4" />
              {position.totalApplicants} Total Applicant{position.totalApplicants !== 1 ? 's' : ''}
            </div>
            <div className="
              inline-flex items-center gap-2
              px-3.5 py-1.5
              bg-primary-50 text-primary-600
              rounded-lg text-sm font-medium
              border border-primary-100
            ">
              <FiCheckCircle className="w-4 h-4" />
              {position.committedApplicants}/{position.totalSlots} Committed
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Switch.Root
              checked={position.visible}
              onCheckedChange={(checked) => onVisibilityChange(position.pid, checked, position.locked)}
              className={`w-10 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-primary-600 
                outline-none cursor-default ${position.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-1 will-change-transform data-[state=checked]:translate-x-5" />
            </Switch.Root>
            <span className="text-sm font-medium text-gray-700">
              {position.visible ? 'Visible' : 'Hidden'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => router.push(`/organization-dashboard/review?pid=${position.pid}`)}
              className="
                inline-flex items-center justify-center gap-2
                w-full sm:w-auto px-4 py-2
                bg-white text-gray-700
                hover:bg-gray-50
                border border-gray-200
                rounded-lg
                transition-colors duration-200
              "
            >
              <FiEye className="w-4 h-4" />
              Review
            </button>
            <button
              onClick={() => onDelete(position.pid)}
              disabled={isDeleting}
              className={`
                inline-flex items-center justify-center gap-2
                w-full sm:w-auto px-4 py-2
                bg-white text-red-600
                hover:bg-red-50
                border border-red-200
                rounded-lg
                transition-colors duration-200
                ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <FiTrash2 className="w-4 h-4" />
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionCard;
