import React from 'react';
import { motion } from "framer-motion";
import { UseFormRegister } from "react-hook-form";
import { FormField } from '../data/fields';

interface FormInputFieldProps {
    field: FormField;
    register: UseFormRegister<any>;
}

/**
 * A reusable form input field component that supports both text inputs and textareas.
 * Features smooth animations and optional icons.
 */
const RegisterField: React.FC<FormInputFieldProps> = ({ field, register }) => {
    const inputClasses = `
        w-full rounded-lg px-3 py-2 outline-none transition-all duration-200 text-sm
        bg-gray-50 border border-primary-100
        hover:border-primary-200 focus:border-primary-300 focus:ring-1 focus:ring-primary-200
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
                        className={`${inputClasses} min-h-[100px] py-2 resize-y`}
                        maxLength={field.maxLength}
                    />
                ) : (
                    <input
                        type={field.type || "text"}
                        {...register(field.name, {
                            required: field.required,
                            maxLength: field.maxLength,
                            ...(field.type === "number" ? { min: 12, max: 100 } : {})
                        })}
                        placeholder={field.placeholder}
                        className={`${inputClasses} h-10`}
                        maxLength={field.maxLength}
                    />
                )}
            </div>
        </motion.div>
    );
};

export default RegisterField;