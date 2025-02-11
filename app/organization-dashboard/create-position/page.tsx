'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAccount } from '@/providers/AccountProvider';
import { addPosition } from '@/utils/organizationFunctions';
import { Position, SelectOption } from '@/data/types';
import { positionFields, positionTypeOptions, locationTypeOptions } from '@/data';
import EntryField from '@/components/dashboard/EntryField';
import SelectField from '@/components/dashboard/SelectField';
import { v4 as uuidv4 } from 'uuid';

type FormData = {
    title: string;
    description: string;
    requirements: string;
    availableSlots: number;
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
            alert('Please sign in to create a position.');
            return;
        }

        if (!positionType) {
            alert('Please select a position type.');
            return;
        }

        try {
            // For remote positions, explicitly set location to null
            // For on-site positions, ensure location is provided
            const location = locationType.value === 'remote' ? null : formData.location || '';
            
            if (locationType.value === 'on-site' && !location) {
                alert('Please provide a location for on-site positions.');
                return;
            }

            const position: Position = {
                pid: uuidv4(),
                oid: account.uid,
                organizationName: accountData.organizationName || '',
                ////////////////////////
                positionTitle: formData.title,
                positionType: positionType.value,
                positionLocation: location,
                locationType: locationType.value,
                positionDescription: formData.description,
                positionRequirements: formData.requirements,
                positionQuestions: questions,
                ////////////////////////
                requireResume: formData.requireResume,
                ////////////////////////
                visible: true,
                ////////////////////////
                availableSlots: formData.availableSlots,
                positionApplicants: 0
            };

            await addPosition(position);
            alert('Position created successfully!');
            router.push('/organization-dashboard');
        } catch (error) {
            console.error('Error creating position:', error);
            alert('Failed to create position. Please try again.');
        }
    };

    return (
        <div className="default-container py-8">
            <h1 className="text-2xl font-bold text-primary-900 mb-6">Create New Position</h1>
            
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
                    <label className="text-sm font-medium flex items-center gap-2 text-primary-900">
                        Require Resume
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            {...register('requireResume')}
                            className="form-checkbox h-4 w-4 text-primary-500 rounded focus:ring-primary-500 border-gray-300"
                        />
                        <span className="text-sm text-gray-600">
                            Require Applicants' Resumes (& Portfolios)
                        </span>
                    </div>
                </div>

                {/* Application Questions section */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium flex items-center gap-2 text-primary-900">
                        Application Questions
                    </label>
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newQuestion}
                                onChange={(e) => setNewQuestion(e.target.value)}
                                placeholder="Add a question for applicants"
                                className="flex-1 rounded-lg px-3 py-2 text-sm bg-gray-50 border border-primary-100 hover:border-primary-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                            />
                            <button
                                type="button"
                                onClick={handleAddQuestion}
                                className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600 transition-colors"
                            >
                                Add
                            </button>
                        </div>
                        {questions.map((question, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                <span className="flex-1 text-sm">{question}</span>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full default-button"
                >
                    Create Position
                </button>
            </form>
        </div>
    );
};

export default CreatePosition;