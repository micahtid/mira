'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

// Icons
import { FiPlus, FiArrowLeft, FiHelpCircle, FiTrash2, FiInfo, FiAlertCircle, FiLock } from 'react-icons/fi';

// Data & Types
import { Position, SelectOption } from '@/data/types';
import { positionFields, positionTypeOptions, locationTypeOptions } from '@/data';

// Utils & Functions
import { addPosition, getPositionsByOrg } from '@/utils/organizationFunctions';

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
    const { account, accountData, isPremium } = useAccount();
    const { register, handleSubmit: handleFormSubmit } = useForm<FormData>();
    
    // Position Limit States
    const [activePositions, setActivePositions] = useState<number>(0);
    const [positionLimitReached, setPositionLimitReached] = useState<boolean>(false);
    
    // Plan Limits
    const planLimits = {
        maxPositions: isPremium ? 3 : 1,
        maxSlotsPerPosition: isPremium ? 10 : 1
    };
    
    // Form States
    const [positionType, setPositionType] = useState<SelectOption | null>(null);
    const [locationType, setLocationType] = useState<SelectOption>(locationTypeOptions[0]);
    const [questions, setQuestions] = useState<string[]>([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Check Position Limits On Mount
    useEffect(() => {
        if (!account?.uid) return;

        const unsubscribe = getPositionsByOrg(account.uid, (positions) => {
            // Count Active Positions (Visible and Not Locked)
            const activeCount = positions.filter(
                (position) => position.visible && !position.locked
            ).length;
            
            setActivePositions(activeCount);
            
            // Check If Position Limit Is Reached Based On Premium Status
            const maxPositions = isPremium ? 3 : 1;
            setPositionLimitReached(activeCount >= maxPositions);
        });

        return () => unsubscribe();
    }, [account?.uid, isPremium]);
    
    const handleBack = () => {
        router.back();
    };
    
    // Redirect If Position Limit Is Reached!
    useEffect(() => {
        if (positionLimitReached) {
            router.push('/organization-dashboard?page=manage-positions');
        }
    }, [positionLimitReached, router]);
    


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

            // Enforce slot limit based on plan
            let slots = Number(formData.openSlots);
            if (slots > planLimits.maxSlotsPerPosition) {
                slots = planLimits.maxSlotsPerPosition;
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
                totalSlots: slots,
                openSlots: slots,
                committedApplicants: 0,
                totalApplicants: 0
            };

            await addPosition(position);
            toast.success('Position created successfully!');
            router.push('/organization-dashboard?page=manage-positions');
        } catch (error) {
            console.error('Error creating position:', error);
            toast.error('Failed to create position. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // CSS Helper Classes
    const sectionTitleClass = "text-lg font-semibold text-gray-900 font-poppins flex items-center gap-2";
    
    return (
        <div className="default-container py-8">
            {/* Back Button */}
            <button 
                onClick={handleBack}
                className="back-button mb-6"
            >
                <FiArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
            </button>
            
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 font-poppins">Create New Position</h1>
                <p className="text-gray-500 font-poppins mt-1">Fill out the form below to create a new volunteer position</p>
            </div>
            

            
            <form onSubmit={handleFormSubmit(handleSubmit)} className="space-y-10">
                {/* Position Details Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
                    <h2 className={sectionTitleClass}>
                        <FiHelpCircle className="w-5 h-5 text-gray-400" />
                        Position Details
                    </h2>
                    
                    <div className="space-y-6">
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
                        {positionFields.map((field) => {
                            // For all fields except openSlots
                            if (field.name !== 'openSlots' && (field.name !== 'location' || locationType.value === 'on-site')) {
                                return (
                                    <EntryField
                                        key={field.name}
                                        field={field}
                                        register={register}
                                    />
                                );
                            }
                            
                            // Special handling for openSlots field
                            if (field.name === 'openSlots') {
                                return (
                                    <div key={field.name} className="relative">
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">
                                                Available Slots
                                            </label>
                                            <input
                                                type="number"
                                                {...register('openSlots', {
                                                    required: true,
                                                    max: planLimits.maxSlotsPerPosition,
                                                    min: 1
                                                })}
                                                className="default-field font-poppins w-full"
                                                placeholder="Number of available positions"
                                                max={planLimits.maxSlotsPerPosition}
                                                min={1}
                                                defaultValue={!isPremium ? 1 : undefined}
                                                readOnly={!isPremium}
                                            />
                                        </div>
                                        {!isPremium && (
                                            <div className="mt-1 flex items-center gap-1 text-amber-500">
                                                <FiInfo className="w-4 h-4" />
                                                <span className="default-label text-xs">Basic Plan: Limited to 1 Slot</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            }
                            
                            return null;
                        })}

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
                <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
                    <h2 className={sectionTitleClass}>
                        <FiHelpCircle className="w-5 h-5 text-gray-400" />
                        Application Requirements
                    </h2>
                    
                    <div className="space-y-6">
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
                                        className="outlined-button px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
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
                <div className="flex justify-end pt-6">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`default-button ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Position'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePosition;