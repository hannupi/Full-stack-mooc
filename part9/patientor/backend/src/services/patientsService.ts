import { v1 as uuid } from 'uuid';
import patientsData from "../data/patients.json";
import { patientsEntry, NewPatientEntry } from "../types";

const patients: Array<patientsEntry> = patientsData;

const getPatients = (): Omit<patientsEntry, "ssn">[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (entry: NewPatientEntry): patientsEntry => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatients,
    addPatient,
};