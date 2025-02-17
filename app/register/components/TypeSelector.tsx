import React from 'react';
import { motion } from "framer-motion";
import { RiBuildingLine, RiUserLine } from "react-icons/ri";
import { RegistrationType } from '@/data/types';

interface RegistrationTypeToggleProps {
    registrationType: RegistrationType;
    onTypeChange: (type: RegistrationType) => void;
}

/**
 * A toggle component for switching between Individual and Organization registration types.
 * Features smooth animations and visual feedback for the selected state.
 */
const TypeSelector: React.FC<RegistrationTypeToggleProps> = ({ registrationType, onTypeChange }) => {
    const types: Array<{ type: RegistrationType; label: string; icon: React.ReactNode }> = [
        { type: "individual", label: "Individual", icon: <RiUserLine className="text-lg" /> },
        { type: "organization", label: "Organization", icon: <RiBuildingLine className="text-lg" /> }
    ];

    return (
        <div className="flex gap-3 w-full">
            {types.map(({ type, label, icon }) => (
                <motion.button
                    key={type}
                    onClick={() => onTypeChange(type)}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-300 border text-sm
                        flex items-center justify-center gap-2 
                        ${registrationType === type 
                            ? 'bg-primary-50 border-primary-200 text-primary-700' 
                            : 'bg-white border-primary-100 text-primary-600 hover:border-primary-200'
                        }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {icon}
                    {label}
                </motion.button>
            ))}
        </div>
    );
};

export default TypeSelector;
