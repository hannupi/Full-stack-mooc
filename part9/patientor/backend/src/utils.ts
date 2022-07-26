import { NewPatientEntry, Gender, HealthCheckRating, } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error("incorrect or missing name");
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error("Incorrect or missing ssn");
    }
    return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (Gender: unknown): Gender => {
    if (!Gender || !isGender(Gender)) {
        throw new Error("Incorrect or missing gender");
    }
    return Gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation");
    }

    return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (object: any): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
    };

    return newEntry;
};

const parseDate = (date: string): string => {
    if (!date || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date
}

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error("Incorrect or missing specialist");
    }
    return specialist;
}

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error("Incorrect or missing description");
    }
    return description;
}

const parseCriteria = (criteria: unknown): string => {
    if (!criteria || !isString(criteria)) {
        throw new Error("Incorrect or missing criteria");
    }
    return criteria;
}

const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error("Incorrect or missing employerName");
    }
    return employerName;
}

const isHealthCheckRating = (param: any): param is number => {
    return Object.values(HealthCheckRating).includes(param);
}

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!isHealthCheckRating(healthCheckRating)) {
        throw new Error(`Incorrect or missing healthCheckRating ${isHealthCheckRating(healthCheckRating)}`);
    }
    return healthCheckRating;
}

export const toNewEntry = (object: any) => {
    const newPatientEntry = {
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        description: parseDescription(object.description),
        type: object.type,
    }
    switch (object.type) {
        case 'Hospital':
            return {
                ...newPatientEntry,
                discharge: {
                    date: parseDate(object.discharge.date),
                    criteria: parseCriteria(object.discharge.criteria)
                }
            }
        case 'OccupationalHealthcare':
            return {
                ...newPatientEntry,
                employerName: parseEmployerName(object.employerName),
                sickLeave: {
                    startDate: parseDate(object.sickLeave.startDate),
                    endDate: parseDate(object.sickLeave.endDate)
                }
            }
        case 'HealthCheck':
            return {
                ...newPatientEntry,
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            }
        default:
            throw new Error("Incorrect or missing type")
    }

}

export default toNewPatientEntry;