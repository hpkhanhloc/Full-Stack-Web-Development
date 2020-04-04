import patients from "../data/patients";
import { Patients, NewPatientEntry, PublicPatient, Entry } from "../types";

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

const getPatient = (id: string): Patients | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

  // .map(({ id, name, dateOfBirth, gender, ssn, occupation, entries}) => ({
  //   id,
  //   name,
  //   dateOfBirth,
  //   gender,
  //   ssn,
  //   occupation,
  //   entries
  // });

const addPatient = ( entry: NewPatientEntry ): Patients => {
  const newPatientEntry = {
      id: `d${Math.random().toString().substring(2,8)}-f723-11e9-8f0b-362b9e155667`,
      ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (id: string, entry: Entry): Patients | undefined=> {
  const newEntry: Entry = {
    id: `d${Math.random().toString().substring(2, 8)}-f723-11e9-8f0b-362b9e155667`, 
    ...entry
  };

  const patient = patients.find(p => p.id === id);
  if (patient) {
    patient.entries.push(newEntry);
  }
  
  return patient;
};

export default {
  getEntries,
  addPatient,
  addEntry,
  getPublicPatient,
  getPatient
};
