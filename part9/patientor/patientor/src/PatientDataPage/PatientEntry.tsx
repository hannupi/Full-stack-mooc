import { Entry, } from "../types";
import HealthCheck from "./HealthCheckEntry";
import Hospital from "./HospitalEntry";
import OccupationalHealthcare from "./OccupationalHealthcareEntry";

interface Props {
    entry: Entry;
}
const PatientEntry = ({ entry }: Props) => {
    switch (entry.type) {
        case "Hospital":
            return <Hospital entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry} />;
        case "HealthCheck":
            return <HealthCheck entry={entry} />;
        default:
            return (
                <div>
                    <h3>Unknown</h3>
                </div>
            );
    }
};

export default PatientEntry;