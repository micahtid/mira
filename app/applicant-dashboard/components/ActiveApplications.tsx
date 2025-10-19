'use client';

import { useState } from 'react';
import { setApplicantCommitment } from '@/utils/applicantFunctions';
import { Application } from '@/data/types';
import { toTitleCase } from '@/utils/helper';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import Link from 'next/link';
import { 
  FiFileText, 
  FiClock, 
  FiCheckCircle, 
  FiXCircle, 
  FiAlertCircle, 
  FiCalendar, 
  FiSearch
} from 'react-icons/fi';
import { FaEye } from "react-icons/fa";
import SelectField from '@/components/common/SelectField';
import { SelectOption } from '@/data/types';


interface ExtendedApplication extends Application {
  positionTitle?: string;
  positionType?: string;
  organizationName?: string;
}

interface ActiveApplicationsProps {
  applications: ExtendedApplication[];
}

const ActiveApplications: React.FC<ActiveApplicationsProps> = ({ applications }) => {
  const { onOpen } = useConfirmationModal();
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<SelectOption | null>(null);
  
  // Filter Options
  const statusOptions: SelectOption[] = [
    { label: "Pending", value: "pending" },
    { label: "Accepted", value: "accepted" },
    { label: "Rejected", value: "rejected" }
  ];

  // Style Definitions
  const badgeClasses = {
    base: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full default-label text-sm font-semibold",
    accepted: "bg-emerald-50 text-emerald-600",
    pending: "bg-amber-50 text-amber-600",
    rejected: "bg-red-50 text-red-600",
    committed: "bg-green-50 text-green-700",
    withdrawn: "bg-amber-50 text-amber-600",
    rescinded: "bg-red-50 text-red-600"
  };
  
  // Returns Appropriate Status Tag Styles Based on Status
  const getStatusTag = (status: string) => {
    const statusStyles: Record<string, string> = {
      accepted: badgeClasses.accepted,
      pending: badgeClasses.pending,
      rejected: badgeClasses.rejected,
    };
    return statusStyles[status] || 'bg-gray-50 text-gray-600';
  };
  

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    return format(timestamp.toDate(), 'MMM d, yyyy');
  };

  /**
   * Handle User Commitment (Accept / Withdraw)
   */
  const handleCommitment = async (uid: string, isCommitting: boolean) => {
    const action = isCommitting ? 'accept' : 'withdraw from';
    
    onOpen(
      `Are you sure you want to ${action} this position? This action cannot be undone if you accept.`,
      async () => {
        try {
          await setApplicantCommitment(uid, isCommitting);
          toast.success(
            isCommitting 
              ? 'You have successfully accepted the position!' 
              : 'You have withdrawn from the position.'
          );
        } catch {
          toast.error('Failed to update commitment status. Please try again.');
        }
      }
    );
  };
  
  // Returns Appropriate Status Icon Based on Application Status
  const getStatusIcon = (status: string, rescinded?: boolean, committed?: boolean) => {
    if (rescinded) return <FiAlertCircle className="w-4 h-4 text-red-500" />;
    
    if (status === 'accepted') {
      if (committed === true) return <FiCheckCircle className="w-4 h-4 text-emerald-500" />;
      if (committed === false) return <FiXCircle className="w-4 h-4 text-amber-500" />;
      return <FiCheckCircle className="w-4 h-4 text-emerald-500" />;
    }
    
    if (status === 'pending') return <FiClock className="w-4 h-4 text-amber-500" />;
    if (status === 'rejected') return <FiXCircle className="w-4 h-4 text-red-500" />;
    
    return <FiFileText className="w-4 h-4 text-gray-500" />;
  };

  // Filters Applications Based on Search Query and Status Filter
  const filteredApplications = applications.filter(application => {
    // Search Query Filter
    const positionTitle = application.positionTitle || '';
    const organizationName = application.organizationName || '';
    const searchString = `${positionTitle} ${organizationName}`.toLowerCase();
    const matchesSearch = searchQuery === '' || searchString.includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    // Status Filter
    if (!selectedStatus || selectedStatus.value === 'all') return true;
    
    return application.status === selectedStatus.value;
  });
  
  // Renders Search and Filters Section
  const renderFilters = () => {
    return (
      <div className="space-y-4 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-5">
        {/* Search Bar */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search applications..."
            className="default-field w-full pl-10 pr-4"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <SelectField
              label="Application Status"
              value={selectedStatus}
              onChange={setSelectedStatus}
              options={statusOptions}
              placeholder="All Applications"
              isClearable
            />
          </div>
        </div>
      </div>
    );
  };
  
  // Renders Empty State When No Applications Exist or No Matches Found
  const renderEmptyState = () => {
    const emptyStateClasses = "text-center py-16 bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-2xl";
    
    // Different empty state messages based on filters
    if (searchQuery || selectedStatus) {
      return (
        <div className={emptyStateClasses}>
          <FiSearch className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="default-text font-medium text-gray-600">No matching applications found</p>
          <p className="default-label text-gray-400 mt-2">Try changing your search or filter criteria</p>
        </div>
      );
    }
    
    return (
      <div className={emptyStateClasses}>
        <FiFileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="default-text font-medium text-gray-600">No active applications found</p>
        <p className="default-label text-gray-400 mt-2">Start applying to positions to see them here</p>
      </div>
    );
  };
  
  // Returns Empty State If No Applications Exist
  if (!applications.length) {
    return (
      <div className="space-y-6 mt-4">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="default-subheading text-gray-900">Active Applications</h2>
            <p className="default-label text-gray-500 mt-1">Review and manage your applications</p>
          </div>
        </header>
        {renderEmptyState()}
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-4">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="default-subheading text-gray-900">Active Applications</h2>
          <p className="default-label text-gray-500 mt-1">Review and manage your applications</p>
        </div>
      </header>
      
      {/* Search and Filters */}
      {renderFilters()}
      
      <div className="flex flex-col gap-6">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((application) => (
          <div key={application.pid} className="w-full bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200/60 hover:border-gray-300 transition-all duration-200">
            {/* Application Card */}

            <div className="p-5 sm:p-7">
              <div className="flex flex-col gap-4 sm:gap-5">
                {/* Position Info and Status */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Position Title */}
                    <h3 className="default-text font-semibold text-gray-900 break-words">
                      {application.positionTitle || 'Position'}
                    </h3>
                    
                    {/* Organization and Details */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1">
                      {application.organizationName && (
                        <span className="text-primary-600 font-medium default-label truncate max-w-full sm:max-w-[200px]">
                          @{application.organizationName}
                        </span>
                      )}
                      
                      {application.positionType && (
                        <span className="default-label text-gray-500">
                          • {toTitleCase(application.positionType)}
                        </span>
                      )}
                      
                      {/* Application Date */}
                      {application.updatedAt && (
                        <span className="default-label text-gray-500 flex items-center gap-1">
                          • <FiCalendar className="w-3.5 h-3.5" />
                          {formatDate(application.updatedAt)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                    {/* Main Status Badge */}
                    <div className={`${badgeClasses.base} ${getStatusTag(application.status)}`}>
                      {getStatusIcon(application.status, application.rescinded, application.committed)}
                      <span>{toTitleCase(application.status)}</span>
                    </div>
                    
                    {/* Secondary Status Badge */}
                    {application.status === "accepted" && (
                      application.rescinded ? (
                        <div className={`${badgeClasses.base} ${badgeClasses.rescinded}`}>
                          <FiAlertCircle className="w-4 h-4" />
                          <span>Rescinded</span>
                        </div>
                      ) : application.committed !== undefined && (
                        <div className={`${badgeClasses.base} ${application.committed ? badgeClasses.committed : badgeClasses.withdrawn}`}>
                          {application.committed ? <FiCheckCircle className="w-4 h-4" /> : <FiXCircle className="w-4 h-4" />}
                          <span>{application.committed ? "Committed" : "Withdrawn"}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
                
                {/* Status Message */}
                {application.status === "accepted" && (
                  <div className="bg-gray-50 rounded-md p-3 sm:p-4 border border-gray-100">
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                      <div className="mt-0.5 sm:mt-0">
                        {getStatusIcon(application.status, application.rescinded, application.committed)}
                      </div>
                      {application.rescinded ? (
                        <p className="default-text text-gray-700">
                          Your acceptance has been rescinded
                        </p>
                      ) : application.committed === undefined ? (
                        <p className="default-text text-gray-700">
                          Please accept or withdraw within 3 days.
                        </p>
                      ) : application.committed ? (
                        <p className="default-text text-gray-700">
                          You have committed to this position.
                        </p>
                      ) : (
                        <p className="default-text text-gray-700">
                          You have withdrawn from this position.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

                {/* Application Details and Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 sm:pt-5 mt-3 sm:mt-4 border-t border-gray-100">
                  <div className="flex flex-col gap-1">
                    {/* Application ID with ellipsis */}
                    <div className="default-label text-gray-500 max-w-full sm:max-w-[250px] overflow-hidden whitespace-nowrap text-ellipsis">
                      Application ID: {application.pid}
                    </div>
                    
                    {/* View Application Link */}
                    <Link 
                      href={`/applicant-dashboard/application-preview?pid=${application.pid}`}
                      className="text-primary-600 hover:text-primary-700 default-text font-medium inline-flex items-center gap-2"
                    >
                      <FaEye size={18} />
                      Preview
                    </Link>
                  </div>
                  
                  {/* Action Buttons */}
                  {application.status === "accepted" && application.committed === undefined && (
                    <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-0">
                      <button
                        onClick={() => handleCommitment(application.uid, true)}
                        disabled={application.rescinded}
                        className={`default-button inline-flex items-center gap-2 py-2 sm:py-2.5 px-4 sm:px-6 text-sm sm:text-base ${
                          application.rescinded 
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <FiCheckCircle size={16} />
                        Accept
                      </button>
                      <button
                        onClick={() => handleCommitment(application.uid, false)}
                        disabled={application.rescinded}
                        className={`outlined-button inline-flex items-center gap-2 py-2 sm:py-2.5 px-4 sm:px-6 text-sm sm:text-base ${
                          application.rescinded
                            ? "opacity-50 cursor-not-allowed"
                            : "text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                        }`}
                      >
                        <FiXCircle size={16} />
                        Withdraw
                      </button>
                    </div>
                  )}
                </div>
            </div>
          </div>
        )))
        : renderEmptyState()
        }
      </div>
    </div>
  );
};

export default ActiveApplications;