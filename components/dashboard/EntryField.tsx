import React from 'react';
import { motion } from "framer-motion";
import { UseFormRegister } from "react-hook-form";
import { FormField } from '@/data/types';

interface EntryFieldProps {
    field: FormField;
    register: UseFormRegister<any>;
}

/**
 * A reusable form input field component that supports text inputs and textareas.
 * Features smooth animations and optional icons.
 */
const EntryField: React.FC<EntryFieldProps> = ({ field, register }) => {
    const inputClasses = `
        w-full rounded-lg px-3 py-2 outline-none transition-all duration-200 text-sm
        bg-gray-50 border border-primary-100
        hover:border-primary-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500
    `;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-1.5"
        >
            <label className="text-sm font-medium flex items-center gap-2 text-primary-900">
                {field.icon && (
                    <span className="text-primary-400">
                        {field.icon}
                    </span>
                )}
                {field.label}
                {field.required && <span className="text-red-500 text-xs">*</span>}
                {field.maxLength && (
                    <span className="text-gray-400 text-xs italic font-normal ml-auto">
                        max {field.maxLength} {field.type === "number" ? "" : "chars"}
                    </span>
                )}
            </label>

            <div className="relative group">
                {field.multiline ? (
                    <textarea
                        {...register(field.name, {
                            required: field.required,
                            maxLength: field.maxLength
                        })}
                        placeholder={field.placeholder}
                        className={`${inputClasses} min-h-[100px]`}
                    />
                ) : (
                    <input
                        type={field.type || "text"}
                        {...register(field.name, {
                            required: field.required,
                            maxLength: field.maxLength
                        })}
                        placeholder={field.placeholder}
                        className={inputClasses}
                    />
                )}
            </div>
        </motion.div>
    );
};

export default EntryField;