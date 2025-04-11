'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAccount } from '@/providers/AccountProvider';
import { updateAccount } from '@/utils/globalFunctions';
import { Building, Edit2, X, Save, User } from "lucide-react";
import { toast } from "react-hot-toast";
import { FormField } from '@/data/types';
import EntryField from '@/components/common/EntryField';

interface FormData {
  organizationName: string;
  organizationDescription: string;
  organizationMission: string;
  organizationWebsite: string;
  organizationInstagram: string;
}

const AccountSettings = () => {
  const { account, accountData } = useAccount();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Use react-hook-form for form handling
  const { register, handleSubmit, reset, formState: { isDirty } } = useForm<FormData>({
    defaultValues: {
      organizationName: accountData?.organizationName || '',
      organizationDescription: accountData?.organizationDescription || '',
      organizationMission: accountData?.organizationMission || '',
      organizationWebsite: accountData?.organizationWebsite || '',
      organizationInstagram: accountData?.organizationInstagram || ''
    }
  });

  // Form fields configuration
  const fields: FormField[] = [
    {
      name: 'organizationName',
      label: 'Organization Name',
      type: 'text',
      required: true,
      placeholder: 'Enter your organization name',
      maxLength: 50
    },
    {
      name: 'organizationDescription',
      label: 'Organization Description',
      type: 'text',
      multiline: true,
      required: true,
      placeholder: 'Describe your organization',
      maxLength: 500
    },
    {
      name: 'organizationMission',
      label: 'Mission Statement',
      type: 'text',
      multiline: true,
      required: true,
      placeholder: 'What is your organization&apos;s mission?',
      maxLength: 300
    },
    {
      name: 'organizationWebsite',
      label: 'Website',
      type: 'text',
      required: false,
      placeholder: 'https://your-organization.com',
      maxLength: 100
    },
    {
      name: 'organizationInstagram',
      label: 'Instagram',
      type: 'text',
      required: false,
      placeholder: '@your.organization',
      maxLength: 50
    }
  ];

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    
    try {
      await updateAccount({
        uid: account?.uid,
        type: 'organization',
        ...data
      });
      
      toast.success("Organization profile updated successfully!");
      setIsEditing(false);
      // Reset form with new values to update dirty state
      reset(data, { keepDirty: false });
    } catch (error) {
      console.error("Error updating organization profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    // Reset form to current account values
    reset({
      organizationName: accountData?.organizationName || '',
      organizationDescription: accountData?.organizationDescription || '',
      organizationMission: accountData?.organizationMission || '',
      organizationWebsite: accountData?.organizationWebsite || '',
      organizationInstagram: accountData?.organizationInstagram || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="default-subheading">Account Settings</h2>
          <p className="default-text text-gray-600 mt-1">
            Manage your organization's profile information
          </p>
        </div>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="outlined-button flex items-center gap-3 text-primary-500 border-primary-200 hover:bg-primary-50"
          >
            <Edit2 size={18} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={cancelEdit}
              className="outlined-button flex items-center gap-2"
              disabled={loading}
            >
              <X size={18} />
              Cancel
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              className="default-button flex items-center gap-3"
              disabled={loading || !isDirty}
            >
              <Save size={18} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-gray-50">
          <h3 className="default-label font-medium flex items-center gap-3">
            <User size={18} className="text-primary-500" />
            Profile Information
          </h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-poppins font-medium text-gray-700 mb-1">
                Account Email
              </label>
              <div className="flex items-center gap-3 mt-2">
                {/* Small profile picture */}
                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                  <img 
                    src={accountData?.profile} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="default-text text-gray-800">
                  {accountData?.email || "No email provided"}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Email and password cannot be changed through this interface.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Organization Information */}
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-gray-50">
          <h3 className="default-label font-medium flex items-center gap-3">
            <Building size={18} className="text-primary-500" />
            Organization Information
          </h3>
        </div>
        
        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {fields.map((field) => (
                <EntryField
                  key={field.name}
                  field={field}
                  register={register}
                />
              ))}
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-poppins font-medium text-gray-700 mb-1">
                  Organization Name
                </label>
                <p className="default-text text-gray-800">
                  {accountData?.organizationName || "Not Provided"}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-poppins font-medium text-gray-700 mb-1">
                  Organization Description
                </label>
                <p className="default-text text-gray-800">
                  {accountData?.organizationDescription || "Not Provided"}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-poppins font-medium text-gray-700 mb-1">
                  Mission Statement
                </label>
                <p className="default-text text-gray-800">
                  {accountData?.organizationMission || "Not Provided"}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-poppins font-medium text-gray-700 mb-1">
                  Website
                </label>
                <p className="default-text text-gray-800">
                  {accountData?.organizationWebsite ? (
                    <a 
                      href={accountData.organizationWebsite} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:underline"
                    >
                      {accountData.organizationWebsite}
                    </a>
                  ) : (
                    "Not Provided"
                  )}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-poppins font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <p className="default-text text-gray-800">
                  {accountData?.organizationInstagram ? (
                    <a 
                      href={`https://instagram.com/${accountData.organizationInstagram.replace('@', '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:underline"
                    >
                      {accountData.organizationInstagram}
                    </a>
                  ) : (
                    "Not Provided"
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;