import diagnoses from '../data/diagnoses';
import { Diagnoses } from '../types';


const getEntries = (): Array<Diagnoses> => {
  return diagnoses;
};

export default {
  getEntries,
};
