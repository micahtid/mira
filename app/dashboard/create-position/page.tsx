'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/providers/UsersProvider';
import { addPosition } from '@/utils/positionFunctions';
import { v4 as uuidv4 } from 'uuid';

interface Position {
  //////////////////////
  pid: string;
  //////////////////////
  organizationName: string;
  oid: string;
  //////////////////////
  positionTitle: string;
  positionDescription: string;
  positionRequirements: string;
  positionQuestions: string[];
  positionApplicants: number;
  positionType: string;
  positionLocation?: string;
  //////////////////////
  availableSlots: number;
  requireResume: boolean;
}

const POSITION_TYPES = [
  'volunteer',
  'internship',
  'branch founder',
  'project lead',
  'coordinator',
  'advisor',
  'mentor',
  'ambassador'
] as const;

const formClasses = {
  container: "max-w-2xl mx-auto p-4 space-y-6",
  form: "space-y-4",
  fieldGroup: "space-y-2",
  label: "block font-medium",
  requiredLabel: "text-red-500 ml-1",
  input: "w-full p-2 border rounded-lg focus:outline-none",
  textarea: "w-full p-2 border rounded-lg min-h-[100px] focus:outline-none",
  select: "w-full p-2 border rounded-lg focus:outline-none capitalize",
  charCount: "text-sm text-gray-500",
  questionContainer: "space-y-4",
  questionInput: "flex gap-2",
  questionList: "space-y-2",
  questionItem: "flex items-center gap-2 p-2 border rounded-lg",
  deleteButton: "text-red-500 hover:text-red-700 focus:outline-none",
  checkbox: "form-checkbox h-5 w-5 focus:outline-none",
  checkboxLabel: "flex items-center gap-2",
  warning: "text-yellow-600 text-sm font-medium bg-yellow-50 p-3 rounded-lg border border-yellow-200"
};

const CreatePosition = () => {
  const router = useRouter();
  const { user, userData } = useUser();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    questions: [] as string[],
    availableSlots: 1,
    requireResume: false,
    type: POSITION_TYPES[0],
    location: ''
  });
  const [newQuestion, setNewQuestion] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(5, Math.max(1, parseInt(e.target.value) || 1));
    setFormData(prev => ({ ...prev, availableSlots: value }));
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setFormData(prev => ({
        ...prev,
        questions: [...prev.questions, newQuestion.trim()]
      }));
      setNewQuestion('');
    }
  };

  const handleDeleteQuestion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.uid || !userData?.organizationName) {
      console.error("User or organization data not available");
      return;
    }

    const position: Position = {
      pid: uuidv4(),
      organizationName: userData.organizationName,
      oid: user.uid,
      positionTitle: formData.title,
      positionDescription: formData.description,
      positionRequirements: formData.requirements,
      positionQuestions: formData.questions,
      positionApplicants: 0,
      positionType: formData.type,
      ...(formData.location && { positionLocation: formData.location }),
      availableSlots: formData.availableSlots,
      requireResume: formData.requireResume
    };

    try {
      await addPosition(position);
      router.push('/dashboard');
    } catch (error) {
      console.error("Error creating position:", error);
    }
  };

  return (
    <div className={formClasses.container}>
      <h1 className="default-heading">Create Position</h1>
      
      <form onSubmit={handleSubmit} className={formClasses.form}>
        {/* Title Field */}
        <div className={formClasses.fieldGroup}>
          <label htmlFor="title" className={formClasses.label}>
            Position Title
            <span className={formClasses.requiredLabel}>*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            maxLength={50}
            value={formData.title}
            onChange={handleInputChange}
            className={formClasses.input}
            required
          />
          <span className={formClasses.charCount}>{formData.title.length}/50 characters</span>
        </div>

        {/* Position Type */}
        <div className={formClasses.fieldGroup}>
          <label htmlFor="type" className={formClasses.label}>
            Position Type
            <span className={formClasses.requiredLabel}>*</span>
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className={formClasses.select}
            required
          >
            {POSITION_TYPES.map((type) => (
              <option key={type} value={type} className="capitalize">
                {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Location Field */}
        <div className={formClasses.fieldGroup}>
          <label htmlFor="location" className={formClasses.label}>
            Location
            <span className="text-gray-500 text-sm ml-2">(optional, for in-person positions)</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={formClasses.input}
            placeholder="e.g., New York, NY"
          />
        </div>

        {/* Description Field */}
        <div className={formClasses.fieldGroup}>
          <label htmlFor="description" className={formClasses.label}>
            Position Description
            <span className={formClasses.requiredLabel}>*</span>
          </label>
          <textarea
            id="description"
            name="description"
            maxLength={250}
            value={formData.description}
            onChange={handleInputChange}
            className={formClasses.textarea}
            required
          />
          <span className={formClasses.charCount}>{formData.description.length}/250 characters</span>
        </div>

        {/* Requirements Field */}
        <div className={formClasses.fieldGroup}>
          <label htmlFor="requirements" className={formClasses.label}>
            Requirements
            <span className={formClasses.requiredLabel}>*</span>
          </label>
          <textarea
            id="requirements"
            name="requirements"
            maxLength={500}
            value={formData.requirements}
            onChange={handleInputChange}
            className={formClasses.textarea}
            required
          />
          <span className={formClasses.charCount}>{formData.requirements.length}/500 characters</span>
        </div>

        {/* Resume Requirement */}
        <div className={formClasses.fieldGroup}>
          <label className={formClasses.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.requireResume}
              onChange={(e) => setFormData(prev => ({ ...prev, requireResume: e.target.checked }))}
              className={formClasses.checkbox}
            />
            <span className={formClasses.label}>
              Require Resume
              <span className={formClasses.requiredLabel}>*</span>
            </span>
          </label>
        </div>

        {/* Available Slots */}
        <div className={formClasses.fieldGroup}>
          <label htmlFor="availableSlots" className={formClasses.label}>
            Available Slots (Max: 5)
            <span className={formClasses.requiredLabel}>*</span>
          </label>
          <input
            type="number"
            id="availableSlots"
            name="availableSlots"
            min="1"
            max="5"
            value={formData.availableSlots}
            onChange={handleNumberChange}
            className={formClasses.input}
            required
          />
        </div>

        {/* Questions Section */}
        <div className={formClasses.questionContainer}>
          <div className={formClasses.fieldGroup}>
            <label className={formClasses.label}>
              Specific Questions (Each Max 50 Characters)
              <span className={formClasses.requiredLabel}>*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newQuestion}
                maxLength={50}
                onChange={(e) => setNewQuestion(e.target.value)}
                className={formClasses.input}
                placeholder="Enter a question"
              />
              <button
                type="button"
                onClick={handleAddQuestion}
                className="default-button whitespace-nowrap"
              >
                Add
              </button>
            </div>
          </div>

          {formData.questions.length > 0 && (
            <div className={formClasses.questionList}>
              {formData.questions.map((question, index) => (
                <div key={index} className={formClasses.questionItem}>
                  <span className="flex-1">{question}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(index)}
                    className={formClasses.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className={formClasses.warning}>
          ⚠️ Please review all details carefully. Positions cannot be edited after creation and can only be deleted.
        </p>

        <button type="submit" className="default-button w-full">
          Create Position
        </button>
      </form>
    </div>
  );
};

export default CreatePosition;