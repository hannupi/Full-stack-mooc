const calculateBmi = (height: number, weight: number): string => {
    height = height / 100;
    const bmi = weight / (height * height);

    if (bmi < 18.5) {
        return "Underweight";
    }
    else if (bmi > 18.5 && bmi < 24.9) {
        return "Normal range (healthy weight)";
    }
    else if (bmi > 24.9) {
        return "Overweight";
    }
    return "Please enter query parameters to get BMI result";
};

/* replaced in 9.5
const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])
console.log(calculateBmi(height, weight))
*/

export default calculateBmi;