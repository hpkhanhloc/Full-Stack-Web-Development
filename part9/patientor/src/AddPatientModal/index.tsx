import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddPatientForm, { PatientFormValues } from './AddPatientForm';
import AddEntryHospitalForm, { EntryFormValues } from './AddEntryHositalForm';
import AddEntryOccupationForm, { EntryOccupationFormValues } from './AddEntryOccupationForm';
import AddEntryHealthForm, { EntryHealthCheckFormValues } from './AddEntryHealthForm';


interface PatientProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
}
interface EntryHospitalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

interface EntryOccupationProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryOccupationFormValues) => void;
  error?: string;
}

interface EntryHealthCheckProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryHealthCheckFormValues) => void;
  error?: string;
}

export const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: PatientProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const AddEntryHospitalModal = ({ modalOpen, onClose, onSubmit, error }: EntryHospitalProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryHospitalForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const AddEntryOccupationModal = ({ modalOpen, onClose, onSubmit, error }: EntryOccupationProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryOccupationForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const AddHealthCheckModal = ({ modalOpen, onClose, onSubmit, error }: EntryHealthCheckProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryHealthForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);


