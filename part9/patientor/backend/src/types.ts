export interface diagnoseEntry {
    code: string;
    name: string
    latin?: string
}

export interface patientsEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
}

export type NewPatientEntry = Omit<patientsEntry, 'id'>;

export enum gender {
    Male = "male",
    Female = "female",
    Other = "other"
}