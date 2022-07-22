import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Entry, Patient } from "../types";
import { setPatient, useStateValue } from "../state";

const PatientDataPage = () => {
    const [{ patient, diagnoses }, dispatch] = useStateValue();
    diagnoses.map(d => console.log(d));

    const { id } = useParams<{ id: string }>();

    if (!id) {
        return null;
    }

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const { data: patientData } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`);
                console.log(patientData);
                dispatch(setPatient(patientData));
            }
            catch (error: unknown) {
                let errorMessage = 'Something went wrong.';
                if (axios.isAxiosError(error) && error.response) {
                    errorMessage += error.response.data.message;
                }
                console.error(errorMessage);
            }
        };
        if (!patient || id !== patient?.id) {
            void fetchPatientData();
        }
    }, []);
    console.log(patient);

    return (
        <div>
            <div>
                <h2><b> {patient?.name} </b></h2>
                <p>ssh: {patient?.ssn}</p>
                <p>occupation: {patient?.occupation}</p>
            </div>
            <div>
                <h2>Entries</h2>
                {patient?.entries?.map(
                    (entry: Entry) => <div key={entry.id}>{entry.date} {entry.description}
                        {entry.diagnosisCodes?.map(code =>
                            <li key={code}> {code}
                                {diagnoses.filter(d => d.code === code)
                                    .map((diagnose) => <span key={diagnose.code}> {diagnose.name}</span>)}
                            </li>)} </div>
                )}
            </div>
        </div>
    );
};

export default PatientDataPage;