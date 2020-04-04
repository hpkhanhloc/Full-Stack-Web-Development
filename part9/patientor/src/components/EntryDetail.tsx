import { Entry, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry } from "../types";
import React from "react";
import { Icon, List } from "semantic-ui-react";
import { useStateValue } from "../state";


// const assertNever = (value: never): never => {
//     throw new Error(
//         `Unhandled discriminated union member: ${JSON.stringify(value)}`
//     );
// };

const EntryDetail = (entry: Entry) =>{
    const [{ diagnoses },] = useStateValue();
    const diagnoseCode = (c: string) => {
        return (
            <div>{c} - {Object.values(diagnoses).find(d => d.code === c)?.name}.
            </div>
        );
    };

    const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {

        const heartIcon = (i: number) => {
            switch (i) {
                case 0:
                    return (
                        <Icon color="red" className="heart" />
                    );
                case 1:
                    return (
                        <Icon color="green" className="heart" />
                    );
                case 2:
                    return (
                        <Icon color="yellow" className="heart" />
                    );
                case 3:
                    return (
                        <Icon color="black" className="heart" />
                    );
            }
        };

        return (
            <div className="ui padded segment">
                <h3>{entry.date} <Icon className="user doctor" /> </h3>
                <p>{entry.description}</p>
                <List>
                    {entry.diagnosisCodes?.map(c => (
                        <List.Item key={entry.diagnosisCodes?.indexOf(c)} content={diagnoseCode(c)} />
                    ))}
                </List>
                {heartIcon(Number(entry.healthCheckRating))}
            </div>
        );
    };

    const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {



        return (
            <div className="ui padded segment">
                <h3>{entry.date} <Icon className="hospital" /></h3>
                <p>{entry.description}</p>
                <List>
                    {entry.diagnosisCodes?.map(c => (
                        <List.Item key={entry.diagnosisCodes?.indexOf(c)} content={diagnoseCode(c)} />
                    ))}
                </List>

            </div>
        );
    };

    const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
        return (
            <div className="ui padded segment">
                <h3>{entry.date} <Icon className="stethoscope" /> {entry.employerName}</h3>
                <p>{entry.description}</p>
                <List>
                    {entry.diagnosisCodes?.map(c => (
                        <List.Item key={entry.diagnosisCodes?.indexOf(c)} content={diagnoseCode(c)} />
                    ))}
                </List>

            </div>
        );
    };


    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheck entry={entry} />;
        case "Hospital":
            return <Hospital entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry} />;
        // default:
        //     assertNever(entry);
    }
};

export default EntryDetail;

