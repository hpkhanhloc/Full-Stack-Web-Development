import { NewPatientEntry, Gender, Entry } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const parseText = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${text}: ${text}`);
  }

  return text;
};

const parseEntry = (entry: Array<any>): Entry[] => {
  if (!entry) {
   return [];
  } else {
    entry.map(e => {
      if (!e.type || !isString(e.type)) {
        throw new Error(`Incorrect or missing ${e.text}: ${e.text}`);
      }
      if (!['HealthCheck', 'OccupationalHealthcare', 'Hospital'].includes(e.type)) {
        throw new Error(`Incorrect of type ${e.type}: ${e.type}`);
      }
    });
    return entry;
  //}
}
};

// const isEntry = (entry: any): Entry => {
//   if (!entry.type || !isString(entry.type)) {
//     throw new Error(`Incorrect or missing ${entry.text}: ${entry.text}`);
//   }
//   if (!['HealthCheck', 'OccupationalHealthcare', 'Hospital'].includes(entry.type)) {
//     throw new Error(`Incorrect of type ${entry.type}: ${entry.type}`);
//   }
//   return entry;
// };

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseText(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseText(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseText(object.occupation),
    entries: parseEntry(object.entries)
  };

  return newEntry;
};

// export const toNewEntry = (object: any): NewEntry => {
//   const newEntry: NewEntry = {
//     type: partType(object.type),
//     specialist: parseText(object.specialist),
//     description: parseText(object.description),
//     diagnosisCodes: parseText(object.diagnosisCodes),
//   };

//   return newEntry;
// };
