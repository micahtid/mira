export const navBarLinks = [
    { label: "About", link: "" },
    { label: "Demo", link: "" },
    { label: "Testimonials", link: "" },
    { label: "FAQ", link: "" },
    { label: "Sign In", link: "" }
]

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

import { RegistrationType, FormField } from './types';
import { FaUser, FaBuilding, FaEnvelope, FaLink, FaCalendar, FaGraduationCap, FaUpload } from "react-icons/fa";

export const registrationFields: Record<RegistrationType, FormField[]> = {
    organization: [
        { 
            name: "organizationName", 
            label: "Organization Name", 
            maxLength: 50, 
            icon: <FaBuilding />,
            placeholder: "Enter organization name",
            required: true
        },
        { 
            name: "email",
            label: "Email",
            type: "email",
            icon: <FaEnvelope />,
            placeholder: "Enter email address",
            required: true
        },
        { 
            name: "website",
            label: "Website (Optional)",
            type: "url",
            icon: <FaLink />,
            placeholder: "Enter organization website",
            required: false
        }
    ],
    individual: [
        { 
            name: "fullName", 
            label: "Full Name", 
            maxLength: 50, 
            icon: <FaUser />,
            placeholder: "Enter your full name",
            required: true
        },
        { 
            name: "email",
            label: "Email",
            type: "email",
            icon: <FaEnvelope />,
            placeholder: "Enter email address",
            required: true
        },
        { 
            name: "education",
            label: "Education",
            maxLength: 100,
            icon: <FaGraduationCap />,
            placeholder: "Enter your education",
            required: true
        },
        { 
            name: "graduationDate",
            label: "Graduation Date",
            type: "date",
            icon: <FaCalendar />,
            placeholder: "Select your graduation date",
            required: true
        },
        {
            name: "resumeLink",
            label: "Resume Link (Optional)",
            type: "url",
            icon: <FaLink />,
            placeholder: "Link to your resume (e.g., Google Drive)",
            required: false
        },
        {
            name: "portfolioLink",
            label: "Portfolio Link (Optional)",
            type: "url",
            icon: <FaLink />,
            placeholder: "Link to your portfolio",
            required: false
        },
        {
            name: "resumeFile",
            label: "Resume Upload (Optional)",
            type: "file",
            icon: <FaUpload />,
            placeholder: "Upload your resume",
            required: false
        },
    ],
};


////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

export const positionTypeOptions = [
    { value: 'volunteer', label: 'Volunteer' },
    { value: 'internship', label: 'Internship' },
    { value: 'branch founder', label: 'Branch Founder' },
    { value: 'project lead', label: 'Project Lead' },
    { value: 'coordinator', label: 'Coordinator' },
    { value: 'advisor', label: 'Advisor' },
    { value: 'mentor', label: 'Mentor' },
    { value: 'ambassador', label: 'Ambassador' }
] as const;

export const locationTypeOptions = [
    { value: 'remote', label: 'Remote' },
    { value: 'on-site', label: 'On-site' }
] as const;

// EXCLUDE Select Questions
export const positionFields: FormField[] = [
    {
        name: "title",
        label: "Position Title",
        required: true,
        maxLength: 100,
        placeholder: "Enter position title"
    },
    {
        name: "description",
        label: "Position Description",
        maxLength: 2000,
        multiline: true,
        required: true,
        placeholder: "Enter detailed description of the position"
    },
    {
        name: "requirements",
        label: "Requirements",
        maxLength: 1000,
        multiline: true,
        required: true,
        placeholder: "Enter position requirements"
    },
    {
        name: "availableSlots",
        label: "Available Slots",
        type: "number",
        required: true,
        placeholder: "Number of available positions"
    },
    {
        name: "location",
        label: "Location",
        maxLength: 100,
        required: true,
        placeholder: "Enter location (city, country)"
    }
];