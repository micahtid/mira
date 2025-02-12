"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { addAccount } from "@/utils/accountFunctions";
import { signOut } from "@/utils/firebaseFunctions";

import EntryField from "@/components/common/EntryField";
import TypeSelector from "./components/TypeSelector";

import { registrationFields } from "@/data";
import { RegistrationType } from "@/data/types";

const Registration = () => {
    const [registrationType, setRegistrationType] = useState<RegistrationType>("individual");
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (formData: any) => {
        try {
            const relevantFields = registrationFields[registrationType].map(field => field.name);
            const filteredData = Object.fromEntries(
                Object.entries(formData).filter(([key]) => relevantFields.includes(key))
            );

            await addAccount({
                ...filteredData,
                type: registrationType
            });
            window.location.reload();
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-white via-primary-50 to-primary-100 relative">
            {/* Grainy texture overlay */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 
                bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] bg-repeat pointer-events-none" />
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-primary-300/10 pointer-events-none" />
            
            <div className="relative w-full min-h-screen flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-xl bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-primary-100"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-xl font-semibold text-primary-900">
                            Create Your Account
                        </h1>
                        <motion.button
                            onClick={signOut}
                            className="text-gray-500 text-sm hover:text-gray-600 transition-colors"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                        >
                            Return Home
                        </motion.button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <TypeSelector 
                            registrationType={registrationType}
                            onTypeChange={(type) => {
                                setRegistrationType(type);
                                reset();
                            }}
                        />

                        <div className="space-y-4">
                            {registrationFields[registrationType].map((field) => (
                                <EntryField
                                    key={field.name}
                                    field={field}
                                    register={register}
                                />
                            ))}
                        </div>

                        <motion.button
                            type="submit"
                            className="default-button w-full !px-0"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                        >
                            Create Account
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Registration;