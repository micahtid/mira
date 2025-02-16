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
import { FaInstagram, FaGlobe } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { IoMdDocument } from "react-icons/io";

export const registrationFields: Record<RegistrationType, FormField[]> = {
    organization: [
        { 
            name: "organizationName", 
            label: "Organization Name", 
            type: "text",
            placeholder: "Enter organization name",
            required: true,
            maxLength: 50
        },
        { 
            name: "organizationMission",
            label: "Organization Mission",
            type: "text",
            placeholder: "Enter organization mission",
            required: true,
            maxLength: 100
        },
        { 
            name: "organizationDescription",
            label: "Organization Description",
            type: "text",
            multiline: true,
            placeholder: "Describe organization",
            required: true,
            maxLength: 500
        },
        { 
            name: "organizationWebsite",
            label: "Organization Website",
            type: "text",
            placeholder: "Enter organization website",
            required: false
        },
        { 
            name: "organizationInstagram",
            label: "Organization Instagram",
            type: "text",
            placeholder: "Enter organization Instagram",
            required: false
        }
    ],
    individual: [
        { 
            name: "fullName", 
            label: "Full Name", 
            type: "text",
            placeholder: "Enter your full name",
            required: true,
            maxLength: 50
        },
        { 
            name: "age",
            label: "Age",
            type: "number",
            placeholder: "Enter your age",
            required: true
        },
        { 
            name: "education",
            label: "Highest Level of Education",
            type: "text",
            placeholder: "Enter your highest education level",
            required: true,
            maxLength: 100
        },
        { 
            name: "resume",
            label: "Resume",
            type: "text",
            multiline: true,
            placeholder: "Write your resume here",
            required: true,
            maxLength: 1000
        },
        { 
            name: "resumeLink",
            label: "Resume Link",
            type: "text",
            placeholder: "Link to your resume",
            required: false
        },
        { 
            name: "portfolioLink",
            label: "Portfolio Link",
            type: "text",
            placeholder: "Link to your portfolio",
            required: false
        }
    ],
};

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

export const positionTypeOptions = [
    { value: 'volunteer', label: 'Volunteer' },
    { value: 'internship', label: 'Internship' },
    { value: 'part-time', label: 'Part-Time' },
    { value: 'full-time', label: 'Full-Time' },
    { value: 'branch-founder', label: 'Branch Founder' },
    { value: 'board-member', label: 'Board Member' },
    { value: 'other', label: 'Other' },
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
        name: "openSlots",
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