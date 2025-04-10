'use client';

import React from 'react';

interface TabControlProps {
    activeTab: 'overview' | 'review';
    onTabChange: (tab: 'overview' | 'review') => void;
}

const TabControl: React.FC<TabControlProps> = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'review', label: 'Review Applications' }
    ] as const;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex gap-1 p-1 max-md:grid max-md:grid-cols-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`px-6 py-3 default-label transition-all rounded-md flex-1 text-center
                            ${activeTab === tab.id 
                                ? 'bg-primary-50 text-primary-600 font-medium shadow-sm' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TabControl;
