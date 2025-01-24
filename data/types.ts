export interface Position {
    pid: string;
    oid: string;
    organizationName: string;
    ////////////////////////
    positionTitle: string;
    positionType: string;
    positionLocation?: string;
    positionDescription: string;
    positionRequirements: string;
    positionQuestions?: string[];
    ////////////////////////
    requireResume: boolean;
    ////////////////////////
    availableSlots: number;
    positionApplicants: number;
}

export interface Applicant {
    pid: string;
    uid: string;
    fullName: string;
    ////////////////////////
    education: string;
    currentEmployment: string;
    resume?: string;
    applicantResponses?: string[];
}