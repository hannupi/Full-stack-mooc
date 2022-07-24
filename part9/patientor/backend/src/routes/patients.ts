import express from 'express';
import patientsService from "../services/patientsService";
import toNewPatientEntry, { toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientsService.getPatients());
});

router.get("/:id", (req, res) => {
    const patient = patientsService.getPatientId(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.send("wrong id")
    }
})

router.post("/:id/entries", (req, res) => {
    const newEntry = toNewEntry(req.body)
    const patient = patientsService.getPatientId(req.params.id);
    if (patient) {
        patientsService.addPatientEntry(patient, newEntry);
        res.send(patient);
    }
    else {
        res.send("wrong id")
    }
})

router.post("/", (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatient = patientsService.addPatient(newPatientEntry);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = "patient adding broke";
        if (error instanceof Error) {
            errorMessage += "Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router

export default router;