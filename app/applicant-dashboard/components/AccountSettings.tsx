'use client';

import { useState } from 'react';
import { updateAccount } from '@/utils/globalFunctions';
import { FormField } from '@/data/types';

import { useForm } from 'react-hook-form';
import { useAccount } from '@/providers/AccountProvider';
import { toast } from 'react-hot-toast';
import { User, Edit2, X, Save, Briefcase } from 'lucide-react';

import EntryField from '@/components/common/EntryField';

interface FormData {
  fullName: string;
  educationLevel: string;
  resumeText: string;
  resumeLink: string;
  portfolioLink: string;
}

const AccountSettings = () => {
  const { account, accountData } = useAccount();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, formState: { isDirty }, reset } = useForm<FormData>({
    defaultValues: {
      fullName: accountData?.fullName || '',
      educationLevel: accountData?.educationLevel || '',
      resumeText: accountData?.resumeText || '',
      resumeLink: accountData?.resumeLink || '',
      portfolioLink: accountData?.portfolioLink || ''
    }
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    
    try {
      await updateAccount({
        uid: account?.uid,
        type: 'individual',
        ...data
      });
      toast.success('Profile updated successfully!');
      // Reset Form With New Values to Update Dirty State
      reset(data, { keepDirty: false });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const cancelEdit = () => {
    // Reset Form to Current Account Values...
    reset({
      fullName: accountData?.fullName || '',
      educationLevel: accountData?.educationLevel || '',
      resumeText: accountData?.resumeText || '',
      resumeLink: accountData?.resumeLink || '',
      portfolioLink: accountData?.portfolioLink || ''
    });
    setIsEditing(false);
  };

  const fields: FormField[] = [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter your full name',
      maxLength: 50
    },
    {
      name: 'educationLevel',
      label: 'Education',
      type: 'text',
      multiline: true,
      required: true,
      placeholder: 'Enter your educational background',
      maxLength: 300
    },
    {
      name: 'resumeText',
      label: 'Resume',
      type: 'text',
      multiline: true,
      required: true,
      placeholder: 'Write your resume here',
      maxLength: 1000
    },
    {
      name: 'resumeLink',
      label: 'Resume Link',
      type: 'text',
      required: false,
      placeholder: 'Link to your resume (optional)',
      maxLength: 200
    },
    {
      name: 'portfolioLink',
      label: 'Portfolio Link',
      type: 'text',
      required: false,
      placeholder: 'Link to your portfolio (optional)',
      maxLength: 200
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="default-subheading">Account Settings</h2>
          <p className="default-text text-gray-600 mt-1">
            Manage your personal profile information
          </p>
        </div>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="outlined-button flex items-center justify-center gap-3 text-primary-600 border-primary-300 hover:bg-primary-50 w-full sm:w-auto rounded-xl font-semibold"
          >
            <Edit2 size={18} />
            Edit Profile
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={cancelEdit}
              className="outlined-button flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl font-semibold"
              disabled={loading}
            >
              <X size={18} />
              Cancel
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              className="default-button flex items-center justify-center gap-3 w-full sm:w-auto rounded-xl font-semibold"
              disabled={loading || !isDirty}
            >
              <Save size={18} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>

      {/* Account Information */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 overflow-hidden">
        <div className="p-5 border-b border-gray-100/60 bg-gradient-to-br from-primary-50/50 to-white">
          <h3 className="default-label font-semibold flex items-center gap-3 text-gray-900">
            <User size={18} className="text-primary-500" />
            Account Information
          </h3>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={accountData?.profile}
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-medium text-gray-800 font-poppins">{accountData?.fullName || "Not provided"}</p>
              <p className="text-sm text-gray-600 font-poppins break-all">{accountData?.email || "No email provided"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 overflow-hidden">
        <div className="p-5 border-b border-gray-100/60 bg-gradient-to-br from-primary-50/50 to-white">
          <h3 className="default-label font-semibold flex items-center gap-3 text-gray-900">
            <Briefcase size={18} className="text-primary-500" />
            Personal Information
          </h3>
        </div>
        
        <div className="p-4 sm:p-6">
          {isEditing ? (
            <form className="space-y-5 w-full">
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
                  Full Name
                </label>
                <p className="default-text text-gray-800">
                  {accountData?.fullName || "Not Provided"}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-poppins font-medium text-gray-700 mb-1">
                  Education
                </label>
                <p className="default-text text-gray-800 whitespace-pre-wrap">
                  {accountData?.educationLevel || "Not Provided"}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-poppins font-medium text-gray-700 mb-1">
                  Resume
                </label>
                <p className="default-text text-gray-800 whitespace-pre-wrap">
                  {accountData?.resumeText || "Not Provided"}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-poppins font-medium text-gray-700 mb-1">
                  Resume Link
                </label>
                <p className="default-text text-gray-800 break-all">
                  {accountData?.resumeLink ? (
                    <a 
                      href={accountData.resumeLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:underline"
                    >
                      {accountData.resumeLink}
                    </a>
                  ) : (
                    "Not Provided"
                  )}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-poppins font-medium text-gray-700 mb-1">
                  Portfolio Link
                </label>
                <p className="default-text text-gray-800 break-all">
                  {accountData?.portfolioLink ? (
                    <a 
                      href={accountData.portfolioLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:underline"
                    >
                      {accountData.portfolioLink}
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