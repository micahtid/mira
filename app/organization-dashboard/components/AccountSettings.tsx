'use client';

import { useForm } from 'react-hook-form';
import { updateAccount } from '@/utils/globalFunctions';

import { FormField } from '@/data/types';
import { useAccount } from '@/providers/AccountProvider';
import { toast } from "react-hot-toast";

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
  const { register, handleSubmit, formState: { isDirty }, reset } = useForm<FormData>({
    defaultValues: {
      organizationName: accountData?.organizationName || '',
      organizationDescription: accountData?.organizationDescription || '',
      organizationMission: accountData?.organizationMission || '',
      organizationWebsite: accountData?.organizationWebsite || '',
      organizationInstagram: accountData?.organizationInstagram || ''
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      await updateAccount({
        uid: account?.uid,
        type: 'organization',
        ...data
      });
      toast.success('Organization profile updated successfully!');
      // Reset form with new values to update dirty state
      reset(data, { keepDirty: false });

    } catch (error) {
      console.error('Error updating organization profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

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
      label: 'Description',
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
      placeholder: 'What is your organization\'s mission?',
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

  return (
    <div className="space-y-6 mt-4">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md">
          <img
            src={accountData?.profile}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="default-subheading">Update Organization Profile</h1>
          <p className="default-label text-gray-500">Keep your organization&apos;s information up to date</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field) => (
          <EntryField
            key={field.name}
            field={field}
            register={register}
          />
        ))}

        <div className="pt-4">
          <button
            type="submit"
            disabled={!isDirty}
            className={`w-full default-button ${
              !isDirty && 'opacity-50 cursor-not-allowed'
            }`}
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;