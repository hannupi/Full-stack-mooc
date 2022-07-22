import { HealthCheckEntry } from "../types";
import HealthCheckIcon from "./HealthCheckIcon";

interface HealthCheckEntryProps {
    entry: HealthCheckEntry;
}

const HealthCheck = ({ entry }: HealthCheckEntryProps) => {
    return (
        <div>
            <h3>HealthCheck</h3>
            <p>{entry.date}</p>
            <p><i>{entry.description}</i></p>
            <p>{entry.diagnosisCodes}</p>
            <HealthCheckIcon healthCheckRating={entry.healthCheckRating} />
            <p>Diagnosed by: {entry.specialist}</p>
        </div>
    );
};

export default HealthCheck;