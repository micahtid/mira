"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { addUser } from "@/utils/userFunctions";
import "./login.css";

type RegistrationType = "organization" | "individual";

type FormField = {
    name: string;
    label: string;
    maxLength: number;
    type?: string;
    multiline?: boolean;
};

const fields: Record<RegistrationType, FormField[]> = {
    organization: [
        { name: "organizationName", label: "Organization Name", maxLength: 50 },
        { name: "organizationMission", label: "Organization Mission", maxLength: 100 },
        { name: "organizationDescription", label: "Organization Description", maxLength: 500, multiline: true },
    ],
    individual: [
        { name: "fullName", label: "Full Name", maxLength: 50 },
        { name: "age", label: "Age", type: "number", maxLength: 100 },
        { name: "currentEmployment", label: "Current Employment", maxLength: 100 },
        { name: "education", label: "Highest Level of Education", maxLength: 100 },
        { name: "resume", label: "Resume", maxLength: 1000, multiline: true },
    ],
};

const Registration = () => {
    const [registrationType, setRegistrationType] = useState<RegistrationType>("individual");
    const { register, handleSubmit, reset } = useForm();

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
        <div key={field.name}>
            <label className="default-label">
                {field.label} <span className="text-red-500">*</span>{" "}
                <span className="text-gray-500 italic font-normal">
                    max {field.maxLength} {field.type === "number" ? "" : "characters"}
                </span>
            </label>

            {field.multiline ? (
                <textarea
                    {...register(field.name, {
                        required: true,
                        maxLength: field.maxLength
                    })}
                    className="form-field-multiline"
                    maxLength={field.maxLength}
                />
            ) : (
                <input
                    type={field.type || "text"}
                    {...register(field.name, {
                        required: true,
                        maxLength: field.maxLength
                    })}
                    className="form-field"
                    maxLength={field.maxLength}
                />
            )}
        </div>
    );

    return (
        <div className="default-container py-12 flex flex-col gap-y-12">
            <h3 className="default-heading">Registration</h3>

            <div className="form-container">
                <p className="default-label mb-4">Registration Type</p>
                <div className="space-x-2">
                    {(["individual", "organization"] as const).map((type) => (
                        <button
                            key={type}
                            onClick={() => setRegistrationType(type)}
                            className={`default-button px-2 py-1 ${registrationType !== type && "opacity-50"}`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                    {fields[registrationType].map(renderField)}
                    <button type="submit" className="default-button w-full">
                        Submit Registration
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Registration;