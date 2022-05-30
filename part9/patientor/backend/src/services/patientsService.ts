import patientsData from "../data/patients.json";
import { patientsEntry } from "../types";

const patients: Array<patientsEntry> = patientsData;

const getPatients = (): Omit<patientsEntry, "ssn">[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
}

export default {
    getPatients
};