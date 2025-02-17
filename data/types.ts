export type RegistrationType = "organization" | "individual";

export type SelectOption = {
    value: string;
    label: string;
};

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

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

export type Position = {
    pid: string;
    oid: string;
    organizationName: string;
    organizationEmail: string;

    //////////// Position Details 
    positionTitle: string;
    positionType: string;
    positionLocation: string | null;        // `null` as "Remote"
    locationType: string;
    positionDescription: string;
    positionRequirements: string;
    positionQuestions?: string[];

    //////////// Application Requirements 
    requireResume: boolean;

    //////////// Position Visibility
    visible: boolean;
    locked?: boolean;                       // When `locked`, visibility cannot be changed!

    //////////// Slot Management 
    totalSlots: number;                      // CONSTANT: Number of available spots!
    openSlots: number;                       // VARIABLE: Number of open spots!
    committedApplicants: number;             // VARIABLE: Number of closed / committed spots!
    totalApplicants: number;                 // VARIABLE: Number of total applicants!
}

import { Timestamp } from "firebase/firestore";

export type Application = {
  pid: string;
  uid: string;
  fullName: string;
  email: string;

  //////////// Application Status 
  status: "pending" | "accepted" | "rejected";                  
  bookMark: boolean;
  committed?: boolean;
  rescinded?: boolean;
  updatedAt?: Timestamp;
  
  //////////// Application Information 
  educationLevel: string;
  resumeText?: string;
  resumeLink?: string;
  portfolioLink?: string;
  applicantResponses?: string[];
};