import patients from "../data/patients";
import { Patients, NewPatientEntry, PublicPatient } from "../types";

const getEntries = (): Array<Patients> => {
  return patients;
};

// const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
//   return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
//       id,
//       name,
//       dateOfBirth,
//       gender,
//       occupation,
//   }));
// };

const getPublicPatient = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patients[] => {
  const patient = patients.filter(p => p.id === id);
  return patient.map(({ id, name, dateOfBirth, gender, ssn, occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    ssn,
    occupation,
    entries
  }));
};

const addEntry = ( entry: NewPatientEntry ): Patients => {
  const newPatientEntry = {
      id: `d${Math.random().toString().substring(2,8)}-f723-11e9-8f0b-362b9e155667`,
      ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addEntry,
  getPublicPatient,
  getPatient
};
