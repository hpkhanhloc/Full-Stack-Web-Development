interface BmiValue {
    weight: number;
    height: number;
}

const parseArguments = (args: Array<string>): BmiValue => {

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {

        return {
          height: Number(args[2]),
          weight: Number(args[3])
        };
    } else {
        throw new Error("Provided values were not numbers!");
    }
    
}; 

export const bmiCalculator = (height: number, weight: number): string => {
    const bmi = weight/Math.pow((height/100),2);
    switch (true) {
      case bmi <= 15:
        return "Very severely underweight";
      case 15 < bmi && bmi <= 16:
        return "Severely underweight";
      case 16 < bmi && bmi <= 18.5:
        return "Underweight";
      case 18.5 < bmi && bmi <= 25:
        return "Normal (healthy weight)";
      case 25 < bmi && bmi <= 30:
        return "Overweight";
      case 30 < bmi && bmi <= 35:
        return "Obese Class I (Moderately obese)";
      case 35 < bmi && bmi <= 40:
        return "Obese Class II (Severely obese)";
      case bmi > 40:
        return "Obese Class III (Very severely obese)";
        default:
            throw new Error('Something wrong');
    }
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(bmiCalculator(height, weight));
} catch (e) {
  console.log("Something went wrong, error message: ", e.message);
}