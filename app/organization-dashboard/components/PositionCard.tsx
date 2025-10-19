'use client';

import { DocumentData, Timestamp } from 'firebase/firestore';
import Link from 'next/link';
import * as Switch from '@radix-ui/react-switch';
import { format } from 'date-fns';
import { toTitleCase } from '@/utils/helper';
import { 
  FiMapPin, FiLock, FiUsers, FiCheckCircle, 
  FiEye, FiTrash2, FiCalendar
} from 'react-icons/fi';

interface PositionCardProps {
  position: DocumentData;
  onVisibilityChange: (pid: string, newVisibility: boolean, locked: boolean) => void;
  onDelete: (pid: string) => void;
  isDeleting: boolean;
}

const PositionCard = ({ position, onVisibilityChange, onDelete, isDeleting }: PositionCardProps) => {
  
  // Helper Functions
  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return '';
    return format(timestamp.toDate(), 'MMM d, yyyy');
  };
  
  // Derived Values
  const { pid, positionTitle, positionType, createdAt, positionLocation, locked, visible } = position;
  const isLocked = locked || false;
  const isVisible = visible || false;
  const totalApplicants = position.totalApplicants || 0;
  const committedApplicants = position.committedApplicants || 0;
  const totalSlots = position.totalSlots || 0;

  // CSS Class Helpers
  const badgeClasses = {
    base: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold",
    locked: "w-min text-nowrap bg-gray-100 text-gray-700",
    visible: "w-min text-nowrap bg-green-50 text-green-700",
    hidden: "w-min text-nowrap bg-amber-50 text-amber-700",
    type: "bg-primary-50 text-primary-700"
  };

  const statClasses = "inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold";
  
  // Render Helper Functions
  const renderStatusBadge = () => {
    if (isLocked) {
      return (
        <div className={`${badgeClasses.base} ${badgeClasses.locked}`}>
          <FiLock className="w-4 h-4" />
          <span>Position Filled</span>
        </div>
      );
    }
    
    if (isVisible) {
      return (
        <div className={`${badgeClasses.base} ${badgeClasses.visible}`}>
          <FiEye className="w-4 h-4" />
          <span>Visible to Public</span>
        </div>
      );
    }
    
    return (
      <div className={`${badgeClasses.base} ${badgeClasses.hidden}`}>
        <FiEye className="w-4 h-4" />
        <span>Hidden</span>
      </div>
    );
  };

  return (
    <div className="w-full bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-2xl font-poppins overflow-hidden p-6 transition-all duration-200">
      <div className="flex flex-col gap-5">
        {/* Position Title and Type */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-poppins font-semibold text-gray-900 truncate">
              {positionTitle}
            </h3>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={`${badgeClasses.base} ${badgeClasses.type}`}>
                {toTitleCase(positionType || '')}
              </span>
              
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                <FiCalendar className="w-3.5 h-3.5" />
                {formatDate(createdAt)}
              </span>
              
              {positionLocation && (
                <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                  <FiMapPin className="w-3.5 h-3.5" />
                  {positionLocation}
                </span>
              )}
            </div>
          </div>

          {/* Status Badge */}
          {renderStatusBadge()}
        </div>
        
        {/* Position Stats */}
        <div className="flex flex-wrap gap-3 mt-3">
          <div className={`${statClasses} bg-blue-50 border-blue-100`}>
            <FiUsers className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700">
              {totalApplicants} Applicant{totalApplicants !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className={`${statClasses} bg-green-50 border-green-100`}>
            <FiCheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-green-700">
              {committedApplicants}/{totalSlots} Committed
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-4 border-t border-gray-100/60">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Switch.Root
            checked={isVisible}
            onCheckedChange={(checked) => onVisibilityChange(pid, checked, isLocked)}
            className={`w-10 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-primary-600
              outline-none cursor-default ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLocked}
          >
            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-1 will-change-transform data-[state=checked]:translate-x-5" />
          </Switch.Root>
          <span className="text-sm font-semibold text-gray-700 font-poppins whitespace-nowrap">
            {isVisible ? 'Visible to Public' : 'Hidden from Public'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/organization-dashboard/review?pid=${pid}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-50 text-primary-700 border border-primary-200 rounded-xl font-poppins font-semibold hover:bg-primary-100 transition-all duration-200"
          >
            <FiEye className="w-4 h-4" />
            Review Applications
          </Link>

          <button
            onClick={() => onDelete(pid)}
            disabled={isDeleting || isLocked}
            className={`outlined-button inline-flex items-center justify-center gap-2 bg-red-50 text-red-700 border-red-200 rounded-xl font-semibold hover:bg-red-100 transition-all duration-200 ${(isDeleting || isLocked) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <FiTrash2 className="w-4 h-4" />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PositionCard;
