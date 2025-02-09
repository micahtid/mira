import React from 'react';
import { RiBuildingLine, RiUserLine, RiUpload2Line, RiBriefcaseLine, RiGraduationCapLine, RiCalendarLine, RiLink } from "react-icons/ri";

export type RegistrationType = "organization" | "individual";

export type FormField = {
    name: string;
    label: string;
    maxLength?: number;
    type?: string;
    multiline?: boolean;
    icon?: React.ReactNode;
    placeholder?: string;
    required?: boolean;
};

export const fields: Record<RegistrationType, FormField[]> = {
    organization: [
        { 
            name: "organizationName", 
            label: "Organization Name", 
            maxLength: 50, 
            icon: <RiBuildingLine className="text-lg" />,
            placeholder: "Enter organization name",
            required: true
        },
        { 
            name: "organizationMission", 
            label: "Organization Mission", 
            maxLength: 100,
            placeholder: "Brief mission statement",
            required: true
        },
        { 
            name: "organizationDescription", 
            label: "Organization Description", 
            maxLength: 500, 
            multiline: true,
            placeholder: "Detailed description of your organization",
            required: true
        },
    ],
    individual: [
        { 
            name: "fullName", 
            label: "Full Name", 
            maxLength: 50, 
            icon: <RiUserLine className="text-lg" />,
            placeholder: "Enter your full name",
            required: true
        },
        { 
            name: "age", 
            label: "Age", 
            type: "number",
            icon: <RiCalendarLine className="text-lg" />,
            placeholder: "Enter your age",
            required: true
        },
        { 
            name: "currentEmployment", 
            label: "Current Employment", 
            maxLength: 100, 
            icon: <RiBriefcaseLine className="text-lg" />,
            placeholder: "Current job title",
            required: true
        },
        { 
            name: "education", 
            label: "Highest Level of Education", 
            maxLength: 100, 
            icon: <RiGraduationCapLine className="text-lg" />,
            placeholder: "e.g., Bachelor's in Computer Science",
            required: true
        },
        {
            name: "resumeLink",
            label: "Resume Link (Optional)",
            type: "url",
            icon: <RiLink className="text-lg" />,
            placeholder: "Link to your resume (e.g., Google Drive)",
            required: false
        },
        {
            name: "portfolioLink",
            label: "Portfolio Link (Optional)",
            type: "url",
            icon: <RiLink className="text-lg" />,
            placeholder: "Link to your portfolio",
            required: false
        },
        { 
            name: "resume", 
            label: "Resume Text", 
            maxLength: 2000,
            multiline: true,
            icon: <RiUpload2Line className="text-lg" />,
            placeholder: "Enter your resume text (max 2000 characters)",
            required: true
        },
    ],
};