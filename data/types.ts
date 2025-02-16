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
    //////////////////////// Position Details ////////////////////////
    positionTitle: string;
    positionType: string;
    positionLocation: string | null;        // `null` means "Remote"
    locationType: string;
    positionDescription: string;
    positionRequirements: string;
    positionQuestions?: string[];
    //////////////////////// Application Requirements ////////////////////////
    requireResume: boolean;
    //////////////////////// Visibility ////////////////////////
    visible: boolean;
    locked?: boolean;                       // When true, position is locked and visibility cannot be changed
    //////////////////////// Slot Management ////////////////////////
    totalSlots: number;                      // Total number of slots available from the start (constant)
    openSlots: number;                       // Current number of open slots (decreases when someone is accepted)
    committedApplicants: number;             // Number of accepted applicants who have officially committed
    totalApplicants: number;                 // Total number of applicants (including pending, rejected, etc.)
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