export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}


export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export const SET_PATIENT_LIST = 'SET_PATIENT_LIST';
export const ADD_PATIENT = 'ADD_PATIENT';
export const ADD_ENTRY = 'ADD_ENTRY';
export const GET_PATIENT = 'GET_PATIENT';
export const SET_DIAGNOSE_LIST = 'SET_DIAGNOSE_LIST';

interface SetPatientList {
  type: typeof SET_PATIENT_LIST;
  payload: Patient[];
}
interface SetDiagnoseList {
  type: typeof SET_DIAGNOSE_LIST;
  payload: Diagnose[];
}
interface AddPatient {
  type: typeof ADD_PATIENT;
  payload: Patient;
}
interface AddEntry {
  type: typeof ADD_ENTRY;
  payload: HospitalEntry;
}
interface GetPatient {
  type: typeof GET_PATIENT;
  payload: Patient;
}

export type Action = SetPatientList | SetDiagnoseList |AddPatient | GetPatient | AddEntry;