import { State } from "./state";
import { Patient, Action, Diagnose } from "../types";
// export type Action =
//   | {
//       type: "SET_PATIENT_LIST";
//       payload: Patient[];
//     }
//   | {
//       type: "ADD_PATIENT";
//       payload: Patient;
//     }
//   |  {
//      type: "GET_PATIENT";
//      payload: Patient;
//     }
//     ;

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export const setDiagnoseList = (diagnosesListFromApi: Diagnose[]): Action => {
  return {
    type: "SET_DIAGNOSE_LIST",
    payload: diagnosesListFromApi
  };
};


export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
};

export const getPatient = (patientFromApi: Patient): Action => {
  return {
    type: "GET_PATIENT",
    payload: patientFromApi
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSE_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "GET_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
    };
    default:
      return state;
  }
};
