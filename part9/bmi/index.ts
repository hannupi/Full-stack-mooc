import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query["height"]);
    const weight = Number(req.query["weight"]);
    const bmi = calculateBmi(height, weight);

    // If variables are non existant or not numbers
    if ((isNaN(height) || isNaN(weight)) || (!height) || (!weight)) {
        res.json({
            error: "malformatted parameters"
        });
    }
    else {
        res.json({
            height,
            weight,
            bmi,
        });
    }
});

app.post("/calculator", (req, res) => {
    const dailyExercises: Array<number> = req.body.daily_exercises;
    const targetHours: number = req.body.target;
    const response = calculateExercises(dailyExercises, targetHours);
    const numberChecker = dailyExercises.map((exercise: number) => typeof ((exercise))).includes("string");

    if (!dailyExercises || !targetHours) {
        res.json({
            error: "parameters missing"
        });
    }
    else if (isNaN(targetHours) || numberChecker) {
        res.json({
            error: "malformatted parameters"
        });
    }
    else {
        res.json({
            response
        });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});