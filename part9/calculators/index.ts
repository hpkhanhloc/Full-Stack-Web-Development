import { bmiCalculator } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';
import express = require('express');
const app = express();

app.use(express.json());

app.get('/bmi', (req, res) => {
    const {height, weight} = req.query;

    try {
        const result = {
        weight: weight,
        height: height,
        bmi: bmiCalculator(height, weight)};
        res.send(result);
    } catch (error) {
        res.send({
          error: "malformatted parameters"
        });
    }
    
});

app.post('/exercises', (req, res) => {
    if (!req.body.daily || !req.body.target) {
      res.status(400).json({
        error: "parameter missing"
      });
    } else {
         try {
           // eslint-disable-next-line @typescript-eslint/no-explicit-any
           const daily: any = req.body.daily;
           // eslint-disable-next-line @typescript-eslint/no-explicit-any
           const target: any = req.body.target;
           const result = calculateExercise(daily, target);
           res.send(result);
         } catch (error) {
           res.send({
             error: "malformatted parameters"
           });
         }
    }
});

const PORT = 3003;

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});