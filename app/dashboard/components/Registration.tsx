"use client";

import React from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { addUser } from "@/utils/userFunctions";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowRightLine, RiBuildingLine, RiUserLine, RiUpload2Line, RiBriefcaseLine, RiGraduationCapLine, RiCalendarLine } from "react-icons/ri";

type RegistrationType = "organization" | "individual";

type FormField = {
    name: string;
    label: string;
    maxLength?: number;
    type?: string;
    multiline?: boolean;
    icon?: React.ReactNode;
    accept?: string;
    placeholder?: string;
};

const fields: Record<RegistrationType, FormField[]> = {
    organization: [
        { 
            name: "organizationName", 
            label: "Organization Name", 
            maxLength: 50, 
            icon: <RiBuildingLine className="text-lg" />,
            placeholder: "Enter organization name"
        },
        { 
            name: "organizationMission", 
            label: "Organization Mission", 
            maxLength: 100,
            placeholder: "Brief mission statement"
        },
        { 
            name: "organizationDescription", 
            label: "Organization Description", 
            maxLength: 500, 
            multiline: true,
            placeholder: "Detailed description of your organization"
        },
    ],
    individual: [
        { 
            name: "fullName", 
            label: "Full Name", 
            maxLength: 50, 
            icon: <RiUserLine className="text-lg" />,
            placeholder: "Enter your full name"
        },
        { 
            name: "age", 
            label: "Age", 
            type: "number",
            icon: <RiCalendarLine className="text-lg" />,
            placeholder: "Enter your age"
        },
        { 
            name: "currentEmployment", 
            label: "Current Employment", 
            maxLength: 100, 
            icon: <RiBriefcaseLine className="text-lg" />,
            placeholder: "Current job title"
        },
        { 
            name: "education", 
            label: "Highest Level of Education", 
            maxLength: 100, 
            icon: <RiGraduationCapLine className="text-lg" />,
            placeholder: "e.g., Bachelor's in Computer Science"
        },
        { 
            name: "resume", 
            label: "Resume", 
            type: "file", 
            icon: <RiUpload2Line className="text-lg" />, 
            accept: ".pdf,.doc,.docx" 
        },
    ],
};

const Registration = () => {
    const [registrationType, setRegistrationType] = useState<RegistrationType>("individual");
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [selectedFileName, setSelectedFileName] = useState<string>("");

    const onSubmit = async (formData: any) => {
        try {
            const relevantFields = fields[registrationType].map(field => field.name);
            const filteredData = Object.fromEntries(
                Object.entries(formData).filter(([key]) => relevantFields.includes(key))
            );

            await addUser({
                ...filteredData,
                type: registrationType
            });
            window.location.reload();
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    const renderField = (field: FormField) => (
        <motion.div
            key={field.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-1.5"
        >
            <label className="text-sm md:text-base font-medium flex items-center gap-2 text-gray-300">
                {field.label}
                <span className="text-red-400 text-xs">*</span>
                {field.maxLength && (
                    <span className="text-gray-500 text-xs italic font-normal ml-auto">
                        max {field.maxLength} {field.type === "number" ? "" : "characters"}
                    </span>
                )}
            </label>

            <div className="relative group">
                {field.icon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary-400 transition-colors">
                        {field.icon}
                    </span>
                )}
                
                {field.type === "file" ? (
                    <div className="relative">
                        <input
                            type="file"
                            {...register(field.name, { required: true })}
                            accept={field.accept}
                            className="hidden"
                            onChange={(e) => setSelectedFileName(e.target.files?.[0]?.name || "")}
                            id={field.name}
                        />
                        <label
                            htmlFor={field.name}
                            className="w-full h-11 bg-gray-800/50 border-gray-700/50 text-gray-400 rounded-xl px-4 outline-none border transition-all duration-200 hover:bg-gray-800/70 hover:border-primary-500/50 hover:text-white cursor-pointer flex items-center gap-3 pl-10"
                        >
                            {selectedFileName || "Upload your resume (PDF, DOC, DOCX)"}
                        </label>
                    </div>
                ) : field.multiline ? (
                    <textarea
                        {...register(field.name, {
                            required: true,
                            maxLength: field.maxLength
                        })}
                        placeholder={field.placeholder}
                        className={`w-full min-h-[120px] resize-y bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 rounded-xl p-4 outline-none border transition-all duration-200 hover:bg-gray-800/70 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 ${field.icon ? 'pl-10' : ''}`}
                        maxLength={field.maxLength}
                    />
                ) : (
                    <input
                        type={field.type || "text"}
                        {...register(field.name, {
                            required: true,
                            maxLength: field.maxLength,
                            ...(field.type === "number" ? { min: 18, max: 100 } : {})
                        })}
                        placeholder={field.placeholder}
                        className={`w-full h-11 bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 rounded-xl px-4 outline-none border transition-all duration-200 hover:bg-gray-800/70 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 ${field.icon ? 'pl-10' : ''}`}
                        maxLength={field.maxLength}
                    />
                )}
                
                {errors[field.name] && (
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-xs absolute -bottom-5 left-0"
                    >
                        {field.type === "number" ? "Age must be between 18 and 100" : "This field is required"}
                    </motion.span>
                )}
            </div>
        </motion.div>
    );

    return (
        <div className="w-full min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black px-4 sm:px-6">
            <div className="fixed inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 pointer-events-none" />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[1000px] py-8 md:py-12 lg:py-16"
            >
                <div className="bg-gray-900/40 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-2xl border border-gray-800/50 shadow-xl relative overflow-hidden">
                    {/* Background Design Elements */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                    
                    {/* Content */}
                    <div className="relative">
                        {/* Header Section */}
                        <div className="text-center mb-8 md:mb-10">
                            <div className="inline-flex items-center rounded-full bg-primary-500/10 px-4 py-1.5 text-sm text-primary-300 border border-primary-500/20 shadow-sm mb-6">
                                <span className="relative flex h-2 w-2 mr-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500"></span>
                                </span>
                                Complete Your Profile
                            </div>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                                Choose Your{" "}
                                <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-accent-500 bg-clip-text text-transparent">
                                    Registration Type
                                </span>
                            </h3>
                            <p className="text-gray-300/90 text-sm md:text-base max-w-[600px] mx-auto">
                                Select your registration type and fill in the required information to get started.
                            </p>
                        </div>

                        {/* Registration Type Selection */}
                        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 md:mb-10">
                            {(["individual", "organization"] as const).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => {
                                        setRegistrationType(type);
                                        reset();
                                        setSelectedFileName("");
                                    }}
                                    className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 border ${
                                        registrationType === type
                                            ? 'bg-primary-500 text-white border-primary-500/50 shadow-lg scale-105'
                                            : 'bg-gray-800/50 text-gray-300 border-gray-700/50 hover:bg-gray-700/50 hover:scale-102'
                                    }`}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Form Section */}
                        <AnimatePresence mode="wait">
                            <motion.form
                                key={registrationType}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                onSubmit={handleSubmit(onSubmit)}
                                className="max-w-[600px] mx-auto space-y-8"
                            >
                                <div className="space-y-6">
                                    {fields[registrationType].map(renderField)}
                                </div>

                                <motion.button 
                                    type="submit"
                                    className="w-full py-3.5 px-6 bg-primary-500 hover:bg-primary-400 text-white rounded-xl font-medium transition-all duration-300 group hover:shadow-lg hover:-translate-y-0.5"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-center justify-center gap-3">
                                        <span className="text-sm md:text-base">Complete Registration</span>
                                        <RiArrowRightLine className="text-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all -ml-4 group-hover:ml-0" />
                                    </div>
                                </motion.button>
                            </motion.form>
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Registration;