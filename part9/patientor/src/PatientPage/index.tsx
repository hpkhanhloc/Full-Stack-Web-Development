import { useStateValue } from "../state";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, Gender } from "../types";
import { List } from "semantic-ui-react";

const PatientPage: React.FC = () => {
    const [{patients, diagnoses}, dispatch] = useStateValue();
    const [patient, setPatient] = useState<Patient>(
        {
        id: "",
        name: "",
        occupation: "",
        dateOfBirth: "",
        gender: Gender.Other,
        ssn: "",
        entries: [],
    });
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch({ type: "GET_PATIENT", payload: patientFromApi });
                setPatient(patientFromApi);
            } catch (e) {
                console.error(e);
            }
        };
        fetchPatient();
    }, [dispatch, id]);

    //const patient = await Object.values(patients).find((p: Patient) => p.id === id);
    console.log(patient);
    console.log(patients);
    console.log(diagnoses);
    //const patient = getPatient();

        return (
            <div className="ui container">
                <h2>{patient?.name} {patient?.gender === 'male' ? <i className="mars icon"></i> : <i className="venus icon"></i>}</h2>
                <List>
                    <List.Item icon="birthday" content={patient?.dateOfBirth} />
                    <List.Item icon="briefcase" content={patient?.occupation} />
                </List>
                <div>
                    <h3>Entries</h3>
                </div>
                {/* <div className="ui container">
                    {patient?.entries.map(e => (
                        <List content={e.description}>
                            {e.diagnosisCodes?.map(c => (
                                <List.Item content={c} />
                            ))}
                        </List>
                    ))}

                </div> */}

            </div>
        );
  
};

export default PatientPage;