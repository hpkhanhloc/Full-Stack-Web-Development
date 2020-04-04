import { useStateValue } from "../state";
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { List, Button, Container } from "semantic-ui-react";
import EntryDetail from "../components/EntryDetail";
import { AddEntryHospitalModal, AddEntryOccupationModal, AddHealthCheckModal } from "../AddPatientModal";
import { EntryFormValues } from "../AddPatientModal/AddEntryHositalForm";


const PatientPage: React.FC = () => {
    const [, dispatch] = useStateValue();
    const [modalHospitalOpen, setHospitalModalOpen] = React.useState<boolean>(false);
    const [modalOccupationOpen, setOccupationModalOpen] = React.useState<boolean>(false);
    const [modalHealthOpen, setHealthModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openHospitalModal = (): void => setHospitalModalOpen(true);
    const openOccupationModal = (): void => setOccupationModalOpen(true);
    const openHealthModal = (): void => setHealthModalOpen(true);

    const closeModal = (): void => {
        setHospitalModalOpen(false);
        setOccupationModalOpen(false);
        setHealthModalOpen(false);
        setError(undefined);
    };
    const [patient, setPatient] = useState<Patient>();
    const { id } = useParams<{ id: string }>();

    const fetchPatient = async (id: string) => {
        const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
        );
        return patientFromApi;
    };

    useEffect(() => {
        fetchPatient(id).then(p => {
            setPatient(p);
            dispatch({ type: "GET_PATIENT", payload: p });
        });
    }, [dispatch, id]);

    if (!patient){
        return(
            <h1>Loading...</h1>
        );
    }

    const submitNewEntry = async (values: EntryFormValues) => {
        console.log('put');
        try {
            const { data: newEntry } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch({ type: "ADD_PATIENT", payload: newEntry });
            setPatient(newEntry);
            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    };

        return (
            <div className="App">
                <Container>
                <h2>{patient.name} {patient.gender === 'male' ? <i className="mars icon"></i> : <i className="venus icon"></i>}</h2>
                <List>
                    <List.Item icon="birthday" content={patient.dateOfBirth} />
                    <List.Item icon="briefcase" content={patient.occupation} />
                </List>
                <h3>
                    <p>Entries</p>
                </h3>
                <div className="ui info message">
                    {patient.entries.map(e => (
                        EntryDetail(e)))}
                </div>
                <AddEntryHospitalModal
                    modalOpen={modalHospitalOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                />
                <AddEntryOccupationModal
                    modalOpen={modalOccupationOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                />
                <AddHealthCheckModal
                    modalOpen={modalHealthOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                />
                <div className="ui center justified container">
                        <Button.Group>
                            <Button color="teal" className="ui button" onClick={() => openHospitalModal()}>Add New Hospital Entry</Button>
                            <Button.Or />
                            <Button color="olive" className="ui button" onClick={() => openOccupationModal()}>Add New Occupation Entry</Button>
                            <Button.Or />
                            <Button color="green" className="ui button" onClick={() => openHealthModal()}>Add New Occupation Entry</Button>
                        </Button.Group>
                </div>
                </Container>                
            </div>
        );
  
};

export default PatientPage;