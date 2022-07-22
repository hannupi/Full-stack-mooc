import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Entry, Patient } from "../types";
import { setPatient, useStateValue } from "../state";
import PatientEntry from "./PatientEntry";

const PatientDataPage = () => {
    const [{ patient, }, dispatch] = useStateValue();

    const { id } = useParams<{ id: string }>();

    if (!id) {
        return null;
    }

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const { data: patientData } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`);
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

    return (
        <div>
            <div>
                <h2><b> {patient?.name} </b></h2>
                <p>ssh: {patient?.ssn}</p>
                <p>occupation: {patient?.occupation}</p>
            </div>
            <div>
                <h2>Entries</h2>
                {patient?.entries?.map((entry: Entry) => <PatientEntry key={entry.id} entry={entry} />)}
            </div>
        </div>
    );
};

export default PatientDataPage;