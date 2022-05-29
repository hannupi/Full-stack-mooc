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
    const periodLength = hours.length;
    const trainingDays = hours.filter(hour => hour > 0).length;
    const average = hours.reduce((a, b) => a + b) / hours.length;
    let rating = 0, success = false, ratingDescription = "";
    if (average > target) {
        rating = 3;
        success = true;
        ratingDescription = "WHO IS THIS MONSTER?!?!?";
    }
    else if (average === target) {
        rating = 2;
        success = true;
        ratingDescription = "You achieved your goals! =)";
    }
    else if (average < target) {
        rating = 1;
        success = false;
        ratingDescription = "You'll get them next time";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};
/* replaced in 9.7
const target = Number(process.argv[2]);
const hours: Array<string> | Array<number> = (process.argv.slice(3)).map(Number);
console.log(calculateExercises(hours, target));
*/

export default calculateExercises;