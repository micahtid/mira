'use client';

import React, { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';

import { useSearchParams } from 'next/navigation';
import { getPosition } from '@/utils/applicationFunctions';
import { useForm } from 'react-hook-form';

const Apply = () => {
  const searchParams = useSearchParams();
  const pid = searchParams.get('pid');
  const [position, setPosition] = useState<DocumentData | null>(null);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (pid) {
      const unsubscribe = getPosition(pid, (fetchedPosition) => {
        setPosition(fetchedPosition);
      });

      return () => unsubscribe();
    }
  }, [pid]);

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <div className="default-container space-y-6 p-4 rounded-lg">
      {position ? (
        <div>
          <h1 className="default-heading mb-4">Apply for {position.positionTitle}</h1>
          <button className="mb-4" onClick={() => {}}> @{position.organizationName} </button>
        </div>
      ) : null}
      {position ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="border p-4 rounded-lg">
            <h2 className="default-text text-xl font-semibold">Description</h2>
            <p className="text-gray-700">{position.positionDescription}</p>
          </div>
          {position.positionRequirements && (
            <div className="border p-4 rounded-lg">
              <h2 className="default-text text-xl font-semibold">Requirements</h2>
              <p className="text-gray-700">{position.positionRequirements}</p>
            </div>
          )}
          {position.positionLocation && (
            <div className="border p-4 rounded-lg">
              <h2 className="default-text text-xl font-semibold">Location</h2>
              <p className="text-gray-700">{position.positionLocation}</p>
            </div>
          )}
          {position.requireResume && (
            <p className="default-text text-gray-700">
              Your resume will be sent in (This is the same resume in your account settings).
            </p>
          )}
          {position.positionQuestions && position.positionQuestions.map((question: string, index: number) => (
            <div key={index} className="flex flex-col">
              <label className="default-text font-semibold">{question}</label>
              <input type="text" {...register(`questions.${index}`)} className="input-field border rounded-md p-2" />
            </div>
          ))}
          <button type="submit" className="default-button bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition">Submit Application</button>
        </form>
      ) : (
        <p className="text-gray-700">Loading position details...</p>
      )}
    </div>
  );
};

export default Apply;