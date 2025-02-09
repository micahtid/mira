'use client';

import React from 'react';

interface ReviewTabProps {
    activeTab: 'overview' | 'review';
    onTabChange: (tab: 'overview' | 'review') => void;
}

const ReviewTab: React.FC<ReviewTabProps> = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'review', label: 'Review Applications' }
    ] as const;

    return (
        <div className="border-b border-gray-200">
            <div className="flex gap-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`px-4 py-3 transition-all relative
                            ${activeTab === tab.id 
                                ? 'text-primary-600 font-medium' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ReviewTab;
