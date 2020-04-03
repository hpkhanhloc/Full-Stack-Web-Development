interface ExerciseValues {
    daily: Array<number>;
    target: number;
}

const parseArguments = (args: Array<string>): ExerciseValues => {

    const newArgs = args.slice(2, args.length).map(Number);

    if (!newArgs.some(a => isNaN(a))) {

        return {
          daily: newArgs.slice(1, args.length),
          target: newArgs[0]
        };
    } else {
        throw new Error("Provided values were not numbers!");
    }
    
};



export const calculateExercise = (args: Array<number>, target: number) => {

        const sum = args.reduce((a, b) => a + b, 0);
        const average = sum / args.length;
        let rating = 0;
        let ratingDescription = '';

        if (sum < 5) {
            rating = 1;
            ratingDescription = "not good";
        } else if (5 <= sum && sum < 10) {
            rating = 2;
            ratingDescription = 'could be better';
        } else {
            rating = 3;
            ratingDescription = "good";
        }

        return {
          periodLength: args.length,
          trainingDays: args.filter(a => a != 0).length,
          target: target,
          average: average,
          success: average > target ? true : false,
          rating: rating,
          ratingDescription: ratingDescription
        };
        // console.log(args)
        // console.log(target)
};

try {
  const { daily, target } = parseArguments(process.argv);
  calculateExercise(
    daily,
    target,
  );
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}