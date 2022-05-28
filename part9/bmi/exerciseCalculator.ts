interface Reply {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (hours: Array<number>, target: number): Reply => {
    let periodLength = hours.length
    let trainingDays = hours.filter(hour => hour > 0).length
    let average = hours.reduce((a, b) => a + b) / hours.length
    let rating, success, ratingDescription
    if (average > target) {
        rating = 3
        success = true
        ratingDescription = "WHO IS THIS MONSTER?!?!?"
    }
    else if (average === target) {
        rating = 2
        success = true
        ratingDescription = "You achieved your goals! =)"
    }
    else if (average < target) {
        rating = 1
        success = false
        ratingDescription = "You'll get them next time"
    }




    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

const target: number = Number(process.argv[2])

var hours: Array<String> | Array<number> = (process.argv.slice(3)).map(Number)

if (process.argv.length < 4) throw new Error('Not enough arguments')
console.log(calculateExercises(hours, target))