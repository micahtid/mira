'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from '@/providers/AccountProvider';
import { addPosition } from '@/utils/organizationFunctions';
import { Position } from '@/data/types';
import { v4 as uuidv4 } from 'uuid';

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

const LOCATION_TYPES = [
  'remote',
  'on-site',
  'hybrid'
] as const;

type PositionType = typeof POSITION_TYPES[number];
type LocationType = typeof LOCATION_TYPES[number];

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

interface FormData {
  title: string;
  description: string;
  requirements: string;
  questions: string[];
  availableSlots: number;
  requireResume: boolean;
  type: PositionType;
  location: string;
  locationType: LocationType;
}

const CreatePosition = () => {
  const router = useRouter();
  const { account, accountData } = useAccount();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    requirements: '',
    questions: [],
    availableSlots: 1,
    requireResume: false,
    type: POSITION_TYPES[0],
    location: '',
    locationType: LOCATION_TYPES[0]
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

    if (!account || !accountData) {
      alert('Please sign in to create a position.');
      return;
    }

    try {
      const position: Omit<Position, 'positionApplicants'> = {
        pid: uuidv4(),
        oid: account.uid,
        organizationName: accountData.organizationName || '',
        positionTitle: formData.title,
        positionType: formData.type,
        positionLocation: formData.location || undefined,
        locationType: formData.locationType,
        positionDescription: formData.description,
        positionRequirements: formData.requirements,
        positionQuestions: formData.questions,
        requireResume: formData.requireResume,
        availableSlots: formData.availableSlots
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
    <div className={formClasses.container}>
      <h1 className="text-2xl font-bold mb-6">Create New Position</h1>
      
      <form onSubmit={handleSubmit} className={formClasses.form}>
        <div className={formClasses.fieldGroup}>
          <label className={formClasses.label}>
            Position Title
            <span className={formClasses.requiredLabel}>*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={formClasses.input}
            required
          />
        </div>

        <div className={formClasses.fieldGroup}>
          <label className={formClasses.label}>
            Position Type
            <span className={formClasses.requiredLabel}>*</span>
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className={formClasses.select}
            required
          >
            {POSITION_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className={formClasses.fieldGroup}>
          <label className={formClasses.label}>
            Location Type
            <span className={formClasses.requiredLabel}>*</span>
          </label>
          <select
            name="locationType"
            value={formData.locationType}
            onChange={handleInputChange}
            className={formClasses.select}
            required
          >
            {LOCATION_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className={formClasses.fieldGroup}>
          <label className={formClasses.label}>
            Location (Optional)
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={formClasses.input}
            placeholder="e.g., Remote, New York, etc."
          />
        </div>

        <div className={formClasses.fieldGroup}>
          <label className={formClasses.label}>
            Description
            <span className={formClasses.requiredLabel}>*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={formClasses.textarea}
            required
          />
        </div>

        <div className={formClasses.fieldGroup}>
          <label className={formClasses.label}>
            Requirements
            <span className={formClasses.requiredLabel}>*</span>
          </label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleInputChange}
            className={formClasses.textarea}
            required
          />
        </div>

        <div className={formClasses.fieldGroup}>
          <label className={formClasses.label}>
            Available Slots
            <span className={formClasses.requiredLabel}>*</span>
          </label>
          <input
            type="number"
            name="availableSlots"
            value={formData.availableSlots}
            onChange={handleNumberChange}
            min="1"
            max="5"
            className={formClasses.input}
            required
          />
          <p className={formClasses.warning}>Maximum 5 slots per position</p>
        </div>

        <div className={formClasses.fieldGroup}>
          <label className={formClasses.checkboxLabel}>
            <input
              type="checkbox"
              className={formClasses.checkbox}
              checked={formData.requireResume}
              onChange={(e) => setFormData(prev => ({ ...prev, requireResume: e.target.checked }))}
            />
            <span>Require Resume (applicants can also provide resume and portfolio links)</span>
          </label>
        </div>

        <div className={formClasses.questionContainer}>
          <label className={formClasses.label}>Application Questions</label>
          
          <div className={formClasses.questionInput}>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className={formClasses.input}
              placeholder="Enter a question"
            />
            <button
              type="button"
              onClick={handleAddQuestion}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <div className={formClasses.questionList}>
            {formData.questions.map((question, index) => (
              <div key={index} className={formClasses.questionItem}>
                <span className="flex-1">{question}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(index)}
                  className={formClasses.deleteButton}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Create Position
        </button>
      </form>
    </div>
  );
};

export default CreatePosition;