import { OccupationalHealthcareEntry } from "../types";

interface OccupationalHealthcareEntryProps {
    entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcare = ({ entry }: OccupationalHealthcareEntryProps) => {
    return (
        <div>
            <h3>OccupationalHealthcare</h3>
            <p>{entry.date} {entry.employerName}</p>
            <p><i>{entry.description}</i></p>
            <p>{entry.diagnosisCodes}</p>
            <p>{entry.employerName}</p>
            <p>Diagnosed by: {entry.specialist}</p>
        </div>
    );
};

export default OccupationalHealthcare;