import express from 'express';

const router = express.Router();

router.get("/api/diagnoses", (_req, res) => {
    res.send("a")
})