import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

const PatientDataPage = () => {

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
            }
            catch (error: unknown) {
                let errorMessage = 'Something went wrong.';
                if (axios.isAxiosError(error) && error.response) {
                    errorMessage += error.response.data.message;
                }
                console.error(errorMessage);
            }

        };
        void fetchPatientData();
    }, []);

    return (
        <div>
            <h2><b> name </b></h2>
            <p>ssh: </p>
            <p>occupation: </p>
        </div>
    );
};

export default PatientDataPage;