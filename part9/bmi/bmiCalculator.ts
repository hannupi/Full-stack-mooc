const calculateBmi = (height: number, weight: number) => {
    height = height / 100
    let bmi = weight / (height * height)

    if (bmi < 18.5) {
        return "Underweight"
    }
    else if (bmi > 18.5 && bmi < 24.9) {
        return "Normal range (healthy weight)"
    }
    else if (bmi > 24.9) {
        return "Overweight"
    }
}


const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])
if (process.argv.length < 4) throw new Error('Not enough arguments')
if (process.argv.length > 4) throw new Error('Too many arguments')
if (isNaN(height) || isNaN(weight)) throw new Error("Arguments have to be numbers!")
console.log(calculateBmi(height, weight))