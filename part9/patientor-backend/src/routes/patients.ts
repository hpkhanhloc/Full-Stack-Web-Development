import express from "express";
import patientService from '../services/patientService';
import {toNewPatientEntry} from '../utils';

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPublicPatient());
});

router.get("/:id", (_req, res) => {
    //const { id } = useParams<{ id: string }>();
    res.send(patientService.getPatient(_req.params.id));
});

router.post("/", (_req, res) => {
    try{
        const newPatientEntry = toNewPatientEntry(_req.body);

        const addEntry = patientService.addPatient(newPatientEntry);
        res.json(addEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.post("/:id/entries", (_req, res) => {
    try {

        const newEntry = _req.body;

        const addEntry = patientService.addEntry(_req.params.id, newEntry);
        res.json(addEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default router;
