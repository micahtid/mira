'use client';

import React, { useState } from 'react';

import { addPosition } from '@/utils/organizationFunctions';
import { Position, SelectOption } from '@/data/types';
import { positionFields, positionTypeOptions, locationTypeOptions } from '@/data';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAccount } from '@/providers/AccountProvider';
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

import EntryField from '@/components/common/EntryField';
import SelectField from '@/components/common/SelectField';

type FormData = {
    title: string;
    description: string;
    requirements: string;
    openSlots: number;
    location?: string;
    requireResume: boolean;
}

const CreatePosition = () => {
    const router = useRouter();
    const { account, accountData } = useAccount();
    const { register, handleSubmit: handleFormSubmit } = useForm<FormData>();
    
    // States for form data
    const [positionType, setPositionType] = useState<SelectOption | null>(null);
    const [locationType, setLocationType] = useState<SelectOption>(locationTypeOptions[0]);
    const [questions, setQuestions] = useState<string[]>([]);
    const [newQuestion, setNewQuestion] = useState('');
    
    const handleAddQuestion = () => {
        if (newQuestion.trim()) {
            setQuestions(prev => [...prev, newQuestion.trim()]);
            setNewQuestion('');
        }
    };

    const handleDeleteQuestion = (index: number) => {
        setQuestions(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (formData: FormData) => {
        if (!account || !accountData) {
            toast.error('Please sign in to create a position.');
            return;
        }

        if (!positionType) {
            toast.error('Please select a position type.');
            return;
        }

        try {
            // For remote positions, explicitly set location to null
            // For on-site positions, ensure location is provided
            const location = locationType.value === 'remote' ? null : formData.location || '';
            
            if (locationType.value === 'on-site' && !location) {
                toast.error('Please provide a location for on-site positions.');
                return;
            }

            const position: Position = {
                pid: uuidv4(),
                oid: account.uid,
                organizationName: accountData.organizationName || '',
                organizationEmail: accountData.email || '',
                //////////////////////// Position Details ////////////////////////
                positionTitle: formData.title,
                positionType: positionType.value,
                positionLocation: location,
                locationType: locationType.value,
                positionDescription: formData.description,
                positionRequirements: formData.requirements,
                positionQuestions: questions,
                //////////////////////// Application Requirements ////////////////////////
                requireResume: formData.requireResume,
                //////////////////////// Visibility ////////////////////////
                visible: true,
                locked: false,
                //////////////////////// Slot Management ////////////////////////
                totalSlots: Number(formData.openSlots),
                openSlots: Number(formData.openSlots),
                committedApplicants: 0,
                totalApplicants: 0
            };

            await addPosition(position);
            toast.success('Position created successfully!');
            router.push('/organization-dashboard');
        } catch (error) {
            console.error('Error creating position:', error);
            toast.error('Failed to create position. Please try again.');
        }
    };

    return (
        <div className="default-container py-8">
            <h1 className="default-subheading mb-6">Create New Position</h1>
            
            <form onSubmit={handleFormSubmit(handleSubmit)} className="space-y-6">
                {/* Position Type Select */}
                <SelectField
                    label="Position Type"
                    value={positionType}
                    onChange={newValue => setPositionType(newValue)}
                    options={positionTypeOptions}
                    required
                    isSearchable
                    isClearable
                    placeholder="Select or type a position type..."
                />

                {/* Form Fields */}
                {positionFields.map((field) => (
                    (field.name !== 'location' || locationType.value === 'on-site') && (
                        <EntryField
                            key={field.name}
                            field={field}
                            register={register}
                        />
                    )
                ))}

                {/* Location Type Select */}
                <SelectField
                    label="Location Type"
                    value={locationType}
                    onChange={newValue => newValue && setLocationType(newValue)}
                    options={locationTypeOptions}
                    required
                />

                {/* Resume requirement checkbox */}
                <div className="space-y-1.5">
                    <label className="
                    default-label font-medium text-primary-900
                    flex items-center gap-2">
                        Require Resume
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            {...register('requireResume')}
                            className="
                                h-4 w-4 rounded 
                                text-primary-500 focus:ring-primary-500 border-gray-300
                            "
                        />
                        <span className="
                            default-label 
                            text-sm text-medium text-gray-600
                        ">
                            Require Applicants&apos; Resumes (& Portfolios)
                        </span>
                    </div>
                </div>

                {/* Application Questions section */}
                <div className="space-y-1.5">
                    <label className="
                        default-label 
                        font-medium text-primary-900 
                        flex items-center gap-2 
                    ">
                        Application Questions
                    </label>
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newQuestion}
                                onChange={(e) => setNewQuestion(e.target.value)}
                                placeholder="Add a question for applicants"
                                className="default-field"
                            />
                            <button
                                type="button"
                                onClick={handleAddQuestion}
                                className="default-button"
                            >
                                Add
                            </button>
                        </div>
                        {questions.map((question, index) => (
                            <div key={index} className="
                                flex items-center gap-2 
                                p-3 
                                bg-gray-50 
                                rounded-lg
                            ">
                                <span className="flex-1 default-label">
                                    {question}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(index)}
                                    className="
                                        default-label 
                                        text-red-500 hover:text-red-700
                                    "
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full default-button rounded-[12px]"
                >
                    Create Position
                </button>
            </form>
        </div>
    );
};

export default CreatePosition;