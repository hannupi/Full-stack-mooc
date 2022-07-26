import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Entry, Patient } from "../types";
import { setPatient, useStateValue } from "../state";
import PatientEntry from "./PatientEntry";
import { formValues } from "../AddPatientEntryModal/AddEntryForm";
import { Button, } from "@material-ui/core";
import AddPatientEntryModal from "../AddPatientEntryModal";

const PatientDataPage = () => {
    const [{ patient, }, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);

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

    const openModal = () => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
    };
    const submitNewEntry = async (values: formValues) => {
        try {
            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values);
            console.log("success", newEntry);
            //dispatch(setPatient({ ...patient, entries: patient.entries.concat(newEntry) }));
            closeModal();
        }
        catch (error: unknown) {
            console.log('Something went wrong.');
            console.log("fail", values);
        }
    };


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

            <AddPatientEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                onClose={closeModal}
            />
            <Button onClick={openModal}>Add New Entry</Button>
        </div>
    );
};

export default PatientDataPage;