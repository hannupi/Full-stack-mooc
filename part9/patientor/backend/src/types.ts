export interface diagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export interface BaseEntry {
    id: string;
    date: string;
    specialist: string;
    type: string;
    description: string;
    employerName?: string;
    diagnosisCodes?: Array<diagnoseEntry['code']>
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    sickLeave?: {
        startDate: string;
        endDate: string;
    }
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    }
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;

export type NewEntry = Omit<HealthCheckEntry, "id"> | Omit<HospitalEntry, "id"> | Omit<OccupationalHealthcareEntry, "id">;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries?: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;


export type NewPatientEntry = Omit<Patient, 'id'>;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}