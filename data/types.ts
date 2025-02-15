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
    ////////////////////////
    positionTitle: string;
    positionType: string;
    positionLocation: string | null;        // null for "Remote"
    locationType: string;
    positionDescription: string;
    positionRequirements: string;
    positionQuestions?: string[];
    ////////////////////////
    requireResume: boolean;
    ////////////////////////
    visible: boolean;
    ////////////////////////
    availableSlots: number;                 // Number of available spots!
    positionApplicants: number;
}

import { Timestamp } from "firebase/firestore";

export type Application = {
  pid: string;
  uid: string;
  fullName: string;
  email: string;
  ////////////////////////
  status: string;                           // "pending" | "accepted" | "rejected"
  committed?: boolean;
  rescinded?: boolean;
  updatedAt?: Timestamp;
  bookMark: boolean;
  ////////////////////////
  education: string;
  currentEmployment: string;
  resume?: string;
  resumeLink?: string;
  portfolioLink?: string;
  applicantResponses?: string[];
};