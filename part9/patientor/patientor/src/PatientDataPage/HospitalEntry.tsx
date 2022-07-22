import { HospitalEntry, } from "../types";

interface HospitalProps {
    entry: HospitalEntry;
}

const Hospital = ({ entry }: HospitalProps) => {
    return (
        <div>
            <h3>Hospital</h3>
            <p>{entry.date}</p>
            <p><i>{entry.description}</i></p>
            <p>{entry.diagnosisCodes}</p>
            <p>Diagnosed by: {entry.specialist}</p>
        </div>
    );
};

export default Hospital;