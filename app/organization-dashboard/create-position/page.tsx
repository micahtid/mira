'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

// Icons
import { FiPlus, FiArrowLeft, FiHelpCircle, FiTrash2 } from 'react-icons/fi';

// Data & Types
import { Position, SelectOption } from '@/data/types';
import { positionFields, positionTypeOptions, locationTypeOptions } from '@/data';

// Utils & Functions
import { addPosition } from '@/utils/organizationFunctions';

// Hooks & Context
import { useAccount } from '@/providers/AccountProvider';

// Components
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
    // Hooks
    const router = useRouter();
    const { account, accountData } = useAccount();
    const { register, handleSubmit: handleFormSubmit } = useForm<FormData>();
    
    // Form States
    const [positionType, setPositionType] = useState<SelectOption | null>(null);
    const [locationType, setLocationType] = useState<SelectOption>(locationTypeOptions[0]);
    const [questions, setQuestions] = useState<string[]>([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Handle back button click
    const handleBack = () => {
        router.back();
    };
    


    // Question Handlers
    const handleAddQuestion = () => {
        if (newQuestion.trim()) {
            setQuestions(prev => [...prev, newQuestion.trim()]);
            setNewQuestion('');
        }
    };

    const handleDeleteQuestion = (index: number) => {
        setQuestions(prev => prev.filter((_, i) => i !== index));
    };

    // Form Submission
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
            setIsSubmitting(true);
            
            // Validate location based on type
            const location = locationType.value === 'remote' ? null : formData.location || '';
            if (locationType.value === 'on-site' && !location) {
                toast.error('Please provide a location for on-site positions.');
                setIsSubmitting(false);
                return;
            }

            // Create position object
            const position: Position = {
                pid: uuidv4(),
                oid: account.uid,
                organizationName: accountData.organizationName || '',
                organizationEmail: accountData.email || '',
                // Position Details
                positionTitle: formData.title,
                positionType: positionType.value,
                positionLocation: location,
                locationType: locationType.value,
                positionDescription: formData.description,
                positionRequirements: formData.requirements,
                positionQuestions: questions,
                // Application Requirements
                requireResume: formData.requireResume,
                // Visibility
                visible: true,
                locked: false,
                // Slot Management
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
        } finally {
            setIsSubmitting(false);
        }
    };

    // CSS Helper Classes
    const sectionClass = "bg-white rounded-lg border border-gray-200 p-6 space-y-5";
    const sectionTitleClass = "text-lg font-semibold text-gray-900 font-poppins flex items-center gap-2";
    
    return (
        <div className="default-container py-8">
            {/* Back Button */}
            <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors mb-6 font-poppins"
            >
                <FiArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
            </button>
            
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 font-poppins">Create New Position</h1>
                <p className="text-gray-500 font-poppins mt-1">Fill out the form below to create a new volunteer position</p>
            </div>
            
            <form onSubmit={handleFormSubmit(handleSubmit)} className="space-y-8">
                {/* Position Details Section */}
                <div className={sectionClass}>
                    <h2 className={sectionTitleClass}>
                        <FiHelpCircle className="w-5 h-5 text-gray-400" />
                        Position Details
                    </h2>
                    
                    <div className="space-y-5">
                        {/* Position Type Select */}
                        <SelectField
                            label="Position Type"
                            value={positionType}
                            onChange={newValue => setPositionType(newValue)}
                            options={positionTypeOptions}
                            required
                            isSearchable
                            isClearable
                            placeholder="Select position type..."
                        />

                        {/* Basic Form Fields */}
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
                    </div>
                </div>
                
                {/* Application Requirements Section */}
                <div className={sectionClass}>
                    <h2 className={sectionTitleClass}>
                        <FiHelpCircle className="w-5 h-5 text-gray-400" />
                        Application Requirements
                    </h2>
                    
                    <div className="space-y-5">
                        {/* Resume requirement checkbox */}
                        <div className="space-y-1.5">
                            <label className="font-medium text-gray-700 font-poppins flex items-center gap-2">
                                Require Resume
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    {...register('requireResume')}
                                    className="h-4 w-4 rounded text-blue-500 focus:ring-blue-500 border-gray-300"
                                />
                                <span className="text-sm text-gray-600 font-poppins">
                                    Require Applicants&apos; Resumes (& Portfolios)
                                </span>
                            </div>
                        </div>

                        {/* Application Questions section */}
                        <div className="space-y-3">
                            <label className="font-medium text-gray-700 font-poppins">
                                Application Questions
                            </label>
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newQuestion}
                                        onChange={(e) => setNewQuestion(e.target.value)}
                                        placeholder="Add a question for applicants"
                                        className="default-field font-poppins w-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddQuestion}
                                        className="px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                                    >
                                        <FiPlus className="w-5 h-5" />
                                    </button>
                                </div>
                                
                                {questions.length > 0 ? (
                                    <div className="space-y-2 mt-2">
                                        {questions.map((question, index) => (
                                            <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                <span className="flex-1 text-gray-700 font-poppins">
                                                    {question}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteQuestion(index)}
                                                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                                                >
                                                    <FiTrash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 italic font-poppins">No questions added yet. Add questions to gather specific information from applicants.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`
                            px-6 py-2.5 rounded-lg font-poppins font-medium
                            ${isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-700'}
                            transition-colors duration-200
                        `}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Position'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePosition;