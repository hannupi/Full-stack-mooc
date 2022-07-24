import { v1 as uuid } from 'uuid';
import patientsData from "../data/patients";
import { Patient, NewPatientEntry, PublicPatient, NewEntry, } from "../types";

const patients: Array<Patient> = patientsData;

const getPatients = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addPatientEntry = (patient: Patient, entry: NewEntry): Patient => {
    if (patient && entry) {
        patient.entries?.push({ id: uuid(), ...entry, });
    }
    return patient;
}

const getPatientId = (id: string): Patient | undefined => {
    let patient = patients.find((patient) => patient.id === id);

    if (patient && !patient.entries) {
        patient = {
            ...patient,
            entries: [],
        }
    };

    return patient;
}

export default {
    getPatients,
    addPatient,
    getPatientId,
    addPatientEntry
};