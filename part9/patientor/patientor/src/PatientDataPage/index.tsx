import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { setPatient, useStateValue } from "../state";

const PatientDataPage = () => {
    const [{ patient }, dispatch] = useStateValue();

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
        if (!patient) {
            void fetchPatientData();
        }
    }, []);

    return (
        <div>
            <h2><b> {patient?.name} </b></h2>
            <p>ssh: {patient?.ssn}</p>
            <p>occupation: {patient?.occupation}</p>
        </div>
    );
};

export default PatientDataPage;